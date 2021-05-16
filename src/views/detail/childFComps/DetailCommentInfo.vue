<template>
  <div>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/common/util"

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value * 1000);
      return formatDate(date,'yyyy-mm-dd')
    }
  }
}
</script>

<style scoped>
.info-header {
  width: 94%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  line-height: 50px;
  border-bottom: 2px solid #f2f5f8;
}

.info-user {
  width: 100%;
  height: 60px;
  padding-left: 2%;
  padding-top: 8px;
}
.info-user img {
  border-radius: 50px;
  height: 50px;
  width: 50px;
  float: left;
}
.info-user span {
 float: left;
  margin-top: 15px;
  margin-left: 10px;
}
.info-detail {
  margin-top: -20px;
}
.info-other span:nth-child(2){
  padding-left: 15px;
}
.info-imgs {
  margin-top: 5px;
}
.info-imgs img{
  width: 80px;
  height: 80px;
  margin-left: 3px;
}
</style>
