<script setup lang="ts">
import { useCopy } from '@/hooks/useCopyPopover.js'

interface PropType {
  text?: string
  showText?: boolean
  iconClass?: string
}
const { showText = false } = defineProps<PropType>()
const { showCopyPopover, copy } = useCopy()
const { t } = useI18n()
</script>

<template>
  <div>
    <n-popover trigger="manual" :show="showCopyPopover">
      <template #trigger>
        <slot name="trigger">
          <div class="i-tabler:copy cursor-pointer text-14" :class="iconClass" @click="copy(text)" />
        </slot>
      </template>
      <span class="flex break-all">{{ t('copy') }} {{ showText ? `: ${text}` : '' }}</span>
    </n-popover>
  </div>
</template>

<i18n lang="json" global>
{
  "cn": { "copy": "已复制" },
  "en": { "copy": "Copied" },
  "hk": { "copy": "已複製" },
  "ko": { "copy": "복사됨" },
  "jp": { "copy": "コピー済み" }
}
</i18n>
