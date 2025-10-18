<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import AddressText from '@/components/textRouter/AddressText.vue'

interface PropType {
  loading?: boolean
  detail?: Service.TransApi.TransInfo
}
defineProps<PropType>()
const action = ref<'raw' | 'decode'>('decode')
const columns: DataTableColumns = [
  {
    title: '#',
    key: 'number',
    width: 80,
    render: (_, index) => index + 1,
  },
  {
    title: '名称',
    key: 'name',
  },
  {
    title: '类型',
    key: 'type',
  },
  {
    title: '数据',
    key: 'data',
    ellipsis: {
      lineClamp: 4,
      tooltip: {
        width: 'trigger',
      },
    },
    render: (row) => {
      console.log(row)
      if (row.type === 'address') {
        return h(AddressText, { encrypt: false, address: row.data as string })
      }
      return h('span', {}, { default: () => row.data })
    },
  },
]
</script>

<template>
  <n-grid x-gap="10" y-gap="20" :cols="24" class="text-14">
    <n-gi :span="6" class="font-700">
      交易类型
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="23%" />
      <span v-else>{{ detail?.methNameText }}</span>
    </n-gi>
    <n-gi :span="6" class="font-700">
      交易合约
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="23%" />
      <AddressText v-else :encrypt="false" :address="detail?.contractAddress" />
    </n-gi>
    <!-- 类别 -->
    <template v-if="detail?.categoryId">
      <n-gi :span="6" class="font-700">
        类别名称
      </n-gi>
      <n-gi :span="18">
        <n-skeleton v-if="loading" height="20px" width="33%" />
        <CateText
          v-else
          :encrypt="false"
          :text="detail.categoryName || '--'"
          :query="{ id: detail.categoryId, contractAddress: detail.categoryAddress }"
        />
      </n-gi>
      <n-gi :span="6" class="font-700">
        类别 ID
      </n-gi>
      <n-gi :span="18">
        <n-skeleton v-if="loading" height="20px" width="23%" />
        <CateText
          v-else
          :encrypt="false"
          :text="detail.categoryId || '--'"
          :query="{ id: detail.categoryId, contractAddress: detail.categoryAddress }"
        />
      </n-gi>
    </template>
    <!-- nft -->
    <template v-if="detail?.nftId">
      <n-gi :span="6" class="font-700">
        NFT ID
      </n-gi>
      <n-gi :span="18">
        <n-skeleton v-if="loading" height="20px" width="23%" />
        <NftText
          v-else
          :encrypt="false"
          :text="detail.nftId || '--'"
          :query="{ id: detail.nftId, contractAddress: detail.contractAddress }"
        />
      </n-gi>
      <n-gi :span="6" class="font-700">
        NFT 名称
      </n-gi>
      <n-gi :span="18">
        <n-skeleton v-if="loading" height="20px" width="33%" />
        <span v-else>{{ detail?.nftName || '--' }}</span>
      </n-gi>
    </template>
    <n-gi :span="6" class="font-700">
      发送者
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="43%" />
      <AddressText v-else :encrypt="false" :address="detail?.transFrom" />
    </n-gi>
    <n-gi :span="6" class="font-700">
      接收者
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="43%" />
      <AddressText v-else :encrypt="false" :address="detail?.toAddress" />
    </n-gi>
    <template v-if="detail?.categoryId">
      <n-gi :span="6" class="font-700">
        链上数据
      </n-gi>
      <n-gi :span="18">
        {{ detail.onDateChain || '--' }}
      </n-gi>
    </template>
    <template v-if="detail?.categoryId">
      <n-gi :span="6" class="font-700">
        链外数据
      </n-gi>
      <n-gi :span="18">
        {{ detail.offDateChain || '--' }}
      </n-gi>
    </template>
    <template v-if="detail?.picturesLinking">
      <n-gi :span="6" class="font-700">
        图片链接
      </n-gi>
      <n-gi :span="18">
        <n-skeleton v-if="loading" height="20px" width="43%" />
        <n-flex v-else :wrap="false">
          <ImageText :urls="[detail?.picturesLinking]" />
          <a class="text-secondary decoration-none" :href="detail?.picturesLinking">
            <span>{{ detail?.picturesLinking }}</span>
          </a>
        </n-flex>
      </n-gi>
    </template>
    <n-gi :span="6" class="font-700">
      交易数据
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="43%" />
      <n-card v-else>
        <n-flex vertical :size="10">
          <template v-if="action === 'raw'">
            <n-input :rows="5" readonly :value="detail?.rawData" type="textarea" />
          </template>
          <template v-else>
            <n-flex vertical>
              <span>Function: {{ detail?.input?.function }}</span>
              <span>MethodID: {{ detail?.input?.methodID }}</span>
              <n-data-table
                size="small"
                striped
                :columns="columns"
                :data="detail?.input?.result"
                :bordered="false"
              />
            </n-flex>
          </template>

          <div>
            <n-button type="primary" ghost @click="action = action === 'raw' ? 'decode' : 'raw'">
              {{ action === 'raw' ? '解码' : '还原' }}
            </n-button>
          </div>
        </n-flex>
      </n-card>
    </n-gi>
  </n-grid>
</template>
