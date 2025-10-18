<script setup lang="ts">
import { NftsApi } from '@/api/modules'
import { useUserGroupInfo } from '@/stores/user/hooks'
import { isNumericString } from '@/utils/isNumericString'
import type { DataTableColumns } from 'naive-ui'

const { groupId } = useUserGroupInfo()
const value = ref('')
const { loading, data: dateNfts, send: sendNfts, pagination, reload } = usePaginatedRequest(
  (pageNumber, pageSize) => {
    return NftsApi.NftsList({
      params: { groupId: groupId.value as number, pageNumber, pageSize },
      data: { [isNumericString(value.value) ? 'nftId' : 'nftName']: value.value },
    })
  },
)

const { blockTime, address, nftCate, nft } = useTablerColItems()
const columns = computed<DataTableColumns<Service.NftsApi.NftsList>>(() => {
  return [
    nft({ title: 'NFT 名称', key: 'nftName' }),
    nft(),
    nftCate({ title: '类别名称', key: 'categoryName', contractAddress: 'categoryAddress' }),
    nftCate({ contractAddress: 'categoryAddress' }),
    address({ key: 'ownerAddress' }),
    address({ title: '合约地址', key: 'contractAddress' }),
    blockTime({ key: 'updateTime' }),
  ]
})

onMounted(() => {
  if (groupId.value) {
    sendNfts()
  }
})
</script>

<template>
  <Page>
    <template #content>
      <div class="container p-15">
        <n-card>
          <template #header>
            <n-flex vertical>
              <n-flex align="center" justify="space-between">
                <n-flex>
                  <n-button ghost type="primary">
                    NFT列表
                  </n-button>
                  <n-button ghost @click="$router.push({ name: 'NftCate' })">
                    NFT类别列表
                  </n-button>
                </n-flex>
                <n-flex :wrap="false" align="center">
                  <n-input-group>
                    <n-input
                      v-model:value="value" clearable placeholder="请输入名称(ID)进行搜索"
                      class="min-w-180" @clear="reload()"
                    />
                    <n-button secondary @click="reload()">
                      搜索
                    </n-button>
                    <n-button secondary @click="value = '', reload()">
                      重置
                    </n-button>
                  </n-input-group>
                </n-flex>
              </n-flex>

              <n-flex align="center">
                <div>{{ `NFT 总数` }}</div>
                <n-skeleton v-if="loading" style="width: 10%;" :height="24" />
                <div v-else>
                  {{ pagination?.itemCount }}
                </div>
              </n-flex>
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
      </div>
    </template>
  </Page>
</template>

<route lang="json">
  {
    "name": "Nfts",
    "meta": {
      "activeMenu": "Nfts",
      "title": "Nfts"
    }
  }
  </route>
