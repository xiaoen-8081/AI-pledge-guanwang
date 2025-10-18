import { Alova } from '../request'

/**
 * group 群组
 */
export function groupList() {
  const methodInstance = Alova.Get<Service.ResponseResult<Service.GroupApi.groupList[]>>(
    `/group/groupList`,
  )
  return methodInstance
}
