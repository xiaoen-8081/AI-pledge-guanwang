<script setup lang="ts">
import { BlockApi, TranskApi } from '@/api/modules'
import { useUserGroupInfo } from '@/stores/user/hooks'

const value = ref('')
const inputRef = useTemplateRef('input')
const { groupId } = useUserGroupInfo()

const router = useRouter()
function changeValue(val: string) {
  console.log(111, val)
  value.value = val.trim()
}

// 交易哈希
const { send: sendTransByHash } = useRequest(
  (groupId, hash) => TranskApi.transactionByHash(groupId, hash),
  { immediate: false },
)

// 块高
const { send: sendTransByBlock } = useRequest(
  (groupId, hash) => BlockApi.blockByNumber(groupId, hash),
  { immediate: false },
)

async function search() {
  const val = value.value
  value.value = ''
  inputRef.value?.blur()
  console.log('0xa560696256f15f123bd99c1b386e00507903be293243418d6c66e7e2aabdf240'.length)
  // 包含中文
  if (/[\u4E00-\u9FA5]/.test(val)) {
    router.push({ name: 'SearchResult', query: { search: val } })
    return
  }
  // 纯数字
  if (/^[1-9]\d*$/.test(val)) {
    const [err] = await to(sendTransByBlock(groupId.value, val))
    console.log('err', err)
    if (!err) {
      router.push({ name: 'BlocksDetail', params: { blocks: val } })
      return
    }
  }
  // 数字和字母
  if (/^[a-z0-9]+$/i.test(val)) {
    // 地址 0xba35cfbc58c0a8696a9c35e07d15e8b1124494dc
    if (val.length === 42) {
      router.push({ name: 'AddressDetail', params: { address: val } })
      return
    }
    // hash 0xa560696256f15f123bd99c1b386e00507903be293243418d6c66e7e2aabdf240
    if (val.length === 66) {
      const [err] = await to(sendTransByHash(groupId.value, val))
      console.log('err', err)
      if (!err) {
        router.push({ name: 'TxsDetail', params: { transHash: val } })
        return
      }
    }
  }
  router.push({ name: 'SearchResult', query: { search: val } })
}
</script>

<template>
  <n-input ref="input" :value="value" class="w-full" placeholder="输入地址/区块高度/交易哈希进行搜索" @keydown.enter.prevent="search" @update:value="changeValue">
    <template #suffix>
      <div class="i-carbon:search cursor-pointer text-18" @click="search" />
    </template>
  </n-input>
</template>

<style scoped>

</style>
