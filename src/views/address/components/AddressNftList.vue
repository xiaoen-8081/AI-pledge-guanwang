<script setup lang="ts">
import { NftsApi } from '@/api/modules'
import type { DataTableColumns } from 'naive-ui'

interface PropType {
  address?: string
  groupId?: number
}
const { address, groupId } = defineProps<PropType>()

const { loading, data: dateNfts, pagination, reload } = usePaginatedRequest(
  (pageNumber, pageSize) => {
    return NftsApi.NftsList({
      params: { groupId, pageNumber, pageSize },
      data: { ownerAddress: address },
    })
  },
)

const { blockTime, address: addressItem, nftCate, nft } = useTablerColItems()
const columns = computed<DataTableColumns<Service.NftsApi.NftsList>>(() => {
  return [
    nft({ title: 'NFT 名称', key: 'nftName' }),
    nft(),
    nftCate({ title: '类别名称', key: 'categoryName', contractAddress: 'categoryAddress' }),
    nftCate({ contractAddress: 'categoryAddress' }),
    addressItem({ key: 'ownerAddress' }),
    addressItem({ title: '合约地址', key: 'contractAddress' }),
    blockTime({ key: 'updateTime' }),
  ]
})
watch(
  [() => groupId, () => address],
  (newVal) => {
    console.log('newVal', newVal)
    if (newVal[0] && newVal[1]) {
      reload()
    }
  },
  { immediate: true },
)
</script>

<template>
  <n-card>
    <template #header>
      <n-flex>
        <span>NFT总数 {{ pagination?.itemCount || '' }}</span>
      </n-flex>
    </template>
    <n-data-table
      remote
      striped
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data="dateNfts"
      :bordered="false"
    />
  </n-card>
</template>
