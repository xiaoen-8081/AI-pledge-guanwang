<script setup lang="ts">
import { useCollapsedPopupHooks } from '@/stores/application/hooks'

const [collapsed, close] = useCollapsedPopupHooks()

const options = [
  { name: 'Home', label: '首页', class: 'i-carbon:home' },
  { name: 'Blocks', label: '区块浏览', class: 'i-tabler:blocks' },
  { name: 'Txs', label: '交易浏览', class: 'i-mingcute:exchange-dollar-line' },
  { name: 'Nfts', label: 'NFT数据', class: 'i-tabler:cube' },
  { name: 'Abount', label: '关于师石链', class: 'i-carbon:help' },
]
const router = useRouter()
function toPage(name) {
  router.push({ name })
  close()
}
</script>

<template>
  <n-drawer v-model:show="collapsed" placement="right" :auto-focus="false">
    <n-drawer-content :native-scrollbar="false">
      <template #header>
        <n-flex class="" justify="space-between">
          <DyLogo />
          <n-button text @click="collapsed = !collapsed">
            <template #icon>
              <div class="i-carbon:close-large text-30" />
            </template>
          </n-button>
        </n-flex>
      </template>
      <n-flex vertical :size="28" class="">
        <n-button
          v-for="x in options"
          :key="x.label"
          class="w-full justify-start"
          align="center"
          text
          @click="toPage(x.name)"
        >
          <div class="mr-10 text-18" :class="x.class" />
          <div class="text-16">
            {{ x.label }}
          </div>
        </n-button>
      </n-flex>
    </n-drawer-content>
  </n-drawer>
</template>
