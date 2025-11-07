import { useAccount } from '@wagmi/vue';

import { useActiveChainId } from './useActiveChainId';

/**
 *提供web3提供商，有或没有用户的签名者
 *重新创建web3实例，只有当提供商改变
 */
export function useAccountActiveChain() {
  const { address: account, status, connector } = useAccount();
  const { chainId } = useActiveChainId();

  return { account, chainId, status, connector };
}
