<template>
<div class="cart-button-bar">
  <div class="cart-button-left">
    <check-button class="check-button"
                  :is-checked="isSelectAll"
                  @click.native="checkClick"/>
    <span>全选</span>
  </div>
  <div class="cart-button-center">
    <div>合计:￥{{totalPrice}}</div>
  </div>
  <div class="cart-button-right" @click="calcClick">
    <div>结算({{closeCount}})</div>
  </div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartButtonBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList.filter( item => {
       return item.checked
      }).reduce((preValue, item) => {
       return preValue + item.realPrice * item.count
     }, 0).toFixed(2)
    },
    closeCount() {
      return this.$store.state.cartList.filter( item => item.checked).length
    },
    isSelectAll() {
      if(this.$store.state.cartList.length === 0) return false
      return !(this.$store.state.cartList.filter( item => !item.checked).length)
    }
  },
  methods:{
    checkClick() {
      if(this.isSelectAll){ //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
.cart-button-bar {
  height: 40px;
  background-color: #eee;
  font-size: 14px;
  display: flex;
}
.cart-button-left{
  display: flex;
  line-height: 40px;
  position: relative;
  width: 60px;
}
.check-button {
  width:15px;
  height: 15px;
  display: flex;
  position: absolute;
  top:10px;
  margin-left: 5px;
}
.cart-button-left span {
  padding-left: 30px;
}
.cart-button-center {
  line-height: 40px;
  flex: 1;
  text-align: center;
}
.cart-button-right {
  width: 100px;
  line-height: 40px;
  background-color: yellow;
  text-align: center;
}
</style>
