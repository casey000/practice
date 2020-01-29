<template>
  <div>
    <ul class="pro-main f-oh">
      <li class="pro-row f-pr fontSize-13 f-fl" v-for="(item,i) in proDetailData" :key="i">
        <router-link class="router" :to="{path: '/home/proDetailRouter',query:{id : item.id}}" >
          <div class="pro-row-inner">
            <img class="pro-img" :src=item.logo alt="">
            <div class="word m-top5">
              <div class="name m-top5"><span class="brand w-color m-right5" style="display: inline-block">品牌</span>{{ item.name }}</div>
              <div class="f-oh m-top10  fontSize-10 ">
                <span class="installment f-fl fontSize-14" >¥<span>{{item.periodShow1}} x {{item.periodShow2}}</span></span>
                <i class="price f-fl m-left5" style="color: #a1a1a1;float: right;margin-top: 0.6rem">￥{{ item.marketPrice }}</i>
              </div>

              <div class="sales fontSize-9 ">
                <i class="sold m-top10 m-left5"  style="color: #333333;">已售{{ item.sale }}</i>
              </div>
              <span class="f-abs store-price fontSize-9">商城价：<span class="fontSize-13">￥{{ item.mallPrice }}</span></span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props : {
      proDetailData : Array
    },
    data (){
      return{
        indexNum : 0,
      }
    },
    methods : {

    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件

  .router{
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .pro-main{
    margin: 0 p(10);
    padding-bottom: p(20);

    .pro-row{
      width: 50%;
      padding: p(10);
      text-align: center;
      height: 32rem;

      .pro-row-inner{
        box-sizing: border-box;
        border: p(1) solid #f2f6fb;
        box-shadow:#ecf1fa p(5) p(5) p(20);
        padding: p(10) p(10);
        .pro-img{
          width: 100%;
          height: 20rem;
          /*height: p(320);*/
          display: inline-block;
        }
        .word{
          text-align: left;
          padding-bottom: p(44);
          .sales{
            right: p(20);
            bottom: p(2);
            line-height: p(30);
            display: inline-block;
            position: absolute;
          }
          .installment{
            color: #f10000;
            /*height: p(30);*/
          }
          .store-price{
            display: inline-block;
            bottom: p(2);
            left: p(24);
            line-height: p(30);
          }
          .name{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 2.3rem;
            height: 4.2rem;
            font-size: 1.6rem;

            .brand{
              display: inline-block;
              padding: p(0) p(10);
              border-radius: p(5);
              background: #ff251a;
              /*display: inline-block;*/
            }
          }
          .price{
            text-decoration:line-through
          }
        }
      }
    }
  }
</style>
