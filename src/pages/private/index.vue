<script setup lang="ts">
import bg from '@/assets/img/smbg.png'
import tgn from '@/assets/img/tgn.png'
import usdt from '@/assets/img/usdt.png'
import { useMapUserInfo, useSubscription, useWithdraw } from '@/hooks/usePledge'
import { Calc, timeFormat } from '@/utils/utils'
import { useAppBlockHooks } from '@/stores/application/hooks'
import { CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import { PLEDGE_ADDRESS, REWARD_TOKEN_ADDRESS, RewardToken, TgnToken } from '@/constants'
import { useTokenBalance } from '@/hooks/useSwap'
import { useAccount } from '@wagmi/vue'
import { useApprove, useGetAllowance } from '@/hooks/useApprove'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { address } = useAccount()
const value = ref(null)
const toU = ref(0)

const userInfo: any = ref({})
const { getTokenBalance } = useTokenBalance()

const {
  getMapUserInfo,
  getqueryReleaseAmount,
  getlockEndTime,
  getwithdrawExtracIntervalTime,
  getTgnPrice,
  getIsWithdrawTime,
} = useMapUserInfo()

async function _get_usdt_balance() {
  const usdtBalance = await getTokenBalance(RewardToken.address, RewardToken.decimals)
  userInfo.value.usdtBalance = Number(usdtBalance)
}
// getTokenBalance

async function _getMapUserInfo() {
  const res = await getMapUserInfo()
  const [
    pledgeAmount = 0n,
    withdrawAmount = 0n,
    withdrawBalance = 0n,
    lastWithdraTime = 0n,
  ] = Array.isArray(res) ? res : []
  userInfo.value.pledgeAmount = CurrencyAmount.fromRawAmount(TgnToken, pledgeAmount)
  userInfo.value.withdrawAmount = CurrencyAmount.fromRawAmount(TgnToken, withdrawAmount)
  userInfo.value.withdrawBalance = CurrencyAmount.fromRawAmount(TgnToken, withdrawBalance)
  userInfo.value.lastWithdraTime = Number(lastWithdraTime)
}
async function _getqueryReleaseAmount() {
  const queryReleaseAmount = await getqueryReleaseAmount()
  userInfo.value.queryReleaseAmount = CurrencyAmount.fromRawAmount(
    TgnToken,
    (typeof queryReleaseAmount === 'bigint' || typeof queryReleaseAmount === 'number' || typeof queryReleaseAmount === 'string')
      ? queryReleaseAmount
      : 0n,
  )
}
async function _getlockEndTime() {
  const lockEndTime = await getlockEndTime()
  userInfo.value.lockEndTime = Number(lockEndTime)
}
async function _getwithdrawExtracIntervalTime() {
  const res = await getwithdrawExtracIntervalTime()
  userInfo.value.withdrawExtracIntervalTime = Number(res)
}
async function _getTgnPrice() {
  const tgnPrice = await getTgnPrice()
  userInfo.value.tgnPrice = CurrencyAmount.fromRawAmount(
    TgnToken,
    (typeof tgnPrice === 'bigint' || typeof tgnPrice === 'number' || typeof tgnPrice === 'string')
      ? tgnPrice
      : 0n,
  )
}
const isWithdrawTime = ref(false)
async function _getIsWithdrawTime() {
  const res = await getIsWithdrawTime()
  isWithdrawTime.value = Boolean(res)
}

const { blockNumber } = useAppBlockHooks()
watch(blockNumber, () => {
  _init()
}, { immediate: true })

function _init() {
  if (!address)
    return
  _getMapUserInfo()
  _getqueryReleaseAmount()
  _getlockEndTime()
  _getwithdrawExtracIntervalTime()
  _getTgnPrice()
  _get_usdt_balance()
  _getIsWithdrawTime()
}

// 提现
const txLoading = ref(false)
const { withdraw } = useWithdraw()
async function _withdraw() {
  txLoading.value = true
  await withdraw({
    onError: () => {
      txLoading.value = false
      // 错误处理
      window.$Toast.show(t('提现失败'))
    },
    onStop: () => {
      txLoading.value = false
    },
    onSuccess: () => {
      // 成功处理
      txLoading.value = false
      window.$Toast.show(t('提现成功'))
    },
  })
}

// 认购
const { getAllowance } = useGetAllowance()
const buyLoading = ref(false)
async function buy() {
  if (!value.value || value.value <= 0) {
    window.$Toast.show(t('请输入认购数量'))
    return
  }
  if (value.value > userInfo.value.usdtBalance) {
    window.$Toast.show(t('余额不足'))
    return
  }
  if (!address)
    return
  const num = await getAllowance(REWARD_TOKEN_ADDRESS, PLEDGE_ADDRESS)
  const allowanceNum = Number(CurrencyAmount.fromRawAmount(RewardToken, (typeof num === 'bigint' || typeof num === 'number' || typeof num === 'string') ? num : 0n).toSignificant(6))
  console.log('allowanceNum', allowanceNum, value.value)
  if (allowanceNum < value.value) {
    handleApprove()
    return
  }
  buyLoading.value = true
  _subscribe()
}

// 授权
const approveLoading = ref(false)
const { approve } = useApprove()
async function handleApprove() {
  approveLoading.value = true
  approve(
    { tokenAddress: REWARD_TOKEN_ADDRESS, constantsAddress: PLEDGE_ADDRESS }
    , {
      onSuccess: () => {
        window.$NaiveMessage.success(t('授权成功'), {
          showIcon: false,
        })
        approveLoading.value = false
        _subscribe()
      },
      onError: () => {
        approveLoading.value = false
        window.$NaiveMessage.error(t('授权失败，请重新授权额度'), {
          showIcon: false,
        })
      },
      onStop: () => {
      },
    },
  )
}

// 认购方法
const { subscription } = useSubscription()
async function _subscribe() {
  buyLoading.value = true
  await subscription({
    usdt: value.value ?? 0,
  }, {
    onError: () => {
      buyLoading.value = false
      // 错误处理
      window.$Toast.show(t('认购失败'))
    },
    onStop: () => {
      buyLoading.value = false
    },
    onSuccess: () => {
      // 成功处理
      buyLoading.value = false
      window.$Toast.show(t('认购成功'))
      value.value = null
      toU.value = 0
    },
  })
}

function max() {
  if (!address)
    return
  value.value = userInfo.value.usdtBalance
  toUSDT()
}
function toUSDT() {
  if (value.value === null || value.value === undefined || value.value === 0) {
    toU.value = 0
    return
  }
  const res = Calc.Div(value.value, userInfo.value.tgnPrice?.toSignificant(6))
  toU.value = res

  // 计算获得的TGN数量
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
        <div class="mx-auto mt-[-80px] max-w-[480px] pt-[80px] md:mt-0 lg:pb-20px">
          <n-image width="100%" :src="bg" preview-disabled />
          <!-- <div class="h-[140px] w-[100%]" /> -->
          <div class="flex flex-1 flex-col bg-#fff px-[20px]">
            <div
              class="relative mt-[-90px] h-[100px] flex items-center rounded-xl px-[20px]" style="background: linear-gradient(135deg, rgba(255,255,255,0) 0%, #FFF3C5 29%), #fef6d5;"
            >
              <div class="flex flex-col">
                <span class="mt-12px text-[18px] text-[#666666]">{{ $t('私募锁仓数量（TGN）') }}</span>
                <div class="">
                  <span class="text-[30px] text-[#FFA600] font-bold">
                    {{
                      userInfo.pledgeAmount?.toSignificant(6)
                    }}
                  </span>
                  <!-- <span class="text-[20px] font-bold text-[#FFA600]"> USDT </span> -->
                </div>
              </div>
            </div>
            <div class="box w-full py-[20px]">
              <div class="flex items-center">
                <div class="flex flex-1 flex-col items-center justify-center">
                  <div class="flex items-center">
                    <n-image width="20px" :src="usdt" preview-disabled />
                    <span class="ml-4px text-[#999]">{{ $t('锁仓价值($)') }}</span>
                  </div>
                  <span class="mt-[4px] text-[20px] text-[#000] font-bold">
                    {{
                      userInfo.pledgeAmount
                        ? Calc.Mul(userInfo.pledgeAmount?.toSignificant(6), userInfo.tgnPrice?.toSignificant(6)) : 0
                    }}
                  </span>
                </div>
                <div class="h-[38px] w-[1px] bg-[#E0E0E0]" />
                <div class="flex flex-1 flex-col items-center justify-center">
                  <div class="flex items-center">
                    <n-image width="20px" :src="tgn" preview-disabled />
                    <span class="ml-4px text-[#999]">{{ $t('待提现(TGN)') }}</span>
                  </div>
                  <span class="mt-[4px] text-[20px] text-primary font-bold">
                    {{ userInfo.queryReleaseAmount
                      ? Calc.Mul(
                        userInfo.queryReleaseAmount.toSignificant(6),
                        1,
                      )
                      : 0
                    }}
                  </span>
                </div>
              </div>
              <div class="mt-[4px] flex items-center justify-between px-[20px]">
                <div class="flex flex-col items-center justify-center">
                  <span class="text-[#999]">{{ $t('预计释放时间') }}</span>
                  <span
                    v-if="userInfo.lockEndTime > userInfo.lastWithdraTime"
                    class="mt-[4px] text-[14px] text-[#000]"
                  >
                    {{ timeFormat(Number(userInfo.lockEndTime) * 1000) }}
                  </span>
                  <span v-else class="mt-[4px] text-[16px] text-[#000]">
                    {{
                      timeFormat(
                        Calc.Add(
                          Number(userInfo.lastWithdraTime),
                          Number(userInfo.withdrawExtracIntervalTime),
                        ) * 1000,
                      )
                    }}
                  </span>
                </div>
                <n-button
                  :disabled="txLoading || userInfo?.queryReleaseAmount?.equalTo(0) || !isWithdrawTime"
                  :loading="txLoading"
                  type="primary"
                  color="#FFA600"
                  round
                  style="width: 116px"
                  @click="_withdraw"
                >
                  <span style="font-family: Noto Sans SC, Noto Sans SC;">{{ $t('提现') }}</span>
                </n-button>
              </div>
              <!--  -->
              <div
                class="relative mb-20px mt-10px border-1px border-[#FFA600] rounded-6px border-solid px-18px py-12px"
                style="font-family: Noto Sans SC, Noto Sans SC;"
              >
                <div class="flex items-center">
                  <n-image width="30px" :src="tgn" preview-disabled />
                  <span class="ml-6px text-20px font-500">TGN</span>
                </div>
                <!--  -->
                <div class="mt-10px">
                  <span class="text-[16px] text-[#666]">{{ $t('价格') }}</span>
                </div>
                <div class="mt-[-10px] flex items-center justify-between">
                  <span class="text-24px text-[#FFA600] font-bold">{{ userInfo.tgnPrice?.toSignificant(6) }}</span>
                  <span class="text-[16px] text-[#666]">USD</span>
                </div>
                <!--  -->
                <div class="my-4px flex justify-between">
                  <span class="text-[16px] text-[#666]">USDT</span>
                  <span class="text-[12px] text-[#666]" style="font-family: Roboto;">balance: {{ userInfo.usdtBalance || 0 }}</span>
                </div>
                <n-input-number
                  v-model:value="value"
                  :show-button="false"
                  :bordered="false"
                  style="border: none;"
                  clearable placeholder="Please enter the quantity" class="flex-1"
                  @input="toUSDT"
                  @clear="toU = 0"
                >
                  <template #suffix>
                    <span @click="max">MAX</span>
                  </template>
                </n-input-number>
                <!--  -->
                <div class="mt-10px">
                  <span class="text-[14px] text-[#666]">{{ $t('获得') }}</span>
                </div>
                <div class="mt-[-10px] flex items-center justify-between">
                  <span class="text-24px text-[#000] font-bold">{{ toU }}</span>
                  <span class="text-[16px] text-[#666]">TGN</span>
                </div>
                <!--  -->
                <div class="absolute z-99" style="bottom: -16px; left: 50%; margin-left: -58px;">
                  <n-button
                    :loading="buyLoading"
                    type="primary"
                    color="#FFA600"
                    round
                    style="width: 116px"
                    @click="buy"
                  >
                    <span>{{ $t('认购') }}</span>
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
  /* height: calc(100vh - 30px); */
  background-image: url('/src/assets/img/lockBg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover;
}
.dot {
  margin: auto;
  width: 10px;
  height: 10px;
  background-color: #ffa600;
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
  background: #ffa600;
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
