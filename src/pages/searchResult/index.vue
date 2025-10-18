<script setup lang="ts">
import empty from '@/assets/image/empty.png'

const searchVal = ref<string | undefined>('')

const route = useRoute()
onMounted(() => {
  console.log('route', route)
  const params = route.query as { search?: string }
  searchVal.value = params.search
})
</script>

<template>
  <Page>
    <template #content>
      <div class="container px-15">
        <n-flex vertical class="mt-40 flex items-center justify-center text-textColor2">
          <img class="w-200 lg:w-260" :src="empty" alt="">
          <div class="mt-30 text-20 font-500">
            未找到结果 “{{ searchVal }}”
          </div>
          <div class="text-center text-16">
            请尝试输入地址/区块高度/交易哈希进行搜索
          </div>
          <n-button type="primary" @click="$router.replace({ name: 'Home' })">
            返回首页
          </n-button>
        </n-flex>
      </div>
    </template>
  </Page>
</template>

<route lang="json">
  {
    "name": "SearchResult",
    "meta": {
      "activeMenu": "SearchResult",
      "title": "SearchResult"
    }
  }
  </route>
