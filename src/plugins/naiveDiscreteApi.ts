/**
 * 挂载 Naive-ui 脱离上下文的 API
 * 如果你想在 setup 外使用 useDialog、useMessage、useNotification、useLoadingBar，可以通过 createDiscreteApi 来构建对应的 API。
 * https://www.naiveui.com/zh-CN/dark/components/discrete
 */

import { useThemeSettingStore } from '@/stores/theme'
import * as NaiveUI from 'naive-ui'
import type { ConfigProviderProps } from 'naive-ui'
import { useToast } from '@/components/discreteApi/toast'

export function setupNaiveDiscreteApi() {
  const isDark = useDark()
  const themeStore = useThemeSettingStore()
  const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    theme: isDark.value ? NaiveUI.darkTheme : null,
    themeOverrides: themeStore.commonThemeOverrides,
  }))

  const { message, dialog, notification, loadingBar, modal } = NaiveUI.createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
    {
      configProviderProps: configProviderPropsRef,
    },
  )

  window.$NaiveMessage = message
  window.$NaiveDialog = dialog
  window.$NaiveNotification = notification
  window.$NaiveLoadingBar = loadingBar
  window.$NaiveModal = modal

  const toast = useToast(message)
  window.$Toast = toast
}
