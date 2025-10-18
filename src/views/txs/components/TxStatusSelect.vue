<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import type { txStatusType } from '../useTxForm'

interface PropType {
  options: SelectOption[]
  updateValue?: (val: txStatusType) => void
}
const { updateValue } = defineProps<PropType>()
const status = defineModel<txStatusType>('value')

function changeVal(val: txStatusType) {
  if (status.value === val)
    return
  status.value = val
  updateValue?.(val)
}
</script>

<template>
  <n-button-group>
    <n-button
      v-for="(item, index) in options"
      :key="index"
      ghost
      :type="status === item.value ? 'primary' : 'default'"
      @click="changeVal(item.value as txStatusType)"
    >
      {{ item.title }}
    </n-button>
  </n-button-group>
</template>

<style scoped>

</style>
