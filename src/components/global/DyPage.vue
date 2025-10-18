<script setup lang="ts">
interface Props {
  showHeader?: boolean
}
const { showHeader = true } = defineProps<Props>()
</script>

<template>
  <slot name="header">
    <TopTips />
    <Header v-if="showHeader" />
  </slot>
  <div>
    <slot />
  </div>
  <slot name="footer">
    <Footer />
  </slot>
</template>

<style lang="scss" scoped>

</style>
