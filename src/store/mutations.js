import {ADD_COUNTER,ADD_TOCART} from './mutation-types'

export default {
  //添加商品数量
  [ADD_COUNTER](state,oldProduct) {
  },
  //添加商品
  [ADD_TOCART](state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
