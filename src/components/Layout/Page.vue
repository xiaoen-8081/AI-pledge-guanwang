<script setup lang="ts">
interface PageProps {
  bottom?: boolean
}
const { bottom = true } = defineProps<PageProps>()
</script>

<template>
  <n-layout position="absolute" :native-scrollbar="false">
    <n-layout-header style="z-index: 1;" position="absolute">
      <slot name="header">
        <Header />
      </slot>
    </n-layout-header>
    <n-layout class="content-min-h-164 lg:content-min-h-118 mt-100 pt-15 lg:mt-54">
      <slot name="content" />
    </n-layout>

    <n-layout-footer
      v-if="bottom"
      bordered
      style="height: 64px;"
    >
      <slot name="bottom">
        <div class="container h-full flex items-center justify-center px-15 text-center text-textColor2">
          江苏网信备31011521343153030049号Copyright © 2023-2025
        </div>
      </slot>
    </n-layout-footer>
  </n-layout>
</template>
