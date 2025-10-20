<script lang="ts" setup>
import type { EchartsUIType } from '@/plugins/echarts'
import isEqual from 'lodash/isEqual' // 需要安装 lodash
import { onMounted, ref } from 'vue'

import { EchartsUI, useEcharts } from '@/plugins/echarts'
import { sleep } from '@/utils/utils'

interface PropType {
  data?: Service.BlockApi.BlockList[]
}
const { data } = defineProps<PropType>()
const chartRef = ref<EchartsUIType>()
const { renderEcharts, getChartInstance } = useEcharts(chartRef)
const isDefaultActive = ref(true)
const isMouseover = ref(false)
async function tipAction(chertInstanse: any, { time = 0, type = 'showTip' }: { time?: number, type?: 'showTip' | 'hideTip' }) {
  if (time > 0) {
    await sleep(time)
  }
  chertInstanse?.dispatchAction({
    type,
    seriesIndex: 0,
    dataIndex: 1,
  })
}
async function highlightAction(chertInstanse: any, { time = 0, type = 'highlight' }: { time?: number, type?: 'highlight' | 'downplay' }) {
  if (time > 0) {
    await sleep(time)
  }
  chertInstanse?.dispatchAction({
    type,
    seriesIndex: 0,
    dataIndex: 1,
  })
}
async function initChart(echartInfo: Service.BlockApi.BlockList[]) {
  const txNum = echartInfo.map(x => ({ value: x.txn, blockNumber: x.number }))
  const blockNum = echartInfo.map(x => x.number)
  const chertInstanse = await renderEcharts({
    grid: {
      bottom: 0,
      containLabel: true,
      left: '1%',
      right: '1%',
      top: '1%',
    },
    series: [
      {
        barMaxWidth: 60,
        data: txNum,
        type: 'bar',
        itemStyle: {
          color: 'rgba(94, 191, 255, .4)',
        },
        emphasis: {
          itemStyle: {
            color: '#e51922', // 悬停颜色
          },
        },
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
        type: 'shadow',
        lineStyle: {
          color: '#e51922',
          width: 0.5,
        },
      },
      formatter: (params) => {
        const data = params.data
        return `
          <div style="line-height: 1.6;">
            区块高度 ${data?.blockNumber}<br/>
            交易数量 ${data?.value}
          </div>
        `
      },
      trigger: 'item',
      position: 'top',
    },
    xAxis: {
      show: false,
      position: 'top',
      type: 'category',
      data: blockNum,
    },
    yAxis: {
      position: 'right',
      show: false,
      type: 'value',
      min: 0,
      max: (x) => {
        return x.max * 2
      },
      // splitNumber: 100,
      // max: 100,
    },
    animationDuration: 500,
  }, false)
  // 高亮
  isDefaultActive.value = true
  tipAction(chertInstanse, { time: 500 })
  highlightAction(chertInstanse, { time: 500 })
  chertInstanse?.on('mousemove', (params) => {
    // console.log('params mousemove', params)
    if (params.componentType === 'series' && isDefaultActive.value) {
      // 取消默认高亮
      isMouseover.value = true
      isDefaultActive.value = false
      tipAction(chertInstanse, { type: 'hideTip' })
      highlightAction(chertInstanse, { type: 'downplay' })
    }
  })
  chertInstanse?.on('globalout', () => {
    // console.log('params globalout', params)
    if (!isDefaultActive.value) {
      // 默认高亮
      isMouseover.value = false
      isDefaultActive.value = true
      tipAction(chertInstanse, { time: 0 })
      highlightAction(chertInstanse, { time: 0 })
    }
  })
}
let lastVal: number[] = []
const blockNum = computed(() => {
  const list = data?.map(x => x.number) || []
  if (!isEqual(list, lastVal)) {
    lastVal = list
  }
  return lastVal
})
watch(
  [
    () => chartRef.value,
    () => blockNum.value,
  ],
  ([val1, val2]) => {
    // console.log('val2', val2)
    if (val1 && val2?.length > 0 && data) {
      const chart = getChartInstance()
      tipAction(chart, { type: 'hideTip' })
      highlightAction(chart, { type: 'downplay' })
      initChart(data)
    }
  },
  { immediate: true },
)

// function test() {
//   const x = [
//     { number: 1196, txn: 1 },
//     { number: 1195, txn: 1 },
//     { number: 1194, txn: 1 },
//     { number: 1193, txn: 1 },
//     { number: 1192, txn: 1 },
//     { number: 1191, txn: 1 },
//     { number: 1190, txn: 1 },
//     { number: 1189, txn: 1 },
//     { number: 1188, txn: 1 },
//     { number: 1187, txn: 1 },
//   ]
//   initChart(x as Service.BlockApi.BlockList[])
//   setInterval(() => {
//     x.unshift({ number: x[0].number + 1, txn: Math.floor(Math.random() * 10) + 1 })
//     x.pop()
//     if (!isMouseover.value) {
//       const chart = getChartInstance()
//       tipAction(chart, { type: 'hideTip' })
//       highlightAction(chart, { type: 'downplay' })
//       initChart(x as Service.BlockApi.BlockList[])
//     }
//   }, 1000)
// }

onMounted(() => {
  // test()
})
</script>

<template>
  <EchartsUI ref="chartRef" height="100px" />
</template>
