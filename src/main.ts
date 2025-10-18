import 'virtual:uno.css'
import './styles/var.css'
import './styles/naive.css'
import './styles/font.css'
import { createApp } from 'vue'
import App from './App.vue'
import DyAppLoading from '@/components/global/DyAppLoading.vue'

import { setupStore } from './stores/index'
import { setupNaiveDiscreteApi } from './plugins/index'
import { setupRouter } from './router/index'
import { setupWagmi } from './wagmi'
import { i18n } from './locales'

async function setupApp() {
  // 载入全局loading加载状态
  const appLoading = createApp(DyAppLoading)
  appLoading.mount('#appLoading')

  // 创建vue实例
  const app = createApp(App)

  // 注册模块Pinia
  setupStore(app)

  // 载入全局 NaiveDiscreteApi
  setupNaiveDiscreteApi()

  // 注册wagmi
  setupWagmi(app)

  // 注册模块 Vue-router
  await setupRouter(app)

  // 多语言
  app.use(i18n)
  // 卸载载入动画
  appLoading.unmount()
  // 挂载
  app.mount('#app', true)
}

setupApp()
