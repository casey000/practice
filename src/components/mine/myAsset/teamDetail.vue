<template>
  <div class="team-detail-content">
    <div class="head-content f-oh">
      <img class="head-img f-fl" :src=userWx.headLogo alt="">
      <div class="head-words w-color f-fl">
        <span class="row nick-name">{{user.name}}</span>
        <span class="row tuijian-name">推荐人：{{user.referName}}</span>
        <span class="vip-level">{{user.memberName}}</span>
      </div>
    </div>
    <div class="buy-total-money f-oh fontSize-15">
      <div class="left f-fl f-oh">
        <img class="img-pic f-fl" :src=moneyIcon alt="">
        <span class="f-fl">消费总额</span>
      </div>
      <span class="f-fr" style="color: red">￥{{user.consumptionSum}}</span>
    </div>
    <div class="jiben-infos fontSize-15">
      <dt class="title p-lef-rig24">基本信息</dt>
      <div class="infos-lists b-white">
        <ul class="infos-lists-main f-oh">
          <li class="infos-row f-oh p-lef-rig24 f-fl">
            <span class="left f-fl">姓名：</span>
            <span class="right f-fr">{{user.realityName}}</span>
          </li>
          <li class="infos-row f-oh p-lef-rig24 f-fl">
            <span class="left f-fl">性别：</span>
            <span class="right f-fr">{{user.sexName}}</span>
          </li>
          <li class="infos-row f-oh p-lef-rig24 f-fl">
            <span class="left f-fl">微信号：</span>
            <span class="right f-fr">未填写</span>
          </li>
          <li class="infos-row f-oh p-lef-rig24 f-fl">
            <span class="left f-fl">QQ：</span>
            <span class="right f-fr">{{userWx.qq}}</span>
          </li>
          <li class="infos-row f-oh p-lef-rig24 f-fl">
            <span class="left f-fl">生日：</span>
            <span class="right f-fr">{{userWx.birthday}}</span>
          </li>
          <li class="infos-row f-oh p-lef-rig24 f-fl">
            <span class="left f-fl">地区：</span>
            <div class="address right f-fr">
              <i class="icon iconfont icon-map" style="color: #cf9236;"></i>
              <span>{{userWx.province}}</span>
              <span>{{userWx.city}}</span>
            </div>
          </li>
          <li class="infos-row QRCode f-oh p-lef-rig24 f-fl">
            <span class="left f-fl">微信二维码：</span>
            <img class="f-fr" :src=userWx.qrCode alt="">
            <!--<span class="right f-fr">未填写</span>-->
          </li>
          <li class="infos-row f-oh p-lef-rig24 f-fl">
            <span class="left f-fl">职业：</span>
            <span class="right f-fr">{{userWx.profession}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
//import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  export default {
    data (){
      return {
        moneyIcon : '@/../static/image/mine/qiandai.png',
        user : {},
        userWx : {},
      }
    },
    mounted (){
    	 $(window).scrollTop('0')
      this.test();
      this.teamDetailAxios();
    },
    methods : {
      test(){
        let hash = window.location.hash;
        console.log('hash',hash);
        hash = hash.split('=')
        let userId = hash[1]
        console.log(userId)
      },
      //
      teamDetailAxios:function(){
        var vm = this;
        let hash = window.location.hash;
        console.log('hash',hash);
        hash = hash.split('=');
        let userId = hash[1];
        // var params = new URLSearchParams();
        // params.append('id',proId);
        $.ajax({
          url:comLink.yxtHost + '/team/userDetail',
          data:{
            userId : userId,
            openid:sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
             console.log(data)
             vm.user = data.data.user;
             if(vm.user.sex === 1){
               vm.user.sexName = '男'
             }else if(vm.user.sex === 2){
               vm.user.sexName = '女'
             }else{
               vm.user.sexName = '未知'
             }
             vm.userWx = data.data.userWx;
            }
          },
          error:function (data) {

          }
        })
      },
      //我的团队详情
      // teamDetailAxios: function() {
      //   var vm = this;
      //   let hash = window.location.hash;
      //   console.log('hash',hash);
      //   hash = hash.split('=');
      //   let userId = hash[1];
      //   console.log(userId);
      //   axios.post(comLink.yxtHost + '/team/userDetail', {
      //     openid : sessionStorage.openid,
      //     userId : userId,
      //   }).then(function(response) {
      //     if (response.data.code == 1) {
      //       console.log(response);
      //       // Toast({
      //       //   //mintui提示效果
      //       //   message: "已登录",
      //       //   duration: 2000
      //       // });
      //     }
      //   })
      //     .catch(function(res) {
      //       // Toast({
      //       //   //mintui提示效果
      //       //   message: "操作失败",
      //       //   duration: 2000
      //       // });
      //     });
      // },
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
.team-detail-content{
  width: 100%;
	position:absolute;
	top:0;
  .head-content{
    width: 100%;
    height: p(240);
    background: $bgBlue;
    padding: 0 p(40);
    .head-img{
      display: inline-block;
      width: p(160);
      height: p(160);
      background: white;
      border-radius: 50%;
      margin: p(40) p(15) 0 0;
    }
    .head-words{
      display: inline-block;
      font-size: p(26);
      .row{
        display: inline-block;
        width: 100%;
      }
      .nick-name{
        margin-top: p(75);
      }
      .tuijian-name{
        margin: p(30) 0 p(20) 0;
      }
      .vip-level{
        font-size: p(20);
        padding: p(5);
        background: $bgGreen;
        border-radius: p(5);
      }
    }
  }
  .buy-total-money{
    display: inline-block;
    width: 100%;
    height: p(160);
    background: white;
    line-height: p(160);
    padding: 0 p(40);

    .left{

      .img-pic{
        display: inline-block;
        height: p(40);
        margin: p(60) p(10) 0 0;
      }
    }
  }
  .jiben-infos{
    width: 100%;
    .title{
      display: inline-block;
      width: 100%;
      height: p(85);
      line-height: p(85);
    }
    .infos-lists{
      width: 100%;
      .infos-lists-main{
        width: 100%;
        .infos-row{
          display: inline-block;
          width: 100%;
          height: p(85);
          line-height: p(85);
          border-top: p(1) solid #eee;
          .right{
            color: #808080;
          }
        }
        .QRCode{
          display: inline-block;
          height: p(145);
          line-height: p(145);
          >img{
            display: inline-block;
            width: p(120);
            height: p(120);
            box-sizing: border-box;
            border: p(1) solid #eee;
            margin-top: p(12);
          }
        }
      }
    }
  }
}
</style>
