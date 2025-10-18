import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export function createVitePlugins() {
  return [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue'],
      routesFolder: 'src/pages',
      dts: 'src/types/typed-router.d.ts',
    }),

    vue(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      resolvers: [NaiveUiResolver()],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/types/components.d.ts',
      dirs: ['src/components', 'src/views'],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          'await-to-js': ['to'],
          '@vueuse/core': ['useDark', 'useToggle', 'useWindowSize', 'useElementSize', 'useElementBounding'],
          'vue-router': ['useRouter', 'useRoute', 'RouterLink'],
          'vue-i18n': ['useI18n'],
          'alova/client': ['useRequest', 'useAutoRequest', 'useForm', 'useWatcher', 'usePagination'],
        },
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [
        'src/hooks',
      ],
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18nPlugin({
      // locale messages resource pre-compile option
      include: resolve(dirname(fileURLToPath(import.meta.url)), '../../src/locales/lang/**'),
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),

  ]
}
