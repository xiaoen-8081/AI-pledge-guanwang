// import { openWindow } from '@vben/utils'

// add 10%
export function calculateGasMargin(value: bigint, margin = 1000): bigint {
  const multiplier = BigInt(10_000 + margin) // 计算 10000 + margin
  return (value * multiplier) / BigInt(10_000) // 计算带 margin 的值
}

// export function linkToOpenSea(contractAddress: string, tokenId: number) {
//   const url = 'https://opensea.io/assets/matic'
//   openWindow(`${url}/${contractAddress}/${tokenId}`)
// }
