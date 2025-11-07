<script setup lang="ts">
import { useGetAmountsOut, useTokenBalance } from '@/hooks/useSwap'
import { useAccount } from '@wagmi/vue'
import { parseUnits } from 'viem'
import { useApprove, useApproveCall, useGetAllowance } from '@/hooks/useApprove'
import { PLEDGE_ADDRESS, RewardToken, SWAP_ADDRESS } from '@/constants'
// import tryParseAmount from '@/utils/tryParseAmount'
// import { ERC20Token } from '@pancakeswap/swap-sdk-evm'

// const pledgeAdd = computed(() => PLEDGE_ADDRESS)
const isAdd_Addr = ref(false)
const value1 = ref('1')
const value2 = ref('')
const allowanceNum = ref(0)
const isInput1 = ref(true)
const is_TgToU = ref(true)
const tgTokenAddress = ref('0x68aef8d07D175B5eEF8fad2D6d6e9F2cDE68AA6f')
const usdtTokenAddress = ref('0xc2132D05D31c914a87C6611C10748AEb04B58e8F')
const banance1 = ref('')
const banance2 = ref('')
// const parsedAmount = computed(() => {
//   console.log(tryParseAmount(value1.value, RewardToken ?? undefined), 'parsedAmount')
//   console.log(pledgeAdd.value, 'pledgeAdd')

//   return tryParseAmount(value1.value, RewardToken ?? undefined)
// })
// const { approve } = useApproveCall(parsedAmount, pledgeAdd)
const { approve } = useApprove()
const { getAllowance } = useGetAllowance()
const { getTokenBalance } = useTokenBalance()
const { getAmountsOut } = useGetAmountsOut()
const { address } = useAccount()

async function _getBalance(tokenAddress: `0x${string}`, type: number, decimals: number = 18) {
  if (!address.value)
    return
  const res = await getTokenBalance(tokenAddress, decimals)
  console.log('res', res)
  if (type === 1) {
    banance1.value = res ?? ''
  }
  else {
    banance2.value = res ?? ''
  }
}

