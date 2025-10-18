export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) {
    // null 或 undefined
    return false
  }

  if (typeof value === 'string' && value.trim() === '') {
    // 空字符串
    return false
  }
  return true // 其他情况非空
}
