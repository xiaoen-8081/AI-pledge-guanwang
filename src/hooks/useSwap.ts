import type { Hash } from 'viem'
import { ERC20Token } from '@pancakeswap/swap-sdk-evm'
import to from 'await-to-js'

import { CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import { readContract } from '@wagmi/core'
import { useAccount } from '@wagmi/vue'

import { RewardToken, SWAP_ADDRESS } from '@/constants'
import { PLEDGE_INTERFACE, pledgeAbi } from '@/constants/abi/pledge'
import { swapAbi } from '@/constants/abi/swap'
import { erc20Abi } from '@/constants/abi/erc20'
import { useSingleCallResult } from '@/stores/multicall/hooks'
import { wagmiConfig } from '@/utils/wagmi'
import { getTransactionsResFinally } from '@/hooks/useTransRes'

export interface tokenParams {
  address1: string
  address2: string
  decimals1: number
  decimals2: number
  amountIn: bigint
}
// 基本信息
export function useBaseInfo() {
  const { address: account } = useAccount()
  const tokenAddress = computed(() => SWAP_ADDRESS)
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
      address: SWAP_ADDRESS,
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
      address: SWAP_ADDRESS,
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

// 查询某个币余额
export function useTokenBalance() {
  const { address: account } = useAccount()

  const getTokenBalance = async (tokenAddress: `0x${string}`, decimals: number) => {
    const CurrentToken = new ERC20Token(
      137,
      tokenAddress,
      decimals,
      'USDT',
      'USDT Token',
    )
    if (!account.value) {
      window.$Toast.show('请连接钱包')
      return
    }
    const balanceRes = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'balanceOf',
      args: [account.value],
    })
    return CurrencyAmount.fromRawAmount(CurrentToken, Number(balanceRes)).toSignificant(18)
  }
  return { getTokenBalance } as const
}

//
export function useGetAmountsOut() {
  const { address: account } = useAccount()

  const getAmountsOut = async (options: tokenParams) => {
    const CurrentToken1 = new ERC20Token(
      137,
      options.address1 as `0x${string}`,
      options.decimals1,
      'USDT',
      'USDT Token',
    )
    const CurrentToken2 = new ERC20Token(
      137,
      options.address1 as `0x${string}`,
      options.decimals2,
      'USDT',
      'USDT Token',
    )
    if (!account.value) {
      window.$Toast.show('请连接钱包')
      return
    }
    const res: any = await readContract(wagmiConfig, {
      abi: swapAbi,
      address: SWAP_ADDRESS,
      functionName: 'getAmountsOut',
      args: [options.amountIn, [options.address1, options.address2]],
    })
    const obj = {
      amountIn: CurrencyAmount.fromRawAmount(CurrentToken1, BigInt(res[0] as number)).toSignificant(18),
      amountOut: CurrencyAmount.fromRawAmount(CurrentToken2, BigInt(res[1] as number)).toSignificant(18),
    }
    return obj
  }
  return { getAmountsOut } as const
}
