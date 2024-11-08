<script lang="ts" setup>
import { Comment, getCurrentInstance, onBeforeMount, onMounted, provide, shallowReactive, VNode } from 'vue'
import { FrameworkPopperContextToken, FrameworkInstances } from './framework';



const popper = (() => {

  const list = shallowReactive(new Set())
  const append = (vnode: VNode) => {
    list.add(vnode)
  }
  const remove = (vnode: VNode) => {
    list.delete(vnode)
  }
  return {
    list,
    append,
    remove
  }
})()

const context = provide(FrameworkPopperContextToken, popper)
onMounted(() => FrameworkInstances.add(context))
onBeforeMount(() => FrameworkInstances.delete(context))

</script>

<template>
  <slot></slot>
  <template v-for="item of popper.list" v-memo="item">
    <component :is="item" :vnode="item"></component>
  </template>
</template>