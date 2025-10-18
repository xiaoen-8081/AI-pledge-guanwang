<script setup lang="ts">
import { TranskApi } from '@/api/modules'
import { useTxForm } from '@/views/txs/useTxForm'
import { type DataTableColumns, NPopover } from 'naive-ui'

interface PropType {
  address?: string
  groupId?: number
}
const { address, groupId } = defineProps<PropType>()

const { txForm, resetFrom, contractOptions, statusOptions } = useTxForm()
const { loading, data, reload, pagination, refresh } = usePaginatedRequest(
  (pageNumber, pageSize) => {
    const contractType = txForm.contractType === -1 ? undefined : txForm.contractType
    const txStatus = txForm.txStatus === -1 ? undefined : txForm.txStatus
    return TranskApi.transListNew({
      params: { groupId, pageNumber, pageSize },
      data: { ...txForm, contractType, txStatus, ownerAddress: address },
    })
  },
  { watchingStates: [txForm] },
)
const type = computed(() => txForm.contractType)
const { blockTime, methNameText, address: addressitem, blockHeight, transHash, nftCate, nft } = useTablerColItems()
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
          addressitem({ title: '发送者' }),
          addressitem({ title: '接收者', key: 'toAddress' }),
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
          addressitem({ title: '发送者' }),
          addressitem({ title: '接收者', key: 'toAddress' }),
        ]
      : []),
    ...(type.value === -1 || type.value === '2' ? [addressitem()] : []),
    blockHeight(),
    { title: '交易费用', key: 'transferAmount', minWidth: 100, align: 'center' },
    blockTime({ key: 'blockTime1' }),
  ]
})

watch(
  [() => groupId, () => address],
  ([groupId, address]) => {
    if (groupId && address) {
      reload()
    }
  },
  { immediate: true },
)
</script>

<template>
  <n-card>
    <template #header>
      <NFlex vertical>
        <NFlex align="center" justify="space-between">
          <div>交易</div>
          <NFlex>
            <NPopover trigger="hover">
              <template #trigger>
                <n-button secondary @click="refresh()">
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
            <TxStatusSelect v-model:value="txForm.txStatus" :options="statusOptions" />
          </div>
          <TxContractTypeSelect v-model:value="txForm.contractType" class="min-w-200" :options="contractOptions" />
        </NFlex>
      </NFlex>
    </template>
    <n-data-table
      remote
      striped
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data="data"
      :bordered="false"
    />
  </n-card>
</template>
