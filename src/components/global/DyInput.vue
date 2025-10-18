<script setup lang="ts">
interface props {
  item?: { [key: string]: any }
  value?: string | null
}
const { item = {}, value = null } = defineProps<props>()

// const emit = defineEmits(['change', 'blurVaild'])

const x = ref<string | null>(null)

watch(
  () => value,
  (newVal) => {
    x.value = newVal
  },
  { immediate: true },
)
async function innerChange(val: string) {
  await nextTick()
  if (item.limitType === 'float') {
    // 浮点数
    const num = item.decimals || 2
    x.value = val
      .replace(/[^\d.]/g, '')
      .replace(/^0{2}$/g, '0')
      .replace(/^\./g, '') // 首0仅一个，且不能是.
      .replace(/(^0\d*)$/g, '0') // 防止 00121323
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.') // 小数点一个
      .replace(new RegExp(`^(\\d+)\\.(\\d{${num}}).*$`), '$1.$2') // 默认保留2位小数
  }
  else if (item.limitType === 'int') {
    x.value = val.replace(/\D/g, '').replace(/(^0\d*)$/g, '0') // 防止 00121323
  }
  else if (item.limitType === 'percent') {
    x.value = val
      .replace(/[^\d.]/g, '')
      .replace(/^0{2}$/g, '0')
      .replace(/^\./g, '') // 首0仅一个，且不能是.
      .replace(/(^0\d*)$/g, '0') // 防止 00121323
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.') // 小数点一个
      .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 保留2位小数
      .replace(/^[1-9]\d{2}$/, '100') // 数字超过100，赋值成最大值100
      .replace(/^100\d*.$/, '100') // 超过100之后不给再输入值
  }
  else {
    // 无限制
    if (item.formartVal) {
      x.value = item.formartVal(val)
    }
    else {
      x.value = val
    }
  }
}
// function handleChange(e) {
//   if (props.item.valChange)
//     props.item.valChange(e)
//   emit('change', e)
// }
// async function blurInput() {
//   await nextTick()
//   emit('blurVaild')
// }
</script>

<template>
  <n-input
    v-model:value="x"
    v-bind="$attrs"
    @input="innerChange"
  />
</template>
