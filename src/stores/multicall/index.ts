import type { Call, ListenerOptions } from './types';

import { defineStore } from 'pinia';

import { toCallKey } from './actions';

export interface MulticallState {
  callListeners: {
    // on a per-chain basis
    [chainId: number]: {
      // stores for each call key the listeners' preferences
      [callKey: string]: {
        // stores how many listeners there are per each blocks per fetch preference
        // 存储每个获取首选项每个块有多少侦听器
        [blocksPerFetch: number]: number; // 引用计数（被几个组件监听）
      };
    };
  };

  callResults: {
    [chainId: number]: {
      [callKey: string]: {
        blockNumber?: number;
        data?: null | string;
        fetchingBlockNumber?: number;
      };
    };
  };
}
export const useMulticallStore = defineStore(`Multicall`, () => {
  const callListeners = ref<MulticallState['callListeners']>({});
  const callResults = ref<MulticallState['callResults']>({});

  const addMulticallListeners = ({
    chainId,
    calls,
    options,
  }: {
    calls: Call[];
    chainId: number;
    options?: ListenerOptions;
  }) => {
    const { blocksPerFetch = 1 } = options || {};
    const listeners = (callListeners.value[chainId] ??= {});
    calls.forEach((call) => {
      const callKey = toCallKey(call);
      const callEntry = (listeners[callKey] ??= {});
      callEntry[blocksPerFetch] = (callEntry[blocksPerFetch] ?? 0) + 1;
    });
    // console.log('listeners', listeners);
  };

  const removeMulticallListeners = ({
    chainId,
    calls,
    options,
  }: {
    calls: Call[];
    chainId: number;
    options?: ListenerOptions;
  }) => {
    const listeners: MulticallState['callListeners'] =
      callListeners.value || {};
    if (!listeners[chainId]) return;
    const { blocksPerFetch = 1 } = options || {};
    // callListeners.value[chainId] = listeners[chainId] ?? {};

    calls.forEach((call) => {
      const callKey = toCallKey(call);
      if (!listeners[chainId]?.[callKey]) return;
      if (!listeners[chainId][callKey][blocksPerFetch]) return;
      if (listeners[chainId][callKey][blocksPerFetch] === 1) {
        delete listeners[chainId]?.[callKey]?.[blocksPerFetch];
      } else {
        (listeners[chainId][callKey][blocksPerFetch] as any)--;
      }
    });
  };

  const fetchingMulticallResults = ({
    chainId,
    fetchingBlockNumber,
    calls,
  }: {
    calls: Call[];
    chainId: number;
    fetchingBlockNumber: number;
  }) => {
    // callResults.value[chainId] = callResults.value[chainId] ?? {};
    const chainRes = (callResults.value[chainId] ??= {});
    calls.forEach((call) => {
      const callKey = toCallKey(call);
      const current = callResults.value[chainId]?.[callKey];
      if (current) {
        if ((current.fetchingBlockNumber ?? 0) >= fetchingBlockNumber) return;
        current.fetchingBlockNumber = fetchingBlockNumber;
      } else {
        chainRes[callKey] = {
          fetchingBlockNumber,
        };
      }
    });
  };

  const errorFetchingMulticallResults = ({
    chainId,
    fetchingBlockNumber,
    calls,
  }: {
    calls: Call[];
    chainId: number;
    fetchingBlockNumber: number;
  }) => {
    const callResultsRes = (callResults.value[chainId] ??= {});
    // callResults.value[chainId] = callResults.value[chainId] ?? {};
    calls.forEach((call) => {
      const callKey = toCallKey(call);
      const current = callResultsRes[callKey];
      if (!current) return;
      if (current.fetchingBlockNumber === fetchingBlockNumber) {
        delete current.fetchingBlockNumber;
        current.data = null;
        current.fetchingBlockNumber = fetchingBlockNumber;
      }
    });
  };

  const updateMulticallResults = ({
    chainId,
    results,
    blockNumber,
  }: {
    blockNumber: number;
    chainId: number;
    results: { [callKey: string]: null | string };
  }) => {
    const callResultsRes = (callResults.value[chainId] ??= {});
    // callResults.value[chainId] = callResults.value[chainId] ?? {};
    Object.keys(results).forEach((callKey) => {
      const current = callResultsRes[callKey];
      if ((current?.blockNumber ?? 0) > blockNumber) return;
      callResultsRes[callKey] = {
        data: results[callKey],
        blockNumber,
      };
    });
  };

  function $reset() {}

  return {
    $reset,
    callListeners,
    callResults,
    addMulticallListeners,
    removeMulticallListeners,
    fetchingMulticallResults,
    errorFetchingMulticallResults,
    updateMulticallResults,
  };
});
