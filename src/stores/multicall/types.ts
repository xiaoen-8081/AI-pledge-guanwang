export interface Call {
  address: string;
  callData: string;
}
export type MethodArg = bigint | number | string;
export type MethodArgs = Array<MethodArg | MethodArg[]>;

export type OptionalMethodInputs =
  | Array<MethodArg | MethodArg[] | undefined>
  | undefined;

export interface ListenerOptions {
  // 默认情况下，应该多长时间获取一次数据. 默认1
  readonly blocksPerFetch?: number;
}

export interface CallResult {
  readonly valid: boolean;
  readonly data: string | undefined;
  readonly blockNumber: number | undefined;
}
// 无效的结果
export const INVALID_RESULT: CallResult = {
  valid: false,
  blockNumber: undefined,
  data: undefined,
};

// export interface Result extends ReadonlyArray<any> {
//   readonly [key: string]: any
// }
export type Result<T = any> = ReadonlyArray<T> & { readonly [key: string]: T };

export interface CallState<T = any> {
  readonly valid: boolean;
  // the result, or undefined if loading or errored/no data
  readonly result: Result<T> | undefined;
  // true if the result has never been fetched
  readonly loading: boolean;
  // true if the result is not for the latest block
  readonly syncing: boolean;
  // true if the call was made and is synced, but the return data is invalid
  readonly error: boolean;
}

// 合约方法调用状态
export const INVALID_CALL_STATE: CallState = {
  valid: false,
  result: undefined,
  loading: false,
  syncing: false,
  error: false,
};
export const LOADING_CALL_STATE: CallState = {
  valid: true,
  result: undefined,
  loading: true,
  syncing: true,
  error: false,
};

export type ResultStructOutput = [boolean, string] & {
  returnData: string;
  success: boolean;
};
