import { Alova } from '../request'
/**
 * account 用户
 */

// 图片验证码
export function pictureCheckCode() {
  const methodInstance = Alova.Get<Service.ResponseResult<Service.AccountApi.pictureCode>>(`/account/pictureCheckCode`)
  methodInstance.meta = { ignoreToken: true }
  return methodInstance
}
// 登录
export interface LoginFormType {
  account: string
  accountPwd: string
}
export function login(data: LoginFormType, params: { checkCode: string }, token: string) {
  const methodInstance = Alova.Post<Service.ResponseResult<Service.AccountApi.Login>>(
    `/account/login`,
    data,
    { params, headers: { 'Content-Type': 'application/x-www-form-urlencoded', token } },
  )
  return methodInstance
}
// 修改密码
export function resetPassword(data: { oldAccountPwd: string, newAccountPwd: string }) {
  const methodInstance = Alova.Put<Service.ResponseResult>(
    `/account/passwordUpdate`,
    data,
  )
  return methodInstance
}
