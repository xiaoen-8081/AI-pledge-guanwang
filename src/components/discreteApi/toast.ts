import GlobalToast from '@/components/global/DyNotic.vue'
import type { MessageApi } from 'naive-ui'
// 提供一个全局的 message 实例
// const MESSAGE_INSTANCE = Symbol('naive-ui-message-instance')
// 用于跟踪消息实例的栈

export interface toastType {
  show: (title: string, obj?: { duration: number }) => void
}

export function useToast(message: MessageApi) {
  const stack = reactive(new Set())
  const toast = {
    show: (title: string, obj?: { duration: number }) => {
      const { duration = 5000 } = obj || {}
      const messageReactive = message.success('', {
        render: (props) => {
          return h(GlobalToast, {
            title,
            close: props.onClose,
          })
        },
        duration,
        showIcon: false,
        closable: false,
      })
      stack.add(messageReactive)
    },
  }
  return toast
}
