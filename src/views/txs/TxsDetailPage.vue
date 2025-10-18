<script setup lang="ts">
import { TranskApi } from '@/api/modules'
import { useUserGroupInfo } from '@/stores/user/hooks'
import type { Hash } from 'viem'

const route = useRoute()
const hash = ref<Hash | undefined>(undefined)
const { groupId } = useUserGroupInfo()

const { loading, send: sendTransByHash, data: transDetail } = useRequest(
  groupId => TranskApi.transactionByHash(groupId, hash.value),
  { immediate: false, initialData: { data: {} } },
)

const active = ref<1 | 2>(1)
onMounted(async () => {
  const params = route.params as { transHash?: Hash | undefined }
  hash.value = params.transHash
  if (groupId.value) {
    await sendTransByHash(groupId.value)
  }
})
</script>

<template>
  <n-flex vertical :size="15" class="container p-15">
    <NavBack title="交易详情" />

    <n-flex>
      <n-button ghost :type="active === 1 ? 'primary' : 'default'" @click="active = 1">
        概览
      </n-button>
      <n-button v-if="transDetail.data.txStatus === '0x0'" ghost :type="active === 2 ? 'primary' : 'default'" @click="active = 2">
        日志
      </n-button>
    </n-flex>

    <template v-if="active === 1">
      <n-card title="基本信息">
        <n-divider style="margin-top: 0;" />
        <TxDetailBaseInfo :loading="loading" :detail="transDetail.data" />
      </n-card>

      <n-card title="交易信息">
        <n-divider style="margin-top: 0;" />
        <TxDetailInfo :loading="loading" :detail="transDetail.data" />
      </n-card>
    </template>

    <TxDetailLog v-if="active === 2" :hash="hash" />
  </n-flex>
</template>
