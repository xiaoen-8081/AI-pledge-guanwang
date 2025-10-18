import { bsc, bscTestnet, coreDao } from '@wagmi/vue/chains'
import type { Chain } from '@wagmi/vue/chains'
import { defineChain } from 'viem'

const coreDatTestnet = defineChain({
  id: 1115, // 请替换为实际的链ID
  name: 'Core Blockchain Testnet',
  nativeCurrency: { decimals: 18, name: 'TCORE', symbol: 'tCORE' },
  rpcUrls: {
    default: { http: ['https://rpc.test.btcs.network'] },
  },
  blockExplorers: {
    default: { name: 'CoreDao', url: 'https://scan.test.btcs.network' },
  },
  contracts: {
    multicall3: { address: '0xcA11bde05977b3631167028862bE2a173976CA11' },
  },
  testnet: true,
}) satisfies Chain

export const CHAINS: [Chain, ...Chain[]] = [
  bsc,
  bscTestnet,
  coreDao,
  coreDatTestnet,
]
