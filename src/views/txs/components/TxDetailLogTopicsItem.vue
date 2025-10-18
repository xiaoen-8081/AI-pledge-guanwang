<script setup lang="ts">
import { trim } from 'viem'

interface PropType {
  index: number
  showSelect?: boolean
  topicsItem: any
}
const { index = 0, showSelect = true, topicsItem } = defineProps<PropType>()
const showType = ref<1 | 2>(1)

const text = computed(() => {
  return showType.value === 2 ? topicsItem : trim(topicsItem)
})
</script>

<template>
  <n-flex align="center">
    <span class="text-12 text-textColor2">{{ index }}</span>
    <n-flex align="center">
      <template v-if="showSelect">
        <n-select
          v-model:value="showType"
          style="width: 70px;" size="tiny"
          :options="[{ label: 'Dec', value: 1 }, { label: 'Hex', value: 2 }]"
        />
      </template>
      <span class="flex-1">{{ text }}</span>
    </n-flex>
  </n-flex>
</template>
