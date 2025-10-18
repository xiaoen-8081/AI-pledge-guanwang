<script setup lang="ts">
interface LogoProps {
  logoClass?: string
  titleClass?: string
}
defineProps<LogoProps>()
</script>

<template>
  <n-flex align="center" :size="4">
    <div class="font-shiss text-30 text-primary" :class="[logoClass]">
      A
    </div>
    <span class="font-shiss text-30 text-primary" :class="[titleClass]">师石链</span>
  </n-flex>
</template>

<style scoped>

</style>
