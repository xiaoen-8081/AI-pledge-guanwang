import type { Hash } from 'viem'

import type { TransactionDetails } from '.'

import to from 'await-to-js'

import { poll } from '@ethersproject/web'
import { getTransactionReceipt } from '@wagmi/core'
import { forEach, merge, pickBy } from 'lodash'

import { useActiveChainId } from '@/hooks/useActiveChainId'
import { wagmiConfig } from '@/utils/wagmi'

import { useTransactionsStore } from '.'
import { useAppBlockHooks } from '../application/hooks'
import { useAllChainTransactions } from './hooks'

export function shouldCheck(
  fetchedTransactions: { [txHash: string]: TransactionDetails },
  tx: TransactionDetails,
): boolean {
  if (tx.receipt)
    return false
  return !fetchedTransactions[tx.hash]
}

export default function Updater() {
  const { chainId } = useActiveChainId()
  const transactionsStore = useTransactionsStore()

  const transactions = useAllChainTransactions(chainId)

  const { blockNumber } = useAppBlockHooks()
  const fetchedTransactions = ref<{ [txHash: string]: TransactionDetails }>({})
  watch(
    [blockNumber, transactions],
    ([lastBlockNumber, transactions]) => {
      // console.log('blockNumber', lastBlockNumber)
      if (!chainId.value || !lastBlockNumber)
        return
      forEach(
        pickBy(transactions, (transaction) => {
          return shouldCheck(fetchedTransactions.value, transaction)
        }),
        (transaction) => {
          const getTransaction = async () => {
            poll(async () => {
              const [err, receipt] = await to(
                getTransactionReceipt(wagmiConfig, {
                  hash: transaction.hash as Hash,
                }),
              )
              if (err) {
                // console.error(`getTransactionReceipt error ${transaction.hash}`, err)
                return undefined
              }
              if (receipt === null || receipt.blockHash === null) {
                return undefined
              }
              transactionsStore.finalizeTransaction({
                chainId: chainId.value,
                hash: transaction.hash,
                receipt: {
                  blockHash: receipt.blockHash,
                  blockNumber: receipt.blockNumber.toString(),
                  contractAddress: receipt.contractAddress,
                  from: receipt.from,
                  status: receipt.status,
                  to: receipt.to,
                  transactionHash: receipt.transactionHash,
                  transactionIndex: receipt.transactionIndex,
                },
              })
              return true
            })
            merge(fetchedTransactions.value, {
              [transaction.hash]: transactions[transaction.hash],
            })
          }
          getTransaction()
        },
      )
    },
    { immediate: true },
  )
}
