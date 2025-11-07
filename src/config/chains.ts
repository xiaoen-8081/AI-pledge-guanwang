import { bsc, bscTestnet, coreDao } from '@wagmi/vue/chains'
import type { Chain } from '@wagmi/vue/chains'
import { defineChain } from 'viem'

const polChain = defineChain({
  id: 137,
  name: 'Polygon',
  nativeCurrency: { decimals: 18, name: 'MATIC', symbol: 'MATIC' },
  rpcUrls: {
    default: { http: ['https://polygon-rpc.com'] },
  },
  blockExplorers: {
    default: { name: 'Polygonscan', url: 'https://polygonscan.com' },
  },
  contracts: {
    multicall3: { address: '0x275617327c958bD06b5D6b871E7f491D76113dd8' },
  },
  testnet: false,
}) satisfies Chain

export const CHAINS: [Chain, ...Chain[]] = [
  bsc,
  bscTestnet,
  coreDao,
  polChain,
]
