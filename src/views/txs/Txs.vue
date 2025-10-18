<script setup lang="ts">
import { TranskApi } from '@/api/modules'
import { useUserGroupInfo } from '@/stores/user/hooks'
import { type DataTableColumns, NPopover } from 'naive-ui'
import { useTxForm } from './useTxForm'

const { groupId } = useUserGroupInfo()

const { txForm, resetFrom, contractOptions, statusOptions } = useTxForm()
const { loading, data, send: sendBlock, reload, pagination } = usePaginatedRequest(
  (pageNumber, pageSize) => {
    const contractType = txForm.contractType === -1 ? undefined : txForm.contractType
    const txStatus = txForm.txStatus === -1 ? undefined : txForm.txStatus
    return TranskApi.transListNew({
      params: { groupId: groupId.value as number, pageNumber, pageSize },
      data: { ...txForm, contractType, txStatus },
    })
  },
)

const type = computed(() => txForm.contractType)

const { blockTime, methNameText, address, blockHeight, transHash, nftCate, nft } = useTablerColItems()

const columns = computed<DataTableColumns<Service.TransApi.TransListNew>>(() => {
  return [
    transHash(),
    methNameText(),
    ...(type.value === '1'
      ? [
          nftCate({
            title: '类别名称',
            key: 'categoryName',
            categoryId: 'businessId',
            contractAddress: 'newContractAddress',
          }),
          nftCate({
            key: 'businessId',
            categoryId: 'businessId',
            contractAddress: 'newContractAddress',
          }),
          address({ title: '发送者' }),
          address({ title: '接收者', key: 'toAddress' }),
        ]
      : []),
    ...(type.value === '3'
      ? [
          nft({
            title: 'NFT 名称',
            key: 'nftName',
            nftId: 'businessId',
            contractAddress: 'newContractAddress',
          }),
          nft({
            key: 'businessId',
            nftId: 'businessId',
            contractAddress: 'newContractAddress',
          }),
          address({ title: '发送者' }),
          address({ title: '接收者', key: 'toAddress' }),
        ]
      : []),
    ...(type.value === -1 || type.value === '2' ? [address()] : []),
    blockHeight(),
    { title: '交易费用', key: 'transferAmount', minWidth: 100 },
    address({ title: '合约地址', key: 'newContractAddress' }),
    blockTime({ key: 'blockTime1' }),
  ]
})

onMounted(() => {
  if (groupId.value) {
    sendBlock()
  }
})
</script>

<template>
  <n-card>
    <template #header>
      <NFlex vertical>
        <NFlex align="center" justify="space-between">
          <div class="">
            {{ `交易数量 ${pagination?.itemCount || ''}` }}
          </div>
          <NFlex>
            <NPopover trigger="hover">
              <template #trigger>
                <n-button secondary @click="reload()">
                  <div class="i-tabler:refresh text-18" />
                </n-button>
              </template>
              <span>刷新查询结果</span>
            </NPopover>
            <NPopover trigger="hover">
              <template #trigger>
                <n-button secondary @click="resetFrom(), reload()">
                  <div class="i-carbon:reset text-18" />
                </n-button>
              </template>
              <span>重置查询条件</span>
            </NPopover>
          </NFlex>
        </NFlex>

        <NFlex align="center">
          <div>
            <TxStatusSelect v-model:value="txForm.txStatus" :update-value="() => reload()" :options="statusOptions" />
          </div>
          <TxContractTypeSelect v-model:value="txForm.contractType" :update-value="() => reload()" class="min-w-200" :options="contractOptions" />
        </NFlex>
      </NFlex>
    </template>
    <n-data-table
      remote
      striped
      min-height="400"
      :row-key="(row) => row.transHash"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data="data"
      :bordered="false"
    />
  </n-card>
</template>
