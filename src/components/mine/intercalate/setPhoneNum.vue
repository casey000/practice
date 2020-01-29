<template>
  <div class="set-phone-number" v-title data-title="绑定手机">
    <div class="set-content">
      <ul class="set-main fontSize-15">
        <li class="set-row">
          <span>手机号：</span>
          <input type="text" placeholder="请输入手机号" v-model="phoneNumber">
        </li>
        <li class="set-row f-pr">
          <span>验证码：</span>
          <input type="text" placeholder="请输入手机验证码" v-model="yanzhengma">
        <!--<span class="get-yanzhengma-btn" @click="checkedPhoneNum ()">获取验证码</span>-->
          <span class="get-yanzhengma-btn" @click="checkedPhoneNum()" v-show="show">获取验证码</span>
          <span v-show="!show" class="get-yanzhengma-btn count" style="background-color: gray">{{count}} s</span>
        </li>
        <li class="set-row" v-if="flag">
          <span>设置密码：</span>
          <input type='password' placeholder="请设置8-16位新密码" v-model="password">
        </li>
        <li class="set-row" v-if="flag">
          <span>确认密码：</span>
          <input type='password' placeholder="再次输入密码" v-model="newPassword">
        </li>
      </ul>
    </div>
    <div class="bottom-button" @click="submit()" v-if="flag">
      <span>确定</span>
    </div>
    <div class="bottom-button" @click="bindPhone()" v-if="!flag">
      <span>确定</span>
    </div>
  </div>
</template>
<script>
  import {  Toast, Popup, MessageBox } from "mint-ui";
//import axios from 'axios'
  import md5 from 'js-md5';   //引入MD5 本页即可使用
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  const TIME_COUNT = 60;
  export default {
    data (){
      return {
        flag : true,//是否继续绑定手机号
        show : true,
        phoneNumber : null,
        password : null,
        newPassword : null,
        yanzhengma : null,
        count: '',
        timer: null,
      }
    },
    mounted (){
      // this.getMessageAxios();
    },
    methods : {
      //md5加密密码
      //加密操作
    	Encrypt(word){
        var strInfo = "0102030405060708";
        var key = CryptoJS.enc.Utf8.parse(strInfo);
        var iv  = CryptoJS.enc.Utf8.parse(strInfo);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
      },
      //保存手机号和登录密码
      savePhonePassAxios: function(){
        var _vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/savePhoneAndPassword',
          data:{
            'openid':sessionStorage.openid,
            'phone' : _vm.Encrypt(_vm.phoneNumber),
            'code' : _vm.Encrypt(_vm.yanzhengma),
            'password' : md5(this.password),
            'newPassword' : md5(this.newPassword),
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000,
              });
              _vm.$router.back(-1);
            }else if(data.code == 2) {//继续绑定微信号

            } else {
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000,
              });
            }
          },
        })
      },
      mytimer() {
        //开启倒计时
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      bindPhone() {
        var vm = this;
        $.post(comLink.yxtHost + '/user/continueBindPhone', {
           'openid' : sessionStorage.openid,
           'phone' : vm.Encrypt(vm.phoneNumber) ,
           'code' : vm.Encrypt(vm.yanzhengma),
         }, function(res) {
          if(res.code == 1) {
            vm.$router.push({
              path: '/mine',//绑定成功跳转个人中心
            });
          } else {
            Toast({
              //mintui提示效果
              message: res.msg,
              duration: 2000,
            });
          }
        });
      },
      //发送验证码
      getYanzhengAxios: function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/sendMsg',
          data:{
            openid:sessionStorage.openid,
            phone :vm.Encrypt(vm.phoneNumber),
            type : 4,//绑定手机
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000,
              });
              //开启倒计时
             vm.mytimer();
            } else if(data.code == 2) {
              MessageBox.confirm(data.msg, '提示', {confirmButtonText: '同步'}).then(({ value, action }) => {
                vm.flag = false;

                $.post(comLink.yxtHost + '/user/sendMsg', {
                  openid:sessionStorage.openid,
                  phone : vm.Encrypt(vm.phoneNumber),
                  type : 4,//绑定手机
                  flag : 1
                }, function(res) {
                  if(res.code == 1){
                    Toast({
                      //mintui提示效果
                      message: res.msg,
                      duration: 2000,
                    });
                    vm.mytimer();
                  } else {
                    Toast({
                      //mintui提示效果
                      message: data.msg,
                      duration: 2000,
                    });
                  }
                });
              })
            } else {
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000,
              });
            }
          },
          error:function (data) {

          }
        })
      },
      //绑定手机号
      getMessageAxios: function(){
        var _vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/bindPhone',
          data:{
            'openid':sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            console.log(data,'data11111');
            if(data.code == 1){
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000,
              });
            }else{
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000,
              });
            }
          },
          error:function (data) {

          }
        })
      },
      //获取短信验证码 按钮
      checkedPhoneNum (){
        let reg = /^1\d{10}$/
        if(!this.phoneNumber){
        	Toast({
            //mintui提示效果
            message: "手机号不能为空",
            duration: 2000,
          });
        }else if(reg.test(this.phoneNumber)){
         	//调用发送验证码方法
	          this.getYanzhengAxios();
        }else{
          Toast({
            //mintui提示效果
            message: "手机号输入有误",
            duration: 2000,
          });
        }
      },
      submit(){
        // this.checkedPhoneNum ();
        // this.savePhonePassAxios();
//      let reg = /^[\w]{6,12}$/;
        let reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/;
        console.log(reg.test(this.password))
        if(reg.test(this.password)){
        //  输入格式符合
          if(this.newPassword === this.password){
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
              this.savePhonePassAxios();//密码修改格式正确 调用保存手机号码和密码的接口
              // sessionStorage.setItem('loginPassWord',this.firstPassword)
              sessionStorage.setItem('phone',this.phoneNumber)
              // this.$router.back(-1);

            }
          }else{
            Toast({
              //mintui提示效果
              message: "密码输入不一致",
              duration: 2000,
            });
          }
        }else{
          Toast({
            //mintui提示效果
            message: "密码输入格式有误",
            duration: 2000,
          });
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss";
  .set-phone-number{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;

    .set-content{
      width: 100%;
      height: 100%;

      .set-main{
        width: 100%;

        .set-row{
          width: 100%;
          height: p(80);
          line-height: p(80);
          overflow:hidden;
          border-bottom: p(1) solid #eee;
          padding: 0 p(24);
          >span{
            display: inline-block;
            width: 25%;
            float: left;
            font-size: 1.8rem;
          }
          >input{
            display: inline-block;
            height: 98%;
            width: 75%;
            float: left;
            font-size: 1.8rem;
          }
          .get-yanzhengma-btn{
            position: absolute;
            top: 37%;
            margin-top: -1rem;
            right: 1.5rem;
            font-size: 1.375rem;
            background: #307ff5;
            border-radius: 0.625rem;
            color: white;
            display: inline-block;
            height: 3.4rem;
            line-height: 3.4rem;
            width: 9.125rem;
            text-align: center;
          }
          .count {
            color: white;
            background-color: gray;
          }
        }
      }
    }
    .bottom-button{
      position: fixed;
      bottom: p(20);
      right: p(24);
      left: p(24);
      height: p(90);
      background: $bgBlue;
      border-radius: p(10);
      color: white;
      text-align: center;
      line-height: p(90);
      font-size: p(30);
    }
  }
</style>
