<script setup lang="ts">
import { timeFormat } from '@/utils/utils'

const newsData: any = ref({})
const flashNews: any = ref([])
const current = ref<number>(0)
const currentStatus = ref<'process' | 'finish' | 'error'>('process') // Add this line
const checkbox = ref(true)
const downTime = ref<number>(60)

const timer = ref()
watch (checkbox, (newVal) => {
  if (newVal) {
    timer.value = setInterval(() => {
      downTime.value -= 1
      if (downTime.value <= 0) {
        downTime.value = 60
        send()
      }
    }, 1000)
  }
  else {
    clearInterval(timer.value)
  }
}, { immediate: true })

onMounted(async () => {
  send()
})

const tabsList = ref<any>([{ name: '精选', id: '' }])

const tagId = ref('')
async function send(lastTime?: string) {
  try {
    let url = ''
    if (lastTime) {
      url = tagId.value ? `https://api.panewslab.com/webapi/flashnews?rn=20&lid=1&apppush=0&tagId=${tagId.value}&lastTime=${lastTime}` : `https://api.panewslab.com/webapi/flashnews?rn=20&lid=1&apppush=0&lastTime=${lastTime}`
    }
    else {
      url = tagId.value ? `https://api.panewslab.com/webapi/flashnews?rn=20&lid=1&apppush=0&tagId=${tagId.value}` : 'https://api.panewslab.com/webapi/flashnews?rn=20&lid=1&apppush=0'
    }
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await res.json()
    newsData.value = json.data
    if (lastTime) {
      json.data.flashNews.forEach((item: any) => {
        const exist = flashNews.value.find((f: any) => f.date === item.date)
        if (exist) {
          exist.list = exist.list.concat(item.list)
        }
        else {
          flashNews.value.push(item)
        }
      })
    }
    else {
      flashNews.value = json.data.flashNews
    }
    tabsList.value = [{ name: '精选', id: '' }, ...newsData.value.tag.map((item: any) => ({ name: item.name, id: item.id }))]
    console.log('返回结果：', json.data)
  }
  catch (err) {
    console.error('请求失败：', err)
  }
}

function test(val: string) {
  tagId.value = val
  send()
}
</script>

<template>
  <Page>
    <template #content>
      <!-- 7 -->
      <div class="pos-relative w-full">
        <div class="pos-fixed left-0 top-0 z-99 w-full">
          <div class="mx-auto mt-24 max-w-1440px">
            <Header />
          </div>
        </div>
        <div class="w-full flex flex-col items-center justify-between bg-[rgba(239,65,46,0.1)] pb-[60px] pt-[80px] md:pb-0">
          <div class="mx-auto max-w-1440px flex flex-1 justify-between">
            <div class="mx-20px h-full flex-1 border-1px border-[#FF0A00] rounded-16px border-solid bg-#fff p-20px md:my-[40px]">
              <div class="hidden lg:block">
                <div class="flex justify-between">
                  <n-tabs
                    class="card-tabs"
                    default-value=""
                    size="large"
                    animated
                    pane-wrapper-style="margin: 0 -4px"
                    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
                    @update:value="test"
                  >
                    <n-tab-pane v-for="(item, index) in tabsList" :key="index" :name="item.id" :tab="item.name" />
                  </n-tabs>
                  <div class="w-170px">
                    <n-checkbox v-model:checked="checkbox" style="margin-right: 12px">
                      <div>
                        <span class="mr-4px">{{ downTime }}</span>
                        <span>秒后自动刷新</span>
                      </div>
                    </n-checkbox>
                  </div>
                </div>
              </div>
              <div class="lg:hidden">
                <n-space vertical>
                  <n-select v-model:value="tagId" :options="tabsList" label-field="name" value-field="id" @update:value="test" />
                </n-space>
                <div class="my-[10px] w-170px">
                  <n-checkbox v-model:checked="checkbox" style="margin-right: 12px">
                    <div>
                      <span class="mr-4px">{{ downTime }}</span>
                      <span>秒后自动刷新</span>
                    </div>
                  </n-checkbox>
                </div>
              </div>
              <!--  -->
              <div v-for="(item, index) in flashNews" :key="index">
                <div class="flex">
                  <div class="h-60px w-50px overflow-hidden border border-[#FF0A00] rounded-6px border-solid">
                    <div class="h-30px w-full flex items-center justify-center bg-[rgba(239,65,46)] c-#fff">
                      {{ item.month }}
                    </div>
                    <div class="h-30px w-full flex items-center justify-center text-20px c-[rgba(239,65,46)]">
                      {{ item.date.split('-')[2] }}
                    </div>
                  </div>
                  <div class="ml-10px h-60px w-100px">
                    <div class="mt-2px h-30px w-full flex items-center text-18px c-#222">
                      <span v-if="Number(item.date.split('-')[2]) === Number(new Date().getDate())">今天</span>
                      <span v-else-if="Number(item.date.split('-')[2]) === Number(new Date().getDate() - 1)">昨天</span>
                      <span v-else />
                    </div>
                    <div class="mt-2px h-30px w-full flex items-center c-#222">
                      {{ item.week }}
                    </div>
                  </div>
                </div>
                <n-space vertical>
                  <n-steps vertical :current="current" :status="currentStatus" size="small" indicator-placement="outside">
                    <n-step
                      v-for="(i) in flashNews?.[index]?.list" :key="i.id"
                      :description="i.desc"
                    >
                      <template #icon>
                        <div class="dot" />
                      </template>
                      <template #title>
                        <div />
                      </template>
                      <template #default>
                        <div class="w-full flex">
                          <div class="h-full w-60px c-#222">
                            {{ timeFormat(i.ctime, 'hh:mm') }}
                          </div>
                          <div class="flex-1">
                            <div class="text-20px c-#222">
                              {{ i.title }}
                            </div>
                            <div class="mt-10px c-#666">
                              {{ i.desc }}
                            </div>
                          </div>
                        </div>
                      </template>
                    </n-step>
                  </n-steps>
                </n-space>
              </div>
              <!--  -->
              <div class="mt-20px flex cursor-pointer justify-center text-20px c-[rgba(239,65,46)]" @click="send(flashNews?.[flashNews?.length - 1]?.list?.[flashNews?.[flashNews?.length - 1]?.list?.length - 1]?.ctime)">
                加载更多快讯
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
    "name": "Blocks",
    "meta": {
      "activeMenu": "Blocks",
      "title": "Blocks"
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
