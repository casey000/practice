<template>
  <div class="set-phone-number"  v-title data-title="登录">
    <div class="nav-content f-oh fontSize-18">
      <dt class="nav-main f-fl" :class="{choosedDengLu : navNum === 0}" @click="chooseDengluWay(0)">
        <span class="nav-inner">密码登录</span>
      </dt>
      <dt class="nav-main f-fl" :class="{choosedDengLu : navNum === 1}"  @click="chooseDengluWay(1)">
        <span class="nav-inner">验证码登录</span>
      </dt>

    </div>
    <div class="set-content">
      <ul class="set-main fontSize-15">
        <li class="set-row">
          <span>手机号：</span>
          <input type='text' style="font-size: 2rem" placeholder="请输入手机号" v-model="phoneNumber">
        </li>
        <li class="set-row" v-if="mimaDenglu">
          <span>密　码：</span>
          <input type='password' style="font-size: 2rem" placeholder="请输入密码" v-model="password">
        </li>
        <li class="set-row f-pr" v-if="!mimaDenglu">
          <span>验证码：</span>
          <input type='text' style="font-size: 2rem" placeholder="请输入验证码" v-model="code">
          <button class="getYanzhenCode" @click="getCode()" v-if="show">获取验证码</button>
          <button class="getYanzhenCode count" style="background-color: gray" v-if="!show">{{count}}s</button>
        </li>
        <div class="" v-show="wrongNum > 2" style="border-bottom: 0.0625rem solid #eee; padding-bottom: 0.5rem;">
        	<div id="v_container" style="width: 12rem; height: 5rem; display: inline-block; padding-top: 1rem; padding-left: 1rem;" >
        	</div>
        	<input  type='text' placeholder="请输入验证码" id="code_input" style="padding-bottom: 0; padding-left: 2rem;text-indent: 2rem; font-size:2rem; width: 15rem; display: inline-block; height: 4rem; line-height: 4rem;margin-top: -3rem;">
        </div>


      </ul>
    </div>
    <div class="bottom-button"  id="my_button" v-show="wrongNum > 2">
      <span>登　录</span>
    </div>
    <div class="bottom-button" @click="submit()" v-if="wrongNum <= 2">
      <span>登　录</span>
    </div>
    <div class="bottom-warn p-lef-rig24 f-oh">
      <span class="zhuce f-fl" @click="zhuceBtn">注　册</span>
      <span class="forget-password f-fr" @click="forgetPassWord()">忘记密码</span>
    </div>
    <!--<div class="weChat-denglu" @click="weChatDenglu()">-->
      <!--<div class="weChat-img">-->
        <!--<img class="weChat-img-pic" :src=weChatImg alt="">-->
      <!--</div>-->
      <!--<dt class="weChat-word">-->
        <!--<span>微信登录</span>-->
      <!--</dt>-->
    <!--</div>-->
  </div>
