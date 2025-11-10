import type { Hash } from 'viem'
import { parseUnits } from 'viem'

import to from 'await-to-js'

import { CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import { readContract } from '@wagmi/core'
import { useAccount } from '@wagmi/vue'

import { PLEDGE_ADDRESS, RewardToken } from '@/constants'
import { PLEDGE_INTERFACE, pledgeAbi } from '@/constants/abi/pledge'
import { useSingleCallResult } from '@/stores/multicall/hooks'
import { wagmiConfig } from '@/utils/wagmi'
import { getTransactionsResFinally } from '@/hooks/useTransRes'

export interface TaskListParams {
  address: string
  quantity: number
}
// 基本信息
export function useBaseInfo() {
  const { address: account } = useAccount()
  const tokenAddress = computed(() => PLEDGE_ADDRESS)
  const args = computed(() => {
    return [account.value]
  })

  // 查看资金池余额
  const balanceRes = useSingleCallResult<bigint>(
    tokenAddress,
    PLEDGE_INTERFACE,
    'mapUserInfo',
    args,
  )
  // 待提现
  const queryReleaseAmountRes = useSingleCallResult<bigint>(
    tokenAddress,
    PLEDGE_INTERFACE,
    'queryReleaseAmount',
    args,
  )
  //
  const lockEndTimeRes = useSingleCallResult<bigint>(
    tokenAddress,
    PLEDGE_INTERFACE,
    'lockEndTime',
    undefined,
  )
  const withdrawExtracIntervalTimeRes = useSingleCallResult<bigint>(
    tokenAddress,
    PLEDGE_INTERFACE,
    'withdrawExtracIntervalTime',
    undefined,
  )

  const userBaseInfo = computed(() => {
    // console.log(balanceRes.value, 'balanceRes.value')

    const [
      pledgeAmount = 0n,
      withdrawAmount = 0n,
      withdrawBalance = 0n,
      lastWithdraTime = 0n,
    ] = balanceRes.value.result || []
    const [queryReleaseAmount = 0n] = queryReleaseAmountRes.value.result || []
    const [lockEndTime = 0n] = lockEndTimeRes.value.result || []
    const [withdrawExtracIntervalTime = 0n]
      = withdrawExtracIntervalTimeRes.value.result || []

    return {
      pledgeAmount: CurrencyAmount.fromRawAmount(RewardToken, pledgeAmount),
      withdrawAmount: CurrencyAmount.fromRawAmount(RewardToken, withdrawAmount),
      withdrawBalance: CurrencyAmount.fromRawAmount(
        RewardToken,
        withdrawBalance,
      ),
      lastWithdraTime: Number(lastWithdraTime),
      //
      queryReleaseAmount: CurrencyAmount.fromRawAmount(
        RewardToken,
        queryReleaseAmount,
      ),
      //
      lockEndTime: Number(lockEndTime),
      withdrawExtracIntervalTime: Number(withdrawExtracIntervalTime),
    }
  })

  const isLoading = computed(() => balanceRes.value.loading)
  return {
    userBaseInfo,
    isLoading,
  } as const
}

// 提现
export function useWithdraw() {
  const { writeContractCallBack } = wagmiWriteContract()
  const txHash: any = ref('')
  const { address: account } = useAccount()

  const withdraw = async (op?: {
    onError?: () => void
    onStop?: () => void
    onSuccess?: () => void
  }) => {
    const args = {
      abi: pledgeAbi,
      account: account.value,
      address: PLEDGE_ADDRESS,
      functionName: 'withdraw',
      args: [],
    }
    if (!account.value) {
      window.$Toast.show('请连接钱包')
      op?.onStop?.()
      return
    }
    const isWithdrawTimeRes = await readContract(wagmiConfig, {
      abi: pledgeAbi,
      address: PLEDGE_ADDRESS,
      functionName: 'isWithdrawTime',
      args: [account.value],
    })
    console.log(isWithdrawTimeRes, 'isWithdrawTimeRes')

    if (!isWithdrawTimeRes) {
      window.$Toast.show('领取时间间隔未到')
      op?.onStop?.()
      return
    }

    const [err, res] = await to(writeContractCallBack(args))
    if (err) {
      op?.onStop?.()
      throw err
    }
    txHash.value = res

    const [err1, res1] = await to(
      getTransactionsResFinally(txHash.value as Hash),
    )
    if (err1) {
      op?.onError?.()
      throw err1
    }
    if (res1.status === 'success') {
      op?.onSuccess?.()
    }
    else {
      op?.onError?.()
    }
  }
  return { withdraw } as const
}

// 查看资金池余额
export function useMapUserInfo() {
  const { address: account } = useAccount()

  const getMapUserInfo = async () => {
    if (!account.value) {
      // window.$Toast.show('请连接钱包')
      return
    }
    const res = await readContract(wagmiConfig, {
      abi: pledgeAbi,
      address: PLEDGE_ADDRESS,
      functionName: 'mapUserInfo',
      args: [account.value],
    })
    return res
  }
  //
  const getqueryReleaseAmount = async () => {
    if (!account.value) {
      // window.$Toast.show('请连接钱包')
      return
    }
    const res = await readContract(wagmiConfig, {
      abi: pledgeAbi,
      address: PLEDGE_ADDRESS,
      functionName: 'queryReleaseAmount',
      args: [account.value],
    })
    return res
  }
  //
  const getlockEndTime = async () => {
    if (!account.value) {
      // window.$Toast.show('请连接钱包')
      return
    }
    const res = await readContract(wagmiConfig, {
      abi: pledgeAbi,
      address: PLEDGE_ADDRESS,
      functionName: 'lockEndTime',
      args: [],
    })
    return res
  }
  //
  const getwithdrawExtracIntervalTime = async () => {
    if (!account.value) {
      // window.$Toast.show('请连接钱包')
      return
    }
    const res = await readContract(wagmiConfig, {
      abi: pledgeAbi,
      address: PLEDGE_ADDRESS,
      functionName: 'withdrawExtracIntervalTime',
      args: [],
    })
    return res
  }
  //
  const getTgnPrice = async () => {
    if (!account.value)
      return
    const res = await readContract(wagmiConfig, {
      abi: pledgeAbi,
      address: PLEDGE_ADDRESS,
      functionName: 'tgnPrice',
      args: [],
    })
    return res
  }
  return { getMapUserInfo, getqueryReleaseAmount, getlockEndTime, getwithdrawExtracIntervalTime, getTgnPrice } as const
}

// 认购
export function useSubscription() {
  const { writeContractCallBack } = wagmiWriteContract()
  const txHash: any = ref('')
  const { address: account } = useAccount()

  const subscription = async (options: { usdt: number }, op?: {
    onError?: () => void
    onStop?: () => void
    onSuccess?: () => void
  }) => {
    const args = {
      abi: pledgeAbi,
      account: account.value,
      address: PLEDGE_ADDRESS,
      functionName: 'subscription',
      args: [BigInt(parseUnits(options.usdt.toString(), 6))],
    }
    if (!account.value) {
      window.$Toast.show('请连接钱包')
      op?.onStop?.()
      return
    }
    const [err, res] = await to(writeContractCallBack(args))
    if (err) {
      op?.onStop?.()
      throw err
    }
    txHash.value = res

    const [err1, res1] = await to(
      getTransactionsResFinally(txHash.value as Hash),
    )
    if (err1) {
      op?.onError?.()
      throw err1
    }
    if (res1.status === 'success') {
      op?.onSuccess?.()
    }
    else {
      op?.onError?.()
    }
  }
  return { subscription } as const
}
