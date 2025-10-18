<script setup lang="ts">
import { formatStringEncrypt } from '@/utils/utils'

interface PropsType {
  text?: number
  encrypt?: boolean
  skip?: boolean
  blocks?: number | string | null
}

const { skip = true, text, encrypt = true, blocks } = defineProps<PropsType>()
const emit = defineEmits(['click'])
const router = useRouter()
function toPage() {
  if (skip) {
    router.push({ name: 'BlocksDetail', params: { blocks } })
  }
  emit('click')
}
</script>

<template>
  <span :class="{ 'text-secondary cursor-pointer': skip }" @click="toPage">
    {{ encrypt ? formatStringEncrypt(String(text), 6, 6) : text }}
  </span>
</template>
