import {debounce} from "@/common/util";
import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null //用于对防抖事件进行监听保存
    }
  },
  mounted() {
    //1.调用防抖动方法
    const refresh = debounce(this.$refs.scroll.refresh,50)

    //2.对监听的事件进行保存
    this.itemImgListener = () =>{
      refresh()
    }
    //3.监听item中图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const listenShowBackTop = {
  data() {
    return {
      isProbeTypeShow: false //用于监听BackTop何时显示
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    listenShowBackTop(position){
      this.isProbeTypeShow = (-position.y) > 1000
    }
  }
}
