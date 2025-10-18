<script setup lang="ts">
import { makeNumericProp } from '../common/props.js'

defineProps({
  hours: makeNumericProp(0),
  minutes: makeNumericProp(0),
  seconds: makeNumericProp(0),
})
</script>

<template>
  <div class="flex dark:text-primary">
    <div v-if="hours !== '00'" class="bg h-40 w-54 flex-row-center rounded-10 text-28 font-600">
      {{ hours }}
    </div>
    <div v-if="hours !== '00'" class="px-6 text-28 font-600">
      :
    </div>
    <div class="bg h-40 w-54 flex-row-center rounded-10 text-28 font-600">
      {{ minutes }}
    </div>
    <div class="px-10 text-28 font-600">
      :
    </div>
    <div class="bg h-40 w-54 flex-row-center rounded-10 text-28 font-600">
      {{ seconds }}
    </div>
  </div>
</template>

<style scoped>
.dark .bg {
  border: 0.5px solid #4c4c4c;
  background: linear-gradient(180deg, #101116 0%, #202125 48%, #101116 100%);
}
.bg {
  border: 0.5px solid #a8a8a8;
  background: linear-gradient(180deg, #ffffff 0%, #bcbec4 48%, #ffffff 100%);
}
</style>
