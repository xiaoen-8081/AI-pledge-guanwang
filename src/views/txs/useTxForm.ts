import type { SelectOption } from 'naive-ui'

export type txStatusType = -1 | '1' | '2'

export type ContractType = txStatusType | '3'

export interface TxFormType {
  blockNumber: string | undefined
  businessId: string | undefined
  contractAddress: string | undefined
  contractAddresses: undefined | string[]
  contractType: ContractType
  methId: string | undefined
  ownerAddress: string | undefined
  transHash: string | undefined
  txStatus: txStatusType
}

export function useTxForm() {
  const contractOptions: SelectOption[] = [
    { value: -1, label: '全部合约类型' },
    { value: '1', label: 'NFT类别合约' },
    { value: '2', label: '代币合约' },
    { value: '3', label: 'NFT合约' },
  ]
  const statusOptions = [
    { value: -1, title: '所有交易状态' },
    { value: '1', title: '交易成功' },
    { value: '2', title: '交易失败' },
  ]

  const txForm = reactive<TxFormType>({
    blockNumber: undefined,
    businessId: undefined,
    contractAddress: undefined,
    contractAddresses: undefined,
    contractType: -1,
    methId: undefined,
    ownerAddress: undefined,
    transHash: undefined,
    txStatus: -1,
  })

  const resetFrom = () => {
    txForm.contractType = -1
    txForm.txStatus = -1
  }

  return { contractOptions, statusOptions, txForm, resetFrom }
}
