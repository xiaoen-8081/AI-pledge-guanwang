<script setup lang="ts">
import { makeBooleanProp, makeStringProp } from '../common/props'

defineProps({
  show: makeBooleanProp(false),
  iconClass: makeStringProp(''),
})
</script>

<template>
  <div
    class="i-carbon:chevron-down text-20 transition-all-200"
    :class="[iconClass, show ? 'rotate-180 ' : 'rotate-0']"
  />
</template>
