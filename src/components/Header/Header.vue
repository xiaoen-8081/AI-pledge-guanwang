<script setup lang="ts">
import { useCollapsedPopupHooks } from '@/stores/application/hooks'
import { useI18n } from 'vue-i18n'
import { USERINFO_KEY } from '@/config/app'

const { locale, t } = useI18n()
const [collapsed] = useCollapsedPopupHooks()

const options = [
  { name: 'Home', label: t('Home'), value: 'cn' },
  { name: 'News', label: t('News'), value: 'cn' },
  { name: 'Swap', label: t('Swap'), value: 'cn' },
  { name: 'Public', label: t('Public'), value: 'cn' },
  { name: 'Private', label: t('Private'), value: 'cn' },
]

const languageOptions = [
  {
    label: '中文简体',
    key: '1',
    value: 'cn',
  },
  {
    label: '中文繁体',
    key: '2',
    value: 'hk',
  },
  {
    label: 'English',
    key: '3',
    value: 'en',
  },
]

const router = useRouter()
const route = useRoute()

const isOptionRoute = computed(() => {
  return options.some(o => o.name === String(route.name))
})

function toPage(item: any) {
  if (item.url) {
    window.open(item.url, '_blank')
    return
  }

  router.push({ name: item.name })
}
async function handleSelect(e: { key: string }) {
  const lang = languageOptions[Number(e) - 1]?.value
  if (lang) {
    locale.value = lang
    localStorage.setItem(`${USERINFO_KEY}_LAN`, lang)
    options.forEach((item) => {
      item.label = t(item.name)
    })
  }
}
</script>

<template>
  <div class="Roboto z-10 w-full">
    <n-flex vertical :size="0">
      <n-flex align="center" justify="space-between" class="h-54">
        <div v-if="isOptionRoute" class="" @click="$router.replace({ name: 'Home' })">
          <img src="/src/assets/img/logo.svg" style="width: 120px;" alt="">
        </div>
        <div v-else class="ml-15px flex cursor-pointer select-none items-center" @click="$router.back()">
          <div class="i-carbon:chevron-left text-[18px] text-[#000] font-bold lg:text-[24px]" />
          <div class="text-[14px] text-[#000] lg:text-[20px]">
            {{ $t('返回') }}
          </div>
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
                @click="toPage(x)"
              >
                <div>
                  {{ x.label }}
                </div>
              </n-flex>
              <n-dropdown
                style="font-family: Noto Sans SC, Noto Sans SC;"
                trigger="click"
                :options="languageOptions"
                @select="handleSelect"
              >
                <div
                  class="h-[34px] w-[34px] flex items-center justify-center rounded-full text-[#000]"
                >
                  <div class="i-iconoir:language text-28px" />
                </div>
              </n-dropdown>
            </n-flex>
          </n-flex>
          <div v-if="route.name === 'Public' || route.name === 'Private' || route.name === 'Swap'" class="ml-40px mr-40px h40px">
            <Web3Status />
          </div>
          <div v-else class="btnBg ml-40px mr-40px h40px w200px flex items-center justify-center text-white">
            {{ $t('Enrers TGN Application') }}
          </div>
        </div>
        <div class="mr-10px flex md:hidden">
          <div class="mr-10px">
            <Web3Status v-if="route.name === 'Public' || route.name === 'Private' || route.name === 'Swap'" />
          </div>
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
