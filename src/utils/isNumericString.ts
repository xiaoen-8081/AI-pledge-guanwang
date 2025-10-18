export function isNumericString(str: string): boolean {
  const trimmed = str.trim()
  if (trimmed === '')
    return false
  const regex = /^\d+$/
  return regex.test(trimmed)
}
