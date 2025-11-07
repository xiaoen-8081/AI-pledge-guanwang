import type { Token } from '@pancakeswap/swap-sdk-core'

import type { RefOrComputedRef } from '@/constants/types'

import { CurrencyAmount } from '@pancakeswap/swap-sdk-core'

import { ERC20_INTERFACE } from '@/constants/abi/erc20'
import { useSingleCallResult } from '@/stores/multicall/hooks'

function useTokenAllowance(
  token: RefOrComputedRef<Token | undefined>,
  owner: RefOrComputedRef<string | undefined>,
  spender?: RefOrComputedRef<string | undefined>,
): [ComputedRef<CurrencyAmount<Token> | undefined>, ComputedRef<boolean>] {
  const address = computed(() => token.value?.address)

  const inputs = computed(() => [owner.value, spender?.value])
  const allowanceRes = useSingleCallResult<bigint>(
    address,
    ERC20_INTERFACE,
    'allowance',
    inputs,
  )

  const allowance = computed(() => {
    // console.log('allowanceRes', allowanceRes.value?.result)
    if (!token.value || !allowanceRes.value.result)
      return undefined
    return CurrencyAmount.fromRawAmount(
      token.value,
      allowanceRes.value.result[0] || 0n,
    )
  })
  const loading = computed(() => {
    return allowanceRes.value.loading
  })
  // watch([allowanceRes, allowance], () => {
  //   console.log(`allowance ${address.value}`, allowance.value)
  // }, { immediate: true })
  return [allowance, loading]
}

export default useTokenAllowance
