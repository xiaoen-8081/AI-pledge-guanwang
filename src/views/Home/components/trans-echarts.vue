<script lang="ts" setup>
import type { EchartsUIType } from '@/plugins/echarts'

import { EchartsUI, useEcharts } from '@/plugins/echarts'
import { timeFormat } from '@/utils/utils'

type info = { dateStr: string, txn: number }[]
interface PropType {
  data?: info
  dataTimeBegin: string
}
const { data } = defineProps<PropType>()
const chartRef = ref<EchartsUIType>()
const { renderEcharts } = useEcharts(chartRef)

async function initChart(echartInfo: info) {
  const list = Array.from({ length: 15 }).fill({ value: 0, dateStr: '' }).map((_, index) => {
    const dataTime = timeFormat((new Date()).getTime() - index * 24 * 3600 * 1000, 'yyyy-mm/dd')
    return { value: 0, dateStr: dataTime.split('-')[1] }
  })
  console.log(list)
  const txNum = list.map((x) => {
    const item = echartInfo.map((item) => {
      const l = item.dateStr.split('/')
      return { ...item, dateStr: `${l[0].length < 2 ? '0' : ''}${l[0]}/${l[1].length < 2 ? '0' : ''}${l[1]}` }
    }).find(y => y.dateStr === x.dateStr)
    console.log(3333, x)

    return { ...x, value: item?.txn || 0 }
  }).reverse()
  const dateTime = list.map(x => x.dateStr).reverse()
  // const txNum = echartInfo.map(x => ({ value: x.txn, dateStr: x.dateStr })).reverse()
  // const dateTime = echartInfo.map((x, index) => {
  //   const dataTime = timeFormat((new Date()).getTime() - index * 24 * 3600 * 1000, 'yyyy-mm-dd')
  //   return `${dataTime} ${x.dateStr}`
  // }).reverse()
  await renderEcharts({
    grid: {
      bottom: 0,
      containLabel: true,
      left: '1%',
      right: '1%',
      top: '2 %',
    },
    series: [
      {
        data: txNum,
        itemStyle: {
          color: '#ffc000',
        },
        name: '交易消息数量',
        showSymbol: false,
        symbol: 'emptyCircle',
        emphasis: {
          scale: true,
        },
        smooth: true,
        type: 'line',
      },
    ],
    tooltip: {
      backgroundColor: '#272828',
      borderColor: '#7D6518',
      textStyle: {
        color: '#fff', // Text color
        fontSize: 14, // Font size
      },
      padding: 12,
      borderRadius: 8,
      axisPointer: {
        // type: 'shadow',
        lineStyle: {
          color: '#ffc000',
          width: 0.5,
        },
      },
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: dateTime,
      // axisLabel: {
      //   formatter: (info) => {
      //     return info?.split(' ')?.[1]
      //   },
      // },
    },
    yAxis: [
      {
        splitLine: {
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: '#7D6518',
          },
          show: true,
        },
        splitNumber: 5,
        type: 'value',
      },
    ],
    animationDuration: 500,
  }, false)
}
watch(
  [
    () => chartRef.value,
    () => data,
  ],
  ([val1, val2]) => {
    // console.log('val2', val2)
    if (val1 && val2 && val2?.length > 0) {
      initChart(val2)
    }
  },
  { immediate: true },
)
</script>

<template>
  <EchartsUI ref="chartRef" height="220px" />
</template>
