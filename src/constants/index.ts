import type { Address } from 'viem'
import { ERC20Token } from '@pancakeswap/swap-sdk-evm'

// default allowed slippage, in bips 滑点
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds // 时间
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20
// 交易gas 默认
export const DEFAULT_TTRANS_GAS = 0

// 正式
// export const POOR_ADDRESS = '0x75B6Df202E94661604863B323E6C69872Ae43761'
// 测试  // 0x9B8F6337Adc49A7e7790C10EA1670c8acB349B8F 0x8bbffB438Bcc160A7D0a10765E941Ffd625eB897
export const POOR_ADDRESS: Address = '0x34576aA4a93824d4DAEe876AD72b44cad6448DcD'

// ------------------------------------------------------
// 合约地址
export const PLEDGE_ADDRESS: Address
  = '0xC8f9058558EA46A713040D0015d963D8884A8fAc' // 测试
  // = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff' // 测试
// swap合约地址
export const SWAP_ADDRESS: Address
  = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff' // 测试
// 代币
export const REWARD_TOKEN_ADDRESS: Address
  = '0x0ed9d9Cc5e2E0219E689f14411959fcfD9D6e6fD' // 测试
export const RewardToken = new ERC20Token(
  137,
  REWARD_TOKEN_ADDRESS,
  18,
  'USDT',
  'USDT Token',
)
