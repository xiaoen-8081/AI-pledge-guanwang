import { defineStore } from 'pinia'
import { APP_NAME } from '@/config/app'

export const useContractConfigStore = defineStore(`${APP_NAME}_CONTRACT`, () => {
  const contractMethodMap = ref<Record<string, {
    methodId: string
    methodName: string
    contractAddress: string
    methodChName: string
  }>>({})
  return {
    contractMethodMap,
  }
})
