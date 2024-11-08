<script lang="ts" setup>
import { ref } from 'vue'
import { BaseMessageBox } from '@components'
const props = defineProps({
  title: [String],
  message: [String, Function],
  to: [Object, String]
})

const isDestory = ref(false)
const handleClose = () => {
  isDestory.value = true
}

</script>

<template>
  <teleport :to="to ?? 'body'" v-if="!isDestory">
    <base-message-box v-bind="props" @close="handleClose">
      <slot></slot>
    </base-message-box>
  </teleport>

</template>