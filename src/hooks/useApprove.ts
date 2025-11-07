import type { Currency, CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import type { Address, Hash } from 'viem'
import { MaxUint256 } from '@pancakeswap/swap-sdk-core'

import type { RefOrComputedRef } from '@/constants/types'

import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { useAccount } from '@wagmi/vue'
import { erc20Abi } from 'viem'

import { wagmiConfig } from '@/utils/wagmi'
import { PLEDGE_ADDRESS, REWARD_TOKEN_ADDRESS } from '@/constants'

export interface AddTaskParams {
  taskName: string
  taskType: string
  taskTypeName: string
  taskDescribe: string
  taskDescribeImage: string
  taskId?: number
  taskStock: number
  userLevelArr: number[]
  rewardAmount: number
  taskStartTime: number
  taskEndTime: number
  taskOpen: boolean
  describeUrl: string
}

export interface TaskListParams {
  flg: boolean
  pageNum: number
  pageSize: number
}

export function useGetAllowance() {
  const { address: account } = useAccount()
  // 获取代币的授权额度
  const loading = ref(false)
  async function getAllowance(
    tokenAddress: Address,
    spender: Address | undefined,
  ) {
    if (!account.value || !spender) {
      window.$NaiveMessage.error('钱包地址或授权地址不能为空')
      throw new Error('钱包地址或授权地址不能为空')
    }
    try {
      loading.value = true
      const res = await readContract(wagmiConfig, {
        abi: erc20Abi,
        address: tokenAddress,
        functionName: 'allowance',
        args: [account.value, spender],
      })
      console.warn('getAllowance', res)
      loading.value = false
      return res
    }
    catch {
      loading.value = false
      return false
    }
  }

  return {
    loading,
    getAllowance,
  }
}

// 授权回掉
export function useApproveCall(
  amountToApprove: RefOrComputedRef<
    CurrencyAmount<Currency> | null | undefined
  >,
  spender: RefOrComputedRef<string | undefined>,
) {
  console.log(amountToApprove, spender, 'useApproveCall')

  const [_, callBack] = useApproveCallback(amountToApprove, spender)

  const loading = ref(false)
  const approve = async (op?: {
    onCancel?: () => void
    onError?: () => void
    onSuccess?: () => void
  }) => {
    loading.value = true
    const res = await callBack().catch(() => {
      op?.onCancel?.()
    })
    // console.log('callBack', res);

    const res1 = await waitForTransactionReceipt(wagmiConfig, {
      hash: res as Hash,
    })
    // console.log('Transaction successful:', res1);
    if (res1.status === 'success') {
      op?.onSuccess?.()
    }
    if (res1.status === 'reverted') {
      op?.onError?.()
    }
  }
  return { approve } as const
}

// 授权
export function useApprove() {
  const { writeContractCallBack } = wagmiWriteContract()
  const txHash: any = ref('')
  const { address: account } = useAccount()

  const approve = async (op?: {
    onError?: () => void
    onStop?: () => void
    onSuccess?: () => void
  }) => {
    const args = {
      abi: erc20Abi,
      account: account.value,
      address: REWARD_TOKEN_ADDRESS,
      functionName: 'approve',
      args: [PLEDGE_ADDRESS, MaxUint256],
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
  return { approve } as const
}
