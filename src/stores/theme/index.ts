import { defineStore } from 'pinia'
import type { GlobalThemeOverrides } from 'naive-ui'
import { APP_NAME } from '@/config/app'
import common from './common'

export const useThemeSettingStore = defineStore(`${APP_NAME}_theme`, () => {
  const appTheme = ref('#ffc000')
  const commonThemeOverrides = ref<GlobalThemeOverrides>({
    common,
    Card: {
      paddingSmall: '12px',
      paddingMedium: '16px',
      borderRadius: '8px',
    },
    Skeleton: {
      borderRadius: '15px',
    },
    // Dropdown: {
    //   padding: '10px',
    //   borderRadius: '15px',
    // },
    // Popover: {
    //   padding: '15px',
    //   borderRadius: '14px',
    // },
    // Drawer: {
    //   color: 'var(--dy-bg-content-color)',
    // },
  })
  const lightThemeOverrides = ref<GlobalThemeOverrides>({
    // Popover: {
    //   color: '#333',
    //   textColor: '#fff',
    // },
  })
  const darkThemeOverrides = ref<GlobalThemeOverrides>({
    DataTable: {
      tdColorHover: 'var(--dy-bg-color)',

    },

    // Popover: {
    //   color: 'var(--dy-text-color-base)',
    //   textColor: '#333',
    // },
    // Button: {
    //   opacityDisabled: '0.62',
    //   // colorDisabledPrimary: colorLighten('#6636ee', 10),
    //   textColor: 'var(--dy-text-color-base)',
    //   textColorHover: 'var(--dy-text-color-base)',
    //   textColorPressed: 'var(--dy-text-color-base)',
    //   textColorFocus: 'var(--dy-text-color-base)',
    //   textColorDisabled: 'var(--dy-text-color-base)',
    //   textColorPrimary: 'var(--dy-text-color-base)',
    //   textColorHoverPrimary: 'var(--dy-text-color-base)',
    //   textColorPressedPrimary: 'var(--dy-text-color-base)',
    //   textColorFocusPrimary: 'var(--dy-text-color-base)',
    //   textColorDisabledPrimary: 'var(--dy-text-color-base)',
    // },
  })
  return {
    appTheme,
    commonThemeOverrides,
    lightThemeOverrides,
    darkThemeOverrides,
  }
})
