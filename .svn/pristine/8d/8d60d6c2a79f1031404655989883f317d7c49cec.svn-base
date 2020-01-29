<template>
  <div class="vip-content fontSize-12 b-white" v-title data-title='商城积分'>
    <!--<div class="head-main">
      <p class="fontSize-13">{{vipInfos.title}}</p>
    </div>-->
    <div class="m-top15 main-text" v-html="content"></div>
    <!--<div class="vip-content fontSize-12 b-white"><div class="head-main"><p class="fontSize-13">邮讯通会员奖励金大幅提升了，详情看商品页面</p></div> <div class="how-be-vip text-title m-top5"><p class="fontSize-14 title">如何成为“邮讯通会员”？</p> <p class="code-word text fontSize-11 m-top5">① 长安识别二维码或关注微信公众号“邮讯通商城”即可成为“邮讯通会员”</p> <div class="code-img m-top10"><img src="" alt="" class="img-pic"></div></div> <div class="to-earn-money text-title m-top5"><p class="fontSize-14 title">如何赚取奖励金呢？</p> <p class="earn-word text fontSize-11 m-top5">① 长安识别二维码或关注微信公众号“邮讯通商城”即可成为“邮讯通会员”</p><p class="earn-word text fontSize-11 m-top5">② 您的粉丝成员在商城任何消费后您就会奖励金啦！</p><p class="earn-word text fontSize-11 m-top5">③ 您自己在商城的任何购物都会产生奖励金。</p></div> <div class="money-here text-title m-top5"><p class="fontSize-14 title">奖励金的规则在这里哦！</p> <p class="money-word text fontSize-11 m-top5">① 奖励金将在订单确认收货后的第二天到账（如客户未点击“确认收货”，系统会在发货后的第7天自动确认收货）。</p><p class="money-word text fontSize-11 m-top5">② 所得奖励金可在“个人中心”的零钱中查看，可提现到任意储蓄卡账户，提现金额需为10元的倍数，最低提现额度为100元，-->
    <!--申请提现后7个工作日内到账。</p><p class="money-word text fontSize-11 m-top5">③ 不支持层级奖励，即您粉丝的粉丝消费，无任何奖励如果出现收货后再退货，奖励金会自动减除</p></div></div>-->

  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import { Scroller } from 'vux'
  export default {
    data (){
      return{
        vipInfos : {},
        content : '',
      }
    },
    methods : {
//获取商品列表
      vipInfosAxios:function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/index/integral',
          data:{
            openid:sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.vipInfos = data.data;
              vm.content = vm.vipInfos.content;
            }
          },
          error:function (data) {

          }
        })
      },
    },
    mounted(){
      this.vipInfosAxios()
    },
  }
</script>
<style lang="scss">
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .vip-content{
    /*position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    bottom: 0;*/
    background: white;
    overflow-y: auto;
    padding: p(30) p(25);
    -webkit-overflow-scrolling: touch;

    .head-main{
      width: 100%;
      height: 5.625rem;
      line-height: 5.625rem;
      text-align: center;
    }
    .main-text{
      p{
        line-height: 3.0rem;

      }

    }
    .text-title{
      margin-top: p(40);

      .text{
        line-height: p(42);
        color: #666666;
      }

      .code-img{
        width: 100%;
        text-align: center;
        .img-pic{
          display: inline-block;
          width: p(250);
          height: p(250);
          background: #999999;
          margin: 0 auto;
        }
      }

      .money-word{
        color: #ff4242;
      }
    }

    .to-earn-money{
      margin-top: p(40);
    }
  }
</style>
