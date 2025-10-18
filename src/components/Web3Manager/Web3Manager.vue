<script setup lang="ts">
const { sendGroupList } = useGlobalHooks()
const loading = ref(true)

onMounted(async () => {
  console.log('web3manager onMounted')
  loading.value = true
  await sendGroupList()
  loading.value = false
})
</script>

<template>
  <div v-show="loading" class="pos-fixed bottom-0 left-0 right-0 top-0 z-10 flex-row-center bg-amber/10">
    <n-spin size="small" />
  </div>
  <div v-if="!loading" class="h-full w-full">
    <slot />
  </div>
</template>
