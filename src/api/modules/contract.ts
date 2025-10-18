import { Alova } from '../request'

/**
 * contract 合约管理模块
 */

// 合约配置
export function getAbiFun(methodId?: string) {
  const methodInstance = Alova.Get<Service.ResponseResult<Service.ContractApi.getAbiFunRes>>(
    `/contract/function/${methodId}`,
  )
  return methodInstance
}

export function getContractMethodName(params?: { methodId?: string, contractAddress?: string }) {
  const { methodId, contractAddress } = params || {}
  const methodInstance = Alova.Get<Service.ResponseResult<{
    methodId: string
    methodName: string
    contractAddress: string
    methodChName: string
  }[]>>(
    `/contract/methodName`,
    { params: { methodId, contractAddress } },
  )
  return methodInstance
}

// 地址余额
export function contractUserAmount(address?: string) {
  const methodInstance = Alova.Get<Service.ResponseResult<string>>(
    `/contract/userAmount/${address}`,
  )
  return methodInstance
}

// //  根据包含bytecodeBin的字符串查询合约
// export interface findByPartOfBytecodeType {
//   groupId: number
// }
// export function findByPartOfBytecodeBin(params: findByPartOfBytecodeType) {
//   const methodInstance = Alova.Get<Service.ResponseResult<Service.ContractApi.ContractFindByCodeBinApi>>(
//     `/contract/findByPartOfBytecodeBin`,
//     { params },
//   )
//   return methodInstance
// }
