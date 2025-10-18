<script setup lang="ts">
import { BlockApi } from '@/api/modules'
import { useUserGroupInfo } from '@/stores/user/hooks'
import type { DataTableColumns } from 'naive-ui'

const { groupId } = useUserGroupInfo()
const { loading, data: dateBlock, send: sendBlock, total, pagination } = usePaginatedRequest(
  (pageNumber, pageSize) => {
    return BlockApi.blockList({ groupId: groupId.value as number, pageNumber, pageSize })
  },
)

const { blockTime, blockHash, blockHeight } = useTablerColItems()
// 区块
const columns: DataTableColumns<Service.BlockApi.BlockList> = [
  blockHeight({ key: 'number', minWidth: 140 }),
  blockHash({ blockNumber: 'number', minWidth: 140 }),
  { title: '交易数量', key: 'txn', minWidth: 80, align: 'right' },
  blockTime({ key: 'dateTimeStr', minWidth: 140 }),
]

onMounted(() => {
  if (groupId.value) {
    sendBlock()
  }
})
</script>

<template>
  <Page>
    <template #content>
      <div class="container p-15">
        <n-card :title="`当前区块 ${(total && total > 0 && total - 1) || ''}` ">
          <n-data-table
            remote
            striped
            :loading="loading"
            :pagination="pagination"
            :scrollbar-props="{ trigger: 'none' }"
            :columns="columns"
            :data="dateBlock"
            :bordered="false"
          />
        </n-card>
      </div>
    </template>
  </Page>
</template>

<route lang="json">
  {
    "name": "Blocks",
    "meta": {
      "activeMenu": "Blocks",
      "title": "Blocks"
    }
  }
  </route>
