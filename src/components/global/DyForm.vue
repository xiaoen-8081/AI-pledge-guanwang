<script setup>
const formValue = ref({})
</script>

<template>
  <n-form :show-feedback="false" label-placement="left" inline :model="formValue">
    <n-form-item label="区块哈希或者块高">
      <n-input v-model:value="formValue.val" placeholder="区块哈希或者块高" />
    </n-form-item>
    <n-form-item>
      <n-flex>
        <NButton strong gost type="primary">
          <span>搜索</span>
        </NButton>
        <NButton strong secondary type="info">
          <span>重制</span>
        </NButton>
      </n-flex>
    </n-form-item>
  </n-form>
</template>

<style scoped>

</style>