function debounce(fn: (...args: any[]) => void, delay = 500) {
  let timer: null | ReturnType<typeof setTimeout> = null
  return function (this: any, ...args: any[]) {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
const _getAmountsOut = debounce(async () => {
  if (isInput1.value && !value1.value) {
    value2.value = ''
    return
  }
  allowanceNum.value = await _getAllowance((is_TgToU.value ? tgTokenAddress.value : usdtTokenAddress.value) as `0x${string}`)
  console.log(allowanceNum.value, 'allowanceNum')
  const res: any = await getAmountsOut({
    amountIn: BigInt(parseUnits(isInput1.value ? value1.value.toString() : value2.value.toString(), isInput1.value ? (is_TgToU.value ? 18 : 6) : (is_TgToU.value ? 6 : 18))),
    address1: isInput1.value ? (is_TgToU.value ? tgTokenAddress.value : usdtTokenAddress.value) : (is_TgToU.value ? usdtTokenAddress.value : tgTokenAddress.value),
    address2: isInput1.value ? (is_TgToU.value ? usdtTokenAddress.value : tgTokenAddress.value) : (is_TgToU.value ? tgTokenAddress.value : usdtTokenAddress.value),
    decimals1: isInput1.value ? (is_TgToU.value ? 18 : 6) : (is_TgToU.value ? 6 : 18),
    decimals2: isInput1.value ? (is_TgToU.value ? 6 : 18) : (is_TgToU.value ? 18 : 6),
  })
  console.log(isInput1.value)

  if (isInput1.value) {
    value2.value = res?.amountOut ?? ''
  }
  else {
    value1.value = res?.amountOut ?? ''
  }
  console.log(res, 'res')
})

//
function exchange() {
  is_TgToU.value = !is_TgToU.value
  value1.value = ''
  value2.value = ''
}

//
const toUSDT = ref(true)
const oneTG = ref('')
const oneUSDT = ref('')

async function _getOnePrice() {
  const res: any = await getAmountsOut({
    amountIn: BigInt(parseUnits('1', 18)),
    address1: tgTokenAddress.value,
    address2: usdtTokenAddress.value,
    decimals1: 18,
    decimals2: 6,
  })
  oneTG.value = res?.amountOut ?? ''

  const res2: any = await getAmountsOut({
    amountIn: BigInt(parseUnits('1', 6)),
    address1: usdtTokenAddress.value,
    address2: tgTokenAddress.value,
    decimals1: 6,
    decimals2: 18,
  })
  oneUSDT.value = res2?.amountOut ?? ''

  console.log(oneTG.value, oneUSDT.value, 'one price')
}

// 查授权
async function _getAllowance(tokenAddress: `0x${string}`) {
  const res = await getAllowance(tokenAddress, SWAP_ADDRESS)
  console.warn(res)
  return Number(res)
}

// 授权
const approveLoading = ref(false)
async function handleApprove() {
  approveLoading.value = true
  approve(
    { tokenAddress: is_TgToU.value ? tgTokenAddress.value : usdtTokenAddress.value }
    , {
      onSuccess: () => {
        window.$NaiveMessage.success(('授权成功'), {
          showIcon: false,
        })
        approveLoading.value = true
      },
      onError: () => {
        approveLoading.value = true
        window.$NaiveMessage.error(('授权失败，请重新授权额度'), {
          showIcon: false,
        })
      },
      onStop: () => {
      },
    },
  )
}

onMounted(() => {
  _getBalance('0x68aef8d07D175B5eEF8fad2D6d6e9F2cDE68AA6f', 1)
  _getBalance('0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 2, 6)
  _getOnePrice()
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
        <div class="mx-auto max-w-[480px] pb-[40px] pt-[80px]">
          <div class="relative w-full overflow-hidden rounded-20px bg-#fff p-20px pt-88px">
            <div class="absolute right-0 top-0 h-60px w-88px flex items-center justify-center rounded-bl-[30px] bg-[rgba(115,204,46,0.1)]">
              <span class="text-[20px] text-primary">V2</span>
            </div>
            <!--  -->
            <div class="w-full rounded-16 bg-#fafafa">
              <div class="rounded-16 bg-#fff p-20px" style="box-shadow: 0 10px 40px 0 rgba(21,55,156,.1);">
                <div class="flex items-center justify-between">
                  <span>支付</span>
                  <span>余额：{{ address ? is_TgToU ? banance1 : banance2 : '--' }}</span>
                </div>
                <div class="mt-10px flex items-center justify-between">
                  <n-input
                    v-model:value="value1"
                    style="border: none;"
                    clearable placeholder="请输入数量" class="flex-1"
                    @input="isInput1 = true, _getAmountsOut()"
                  />
                  <span class="flex-1 text-right text-[24px]">{{ is_TgToU ? 'TG' : 'USDT' }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between p-20px">
                <span>价格</span>
                <div class="flex items-center">
                  <span v-if="toUSDT" class="mr-4px">1 TG 兑换 {{ oneTG }} USDT </span>
                  <span v-else class="mr-4px">1 USDT 兑换 {{ oneUSDT }} USDT </span>
                  <div class="i-ri:exchange-line text-20 text-primary" @click="toUSDT = !toUSDT" />
                </div>
              </div>
            </div>
            <!--  -->
            <div class="flex items-center justify-between p-20px">
              <div class="i-material-symbols:arrow-downward text-20 text-primary" @click="exchange" />
              <span class="text-primary">
                高级设置
              </span>
            </div>
            <div class="rounded-16 bg-#fff p-20px" style="box-shadow: 0 10px 40px 0 rgba(21,55,156,.1);">
              <div class="flex items-center justify-between">
                <span>兑换成（约）</span>
                <span>余额：{{ address ? !is_TgToU ? banance1 : banance2 : '--' }}</span>
              </div>
              <div class="mt-10px flex items-center justify-between">
                <n-input
                  v-model:value="value2"
                  style="border: none;"
                  clearable placeholder="请输入数量" class="flex-1"
                  @input="isInput1 = false, _getAmountsOut()"
                />
                <span class="flex-1 text-right text-[24px]">{{ !is_TgToU ? 'TG' : 'USDT' }}</span>
              </div>
            </div>
            <!--  -->
            <div class="flex items-center justify-between p-20px">
              <div v-if="isAdd_Addr" class="i-material-symbols:arrow-downward text-20 text-primary" />
              <div v-else />
              <div class="flex cursor-pointer items-center">
                <div class="text-14" :class="isAdd_Addr ? 'i-material-symbols:check-indeterminate-small-rounded text-[#ff8e18]' : 'i-material-symbols:add  text-primary'" />
                <span :class="isAdd_Addr ? 'text-[#ff8e18]' : 'text-primary' " @click="isAdd_Addr = !isAdd_Addr">
                  {{ isAdd_Addr ? '移除接收方' : '添加接收方' }}
                </span>
              </div>
            </div>
            <div v-if="isAdd_Addr" class="rounded-16 bg-#fff p-20px" style="box-shadow: 0 10px 40px 0 rgba(21,55,156,.1);">
              <div class="flex items-center">
                <span>接收方</span>
              </div>
              <div class="mt-10px flex items-center">
                <n-input
                  v-model:value="value2"
                  style="border: none;" clearable placeholder="请输入钱包地址"
                  class="flex-1"
                />
              </div>
            </div>
            <!--  -->
            <div class="flex">
              <n-button
                v-if="value1 && allowanceNum < (isInput1 ? parseFloat(value1) : parseFloat(value2))"
                class="mr-10px flex-1"
                type="primary"
                style="height: 40px;border-radius: 12px;"
                @click="handleApprove"
              >
                <span class="text-[18px]"> Approve {{ is_TgToU ? 'TG' : 'USDT' }} </span>
              </n-button>
              <n-button
                :disabled="!allowanceNum || allowanceNum < (isInput1 ? parseFloat(value1) : parseFloat(value2))"
                class="flex-1"
                type="primary"
                style="height: 40px;border-radius: 12px;"
              >
                <span class="text-[18px]"> Swap </span>
              </n-button>
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
    "name": "Swap",
    "meta": {
      "activeMenu": "Swap",
      "title": "Swap"
    }
  }
  </route>

  <style scoped>
  .bg {
  width: 100vw;
  min-height: calc(100vh - 120px);
  background-image: url('/src/assets/img/lockBg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover;
}
</style>
