<script setup lang="ts">

</script>

<template>
  <div class="bg">
    <div class="container p-15">
      <n-grid responsive="screen" cols="1 m:2" x-gap="15" y-gap="15">
        <n-gi>
          <n-flex vertical :size="16">
            <span class="text-20">联系我们</span>
            <n-flex vertical :size="2" class="text-text-color2">
              <span class="text-12">联系电话</span>
              <span class="text-14">025-66886688</span>
            </n-flex>
            <n-flex :size="2" class="text-text-color2">
              <span class="text-12">邮箱：shishichain@mail.com</span>
              <span class="text-12">地址：江苏省南京市玄武湖区前线大院</span>
            </n-flex>
          </n-flex>
        </n-gi>
        <n-gi>
          <n-flex :size="20">
            <n-flex vertical>
              <span>App下载</span>
              <n-qr-code style="padding: 5px;" :size="90" value="asdas2313213123" />
            </n-flex>
            <n-flex vertical>
              <span>小程序码</span>
              <n-qr-code style="padding: 5px;" :size="90" value="asdas2313213123" />
            </n-flex>
            <n-flex vertical :size="2">
              <span>PC链接</span>
              <span>www.shishichain.com/pc</span>
            </n-flex>
          </n-flex>
        </n-gi>
      </n-grid>

      <div class="pt-20 text-center text-textColor2">
        江苏网信备31011521343153030049号Copyright © 2023-2025 三化一权产教技能服务(江苏)有限公司
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  width: 100vw;
  height: auto;
  background-image: url(../../assets/image/bottom.png);
  background-size: 100% 100%;
}
</style>
