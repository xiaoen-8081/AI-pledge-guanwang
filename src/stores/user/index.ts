import { APP_NAME } from '@/config/app'
import { defineStore } from 'pinia'
import { store } from '..'

export const useUserStore = defineStore(`${APP_NAME}_USER`, () => {
  // const token = ref<string | undefined>(undefined)
  // const user = ref('')
  // const accountStatus = ref<number | undefined>(undefined)
  // const root = ref('')

  const groupName = ref('')
  const groupId = ref<number | undefined>(undefined)
  const solcName = ref(undefined)

  // const config = ref<number | undefined>(undefined)
  // const contractDataList = ref<any[]>([])

  // const encryptionId = ref<Service.enableType>(0)
  // const versionId = ref(undefined)
  // const configData = ref<number>(0)
  // const reload = ref('')
  // const selectData = ref('')

  // const nodeVersionChange = ref<number | string>('')
  // const deployType = ref<number | undefined>(undefined)
  // const version = ref('')
  // const supportVersion = ref('')
  // const mgrVersion = ref<string | null>(null)
  return {
    // token,
    // user,
    // root,
    // accountStatus,
    groupName,
    groupId,
    solcName,

    // config,
    // contractDataList,

    // encryptionId,
    // versionId,
    // configData,
    // reload,
    // selectData,

    // version,
    // supportVersion,
    // nodeVersionChange,
    // deployType,
    // mgrVersion,

  }
}, {
  persist: [
    {
      omit: [
        'accountStatus',
        'reload',
        'version',
        'supportVersion',
        'mgrVersion',
        'contractDataList',
      ],
    },
    {
      pick: ['accountStatus', 'reload'],
      storage: sessionStorage,
    },
  ],
})

// Need to be used outside the setup
export function useUser() {
  return useUserStore(store)
}
