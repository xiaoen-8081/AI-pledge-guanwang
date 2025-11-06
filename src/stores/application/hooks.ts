import { storeToRefs } from 'pinia'
import { useApplicationStore } from './index'

export function useCollapsedPopupHooks(): [Ref<boolean>, () => void] {
  const application = useApplicationStore()
  const { collapsed } = storeToRefs(application)
  const close = () => {
    collapsed.value = false
  }
  return [collapsed, close]
}

// 区块高度
export function useAppBlockHooks() {
  const application = useApplicationStore()
  const { chainId } = useActiveChainId()
  const { blockNumber } = storeToRefs(application)

  const block = computed(() => {
    return blockNumber.value[chainId.value]
  })
  return { blockNumber: block }
}
