import type { Hash } from 'viem'
import { Alova } from '../request'

/**
 * nft 区块管理模块
 */

export function NftsList({ params, data = {} }: { params: Service.CommonQueryType, data?: Record<string, any> }) {
  const { pageNumber = 0, pageSize = 10, groupId } = params
  const methodInstance = Alova.Post<Service.ResponseResult<Service.NftsApi.NftsList[]>>(
    `/nft/nftList/${groupId}/${pageNumber}/${pageSize}`,
    data,
  )
  return methodInstance
}

export interface NftDetailQueryType {
  businessId?: number | string
  contractAddress?: Hash
}
export function NftDetail(groupId: number, data?: NftDetailQueryType) {
  const methodInstance = Alova.Post<Service.ResponseResult<Service.NftsApi.NftDetail>>(
    `/nft/getNftById/${groupId}`,
    { ...data },
  )
  return methodInstance
}

// 类别
export function NftsCateList({ params, data = {} }: { params: Service.CommonQueryType, data?: Record<string, any> }) {
  const { pageNumber = 1, pageSize = 10, groupId } = params
  const methodInstance = Alova.Post<Service.ResponseResult<Service.NftsApi.NftsCateList[]>>(
    `/nftCatrgory/nftcategoryList/${groupId}/${pageNumber}/${pageSize}`,
    data,
  )
  return methodInstance
}

export function NftCateDetail(groupId: number, data?: NftDetailQueryType) {
  const methodInstance = Alova.Post<Service.ResponseResult<Service.NftsApi.NftCateDetail>>(
    `/nftCatrgory/getCategoryById/${groupId}`,
    { ...data },
  )
  return methodInstance
}
