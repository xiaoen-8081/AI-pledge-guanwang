import type { Currency, CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import type { Address, Hex } from 'viem'

import type { RefOrComputedRef } from '@/constants/types'

import { MaxUint256 } from '@pancakeswap/swap-sdk-core'
import { useAccount } from '@wagmi/vue'
import { getContract } from 'viem'

import { erc20Abi } from '@/constants/abi/erc20'
import {
  useHasPendingApproval,
  useTransactionAdder,
} from '@/stores/transactions/hooks'
import { calculateGasMargin } from '@/utils'
import { getWagmiError } from '@/utils/foramrtWagmiError'

import { useWalletClient } from './useClient'
import useTokenAllowance from './useTokenAllowance'

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove: RefOrComputedRef<
    CurrencyAmount<Currency> | null | undefined
  >,
  spender: RefOrComputedRef<string | undefined>,
) {
  const { address: account } = useAccount()
  const token = computed(() => {
    return amountToApprove.value?.currency.isToken
      ? amountToApprove.value.currency
      : undefined
  })
  console.log(token, account, spender, 'useApproveCallback')

  const [allowance] = useTokenAllowance(token, account, spender)

  const tokenAddress = computed(() => token.value?.address)
  const pendingApproval = useHasPendingApproval(tokenAddress, spender)
  const isloaidng = ref(false)
  const approvalState = computed(() => {
    console.warn('pendingApproval', pendingApproval.value)
    console.warn('currentAllowance', allowance.value?.toSignificant(6))
    if (isloaidng.value)
      return ApprovalState.PENDING
    console.log(1)
    if (!amountToApprove.value || !spender.value)
      return ApprovalState.UNKNOWN
    console.log(2)
    if (amountToApprove.value.currency?.isNative)
      return ApprovalState.APPROVED
    console.log(3)
    if (!allowance.value)
      return ApprovalState.UNKNOWN
    console.log(4)
    const flg = allowance.value.lessThan(amountToApprove.value)
      ? pendingApproval.value
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
    return flg
  })
  const addTransaction = useTransactionAdder()

  const approve = async () => {
    if (approvalState.value !== ApprovalState.NOT_APPROVED) {
      window.$NaiveMessage.error('Approve was called unnecessarily', {
        showIcon: false,
      })
      console.error('approve was called unnecessarily')
      return undefined
    }
    if (!token.value) {
      window.$NaiveMessage.warning('No token', { showIcon: false })
      console.error('no token')
      return undefined
    }
    if (!amountToApprove.value) {
      window.$NaiveMessage.warning('Missing amount to approve', {
        showIcon: false,
      })
      console.error('missing amount to approve')
      return undefined
    }
    if (!spender.value) {
      window.$NaiveMessage.warning('No spender', { showIcon: false })
      console.error('no spender')
      return undefined
    }

    const client = await useWalletClient(account.value as Address)
    const tokenContract = getContract({
      address: token.value.address,
      abi: erc20Abi,
      client,
    })
    if (!tokenContract) {
      // window.$NaiveMessage.warning(
      //  t('没有找到此合约', {
      //     tokenAddress: token.value.address,
      //   }),
      // );
      console.error('tokenContract is null')
      return undefined
    }
    let useExact = false
    isloaidng.value = true
    // const estimatedGas = await tokenContract.estimateGas
    const estimatedGas = await tokenContract.estimateGas
      .approve?.([spender.value as Address, MaxUint256])
      .catch(() => {
        useExact = true
        return tokenContract.estimateGas
          .approve?.([
            spender.value as Address,
            amountToApprove.value?.quotient as bigint,
          ])
          .catch(() => {
            console.error('estimate gas failure')
            // window.$Toast.show(
            //   t('交易估算gas失败'),
            // );
            isloaidng.value = false
            return null
          })
      })
    if (!estimatedGas) {
      isloaidng.value = false
      return undefined
    }

    return tokenContract.write
      .approve?.(
        [
          spender.value as Address,
          useExact ? (amountToApprove.value?.quotient as bigint) : MaxUint256,
        ],
        { gas: calculateGasMargin(estimatedGas) },
      )
      .then((response: Hex) => {
        addTransaction(response, {
          // summary: $t('Approve symbol', {
          //   asymbol: amountToApprove.value?.currency.symbol,
          // }),
          summary: 'asdasdasd',
          approval: {
            tokenAddress: token.value?.address as string,
            spender: spender.value as string,
          },
        })
        return response
      })
      .catch((error) => {
        const { message } = getWagmiError(error)
        console.error('Failed to approve token:', error)
        if (message) {
          window.$NaiveMessage.error(message, { showIcon: false })
        }
        throw error
      })
      .finally(() => {
        setTimeout(() => {
          isloaidng.value = false
        }, 2000)
      })
  }

  // watch(
  //   [token, account, spender, approvalState],
  //   (newVal) => {
  //     // console.log('useApproveCallback token', newVal);
  //   },
  //   { immediate: true },
  // );

  return [approvalState, approve] as const
}
