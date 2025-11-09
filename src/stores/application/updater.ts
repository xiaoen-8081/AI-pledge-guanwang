import { useDocumentVisibility } from '@vueuse/core'
import { useBlockNumber as useBlockNumberWagmi, useChainId } from '@wagmi/vue'

import { useApplicationStore } from './index'

export default function Updater(obj?: { num: number, scopeKey: string }) {
  const { num = 1, scopeKey = 'blockNumber' } = obj || {}
  const chainId = useChainId()
  const applicationStore = useApplicationStore()
  const domVisibility = useDocumentVisibility()

  const isWatch = computed(() => {
    return Boolean(chainId.value && domVisibility.value === 'visible')
  })
  const { data } = useBlockNumberWagmi({ chainId, scopeKey, watch: isWatch })
  const count = ref(1)
  watch(
    data,
    (newVal) => {
      // console.log('useBlockNumber', data.value, chainId.value)
      if (chainId.value === undefined)
        return
      if (count.value === num) {
        count.value = 1
        applicationStore.blockNumber[chainId.value] = newVal
          ? Number(newVal)
          : undefined
      }
      else {
        count.value += 1
      }
    },
    {
      immediate: true,
    },
  )
}
