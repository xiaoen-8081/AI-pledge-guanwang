<script setup lang="ts">
import { darkTheme, enUS, lightTheme, zhCN } from 'naive-ui'
import { useThemeSettingStore } from './stores/theme'
import { storeToRefs } from 'pinia'
import { locale } from './locales'
import { deepMerge } from '@/utils/utils'

// console.log('darkTheme', darkTheme)
const themeSetting = useThemeSettingStore()
const { commonThemeOverrides, lightThemeOverrides, darkThemeOverrides } = storeToRefs(themeSetting)
const isDark = useDark()
const theme = computed(() => isDark.value ? lightTheme : lightTheme)
const localeLang = computed(() => {
  const obj = {
    cn: zhCN,
    en: enUS,
  }
  return obj[locale.value]
})
const toggleDark = useToggle(isDark)

onMounted(() => {
  if (!isDark.value)
    toggleDark()
})
// ("xs:猜测320" | "s:640" | "m:1024"  | "l:1280" | "xl" | "xxl")
</script>

<template>
  <n-config-provider
    class="h-full w-full" :theme="lightTheme" :locale="localeLang"
    :theme-overrides="deepMerge(commonThemeOverrides, theme === null ? lightThemeOverrides : darkThemeOverrides)"
  >
    <Application>
      <Web3Manager>
        <router-view />
      </Web3Manager>
    </Application>
  </n-config-provider>
</template>
