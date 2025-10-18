import clipboard3 from 'vue-clipboard3'

export function useCopy() {
  const showCopyPopover = ref(false)
  // const { copy: clipboard } = useClipboard()
  const { toClipboard } = clipboard3()

  const copy = async (text) => {
    showCopyPopover.value = true
    setTimeout(() => {
      showCopyPopover.value = false
    }, 1000)
    await toClipboard(text)
  }

  return { showCopyPopover, copy }
}
