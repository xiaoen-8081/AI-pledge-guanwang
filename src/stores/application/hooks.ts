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
