<script setup lang="ts">
import { timeFormat } from '@/utils/utils'

const info: any = ref({})
onMounted(() => {
  info.value = JSON.parse(sessionStorage.getItem('newsInfo') || '')
  console.log(info.value)
})
</script>

<template>
  <Page>
    <template #content>
      <div class="pos-relative w-full">
        <div class="pos-fixed left-0 top-0 z-99 w-full">
          <div class="mx-auto mt-12 max-w-1440px">
            <Header />
          </div>
        </div>
        <div class="min-h-[80vh] w-full flex flex-col items-center justify-between bg-[rgba(115,204,46,0.1)] pb-[60px] pt-[80px] md:pb-0">
          <div class="mx-auto max-w-1440px flex flex-1 justify-between">
            <div class="mt-[10px] h-full flex-1 rounded-16px bg-#fff p-20px lg:mx-20px lg:my-[40px] lg:border-1px lg:border-[#73CC2E] lg:border-solid">
              <div class="text-center text-[20px]">
                {{ info.title }}
              </div>
              <div class="mt-[10px] flex items-center justify-center">
                <n-avatar
                  round
                  size="medium"
                  :src="info?.author?.img"
                />
                <span class="ml-[6px] lg:text-[18px]">{{ info.author?.name }}</span>
                <span class="mx-[6px] lg:text-[18px]" style="width: 1px; height: 16px; background: #000;" />
                <span class="lg:text-[18px]">{{ timeFormat(info.ctime, 'yyyy/mm/dd hh:MM') }}</span>
              </div>
              <div class="mt-[20px] text-[18px]">
                {{ info.desc }}
              </div>
              <div class="mt-[20px] text-center lg:text-[18px]">
                {{ $t('作者') }}：{{ info.author?.name }}
              </div>
              <div class="text-center lg:text-[18px]">
                {{ $t('本内容只为提供市场信息，不构成投资建议') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Page>
</template>

<route lang="json">
  {
    "name": "NewsDetail",
    "meta": {
      "activeMenu": "News",
      "title": "NewsDetail"
    }
  }
  </route>

  <style scoped>
.dot {
  margin: auto;
  width: 10px;
  height: 10px;
  background-color: #f00;
  border-radius: 50%;
  margin-top: 16px;
}
::v-deep(.n-steps) {
  .n-step-indicator {
    box-shadow: none !important;
  }
}
::v-deep(.n-step-splitor) {
  width: 2px !important;
  background: #f00;
  left: 10px !important;
  height: calc(100% + 14px) !important;
  bottom: -36px !important;
}
::v-deep(.n-step-content-header__title) {
  color: #333;
  font-size: 20px;
}
::v-deep(.n-step-content) {
  color: #666 !important;
}
::v-deep(.n-step-content__description) {
  color: #666 !important;
  font-size: 18px;
}
</style>
