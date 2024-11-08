<script lang="ts" setup>
import { ref, VNode } from 'vue'
import { MessageBoxProps } from '.'
import { BaseMessageBox } from '@components'
const props = defineProps<MessageBoxProps>()
defineSlots<{default:() => VNode | string}>()
const emit = defineEmits<{
  close: []
}>()
const isDestory = ref(false)
const handleClose = () => {
  isDestory.value = true
  emit('close')
}

</script>

<template>
  <teleport :to="to ?? 'body'" v-if="!isDestory">
    <base-message-box v-bind="props" @close="handleClose">
      <slot></slot>
    </base-message-box>
  </teleport>
</template>