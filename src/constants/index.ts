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
// 锁仓合约地址
export const PLEDGE_ADDRESS: Address
// = '0xC8f9058558EA46A713040D0015d963D8884A8fAc' // 测试
= '0x2F6Eea9EDd9D791e4C1542F83Ad4D1B52b8709E0' // 测试
// swap合约地址
export const SWAP_ADDRESS: Address
  = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff' // 测试
// 代币TGN地址
export const TGN_ADDRESS: Address
  // = '0x68aef8d07D175B5eEF8fad2D6d6e9F2cDE68AA6f' // 测试
  = '0xaE0F1142c0a87c5b46632DAfBA057Ab0C852f2ba' // 正式
// 锁仓代币USDT地址
export const REWARD_TOKEN_ADDRESS: Address
  = '0xdf745Ce4513f1B6b5AdC07A82F76253377f70c9e' // 测试
  // = '0xC2132D05D31C914A87C6611C10748AEB04B58E8F' // 测试
export const RewardToken = new ERC20Token(
  137,
  REWARD_TOKEN_ADDRESS,
  6,
  'USDT',
  'USDT Token',
)
export const TgnToken = new ERC20Token(
  137,
  TGN_ADDRESS,
  18,
  'TGN',
  'TGN Token',
)
