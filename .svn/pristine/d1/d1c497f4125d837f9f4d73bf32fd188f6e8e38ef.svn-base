<template>
  <div class="lunbo">
    <!-- 轮播图begin -->
    <mt-swipe @change="handleChange" :auto="lunbo_time">
      <mt-swipe-item v-for="(data,i) in lunbo_data" :key="i"><img :src="data"></mt-swipe-item>
    </mt-swipe>
    <!-- 轮播图end -->
  </div>
</template>
<script>
  import { Search, Swipe, SwipeItem } from "mint-ui";

  export default {
    data() {
      return {}
    },
    methods: {
      handleChange(index) {}
    },
    // 让父组件传值进来
    props:{'lunbo_url':String,
      'lunbo_time':{
        type: Number,
        required: false,//是否必须
        validator: function (value) {//验证value大于等于1000
          return value >= 0
        }
      },
      'lunbo_data':{
        type: Array,//数组类型
        required: false,//是否必须
      }}
  };
</script>

<style lang="scss" scoped>
  // 轮播图begin
  .lunbo {
    height: 18.75rem;
    img {
      width: 100%;
      /*height: 100%;*/
    }
  }
</style>
