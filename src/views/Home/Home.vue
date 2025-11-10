<script setup lang="ts">

</script>

<template>
  <div class="pos-relative w-full">
    <div class="pos-fixed left-0 top-0 z-99 w-full">
      <div class="mx-auto mt-12 max-w-1440px">
        <Header />
      </div>
    </div>
    <!-- 1 -->
    <div class="bgImg z-11 h-[550px] w-full sm:h-880px">
      <div class="mx-auto max-w-1440px px-15px pt-88px md:pt-200px">
        <div class="textColor text-[36px] font-bold md:text-[60px]">
          {{ $t('天元 · 觉醒') }}
        </div>
        <div class="aos-init aos-animate text-[36px] text-[#1A1A1A] leading-[44px] font-[Bayon] uppercase md:text-[60px] md:leading-[78px]">
          <!-- the Era of Financial Sovereignty -->
          {{ $t('数字命运的主权时代') }}
        </div>
        <div data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate mb-[24px] mt-[12px] text-[16px] text-[#1A1A1A] leading-[28px] italic md:mt-[24px] md:w-[754px] md:text-[24px] md:leading-[38px]">
          {{ $t('天元链（Tengen）由算法货币 TGN 驱动，开启了一个以「灵性与主权」为核心的新纪元。在这个时代，命运不再是注定的，而是可被算法唤醒、可由共识重塑。') }}
          {{ $t('我们将易经哲理与区块链技术融合，让「推演未来」不再只是预测，而是一种参与——用户通过占卜、AI预测与金融操作，共同构建属于人类的数字文明自觉系统。隐私、自由与信任不再是口号，而是天元文明的底层算法。') }}
        </div>
        <div class="btnBg Roboto mt-50px h50px w180px flex items-center justify-center text-white italic">
          <!-- Enter App -->
          {{ $t('进入应用') }}
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="mx-auto max-w-[1440px] max-w-1440px w-full px-15px pb-[80px] pt-[80px] md:px-0 md:pb-[200px]">
      <!--  -->
      <div data-aos="fade-up" class="aos-init aos-animate mb-[30px] text-center text-[24px] text-[#1A1A1A] font-[Bayon] uppercase md:mb-[50px] md:text-[32px]">
        <!-- Agreement data statistics -->
        {{ $t('协议数据统计') }}
      </div>
      <!--  -->
      <div class="grid mb-[60px] gap-y-[40px] md:grid-cols-2 md:mb-[106px]">
        <!-- <div data-aos="fade-up" data-aos-delay="200" class="aos-init aos-animate text-left">
          <div class="text-[16px] leading-[38px] italic md:text-[24px]">
            Treasury value
          </div> <div class="gradient-text text-[40px] text-black leading-[40px] font-[Bayon] md:text-[60px] md:leading-[108px]">
            $ 9,992,783
          </div>
        </div> -->
        <div data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate md:text-center">
          <div class="text-[16px] leading-[38px] italic md:text-[24px]">
            <!-- TGN value -->
            {{ $t('TGN 值') }}
          </div> <div class="gradient-text text-[40px] text-black leading-[40px] font-[Bayon] md:text-[60px] md:leading-[108px]">
            $ 203,153,663
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="600" class="aos-init aos-animate md:text-center">
          <div class="text-[16px] leading-[38px] italic md:text-[24px]">
            <!-- Operation start time -->
            {{ $t('开始时间') }}
          </div> <div class="gradient-text text-[40px] text-black leading-[40px] font-[Bayon] md:text-[60px] md:leading-[108px]">
            {{ $t('Nov. 12, 2025') }}
          </div>
        </div>
      </div>
      <!--  -->
      <!-- <div style="border: 2px solid #73CC2E;" class="aos-init aos-animate box-border h-[186px] w-[335px] flex flex-row cursor-pointer items-center justify-center rounded-[6px] p-[6px] transition-opacity duration-300 md:h-[765px] md:w-full md:rounded-[30px] md:p-[24px] hover:opacity-90">
        <div class="relative h-full w-full">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/680hxlqEK80?autoplay=0&amp;rel=0&amp;modestbranding=1&amp;showinfo=0&amp;controls=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" class="h-full w-full rounded-[6px] md:rounded-[30px]" style="" />
        </div>
      </div> -->
    </div>
    <!-- 3 -->
    <div class="bgImg1 z-11 w-full flex flex-col items-center bg-cover bg-center bg-no-repeat pb-[80px] md:h-[1126px] md:px-0">
      <div data-aos="fade-up" data-aos-duration="800" class="aos-init aos-animate mb-[20px] pt-[120px] text-center text-[32px] text-white font-[Bayon] uppercase md:mb-[90px] md:w-full md:text-[60px]">
        <!-- <span>Awakening Protocol </span> <span class="text-[#1d4806]">Core System</span> -->
        <span>{{ $t('觉醒协议 · 核心系统') }}</span>
      </div>
      <div class="grid grid-cols-1 w-full items-center justify-between pb-[67px] md:grid-cols-2 md:max-w-[1440px]">
        <img src="/src/assets/img/qiu.png" alt="" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="600" class="aos-init aos-animate mx-auto max-w-[335px] w-full md:mr-[30px] md:max-w-[600px]"> <div class="grid grid-cols-1 w-full gap-y-[20px] md:grid-cols-2 md:flex-1 md:gap-y-[52px]">
          <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="500" class="aos-init aos-animate flex flex-row items-center px-15 px-15 pb-[20px] md:px-0 md:px-0" style="border-bottom: 1px solid #fff;">
            <div class="gradient-text2 mr-[20px] flex-shrink-0 text-[32px] font-[Bayon] md:text-[48px]">
              01
            </div> <div class="text-[18px] text-white font-bold md:text-[26px]">
              <!-- Stablecoin Reserve Contract -->
              {{ $t('占卜引擎') }}
            </div>
          </div> <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="500" class="aos-init aos-animate flex flex-row items-center px-15 pb-[20px] md:px-0" style="border-bottom: 1px solid #fff;">
            <div class="gradient-text2 mr-[20px] flex-shrink-0 text-[32px] font-[Bayon] md:text-[48px]">
              02
            </div> <div class="text-[18px] text-white font-bold md:text-[26px]">
              <!-- Privacy Payment Engine -->
              {{ $t('命运支付系统（A-Pay）') }}
            </div>
          </div> <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="500" class="aos-init aos-animate flex flex-row items-center px-15 pb-[20px] md:px-0" style="border-bottom: 1px solid #fff;">
            <div class="gradient-text2 mr-[20px] flex-shrink-0 text-[32px] font-[Bayon] md:text-[48px]">
              03
            </div> <div class="text-[18px] text-white font-bold md:text-[26px]">
              <!-- TGN Bond Generator -->
              {{ $t('TGN 键合合约') }}
            </div>
          </div> <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="500" class="aos-init aos-animate flex flex-row items-center px-15 pb-[20px] md:px-0" style="border-bottom: 1px solid #fff;">
            <div class="gradient-text2 mr-[20px] flex-shrink-0 text-[32px] font-[Bayon] md:text-[48px]">
              04
            </div> <div class="text-[18px] text-white font-bold md:text-[26px]">
              <!-- Taking Treasury -->
              {{ $t('灵性国库（Treasury）') }}
            </div>
          </div> <div data-aos="fade-up" data-aos-delay="700" data-aos-duration="500" class="aos-init aos-animate flex flex-row items-center px-15 pb-[20px] md:px-0" style="border-bottom: 1px solid #fff;">
            <div class="gradient-text2 mr-[20px] flex-shrink-0 text-[32px] font-[Bayon] md:text-[48px]">
              05
            </div> <div class="text-[18px] text-white font-bold md:text-[26px]">
              <!-- Liquidity Routing Machine -->
              {{ $t('流动性路由机') }}
            </div>
          </div> <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="500" class="aos-init aos-animate flex flex-row items-center px-15 pb-[20px] md:px-0" style="border-bottom: 1px solid #fff;">
            <div class="gradient-text2 mr-[20px] flex-shrink-0 text-[32px] font-[Bayon] md:text-[48px]">
              06
            </div> <div class="text-[18px] text-white font-bold md:text-[26px]">
              <!-- Anonymous Prize Protocol -->
              {{ $t('占卜挖矿协议') }}
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="900" data-aos-duration="500" class="aos-init aos-animate flex flex-row items-center px-15 md:px-0">
            <div class="w-full flex flex-row items-center">
              <div class="gradient-text2 mr-[20px] flex-shrink-0 text-[32px] font-[Bayon] md:text-[48px]">
                07
              </div> <div class="text-[18px] text-white font-bold md:text-[26px]">
                <!-- A Token Insurance Vault -->
                {{ $t('NFT灵签保险库') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 4 -->
    <div class="mx-auto max-w-[1440px] w-full flex flex-col items-center pb-[80px] pt-[80px] md:px-0 md:pb-[200px] md:pt-[283px]">
      <div class="aos-init aos-animate mb-[36px] w-[233px] text-center text-[32px] text-black font-[Bayon] uppercase md:mb-[100px] md:w-full md:text-[60px]">
        <!-- <span class="text-[#73CC2E]">Awakening Protocol </span> <span>Core System</span> -->
        <span>{{ $t('觉醒协议 · 核心系统') }}</span>
      </div>
      <div class="w-full text-[10px] text-[#1A1A1A] italic md:h-[560px] md:text-[24px]">
        <div class="flex flex-row justify-between">
          <div class="mechanism-box aos-init aos-animate box-border h-[66px] w-[89px] border rounded-[6px] bg-[#e9ffd4] px-[10px] py-[8px] text-center md:h-[120px] md:w-[340px] md:rounded-[24px] md:px-[39px] md:py-[32px]">
            TGN-USDT accumulates sufficient liquidity
          </div> <div class="mechanism-box aos-init aos-animate box-border h-[66px] w-[89px] border rounded-[6px] bg-[#e9ffd4] px-[10px] py-[8px] text-center md:h-[120px] md:w-[340px] md:rounded-[24px] md:px-[39px] md:py-[32px]">
            TGN single currency pledge compound interest
          </div> <div class="mechanism-box aos-init aos-animate box-border h-[66px] w-[89px] border rounded-[6px] bg-[#e9ffd4] px-[10px] py-[8px] text-center md:h-[120px] md:w-[340px] md:rounded-[24px] md:px-[39px] md:py-[32px]">
            Increase TGN casting volume
          </div>
        </div> <div class="flex flex-row justify-between">
          <div class="w-[89px] flex flex-row items-center justify-center md:w-[240px]">
            <img src="/src/assets/img/lineArrow1.png" alt="" class="arrow-animation h-[26px] md:h-[100px]">
          </div> <div class="w-[89px] flex flex-row items-center justify-center md:w-[240px]">
            <img src="/src/assets/img/lineArrow1.png" alt="" class="arrow-animation h-[26px] md:h-[100px]" style="animation-delay: 0.5s;">
          </div> <div class="w-[89px] flex flex-row items-center justify-center md:w-[240px]">
            <img src="/src/assets/img/lineArrow1.png" alt="" class="arrow-animation h-[26px] md:h-[100px]" style="animation-delay: 1s;">
          </div>
        </div>
        <div class="flex flex-row items-center justify-between">
          <div class="box-border h-[48px] w-[63px] flex flex-row items-center justify-center border border-[#73CC2E] rounded-[6px] bg-[#e9ffd4] text-center md:h-[120px] md:w-[240px] md:rounded-[24px]">
            Liquid bond
          </div> <div class="relative w-[73px] md:w-[360px]">
            <div class="absolute left-0 top-[4px] w-full text-center text-[8px] text-[#1A1A1A] md:top-[-28px] md:text-[22px]">
              LP
              purchase
            </div>
            <img src="/src/assets/img/lineArrow2.png" alt="" srcset="" class="w-full">
          </div> <div class="userBg box-border h-[48px] w-[63px] flex flex-row items-center justify-center rounded-[6px] bg-cover text-center text-[8px] text-white md:h-[120px] md:w-[240px] md:rounded-[24px] md:text-[26px]">
            User
          </div> <div class="relative w-[73px] md:w-[360px]">
            <div class="absolute left-0 top-[4px] w-full text-center text-[8px] text-[#1A1A1A] md:top-[-28px] md:text-[22px]">
              USDT
              purchase
            </div>
            <img src="/src/assets/img/lineArrow3.png" alt="" srcset="" class="w-full">
          </div> <div class="box-border h-[48px] w-[63px] flex flex-row items-center justify-center border border-[#73CC2E] rounded-[6px] bg-[#e9ffd4] text-center md:h-[120px] md:w-[240px] md:rounded-[24px]">
            Liquid bond
          </div>
        </div>
        <div>
          <div class="h-[36.07px] flex flex-row items-center justify-center text-[10px] md:h-[100px] md:text-[22px]">
            <div>
              Sales
            </div> <img src="/src/assets/img/lineArrow1.png" alt="" srcset="" class="h-[36.07px] md:h-[100px]"> <div>
              TGN
            </div>
          </div> <div class="mx-auto h-[48px] w-[151px] flex flex-row items-center justify-center border border-[#73CC2E] rounded-[6px] bg-[#e9ffd4] bg-opacity-70 md:h-[120px] md:w-[582px] md:rounded-[24px]">
            Treasury risk-free funds mint TGN
          </div>
        </div>
      </div>
    </div>
    <!-- 5 -->
    <div class="stakingBg z-11 box-border w-full flex flex-row justify-center bg-cover bg-center px-[20px] pb-[145px] pt-[44px] md:h-[877px] md:px-0 md:pt-[120px]">
      <div class="flex flex-row flex-wrap md:w-[1440px] md:justify-between">
        <div data-aos="fade-right" class="aos-init aos-animate md:pt-[40px]">
          <div class="mb-[20px] text-[32px] text-white font-[Bayon] uppercase md:h-[108px] md:text-[60px]">
            <!-- <span>Staking income </span> <span class="gradient-text2">forecast</span> -->
            <!-- <span>Staking income </span> <span class="gradient-text2">forecast</span> -->
            <span>{{ $t('质押 · 预测') }}</span>
          </div> <div class="mb-[32px] text-[16px] text-white leading-[24px] italic md:mb-[78px] md:h-[210px] md:w-[674px] md:text-[20px] md:leading-[42px]">
            <!-- Stake TGN, awaken value. By participating in the new algorithmic issuance engine, users can
            earn rewards through a dual-track system combining non-stable TGN and stable A. Returns are
            adjusted based on ecosystem demand and user contribution. -->
            {{ $t('质押 TGN，即是觉醒未来。通过接入天元的算法发行引擎，用户可参与双轨系统：非稳定币 TGN + 稳定币 A 的组合将持续产生收益与治理权。收益比例根据系统需求、社区活跃度与生态总锁仓量动态调整，确保整个系统处于「自平衡、自增长、自演化」状态。每一次质押，既是参与，也是一次“命运投射”。') }}
          </div>
        </div> <div data-aos="fade-left" data-aos-delay="200" class="aos-init aos-animate relative h-[443.65px] w-[335px] md:h-[637px] md:w-[481px]">
          <img src="/src/assets/img/3d.png" alt="" srcset="" class="floating" style="width: 100%; height: 100%;">
          <div data-aos="slide-up" data-aos-delay="400" class="mbl aos-init aos-animate absolute bottom-[-10px] right-[-10px] box-border h-[79px] w-[355px] flex flex-col justify-between rounded-[6px] border-solid p-[16px] text-white italic md:bottom-[-19px] md:right-[311px] md:h-[200px] md:w-[1129px] md:rounded-[24px] md:py-[32px] md:pl-[70px]">
            <div class="flex flex-row items-center">
              <div class="mr-[20px] w-[68px] text-[10px] md:mr-[92px] md:w-[161px] md:text-[24px]">
                Time
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">30</span><span> Days</span>
                </div>
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">60</span><span> Days</span>
                </div>
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">90</span><span> Days</span>
                </div>
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">180</span><span> Days</span>
                </div>
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">365</span><span> Days</span>
                </div>
              </div>
            </div> <div class="flex flex-row items-center md:mt-[20px]">
              <div class="mr-[20px] w-[68px] text-[10px] md:mr-[92px] md:w-[161px] md:text-[24px]">
                Compound interest income
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">43%</span>
                </div>
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">105%</span>
                </div>
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">193%</span>
                </div>
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">763%</span>
                </div>
              </div> <div class="w-[50px] flex flex-row text-[8px] md:w-[156px] md:text-[20px]">
                <div>
                  <span class="text-[12px] md:text-[34px]">7909%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 6 -->
    <div class="mx-auto w-full flex flex-col items-center pb-[80px] pt-[161px] md:max-w-[1440px] md:px-0 md:py-[200px]">
      <div data-aos="fade-up" class="aos-init aos-animate mb-[40px] text-[32px] text-black font-[Bayon] uppercase md:mb-[100px] md:text-[60px]">
        <!-- <span>How to </span> <span class="gradient-text2">participate</span> -->
        <span>{{ $t('流动性 · 自由') }}</span>
      </div>
      <div class="grid grid-cols-1 mb-[40px] px-10px md:grid-cols-2 md:mb-0 md:px-0">
        <img src="/src/assets/img/yyz.png" style="width: 100%; height: 100%;" alt="" data-aos="fade-right" data-aos-delay="200" class="aos-init aos-animate rounded-tl-[24px] rounded-tr-[24px] md:rounded-tr-[0px]"> <div data-aos="fade-left" data-aos-delay="400" class="aos-init aos-animate box-border border border-[#73CC2E] rounded-b-[24px] border-solid px-[24px] py-[32px] md:rounded-b-[0px] md:rounded-tr-[24px] md:pl-[104px] md:pt-[94px]">
          <div class="mb-[20px] text-[24px] text-black font-[Bayon] uppercase md:mb-[30px] md:text-[44px]">
            <!-- Provide liquidity. -->
            {{ $t('提供流动性') }}
          </div> <div class="mb-[48px] text-[16px] leading-[24px] italic md:mb-[94px] md:w-[514px] md:text-[24px] md:leading-[42px]">
            <!-- Provide liquidity to the TGN/A pool and earn yield from every transaction in the ecosystem.
            Participation fuels the birth of stablecoin. -->
            {{ $t('为 TGN/A 池提供流动性，即是成为文明的建构者。您将从每一次交易中分享收益，同时推动天元稳定币的生成与系统的稳定运行。') }}
          </div>
          <div class="btnBg Roboto mt-50px h50px w180px flex items-center justify-center text-white italic">
            <!-- Get to know -->
            {{ $t('了解') }}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 px-10px md:grid-cols-2 md:px-0">
        <div data-aos="fade-right" data-aos-delay="600" class="aos-init aos-animate box-border border border-[#73CC2E] rounded-t-[24px] border-solid px-[24px] py-[32px] md:rounded-t-[0px] md:rounded-bl-[24px] md:pl-[104px] md:pt-[94px]">
          <div class="mb-[30px] text-[24px] text-black font-[Bayon] uppercase md:text-[44px]">
            <!-- Loan mortgage. -->
            {{ $t('贷款抵押') }}
          </div> <div class="mb-[48px] text-[16px] leading-[24px] italic md:mb-[94px] md:w-[514px] md:text-[24px] md:leading-[42px]">
            <!-- Stake TGN to generate Stablecoin. Use A for anonymous payment, DAO governance, and borderless
            DeFi interactions—without disclosing your identity. -->
            {{ $t('质押 TGN，即可生成稳定币 A。A 不仅是支付工具，更是您进入天元生态的“隐形通行证”：它可用于匿名支付、DAO 治理与 DeFi 交互，让您在无须暴露身份的情况下，畅游金融主权世界。在天元链的世界里，自由 = 算法 + 信任 + 匿名权利。') }}
          </div>
          <div class="btnBg Roboto mt-50px h50px w180px flex items-center justify-center text-white italic">
            <!-- Participate now -->
            {{ $t('立即参与') }}
          </div>
        </div> <img src="/src/assets/img/xp.png" style="width: 100%; height: 100%;" alt="" data-aos="fade-left" data-aos-delay="800" class="aos-init aos-animate rounded-bl-[24px] rounded-br-[24px] md:rounded-bl-[0px]">
      </div>
    </div>
    <!-- 7 -->
    <div class="w-full flex flex-col items-center bg-[rgba(115,204,46,0.1)] pb-[60px] pt-[60px] md:h-[958px] md:pb-0 md:pt-[120px]">
      <div data-aos="fade-up" class="aos-init aos-animate mb-[10px] w-full text-center text-[32px] text-black font-[Bayon] uppercase md:max-w-[1440px] md:text-[60px]">
        <!-- <span class="gradient-text2">Tengen </span> <span> ecological planning</span> -->
        <span>{{ $t('天元生态进化 · 路线规划') }}</span>
      </div> <div data-aos="fade-up" data-aos-delay="200" class="aos-init aos-animate mb-[84px] hidden w-full flex-row items-center justify-between px-4 md:max-w-[1440px] md:flex md:px-0">
        <div class="h-[1px] max-w-[1222px] flex-1 bg-[#9E8C8A]" /> <img src="/src/assets/img/moreArrow.png" alt="" class="ml-4 h-[46px] w-[184px]">
      </div> <div class="grid grid-cols-1 w-full gap-y-[40px] px-4 md:grid-cols-3 md:max-w-[1440px] md:px-0">
        <div data-aos="fade-up" data-aos-delay="300" class="plan-card aos-init aos-animate hoverBg mx-20px box-border h-[396px] w-[335px] overflow-hidden border border-[#73CC2E] rounded-[24px] border-solid bg-white px-[16px] py-[36px] transition-all duration-300 md:mx-0 md:h-[458px] md:w-[440px] hover:border-transparent hover:bg-cover hover:bg-center md:px-[36px]">
          <div class="flex flex-row items-center justify-between">
            <div class="plan-card-text text-[50px] text-[#73CC2E] font-[Bayon] transition-colors duration-300">
              1.0
            </div> <div class="plan-card-circle h-[80px] w-[80px] flex flex-row items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)]">
              <img src="/src/assets/img/plan1.svg" alt="" class="plan-card-icon h-[48px] w-[48px] transition-all duration-300">
            </div>
          </div> <div class="plan-card-text mb-[22px] mt-[33px] text-[32px] font-[Bayon] uppercase transition-colors duration-300 md:mt-[38px]">
            <!-- Tengen Stage -->
            {{ $t('阶段 · 启元') }}
          </div> <div class="plan-card-text text-[20px] leading-[30px] italic transition-colors duration-300">
            <!-- Build a non-stablecoin issuance flywheel, complete the native incentive mechanism of the TGN
            protocol -->
            {{ $t('构建非稳定币 TGN 的发行飞轮，完善核心协议与占卜经济模型。AI 占卜、NFT 灵签、质押系统上线，形成最初的灵性经济形态。') }}
          </div>
        </div> <div data-aos="fade-up" data-aos-delay="500" class="plan-card aos-init aos-animate hoverBg mx-20px box-border h-[396px] w-[335px] overflow-hidden border border-[#73CC2E] rounded-[24px] border-solid bg-white px-[16px] py-[36px] transition-all duration-300 md:mx-0 md:h-[458px] md:w-[440px] hover:border-transparent hover:bg-cover hover:bg-center md:px-[36px]">
          <div class="flex flex-row items-center justify-between">
            <div class="plan-card-text text-[50px] text-[#73CC2E] font-[Bayon] transition-colors duration-300">
              2.0
            </div> <div class="plan-card-circle h-[80px] w-[80px] flex flex-row items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)]">
              <img src="/src/assets/img/plan2.svg" alt="" class="plan-card-icon h-[48px] w-[48px] transition-all duration-300">
            </div>
          </div> <div class="plan-card-text mb-[22px] mt-[33px] text-[32px] font-[Bayon] uppercase transition-colors duration-300 md:mt-[38px]">
            <!-- Awakening Stage -->
            {{ $t('阶段 · 觉醒') }}
          </div> <div class="plan-card-text text-[20px] leading-[30px] italic transition-colors duration-300">
            <!-- Launch of Stablecoin + Privacy Payment Protocol A Pay, initiating the era of crypto
            sovereignty -->
            {{ $t('推出稳定币 A 与隐私支付协议 A Pay，进入加密金融主权时代，开启跨生态支付与匿名结算网络。') }}
          </div>
        </div> <div data-aos="fade-up" data-aos-delay="700" class="plan-card aos-init aos-animate hoverBg mx-20px box-border h-[396px] w-[335px] overflow-hidden border border-[#73CC2E] rounded-[24px] border-solid bg-white px-[16px] py-[36px] transition-all duration-300 md:mx-0 md:h-[458px] md:w-[440px] hover:border-transparent hover:bg-cover hover:bg-center md:px-[36px]">
          <div class="flex flex-row items-center justify-between">
            <div class="plan-card-text text-[50px] text-[#73CC2E] font-[Bayon] transition-colors duration-300">
              3.0
            </div> <div class="plan-card-circle h-[80px] w-[80px] flex flex-row items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)]">
              <img src="/src/assets/img/plan3.svg" alt="" class="plan-card-icon h-[48px] w-[48px] transition-all duration-300">
            </div>
          </div> <div class="plan-card-text mb-[22px] mt-[33px] text-[32px] font-[Bayon] uppercase transition-colors duration-300 md:mt-[38px]">
            <!-- Eternal Stage -->
            {{ $t('阶段 · 永恒') }}
          </div> <div class="plan-card-text text-[20px] leading-[30px] italic transition-colors duration-300">
            <!-- Protocol ecology is fully autonomous, multi-chain interconnected, civilization self-evolving -->
            {{ $t('生态系统进入完全自治状态，形成多链互联、AI驱动、自我演化的文明系统。天元链不再只是区块链，而是数字命运的秩序引擎。') }}
          </div>
        </div>
      </div>
    </div>
    <!-- 8 -->
    <div class="freedom">
      <div class="mx-auto w-full flex flex-col items-center px-4 pb-[208px] pt-[72px] md:max-w-[1440px] md:px-0 md:pt-[200px]">
        <div data-aos="fade-up" class="aos-init aos-animate mb-[40px] w-full text-center text-[32px] text-black font-[Bayon] uppercase md:mb-[54px] md:text-[60px]">
          <!-- <span>Tengen's Creed </span> <span class="gradient-text2"> of Freedom</span> -->
          <span>{{ $t('天有元气，地有常道，人有主权，链有天命。') }}</span>
        </div>
        <div class="max-w-[1280px] px-15px text-center text-[20px] leading-[40px] md:text-[24px] md:leading-[48px]">
          <p data-aos="fade-up" data-aos-delay="200" class="aos-init aos-animate">
            <!-- We believe every individual has the right to economic
            privacy and autonomous currency issuance.
            TENGEN is building a digital civilization where algorithmic creation, anonymous exchange, and
            self-sovereign assets are no longer future ideals—but present realities. -->
            {{ $t('天元链（Tengen）用算法复刻命运，用共识构建主权。这是一场关于觉醒的实验，也是人类数字文明的再生。欢迎来到 天元纪元。') }}
          </p>
          <!-- <p data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate">
            <span class="text-[#73CC2E]">①</span> TGN represents
            algorithmic freedom—decentralized,
            programmable, and resistant to inflationary coercion.
          </p>
          <p data-aos="fade-up" data-aos-delay="600" class="aos-init aos-animate">
            <span class="text-[#73CC2E]">②</span> Stablecoin is the
            shield of privacy—enabling cross-chain
            transactions and payments without surveillance or censorship.
          </p>
          <p data-aos="fade-up" data-aos-delay="800" class="aos-init aos-animate">
            <span class="text-[#73CC2E]">③</span> A Pay empowers
            every wallet with the ability to act
            anonymously, bridging the gap between freedom and function.
          </p>
          <p data-aos="fade-up" data-aos-delay="1000" class="aos-init aos-animate">
            <span class="text-[#73CC2E]">④</span> We build not just
            a financial system, but a civilization
            layer
            where technology, values, and trust are symbiotic.
          </p>
          <p data-aos="fade-up" data-aos-delay="1200" class="aos-init aos-animate">
            <span class="text-[#73CC2E]">⑤</span> In this era of
            awakening, TENGEN is not merely a
            protocol—it is
            the awakening force of a new financial humanity.
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style  scoped>
.bgImg {
  background-image: url('../../../src/assets/img/banner.png');
  background-size: cover;
  background-position: right;
}
.bgImg1 {
  background-image: url('../../../src/assets/img/bg1.png');
  background-size: cover;
  background-position: right;
}
.stakingBg {
  background-image: url('../../../src/assets/img/stakingBg.png');
  background-size: cover;
  background-position: right;
}
.userBg {
  background-image: url('../../../src/assets/img/userBg.png');
  background-size: cover;
  background-position: right;
}
.textColor {
  background: linear-gradient(to right, #9dc35b, #74b154);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.btnBg {
  background: url('/src/assets/img/bannerBtn.png') no-repeat;
  background-size: 100% 100%;
}
.gradient-text {
  background: linear-gradient(to right, rgb(115, 204, 46), #0d1624);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.gradient-text2 {
  background: linear-gradient(to right, #629901, #4d8d2b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.mbl {
  background: linear-gradient(270deg, #1a1a1a 10%, rgba(26, 26, 26, 0) 100%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
}
.hoverBg:hover {
  background: url('/src/assets/img/planBg.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
}
.plan-card:hover .plan-card-circle {
  background-color: rgba(115, 204, 46, 0.8) !important;
  opacity: 0.8;
}
.plan-card:hover .plan-card-icon {
  filter: brightness(0) invert(1);
  opacity: 0.8;
}
.freedom {
  width: 100%;
  background-image: url('/src/assets/img/freedomBg.png');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
