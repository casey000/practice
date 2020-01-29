<template>
  <div class="sign-content" v-title data-title="签到中心">
    <div class="head">
      <img class="head-profile" :src=userWx.headLogo alt="">
      <!--:src=qiandaoCenterObj.userWx.headLogo-->
    </div>
    <div class="head-word fontSize-12">
      <span class="m-right5">会员等级：<span style="color: #f16e66;">{{member.memberName}}</span></span>
      <span v-if="member.memberDiscount == 100">享受折扣：<span style="color: #f16e66;">无</span></span>
      <span v-if="member.memberDiscount < 100">享受折扣：<span style="color: #f16e66;">{{member.memberDiscount}}</span>折</span>
    </div>
    <div class="nav-content m-top15 fontSize-12 f-oh b-white">
      <div class="list f-fl">
        <p>{{user.consumptionSum}}</p>
        <span>消费总金额（元）</span>
      </div>
      <div class="list f-fl">
        <p>{{user.integral}}</p>
        <span>剩余积分</span>
      </div>
      <div class="list f-fl">
        <p>{{user.balance}}</p>
        <span>剩余金额（元）</span>
      </div>
    </div>
    <!--<div class="get-cash" @click="getCashBtn()">
      <span class="word fontSize-15">提现</span>
    </div>-->
    <div class="sign b-white p-lef-rig24 f-oh" @click="toDaySign()">
      <img class="sign-img f-fl m-top10" :src="qiandaoIcon" alt="">
      <span class="fontSize-14 f-fl m-left5">签到赚积分</span>
      <i class="icon iconfont icon-more f-fr fontSize-19"></i>
      <!--<img :src="qiandaoIcon" alt="">-->
      <span class="status fontSize-10 f-fr ">{{qiandaoStatus}}</span>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import comLink from "./../../../../common/common_link"; //导入总线
  export default {
    data (){
      return{
        headImg : '@/../static/image/mine/touxiang.png',
        qiandaoIcon : '@/../static/image/mine/qiandao.png',
        qiandaoCenterObj : {},//签到中心首页数据
        member : {},
        userWx : {},
        user : {},
        qiandaoStatus : null,
      }
    },
    methods : {
      getCashBtn() {
        // 提现按钮
        // console.log('点击了提现按钮')
      },
      toDaySign() {
        this.$router.push({
          path: '/mine/daylySignRouter',
        })
      },

      //  签到中心首页数据
      qiandaoCenterAxios: function () {
        var _vm = this;
        this.$axios({
          method: 'post',
          url: comLink.yxtHost + '/sign/index',
          params : {
            openid:sessionStorage.openid,
          }
        }).then((res) => {
          if (res.data.code == 1) {
            _vm.qiandaoCenterObj = res.data.data;
            let qiandaoStatus = _vm.qiandaoCenterObj.integralRecord;
            if(qiandaoStatus === null){
              this.qiandaoStatus = '点击签到'
            }else{
              this.qiandaoStatus = '您已签到'
            }
            _vm.member = _vm.qiandaoCenterObj.member;
            _vm.userWx = _vm.qiandaoCenterObj.userWx;
            console.log(_vm.userWx,'_vm.userWx111')
            _vm.user = _vm.qiandaoCenterObj.user;
          }
        });
      },
      //  签到赚积分
      qiandaoEarnJifenAxios: function () {
        var _vm = this;
        $.ajax({
          url: comLink.yxtHost + '/sign/getIntegral',
          data: {
            "openid":sessionStorage.openid,
          },
          dataType: 'json',
          type: 'post',
          success: function (data) {
            if (data.code == 1) {
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000
              });
            }

          },
          error: function (data) {

          }
        })
      },
    },
    mounted (){
      this.qiandaoCenterAxios();
      //this.qiandaoEarnJifenAxios();//签到赚积分接口
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
.sign-content{
  width: 100%;
  .head{
    width: 100%;
    height: p(200);
    background: $bgBlue;
    text-align: center;

    .head-profile{
      display: inline-block;
      width: p(160);
      height: p(160);
      border-radius: 50%;
      box-sizing: border-box;
      border: p(5) solid white;
      margin-top: p(70);
    }
  }
  .head-word{
    margin-top: p(50);
    text-align: center;
  }
  .nav-content{
    width: 100%;
    height: p(150);
    display: flex;
    justify-content: space-around;


    .list{
      text-align: center;
      height: p(110);
      width: 33.3333%;
      margin-top: p(20);
      border-right: p(1) solid #eeeeee;
      p{
        font-size: p(28);
        margin-top: p(10);
      }
      span{
        display: inline-block;
        margin-top: p(20);
        color: #989898;
      }
    }
    .list:nth-child(3){
      border: none;
    }
  }
  .get-cash{
    width: 100%;
    height: p(70);
    text-align: center;
    margin-top: p(30);

    .word{
      display: inline-block;
      width: p(250);
      height: 100%;
      line-height: p(70);
      color: white;
      background: $bgBlue;
      border-radius: p(10);
    }
  }
  .sign{
    display: inline-block;
    width: 100%;
    height: p(90);
    margin-top: p(60);
    line-height: p(90);

    .sign-img{
      display: inline-block;
      width: p(45);
      height: p(45);
      /*background: #ccc;*/
    }
    .status{
      text-align: center;
      display: inline-block;
      width: p(130);
      height: p(40);
      line-height: p(40);
      border-radius: p(20);
      background: #fd695d;
      color: #fff2fd;
      margin-top: p(25);
    }
  }
}
</style>
