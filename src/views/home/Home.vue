<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control :titles="['流行','新款','精选']"
               @tabClick="tabClick"
               ref="tabControl1"
               class="tabControl1"
               v-show="isTabControlShow"/>

  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">

    <home-swiper :banners="banners"
                 @swiperImageLoad="swiperImageLoad"/>

    <recommend-view :recommends="recommends"/>

    <feature-view/>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"
                 :class="{fixed: isTabControlShow}"/>

    <goods-list :goods="showGoods"/>
  </scroll>

  <back-top @click.native="backClick" v-show="isProbeTypeShow"/>
</div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import {itemListenerMixin,listenShowBackTop} from "@/common/mixin"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin,listenShowBackTop],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',  //设置默认商品类型的参数
      isTabControlHeight: 0,  //设置变量存储TabControl组件到顶部的高度
      isTabControlShow: false, //用于监听TabControl组件何时显示
      saveY: 0, //保存scroll Y值
    }
  },
  created() {
    //1.请求多个数据
   this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {

  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //事件监听相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    contentScroll(position) {
      //判断back-top组件是否显示,调用的混入mixin里面的方法
      this.listenShowBackTop(position)
      //判断TabControl组件当前的高度
      this.isTabControlShow = (-position.y) > this.isTabControlHeight
      this.$refs.scroll.refresh()


    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.isTabControlHeight = this.$refs.tabControl2.$el.offsetTop
    },

    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    //上拉 加载更多
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.pullingUp()
      })
    }
  },
  activated() {  //当进入组件时调用
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() { //离开组件时调用
    //1.保存离开时的Y值
   this.saveY = this.$refs.scroll.getScrolly()

    //2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
.home-nav {
  background-color: #ff8198;
}
.home-nav div {
  color: #ffffff;
}

#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
}

.tabControl1 {
  position: relative;
  z-index: 9;
}
</style>
