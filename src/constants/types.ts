import type { ChainId } from '@pancakeswap/chains';
import type { Currency, Token } from '@pancakeswap/swap-sdk-core';
import type { ERC20Token } from '@pancakeswap/swap-sdk-evm';

export type UnsafeCurrency = Currency | ERC20Token | null | undefined;

export type RefOrComputedRef<T = any> = ComputedRef<T> | Ref<T>;

// a list of tokens by chain
export type ChainMap<T> = {
  readonly [chainId in ChainId]: T;
};

export type ChainTokenList = ChainMap<Token[]>;

export enum FetchStatus {
  Failed = 'FAILED',
  Fetched = 'FETCHED',
  Fetching = 'FETCHING',
  Idle = 'IDLE',
}
