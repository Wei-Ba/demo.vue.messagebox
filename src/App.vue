<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, provide, reactive } from 'vue'
import { viewNames } from './router'
const count = ref(0)
const title = computed(() => `提示 ${count.value}`)
const message = computed(() => `这是一个消息提示 ${count.value}`)

onMounted(() => {
  const handle = setInterval(() => {
      count.value++
  }, 1000);
  onUnmounted(() => { clearInterval(handle) })
})

provide('message', reactive({title, message}))

</script>

<template>
  <div class="wrapper">
    <div v-for="name in viewNames">
      <div class="title">{{ name }}</div>
      <router-view :name="name"></router-view>
    </div>
  </div>
</template>

<style scoped>
.title{
  text-align: center;
  margin: 6px;
}
.wrapper{
  display: flex;
  flex-direction: column;
  gap: 12px
}
</style>
