<script setup lang="ts">
import { useCollapsedPopupHooks } from '@/stores/application/hooks'

const [collapsed, close] = useCollapsedPopupHooks()

const options = [
  { name: 'Home', label: 'Home' },
  { name: 'News', label: 'News' },
]
const router = useRouter()
function toPage(name) {
  router.push({ name })
  close()
}
</script>

<template>
  <n-drawer v-model:show="collapsed" placement="right" :auto-focus="false">
    <n-drawer-content :native-scrollbar="false">
      <template #header>
        <n-flex class="" justify="space-between">
          <div @click="$router.replace({ name: 'Home' })">
            <img src="/src/assets/img/logo.svg" style="width: 60px;" alt="">
          </div>
          <n-button text @click="collapsed = !collapsed">
            <template #icon>
              <div class="i-carbon:close-large text-30" />
            </template>
          </n-button>
        </n-flex>
      </template>
      <n-flex vertical :size="28" class="">
        <n-button
          v-for="x in options"
          :key="x.label"
          class="w-full justify-start"
          align="center"
          text
          @click="toPage(x.name)"
        >
          <div class="text-16">
            {{ x.label }}
          </div>
        </n-button>
      </n-flex>
    </n-drawer-content>
  </n-drawer>
</template>
