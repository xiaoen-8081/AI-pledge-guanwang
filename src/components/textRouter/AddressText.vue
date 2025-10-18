<script setup lang="ts">
import { formatStringEncrypt } from '@/utils/utils'

interface PropsType {
  address?: string
  encrypt?: boolean
  skip?: boolean
}

const { skip = true, address, encrypt = true } = defineProps<PropsType>()
const emit = defineEmits(['click'])
const router = useRouter()
function toPage() {
  if (skip) {
    router.push({ name: 'AddressDetail', params: { address } })
  }
  emit('click')
}
</script>

<template>
  <span :class="{ 'text-secondary cursor-pointer': skip }" @click="toPage">
    {{ encrypt ? formatStringEncrypt(address, 6, 6) : address }}
  </span>
</template>
