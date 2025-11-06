import { defineStore } from 'pinia'
import { APP_NAME } from '@/config/app'

export const useApplicationStore = defineStore(`${APP_NAME}_APP`, () => {
  const collapsed = ref(false)
  // // 切换链弹框
  // const switchChainPopup = ref(false)
  // // 登录
  // const loginPopup = ref(false)
  // // 签名
  // const signerPopup = ref(false)
  // // 注册
  // const registerPopup = ref(false)
  // // 当前区块高度
  const blockNumber = ref<{ [chainId: number]: number | undefined }>({})

  return {
    collapsed,
    // switchChainPopup,
    // loginPopup,
    // signerPopup,
    // registerPopup,
    blockNumber,
  }
})
