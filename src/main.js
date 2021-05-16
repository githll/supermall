import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Fastclick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from '@/components/common/toast/index'

Vue.config.productionTip = false

//添加事件总线
Vue.prototype.$bus = new Vue

//安装toast插件
Vue.use(toast)

//解决移动端浏览器 300 毫秒点击延迟问题
Fastclick.attach(document.body)

//使用图片懒加载
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
