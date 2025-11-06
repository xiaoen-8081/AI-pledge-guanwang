/* eslint-disable unicorn/no-array-reduce */
import type { Abi, Address } from 'viem';

import type { MulticallState } from '.';
import type { Call, ResultStructOutput } from './types';

import { storeToRefs } from 'pinia';
import { getContract } from 'viem';

import MULTICALL_ABI from '#/constants/multicall/abi.json';
import { useActiveChainId } from '#/hooks/useActiveChainId';
import { usePublicClient } from '#/hooks/useClient';
import { useMulticallAddress } from '#/hooks/useContract';
import { useDebounce } from '#/hooks/useDebounce';

import { useMulticallStore } from '.';
import { useAppBlockHooks } from '../application/hooks';
import { parseCallKey } from './actions';
import chunkArray from './chunkArray';
import { CancelledError, retry, RetryableError } from './retry';

// chunk calls so we do not exceed the gas limit
const CALL_CHUNK_SIZE = 500;
/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * 获取一个调用块，强制一个最小块数约束
 * @param address multicall contract to fetch against
 * @param chunk chunk of calls to make
 * @param minBlockNumber minimum block number of the result set
 */
async function fetchChunk(
  address: Address,
  chunk: Call[],
  minBlockNumber: number,
): Promise<{ blockNumber: number; results: ResultStructOutput[] }> {
  // console.warn('Fetching chunk', chunk, minBlockNumber);
  let resultsBlockNumber;
  let returnData;
  try {
    const client = usePublicClient();
    // 方式1
    const multicallInstance = getContract({
      address,
      abi: MULTICALL_ABI as Abi,
      client,
    });
    // 方式2
    // const multicallInstance = getContract({ address: token.value.address, abi: erc20Abi, client })
    // 方式3
    // const multicallInstance = useContractPublic(multicallAddress, MULTICALL_ABI as Abi)
    const res = (await multicallInstance.read.tryBlockAndAggregate?.([
      false,
      chunk.map((obj) => ({ callData: obj.callData, target: obj.address })),
    ])) as [bigint, string, ResultStructOutput[]];
    resultsBlockNumber = res[0];
    returnData = res[2];
    // console.warn('multicallInstance updata', res);
  } catch (error_) {
    console.warn('fetchChunk', error_);
    const error = error_ as any;
    if (
      error.code === -32_000 ||
      (error?.data?.message &&
        error?.data?.message?.indexOf('header not found') !== -1) ||
      error.message?.indexOf('header not found') !== -1
    ) {
      throw new RetryableError(
        `header not found for block number ${minBlockNumber}`,
      );
    } else if (
      (error.code === -32_603 ||
        error.message?.indexOf('execution ran out of gas') !== -1) &&
      chunk.length > 1
    ) {
      if (import.meta.env.NODE_ENV === 'development') {
        // console.warn('Splitting a chunk in 2', chunk);
      }
      const half = Math.floor(chunk.length / 2);
      const [c0, c1] = await Promise.all([
        fetchChunk(address, chunk.slice(0, half), minBlockNumber),
        fetchChunk(address, chunk.slice(half), minBlockNumber),
      ]);
      return {
        results: [...c0.results, ...c1.results],
        blockNumber: c1.blockNumber,
      };
    }
    // console.warn('Failed to fetch chunk inside retry', error);
    throw error;
  }
  if (Number(resultsBlockNumber) < minBlockNumber) {
    console.warn(
      `Fetched results for old block number: ${resultsBlockNumber.toString()} vs. ${minBlockNumber}`,
    );
  }
  return { results: returnData, blockNumber: Number(resultsBlockNumber) };
}
/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * 从给定的监听器状态中提取出当前链的每个 callKey 对应的最小 fetch 间隔（即最少的区块数量）
 * @param allListeners the all listeners state
 * @param chainId the current chain id
 */
export function activeListeningKeys(
  allListeners: MulticallState['callListeners'],
  chainId: number,
) {
  if (!allListeners || !chainId) return {};
  const listeners = allListeners[chainId];
  if (!listeners) return {};

  const keysObj = Object.keys(listeners).reduce<{ [callKey: string]: number }>(
    (memo, callKey) => {
      const keyListeners = listeners[callKey] as {
        [blocksPerFetch: number]: number;
      };
      memo[callKey] = Object.keys(keyListeners)
        .filter((key) => {
          const blocksPerFetch = Number.parseInt(key);
          if (blocksPerFetch <= 0) return false;
          return (
            keyListeners?.[blocksPerFetch] && keyListeners[blocksPerFetch] > 0
          );
        })
        .reduce((previousMin, current) => {
          return Math.min(previousMin, Number.parseInt(current));
        }, Infinity);
      return memo;
    },
    {},
  );
  // console.log('keysObj', keysObj);
  return keysObj;
}

/**
 * Return the keys that need to be refetched
 * 返回需要重新获取的键
 * @param callResults 当前调用结果的状态对象，按链 ID 和 callKey 组织，记录每个调用的最新数据状态
 * @param listeningKeys 一个映射，键是 callKey，值是该调用的数据允许的最大陈旧区块数量
 * @param chainId 链 ID
 * @param latestBlockNumber 当前链的最新区块号，用于计算数据是否过期
 */
