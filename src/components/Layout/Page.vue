<script setup lang="ts">
import BlockUpdater from '@/stores/application/updater'
import type { BaseError } from '@wagmi/vue'
import {
  useAccount,
  useSwitchChain,
} from '@wagmi/vue'

interface PageProps {
  bottom?: boolean
}
const { bottom = true } = defineProps<PageProps>()

BlockUpdater()

const route = useRoute()
const { address, chainId: collectChain } = useAccount()
const { chains, switchChainAsync } = useSwitchChain()
const supportChain = computed(() => chains.value[0])
const showSwitchChainPopup = ref(false)
watchEffect(() => {
  if (chains.value) {
    const ids = chains.value.map(x => x.id)
    // console.log('chains', ids, chains.value, collectChain.value);
    if (route.name === 'Swap' || route.name === 'Private' || route.name === 'Public') {
      showSwitchChainPopup.value = address.value
        ? !ids.includes(collectChain.value as number)
        : false
    }
  }
})
async function handleSwitch() {
  try {
    // disabled.value = true
    await switchChainAsync({ chainId: supportChain.value.id })
  }
  catch (error) {
    window.$NaiveMessage.info((error as BaseError).shortMessage)
  }
  finally {
    // disabled.value = false
  }
}
</script>

<template>
  <n-layout position="absolute" :native-scrollbar="false">
    <n-modal
      v-model:show="showSwitchChainPopup"
      preset="dialog"
      :closable="false"
      :mask-closable="false"
      type="warning"
      :title="$t('提示')"
      :content="`此页面属于${supportChain.name}, 切换网络以继续。`"
      positive-text="切换"
      @positive-click="handleSwitch()"
    />

    <!-- <n-layout-header style="z-index: 1;" position="absolute" class="bg-#fff">
      <slot name="header">
        <Header />
      </slot>
    </n-layout-header> -->
    <n-layout class="content-min-h-164 lg:content-min-h-118">
      <slot name="content" />
    </n-layout>

    <n-layout-footer
      v-if="bottom"
      bordered
      style="height: 64px;"
    >
      <slot name="bottom">
        <footer class="footerBg w-full flex flex-col items-center bg-cover bg-center md:min-h-[160px] lg:pt-[76px] md:pb-[30px] md:pt-[40px] sm:pt-[60px]">
          <div class="w-full md:mx-0 md:max-w-[1440px]">
            <div class="hidden lg:block">
              <div class="mb-[20px] w-full flex items-center justify-between">
                <img src="/src/assets/img/logo2.svg" alt="Oradin Logo" class="h-[32px] w-[98.11px]">
                <!-- <img src="/src/assets/img/logo.svg" alt="Oradin Logo" class="w-[80px]"> -->
                <div class="flex flex-row items-center text-[16px] text-white italic">
                  <div class="mr-[52px] cursor-pointer transition-colors hover:text-[#73CC2E]">
                    Frequently Asked Questions (FAQ)
                  </div> <div class="mr-[52px] cursor-pointer transition-colors hover:text-[#73CC2E]">
                    Contact us
                  </div> <div class="cursor-pointer transition-colors hover:text-[#73CC2E]">
                    Media reports
                  </div>
                </div>
              </div> <div class="flex flex-row items-center">
                <img src="/src/assets/img/twitter.png" alt="Twitter" class="mr-[32px] h-[40px] w-[40px] cursor-pointer transition-opacity hover:opacity-80"> <img src="/src/assets/img/discord.png" alt="Discord" class="mr-[32px] h-[40px] w-[40px] cursor-pointer transition-opacity hover:opacity-80"> <img src="/src/assets/img/github.png" alt="GitHub" class="mr-[32px] h-[40px] w-[40px] cursor-pointer transition-opacity hover:opacity-80"> <img src="/src/assets/img/vector.png" alt="Vector" class="h-[40px] w-[40px] cursor-pointer transition-opacity hover:opacity-80">
              </div>
            </div>
            <div class="mx-20px box-border h-[120px] pt-[27px] lg:hidden">
              <div class="mb-[17px] w-full flex items-center justify-between">
                <img src="/src/assets/img/logo2.svg" alt="Oradin Logo" class="h-[32px] w-[98.11px] sm:h-[32px] sm:w-[98.11px]">
                <!-- <img src="/src/assets/img/logo.svg" alt="Oradin Logo" class="w-[40px]"> -->
                <div class="flex flex-row items-center space-x-[20px]">
                  <img src="/src/assets/img/twitter.png" alt="Twitter" class="h-[24px] w-[24px] cursor-pointer transition-opacity sm:h-[36px] hover:opacity-80"> <img src="/src/assets/img/discord.png" alt="Discord" class="h-[24px] w-[24px] cursor-pointer transition-opacity sm:h-[36px] hover:opacity-80"> <img src="/src/assets/img/github.png" alt="GitHub" class="h-[24px] w-[24px] cursor-pointer transition-opacity sm:h-[36px] hover:opacity-80"> <img src="/src/assets/img/vector.png" alt="Vector" class="h-[24px] w-[24px] cursor-pointer transition-opacity sm:h-[36px] hover:opacity-80">
                </div>
              </div> <div class="w-full text-center">
                <div class="w-full flex flex-row items-center justify-between text-[10px] text-white italic space-x-[40px]">
                  <div class="cursor-pointer transition-colors hover:text-[#73CC2E]">
                    Frequently Asked Questions (FAQ)
                  </div> <div class="cursor-pointer transition-colors hover:text-[#73CC2E]">
                    Contact us
                  </div> <div class="cursor-pointer transition-colors hover:text-[#73CC2E]">
                    Media reports
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </slot>
    </n-layout-footer>
  </n-layout>
</template>

<style scoped>
.footerBg {
  background: url('/src/assets/img/footerBg.png');
  background-size: 100% 100%;
}
</style>
