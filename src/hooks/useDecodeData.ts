import { decodeFunctionData } from 'viem'
import type { Abi, Hex } from 'viem'

export function useDecodeHexInfo(abi: Abi | undefined, data: Hex | undefined) {
  const funName = ref<string | undefined>(undefined)
  const arg = ref<unknown[] | undefined>(undefined)
  try {
    if (abi && data) {
      const { functionName, args = [] } = decodeFunctionData({
        abi,
        data,
      })
      arg.value = [...args]
      funName.value = functionName
    }
  }
  catch (error) {
    console.log(error)
  }
  return [funName, arg] as const
}
