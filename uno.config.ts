import { defineConfig, presetAttributify, presetIcons, presetMini, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno,
    presetAttributify,
    presetIcons({ autoInstall: true }),
    presetRemToPx({
      baseFontSize: 4,
    }),
    presetMini(),
  ],
  theme: {
    colors: {
      primary: 'var(--dy-primary-color)',
      success: '#63e2b7',
      error: '#e88080',
      secondary: 'var(--dy-secondary-color)',
      textColor1: 'rgba(255,255,255, 0.7)',
      textColor2: 'rgba(255,255,255, 0.6)',
    },
  },
  shortcuts: [
    {
      'flex-x-center': 'flex justify-center',
      'flex-y--center': 'flex items-center',
      'wh-full': 'w-full h-full',
      'container': 'mx-auto max-w-1200',
    },
    [/^flex-row-(.*)$/, ([, c]) => `flex items-center justify-${c}`],
    [/^flex-col-(.*)$/, ([, c]) => `flex flex-col items-center justify-${c}`],
  ],
  rules: [
    [
      'bg-gradient',
      { 'background-image': 'var(--dy-bg-gradient-color)' },
    ],
    [/^content-min-h-(\d+)$/, ([, d]) => ({ 'min-height': `calc(100vh - ${d}px)` })],
    [
      'phone-content-height',
      { 'min-height': 'calc(100vh - 100px - 64px)' },
    ],
  ],
  safelist: [
    'i-carbon:home',
    'i-tabler:blocks',
    'i-tabler:cube',
    'i-mingcute:exchange-dollar-line',
    'i-carbon:help',
    'i-material-symbols:check-circle',
    'i-carbon:close-filled',
    'text-error',
    'text-success',
  ],
})
