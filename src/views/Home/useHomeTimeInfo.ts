import { HomeApi } from '@/api/modules'

export function useHomeTimeInfo(groupId: Ref<number | undefined> | number) {
  const { send: sendGetBlockChainInfo, data } = useRequest(
    groupId => HomeApi.blockShowInfo(groupId),
    { immediate: false, initialData: { data: {} } },
  )
  const timer = ref<NodeJS.Timeout | null >(null)

  watch(
    [() => unref(groupId)],
    ([val1]) => {
      console.log('newVal', val1)
      if (val1) {
        timer.value && clearInterval(timer.value)
        sendGetBlockChainInfo(val1)
        timer.value = setInterval(() => {
          sendGetBlockChainInfo(val1)
        }, 3000)
      }
    },
    { immediate: true },
  )

  const info = computed(() => {
    return data.value.data
  })

  onUnmounted(() => {
    timer.value && clearInterval(timer.value)
  })

  return { info }
}
