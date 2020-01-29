<template>
  <div>
    <ul class="pro-main f-oh" >
      <li class="pro-row f-pr fontSize-15 " v-for="(item,i) in proDetailData" :key="i">
        <router-link class="router" :to="{path: '/home/jifenproDetailRouter',query:{id : item.id}}" >
          <div class="pro-row-inner">
            <img class="pro-img" :src=item.logo alt="">
            <div class="word m-top10">
              <div class="name m-top10"><span class="brand w-color m-right5" style="display: inline-block">品牌</span>{{ item.name }}</div>
              <div class="f-oh m-top5  fontSize-14">
                <span class="installment f-fl fontSize-14  p-top20 p-left10" > 
                	<!--<span> ¥ {{item.mallPrice}} +</span>-->
                <span>  {{item.integral}} 积分</span></span>
                <i class="price f-fl m-left5" style="color: #a1a1a1;float: right;margin-top: 0.6rem;margin-right: 1rem;">￥{{ item.marketPrice }}</i>
              </div>

              <div class="sales fontSize-12  m-top5">
                <i class="sold  m-left5"  style="color: #333333;">已售{{ item.sale }}</i>
              </div>
              <!--<span class="f-abs store-price fontSize-13">商城价：<span class="fontSize-15">￥{{ item.mallPrice }}</span></span>-->
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
  	margin-bottom: 200rem;
    margin: 0 p(10);
    padding-bottom: p(20);
	
    .pro-row{
      width: 90%;
      padding: p(10);
      margin: p(10) auto;
      text-align: center;
      height: 31rem;

      .pro-row-inner{
        box-sizing: border-box;
        border: p(1) solid #f2f6fb;
        box-shadow:#ecf1fa p(5) p(5) p(20);
        padding: p(10) p(10);
        .pro-img{
          width: 53%;
          height: p(280);
          /*height: p(320);*/
          display: inline-block;
        }
        .word{
          text-align: left;
          padding-bottom: p(44);
          .sales{
            right: p(30);
            bottom: p(15);
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
            bottom: p(10);
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
