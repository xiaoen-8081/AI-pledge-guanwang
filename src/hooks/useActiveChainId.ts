import { ChainId } from '@pancakeswap/chains'
import { useAccount } from '@wagmi/vue'

import { isChainSupported } from '@/utils/wagmi'

export function useActiveChainId() {
  const { chainId: wagmiChainId } = useAccount()

  const chainId = computed(() => {
    const id = wagmiChainId.value ?? ChainId.BSC
    return isChainSupported(id) ? id : ChainId.BSC
  })

  const isWrongNetwork = computed(() => {
    return Boolean(
      (wagmiChainId.value && !isChainSupported(wagmiChainId.value)) ?? false,
    )
  })

  return {
    chainId,
    isWrongNetwork,
  }
}
