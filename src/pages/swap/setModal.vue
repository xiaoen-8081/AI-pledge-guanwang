<script setup lang="ts">
const emtis = defineEmits<{
  (e: 'submit', value: { slippageTolerance: number, deadlineMinutes: number }): void
}>()
const showModal = defineModel('show', { default: false })
const tabKey = ref(1)
const value = ref(0.5)
const time = ref(1)
const tabList = ['0.1%', '0.5%', '1%']

function submit() {
  emtis('submit', { slippageTolerance: value.value, deadlineMinutes: time.value })
  showModal.value = false
}
</script>

<template>
  <n-modal
    v-model:show="showModal"
    style="width: 500px"
    preset="dialog"
    :show-icon="false"
    title="高级设置"
  >
    <n-flex vertical :size="20" class="mt-5">
      <n-flex justify="space-between" :size="0">
        <span class="">
          设置滑块容忍度
        </span>
      </n-flex>
      <n-flex justify="space-between" :size="0">
        <div v-for="(item, index) in tabList" :key="index" :class="tabKey === index ? 'bg-primary text-[#fff]' : ''" class="h-34px w-70px flex cursor-pointer items-center justify-center rounded-6 bg-#d9d9d9" @click="tabKey = index, value = parseFloat(item)">
          <span class="text-[12px]">{{ item }}</span>
        </div>
        <div class="w-70px">
          <n-input-number
            v-model:value="value"
            :show-button="false"
            style="border: none;"
            class="flex-1"
            @focus="tabKey = 3"
            @blur="value = value >= 50 ? 0.5 : value"
          >
            <template #suffix>
              <span>%</span>
            </template>
          </n-input-number>
        </div>
      </n-flex>
      <n-flex justify="space-between" :size="0">
        <span class="">
          截止时间
        </span>
      </n-flex>
      <n-flex justify="space-between" :size="0">
        <div class="w-120px">
          <n-input-number
            v-model:value="time"
            :show-button="false"
            style="border: none;"
            class="flex-1"
          >
            <template #suffix>
              <span>分钟</span>
            </template>
          </n-input-number>
        </div>
      </n-flex>

      <n-flex>
        <!-- <n-button
          class="flex-1"
          size="large"
          type="tertiary"
          @click="showModal = false"
        >
          <span>
            关闭
          </span>
        </n-button> -->
        <n-button
          class="flex-1"
          size="large"
          type="primary"
          @click="submit"
        >
          确认设置
        </n-button>
      </n-flex>
    </n-flex>
  </n-modal>
</template>

<style  scoped>

</style>
