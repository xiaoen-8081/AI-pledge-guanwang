import type { PropType } from 'vue'

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true,
}

export function makeNullObjectProp<T>(defaultVal: T) {
  return {
    type: Object as PropType<T>,
    default: () => defaultVal,
  }
}
export function makeObjectProp(defaultVal: object) {
  return {
    type: Object,
    default: () => defaultVal || {},
  }
}

export function makeArrayProp(defaultVal: Array<any>) {
  return {
    type: Array,
    default: () => defaultVal || [],
  }
}

export function makeBooleanProp(defaultVal: boolean) {
  return {
    type: Boolean,
    default: defaultVal,
  }
}

export function makeNumberProp(defaultVal: number) {
  return {
    type: Number,
    default: defaultVal,
  }
}

export function makeNumericProp(defaultVal: number | string) {
  return {
    type: numericProp,
    default: defaultVal,
  }
}

export function makeStringProp<T = string>(defaultVal: T) {
  return {
    type: String,
    default: defaultVal,
  }
}

export function makeTProp<T = any>(defaultVal: string) {
  return {
    type: String as unknown as PropType<T>,
    default: defaultVal,
  }
}
