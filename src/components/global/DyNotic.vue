<script setup lang="ts">
import { makeStringProp } from '../common/props.js'

defineProps({
  title: makeStringProp(''),
  close: {
    type: Function,
    default: () => {},
  },
})
</script>

<template>
  <div class="z-1000 max-w-328px rounded-16">
    <div class="h-100% w-328px flex items-stretch">
      <div class="rounded-l-14 bg-primary p-14">
        <div class="i-material-symbols:settings-rounded bg-#fff text-25" />
      </div>
      <div class="flex flex-1 rounded-r-14 bg-#fff dark:bg-dark">
        <div class="flex-1 break-all p-16 font-500 dark:text-#fff">
          {{ title }}
        </div>
        <div class="p-14">
          <div class="i-material-symbols:cancel bg-secondary text-25" @click="close()" />
        </div>
      </div>
    </div>
  </div>
</template>
