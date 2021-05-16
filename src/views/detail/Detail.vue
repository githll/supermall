<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
  <scroll class="content"
          ref="scroll"
          @scroll="contentScroll"
          :probe-type="3">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="goodsList" :goods="recommends"/>
  </scroll>
  <detail-bottom-bar @addCart="addToCart"/>
  <back-top @click.native="backClick" v-show="isProbeTypeShow"/>
<!--  <toast/>-->
</div>
</template>

<script>
//Detail相关组件的引用
import DetailNavBar from "@/views/detail/childFComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childFComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childFComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childFComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childFComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childFComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childFComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childFComps/DetailBottomBar";
import {itemListenerMixin,listenShowBackTop} from "@/common/mixin"
import {debounce} from "@/common/util"

// import Toast from "@/components/common/toast/Toast";

import {mapActions} from 'vuex'  //用于映射vuex里面的actions里的方法

//网络相关请求
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";


export default {
  name: "Detail",
  components: {
    DetailShopInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    // Toast
  },
  mixins:[itemListenerMixin,listenShowBackTop],
  data() {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [], //保存商品，参数，评论，推荐的到顶部参数
      getThemeTopY: null, //保存执行的防抖函数
      currentIndex: 0 //用于放置平凡更新positionY值
    }
  },
  created() {
    //1.保存传入的ID,获取iid
    this.iid = this.$route.query.iid
    // this.iid = this.$route.params.iid

    //2.请求详情页数据
    getDetail(this.iid).then( res => {
      console.log(res);
      //1.获取数据
      const data = res.data.result

      //2.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages

      //3.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //4.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //5.保存商品的详情数据
      this.detailInfo = data.detailInfo

      //6.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //7.获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
    //3.获取推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list
    })

    //对数据进行防抖操作
    this.getThemeTopY = debounce(()=> {
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },200)
  },
  methods: {
    ...mapActions(['addCart']),  //映射vuex里面actions的方法

    titleClick(index) {
      console.log(this.themeTopYs);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    contentScroll(position) {
      //1.获取position的y值
      const positionY = -position.y
      //2.判断到什么位置具体显示什么值
      for(let i = 0; i < this.themeTopYs.length-1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //3.回到顶部按钮. 判断back-top组件是否显示,调用的混入mixin里面的方法
      this.listenShowBackTop(position);
    },
    //监听购物车点击的事件
    addToCart() {
      //1.获取购物车页面需要的参数
     const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.realPrice =this.goods.realPrice;
      product.iid = this.iid

      //发射方法到Vuex的actions对象中，把购物车需要的参数传入过去

      //1.方法一，普通方式
      // this.$store.dispatch('addCart',product).then(res => {
        // console.log(res);
      // })

      //2.方法二，映射的方式
      this.addCart(product).then(res =>{
        console.log(this.$toast);
        this.$toast.show(res,2000)
      })
    }
  },
  mounted() {

  },
  destroyed() {
    //取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
</style>
