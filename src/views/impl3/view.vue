<script setup lang="ts">
import { computed, inject, reactive, ref, toRaw, toRef, toRefs } from 'vue'
import { useMessageBox } from './components'
const data = inject('message', { title: '', message: '' })
const MessageBox = useMessageBox()

const createProxy = () => {
  MessageBox.create(data)
}
</script>

<template>
  <div class="item">
    <button @click="createProxy">弹出 Proxy</button>
    <button @click="MessageBox.alert(() => data.message, data.title)">弹出 可变信息</button>
    <button @click="MessageBox.alert(data.message, data.title)">弹出 不可变</button>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>
