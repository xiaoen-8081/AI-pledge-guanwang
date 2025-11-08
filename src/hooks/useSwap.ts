import type { Hash } from 'viem'
import { ERC20Token } from '@pancakeswap/swap-sdk-evm'
import to from 'await-to-js'

import { CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import { readContract } from '@wagmi/core'
import { useAccount } from '@wagmi/vue'

import { SWAP_ADDRESS } from '@/constants'
import { swapAbi } from '@/constants/abi/swap'
import { erc20Abi } from '@/constants/abi/erc20'
import { wagmiConfig } from '@/utils/wagmi'
import { getTransactionsResFinally } from '@/hooks/useTransRes'

export interface tokenParams {
  address1: string
  address2: string
  decimals1: number
  decimals2: number
  amountIn: bigint
}
export interface swapU {
  amountIn: bigint
  amountOutMin: string
  path: `0x${string}`[]
  to: string
  deadline: string
}
export interface swapTG {
  amountOut: bigint
  amountInMax: string
  path: `0x${string}`[]
  to: string
  deadline: string
}

// 兑换 TGN -> USDT
export function useSwapExactTokensForTokensSupportingFeeOnTransferTokens() {
  const { writeContractCallBack } = wagmiWriteContract()
  const txHash: any = ref('')
  const { address: account } = useAccount()

  const swapExactTokensForTokensSupportingFeeOnTransferTokens = async (options: swapU, op?: {
    onError?: () => void
    onStop?: () => void
    onSuccess?: () => void
  }) => {
    console.log(options)

    const args = {
      abi: swapAbi,
      account: account.value,
      address: SWAP_ADDRESS,
      functionName: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      args: [options.amountIn, BigInt(options.amountOutMin), options.path, options.to, BigInt(options.deadline)],
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
  return { swapExactTokensForTokensSupportingFeeOnTransferTokens } as const
}
// 兑换 USDT -> TGN
export function useSwapTokensForExactTokens() {
  const { writeContractCallBack } = wagmiWriteContract()
  const txHash: any = ref('')
  const { address: account } = useAccount()

  const swapTokensForExactTokens = async (options: swapTG, op?: {
    onError?: () => void
    onStop?: () => void
    onSuccess?: () => void
  }) => {
    const args = {
      abi: swapAbi,
      account: account.value,
      address: SWAP_ADDRESS,
      functionName: 'swapTokensForExactTokens',
      args: [options.amountOut, BigInt(options.amountInMax), options.path, options.to, BigInt(options.deadline)],
    }
    console.log(options)

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
  return { swapTokensForExactTokens } as const
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
