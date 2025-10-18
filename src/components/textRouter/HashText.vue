<script setup lang="ts">
import { formatStringEncrypt } from '@/utils/utils'

interface PropsType {
  hash?: string
  encrypt?: boolean
  skip?: boolean
}

const { skip = true, hash, encrypt = true } = defineProps<PropsType>()
const emit = defineEmits(['click'])
const router = useRouter()
function toPage() {
  if (skip) {
    router.push({ name: 'TxsDetail', params: { transHash: hash } })
  }
  emit('click')
}
</script>

<template>
  <span :class="{ 'text-secondary cursor-pointer': skip }" @click="toPage">
    {{ encrypt ? formatStringEncrypt(hash, 6, 6) : hash }}
  </span>
</template>
