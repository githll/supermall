<template>
  <div class="tab-bar-item" >
    <div @click="itemClick" >
      <div v-if="!isActive"><slot name="itme-icon"></slot></div>
      <div v-else><slot name="itme-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // path:'/home'
    }
  },
  props: {
      path: String,
      activeColor:{
        type: String,
        default: 'red'
      }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex-basis: 100%;
  text-align: center;
  height: 49px;
  font-size: 14px;

}

.tab-bar-item img {
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
}
</style>
