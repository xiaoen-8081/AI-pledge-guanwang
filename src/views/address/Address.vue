<script setup lang="ts">
import { useUserGroupInfo } from '@/stores/user/hooks'

const route = useRoute()
const address = ref<string | undefined>(undefined)
const { groupId } = useUserGroupInfo()
const active = ref<0 | 1 | 2 | 3>(0)

onMounted(async () => {
  const params = route.params as { address?: string | undefined }
  address.value = params.address
})
</script>

<template>
  <n-flex vertical :size="15" class="container p-15">
    <NavBack>
      <n-flex align="center">
        <span class="text-16">地址详情</span>
        <n-flex align="center" :size="2">
          <span class="text-14 font-400"> {{ address }}</span>
          <DyCopy :text="address" />
        </n-flex>
      </n-flex>
    </NavBack>

    <AddressHeader :active="active" :address="address" @tab-click="num => active = num" />

    <template v-if="active === 0">
      <AddressBalance :address="address" />
    </template>
    <AddressNftList v-if="active === 1" :group-id="groupId" :address="address" />
    <AddressNftCateList v-if="active === 2" :group-id="groupId" :address="address" />
    <AddressTxList v-if="active === 3" :group-id="groupId" :address="address" />
  </n-flex>
</template>
