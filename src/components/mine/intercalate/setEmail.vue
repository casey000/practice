<template>
  <div class="set-email" v-title data-title="绑定邮箱">
    <div class="set-content">
      <ul class="set-main fontSize-15">
        <li class="set-row">
          <span>邮箱：</span>
          <input type="text" placeholder="请输入邮箱" v-model="emailValue">
        </li>
        <li class="set-row f-pr">
          <span>验证码：</span>
          <input type="text" placeholder="请输入邮箱验证码" v-model="code">
          <span class="get-yanzhengma-btn" @click="getYanzhengma()" v-show="show">获取验证码</span>
          <span v-show="!show" class="get-yanzhengma-btn count" style="background-color: gray">{{count}} s</span>
        </li>
      </ul>
    </div>
    <div class="bottom-button" @click="bingEmail()">
      <span>确定</span>
    </div>
  </div>
</template>
<script>
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  const TIME_COUNT = 60;
  export default {
    data (){
      return {
        emailValue : null,
        code : null,
        show : true,
        count: '',
        timer : null
      }
    },
    mounted (){

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
      //绑定邮箱按钮
      bingEmail(){
        this.bindEamilAxios();

      },
      //获取验证码按钮
      getYanzhengma(){
        if(!this.emailValue) {
          Toast({
            //mintui提示效果
            message: "邮箱不能为空",
            duration: 2000,
          });
        }else{
          this.emailAxios();
          console.log(111)
          console.log(this.emailValue)
        }
      },
      //绑定邮箱
      bindEamilAxios: function(){
        var _vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/bindEmail',
          data:{
            'openid':sessionStorage.openid,
            'email' : _vm.Encrypt(_vm.emailValue),
//          'email' : _vm.emailValue,
//          'code' : _vm.code
            'code' : _vm.Encrypt(_vm.code)
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              Toast({//判断验证码输入是否正确
                //mintui提示效果
                message: "已成功绑定邮箱",
                duration: 2000,
               
              });
              _vm.$router.push({
			        path :'/mine/AccountSecurity',
			   })
            }else{
              Toast({//判断验证码输入是否正确
                //mintui提示效果
                message: "验证码输入有误",
                duration: 2000,
              });
            }
          },
          error:function (data) {

          }
        })
      },
      //获取邮箱验证码
      emailAxios: function(){
        var _vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/sendEmailMsg',
//        url:"http://47.106.134.150:8080/yxt-home" + '/user/sendEmailMsg',
          
          data:{
            'openid':sessionStorage.openid,
            'email' : _vm.Encrypt(_vm.emailValue),
//          'email' : _vm.emailValue,
            
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
              //调用发送验证码方法
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
          error:function (data) {

          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss";
  .set-email{

    .set-content{
      width: 100%;
      height: 100%;
      background: white;

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
            top: 30%;
            margin-top: p(-16);
            right: p(24);
            font-size: p(22);
            background: $bgBlue;
            border-radius: p(10);
            color: white;
            display: inline-block;
            height: p(60);
            line-height: p(60);
            width: p(150);
            text-align: center;
            /*padding: p(10);*/
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
