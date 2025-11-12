import { TgnToken } from '@/constants'

export function useAddToken() {
  const addTokenToWallet = async () => {
    try {
      console.log('TgnToken', TgnToken)

      const tokenAdded = await (window as any).ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: TgnToken.address, // 代币合约地址
            symbol: TgnToken.symbol, // 代币符号
            decimals: TgnToken.decimals, // 代币小数位
            image: 'http://tengenscan.org/tgnn.png', // 代币图标，可选
          },
        },
      })

      if (tokenAdded) {
        console.log('代币已成功添加到钱包！')
      }
      else {
        console.log('用户拒绝添加代币')
      }
    }
    catch (error) {
      console.error('添加代币失败', error)
    }
  }

  return {
    addTokenToWallet,
  }
}
