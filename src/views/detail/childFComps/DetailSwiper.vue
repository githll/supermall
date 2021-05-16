<template>
    <swiper class="detailSwiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper/index'

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.detailSwiper {
  height: 300px;
}
</style>
