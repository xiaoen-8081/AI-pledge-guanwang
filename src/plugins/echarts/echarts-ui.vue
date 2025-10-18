<script setup lang="ts">
interface Props {
  height?: string
  width?: string
}
const { height = '300px', width = '100%' } = defineProps<Props>()
</script>

<template>
  <div v-bind="$attrs" :style="{ height, width }" />
</template>
