import { createAlova } from 'alova'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import VueHook from 'alova/vue'
import { errorMessageWithCode } from '@/utils/errcode'
import { CustomError } from '@/utils/custonError'

export const Alova = createAlova({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}/api/fisco-bcos-browser`,
  timeout: 60 * 1000,
  requestAdapter: axiosRequestAdapter(),
  statesHook: VueHook,
  // 设置为null即可全局关闭全部请求缓存
  cacheFor: null,
  cacheLogger: import.meta.env.NODE_ENV === 'development',

  // 请求拦截
  beforeRequest() {
    // const userStore = useUser()
    // const token = userStore.token
    // if (token && !method.meta?.ignoreToken) {
    //   method.config.headers.AuthorizationToken = `Token ${token}`
    // }
    // method.config.headers['Cache-Control'] = 'no-cache'
    // method.config.headers['X-Requested-With'] = 'XMLHttpRequest'
  },
  // 响应拦截
  responded: {
    // 响应成功
    onSuccess: (response, method) => {
      // console.log('responded onSuccess', response, method)
      const { status, data } = response
      if (status === 200) {
        if (method.meta?.name === 'blob') {
          return {
            isSuccess: true,
            data,
          }
        }
        if (method.meta?.name === 'managerVersion') {
          return {
            isSuccess: true,
            data,
          }
        }
        // 请求成功
        if (data.code === 0) {
          return {
            isSuccess: true,
            ...data,
          }
        }
        window.$Toast.show(errorMessageWithCode(data.code))
        throw new CustomError('code is not 0', { isSuccess: false, ...data })
      }
      throw new CustomError('status is not 200', { isSuccess: false, ...data })
    },
    // 响应失败
    onError: (err) => {
      console.log('responded onError', err)
      const { response, status } = err
      const { code, message } = response.data
      window.$Toast.show(errorMessageWithCode(code) || message || '系统错误')
      // window.$NaiveNotification.error({
      //   title: '错误提示',
      //   content: errorMessageWithCode(code) || message || '系统错误',
      // })
      throw new CustomError(`status: ${status}`, { isSuccess: false, ...response.data })
    },
  },
})
