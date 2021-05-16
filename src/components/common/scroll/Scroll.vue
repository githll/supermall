<template>
 <div class="wrapper" ref="wrapper">
   <div class="content">
     <slot></slot>
   </div>
 </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //  probeType: 0,1 都是不实时侦测位置的
      //  probeType: 2在手指滚动的过程中侦测，手指离开后惯性滚动过程中不侦测
      //  probeType: 3只要滚动都侦测
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad, //上拉加载更多
      click: true //内部可以进行点击事件
    })

    //2.监听滚动事件的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }
    //3.监听上拉事件

    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
    })
  },
   methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y ,time)
    },
     pullingUp() {
       this.scroll && this.scroll.finishPullUp()
     },
     refresh() {
       this.scroll && this.scroll.refresh()
     },
     getScrolly() {
      return this.scroll ? this.scroll.y : 0
     }
  }
}
</script>

<style scoped>

</style>
