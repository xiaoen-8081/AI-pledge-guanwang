/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
function addLight(color: string, amount: number) {
  const cc = Number.parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export function colorLighten(color: string, amount: number) {
  color = color.includes('#') ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount,
  )}${addLight(color.substring(4, 6), amount)}`
}

export function colorHassToRgba(color: string, alpha: number = 1) {
  // 移除hash中的'#'字符（如果有）
  const hash = color.replace('#', '')
  // 解析红、绿、蓝的值
  const r = Number.parseInt(hash.substring(0, 2), 16)
  const g = Number.parseInt(hash.substring(2, 4), 16)
  const b = Number.parseInt(hash.substring(4, 6), 16)
  // 返回RGBA字符串
  return `rgba(${r}, ${g}, ${b}, ${alpha > 1 ? 1 : alpha})`
}
