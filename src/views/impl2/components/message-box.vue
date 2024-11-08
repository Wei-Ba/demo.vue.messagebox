<script lang="ts" setup>
import { ref, watch } from 'vue'
import { MessageBoxProps } from '.'
import { BaseMessageBox } from '@components'
const props = defineProps<MessageBoxProps>()
const emit = defineEmits<{
  close: []
}>()
watch(() => props, () => {
  console.log(props)
})
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