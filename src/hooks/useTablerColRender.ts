import { formatRelativeTime, formatStringEncrypt } from '@/utils/utils'
import { type DataTableColumn, NFlex, NPopover, NSpin, NTag } from 'naive-ui'

export function useTablerColRender() {
  const router = useRouter()
  // 区块高度
  const blockColRender = (blocks: number, options?: Record<string, any>) => {
    return h('span', {
      onClick: () => !options?.disabled && router.push({ name: 'BlocksDetail', params: { blocks } }),
      class: !options?.disabled && 'cursor-pointer',
    }, { default: () => blocks })
  }
  // 区块哈希
  const blockTxsColRender = (blockHash: string, blocks: number) => {
    return h(NPopover, { placement: 'top', style: { 'max-width': '270px' } }, {
      trigger: () => h('span', {
        onClick: () => router.push({ name: 'BlocksDetail', params: { blocks } }),
        class: 'cursor-pointer ',
      }, { default: () => formatStringEncrypt(blockHash, 6, 6) }),
      default: () => blockHash,
    })
  }
  // 地址
  const addressColRender = (address: string, options?: { start?: number, end?: number, disabled?: boolean }) => {
    const { start = 6, end = 8, disabled = false } = options || {}
    return address
      ? h(NPopover, { placement: 'top', style: { 'max-width': '270px' } }, {
        trigger: () => h('span', {
          onClick: () => !disabled && router.push({ name: 'AddressDetail', params: { address } }),
          class: !disabled && 'cursor-pointer ',
        }, { default: () => formatStringEncrypt(address, start, end) }),
        default: () => address,
      })
      : '--'
  }
  // 合约地址
  const contractColRender = (contract: string, options?: { start?: number, end?: number, disabled?: boolean }) => {
    const { start = 6, end = 8 } = options || {}
    return h(NPopover, { placement: 'top', style: { 'max-width': '270px' } }, {
      trigger: () => h('span', {
        onClick: () => router.push({ name: 'ContractAddress', params: { contract } }),
        class: 'cursor-pointer ',
      }, { default: () => formatStringEncrypt(contract, start, end) }),
      default: () => contract,
    })
  }
  // 交易哈希
  const txsColRender = (transHash: string) => {
    return h(NPopover, { placement: 'top', style: { 'max-width': '270px' } }, {
      trigger: () => h('span', {
        class: 'cursor-pointer ',
        onClick: () => router.push({ name: 'TxsDetail', params: { transHash } }),
      }, { default: () => formatStringEncrypt(transHash, 6, 6) }),
      default: () => transHash,
    })
  }
  // 时间
  const timeColRender = (time: string) => {
    return h('span', {}, { default: () => time ? formatRelativeTime(time) : '--' })
  }

  // nft类别
  const nftCateColRender = (text: string | null, options: { categoryId?: string, contractAddress?: string, disabled?: boolean }) => {
    const { categoryId, contractAddress, disabled } = options
    return text
      ? h('span', {
        class: !disabled && 'cursor-pointer',
        onClick: () => !disabled && router.push({
          name: 'NftCateDetail',
          query: { categoryId, contractAddress },
        }),
      }, { default: () => text })
      : '--'
  }
  // nft名称
  const nftColRender = (text: string | null, options: { nftId?: string, contractAddress?: string, disabled?: boolean }) => {
    const { nftId, contractAddress, disabled = false } = options
    return text
      ? h('span', {
        class: !disabled && 'cursor-pointer ',
        onClick: () => !disabled && router.push({ name: 'NftDetail', query: { nftId, contractAddress } }),
      }, { default: () => text })
      : '--'
  }

  return {
    timeColRender,
    blockTxsColRender,
    addressColRender,
    txsColRender,
    blockColRender,
    nftCateColRender,
    nftColRender,
    contractColRender,
  } as const
}

