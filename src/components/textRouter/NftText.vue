<script setup lang="ts">
import { formatStringEncrypt } from '@/utils/utils'
import type { Hash } from 'viem'

interface PropsType {
  text?: string | number
  encrypt?: boolean
  skip?: boolean
  query: { id: number | string, contractAddress: string | Hash | undefined }
}

const { skip = true, text, encrypt = true, query } = defineProps<PropsType>()
const emit = defineEmits(['click'])
const router = useRouter()
function toPage() {
  if (skip) {
    router.push({ name: 'NftDetail', query: { nftId: query.id, contractAddress: query.contractAddress } })
  }
  emit('click')
}
</script>

<template>
  <span :class="{ 'text-secondary cursor-pointer': skip }" @click="toPage">
    {{ encrypt ? formatStringEncrypt(String(text), 6, 6) : text }}
  </span>
</template>
