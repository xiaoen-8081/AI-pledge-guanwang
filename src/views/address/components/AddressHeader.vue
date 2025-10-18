<script setup lang="ts">
interface PropsType {
  address?: string
  active?: 0 | 1 | 2 | 3
}
const { active = 1 } = defineProps<PropsType>()

const emit = defineEmits(['tabClick'])

function handle(num: number) {
  if (num === active)
    return
  emit('tabClick', num)
}
</script>

<template>
  <n-flex>
    <n-button ghost :type="active === 0 ? 'primary' : 'default'" @click="handle(0)">
      资产
    </n-button>
    <n-button ghost :type="active === 1 ? 'primary' : 'default'" @click="handle(1)">
      NFT列表
    </n-button>
    <n-button ghost :type="active === 2 ? 'primary' : 'default'" @click="handle(2)">
      NFT类别
    </n-button>
    <n-button ghost :type="active === 3 ? 'primary' : 'default'" @click="handle(3)">
      交易记录
    </n-button>
  </n-flex>
</template>

<style scoped>

</style>
