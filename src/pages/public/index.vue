<script setup lang="ts">
import bg from '@/assets/img/bg.png'
import tgn from '@/assets/img/tgn.png'
import { useBaseInfo, useWithdraw } from '@/hooks/usePledge'
import { Calc, timeFormat } from '@/utils/utils'

const value = ref(null)

// ==== 数据 ====
const { userBaseInfo } = useBaseInfo()

const txLoading = ref(false)
const { withdraw } = useWithdraw()
async function _withdraw() {
  txLoading.value = true
  await withdraw({
    onError: () => {
      txLoading.value = false
      // 错误处理
      window.$Toast.show('提现失败')
    },
    onStop: () => {
      txLoading.value = false
    },
    onSuccess: () => {
      // 成功处理
      txLoading.value = false
      window.$Toast.show('提现成功')
    },
  })
}

onMounted(() => {
})
</script>

<template>
  <Page>
    <template #content>
      <div class="bg">
        <div class="pos-fixed left-0 top-0 z-99 w-full">
          <div class="mx-auto mt-12 max-w-1440px">
            <Header />
          </div>
        </div>
        <div class="mx-auto max-w-[480px] pt-[80px]">
          <div />
          <n-image width="100%" :src="bg" preview-disabled />
          <!-- <div class="h-[140px] w-[100%]" /> -->
          <div class="flex flex-1 flex-col bg-#fff px-[20px]">
            <div
              class="relative mt-[-90px] h-[100px] flex items-center rounded-xl px-[20px]" style="background: linear-gradient(135deg, rgba(255,255,255,0) 0%, #d9efcb 29%), #ebf8e4;"
            >
              <div class="flex flex-col">
                <span class="mt-12px text-[18px] text-[#666666]">公募锁仓数量（TGN）</span>
                <div class="">
                  <span class="text-[30px] text-[#73CC2E] font-bold">
                    {{
                      userBaseInfo.pledgeAmount.toSignificant(6)
                    }}
                  </span>
                  <!-- <span class="text-[20px] font-bold text-[#73CC2E]"> USDT </span> -->
                </div>
              </div>
            </div>
            <div class="box w-full py-[20px]">
              <div class="flex items-center">
                <div class="flex flex-1 flex-col items-center justify-center">
                  <span class="text-[#999]">锁仓价值（$）</span>
                  <span class="mt-[4px] text-[20px] text-[#000] font-bold">
                    {{
                      Calc.Mul(userBaseInfo.pledgeAmount.toSignificant(6), 1)
                    }}
                  </span>
                </div>
                <div class="h-[38px] w-[1px] bg-[#E0E0E0]" />
                <div class="flex flex-1 flex-col items-center justify-center">
                  <div class="flex items-center">
                    <n-image width="20px" :src="tgn" preview-disabled />
                    <span class="ml-4px text-[#999]">待提现（TGN）</span>
                  </div>
                  <span class="mt-[4px] text-[20px] text-[#73CC2E] font-bold">
                    {{
                      Calc.Mul(
                        userBaseInfo.queryReleaseAmount.toSignificant(6),
                        1,
                      )
                    }}
                  </span>
                </div>
              </div>
              <div class="mt-[20px] flex items-center justify-between px-[20px]">
                <div class="flex flex-col items-center justify-center">
                  <span class="text-[#999]">预计释放时间</span>
                  <span
                    v-if="userBaseInfo.lockEndTime > userBaseInfo.lastWithdraTime"
                    class="mt-[4px] text-[14px] text-[#000]"
                  >
                    {{ timeFormat(Number(userBaseInfo.lockEndTime) * 1000, 'yyyy/mm/dd hh:MM') }}
                  </span>
                  <span v-else class="mt-[4px] text-[16px] text-[#000]">
                    {{
                      timeFormat(
                        Calc.Add(
                          Number(userBaseInfo.lastWithdraTime),
                          Number(userBaseInfo.withdrawExtracIntervalTime),
                        ) * 1000, 'yyyy/mm/dd hh:MM',
                      )
                    }}
                  </span>
                </div>
                <n-button
                  :disabled="txLoading || userBaseInfo.queryReleaseAmount.equalTo(0)"
                  :loading="txLoading"
                  type="primary"
                  color="#73CC2E"
                  round
                  style="width: 116px"
                  @click="_withdraw"
                >
                  <span>提现</span>
                </n-button>
              </div>
              <!--  -->
              <div
                class="relative mb-20px mt-10px border-1px border-primary rounded-6px border-solid px-18px py-12px"
                style="font-family: Noto Sans SC, Noto Sans SC;"
              >
                <div class="flex items-center">
                  <n-image width="30px" :src="tgn" preview-disabled />
                  <span class="ml-6px text-20px font-500">TGN</span>
                </div>
                <!--  -->
                <div class="mt-10px">
                  <span class="text-[16px] text-[#666]">Price</span>
                </div>
                <div class="mt-[-10px] flex items-center justify-between">
                  <span class="text-24px text-primary font-bold">0.02</span>
                  <span class="text-[16px] text-[#666]">USD</span>
                </div>
                <!--  -->
                <div class="my-4px">
                  <span class="text-[16px] text-[#666]">USDT</span>
                </div>
                <n-input
                  v-model:value="value"
                  :bordered="false"
                  style="border: none;"
                  clearable placeholder="请输入数量" class="flex-1"
                >
                  <template #suffix>
                    <span>MAX</span>
                  </template>
                </n-input>
                <!--  -->
                <div class="mt-10px">
                  <span class="text-[14px] text-[#666]">获得</span>
                </div>
                <div class="mt-[-10px] flex items-center justify-between">
                  <span class="text-24px text-[#000] font-bold">0.02</span>
                  <span class="text-[16px] text-[#666]">TGN</span>
                </div>
                <!--  -->
                <div class="absolute z-99" style="bottom: -16px; left: 50%; margin-left: -58px;">
                  <n-button
                    :loading="txLoading"
                    type="primary"
                    color="#73CC2E"
                    round
                    style="width: 116px"
                    @click="_withdraw"
                  >
                    <span>认购</span>
                  </n-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Page>

  <!--  -->
</template>

<route lang="json">
  {
    "name": "Public",
    "meta": {
      "activeMenu": "Public",
      "title": "Public"
    }
  }
  </route>

  <style scoped>
  .bg {
  width: 100vw;
  height: calc(100vh - 120px);
  background-image: url('/src/assets/img/lockBg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover;
}
.dot {
  margin: auto;
  width: 10px;
  height: 10px;
  background-color: #73cc2e;
  border-radius: 50%;
  margin-top: 16px;
}
::v-deep(.n-steps) {
  .n-step-indicator {
    box-shadow: none !important;
  }
}
::v-deep(.n-step-splitor) {
  width: 2px !important;
  background: #73cc2e;
  left: 10px !important;
  height: calc(100% + 14px) !important;
  bottom: -36px !important;
}
::v-deep(.n-step-content-header__title) {
  color: #333;
  font-size: 20px;
}
::v-deep(.n-step-content) {
  color: #666 !important;
}
::v-deep(.n-step-content__description) {
  color: #666 !important;
  font-size: 18px;
}
::v-deep(.n-input-wrapper) {
  background: #f4f4f4;
  border-radius: 4px;
}
</style>
