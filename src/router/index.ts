import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

console.log('routes', routes)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}

export default router
