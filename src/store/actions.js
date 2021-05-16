import {ADD_COUNTER,ADD_TOCART} from './mutation-types'

export default {
  //接收Detail里面发射过来的方法，使用Promise来进行确认是否成功添加
  addCart(context,payload){
    return new Promise((resolve, reject) => {
      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find( item => item.iid === payload.iid)

      if(oldProduct){
        context.commit(ADD_COUNTER,oldProduct)
        oldProduct.count += 1
        return resolve('商品数量加一')
      }else{
        context.commit(ADD_TOCART,payload)
        payload.count = 1
        return resolve('添加新商品成功')
        // context.state.cartList.push(payload)
      }
    })
  }
}
