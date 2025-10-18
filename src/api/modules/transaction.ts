import type { Hash } from 'viem'
import { Alova } from '../request'
import { useUserContractMethodMapInfo } from '@/stores/config/hooks'

// 查询交易列表
export function transList({ params, data = {} }: { params: Service.CommonQueryType, data?: Record<string, any> }) {
  const { pageNumber = 1, pageSize = 10, groupId } = params
  const methodInstance = Alova.Post<Service.ResponseResult<Service.TransApi.TransList[]>>(
    `/transaction/transactionList/${groupId}/${pageNumber}/${pageSize}`,
    data,
  )
  return methodInstance
}

export function transListNew({ params, data = {} }: { params?: Service.CommonQueryType, data?: Record<string, any> }) {
  const { contractMethodMap } = useUserContractMethodMapInfo()
  const { pageNumber = 1, pageSize = 10, groupId } = params || {}
  const methodInstance = Alova.Post(
    `/transaction/NftTxList/${groupId}/${pageNumber}/${pageSize}`,
    data,
    {
      transform(rawData: Service.ResponseResult<Service.TransApi.TransListNew[]>) {
        const dataList = rawData.data.map((x) => {
          return {
            ...x,
            methNameText: contractMethodMap.value[`${x.newContractAddress},${x.methodId}`]?.methodChName || x.methodId,
          }
        })
        return {
          ...rawData,
          data: dataList,
        }
      },
    },
  )
  return methodInstance
}

//  根据交易hash查询交易信息
export function transactionByHash(groupId: number, transactionHash?: Hash) {
  const methodInstance = Alova.Get(
    `/transaction/txDetailByHash/${groupId}/${transactionHash}`,
    {
      transform(rawData: Service.ResponseResult<Service.TransApi.TransInfo>) {
        const { contractMethodMap } = useUserContractMethodMapInfo()
        console.log('contractMethodMap', contractMethodMap.value)
        const data = {
          ...rawData.data,
          methNameText: contractMethodMap.value[`${rawData.data.contractAddress},${rawData.data.methodId}`]?.methodChName || rawData.data.methodId,
        }
        return {
          ...rawData,
          data,
        }
      },
    },
  )
  return methodInstance
}
//  根据交易hash查询交易信息
export function transactionReceipt(groupId?: number, transHash?: Hash) {
  const methodInstance = Alova.Get<Service.ResponseResult<Service.TransApi.TransReceipt>>(
    `/transaction/receiptByHash/${groupId}/${transHash}`,
  )
  return methodInstance
}
