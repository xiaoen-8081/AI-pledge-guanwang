<script setup lang="ts">
import type { Hash } from 'viem'
import { ContractApi, TranskApi } from '@/api/modules'
import { decodeEventLog } from 'viem'
import { useUserGroupInfo } from '@/stores/user/hooks'

interface PropType {
  hash?: Hash
  detail?: Service.TransApi.TransInfo
  receipt?: Service.TransApi.TransReceipt
}
const { hash } = defineProps<PropType>()
const { groupId } = useUserGroupInfo()

const { send: sendGetAbiFun } = useRequest(
  methodId => ContractApi.getAbiFun(methodId),
  { immediate: false, initialData: { data: {} } },
)

const { loading: loadingDetail, send: sendTransResByHash, data: transResDetail } = useRequest(
  () => TranskApi.transactionReceipt(groupId.value, hash),
  { immediate: false, initialData: { data: {} } },
).onSuccess(() => {
  if (transResDetail.value.data.logs.length) {
    // console.log('transResDetail.value.data.logs', transResDetail.value.data.logs)
    transResDetail.value.data.logs.forEach(async (item, index) => {
      if (item.topics[0]) {
        const { data } = await sendGetAbiFun(item.topics[0])
        const parsedInputData: Record<string, any> = {}
        const abiObj = JSON.parse(data.abiInfo)
        parsedInputData.abi = abiObj
        parsedInputData.methodName = abiObj.name
        const params = abiObj.inputs.map((x, i) => {
          const text = x.indexed ? `index_topic_${i + 1} ` : ''
          const type = x.type
          const name = x.name
          return text + type + name
        }).join(', ')
        // console.log('parsedInputData', parsedInputData)
        parsedInputData.desc = `${abiObj.name}(${params})`
        const decodetopics = item.data !== '0x' && decodeEventLog({
          abi: [abiObj],
          data: item.data,
          topics: item.topics,
        }) as any
        const inputDataParams = abiObj.inputs.map((x, i) => {
          return {
            index: i,
            name: x.name,
            type: x.type,
            data: decodetopics.args?.[x.name] || '0',
            hex: '',
            indexed: x.indexed,
          }
        })
        parsedInputData.inputDataParams = inputDataParams
        // console.log('parsedInputData', parsedInputData)
        // console.log('decodetopics', decodetopics)
        transResDetail.value.data.logs[index].parsedInputData = parsedInputData
      }
    })
  }
})
const loading = computed(() => {
  return loadingDetail.value
})
const receipt = computed(() => {
  return transResDetail.value.data
})
watch(
  [
    () => hash,
    () => groupId.value,
  ],
  ([val1, val2]) => {
    if (val1 && val2) {
      sendTransResByHash()
    }
  },
  { immediate: true },
)
</script>

<template>
  <n-card title="事务接收事件日志">
    <template v-if="loading">
      <n-flex vertical>
        <n-skeleton height="20px" width="23%" />
        <n-skeleton height="20px" width="33%" />
        <n-skeleton height="20px" width="43%" />
        <n-skeleton height="20px" width="53%" />
        <n-skeleton height="20px" width="53%" />
        <n-skeleton height="20px" width="53%" />
        <n-skeleton height="20px" width="83%" />
        <n-skeleton height="20px" width="93%" />
      </n-flex>
    </template>
    <n-flex v-else vertical :size="50" class="text-14">
      <n-flex v-for="(item, index) in receipt?.logs" :key="index">
        <n-button circle type="success" secondary>
          {{ index }}
        </n-button>
        <n-grid class="flex-1" x-gap="10" y-gap="10" :cols="24">
          <n-gi :span="3" class="text-right font-700">
            地址
          </n-gi>
          <n-gi :span="21">
            <AddressText :encrypt="false" :address="item.address" />
          </n-gi>
          <n-gi :span="3" class="text-right font-700">
            名称
          </n-gi>
          <n-gi :span="21" class="text-textColor2">
            {{ item.parsedInputData?.desc }}
          </n-gi>
          <n-gi :span="3" class="text-right font-700">
            Topics
          </n-gi>
          <n-gi :span="21">
            <n-flex vertical :size="6">
              <template v-if="item.topics">
                <TxDetailLogTopicsItem
                  v-for="(x, indey) in item.topics"
                  :key="indey"
                  :show-select="indey !== 0"
                  :index="indey"
                  :topics-item="x"
                />
              </template>
            </n-flex>
          </n-gi>
          <n-gi :span="3" class="text-right font-700">
            数据
          </n-gi>
          <n-gi :span="21">
            <TxDetailLogDateItem
              v-if="item.parsedInputData?.inputDataParams"
              :raw-date="item.data"
              :input-data-params="item.parsedInputData.inputDataParams"
            />
          </n-gi>
        </n-grid>
      </n-flex>
    </n-flex>
  </n-card>
</template>
