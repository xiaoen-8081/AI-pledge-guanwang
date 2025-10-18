<script setup lang="ts">
import banner from '@/assets/image/abount/banner.png'
import one from '@/assets/image/abount/one.png'
import two from '@/assets/image/abount/two.png'
import three from '@/assets/image/abount/three.png'
import fore from '@/assets/image/abount/fore.png'

const info = [
  {
    src: one,
    title: '开放的生态链接',
    detail: '多年企业及行业服务经验，成熟的商业咨询团队，专业化场景解决方案。在数字银行、金融监管、资产数字化等多领域落地实际应用',
  },
  {
    src: two,
    title: '丰富的行业经验',
    detail: '开放合作，携手共进，提供开放创新的区块链生态服务和业务合作模式，推动区块链技术落地与发展，服务实体经济',
  },
  {
    src: three,
    title: '先进的底层技术',
    detail: '以区块链跨链、NFT 技术及大数据隐私保护技术为核心，拥有自主研发、安全可控的区块链底层技术实カ',
  },
  {
    src: fore,
    title: '成熟的产品应用',
    detail: '拥有自主知识产权的企业级区块链产品-IRITA 产品系列，支持下一代分布式商业应用，满足复杂业务场景',
  },
]

const imgBaseModule = import.meta.glob<true, string, any>('../assets/image/companion/**/*.png', { eager: true })

const imgs = computed(() => {
  const img = Object.values(imgBaseModule)
  console.log(12312, img[0].default)
  return img
})
console.log(11, imgBaseModule, imgs.value)
</script>

<template>
  <Page>
    <template #content>
      <div class="container p-15">
        <n-flex vertical :size="20">
          <img class="w-full" :src="banner" alt="" srcset="">

          <n-card :bordered="false" class="">
            <n-flex vertical :size="20">
              <span class="text-center text-24 font-500">师石链的发起</span>
              <div class="text-textColor2 line-height-relaxed">
                师石数藏，是响应『数字中国 中国数字』号召，以『拟真立范』及师石链技术构建的面向全球用户的师石数字藏品交易区块链服务平台，是集“数字藏品铸造、数字藏品运营、新质生产力赋能、价值回归”于一体的生态链。
              </div>
              <div class="mx-auto text-center">
                <DyLogo />
              </div>
              <div class="text-textColor2 line-height-relaxed">
                师石数藏以《数字经济促进共同富裕实施方案》、《关于加快推进区块链技术和产业创新发展指导意见》等政策为依托，坚持以“共同富裕”和“不获利原则”为导向，秉承“一元”价值理念，以大数据、人工智能、区块链、『拟真立范』等新质生产力为支撑，以天然师石财富共享为“锚定”，以销售资金第三方托管为“保障”，以用户共同决策投资方向为“抓手”，以师石数字藏品为载体，打造“虚实结合、资产共有、财富共享”的数字经济发展新范式，致力于实现数字经济共有、共治、共享……师石数藏，也是数字化时代中国奇石产业的大变革——从实物展陈到 3D 数字空间，从实物买卖到链上发行，从文化传播到数据价值，从面向石头爱好者到面向全人类用户，师石数藏为全球用户构建师石数藏生态，构筑师石精神家园，构䈇师石多元世界，是元宇宙中的好产品——元宇宙元。
              </div>
            </n-flex>
          </n-card>
          <div class="mx-auto text-center text-24 font-500">
            核心能力与优势
          </div>
          <n-grid responsive="screen" cols="1 s:2" x-gap="15" y-gap="15">
            <n-gi v-for="(item, index) in info" :key="index">
              <n-card :bordered="false">
                <n-flex vertical align="center" :size="16">
                  <img :src="item.src" alt="" class="w-52">
                  <span>{{ item.title }}</span>
                  <div class="text-center text-14 text-textColor2">
                    {{ item.detail }}
                  </div>
                </n-flex>
              </n-card>
            </n-gi>
          </n-grid>

          <div class="mx-auto text-center text-24 font-500">
            合作伙伴
          </div>
          <n-grid responsive="screen" cols="2 s:3 m:4" x-gap="15" y-gap="15">
            <n-gi v-for="(item, index) in imgs" :key="index">
              <img :src="item.default" alt="" class="w-full opacity-70">
            </n-gi>
          </n-grid>
        </n-flex>
      </div>
      <Bottom />
    </template>
  </Page>
</template>

<route lang="json">
  {
    "name": "Abount",
    "meta": {
      "activeMenu": "Abount",
      "title": "Abount"
    }
  }
  </route>
