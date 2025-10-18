<script setup lang="ts">
import { makeBooleanProp, makeObjectProp, makeStringProp, makeTProp } from '@/components/common/props'
import type { ButtonProps } from 'naive-ui'

const props = defineProps({
  loading: makeBooleanProp(false),
  gradient: makeBooleanProp(false),
  bgGradientColor: makeStringProp(''),
  title: makeStringProp(''),
  text: makeBooleanProp(false),
  size: makeTProp<ButtonProps['size']>('medium'),
  type: makeTProp<ButtonProps['type']>('default'),
  border: makeBooleanProp(true),
  radius: makeStringProp(''),
  height: makeStringProp(''),
  customStyle: makeObjectProp({}),
})
const emit = defineEmits(['click'])
const themeVars = computed(() => {
  const baseThemeVars = {
    heightTiny: props.height || '20px',
    heightMedium: props.height || '35px',
    heightLarge: props.height || '50px',

    borderRadiusSmall: props.radius || '5px',
    borderRadiusMedium: props.radius || '5px',
    borderRadiusLarge: props.radius || '15px',

    iconSizeSmall: '12px',
    iconSizeMedium: '14px',
    iconSizeLarge: '16px',

    fontSizeSmall: '12px',
    fontSizeLarge: '16px',
  }
  return baseThemeVars
})
const bordered = computed(() => {
  return props.gradient || props.text ? false : props.border
})

const style = computed(() => {
  const obj = { ...props.customStyle }
  if (props.gradient && !props.text) {
    obj.background = props.bgGradientColor || 'var(--dy-bg-gradient-primary)'
  }
  return obj
})

function btnClick() {
  if (props.loading)
    return
  emit('click')
}
</script>

<template>
  <n-button
    :type="type"
    :bordered="bordered"
    :theme-overrides="themeVars"
    :loading="loading"
    :style="style"
    :size="size"
    :text="text"
    v-bind="$attrs"
    @click="btnClick"
  >
    <slot>
      {{ title }}
    </slot>
    <slot name="icon" />
  </n-button>
</template>

<style scoped>
.n-button:not(:disabled):active {
  opacity: 0.8;
  transform: translateY(1px);
}

.n-button:not(:disabled):hover {
  opacity: 0.7;
}
</style>
