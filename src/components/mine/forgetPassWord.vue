<template>
  <div class="set-phone-number" v-title data-title="忘记密码">
    <div class="set-content">
      <ul class="set-main fontSize-18">
        <li class="set-row">
          <span>手机号：</span>
          <input type="text" style="font-size: 2rem" placeholder="请输入手机号" v-model="phoneNumber">
        </li>
        <li class="set-row f-pr">
          <span>验证码：</span>
          <input type="text" style="font-size: 2rem" placeholder="请输入手机验证码" v-model="yanzhengma">
          <span class="get-yanzhengma-btn" :class='{right:isInputRight}'  @click="checkedPhoneNum()" v-show="show">获取验证码</span>
          <span v-show="!show" class="get-yanzhengma-btn count" style="background-color: gray">{{count}} s</span>
        </li>
        <li class="set-row">
          <span>设置新密码：</span>
          <input type='password' style="font-size: 2rem" placeholder="请设置8-16位新密码" v-model="firstPassword">
        </li>
        <li class="set-row">
          <span>确认密码：</span>
          <input type='password' style="font-size: 2rem" placeholder="再次输入密码" v-model="secondPassword">
        </li>
      </ul>
    </div>
    <div class="bottom-button" @click="submit()">
      <span>重　置</span>
    </div>
  </div>
</template>
<script>
  const TIME_COUNT = 60;
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import axios from 'axios'
  import comLink from "./../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  export default {
    data (){
      return {
        phoneNumber : '',
        firstPassword : '',
        secondPassword : '',
        yanzhengma : '',
        isInputRight : false,
        type : '',
        show : true,
        timer : null,
        count: '',
      }
    },
    mounted (){
      // this.getMessageAxios();
    },
    methods : {
    	//加密操作
    	Encrypt(word){
        var strInfo = "0102030405060708";
        var key = CryptoJS.enc.Utf8.parse(strInfo);
        var iv  = CryptoJS.enc.Utf8.parse(strInfo);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
      },
      saveResetAxios() {
        var vm = this;
        $.post(comLink.yxtHost + '/user/resetPassword', {
          'code' : vm.Encrypt(vm.yanzhengma),
          'phone' : vm.Encrypt(vm.phoneNumber),
          'pwd' :  md5(vm.firstPassword),
          'tpwd' : md5(vm.secondPassword),
        }, function(resp) {
          if(resp.code == 1){
          	Toast({
              //mintui提示效果
              message:"设置成功",
              duration: 2000,
            });
            vm.$router.push({
              path : '/mine/denglu'//重置完成以后跳转登陆页面
            })
          } else {
            Toast({
              //mintui提示效果
              message: "手机号码不能为空",
              duration: 2000,
            });
          }
        });
      },
      //发送验证码
      getYanzhengAxios: function(){
        var _vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/sendMsg',
          data:{
            'openid':sessionStorage.openid,
            'phone' :_vm.Encrypt(_vm.phoneNumber),
            'type' : 5//忘记密码
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            Toast({
              //mintui提示效果
              message: data.msg,
              duration: 2000,
            });
            if(data.code == 1){
              _vm.yanzhengma = data.data;

              //开始倒计时
              if (!_vm.timer) {
                _vm.count = TIME_COUNT;
                _vm.show = false;
                _vm.timer = setInterval(() => {
                  if (_vm.count > 0 && _vm.count <= TIME_COUNT) {
                    _vm.count--;
                  } else {
                    _vm.show = true;
                    clearInterval(_vm.timer);
                    _vm.timer = null;
                  }
                }, 1000)
              }
            }
          },
        })
      },
      //获取短信验证码 按钮
      checkedPhoneNum (){
        let reg = /^1\d{10}$/;
        if(reg.test(this.phoneNumber)){
          //调用发送验证码方法
          this.getYanzhengAxios();
        }else{
          Toast({
            //mintui提示效果
            message: "电话号码输入有误",
            duration: 2000,
          });
        }
      },
      submit(){//注册按钮
        let regPhone = /^1\d{10}$/;
        if(regPhone.test(this.phoneNumber)){
          let reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/;
          if(reg.test(this.firstPassword)){
            //  输入格式符合
            if(this.secondPassword === this.firstPassword){
              //  两次密码输入一致
              if(!this.phoneNumber){
                Toast({
                  //mintui提示效果
                  message: "手机号码不能为空",
                  duration: 2000,
                });
              }
              else if(!this.yanzhengma){
                Toast({
                  //mintui提示效果
                  message: "验证码为空",
                  duration: 2000,
                });
              }
              else if(this.phoneNumber&&this.yanzhengma){
                this.saveResetAxios();//调用保存注册信息
              }
            }else{
              Toast({
                //mintui提示效果
                message: "2次密码输入不一致",
                duration: 2000,
              });
            }
          }else{
            Toast({
              //mintui提示效果
              message: "密码输入过于简单",
              duration: 2000,
            });
          }
        }else{
          Toast({
            //mintui提示效果
            message: "电话号码输入有误",
            duration: 2000,
          });
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss";
  .right{
    background: #eee;
    color: #666;
  }
  .set-phone-number{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;

    .set-content{
      width: 100%;
      /*height: 100%;*/

      .set-main{
        width: 100%;

        .set-row{
          width: 100%;
          height: p(100);
          line-height: p(100);
          overflow:hidden;
          border-bottom: p(1) solid #eee;
          padding: 0 p(24);
          >span{
            display: inline-block;
            width: 30%;
            max-width: 40%;
            float: left;
          }
          >input{
            display: inline-block;
            height: 98%;
            width: 60%;
            float: left;
          }
          .get-yanzhengma-btn{
            position: absolute;
            top: 32%;
            margin-top: -1rem;
            right: 1.5rem;
            font-size: 2rem;
            background: #307ff5;
            border-radius: 0.625rem;
            color: white;
            display: inline-block;
            height: 4rem;
            line-height: 4rem;
            width: 12rem;
            text-align: center;
          }
        }
      }
    }
    .bottom-button{
      width: 80%;
      margin: 0 auto;
      margin-top: p(30);
      height: p(90);
      background: $bgBlue;
      border-radius: p(10);
      color: white;
      text-align: center;
      line-height: p(90);
      font-size: p(50);
    }
  }
</style>
