<script setup lang="ts">
import { NftsApi, TranskApi } from '@/api/modules'
import { useUserGroupInfo } from '@/stores/user/hooks'
import type { DataTableColumns } from 'naive-ui'
import type { Hash } from 'viem'

const { groupId } = useUserGroupInfo()
const route = useRoute()
const cateId = ref<string | undefined>(undefined)
const contractAddress = ref<Hash | undefined>(undefined)
const { loading: loadingInfo, send: sendDetail, data: dataDetail } = useRequest(
  groupId => NftsApi.NftCateDetail(groupId, { businessId: cateId.value, contractAddress: contractAddress.value }),
  { immediate: false, initialData: { data: {} } },
)

const { loading, data, send: sendRecords, pagination } = usePaginatedRequest(
  (pageNumber, pageSize) => {
    return TranskApi.transListNew({
      params: { groupId: groupId.value as number, pageNumber, pageSize },
      data: { businessId: cateId.value, contractAddress: contractAddress.value },
    })
  },
)
const { blockTime, methNameText, address, blockHeight, transHash } = useTablerColItems()
const columns = computed<DataTableColumns<Service.TransApi.TransListNew>>(() => {
  return [
    transHash(),
    methNameText(),
    address(),
    blockHeight(),
    { title: '交易费用', key: 'transferAmount', minWidth: 100, align: 'center' },
    blockTime({ key: 'blockTime1' }),
  ]
})
onMounted(async () => {
  const query = route.query as { categoryId?: string | undefined, contractAddress?: Hash | undefined }
  cateId.value = query.categoryId
  contractAddress.value = query.contractAddress
  if (groupId.value) {
    sendDetail(groupId.value)
    sendRecords()
  }
})
</script>

<template>
  <Page>
    <template #content>
      <n-flex vertical :size="15" class="container p-15">
        <NavBack title="NFT类别详情" />
        <n-card title="基本信息">
          <n-grid x-gap="10" y-gap="20" :cols="24">
            <n-gi :span="6">
              类别名称
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="33%" />
              <span v-else>{{ dataDetail.data.categoryName || '--' }}</span>
            </n-gi>
            <n-gi :span="6">
              类别ID
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="23%" />
              <span v-else>{{ dataDetail.data.categoryId || '--' }}</span>
            </n-gi>
            <n-gi :span="6">
              NFT数量
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="23%" />
              <span v-else>{{ dataDetail.data.nftNumber || '--' }}</span>
            </n-gi>
            <n-gi :span="6">
              创建者
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="33%" />
              <AddressText v-else :encrypt="false" :address="dataDetail.data.createAddress" />
            </n-gi>
            <n-gi :span="6">
              拥有者
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="33%" />
              <AddressText v-else :encrypt="false" :skip="Boolean(dataDetail.data.ownerAddress)" :address="dataDetail.data.ownerAddress || '--'" />
            </n-gi>
            <n-gi :span="6">
              创建哈希
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="43%" />
              <HashText v-else :encrypt="false" :hash="dataDetail.data.createHash" />
            </n-gi>
            <n-gi :span="6">
              类别描述
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="53%" />
              <span v-else>{{ dataDetail.data?.categoryDesc || '--' }}</span>
            </n-gi>
          </n-grid>
        </n-card>
        <n-card title="交易记录">
          <n-data-table
            remote
            striped
            :pagination="pagination"
            :loading="loading"
            :columns="columns"
            :data="data"
            :bordered="false"
          />
        </n-card>
      </n-flex>
    </template>
  </Page>
</template>

<style scoped>
.info {
  grid-template-columns: 0fr 1fr 1fr;
  grid-template-areas: 'lable1 value1 value1' 'lable2 value2' 'lable3 value3' 'lable4 value4' 'lable5 value5' 'lable6 value6';
}
</style>

<route lang="json">
  {
    "name": "NftCateDetail",
    "meta": {
      "activeMenu": "Nfts",
      "title": "NftCateDetail"
    }
  }
  </route>
