import type { BaseError } from 'viem';

import { ContractFunctionExecutionError, InvalidAddressError } from 'viem';

const text = 'User denied transaction signature';

export function getWagmiError<T extends BaseError>(error: T) {
  let message = '';
  if (error instanceof InvalidAddressError) {
    message = '地址无效';
  } else if (error instanceof ContractFunctionExecutionError) {
    message = error.details;
  } else if (error && error?.shortMessage) {
    message = error.shortMessage;
  }
  if (message.includes(text)) {
    message = 'Transaction rejected.';
  }
  return { message, error };
}
