<template>
<div class="toast" v-show="isShow">
  <div>{{message}}</div>
</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message,time) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },time)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  background: rgba(0,0,0,0.75);
  padding: 10px 25px;
  color: #ffffff;
  border-radius: 5px;
  transform: translate(-50%,-50%);
}
</style>
