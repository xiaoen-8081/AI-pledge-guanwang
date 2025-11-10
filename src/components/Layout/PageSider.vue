<script setup lang="ts">
import { useCollapsedPopupHooks } from '@/stores/application/hooks'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const [collapsed, close] = useCollapsedPopupHooks()

const options = [
  { name: 'Home', label: t('Home'), value: 'cn' },
  { name: 'News', label: t('News'), value: 'cn' },
  { name: 'Swap', label: t('Swap'), value: 'cn' },
  { name: 'Public', label: t('Public'), value: 'cn' },
  { name: 'Private', label: t('Private'), value: 'cn' },
]
const router = useRouter()
function toPage(item) {
  if (item.url) {
    window.open(item.url, '_blank')
    return
  }
  router.push({ name: item.name })
  close()
}
</script>

<template>
  <n-drawer v-model:show="collapsed" placement="right" :auto-focus="false">
    <n-drawer-content :native-scrollbar="false">
      <template #header>
        <n-flex class="" justify="space-between">
          <div @click="$router.replace({ name: 'Home' })">
            <img src="/src/assets/img/logo.svg" style="width: 80px;" alt="">
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
          @click="toPage(x)"
        >
          <div class="text-16">
            {{ x.label }}
          </div>
        </n-button>
      </n-flex>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
::v-deep(.n-drawer-header) {
  padding-left: 0px !important;
}
</style>
