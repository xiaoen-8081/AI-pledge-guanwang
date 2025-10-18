<script setup lang="ts">
import { NftsApi, TranskApi } from '@/api/modules'
import { useUserGroupInfo } from '@/stores/user/hooks'
import type { DataTableColumns } from 'naive-ui'
import type { Hash } from 'viem'

const route = useRoute()
const nftId = ref<string | undefined>(undefined)
const contractAddress = ref<Hash | undefined>(undefined)
const { groupId } = useUserGroupInfo()
const { loading: loadingInfo, send: sendNftDetail, data: NftDetail } = useRequest(
  groupId => NftsApi.NftDetail(groupId, { businessId: nftId.value, contractAddress: contractAddress.value }),
  { immediate: false, initialData: { data: {} } },
)

const { loading, data: dateRecords, send: sendRecords, pagination } = usePaginatedRequest(
  (pageNumber, pageSize) => {
    return TranskApi.transListNew({
      params: { groupId: groupId.value as number, pageNumber, pageSize },
      data: { businessId: nftId.value, contractAddress: contractAddress.value },
    },
    )
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
  const query = route.query as { nftId?: string | undefined, contractAddress?: Hash | undefined }
  nftId.value = query.nftId
  contractAddress.value = query.contractAddress
  if (groupId.value) {
    sendNftDetail(groupId.value)
    sendRecords()
  }
})
</script>

<template>
  <Page>
    <template #content>
      <n-flex vertical :size="15" class="container p-15">
        <NavBack title="NFT详情" />
        <n-card title="基本信息">
          <n-grid x-gap="10" y-gap="20" :cols="24">
            <n-gi :span="6">
              NFT 名称
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="33%" size="medium" />
              <span v-else>{{ NftDetail.data.nftName || '--' }}</span>
            </n-gi>
            <n-gi :span="6">
              NFT ID
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="23%" size="medium" />
              <span v-else>{{ NftDetail.data.nftId || '--' }}</span>
            </n-gi>
            <n-gi :span="6">
              类别名称
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="33%" size="medium" />
              <CateText
                v-else
                :encrypt="false" :text="NftDetail.data.categoryName || '--'"
                :query="{ id: NftDetail.data.categoryId, contractAddress: NftDetail.data.categoryContractAddress }"
              />
            </n-gi>
            <n-gi :span="6">
              类别ID
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="23%" size="medium" />
              <CateText
                v-else :text="NftDetail.data.categoryId || '--'"
                :query="{ id: NftDetail.data.categoryId, contractAddress: NftDetail.data.categoryContractAddress }"
              />
            </n-gi>
            <n-gi :span="6">
              创建者
            </n-gi>
            <n-gi :span="18" class="text-secondary">
              <n-skeleton v-if="loadingInfo" height="20px" width="33%" size="medium" />
              <AddressText v-else :encrypt="false" :address="NftDetail.data.createAddress || '--'" />
            </n-gi>
            <n-gi :span="6">
              创建哈希
            </n-gi>
            <n-gi :span="18" class="text-secondary">
              <n-skeleton v-if="loadingInfo" height="20px" width="53%" size="medium" />
              <HashText v-else :encrypt="false" :hash="NftDetail.data.createHash || '--'" />
            </n-gi>
            <n-gi :span="6" class="font-700">
              链上数据
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="53%" size="medium" />
              <span v-else>{{ NftDetail.data?.onDateChain || '--' }}</span>
            </n-gi>
            <n-gi :span="6" class="font-700">
              链外数据
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="53%" size="medium" />
              <span v-else>{{ NftDetail.data?.offDateChain || '--' }}</span>
            </n-gi>
            <n-gi :span="6">
              图片链接
            </n-gi>
            <n-gi :span="18">
              <n-skeleton v-if="loadingInfo" height="20px" width="43%" size="medium" />
              <n-flex v-else align="center" :wrap="false">
                <ImageText :urls="[NftDetail.data?.picturesLinking]" />
                <a class="text-secondary decoration-none" :href="NftDetail.data?.picturesLinking">
                  <span>{{ NftDetail.data?.picturesLinking }}</span>
                </a>
              </n-flex>
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
            :data="dateRecords"
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
    "name": "NftDetail",
    "meta": {
      "activeMenu": "Nfts",
      "title": "NftDetail"
    }
  }
  </route>