export function outdatedListeningKeys(
  callResults: MulticallState['callResults'],
  listeningKeys: { [callKey: string]: number },
  chainId: number | undefined,
  latestBlockNumber: number | undefined,
): string[] {
  if (!chainId || !latestBlockNumber) return [];
  const results = callResults[chainId];

  // 没有获取到结果，则全部重新获取
  if (!results) return Object.keys(listeningKeys);

  // console.log('outdatedListeningKeys callResults', callResults)
  // console.log('outdatedListeningKeys listeningKeys', listeningKeys)
  const keys = Object.keys(listeningKeys).filter((callKey) => {
    const blocksPerFetch = listeningKeys[callKey];
    const data = callResults[chainId]?.[callKey];
    // console.log('blocksPerFetch', data)
    // no data, must fetch
    if (!data || !blocksPerFetch) return true;
    const minDataBlockNumber = latestBlockNumber - (blocksPerFetch - 1);
    // console.log('minDataBlockNumber', minDataBlockNumber)

    // 如果数据正在被获取，并且目标区块号 (fetchingBlockNumber) 已足够新，则不需要重新获取
    if (
      data.fetchingBlockNumber &&
      data.fetchingBlockNumber >= minDataBlockNumber
    )
      return false;
    // 如果 blockNumber（已获取的数据区块号）不存在，或者数据区块号早于允许的最小区块号，则标记为需要重新获取
    return !data.blockNumber || data.blockNumber < minDataBlockNumber;
  });
  // console.log('keys', keys)
  return keys;
}

export default function Updater() {
  const multicallStore = useMulticallStore();

  const { callListeners, callResults } = storeToRefs(multicallStore);
  const debouncedListeners = useDebounce(callListeners, 100);

  const { chainId } = useActiveChainId();
  const { blockNumber } = useAppBlockHooks();

  const listeningKeys = computed(() => {
    return activeListeningKeys(debouncedListeners.value, chainId.value);
  });
  const unserializedOutdatedCallKeys = computed(() => {
    return outdatedListeningKeys(
      callResults.value,
      listeningKeys.value,
      chainId.value,
      blockNumber.value,
    );
  });
  const serializedOutdatedCallKeys = computed(() => {
    const str = JSON.stringify(unserializedOutdatedCallKeys.value.sort());
    return str;
  });
  const multicallAddress = useMulticallAddress();

  const cancellations = ref<null | {
    blockNumber: number;
    cancellations: (() => void)[];
  }>(null);
  watch(
    [blockNumber, chainId, serializedOutdatedCallKeys, multicallAddress],
    ([blockNumber, chainId, serializedOutdatedCallKeys, multicallAddress]) => {
      if (
        !blockNumber ||
        !chainId ||
        !serializedOutdatedCallKeys ||
        !multicallAddress
      )
        return;
      // 需要更新的 key
      const outdatedCallKeys: string[] = JSON.parse(serializedOutdatedCallKeys);
      if (outdatedCallKeys.length === 0) return;
      // 解析需要更新的 key
      const calls: Call[] = outdatedCallKeys.map((key) => parseCallKey(key));
      const chunkedCalls = chunkArray(calls, CALL_CHUNK_SIZE);

      if (cancellations.value?.blockNumber !== blockNumber) {
        cancellations.value?.cancellations.forEach((c) => c());
      }
      // console.log('multicallContract blockNumber', blockNumber);

      multicallStore.fetchingMulticallResults({
        calls,
        chainId,
        fetchingBlockNumber: blockNumber,
      });
      cancellations.value = {
        blockNumber,
        cancellations: chunkedCalls.map((chunk, index) => {
          const { cancel, promise } = retry(
            () => fetchChunk(multicallAddress, chunk, blockNumber),
            {
              n: Infinity,
              minWait: 2500,
              maxWait: 3500,
            },
          );
          promise
            .then(({ results: returnData, blockNumber: fetchBlockNumber }) => {
              cancellations.value = { cancellations: [], blockNumber };
              // 累加前面所有索引的长度
              const firstCallKeyIndex = chunkedCalls
                .slice(0, index)
                .reduce<number>((memo, curr) => memo + curr.length, 0);
              const lastCallKeyIndex = firstCallKeyIndex + returnData.length;

              const { erroredCalls, results } = outdatedCallKeys
                .slice(firstCallKeyIndex, lastCallKeyIndex)
                .reduce<{
                  erroredCalls: Call[];
                  results: { [callKey: string]: null | string };
                }>(
                  (memo, callKey, i) => {
                    if (returnData[i]?.success) {
                      memo.results[callKey] = returnData[i].returnData ?? null;
                    } else {
                      memo.erroredCalls.push(parseCallKey(callKey));
                    }
                    return memo;
                  },
                  { erroredCalls: [], results: {} },
                );
              // console.log('updataCall', erroredCalls, results)
              if (Object.keys(results).length > 0) {
                multicallStore.updateMulticallResults({
                  results,
                  chainId,
                  blockNumber: fetchBlockNumber,
                });
              }
              if (erroredCalls.length > 0) {
                multicallStore.errorFetchingMulticallResults({
                  calls: erroredCalls,
                  chainId,
                  fetchingBlockNumber: fetchBlockNumber,
                });
              }
            })
            .catch((error: any) => {
              if (error instanceof CancelledError) {
                console.warn('Cancelled fetch for blockNumber', blockNumber);
                return;
              }
              multicallStore.errorFetchingMulticallResults({
                calls,
                chainId,
                fetchingBlockNumber: blockNumber,
              });
              console.error(
                'Failed to fetch multicall chunk',
                chunk,
                chainId,
                error,
                blockNumber,
              );
            });
          return cancel;
        }),
      };
    },
  );
}
