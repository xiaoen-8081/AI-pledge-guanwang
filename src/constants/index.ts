import type { Address } from 'viem'

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
