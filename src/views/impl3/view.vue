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
  <div class="container">
    <div>Framework</div>
    <div class="item">
      <button @click="createProxy">弹出 Proxy</button>
      <button @click="MessageBox.alert(() => data.message, data.title)">弹出 可变信息</button>
      <button @click="MessageBox.alert(data.message, data.title)">弹出 不可变</button>
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 4px
}
.item {
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>
