<template>
  <div class=" f-oh f-fl">
    <div class="f-oh f-fl list-main f-pr" v-for="(item,i) in proInfoLists" :key="i">
      <img class="img-pic dis-inblo f-fl" :src=item.imgPath alt="">
      <div class="pro-name-infos f-fl m-left10">
        <span class="pro-title fontSize-14 f-db">{{ item.name }}</span>
        <span class="pro-detail fontSize-10 f-db">{{ item.spec }}</span>
      </div>
      <span class="pro-price dis-inblo fontSize-10 f-fr">￥{{ item.price }}</span>
      <span class="pro-num dis-inblo fontSize-10 f-fl">X{{ item.count }}</span>
    </div>
  </div>
</template>
<script>
  export default  {
    // props : {
    //   proInfoLists : Array
    // },
    data (){
      return {
        proInfoLists : [
          {
            imgPath : '',
            name : '红米note手机',
            spec : '全面屏/400Ah大电量/前置柔光自拍/14nm',
            price : 3998.99,
            count : 1
          },
          {
            imgPath : '',
            name : '红米note手机',
            spec : '全面屏/400Ah大电量/前置柔光自拍/14nm',
            price : 3998.99,
            count : 1
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .list-main{
    padding: p(20) p(24);
    background: #e6f5ff;
    margin-top: p(20);
    width: 100%;
    .img-pic{
      width: p(133);
      height: p(133);
      background: #eee;
    }
    .pro-name-infos{
      max-width: p(300);

      .pro-detail{
        color: #9fa0a1;
        line-height: p(30);
        text-align: left;
        margin-top: p(15);
      }
    }
    .pro-num{
      position: absolute;
      bottom: p(40);
      right: p(24);
    }
    .pro-price{
      color: #ff2727;
    }
  }
</style>
