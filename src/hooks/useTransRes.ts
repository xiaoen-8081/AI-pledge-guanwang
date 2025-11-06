import type { Hash } from 'viem'

import { waitForTransactionReceipt } from '@wagmi/core'

import { wagmiConfig } from '@/utils/wagmi'

export async function getTransactionsResFinally(hash: Hash) {
  return waitForTransactionReceipt(wagmiConfig, { hash })
}
