import type { ChainId } from '@pancakeswap/chains';
import type { Address, Hash } from 'viem';

export type TransactionType =
  | 'add-liquidity'
  | 'approve'
  | 'limit-order-approval'
  | 'limit-order-cancellation'
  | 'limit-order-submission'
  | 'non-bsc-farm'
  | 'remove-liquidity'
  | 'swap'
  | 'wrap';
export interface Order {
  id: string;
  owner: string;
  inputToken: string;
  outputToken: string;
  minReturn: string;
  maxReturn?: string;
  adjustedMinReturn: string;
  module: string;
  witness: string;
  secret: string;
  inputAmount: string;
  vault: string;
  bought: null | string;
  auxData: null | string;
  status: string;
  createdTxHash: string;
  executedTxHash: null | string;
  cancelledTxHash: null | string;
  blockNumber: string;
  createdAt: string;
  updatedAt: string;
  updatedAtBlock: string;
  updatedAtBlockHash: string;
  data: string;
  inputData: string;
  handler: null | string;
  isExpired: boolean;
}
export interface SerializableTransactionReceipt {
  to: Address | null;
  from: Address;
  contractAddress: Address | null | undefined;
  transactionIndex: number;
  blockHash: Hash;
  transactionHash: Hash;
  blockNumber: number | string;
  status?: 'reverted' | 'success';
}

export enum MsgStatus {
  MS_COMPLETED = 3,
  MS_FAIL = 4,
  MS_FALLBACK = 5,
  MS_UNKNOWN = 0,
  MS_WAITING_FOR_DESTINATION_EXECUTION = 2,
  MS_WAITING_FOR_SGN_CONFIRMATIONS = 1,
}

export enum FarmTransactionStatus {
  FAIL = 0,
  PENDING = -1,
  SUCCESS = 1,
}

export enum NonBscFarmStepType {
  STAKE = 'STAKE',
  UNSTAKE = 'UNSTAKE',
}

export interface NonBscFarmTransactionStep {
  step: number;
  chainId: number;
  status: FarmTransactionStatus;
  tx: string;
  isFirstTime?: boolean;
  msgStatus?: MsgStatus;
}

export interface NonBscFarmTransactionType {
  type: NonBscFarmStepType;
  status: FarmTransactionStatus;
  amount: string;
  lpAddress: string;
  lpSymbol: string;
  steps: NonBscFarmTransactionStep[];
}

export interface finalizeTransaction {
  chainId: ChainId;
  hash: string;
  receipt: SerializableTransactionReceipt;
  nonBscFarm?: NonBscFarmTransactionType;
}
