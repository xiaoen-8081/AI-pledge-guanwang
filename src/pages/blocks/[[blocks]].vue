<script setup lang="ts">
import { BlockApi, TranskApi } from '@/api/modules'
import { useUserGroupInfo } from '@/stores/user/hooks'
import { timeFormat } from '@/utils/utils'
import type { DataTableColumns } from 'naive-ui'

const route = useRoute()
const blocks = ref<number | string | undefined>(undefined)
const { groupId } = useUserGroupInfo()

const { loading: loadinfo, send: sendBlockByHash, data: blockDetail } = useRequest(
  groupId => BlockApi.blockByNumber(groupId, blocks.value),
  { immediate: false, initialData: {} },
)

const { loading: loadingTable, data: dateTrans, send: sendGetTrans, total, pagination } = usePaginatedRequest(
  (pageNumber, pageSize) => {
    return TranskApi.transListNew({
      params: { groupId: groupId.value, pageNumber, pageSize },
      data: { blockNumber: blocks.value },
    })
  },
)

const { blockTime, methNameText, address, blockHeight, transHash } = useTablerColItems()
// 区块
const columns: DataTableColumns<Service.TransApi.TransListNew> = [
  transHash(),
  methNameText(),
  address({ title: '签名者' }),
  blockHeight({ className: '' }, { disabled: true }),
  { title: '交易费用', key: 'transferAmount', minWidth: 100, align: 'center' },
  blockTime({ key: 'blockTime1' }),
]

onMounted(async () => {
  const params = route.params as { blocks?: number | string | undefined }
  blocks.value = params.blocks
  if (groupId.value) {
    sendBlockByHash(groupId.value)
    sendGetTrans()
  }
})
</script>

<template>
  <Page>
    <template #content>
      <n-flex vertical :size="15" class="container p-15">
        <NavBack title="区块详情" />
        <n-card :title="`区块高度  #${blocks}`">
          <n-divider style="margin-top: 0;" />
          <n-flex vertical :size="30" class="text-16">
            <n-flex align="center" :wrap="false" :size="40" class="">
              <span class="font-700">区块哈希</span>
              <n-skeleton v-if="loadinfo" height="20px" width="53%" size="medium" />
              <HashText v-else class="flex-1 text-14 text-textColor1" :skip="false" :encrypt="false" :hash="blockDetail.data?.hash || '--'" />
            </n-flex>
            <n-flex align="center" :wrap="false" :size="40" class="">
              <span class="">交易数量</span>
              <n-skeleton v-if="loadinfo" height="20px" width="23%" size="medium" />
              <span v-else class="flex-1 text-14 text-textColor1">{{ total }}</span>
            </n-flex>
            <n-flex align="center" :wrap="false" :size="40" class="">
              <span class="">出块时间</span>
              <n-skeleton v-if="loadinfo" height="20px" width="23%" size="medium" />
              <span v-else class="flex-1 text-14 text-textColor1">{{ timeFormat(parseInt(blockDetail.data?.timestamp)) }}</span>
            </n-flex>
          </n-flex>
        </n-card>
        <n-card title="交易数量">
          <n-data-table
            remote
            :loading="loadingTable"
            :pagination="pagination"
            :columns="columns"
            :data="dateTrans"
            :bordered="false"
          />
        </n-card>
      </n-flex>
    </template>
  </Page>
</template>

<route lang="json">
  {
    "name": "BlocksDetail",
    "meta": {
      "activeMenu": "Blocks",
      "title": "BlocksDetail"
    }
  }
  </route>
