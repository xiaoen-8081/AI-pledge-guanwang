<script setup lang="ts">
interface propsType {
  height?: string
  headerBorder?: boolean
  maskClosable?: boolean
  title: string
  titleLeft?: boolean
  closable?: boolean
  supportMobile?: boolean
}

const { height = '70vh', headerBorder = true, maskClosable = true, title, titleLeft = true, closable = true, supportMobile = true } = defineProps<propsType>()
const emit = defineEmits(['close'])

const { width } = useWindowSize()

const show = defineModel<boolean>('show')
function close() {
  emit('close')
}
</script>

<template>
  <template v-if="supportMobile ? width > 850 : true">
    <n-modal
      v-model:show="show"
      transform-origin="center"
      :z-index="100"
      :trap-focus="false"
      :close-on-esc="false"
      :auto-focus="false"
      :mask-closable="maskClosable"
      @update:show="close"
    >
      <div class="mx-auto min-w-320">
        <n-card
          aria-modal="true"
          :bordered="false"
          :closable="false"
          :header-class="headerBorder ? 'bb-borderColor1' : ''"
          @close="close"
        >
          <template #header>
            <n-flex justify="space-between">
              <template v-if="titleLeft">
                <div class="text-18 font-600">
                  {{ title }}
                </div>
              </template>
              <template v-else>
                <dy-button v-if="closable" text>
                  <div class="i-carbon:close-large text-20 text-transparent opacity-0" />
                </dy-button>
                <div class="flex-1 text-center text-18 font-600">
                  {{ title }}
                </div>
              </template>
              <dy-button v-if="closable" text @click="close">
                <div class="i-carbon:close-large text-20 text-white" />
              </dy-button>
            </n-flex>
          </template>
          <n-scrollbar :style="{ maxHeight: height }">
            <slot />
          </n-scrollbar>
          <template #footer>
            <slot name="footer" />
          </template>
        </n-card>
      </div>
    </n-modal>
  </template>
  <template v-else>
    <n-drawer
      v-model:show="show"
      placement="bottom"
      :auto-focus="false"
      :height="height"
      @update:show="close"
    >
      <n-drawer-content :native-scrollbar="false">
        <template #header>
          <n-flex justify="space-between">
            <template v-if="titleLeft">
              <div class="text-18 font-600">
                {{ title }}
              </div>
            </template>
            <template v-else>
              <dy-button v-if="closable" text>
                <div class="i-carbon:close-large text-20 text-transparent opacity-0" />
              </dy-button>
              <div class="flex-1 text-center text-18 font-600">
                {{ title }}
              </div>
            </template>
            <dy-button v-if="closable" text @click="close">
              <div class="i-carbon:close-large text-20 text-white" />
            </dy-button>
          </n-flex>
        </template>
        <slot />
        <slot name="footer" />
      </n-drawer-content>
    </n-drawer>
  </template>
</template>
