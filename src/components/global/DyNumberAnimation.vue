<script setup lang="ts">
interface PropsType {
  valString: string | undefined
}
const { valString = '' } = defineProps<PropsType>()

const from = ref(0)
const value = ref(0)
const precision = ref(0)
watch(() => valString, (newVal, oldVal) => {
  // console.log('newVal', newVal)
  from.value = Number(oldVal || 0)
  value.value = Number(newVal || 0)
  precision.value = newVal.split('.')[1]?.length || 0
}, { immediate: true })
</script>

<template>
  <div>
    <n-number-animation :precision="precision" :from="from" :to="value" />
  </div>
</template>

<style lang="scss" scoped>

</style>
