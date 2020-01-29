<template>
  <div class="myAsset" v-title data-title="我的资产">
      <div class="top">
        <div class="price">
          <i class="iconfont icon-qianbao"></i>
          <div>零钱</div>
          <div><span>￥</span>{{homePageData.balance}}</div>
        </div>
      </div>
      <div class="btnBox">
        <router-link to="/mine/myMoneyRouter">记录</router-link>
        <div @click="withdrawBtn()">提现</div>
      </div>
      <div class="showBlackCover" v-if="isShowBlackCover"></div>
      <div class="withDraw-main b-white fontSize-14 f-pr" v-if="isShowWithdraw">
        <div class="word">
          <span>提示:</span>
          <p>您还没有设置支付密码，请先去设置</p>
        </div>
        <div class="confirm-btn" @click="cancelWarnBtn">
          知道了
        </div>
        <div class="cancel-btn f-abs fontSize-14" @click="cancelWarnBtn">
          X
        </div>
      </div>
      <div class="funtion">
        <div class="tit">
          功能
        </div>
        <div class="content">
          <div class="left" @click="myCouponBtn">
            <img src="@/../static/image/mine/yhq.png" alt="">
            <span>
              <p>优惠券</p>
              <p>（{{homePageData.coupons}}张）</p>
            </span>
          </div>
          <div class="right" @click="vipCardBtn">
            <img src="@/../static/image/mine/ka.png" alt="">
            <span>
              <p>会员卡</p>
              <p>（{{homePageData.members}}张）</p>
            </span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
export default {
  data() {
    return {
      isShowBlackCover : false,
      isShowWithdraw : false,
      isHaveLogin :true,
      homePageData: {},//首页数据
    };
  },
  created() {},
  methods: {
    homePageAxios: function(){
      var vm = this;
      console.log(window.location.hash);
      axios.get(comLink.yxtHost + '/access/index', {
        params:{
          openid : sessionStorage.openid
        }
      }).then(function(response) {
        if (response.data.code = "200") {
          vm.homePageData = response.data.data;//收货地址首页数据
//        vm.homePageData.balance = 0;//默认为null 暂时定义为零
        }
      })
        .catch(function(res) {

        });
    },
    withdrawBtn() {
      Toast({
        //mintui提示效果
        message: '该功能尚未开通，敬请期待',
        duration: 2000,
      });
      /*if(!this.isHaveLogin){
        this.isShowBlackCover = true
        this.isShowWithdraw = true
      }else{
        this.$router.push({
          path:"/mine/myAsset/withdrawRouter"
        })
      }*/
    },
    cancelWarnBtn(){
      if(!this.isHaveLogin){
        this.isShowBlackCover = false
        this.isShowWithdraw = false
      }
    },
    myCouponBtn(){
      this.$router.push({
        path:"/indus/mycoupon"
      })
    },
    vipCardBtn (){
      this.$router.push({
        path:"/mine/myAsset/vipCardRouter"
      })
    },
  },
  mounted(){
    this.homePageAxios();
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "@/../src/sass/public.scss";
.myAsset {
  height: 100%;

  .showBlackCover{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    opacity: 0.4;
  }
  .withDraw-main{
    display: inline-block;
    height: p(260);
    position: fixed;
    z-index: 9;
    bottom: p(480);
    left: p(85);
    right: p(85);
    border-radius: p(10);

    .word{
      line-height: p(38);
      padding: p(44) p(40);
    }
    .confirm-btn{
      width: 100%;
      height: p(75);
      line-height: p(75);
      color: white;
      background: $bgBlue;
      margin-top: p(20);
      text-align: center;
      border-radius: 0 0 p(10) p(10);
    }
    .cancel-btn{
      bottom: p(-120);
      left: 50%;
      margin-left: p(-30);
      display: inline-block;
      width: p(60);
      height: p(60);
      border: p(2) solid #eee;
      border-radius: 50%;
      color: white;
      text-align: center;
      line-height: p(60);

    }
  }

  .top {
    height: 20rem;
    position: relative;
    background: -webkit-linear-gradient(left top, rgb(0, 195, 255), #307ff5);
    background: -o-linear-gradient(bottom right, rgb(0, 195, 255), #307ff5);
    background: -moz-linear-gradient(top right, rgb(0, 195, 255), #307ff5);
    background: linear-gradient(to bottom left, rgb(0, 195, 255), #307ff5);
    .price {
      position: absolute;
      @include jz();
      text-align: center;
      color: white;
      i {
        font-size: 5rem;
      }
      > div:nth-child(2) {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      > div:nth-child(3) {
        font-weight: 500;
        font-size: 3rem;
        line-height: 5rem;
        span {
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }
      }
    }
  }
  .btnBox {
    height: 6.875rem;
    background: white;
    display: flex;
    justify-content: space-around;
    > a,
    div {
      margin-top: 2rem;
      width: 30%;
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      box-sizing: border-box;
      border: 1px solid #337df6;
      border-radius: 3rem;
      font-size: 1.625rem;
      font-weight: 500;
    }
    > a:nth-child(1) {
    }
    > div:nth-child(2) {
      background-color: gray;
      border: none;
      color: white;
    }
  }
  .funtion {
    margin-top: 20px;
    background: white;
    .tit {
      padding: 0 1.5625rem;
      height: 5.5rem;
      line-height: 5.5rem;
      font-size: 1.625rem;
      border-bottom: 0.0625rem solid $borderColor;
      font-weight: 500;
    }
    .content {
      display: flex;
      justify-content: space-around;
      > div {
        padding-top: 2rem;
        display: flex;
        justify-content: center;
        width: 50%;
        box-sizing: border-box;
        height: 9.25rem;
        line-height: 9.25rem;
        border-left: 1px solid $borderColor;
        > img {
          width: 5rem;
          height: 5rem;
        }
        > span {
          font-size: 1.75rem;
          margin-left: 1rem;
          margin-top: 0.5rem;
          > p {
            line-height: 2rem;
          }
          > p:nth-child(1) {
            line-height: 2.3rem;
            color: #000;
            font-weight: 500;
          }
          > p:nth-child(2) {
            line-height: 2rem;
            color: $fontGray;
          }
        }
      }
      > div:nth-child(1) {
        border-left: 1px solid $borderColor;
      }
    }
  }
}
</style>
<style>

  /* //提现警告按钮类名 */
  .withdrawClass{
    /* background: #307FF6;
    color: white; */
    font-weight: 500;
  }
</style>


