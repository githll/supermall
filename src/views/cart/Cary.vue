<template>
<div class="cary">
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>
  <cary-list class="cary-list"/>

  <cart-button-bar class="cart-button-bar"/>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {mapGetters} from 'vuex'

import CaryList from "@/views/cart/childComps/CaryList";
import CartButtonBar from "@/views/cart/childComps/CartButtonBar";

export default {
  name: "Cary",
  components: {
    NavBar,
    CaryList,
    CartButtonBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: #ff8198;
  color: #ffffff;
  letter-spacing: 2px;
  font-size: 18px;
}
.cary {
  height: 100vh;
}
.cart-button-bar{
  position: relative;
}
</style>
