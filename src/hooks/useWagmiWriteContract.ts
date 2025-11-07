import type { BaseError, WriteContractReturnType } from '@wagmi/core'

import to from 'await-to-js'

import { getAccount, reconnect, simulateContract, writeContract } from '@wagmi/core'

import { wagmiConfig } from '@/utils/wagmi'

// 写入合约
export function wagmiWriteContract() {
  const writeContractCallBack = async (options: any) => {
    let { isConnected, connector } = getAccount(wagmiConfig)
    if (!isConnected || !connector) {
      // 强制 wagmi 自动重连钱包
      await reconnect(wagmiConfig)
      const acc = getAccount(wagmiConfig)
      isConnected = acc.isConnected
      connector = acc.connector
    }

    if (!isConnected || !connector) {
      window.$Toast.show('请先连接钱包')
      throw new Error('Wallet not connected')
    }

    // ----------
    const [err] = await to<any, BaseError>(
      simulateContract(wagmiConfig, { ...options }),
    )
    // console.warn(12, options);
    if (err) {
      // console.warn('simulateCallBack error', err);
      window.$Toast.show(err.shortMessage)
      throw err
    }

    const [err1, res1] = await to<WriteContractReturnType, BaseError>(
      writeContract(wagmiConfig, { ...options }),
    )
    console.log(23, err1, res1)
    if (err1) {
      console.warn('simulateCallBack error', err1)
      const msg = err1.shortMessage.includes('User rejected the request')
        ? '用户取消'
        : err1.shortMessage
      window.$Toast.show(msg)
      throw err1
    }
    return res1
  }
  return { writeContractCallBack }
}
