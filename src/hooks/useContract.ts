import type { Abi, Address, PublicClient } from 'viem'

import { getPublicClient, getWalletClient } from '@wagmi/core'
import { getContract } from 'viem'

import { chains, wagmiConfig } from '@/utils/wagmi'

import { useActiveChainId } from './useActiveChainId'

export function useMulticallAddress() {
  const { chainId } = useActiveChainId()
  const multicallAddress = computed(() => {
    const active = chains.find(x => x.id === chainId.value)
    return active?.contracts?.multicall3?.address
  })
  return multicallAddress
}

// returns null on errors
export async function useContractPublic(address: Address, abi: Abi) {
  const publicClient = getPublicClient(wagmiConfig)
  const walletClient = await getWalletClient(wagmiConfig)
  const contract = getContract({
    address,
    abi,
    client: {
      public: publicClient as PublicClient,
      wallet: walletClient,
    },
  })
  return contract
}
export async function useContractWallet(
  address: Address,
  abi: Abi,
  account: Address,
) {
  const publicClient = getPublicClient(wagmiConfig)
  const walletClient = await getWalletClient(wagmiConfig, {
    account,
  })
  const contractInstance = getContract({
    address,
    abi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })
  // contractInstance.write.
  return contractInstance
}
