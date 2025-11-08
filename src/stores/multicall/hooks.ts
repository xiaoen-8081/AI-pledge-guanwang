import type { FunctionFragment, Interface } from 'ethers'

import type {
  Call,
  CallResult,
  CallState,
  ListenerOptions,
  MethodArg,
  MethodArgs,
  OptionalMethodInputs,
  Result,
} from './types'

import type { RefOrComputedRef } from '@/constants/types'

import { storeToRefs } from 'pinia'

import { useActiveChainId } from '@/hooks/useActiveChainId'

import { useMulticallStore } from '.'
import { useAppBlockHooks } from '../application/hooks'
import { parseCallKey, toCallKey } from './actions'
import {
  INVALID_CALL_STATE,
  INVALID_RESULT,
  LOADING_CALL_STATE,
} from './types'

function isMethodArg(x: unknown): x is MethodArg {
  return ['bigint', 'number', 'string'].includes(typeof x)
}
function isValidMethodArgs(x: unknown): x is MethodArgs | undefined {
  return (
    x === undefined
    || (Array.isArray(x)
      && x.every(
        xi =>
          isMethodArg(xi)
          || (Array.isArray(xi) && xi.every(val => isMethodArg(val))),
      ))
  )
}
// use this options object
export const NEVER_RELOAD: ListenerOptions = {
  blocksPerFetch: Infinity,
}

// 监听指定的调用(calls)并在链上数据更新时提供最新的调用结果
function useCallsData(
  calls: RefOrComputedRef<(Call | undefined)[]>,
  options?: ListenerOptions,
) {
  const { chainId } = useActiveChainId()

  const multicallStore = useMulticallStore()
  const { callResults } = storeToRefs(multicallStore)
  // console.warn('callResults', calls.value);

  // 将 calls 过滤、转换为唯一键，并序列化为 JSON 字符串
  const serializedCallKeys = computed(() => {
    const jsonStr = JSON.stringify(
      calls.value
        ?.filter((val): val is Call => !!val)
        ?.map(val => toCallKey(val))
        ?.sort() ?? [],
    )
    return jsonStr
  })

  // 监听器仅在实际调用发生变化且持续至少 100ms 后才更新
  watch(
    [serializedCallKeys, chainId],
    ([serializedCallKeys, chainId], _, onCleanup) => {
      // console.log(99_900_099_999, [serializedCallKeys, chainId]);
      const callKeys: string[] = JSON.parse(serializedCallKeys)
      if (!chainId || callKeys.length === 0)
        return
      const calls = callKeys.map(key => parseCallKey(key))
      multicallStore.addMulticallListeners({
        chainId,
        calls,
        options,
      })
      onCleanup(() => {
        multicallStore.removeMulticallListeners({
          chainId,
          calls,
          options,
        })
      })
    },
    { immediate: true },
  )

  const results = computed(() => {
    return calls.value.map<CallResult>((call) => {
      if (!chainId.value || !call)
        return INVALID_RESULT
      const res = callResults.value[chainId.value]?.[toCallKey(call)]
      let data: string | undefined
      if (res?.data && res?.data !== '0x') {
        data = res.data
      }
      return { valid: true, data, blockNumber: res?.blockNumber }
    })
  })
  return results
}

// 为每条调用call添加 调用状态
function toCallState<T = any>(
  callResult: CallResult | undefined,
  contractInterface: Interface | undefined,
  fragment: FunctionFragment | null | undefined,
  latestBlockNumber: number | undefined,
): CallState<T> {
  if (!callResult)
    return INVALID_CALL_STATE
  const { valid, data, blockNumber } = callResult
  if (!valid)
    return INVALID_CALL_STATE
  if (valid && !blockNumber)
    return LOADING_CALL_STATE
  if (!contractInterface || !fragment || !latestBlockNumber)
    return LOADING_CALL_STATE
  const success = data && data.length > 2
  const syncing = (blockNumber ?? 0) < latestBlockNumber
  let result: Result<T> | undefined
  if (success && data) {
    try {
      result = contractInterface.decodeFunctionResult(fragment, data)
    }
    catch (error) {
      console.warn(`Result data parsing failed ${error}`, fragment, data)
      return {
        valid: true,
        loading: false,
        error: true,
        syncing,
        result,
      }
    }
  }
  return {
    valid: true,
    loading: false,
    syncing,
    result,
    error: !success,
  }
}

