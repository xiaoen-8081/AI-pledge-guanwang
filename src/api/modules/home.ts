import { Alova } from '../request'

export function getBlockChainInfo(groupId: number | undefined) {
  const methodInstance = Alova.Get<Service.ResponseResult<Service.HomeApi.blockChainInfo>>(
    `/home/blockChainInfo/${groupId}`,
  )
  return methodInstance
}

export function blockShowInfo(groupId?: number) {
  const methodInstance = Alova.Get<Service.ResponseResult<{
    averageBlockTime: number
    chainUserCount: number
    nftCount: number
    txCountTps: number
    txAllCount: number
    latestNumber: number
  }>>(
    `/home/blockShowInfo/${groupId}`,
  )
  return methodInstance
}

export interface TxnLatelyParams {
  groupId: number
  dataTimeEnd: string
  dataTimeBegin: string
}
export function homeTxnLately(params?: TxnLatelyParams) {
  const { groupId, dataTimeEnd, dataTimeBegin } = params || {}
  const methodInstance = Alova.Get<Service.ResponseResult<{
    dateStr: string
    txn: number
  }[]>>(
    `/home/txnLately/${groupId}/${dataTimeEnd}/${dataTimeBegin}`,
  )
  return methodInstance
}
