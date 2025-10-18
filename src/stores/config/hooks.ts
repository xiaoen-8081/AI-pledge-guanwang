import { storeToRefs } from 'pinia'
import { useContractConfigStore } from './index'

export function useUserContractMethodMapInfo() {
  const contractConfigStore = useContractConfigStore()
  const { contractMethodMap } = storeToRefs(contractConfigStore)
  return {
    contractMethodMap,
  }
}
