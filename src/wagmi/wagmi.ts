import memoize from 'lodash/memoize'
import { CHAINS } from '@/config/chains'
import { createConfig, fallback, http } from '@wagmi/vue'
import { injected } from '@wagmi/vue/connectors'
import type { Transport } from 'viem'
import { QueryClient } from '@tanstack/vue-query'

declare module '@wagmi/vue' {
  interface Register {
    config: typeof wagmiConfig
  }
}
export const chains = CHAINS

export const CHAIN_IDS = chains.map(c => c.id)

export const transports = chains.reduce((pre, chain) => {
  if (pre) {
    return { ...pre, [chain.id]: fallback([http()]) }
  }
  return { [chain.id]: http() }
}, {} as Record<number, Transport>)

export const wagmiConfig = createConfig({
  chains,
  connectors: [injected({ shimDisconnect: false })],
  transports,
})

export const queryClient = new QueryClient()

export const isChainSupported = memoize((chainId: number) => (CHAIN_IDS).includes(chainId))

export const isChainTestnet = memoize((chainId: number) => {
  const found = chains.find(c => c.id === chainId)
  return found ? 'testnet' in found : false
})
