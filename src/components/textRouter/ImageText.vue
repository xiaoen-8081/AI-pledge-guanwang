<script setup lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'

interface PropType {
  urls?: string[]
}
const { urls = [] } = defineProps<PropType>()
const imgList = computed(() => {
  return urls
})
const visible = ref(false)
</script>

<template>
  <div>
    <span class="cursor-pointer text-primary" @click="visible = true">查看图片</span>
    <!-- 图片展示组件 -->
    <VueEasyLightbox
      :visible="visible"
      :imgs="imgList"
      @hide="visible = false"
    />
  </div>
</template>

<style scoped>

</style>
