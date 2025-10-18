import { injected } from '@wagmi/connectors'
import { useConnect } from '@wagmi/vue'
import to from 'await-to-js'
import type { BaseError } from '@wagmi/vue'

export function useCollectWallet(): [Ref<boolean>, () => Promise<boolean>] {
  const { isPending, connectAsync } = useConnect()
  const handleCollect = async () => {
    const [error] = await to<any, BaseError >(connectAsync({ connector: injected() }))
    console.log(JSON.stringify(error))
    if (error) {
      if (error.message?.includes('wallet_requestPermissions')) {
        window.$Toast.show('请在钱包中确认操作')
      }
      else {
        window.$Toast.show(error.shortMessage)
      }
      return Promise.reject(error)
    }
    else {
      return Promise.resolve(true)
    }
  }
  return [isPending, handleCollect]
}
