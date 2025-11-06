<script setup lang="ts">
import bg from '@/assets/img/bg.png'
import { useBaseInfo, useWithdraw } from '@/hooks/usePledge'
import { Calc, timeFormat } from '@/utils/utils'

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
          <div class="mx-auto mt-24 max-w-1440px">
            <Header />
          </div>
        </div>
        <div class="mx-auto max-w-[480px] pt-[80px]">
          <n-image width="100%" :src="bg" preview-disabled />
          <div class="flex flex-1 flex-col bg-#fff px-[20px]">
            <div
              class="relative mt-[-20px] h-[120px] flex items-center rounded-xl bg-[#d8eec9] px-[20px]"
            >
              <div class="flex flex-col">
                <span class="text-[18px] text-[#666666]">锁仓数量</span>
                <div class="mt-[12px]">
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
                  <span class="text-[#999]">锁仓价值</span>
                  <span class="mt-[4px] text-[20px] text-[#000] font-bold">
                    {{
                      Calc.Mul(userBaseInfo.pledgeAmount.toSignificant(6), 1)
                    }}
                  </span>
                </div>
                <div class="h-[38px] w-[1px] bg-[#E0E0E0]" />
                <div class="flex flex-1 flex-col items-center justify-center">
                  <span class="text-[#999]">待提现</span>
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
              <div class="mt-[30px] flex items-center justify-between px-[20px]">
                <div class="flex flex-col items-center justify-center">
                  <span class="text-[#999]">预计释放时间</span>
                  <span
                    v-if="userBaseInfo.lockEndTime > userBaseInfo.lastWithdraTime"
                    class="mt-[4px] text-[14px] text-[#000]"
                  >
                    {{ timeFormat(Number(userBaseInfo.lockEndTime) * 1000, 'yyyy/mm/dd hh:MM') }}
                  </span>
                  <span v-else class="mt-[4px] text-[14px] text-[#000]">
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
                <!-- :disabled="txLoading || userBaseInfo.queryReleaseAmount.equalTo(0)" -->
                <n-button
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
    "name": "Private",
    "meta": {
      "activeMenu": "Private",
      "title": "Private"
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
</style>
