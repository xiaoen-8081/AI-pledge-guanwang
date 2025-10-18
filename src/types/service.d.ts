declare namespace Service {
  type RequestErrorType = 'Response Error' | 'Business Error' | null
  type RequestCode = string | number

  interface RequestError {
    /** 请求服务的错误类型 */
    errorType: RequestErrorType
    /** 错误码 */
    code: RequestCode
    /** 错误信息 */
    msg: string
    /** 返回的数据 */
    data?: any
  }

  interface ResponseResult<T = any> extends RequestError {
    /** 请求服务是否成功 */
    isSuccess: boolean
    /** 请求服务的错误类型 */
    errorType?: RequestErrorType
    /** 错误码 */
    code: RequestCode
    /** 错误信息 */
    msg: string
    /** 返回的数据 */
    data: T
    /** 数组情况下的总条数 */
    totalCount?: number
  }

  /** 页码请求的基本参数 */
  interface PaginatingCommonParams {
    /** 页码 */
    page: number
    /** 条数 */
    size: number
  }
  /**
   * enable status
   */
  enum enableType { 0, 1 }

  type Hash = `0x${string}`

  interface CommonQueryType {
    pageNumber?: number
    pageSize?: number
    groupId?: number
  }

  namespace HomeApi {
    interface blockChainInfo {
      groupId: number
      latestNumber: number
      txn: number
      pendingTxn: number
      pbftView: number
      nodeCount: number
    }
  }
  namespace NftsApi {
    interface NftsList {
      categoryId: string
      categoryName: string
      createAddress: string
      categoryAddress: string
      createHash: string
      contractAddress: Hash
      nftId: string
      nftName: string
      ownerAddress: string
      picturesLinking: string
      updateTime: string
    }
    interface NftsOwnerList {
      categoryId: string
      categoryName: string
      contractAddress: Hash
      nftId: string
      nftName: string
      updateTime: string
    }
    interface NftsOwnerTxList {
      blockHeight: string
      blockTimeStamp: string
      businessId: string
      contractAddress: string
      methodId: string
      nftName: string
      categoryName: string
      transferAmount: number
      txHash: string
    }
    interface NftDetail {
      categoryId: string
      categoryName: string
      createAddress: string
      categoryContractAddress: string
      createHash: string
      nftId: string
      nftName: string
      ownerAddress: string
      picturesLinking: string
      offDateChain: string
      onDateChain: string
    }
    interface NftTxRecord {
      blockHeight: string
      blockTimeStamp: string
      businessId: string
      methodId: string
      transferAmount: number
      txHash: string
    }
    interface NftsCateList {
      categoryDesc: string
      categoryId: string
      categoryName: string
      createAddress: string
      createHash: string
      createTime: string
      nftNumber: number
      contractAddress: Hash
      ownerAddress: string
    }
    interface NftCateDetail {
      categoryId: string
      categoryName: string
      nftNumber: string
      createAddress: Hash
      createTime: string
      createHash: Hash
      categoryDesc: string
      categoryContractAddress: Hash
      ownerAddress: Hash
    }
    interface NftCateTxRecord {
      blockHeight: string
      blockTimeStamp: string
      businessId: string
      methodId: string
      transferAmount: number
      txHash: string
    }

  }

  namespace AccountApi {
    interface pictureCode {
      token: string
      base64Image: string
    }
    interface Login {
      account: string
      roleName: string
      accountStatus: number
      token: string
    }
  }
  namespace GroupApi {
    interface groupList {
      groupId: number
      groupName: string
      groupDesc: string
    }
  }

  namespace FrontApi {
    interface FrontsFind {
      frontId: number
      nodeId: strng
      frontIp: string
      frontPort: number
      agency: string
      groupList?: any
      clientVersion: string
      supportVersion: string
      frontVersion: string
      signVersion: string
      createTime: Date
      modifyTime: Date
      /** 0，未创建；1，停止；2，启动 */
      status: 0 | 1 | 2
      /** 0，命令行；1，Docker */
      runType: 0 | 1
      agencyId: number
      agencyName: string
      hostId: number
      hostIndex: number
      imageTag: string
      containerName: string
      jsonrpcPort: number
      p2pPort: number
      channelPort: number
      chainId: number
      chainName: string
    }
  }

  namespace NodeApi {
    interface NodeList {
      nodeId: strng
      /** 1运行 2 异常 3 启动中 4 停止 */
      nodeActive: 1 | 2 | 3 | 4
      blockNumber: number
      pbftView: number | string
      [key: string]: any
    }
  }

  namespace BlockApi {
    interface BlockList {
      blockHash: string
      number: number
      sealer: string
      dateTimeStr: string
      txn: number
    }
    interface BlockDetail {
      dbHash: Hash
      extraData: any[]
      gasLimit: string
      gasUsed: string
      hash: Hash
      number: string
      parentHash: Hash
      receiptsRoot: Hash
      sealer: string
      transactions: any[]
      [key: string]: any
    }
  }

  namespace TransApi {
    interface TransList {
      transHash: Hash
      blockHash: Hash
      blockNumber: number
      blockTimesStr: string
      from: string
      to: Hash
      transIndex: number
      methodId: Hash
      transferAmount: number
    }
    interface TransListNew {
      transHash: Hash
      blockHash: Hash
      blockNumber: number
      blockTime: number
      transFrom: Hash
      transTo: Hash
      transIndex: number | null
      contractAddress: Hash | null
      newContractAddress: Hash | null
      methodId: string
      methName: string
      methNameText: string
      transferAmount: number
      input: null | Record<string, any>
      businessId: string
      toAddress: Hash
      txStatus: '0x0' | '0x16' | null
      blockTime1: string
      nftName: string | null
      categoryName: string | null
    }
    interface TransInfo {
      blockHash: Hash | null | undefined
      transHash: Hash | undefined
      txStatus: '0x0' | '0x16' | null
      blockNumber: number
      contractAddress: string
      categoryAddress: string
      blockTime: string
      transFrom: Hash
      methName: string
      methNameText: string
      methodId: string
      categoryName: string
      categoryId: string
      nftId: string
      nftName: string
      toAddress: Hash
      picturesLinking: string
      input: null | Record<string, any>
      rawData: Hash | null
      offDateChain: string
      onDateChain: string
    }
    interface TransReceipt {
      transactionHash: string
      transactionIndex: string
      root: string
      blockNumber: string
      blockHash: string
      from: string
      to: string
      gasUsed: string
      remainGas: string
      contractAddress: string
      logs: any[]
      logsBloom: string
      status: string
      statusMsg: string
      input: string
      output: string
      txProof: any
      receiptProof: any
      message: string
      statusOK: boolean
    }
  }

  namespace MethodApi {
    interface AbiByIdApi {
      methodId: string
      groupId: number
      abiInfo: string
      abiInfoDecode: any
      methodType: string
      createTime: string
      modifyTime: string
    }
    interface TransInfo {
      blockHash: string
      blockNumber: number
      from: string
      gas: string
      hash: string
      input: string
      nonce: string
      to: string
      transactionIndex: string
      value: string
      gasPrice: string
      blockLimit: string
      chainId: string
      groupId: string
      extraData: string
      signature: {
        r: string
        s: string
        v: string
        signature: string
      }
    }
  }

  namespace ContractApi {
    interface getAbiFunRes {
      abiInfo: string
      methodId: string
      type: string
    }
    interface ContractFindByCodeBinApi {
      contractId: number
      contractName: string
      groupId: number
      chainIndex: number
      contractType: number
      contractSource: string
      contractAbi: string
      contractBin: string
      bytecodeBin: string
      contractAddress: string
      deployTime: string
      contractVersion: string
      description: string
      account: string
      createTime: string
      modifyTime: string
    }
  }
  namespace UserApi {
    interface UserInfo {
      userId: number
      userName: string
      account: string
      groupId: number
      publicKey: string
      privateKey: null
      /** 1-正常 2-停用） 默认1 */
      userStatus: 1 | 2
      chainIndex: null
      userType: number
      address: Hash
      signUserId: string
      appId: string
      /** 是否拥有私钥信息(1-拥有，2-不拥有) */
      hasPk: 1 | 2
      description: string
      createTime: string
      modifyTime: string
    }
  }
  namespace ExternalApi {
    interface AllUserInfo {
      userId: number
      userName: string
      account: string
      groupId: number
      publicKey: string
      privateKey: null
      /** 1-正常 2-停用） 默认1 */
      userStatus: 1 | 2
      chainIndex: null
      userType: number
      address: Hash
      signUserId: string
      appId: string
      /** 是否拥有私钥信息(1-拥有，2-不拥有) */
      hasPk: 1 | 2
      description: string
      createTime: string
      modifyTime: string
    }
  }
}
