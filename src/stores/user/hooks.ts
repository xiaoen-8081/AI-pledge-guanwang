import { storeToRefs } from 'pinia'
import { useUserStore } from './index'

// 用户信息
// export function useUserInfo() {
//   const userStore = useUserStore()
//   const { token, user, root, accountStatus } = storeToRefs(userStore)
//   return {
//     token,
//     user,
//     root,
//     accountStatus,
//   }
// }

// 群组信息
export function useUserGroupInfo() {
  const userStore = useUserStore()
  const { groupName, groupId } = storeToRefs(userStore)
  return {
    groupName,
    groupId,
  }
}

// // 版本信息
// export function useVersion() {
//   const userStore = useUserStore()
//   const { version, supportVersion, nodeVersionChange, mgrVersion, deployType } = storeToRefs(userStore)
//   return {
//     version,
//     supportVersion,
//     nodeVersionChange,
//     mgrVersion,
//     deployType,
//   }
// }

// // deploy 可视化
// export function useDeployStore() {
//   const userStore = useUserStore()
//   const { encryptionId, solcName, versionId, configData } = storeToRefs(userStore)
//   return {
//     encryptionId,
//     solcName,
//     versionId,
//     configData,
//   }
// }

// // deploy 可视化
// export function useContractStore() {
//   const userStore = useUserStore()
//   const { config, contractDataList } = storeToRefs(userStore)
//   return {
//     config,
//     contractDataList,
//   }
// }
