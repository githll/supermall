<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper/index"

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isShow: false
    }
  },
  props: {
    banners : {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    swiperImageLoad() {
      //只需要发射一次，得到一张图片的高度就好了，因为有4张轮播图，避免执行4次
      if(!this.isShow){
        this.$emit('swiperImageLoad')
        this.isShow = true
      }
    }
  }
}
</script>

<style scoped>

</style>
