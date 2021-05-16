import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from "@/store/getters";

//1.安装插件
Vue.use(Vuex)

const state = {
 cartList: []
}
//创建Store对象
const Store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
//导出对象
export default Store


