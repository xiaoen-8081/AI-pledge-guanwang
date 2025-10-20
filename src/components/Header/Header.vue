<script setup lang="ts">
import { useCollapsedPopupHooks } from '@/stores/application/hooks'

const [collapsed] = useCollapsedPopupHooks()

const options = [
  { name: 'Home', label: 'Home', class: 'i-carbon:home', value: 'cn' },
  { name: 'Blocks', label: 'News', class: 'i-tabler:blocks', value: 'cn' },
]
const router = useRouter()
function toPage(name: any) {
  router.push({ name })
}
</script>

<template>
  <div class="Roboto z-10 w-full">
    <n-flex vertical :size="0">
      <n-flex align="center" justify="space-between" class="h-54">
        <div class="ml-15px md:ml-80px" @click="$router.replace({ name: 'Home' })">
          <img src="/src/assets/img/logo.svg" alt="">
        </div>
        <div class="hidden md:flex">
          <n-flex class="ml-20 flex-1" align="center" justify="space-between">
            <n-flex :size="26" class="font-500">
              <n-flex
                v-for="x in options"
                :key="x.label"
                :class="[$route.meta.activeMenu === x.name ? 'text-primary' : 'text-black']"
                class="cursor-pointer text-16"
                :size="4"
                align="center"
                @click="toPage(x.name)"
              >
                <div>
                  {{ x.label }}
                </div>
              </n-flex>
            </n-flex>
          </n-flex>
          <div class="btnBg ml-40px mr-80px h40px w200px flex items-center justify-center text-white">
            Enrers LGNS Application
          </div>
        </div>
        <div class="mr-10px md:hidden">
          <n-button text type="default">
            <div class="i-carbon:list text-28" @click="collapsed = !collapsed" />
          </n-button>
        </div>
      </n-flex>
    </n-flex>
  </div>

  <PageSider />
</template>

<style scoped>
.btnBg {
  background: url('/src/assets/img/buttonBg.png') no-repeat;
  background-size: 100% 100%;
}
</style>
