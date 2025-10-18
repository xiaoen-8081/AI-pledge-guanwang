import path from 'node:path'
import process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import viewport from 'postcss-mobile-forever'
import autoprefixer from 'autoprefixer'
import { createVitePlugins } from './build/vite'
import { exclude, include } from './build/vite/optimize'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    base: env.VITE_APP_PUBLIC_PATH,
    esbuild: {
      drop: env.VITE_USER_NODE_ENV === 'development' ? [] : ['console', 'debugger'],
    },
    plugins: createVitePlugins(),

    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://shishilian.cn',
          // target: 'http://119.29.64.113',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },

    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~root': path.join(__dirname, '.'),
      },
    },

    css: {
      postcss: {
        plugins: [
          // autoprefixer(),
          // https://github.com/wswmsword/postcss-mobile-forever
          // viewport({
          //   appSelector: '#app',
          //   viewportWidth: 375,
          //   maxDisplayWidth: 400,
          //   border: true,
          // }),
        ],
      },
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    },

    optimizeDeps: { include, exclude },
  }
}
