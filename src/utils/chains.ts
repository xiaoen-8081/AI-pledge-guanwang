import type { Chain } from '@wagmi/vue/chains';

import { polygonAmoy } from '@wagmi/vue/chains';
import { defineChain } from 'viem';

const polygon = defineChain({
  id: 137,
  name: 'Polygon',
  nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://polygon-mainnet.infura.io/v3/3c76ef2916054f2c979664c6ca70e276',
        'https://polygon-rpc.com',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com',
      apiUrl: 'https://api.polygonscan.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 25_770_160,
    },
  },
}) satisfies Chain;

export const CHAINS: [Chain, ...Chain[]] = [polygon, polygonAmoy];
