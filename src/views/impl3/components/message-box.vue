<script lang="ts" setup>
import { MessageBoxProps } from './message-box'
import { BaseMessageBox } from '@components'
const props = defineProps<MessageBoxProps>()
const emit = defineEmits<{
  close: []
}>()
const handleClose = () => {
  props.__close__?.()
  emit('close')
}

</script>

<template>
  <teleport :to="to ?? 'body'">
    <base-message-box v-bind="props" @close="handleClose">
      <slot></slot>
    </base-message-box>
  </teleport>
</template>