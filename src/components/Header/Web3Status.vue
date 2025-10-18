<script setup lang="ts">
import { useCollectWallet } from '@/hooks/useCollectWallethooks'
import { formatStringEncrypt } from '@/utils/utils'
import { useAccount, useDisconnect } from '@wagmi/vue'

const { address } = useAccount()
const [isLoading, handleCollect] = useCollectWallet()

async function collect() {
  await to(handleCollect())
}

const { disconnectAsync } = useDisconnect()
async function handleDisconnect() {
  await to(disconnectAsync())
}
</script>

<template>
  <template v-if="address">
    <n-popover
      :theme-overrides="{
        padding: '0px',
        color: 'transparent',
      }" style="margin-top: 12px" placement="bottom-end" :show-arrow="false"
    >
      <template #trigger>
        <n-flex class="h-32 cursor-pointer rounded-16 bg-secondary pl-12 pr-8 text-textBase font-600 hover:opacity-65" align="center" :size="0">
          <div class="i-carbon:wallet mr-4 text-20" />
          <span class="">{{ formatStringEncrypt(address, 2, 5) }}</span>
          <div class="i-mdi:chevron-down text-20" />
        </n-flex>
      </template>
      <n-flex vertical class="w-200 b1-borderColor1 rounded-14 bg-inputColor p-4" :size="0">
        <dy-button quaternary height="45px" type="default" radius="12px">
          <span class="w-200 text-left">钱包</span>
        </dy-button>
        <dy-button quaternary height="45px" type="default" radius="12px">
          <span class="w-200 text-left">交易记录</span>
        </dy-button>
        <dy-button disabled quaternary height="45px" type="default" radius="12px">
          <span class="w-200 text-left">您的NFT</span>
        </dy-button>
        <dy-button quaternary height="45px" type="default" radius="12px" @click="handleDisconnect">
          <div class="w-200 flex-row-between text-left">
            <span class="">断开</span>
            <div class="i-carbon:logout text-20" />
          </div>
        </dy-button>
      </n-flex>
    </n-popover>
  </template>
  <template v-else>
    <dy-button :loading="isLoading" :disabled="isLoading" @click="collect()">
      {{ $t('Connect Wallet') }}
    </dy-button>
  </template>
</template>
