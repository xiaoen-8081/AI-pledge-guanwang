<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import type { ContractType } from '../useTxForm'

interface PropType {
  options: SelectOption[]
  updateValue?: (val: ContractType) => void
}
const { updateValue } = defineProps<PropType>()
const contractType = defineModel<ContractType>('value')

function changeVal(val: ContractType) {
  updateValue?.(val)
}
</script>

<template>
  <n-select v-model:value="contractType" class="w-200" :options="options" @update:value="changeVal" />
</template>

<style scoped>

</style>
