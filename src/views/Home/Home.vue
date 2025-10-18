<script setup lang="ts">
import { BlockApi, HomeApi, TranskApi } from '@/api/modules'
import { useUserGroupInfo } from '@/stores/user/hooks'
import { type DataTableColumns, NButton } from 'naive-ui'
import homeBanner from '@/assets/image/home-banner.png'
import { useHomeTimeInfo } from './useHomeTimeInfo'
import { timeFormat } from '@/utils/utils'

const { groupId } = useUserGroupInfo()

const { info } = useHomeTimeInfo(groupId)

const dataTimeBegin = timeFormat((new Date()).getTime(), 'yyyy-mm-dd')
const dataTimeEnd = timeFormat((new Date()).getTime() - 14 * 24 * 3600 * 1000, 'yyyy-mm-dd')

const { send: sendTxnLatelyInfo, data: dataTxnLately } = useRequest(
  groupId => HomeApi.homeTxnLately({ groupId, dataTimeBegin, dataTimeEnd }),
  { immediate: false, initialData: {} },
)

const { data: dateBlock, send: sendBlock } = usePaginatedRequest(
  () => {
    return BlockApi.blockList({ groupId: groupId.value as number })
  },
)

const { blockTime, transHash, blockHash, blockHeight, methNameText, address } = useTablerColItems()
// 区块
const columns: DataTableColumns<Service.BlockApi.BlockList> = [
  blockHeight({ key: 'number' }),
  blockHash({ blockNumber: 'number' }),
  { title: '交易数量', key: 'txn', minWidth: 100, align: 'right' },
  // { title: '时间', key: 'dateTimeStr', minWidth: 140, align: 'right' },
  blockTime({ key: 'dateTimeStr' }),
]

// 交易
const { data: dateTrans, send: sendTrans } = usePaginatedRequest(
  (pageNumber) => {
    return TranskApi.transListNew({ params: { groupId: groupId.value, pageNumber, pageSize: 6 } })
  },
)
const columns1 = computed(() => {
  return [
    transHash({ minWidth: 160 }),
    methNameText({ minWidth: 128 }),
    address({ minWidth: 140 }),
    blockTime({ key: 'blockTime1' }),
  ]
})
const timer = ref<NodeJS.Timeout | null >(null)
const timer1 = ref<NodeJS.Timeout | null >(null)

onMounted(() => {
  if (groupId.value) {
    sendTxnLatelyInfo(groupId.value)
    sendBlock()
    sendTrans()
  }
  timer.value = setInterval(() => {
    sendBlock()
    sendTrans()
  }, 3000)
  timer1.value = setInterval(() => {
    sendTxnLatelyInfo(groupId.value)
  }, 60 * 1000)
})
onUnmounted(() => {
  timer.value && clearInterval(timer.value)
  timer1.value && clearInterval(timer1.value)
})
</script>

<template>
  <n-flex vertical :size="15" class="py-15">
    <n-grid responsive="screen" cols="1 s:2" x-gap="15" y-gap="15">
      <n-gi>
        <n-card class="h-305">
          <template #header>
            <n-flex justify="space-between">
              <span>交易量趋势</span>
            </n-flex>
          </template>
          <trans-echarts :data-time-begin="dataTimeBegin" :data="dataTxnLately.data && dataTxnLately.data.length ? dataTxnLately.data : [{ dateStr: `${new Date().getMonth() + 1}/${new Date().getDate()}`, txn: 0 }]" />
        </n-card>
      </n-gi>
      <n-gi>
        <n-grid responsive="screen" cols="1" x-gap="15" y-gap="15">
          <n-gi>
            <n-card class="h-100">
              <n-flex vertical :size="0">
                <span class="text-18 font-600">最新区块</span>
                <div class="text-28 text-secondary font-700">
                  <DyNumberAnimation :val-string="String(info.latestNumber || '')" />
                </div>
              </n-flex>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card class="h-190" title="实时区块">
              <block-echarts :data="dateBlock" />
            </n-card>
          </n-gi>
        </n-grid>
      </n-gi>
    </n-grid>

    <n-grid responsive="screen" cols="1 s:2" x-gap="15" y-gap="15">
      <n-gi>
        <n-card class="h-100">
          <n-flex class="h-full" align="center" justify="space-evenly">
            <n-flex vertical align="center" class="flex-1">
              <span class="text-textColor2">交易数据</span>
              <span class="text-20 line-height-none">{{ info.txAllCount || 0 }}</span>
            </n-flex>
            <n-divider style="height: 50px;" vertical />
            <n-flex vertical justify="space-between" align="center" class="flex-1">
              <span class="text-textColor2">合约NFT数量</span>
              <span class="text-20 line-height-none">{{ info.nftCount || 0 }}</span>
            </n-flex>
            <n-divider vertical style="height: 50px;" />
            <n-flex vertical justify="space-between" align="center" class="flex-1">
              <span class="text-textColor2">链账户地址数</span>
              <span class="text-20 line-height-none">{{ info.chainUserCount || 0 }}</span>
            </n-flex>
          </n-flex>
        </n-card>
      </n-gi>
      <n-gi>
        <n-grid responsive="screen" cols="2" x-gap="15" y-gap="15">
          <n-gi>
            <n-card class="h-100">
              <n-flex align="center" class="pos-relative h-full" justify="space-between">
                <n-flex vertical>
                  <span class="text-textColor2">平均出块时间</span>
                  <span class="text-22 line-height-none">{{ ((info.averageBlockTime || 0) / 1000).toFixed(2) }}s</span>
                </n-flex>
                <!-- <div class="pos-absolute right-0 top-0">
                  <n-progress
                    :show-indicator="false" type="dashboard" :gap-offset-degree="0" :gap-degree="160"
                    :percentage="50"
                  />
                </div> -->
              </n-flex>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card class="h-100">
              <n-flex align="center" class="h-full" justify="space-between">
                <n-flex vertical>
                  <span class="text-textColor2">最高TPS</span>
                  <span class="text-22 line-height-none">{{ info.txCountTps }}</span>
                </n-flex>
              </n-flex>
            </n-card>
          </n-gi>
        </n-grid>
      </n-gi>
    </n-grid>

    <div>
      <n-carousel>
        <div class="w-full">
          <img :src="homeBanner" class="w-full" alt="">
        </div>
      </n-carousel>
    </div>
    <n-grid responsive="screen" cols="1 m:2" x-gap="15" y-gap="15">
      <n-gi>
        <n-card title="最新区块">
          <template #header-extra>
            <NButton text @click="$router.push({ name: 'Blocks' })">
              <n-flex align="center" :size="2" class="text-primary">
                <span>查看更多</span>
                <span class="i-carbon:chevron-right" />
              </n-flex>
            </NButton>
          </template>
          <n-data-table
            striped
            :row-key="(row) => row.number "
            :row-props="() => ({ style: 'height: 53px' })"
            :scrollbar-props="{ trigger: 'none' }"
            :columns="columns"
            :data="dateBlock.slice(0, 6)"
            :bordered="false"
          />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="最新交易">
          <template #header-extra>
            <NButton text @click="$router.push({ name: 'Txs' })">
              <n-flex align="center" :size="2" class="text-primary">
                <span>查看更多</span>
                <span class="i-carbon:chevron-right" />
              </n-flex>
            </NButton>
          </template>
          <n-data-table
            striped
            :row-props="() => ({ style: 'height: 53px' })"
            :scrollbar-props="{ trigger: 'none' }"
            :columns="columns1"
            :data="dateTrans"
            :bordered="false"
          />
        </n-card>
      </n-gi>
    </n-grid>
  </n-flex>
</template>
