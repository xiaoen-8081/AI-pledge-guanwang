import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core'

export function usePopupHeghtHooks(contentRef: MaybeComputedElementRef<MaybeElement>) {
  const { height } = useElementSize(contentRef)
  const { height: windowHeight } = useWindowSize()

  const _height = computed(() => {
    const vh = windowHeight.value * 0.7
    const contentHeight = height.value + 53 + 32 + 24
    const flg = contentHeight >= vh
    return flg ? '70vh' : `${contentHeight}px`
  })
  return _height
}
