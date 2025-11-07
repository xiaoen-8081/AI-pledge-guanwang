import type {
  finalizeTransaction,
  NonBscFarmTransactionType,
  Order,
  SerializableTransactionReceipt,
  TransactionType,
} from './types';

import { defineStore } from 'pinia';

const now = () => Date.now();

export interface TransactionDetails {
  hash: string;
  from: string;
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  approval?: { spender: string; tokenAddress: string };
  claim?: { recipient: string };
  receipt?: SerializableTransactionReceipt;

  nonBscFarm?: NonBscFarmTransactionType;
  type?: TransactionType;
  order?: Order;
  summary?: string;
  translatableSummary?: {
    data?: Record<string, number | string>;
    text: string;
  };
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
}
export const useTransactionsStore = defineStore(
  `TRANS`,
  () => {
    const transactions = ref<TransactionState>({});

    const finalizeTransaction = ({
      chainId,
      hash,
      receipt,
    }: finalizeTransaction) => {
      const tx = (transactions.value[chainId] ??= {});
      if (tx) {
        const txHash = (tx[hash] ??= {} as TransactionDetails);
        txHash.receipt = receipt;
        txHash.confirmedTime = now();
      }
    };

    const addTransaction = ({
      chainId,
      from,
      hash,
      approval,
      type,
      translatableSummary,
      summary,
      claim,
    }: any) => {
      // console.log(1312, 'addTransaction', { chainId, from, hash, approval, summary, claim })
      if (transactions.value[chainId]?.[hash]) {
        throw new Error('Attempted to add existing transaction.');
      }
      const txs = transactions.value[chainId] ?? {};
      txs[hash] = {
        hash,
        approval,
        summary,
        claim,
        from,
        type,
        translatableSummary,
        addedTime: now(),
      };
      transactions.value[chainId] = txs;
    };

    function $reset() {}

    return {
      $reset,
      transactions,
      finalizeTransaction,
      addTransaction,
    };
  },
  {
    persist: true,
  },
);
