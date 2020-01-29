<template>
  <div class="coupon-detail">
    <ul class="coupon-main">
      <li class="coupon-row m-top10 f-oh f-pr" v-for="(item,i) in couponLists" :key="i">
        <div class="left-main f-fl w-color dis-inblo">
          <p class="money">￥<span style="font-size: 4.625rem;font-family: '叶根友毛笔行书2.0版';">{{ item.price }}</span></p>
          <p class="fontSize-14">{{ item.coupon }}元优惠劵</p>
        </div>
        <div class="right-main f-fl dis-inblo">
          <p style="font-size: 2.25rem">满{{ item.limitCount }}元即可使用</p>
          <p class="shipping fontSize-12 m-top10">{{ item.shipping }}</p>
          <p class="limit fontSize-11 m-top15">{{ item.limit }}</p>
          <p class="time fontSize-7 m-top15">有效期：{{item.startTime }} - {{ item.endTime }}</p>
        </div>
        <div class="get-coupon fontSize-12 w-color f-abs" :class=" { getCoupon : item.isGetCoupon } ">
          <router-link to="/">
            <p>{{item.btn}}</p>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props : {
      couponLists : Array,
      isGetCoupon : String
    },
    data (){
      return{
        // isGetCoupon :'',
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .coupon-detail {
    .coupon-main {
      padding: p(0) p(23);

      .coupon-row {
        width: 100%;
        height: p(230);
        /*padding: p(0) p(23);*/
        background-image: url("./../../static/img/home/coupon/coupon_back.png");
        background-size: 100%;

        .left-main {
          width: p(220);
          text-align: center;

          .money {
            margin-top: p(45);
            margin-bottom: p(20);
          }
        }

        .right-main {
          padding: p(30) 0 0 p(20);
        }

        .get-coupon {
          top: 50%;
          margin-top: p(-22.5);
          right: 0;
          background: #ff675f;
          width: p(138);
          height: p(45);
          line-height: p(45);
          text-align: center;
          border-radius: p(10) 0 0 p(10);
        }

        .getCoupon {
          background: #eeeeee;
          color: #999999;
        }
      }
    }
  }
</style>