</template>
<script>
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup } from "mint-ui";
  import "./../../common/jq.min"; //导入总线
  import comLink from "./../../common/common_link"; //导入总线
  import gVerify from "./../../common/gVerify"; //导入验证码

  const TIME_COUNT = 60;

  export default {
    data (){
      return {
        yanzhengma : null,
        phoneNumber : '',
        password : '',
        weChatImg : '@/../static/image/home/brand_store/weChat_01.png',
        navNum : 0,
        mimaDenglu : true,
        code : '',
        show : true,
        count: '',
        wrongNum:0,
      }
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
      //点击获取验证码
      getCode(){
        let reg = /^1\d{10}$/
        if(reg.test(this.phoneNumber)){
          this.getYanzhengAxios();

        }
      },
      //选择登录方式
      chooseDengluWay(n){
        this.navNum = n;
        if(n === 0){
          this.mimaDenglu = true;
        }else{
          this.mimaDenglu = false;
        }
      },
      //
      forgetPassWord(){
        this.$router.push({
          path : '/mine/forgetPassWord'
        })
      },
      //获取验证码
      getYanzhengAxios : function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/sendMsg',
          data:{
//          phone : vm.phoneNumber,
            phone : vm.Encrypt(vm.phoneNumber),
            type : 2,
            openid : sessionStorage.openid,
          },
          dataType:'json',
          type:'get',
          success:function (res) {
            if(res.code == 1){
            	Toast({
                message: res.msg,
                duration: 2000
              });
              if (!vm.timer) {
                vm.count = TIME_COUNT;
                vm.show = false;
                vm.timer = setInterval(() => {
                  if (vm.count > 0 && vm.count <= TIME_COUNT) {
                    vm.count--;
                  } else {
                    vm.show = true;
                    clearInterval(vm.timer);
                    vm.timer = null;
                  }
                }, 1000)
              }
            } else {
              Toast({
                message: res.msg,
                duration: 2000
              });
            }
          },
        })
      },
      //登录接口
      dengluAxios : function(){
        var vm = this;
//      if(vm.mimaDenglu){
//
//      }
        $.ajax({
//        url:"http://47.106.134.150:8080/yxt-home/"+ '/user/phoneLogin',
          url:comLink.yxtHost + '/user/phoneLogin',

          data:{
            'phone': vm.Encrypt(vm.phoneNumber),
            'code' : vm.Encrypt(vm.code),
            'pwd' : md5(vm.password),
// 						'phone': vm.phoneNumber,
//          'code' : vm.code,
//          'pwd' : md5(vm.password),
          },
          dataType:'json',
          type:'get',
          success:function (res) {
            if(res.code == 1){
              sessionStorage.setItem('openid', res.data);
              $.ajax({
                url: comLink.yxtHost + '/user/getInformation',
                data: {
                  'openid': sessionStorage.openid,
                },
                dataType: 'json',
                type: 'post',
                success: function (data) {
//                console.log(data, 'login');
                  if (data.code == 1) {
                    let userId = data.data.user.id;//userId
                    let headLogo = data.data.userWx.headLogo;//头像
                    // let name = data.data.user.name;//姓名
                    let sex = data.data.user.sex;
                    let nickName = data.data.userWx.nickName;//昵称
                    let qrCode = data.data.userWx.qrCode;//用户二维码
                    let phone = data.data.user.phone;//用户手机

                    // sessionStorage.setItem('userId',userId);
                    // sessionStorage.setItem('name',name);
                    // sessionStorage.setItem('headLogo',headLogo);
                    // sessionStorage.setItem('sex',sex);
                    // sessionStorage.setItem('nickName',nickName);
                    // sessionStorage.setItem('qrCode',qrCode);
                    // sessionStorage.setItem('phone',phone);
                    vm.$router.push({
                      path : '/mine'
                    })
                  } else {
                    Toast({
                      message: res.msg,
                      duration: 2000
                    });
                  }
                },
              });
            } else {
            	vm.wrongNum++
              Toast({
                message: res.msg,
                duration: 2000
              });
            }
          },
          error:function (res){

          }
        })
      },
      submit(){
        let reg = /^1\d{10}$/;
        if(!this.phoneNumber){
          Toast({
            //mintui提示效果
            message: "手机号不能为空",
            duration: 2000,
          });
        }else if(reg.test(this.phoneNumber)){
          if(this.navNum === 0){
            this.code = '';
          }else{
            this.password = '';
          }
          if(this.navNum === 1){
            if(this.code){
              this.dengluAxios();//调用登录接口
            }else{
              Toast({
                //mintui提示效果
                message: "请输入手机验证码",
                duration: 2000,
              });
            }
          }else if(this.navNum === 0){
            if(this.password){
//          	if(this.wrongNum>2){
//
//          		document.getElementById("my_button").onclick = function(){
//								var res = verifyCode.validate(document.getElementById("code_input").value);
//									if(res){
//										alert("验证正确");
//           				this.dengluAxios();//调用登录接口
//									}else{
//										Toast({
//			                //mintui提示效果
//			                message: "验证码错误",
//			                duration: 2000,
//			              });
//										return;
//									}
//								}
//          	}else{
//           		this.dengluAxios();//调用登录接口
//          	}
							this.dengluAxios()
            }else{
              Toast({
                //mintui提示效果
                message: "请输入密码",
                duration: 2000,
              });
            }
          }
        }else{
          Toast({
            //mintui提示效果
            message: "手机号码格式不正确",
            duration: 2000,
          });
        }
        // let reg = /^[\w]{6,12}$/;
        // if(reg.test(this.firstPassword)){
        //   //  输入格式符合
        //   if(this.secondPassword === this.firstPassword){
        //     //  两次密码输入一致
        //     if(!this.phoneNumber){
        //       Toast({
        //         //mintui提示效果
        //         message: "手机号码不能为空",
        //         duration: 2000,
        //       });
        //     }
        //     else if(!this.yanzhengma){
        //       Toast({
        //         //mintui提示效果
        //         message: "验证码为空",
        //         duration: 2000,
        //       });
        //     }
        //     else if(this.phoneNumber&&this.yanzhengma){
        //       Toast({
        //         //mintui提示效果
        //         message: "密码修改成功",
        //         duration: 2000,
        //       });
        //       this.dengluAxios();//调用登录接口
        //       sessionStorage.setItem('loginPassWord',this.firstPassword);
        //       sessionStorage.setItem('phone',this.phoneNumber)
        //       // this.$router.back(-1);
        //
        //     }
        //   }else{
        //     Toast({
        //       //mintui提示效果
        //       message: "2次密码输入不一致",
        //       duration: 2000,
        //     });
        //   }
        // }else{
        //   Toast({
        //     //mintui提示效果
        //     message: "密码输入有误",
        //     duration: 2000,
        //   });
        // }
      },
      zhuceBtn(){
        this.$router.push({
          path : '/mine/login'
        })
      }
    },
    mounted(){
    	var vm=this
    	var verifyCode = new GVerify("v_container");
			document.getElementById("my_button").onclick = function(){
				var res = verifyCode.validate(document.getElementById("code_input").value);
				if(res){
					Toast({
            //mintui提示效果
            message: "验证码正确",
            duration: 2000,
          });
					vm.submit();
				}else{
					Toast({
            //mintui提示效果
            message: "验证码错误",
            duration: 2000,
          });
					return ;
				}
			}
    }

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
    z-index: 99;

    .nav-content{
      width: 100%;
      height: p(100);
      line-height: p(100);

      .nav-main{
        width: 50%;
        height: 100%;
        line-height: p(100);
        text-align: center;
      }
      .nav-main.choosedDengLu{
        box-sizing: border-box;
        border-bottom: 1.5px solid $bgBlue;
      }
    }
    .set-content{
      width: 100%;
      /*height: 100%;*/
      margin-top: p(70);

      .set-main{
        width: 100%;

        .set-row{
          width: 100%;
          height: p(110);
          line-height: p(110);
          overflow:hidden;
          border-bottom: p(1) solid #eee;
          padding: 0 p(50);
          font-size: 2.5rem;
          >span{
            display: inline-block;
            width: 25%;
            float: left;
          }
          >input{
            display: inline-block;
            height: 98%;
            width: 75%;
            float: left;
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
          .getYanzhenCode{
            position: absolute;
            height: p(60);
            /*padding: 0 p(10);*/
            width: p(200);
            text-align: center;
            top: 50%;
            right: 1.5rem;
            font-size: 2rem;
            margin: p(-25) p(24) 0 0 ;
            border-radius: p(5);
            border: none;
            background: #307ff5;
            color: white;
          }
        }
      }
    }
    .bottom-button{
      width: 80%;
      margin: 0 auto;
      margin-top: p(70);
      height: p(90);
      background: $bgBlue;
      border-radius: p(10);
      color: white;
      text-align: center;
      line-height: p(90);
      font-size: p(50);
    }
    .bottom-warn{
      width: 100%;
      height: p(50);
      line-height: p(50);
      color: #666666;
      margin-top: p(50);
      font-size: p(40);
    }
    .weChat-denglu{
      text-align: center;
      position: absolute;
      bottom: p(110);
      width: 100%;
      .weChat-img{
        display: inline-block;
        margin: 0 auto;
        width: p(130);
        height: p(130);
        border-radius: 50%;
        border: 2px solid green;
        overflow: hidden;
        .weChat-img-pic{
          width: 100%;
        }
      }
      .weChat-word{
        width: 100%;
        line-height: p(82);
        font-size: p(26);
        text-align: center;
      }
    }
  }
</style>
