<script setup lang="ts">
import { timeFormat } from '@/utils/utils'

interface PropType {
  loading?: boolean
  detail?: Service.TransApi.TransInfo
}
defineProps<PropType>()
</script>

<template>
  <n-grid x-gap="10" y-gap="20" :cols="24" class="text-14">
    <n-gi :span="6" class="font-700">
      交易哈希
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="53%" />
      <n-flex v-else align="center" :wrap="false" :size="4" class="break-all">
        <span>{{ detail?.transHash }}</span>
        <dy-copy v-if="detail?.transHash" :text="detail?.transHash" />
      </n-flex>
    </n-gi>
    <n-gi :span="6" class="font-700">
      交易状态
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="33%" />
      <template v-else>
        <n-flex v-if="detail?.txStatus === '0x0'" align="center" :size="4" class="text-primary">
          <span class="i-material-symbols:check-circle text-20" />
          <span>成功</span>
        </n-flex>
        <n-flex v-else-if="detail?.txStatus === '0x16'" align="center" :size="4" class="text-error">
          <span class="i-carbon:close-filled text-20" />
          <span>失败</span>
        </n-flex>
        <span v-else>--</span>
      </template>
    </n-gi>
    <n-gi :span="6" class="font-700">
      区块高度
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="33%" />
      <BlockText v-else :encrypt="false" :text="detail?.blockNumber" :blocks="detail?.blockNumber" />
    </n-gi>
    <n-gi :span="6" class="font-700">
      时间
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="33%" />
      <span v-else>{{ timeFormat(detail?.blockTime) }}</span>
    </n-gi>
    <n-gi :span="6" class="font-700">
      签名者
    </n-gi>
    <n-gi :span="18">
      <n-skeleton v-if="loading" height="20px" width="43%" />
      <AddressText v-else :encrypt="false" :address="detail?.transFrom" />
    </n-gi>
  </n-grid>
</template>

<style scoped>

</style>
