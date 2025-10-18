/* eslint-disable prefer-const */
/* eslint-disable prefer-rest-params */
/**
 * @param {string} valString 脱敏的值
 * @param {number} num 文字脱敏前后保留几位
 */
export function formatStringEncrypt(valString: string | `0x${string}` | undefined, num: number = 5, after: number = 5) {
  if (!valString)
    return
  let value = ''
  if (valString.length === 2) {
    value = `${valString.substr(0, 1)}*`
  }
  else if (valString.length > num * 2) {
    const char = '...'
    value = valString.substr(0, num) + char + valString.substr(-after, after)
  }
  else {
    value = valString
  }
  return value
}
/**
 * @description 格式化数值
 * @param {string} val 需要格式化输入框的值
 * @param {string} limitType 格式化类型 float ｜ int ｜ percent | ''
 * @param {number} decimals 浮点数保留几位小数
 */
export function numberFormat(val: string, limitType: string = 'float', decimals: number = 2) {
  if (!val)
    return ''
  let value: string
  if (limitType === 'float') {
    value = val
      .replace(/[^\d.]/g, '')
      .replace(/^0{2}$/g, '0')
      .replace(/^\./g, '') // 首0仅一个，且不能是.
      .replace(/(^0\d*)$/g, '0') // 防止 00121323
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.') // 小数点一个
      .replace(new RegExp(`^(\\d+)\\.(\\d{${decimals}}).*$`), '$1.$2') // 默认保留2位小数
  }
  else if (limitType === 'int') {
    value = val.replace(/\D/g, '').replace(/(^0\d*)$/g, '0') // 防止 00121323
  }
  else if (limitType === 'percent') {
    value = val
      .replace(/[^\d.]/g, '')
      .replace(/^0{2}$/g, '0')
      .replace(/^\./g, '') // 首0仅一个，且不能是.
      .replace(/(^0\d*)$/g, '0') // 防止 00121323
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.') // 小数点一个
      .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 保留2位小数
      .replace(/^[1-9]\d{2}$/, '100') // 数字超过100，赋值成最大值100
      .replace(/^100\d*.$/, '100') // 超过100之后不给再输入值
  }
  else {
    value = val
  }
  return value
}
/**
 * @description 格式化时间
 * @param {string | number} dateTime 需要格式化的时间戳
 * @param {string} formatStr 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
export function timeFormat(dateTime: string | number | undefined, formatStr: string = 'yyyy-mm-dd hh:MM:ss'): string {
  let date: Date
  // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date()
  }
  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
  else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
    date = new Date(Number(dateTime) * 1000)
  }
  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
  else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
    date = new Date(Number(dateTime))
  }
  // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
  // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
  else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
    date = new Date(dateTime.replace(/-/g, '/'))
  }
  // 其他都认为符合 RFC 2822 规范
  else {
    date = new Date(dateTime)
  }

  const timeSource = {
    y: date.getFullYear().toString(), // 年
    m: (date.getMonth() + 1).toString().padStart(2, '0'), // 月
    d: date.getDate().toString().padStart(2, '0'), // 日
    h: date.getHours().toString().padStart(2, '0'), // 时
    M: date.getMinutes().toString().padStart(2, '0'), // 分
    s: date.getSeconds().toString().padStart(2, '0'), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }

  for (const key in timeSource) {
    const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
    if (ret) {
      // 年可能只需展示两位
      const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
    }
  }

  return formatStr
}
/**
 * @description 进行延时，以达到可以简写代码的目的 比如: await sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise} 返回promise
 */
export const sleep = function sleep(value: number = 30): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, value)
  })
}
/**
 * @description 格式化加减乘除精度
 * @returns {number} 返回格式化后的字符串
 */
