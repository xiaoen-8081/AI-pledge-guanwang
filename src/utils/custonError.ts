export class CustomError extends Error {
  case: Record<string, any>

  constructor(message: string, caseData: Record<string, any>) {
    super(message)
    this.case = caseData
    this.name = 'CustomError' // 设定错误类型为自定义错误类的名字
  }
}
