import type { DialogOptions } from 'naive-ui'

export function useDialogOptions(options: DialogOptions = {}) {
  const op = {
    maskClosable: false,
    ...options,
  } as DialogOptions
  return op
}

// export useDialogPopup() {
//   const dialog = ref<DialogReactive>()
//   const create = () => {
//     const d = window.$NaiveDialog.create({
//       title: '节点前置配置',
//       maskClosable: false,
//     })
//   }

//   return [dialog, create]
// }
