<script setup lang="ts">
interface PropsTypes {
  gap?: number
  skeletonClass?: string
  height?: string
  number?: number
}
const { gap = 4, skeletonClass = 'rounded-5', height = '20px', number = 4 } = defineProps<PropsTypes>()
</script>

<template>
  <n-flex vertical :size="gap">
    <n-skeleton :class="skeletonClass" :height="height" width="40%" />
    <n-skeleton v-for="i in number" :key="i" :class="skeletonClass" :height="height" width="100%" />
    <n-skeleton :class="skeletonClass" :height="height" width="70%" />
  </n-flex>
</template>

<style scoped>

</style>
