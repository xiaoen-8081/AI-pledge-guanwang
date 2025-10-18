import type { AbiFunction } from 'viem'
import { Alova } from '../request'

/**
 * method 合约方法管理模块
 */

//  根据方法编号查询
export function getAbiFunctionById(groupId: number, methodId: string) {
  const methodInstance = Alova.Get(
    `/method/findById/${groupId}/${methodId}`,
    {
      transform(data: Service.ResponseResult<Service.MethodApi.AbiByIdApi>) {
        try {
          const a = {
            ...data,
            data: { ...data.data, abiInfoDecode: JSON.parse(data.data.abiInfo) as AbiFunction },
          }
          return a
        }
        catch (error) {
          console.error('getAbiFunctionById', error)
          return {
            ...data,
            data: { ...data.data, abiInfoDecode: undefined },
          }
        }
      },
    },
  )
  return methodInstance
}
