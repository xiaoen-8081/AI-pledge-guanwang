<script setup lang="ts">
interface NavBackProps {
  title?: string
}
defineProps<NavBackProps>()
</script>

<template>
  <n-flex align="center" :size="4">
    <n-button text>
      <span class="i-carbon:chevron-left cursor-pointer text-22" @click="$router.back()" />
    </n-button>
    <slot>
      <span class="text-16 font-600">{{ title }}</span>
    </slot>
  </n-flex>
</template>

<style scoped>

</style>
