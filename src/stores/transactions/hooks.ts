import type { Hash } from 'viem'

import type { TransactionDetails } from '.'
import type { TransactionType } from './types'

import type { RefOrComputedRef } from '@/constants/types'

import { getTransactionReceipt } from '@wagmi/core'
import { useAccount } from '@wagmi/vue'
import { pickBy } from 'lodash'

import { useAccountActiveChain } from '@/hooks/useAccountActiveChain'
import { useActiveChainId } from '@/hooks/useActiveChainId'
import { wagmiConfig } from '@/utils/wagmi'

import { useTransactionsStore } from '.'

// helper that can take a ethers library transaction response and add it to the list of transactions
export interface addCustomTransactionType {
  summary?: string
  claim?: { recipient: string }
  approval?: { spender: string, tokenAddress: string }
  translatableSummary?: {
    data?: Record<string, number | string | undefined>
    text: string
  }
  type?: TransactionType
}

export function useTransactionAdder(): (
hash: string,
customData?: addCustomTransactionType,
) => void {
  const { chainId, account } = useAccountActiveChain()
  const transactionsStore = useTransactionsStore()

  const add = (
    hash: string,
    {
      summary,
      translatableSummary,
      approval,
      claim,
      type,
    }: addCustomTransactionType = {},
  ) => {
    if (!account.value)
      return
    if (!chainId.value)
      return

    transactionsStore.addTransaction({
      hash,
      from: account.value,
      type,
      translatableSummary,
      chainId: chainId.value,
      approval,
      summary,
      claim,
    })
  }
  return add
}

// 所有链的交易
export function useAllChainTransactions(
  chainId: RefOrComputedRef<number | undefined>,
) {
  const { address: account } = useAccount()
  const transactionsStore = useTransactionsStore()
  const transactions = computed<{ [txHash: string]: TransactionDetails }>(
    () => {
      if (chainId.value && transactionsStore.transactions?.[chainId.value]) {
        return pickBy(
          transactionsStore.transactions[chainId.value],
          transactionDetails =>
            transactionDetails.from.toLowerCase()
            === account.value?.toLowerCase(),
        )
      }
      return {}
    },
  )

  return transactions
}
// 当前链的交易
export function useAllActiveChainTransactions() {
  const { chainId } = useActiveChainId()
  const all = useAllChainTransactions(chainId)
  return all
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllActiveChainTransactions()

  if (!transactionHash || !transactions.value[transactionHash])
    return false

  return !transactions.value[transactionHash].receipt
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return Date.now() - tx.addedTime < 86_400_000
}
// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(
  tokenAddress: RefOrComputedRef<string | undefined>,
  spender: RefOrComputedRef<string | undefined>,
) {
  const allTransactions = useAllActiveChainTransactions()

  const bool = computed(() => {
    return (
      typeof tokenAddress.value === 'string'
      && typeof spender.value === 'string'
      && Object.keys(allTransactions.value).some((hash) => {
        const tx = allTransactions.value[hash]
        if (!tx)
          return false
        if (tx.receipt) {
          return false
        }
        const { approval } = tx
        if (!approval)
          return false
        return (
          approval.spender === spender.value
          && approval.tokenAddress === tokenAddress.value
          && isTransactionRecent(tx)
        )
      })
    )
  })

  return bool
}

// calculate pending transactions
export function usePendingTransactions() {
  const allTransactions = useAllActiveChainTransactions()

  const sortedRecentTransactions = computed(() => {
    const txs = Object.values(allTransactions.value)
    return txs
      .filter(val => isTransactionRecent(val))
      .sort(newTransactionsFirst)
  })
  const pending = computed(() => {
    return sortedRecentTransactions.value
      .filter(tx => !tx.receipt)
      .map(tx => tx.hash)
  })

  const hasPendingTransactions = computed(() => {
    return pending.value.length > 0
  })
  const pendingNumber = computed(() => {
    return pending.value.length
  })
  return {
    hasPendingTransactions,
    pendingNumber,
  }
}

export function getTransactionsRes(hash: Hash) {
  return new Promise((resolve, reject) => {
    getTransactionReceipt(wagmiConfig, { hash })
      .then((receipt) => {
        resolve(receipt)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
