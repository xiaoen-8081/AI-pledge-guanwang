<script setup lang="ts">
import { ContractApi } from '@/api/modules'
import type { DataTableColumns } from 'naive-ui'

interface PropType {
  address?: string
}
const { address } = defineProps<PropType>()

const { loading, send, data: balance } = useRequest(
  () => ContractApi.contractUserAmount(address),
  { initialData: { data: {} } },
)
const dataTable = computed(() => {
  return [
    { name: '能量值', balance: balance.value.data },
  ]
})

const columns = computed<DataTableColumns<{ name: string, balance: string }>>(() => {
  return [
    { title: '名称', key: 'name', minWidth: 100 },
    {
      title: '数量',
      key: 'balance',
      minWidth: 100,
      render: row => new Intl.NumberFormat('en-US').format(row.balance as unknown as number),
    },
  ]
})
watch(
  [() => address],
  (newVal) => {
    console.log('newVal', newVal)
    if (newVal[0]) {
      send()
    }
  },
  { immediate: true },
)
</script>

<template>
  <n-card>
    <n-data-table
      remote
      striped
      :loading="loading"
      :columns="columns"
      :data="dataTable"
      :bordered="false"
    />
  </n-card>
</template>
