import type { Hash } from 'viem'
import { Alova } from '../request'

/**
 * block 区块管理模块
 */

//  查询区块列表
export interface BlockListType {
  pageNumber?: number
  pageSize?: number
  groupId: number
  pkHash?: string | undefined
  blockNumber?: number | string | bigint | undefined
}
export function blockList(params: BlockListType) {
  const { pageNumber = 1, pageSize = 10, groupId, pkHash, blockNumber } = params
  const methodInstance = Alova.Get<Service.ResponseResult<Service.BlockApi.BlockList[]>>(
    `/block/blockList/${groupId}/${pageNumber}/${pageSize}`,
    { params: { pkHash, blockNumber } },
  )
  return methodInstance
}

export interface BlockByHashType {
  groupId: number
  pkHash: Hash | undefined
}
export function blockByHash(params: BlockByHashType) {
  const { groupId, pkHash } = params
  const methodInstance = Alova.Get<Service.ResponseResult<Service.BlockApi.BlockDetail>>(
    `/block/blockByHash/${groupId}/${pkHash}`,
  )
  return methodInstance
}

export function blockByNumber(groupId?: number, blockNumber?: number | string) {
  const methodInstance = Alova.Get<Service.ResponseResult<Service.BlockApi.BlockDetail>>(
    `/block/blockByNumber/${groupId}/${blockNumber}`,
  )
  return methodInstance
}
