<template>
  <div class="more-gongneng-content b-white" v-title data-title="更多功能">
    <ul class="item-main m-top15 f-oh">
      <!--<li class="item-row f-fl" @click="myZengsong()">
        <div class="row-inner">
          <img class="img-pic" src="@/../static/image/mine/myZengsong@3x.png" alt="">
          <span class="inner-word fontSize-12 m-top10">我的赠送</span>
        </div>
      </li>-->
      <li class="item-row f-fl" @click="tuiguangRanking()">
        <div class="row-inner">
          <img class="img-pic" src="@/../static/image/mine/tuiguangRanking3x.png" alt="">
          <span class="inner-word fontSize-12 m-top10">推广排行榜</span>
        </div>
      </li>
      <li class="item-row f-fl" @click="tuiguangResault()">
        <div class="row-inner">
          <img class="img-pic" src="@/../static/image/mine/tuiguangResault3x.png" alt="">
          <span class="inner-word fontSize-12 m-top10">推广成果</span>
        </div>
      </li>
      <li class="item-row f-fl" @click="jifenduihuan()">
        <div class="row-inner">
          <img class="img-pic" src="@/../static/image/mine/jifen3x.png" alt="">
          <span class="inner-word fontSize-12 m-top10">积分兑换</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data (){
      return{
        testPic : '@/../static/image/mine/qiandai.png'
      }
    },
    methods : {
      myZengsong(){
        this.$router.push({
          path : '/mine/myZengsong'
        })
      },
      tuiguangRanking(){
        this.$router.push({
          path : '/mine/tuiguangRanking'
        })
      },
      tuiguangResault(){
        this.$router.push({
          path : '/mine/tuiguangResault'
        })
      },
      jifenduihuan(){
        this.$router.push({
          path : '/mine/duihuanJifen'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .more-gongneng-content{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    .item-main{
      width: 100%;
      .item-row{
        width: 33.3333%;
        text-align: center;
        padding: 0 p(20);
        margin-bottom: p(10);
        margin-top: p(10);

        .row-inner{
          box-sizing: border-box;
          /*border: p(1) solid #ccc;*/
          height: p(200);
          box-shadow: 0 0 10px #ddd;

          .img-pic{
            width: 35%;
            margin-top: p(25);
          }
          .inner-word{
            display: block;
            text-align: center;
          }
        }
      }
    }
  }
</style>
