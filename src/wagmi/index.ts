import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { queryClient, wagmiConfig } from './wagmi'
import type { App } from 'vue'

export function setupWagmi(app: App) {
  app.use(WagmiPlugin, { config: wagmiConfig })
  app.use(VueQueryPlugin, { queryClient })
}
