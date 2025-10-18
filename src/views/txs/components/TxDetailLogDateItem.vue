<script setup lang="ts">
interface PropType {
  rawDate: string
  inputDataParams: any[]
}
defineProps<PropType>()

const showType = ref<1 | 2>(1)
</script>

<template>
  <n-card v-if="inputDataParams" :bordered="false" size="small" class="pos-relative" style="background-color: rgba(255, 255, 255, 0.1);">
    <n-flex>
      <n-flex vertical class="flex-1">
        <template v-if="showType === 1">
          <n-flex v-for="(q, indez) in inputDataParams.filter(z => !z.indexed)" :key="indez">
            <span class="text-textColor2">{{ q.name }}:</span>
            <span>{{ q.data }}</span>
          </n-flex>
        </template>
        <span v-else>{{ rawDate }}</span>
      </n-flex>
      <n-select
        v-model:value="showType"
        style="width: 70px;" size="tiny"
        :options="[{ label: 'Dec', value: 1 }, { label: 'Hex', value: 2 }]"
      />
    </n-flex>
  </n-card>
</template>
