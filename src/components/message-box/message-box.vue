<script lang="ts" setup>
defineProps({
  title: [String],
  message: [String, Object, Function],
  to: [Object, String]
})
const emit = defineEmits(['close'])
const handleClick = () => {
  emit('close')
}

</script>

<template>
  <div class="wrapper">
    <div class="message-box">
      <div class="title"><span>{{ title }}</span></div>
      <div class="message">
        <p>
          <slot>{{ message }}</slot>
        </p>
      </div>
      <div class="buttons">
        <button @click="handleClick">确定</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper{
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgb(6 6 12 / 50%)
}
.message-box {
  display: inline-flex;
  width: 480px;
  padding: 2em;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #888888;
  box-shadow: 1px 1px 6px rgb(0 0 0 / 40%);
  flex-direction: column;

  .title {
    font-size: 16px;
  }

  .message {
    font-size: 14px;
    padding-top: 6px;
  }

  .buttons {
    display: flex;
    flex-direction: row-reverse;
    font-size: 14px;
    padding-top: 24px;

    button {
      transition: all .3s;
      user-select: none;
      outline: none;
      height: 36px;
      line-height: 1;
      padding: 0 24px;
      background: #1141c7;
      border: 1px solid #1141c7;
      color: white;
      border-radius: 4px;

      &:hover {
        background: #5970f0;
        border-color: #5970f0;
      }

      &:active {
        background: #042fa5;
        border-color: #042fa5;
      }
    }
  }
}
</style>