<script setup lang="ts">
import { useCollapsedPopupHooks } from '@/stores/application/hooks'

const [collapsed] = useCollapsedPopupHooks()

const options = [
  { name: 'Home', label: '首页', class: 'i-carbon:home', value: 'cn' },
  { name: 'Blocks', label: '区块浏览', class: 'i-tabler:blocks', value: 'cn' },
  { name: 'Txs', label: '交易浏览', class: 'i-mingcute:exchange-dollar-line', value: 'cn' },
  { name: 'Nfts', label: 'NFT数据', class: 'i-tabler:cube', value: 'cn' },
  { name: 'Abount', label: '关于师石链', class: 'i-carbon:help', value: 'cn' },
]
const router = useRouter()
function toPage(name: any) {
  router.push({ name })
}
</script>

<template>
  <div class="z-10 container px-15">
    <n-flex vertical :size="0">
      <n-flex align="center" justify="space-between" class="h-54">
        <div @click="$router.replace({ name: 'Home' })">
          <DyLogo />
        </div>
        <div class="hidden flex-1 md:flex">
          <n-flex class="ml-20 flex-1" align="center" justify="space-between">
            <n-flex :size="26" class="font-500">
              <n-flex
                v-for="x in options"
                :key="x.label"
                :class="[$route.meta.activeMenu === x.name ? 'text-primary' : 'text-textColor1 hover:text-#fff/50']"
                class="cursor-pointer text-16"
                :size="4"
                align="center"
                @click="toPage(x.name)"
              >
                <div class="text-18" :class="x.class" />
                <div>
                  {{ x.label }}
                </div>
              </n-flex>
            </n-flex>
            <div class="hidden lg:flex lg:flex-1">
              <Search />
            </div>
          </n-flex>
        </div>

        <div class="md:hidden">
          <n-button text type="default">
            <div class="i-carbon:list text-28" @click="collapsed = !collapsed" />
          </n-button>
        </div>
      </n-flex>
      <div class="h-46 flex items-center lg:hidden">
        <div class="flex-1">
          <Search />
        </div>
      </div>
    </n-flex>
  </div>

  <PageSider />
</template>
