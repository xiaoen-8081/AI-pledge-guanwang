import type { Address, PublicClient } from 'viem'

import { getPublicClient, getWalletClient } from '@wagmi/core'

import { wagmiConfig } from '@/utils/wagmi'

export function usePublicClient() {
  const publicClient = getPublicClient(wagmiConfig)
  return { public: publicClient as PublicClient }
}

export async function useWalletClient(account: Address) {
  const publicClient = getPublicClient(wagmiConfig)
  const walletClient = await getWalletClient(wagmiConfig, {
    account,
  })
  return { wallet: walletClient, public: publicClient as PublicClient }
}
