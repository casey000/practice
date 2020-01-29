<template>
  <div class="personalInformation" v-title data-title="个人信息">
      <div class="commonList clearfix" @click="toSetPhoneNum()">
          <div class="left fl">
              <span>手机号码</span>
          </div>
          <div class="right fr">
              <span>{{anquanData.phone}}</span>
              <i class="iconfont icon-more"></i>
          </div>
      </div>
      <!--<div class="commonList clearfix" @click="toSetPassword()">-->
          <!--<div class="left fl">-->
              <!--<span>支付密码管理</span>-->
          <!--</div>-->
          <!--<div class="right fr">-->
              <!--<span>设置</span>-->
              <!--<i class="iconfont icon-more"></i>-->
          <!--</div>-->
      <!--</div>-->
      <div class="commonList clearfix" @click="toSetEmail()">
          <div class="left fl">
              <span>我的邮箱</span>
          </div>
          <div class="right fr">
              <span>{{anquanData.email}}</span>
              <i class="iconfont icon-more"></i>
          </div>
      </div>
      <div class="jianxi" style="height:1.3125rem;"></div>
      <!--<div class="commonList clearfix">-->
          <!--<div class="left fl">-->
              <!--<span>是否显示手机号</span>-->
          <!--</div>-->
          <!--<div class="right fr">-->
              <!--<mt-switch v-model="phoneFlag"></mt-switch>-->
          <!--</div>-->
      <!--</div>-->
      <!--<div class="commonList clearfix">-->
          <!--<div class="left fl">-->
              <!--<span>是否显示微信号</span>-->
          <!--</div>-->
          <!--<div class="right fr">-->
              <!--<mt-switch v-model="wechatFlag"></mt-switch>-->
          <!--</div>-->
      <!--</div>-->
    </div>
</template>
<script>
  import { Indicator, Toast, Popup } from "mint-ui";
//import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
export default {
  data() {
    return {
      phoneFlag:false,
      wechatFlag:false,
      anquanData : {
      	phone:'',
      	email:''
      },
    };
  },
  mounted(){
    this.savePassWordAxios()

  },
  methods: {
    //保存手机号 登录密码
    savePassWordAxios: function(){
      var vm = this;
      $.ajax({
        url:comLink.yxtHost + '/user/security',
        data:{
          openid:sessionStorage.openid,
        },
        dataType:'json',
        type:'post',
        success:function (data) {
//        console.log(data,'data11111');
          if(data.code == 1 ){


            vm.anquanData = data.data;
            if(!vm.anquanData.email){
            	vm.anquanData.email="去绑定"
            }else{
            	vm.anquanData.email = vm.anquanData.email.substr(0,2) + "****" + vm.anquanData.email.substr(vm.anquanData.email.indexOf('@'));
//          	vm.anquanData.email
            }
            if(!vm.anquanData.phone){
            	vm.anquanData.phone="去绑定"
            }else{
            	vm.anquanData.phone = vm.anquanData.phone.substr(0,3) + "****" + vm.anquanData.phone.substr(-4);

            }
          }
        },
        error:function (data) {

        }
      })
    },
    //设置手机号码
    toSetPhoneNum(){
      this.$router.push({
        path : '/mine/perInfor/setPhoneNum'
      })
    },
    //设置密码
    toSetPassword(){
      this.$router.push({
        path : '/mine/perInfor/setPassWord'
      })
    },
    //绑定邮箱
    toSetEmail(){
      this.$router.push({
        path : "/mine/perInfor/setEmail"
      })
    },
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "@/../src/sass/public.scss";
.personalInformation {
  .commonList {
    width: 100%;
    background: white;
    height: 6rem;
    line-height: 6rem;
    font-size: 1.6875rem;
    padding: 0 1.875rem;
    box-sizing: border-box;
    border-bottom: 1px solid $borderColor;
    .left {
      color: #000;
      position: relative;
      height: 100%;
      box-sizing: border-box;
      font-weight: 500;
      img {
        position: absolute;
        width: 2.25rem;
        height: 2.25rem;
        left: 0rem;
        top: 2rem;
      }
    }
    .right {
      box-sizing: border-box;
      height: 100%;
      color: #989898;
      i {
        display: inline-block;
        min-width: 2rem;
      }
      .mint-switch{
          height: 90%;box-sizing: border-box;
          padding-top: 1rem;
      }
    }
  }
}
</style>


