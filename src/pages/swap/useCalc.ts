/**
 * 通用 Swap 参数计算模块
 * 支持:
 * - swapExactTokensForTokens → 输出最小值 amountOutMin
 * - swapTokensForExactTokens → 输入最大值 amountInMax
 */

/**
 * 计算 swapExactTokensForTokens 的 amountOutMin
 * @param {number|string} amountIn 输入数量（无精度）
 * @param {number} feeRate 手续费率 (默认 0.003 = 0.3%)
 * @param {number} slippage 滑点比例 (默认 0.1 = 10%)
 * @returns {{ amountAfterFee: number, amountOutMin: number }}
 */
export function calcAmountOutMin(amountIn, feeRate = 0.003, slippage = 0.1) {
  const amountAfterFee = Number(amountIn) * (1 - feeRate)
  const amountOutMin = amountAfterFee * (1 - slippage)
  return {
    amountAfterFee: Number.parseFloat(amountAfterFee.toFixed(6)),
    amountOutMin: Number.parseFloat(amountOutMin.toFixed(6)),
  }
}

/**
 * 计算 swapTokensForExactTokens 的 amountInMax
 * @param {number|string} expectedAmountIn 预估输入数量
 * @param {number} slippage 滑点比例 (默认 0.1 = 10%)
 * @returns {number}
 */
export function calcAmountInMax(expectedAmountIn, slippage = 0.1) {
  const amountInMax = Number(expectedAmountIn) * (1 + slippage)
  return Number.parseFloat(amountInMax.toFixed(6))
}

/**
 * 一键通用计算
 * @param {'EXACT_IN'|'EXACT_OUT'} mode Swap 类型
 * @param {object} opts 参数对象
 */
export function calcSwapParams(mode, opts) {
  if (mode === 'EXACT_IN') {
    // 固定输入 => 计算 amountOutMin
    return calcAmountOutMin(opts.amountIn, opts.feeRate, opts.slippage)
  }
  else if (mode === 'EXACT_OUT') {
    // 固定输出 => 计算 amountInMax
    return { amountInMax: calcAmountInMax(opts.expectedAmountIn, opts.slippage) }
  }
  else {
    throw new Error('未知的 Swap 模式，请使用 EXACT_IN 或 EXACT_OUT')
  }
}