/**
 * 查询单个智能合约的单一方法的返回值
 * 可能是 Multicall 自带的方法 比如：getEthBalance
 * 可能是 比的合约
 */
export function useSingleContractMultipleData<T = any>(
  address: RefOrComputedRef<string | undefined>,
  contractInterface: Interface,
  methodName: string,
  callInputs: RefOrComputedRef<OptionalMethodInputs[]>,
  options?: ListenerOptions,
): ComputedRef<CallState<T>[]> {
  // 方法函数
  const fragment = computed(() => {
    return contractInterface.getFunction(methodName)
  })

  // 包装方法参数 给唯一地址标识
  const calls = computed(() => {
    const f = fragment.value
    if (!address.value || !f || callInputs.value?.length === 0)
      return []

    const args = callInputs.value.map<Call>((inputs) => {
      return {
        address: address.value as string,
        callData: contractInterface.encodeFunctionData(f, inputs),
      }
    })

    return args
  })

  // 返回调用结果
  const results = useCallsData(calls, options)
  const { blockNumber } = useAppBlockHooks()

  const formartRes = computed(() => {
    const resMap = results.value.map(result =>
      toCallState<T>(
        result,
        contractInterface,
        fragment.value,
        blockNumber.value,
      ),
    )
    return resMap
  })
  return formartRes
}

/**
 * 查询多个智能合约的单一方法的返回值, 批量处理多个地址的链上调用
 * 不同合约的同一个方法，比如不同地址的余额，或者不同lp地址的余额
 */
export function useMultipleContractSingleData(
  addresses: RefOrComputedRef<(string | undefined)[]>,
  contractInterface: Interface,
  methodName: string,
  callInputs?: RefOrComputedRef<OptionalMethodInputs>,
  options?: ListenerOptions,
) {
  // 方法函数
  const fragment = computed(() => {
    return contractInterface.getFunction(methodName) || undefined
  })
  // 方法参数和函数编码
  const callData = computed(() => {
    if (!fragment.value || !isValidMethodArgs(callInputs?.value))
      return undefined
    return contractInterface.encodeFunctionData(
      fragment.value,
      callInputs?.value,
    )
  })
  // 包装方法参数 给唯一地址标识
  const calls = computed(() => {
    if (!fragment.value || addresses.value.length === 0 || !callData.value)
      return []
    return addresses.value.map<Call | undefined>((address) => {
      return address && callData.value
        ? { address, callData: callData.value }
        : undefined
    })
  })

  // // 返回调用结果
  const results = useCallsData(calls, options)
  const { blockNumber } = useAppBlockHooks()

  const formartRes = computed(() => {
    const resMap = results.value.map(result =>
      toCallState(result, contractInterface, fragment.value, blockNumber.value),
    )
    return resMap
  })
  return formartRes
}

/**
 * 单次查询合约方法
 */
export function useSingleCallResult<T = any>(
  address: RefOrComputedRef<string | undefined>,
  contractInterface: Interface,
  methodName: string,
  callInputs?: RefOrComputedRef<OptionalMethodInputs>,
  options?: ListenerOptions,
): ComputedRef<CallState<T>> {
  // 方法函数
  const fragment = computed(() => {
    return contractInterface.getFunction(methodName)
  })

  // 包装方法参数 给唯一地址标识
  const calls = computed(() => {
    if (
      !address.value
      || !fragment.value
      || !isValidMethodArgs(callInputs?.value)
    ) {
      return []
    }
    return [
      {
        address: address.value,
        callData: contractInterface.encodeFunctionData(
          fragment.value,
          callInputs?.value,
        ),
      },
    ]
  })

  // 返回调用结果
  const result = useCallsData(calls, options)
  const { blockNumber } = useAppBlockHooks()

  const formartRes = computed(() => {
    const resMap = toCallState<T>(
      result.value[0],
      contractInterface,
      fragment.value,
      blockNumber.value,
    )
    // console.warn('resMap', resMap);
    return resMap
  })
  return formartRes
}
