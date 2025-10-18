import { useUserGroupInfo } from '@/stores/user/hooks'
import { ContractApi, GroupApi } from '@/api/modules/index'
import { useUserContractMethodMapInfo } from '@/stores/config/hooks'

export function useGlobalHooks() {
  const { groupId, groupName } = useUserGroupInfo()
  const { contractMethodMap } = useUserContractMethodMapInfo()

  // 合约配置信息
  const { send: sendGetContractMethodName } = useRequest(
    () => ContractApi.getContractMethodName(),
    { immediate: false },
  ).onSuccess(({ data: res }) => {
    // console.log('sendGetContractMethodName', res)
    contractMethodMap.value = (res.data || []).reduce<Record<string, {
      methodId: string
      methodName: string
      contractAddress: string
      methodChName: string
    }>>((pre, cur) => {
      if (!pre[`${cur.contractAddress},${cur.methodId}`]) {
        pre[`${cur.contractAddress},${cur.methodId}`] = cur
      }
      return pre
    }, {})
  })

  // 获取群组信息
  const { send: sendGroupList } = useRequest(
    () => GroupApi.groupList(),
    { immediate: false },
  ).onSuccess(({ data: res }) => {
    // console.log('sendGroupList', res)
    const { data } = res
    if (data.length) {
      groupId.value = data[0].groupId
      groupName.value = data[0].groupName
      sendGetContractMethodName(groupId.value)
    }
  })
  return {
    sendGroupList,
    sendGetContractMethodName,
  }
}
