<template>
<div class="cary-list">
  <scroll class="content" ref="scroll">
    <cary-list-item v-for="(item,index) in cartList"
                    :key="index"
                    :item-info="item"/>
  </scroll>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import CaryListItem from "@/views/cart/childComps/CaryListItem";

export default {
  name: "CaryList",
  components:{
    Scroll,
    CaryListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cary-list {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
.content {
  height: 100%;
}
</style>
