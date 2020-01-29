<template>
  <div>
    <ul class="pro-main f-oh">
      <li class="pro-row f-pr fontSize-13 f-fl" v-for="(item,i) in proDetailData" :key="i">
        <router-link class="router" :to="{path: '/indus/productDetail',query:{productId : item.productId}}" >
          <div class="pro-row-inner">
            <img class="pro-img" v-lazy="item.productLogo" @click="toBuy(item.productId)"/>
            <div class="word m-top5">
              <div class="name">{{ item.productName }}</div>
              <div class="f-oh m-top5  fontSize-10 ">
                <span class="installment f-fl fontSize-14" >实付:¥<span>{{ item.insidePrice }}</span></span>
                <i class="price f-fl m-left5" style="color: #a1a1a1;line-height: 2rem;padding-left: 1rem;">官网:¥￥{{ item.mallPrice }}</i>
              </div>
              <p class="" style="font-size: 1.4rem;color: #999">{{item.title}}</p>
              <div class="sales fontSize-10 m-top5">
                <i class="sold m-left5"  style="color: #333333;">已售{{ item.sale }}</i>
              </div>
              <div class="btn" @click="toBuy(item.productId)">
              	立刻购买
              </div>
              <!--<span class="f-abs store-price fontSize-9">商城价：<span class="fontSize-13">￥{{ item.mallPrice }}</span></span>-->
            </div>
          </div>
        </router-link>
      </li>
      <!--<li class="pro-row f-pr fontSize-13 f-fl">
        <router-link class="router" to="path: '/indus/proDetail'" >
          <div class="pro-row-inner">
            <img class="pro-img" src="" alt="">
            <div class="word m-top5">
              <div class="name m-top5"><span class="brand w-color m-right5" style="display: inline-block">品牌</span>小米智能养猪机器人(母猪的产后护理)</div>
              <div class="f-oh m-top5  fontSize-10 ">
                <span class="installment f-fl fontSize-14" >实付：¥<span>169</span></span>
                <i class="price f-fl m-left5" style="color: #a1a1a1;float: right;margin-top: 0.6rem">￥189</i>
              </div>
              <div class="sales fontSize-9 ">
                <i class="sold m-top10 m-left5"  style="color: #333333;">已售25</i>
              </div>
              <div class="btn">
              	立刻购买
              </div>
            </div>
          </div>
        </router-link>
      </li>-->
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
      //单品页面
      toBuy(productId) {
        this.$router.push({
          path: '/indus/productDetail',
          query: {
            'productId': productId
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件

	.btn{


    float: right;
    margin-right: p(6);
    display: inline-block;
    background-color: #307ff5;
    border-radius: p(6);
    font-size: p(20);
    border: solid 1px #307ff5;
    text-align: center;
    color: #fff;
    width: p(100);
    height: p(42);
    line-height: p(42);

	}
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
            left: p(20);
            bottom: p(28);
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
              font-size: 1.875rem;
					    color: #333333;
					    padding-left: 0.9375rem;
					    text-align: left;
					    width: 100%;
					    height:p(30);
					    line-height: p(30);
					    text-overflow: ellipsis;
					    white-space: nowrap;
					    overflow: hidden;
          }
          .price{
            text-decoration:line-through
          }
        }
      }
    }
  }
</style>