export const Calc = {
  /*
  函数，加法函数，用来得到精确的加法结果
  说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
  参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
  调用：Calc.Add(arg1,arg2,d)
  返回值：两数相加的结果
  */
  Add(arg1: string | number, arg2: string | number, d?: number | string) {
    arg1 = arg1.toString()
    arg2 = arg2.toString()
    const arg1Arr = arg1.split('.')
    const arg2Arr = arg2.split('.')
    const d1 = arg1Arr.length === 2 ? arg1Arr[1] : ''
    const d2 = arg2Arr.length === 2 ? arg2Arr[1] : ''
    const maxLen = Math.max(d1.length, d2.length)
    const m = 10 ** maxLen
    const result = Number(((Number(arg1) * m + Number(arg2) * m) / m).toFixed(maxLen))
    return typeof d === 'number' ? Number(result.toFixed(d)) : result
  },
  /*
  函数：减法函数，用来得到精确的减法结果
  说明：函数返回较为精确的减法结果。
  参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数
  调用：Calc.Sub(arg1,arg2)
  返回值：两数相减的结果
  */
  Sub(arg1: string | number, arg2: any) {
    return Calc.Add(arg1, -Number(arg2), arguments[2])
  },
  /*
  函数：乘法函数，用来得到精确的乘法结果
  说明：函数返回较为精确的乘法结果。
  参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
  调用：Calc.Mul(arg1,arg2)
  返回值：两数相乘的结果
  */
  Mul(arg1: { toString: () => any }, arg2: { toString: () => any }, d?: any) {
    const r1 = arg1.toString()
    const r2 = arg2.toString()
    let m: number
    let resultVal: number
    m = (r1.split('.')[1] ? r1.split('.')[1].length : 0) + (r2.split('.')[1] ? r2.split('.')[1].length : 0)
    resultVal = (Number(r1.replace('.', '')) * Number(r2.replace('.', ''))) / 10 ** m
    return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(Number.parseInt(d as unknown as string)))
  },
  /*
  函数：除法函数，用来得到精确的除法结果
  说明：函数返回较为精确的除法结果。
  参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
  调用：Calc.Div(arg1,arg2)
  返回值：arg1除于arg2的结果
  */
  Div(arg1: { toString: () => any }, arg2: { toString: () => any }, d?: any) {
    const r1 = arg1.toString()
    const r2 = arg2.toString()
    let m: number
    let resultVal: number
    m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) - (r1.split('.')[1] ? r1.split('.')[1].length : 0)
    resultVal = (Number(r1.replace('.', '')) / Number(r2.replace('.', ''))) * 10 ** m
    return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(Number.parseInt(d as unknown as string)))
  },
}
/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 */
export function deepClone(obj: object, cache = new WeakMap()): object {
  if (obj === null || typeof obj !== 'object')
    return obj
  if (cache.has(obj))
    return cache.get(obj)
  let clone: object
  if (obj instanceof Date) {
    clone = new Date(obj.getTime())
  }
  else if (obj instanceof RegExp) {
    clone = new RegExp(obj)
  }
  else if (obj instanceof Map) {
    clone = new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)]))
  }
  else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, value => deepClone(value, cache)))
  }
  else if (Array.isArray(obj)) {
    clone = obj.map(value => deepClone(value, cache))
  }
  else if (Object.prototype.toString.call(obj) === '[object Object]') {
    clone = Object.create(Object.getPrototypeOf(obj))
    cache.set(obj, clone)
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value, cache)
    }
  }
  else {
    clone = Object.assign({}, obj)
  }
  cache.set(obj, clone)
  return clone
}

/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object} 深度合并后的对象
 */
export function deepMerge(target: object = {}, source: object = {}): object {
  target = deepClone(target)
  if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null)
    return target
  const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target)
  for (const prop in source) {
    if (!Object.prototype.hasOwnProperty.call(source, prop))
      continue
    const sourceValue = source[prop]
    const targetValue = merged[prop]
    if (sourceValue instanceof Date) {
      merged[prop] = new Date(sourceValue)
    }
    else if (sourceValue instanceof RegExp) {
      merged[prop] = new RegExp(sourceValue)
    }
    else if (sourceValue instanceof Map) {
      merged[prop] = new Map(sourceValue)
    }
    else if (sourceValue instanceof Set) {
      merged[prop] = new Set(sourceValue)
    }
    else if (typeof sourceValue === 'object' && sourceValue !== null) {
      merged[prop] = deepMerge(targetValue, sourceValue)
    }
    else {
      merged[prop] = sourceValue
    }
  }
  return merged
}

/**
 * @description 时间文字格式化
 */
export function formatRelativeTime(time: Date | number | string): string {
  const now = new Date().getTime()
  const past = new Date(time).getTime()
  const diff = Math.floor((now - past) / 1000)

  if (diff < 60)
    return `${diff} 秒前`
  if (diff < 3600)
    return `${Math.floor(diff / 60)} 分钟前`
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} 小时前`
  if (diff < 2592000)
    return `${Math.floor(diff / 86400)} 天前`
  if (diff < 31536000)
    return `${Math.floor(diff / 2592000)} 个月前`
  return `${Math.floor(diff / 31536000)} 年前`
}