export function useTablerColItems() {
  const { timeColRender, txsColRender, nftCateColRender, nftColRender, blockTxsColRender, blockColRender, addressColRender } = useTablerColRender()

  // 时间
  const blockTime = <T>(params?: { title?: string, key?: string } & Record<string, any>) => {
    const { title = '时间', key = 'blockTime1', ...config } = params || {}
    const common = { title, key, minWidth: 100, align: 'right', ...config }
    return { ...(!config.render && { render: row => timeColRender(row[key]) }), ...common } as DataTableColumn<T>
  }
  // 交易哈希
  const transHash = <T>(params?: { title?: string, key?: string, className?: string } & Record<string, any>) => {
    const { title = '交易哈希', key = 'transHash', className = 'secondary', ...config } = params || {}
    const common = { title, key, className, minWidth: 160, ...config }
    return {
      ...(!config.render && { render: (row: any) => {
        return h(
          NFlex,
          { align: 'center', size: 4, wrap: false },
          {
            default: () => [
              h('div', { class: `text-18 ${row.txStatus === '0x0'
                ? 'i-material-symbols:check-circle text-primary'
                : row.txStatus === '0x16'
                  ? 'i-carbon:close-filled text-error'
                  : ''}`,
              }, { default: () => '' }),
              txsColRender(row[key]),
            ],
          },
        )
      },
      }),
      ...common,
    } as DataTableColumn<T>
  }
  // 区块高度
  const blockHeight = <T>(
    params?: { title?: string, key?: string, className?: string } & Record<string, any>,
    options?: & Record<string, any>,
  ) => {
    const { title = '区块高度', key = 'blockNumber', className = 'secondary', ...config } = params || {}
    const common = { title, key, className, minWidth: 100, ...config }
    return {
      ...(!config.render && { render: (row: any) => blockColRender(row[key], options) }),
      ...common,
    } as DataTableColumn<T>
  }
  // 区块哈希
  const blockHash = <T>(params?: { title?: string, key?: string, blockNumber?: string, className?: string } & Record<string, any>) => {
    const { title = '区块哈希', key = 'blockHash', blockNumber = 'blockNumber', className = 'secondary', ...config } = params || {}
    const common = { title, key, className, minWidth: 160, ...config }
    return {
      ...(!config.render && { render: (row: any) => blockTxsColRender(row.blockHash, row[blockNumber]) }),
      ...common,
    } as DataTableColumn<T>
  }
  // 交易类型
  const methNameText = <T>(params?: { title?: string, key?: string } & Record<string, any>) => {
    const { title = '交易消息类型', key = 'methNameText', ...config } = params || {}
    const common = { title, key, minWidth: 160, ...config }
    return {
      ...(!config.render && { render: (row: any) => row.methNameText === '0' ? h(NSpin, { size: 14 }) : h(NTag, {}, { default: () => row.methNameText }) }),
      ...common,
    } as DataTableColumn<T>
  }
  // 地址
  const address = <T>(
    params?: { title?: string, key?: string, className?: string } & Record<string, any>,
    options?: Record<string, any>,
  ) => {
    const { title = '签名者', key = 'transFrom', className = 'secondary', ...config } = params || {}
    const common = { title, key, className, minWidth: 120, ...config }
    return {
      ...(!config.render && { render: (row: any) => addressColRender(row[key], options) }),
      ...common,
    } as DataTableColumn<T>
  }
  // NFT类别
  const nftCate = <T>(
    params?: {
      title?: string
      key?: string
      className?: string
      categoryId?: string
      contractAddress?: string
    } & Record<string, any>) => {
    const { title = '类别 ID', key = 'categoryId', categoryId = 'categoryId', contractAddress = 'contractAddress', className = 'secondary', ...config } = params || {}
    const common = { title, key, className, minWidth: 80, ...config }
    return {
      ...(!config.render && {
        render: (row: any) => nftCateColRender(row[key], {
          categoryId: row[categoryId],
          contractAddress: row[contractAddress],
        }),
      }),
      ...common,
    } as DataTableColumn<T>
  }
  // NFT
  const nft = <T>(params?: { title?: string, key?: string, className?: string, nftId?: string, contractAddress?: string } & Record<string, any>) => {
    const { title = 'NFT ID', key = 'nftId', nftId = 'nftId', contractAddress = 'contractAddress', className = 'secondary', ...config } = params || {}
    const common = { title, key, className, minWidth: 80, ...config }
    return {
      ...(!config.render && {
        render: (row: any) => nftColRender(row[key], {
          nftId: row[nftId],
          contractAddress: row[contractAddress],
        }),
      }),
      ...common,
    } as DataTableColumn<T>
  }

  return {
    blockTime,
    transHash,
    blockHash,
    blockHeight,
    methNameText,
    address,
    nftCate,
    nft,
  } as const
}
