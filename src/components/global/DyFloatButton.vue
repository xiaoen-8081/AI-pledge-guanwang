<script setup lang="ts">
interface propsType {
  title?: string
  content?: { [key: string]: string }[]
}
const { title = '操作指引', content = [] } = defineProps<propsType>()
const showPopover = ref(false)
</script>

<template>
  <n-popover trigger="click" scrollable :show="showPopover">
    <template #header>
      <div class="w-full flex-row-between">
        <div>{{ title }}</div>
        <div class="i-carbon:close-filled text-16" @click="showPopover = false" />
      </div>
    </template>
    <template #trigger>
      <n-float-button :right="50" :bottom="80" @click="showPopover = !showPopover">
        <div class="i-carbon:document" />
      </n-float-button>
    </template>
    <slot>
      <div class="h-70vh w-240 flex">
        <n-collapse arrow-placement="right" class="w-full">
          <n-collapse-item v-for="(item, index) in content" :key="index" :title="item.title" :name="item.title">
            <div v-html="item.content" />
          </n-collapse-item>
        </n-collapse>
      </div>
    </slot>
  </n-popover>
</template>

<style scoped>

</style>
