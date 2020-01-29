<template>
  <div class="coupon-content-all b-white" v-title data-title="我的优惠券">
    <!--<coupon-component :couponLists="couponLists" :isGetCoupon="isGetCoupon"></coupon-component>-->
    <div class="coupon-detail">
      <ul class="coupon-main">
        <li class="coupon-row m-top10 f-oh f-pr" v-for="(item,i) in couponData" :key="i">
          <div class="left-main f-fl w-color dis-inblo">
            <p class="money">￥<span style="font-size: 4.625rem;">{{ item.reduceMoney }}</span></p>
            <p class="fontSize-12" style="color: #fff; padding-left: 2rem; font-weight: 500; text-align: center;">
            	满{{item.needMoney}}立减{{item.reduceMoney}}元
            </p>
          </div>
          <div class="right-main f-fl dis-inblo">
            <p class="limit fontSize-12">

				{{item.couponInfo}}

            	<!--全场通用-->
            </p>
            <p class="time fontSize-11 m-top15">有效期截止：{{item.validTime}}</p>
          </div>
          <img src="../../../static/img/yiling.png" class="yiling" v-if = "item.userStatus === 0 || item.userStatus === 1">
          <div class="get-coupon fontSize-16 w-color  f-fr" v-else>
            <p class="" @click="clickTitle(item,i)">点击领取</p>
          </div>
        </li>

      </ul>
    </div>
    <!--<div class="my-coupon f-pr">
      <div class="  ">
        <a href="javascript:void(0)" class="router" @click="toMyCoupon">
          <p class="word dis-inblo w-color">查看我的优惠劵</p>
        </a>
      </div>
    </div>-->


    <div class="black-cover" v-if="isShowBlackCover">

    </div>
  </div>
</template>
<script>
  // import couponComponent from "./../../../subcomponents/coupon-component.vue";
  import axios from 'axios'
  import comLink from "../../common/common_link"; //导入总线
  const TIME_COUNT = 60;
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  export default {
    inject: ['reload'],
    data () {
      return {
        isGetCoupon :'',
        couponData : [],//
        couponId : null,
        isShowFirstPop : false,
        pop : {
          phoneNumber : null,
          isOk : false,
        },
        isShowBlackCover : false,
        couponImg : '@/../static/image/home/coupon_banner.png',
        popCounpon :{},
        show : true,
        count: '',
        timer : null,
        code : ''
      }
    },
    mounted (){
      var openid = sessionStorage.openid;
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        openid = this.GetQueryString('openid');
        if(openid != null && openid != 'null' && openid != undefined && openid != 'undefined' && openid != ''){
          sessionStorage.setItem('openid', openid);
          this.getManInfos();
        }
      }

      this.getCouponAxios();
      this.sendWxtoOther();
    },
    methods: {
      sendWxtoOther() {
        $.post(comLink.yxtHost + '/user/sign', {
          'url': window.location.href,
          'openid' :sessionStorage.openid
        }, function(resp) {
          if(resp.code==1){
            wx.config({
              debug: false,
              appId: resp.data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
              timestamp: resp.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: resp.data.nonceStr, // 必填，生成签名的随机串
              signature: resp.data.signature, // 必填，签名
              jsApiList: [
                'onMenuShareAppMessage',
	              'onMenuShareTimeline',
              ]
            });
            wx.ready(function() {
	              wx.onMenuShareAppMessage({ //朋友
	                title: '邮讯通商城',
	                desc: '领取优惠券',
	                link: 'https://www.yxtccb.com/coupon/getCouponLogin',
	                imgUrl: 'https://www.yxtccb.com/yxt/static/img/share.png',
	                success: function() {

	                },
	                cancel: function() {

	                }
	              });
	              //分享朋友圈
				        wx.onMenuShareTimeline({
				        		title: '邮讯通商城',
				            desc: '领取优惠券',// 分享标题
				            link: 'https://www.yxtccb.com/coupon/getCouponLogin',
				            imgUrl: 'https://www.yxtccb.com/yxt/static/img/share.png', // 分享图标
				            success: function () {
				                // 用户确认分享后执行的回调函数
				            },
				            cancel: function () {
				                // 用户取消分享后执行的回调函数
				            }
				        });
            })
          }
        });
      },
      getManInfos(){
        $.ajax({
          url: comLink.yxtHost + '/user/getInformation',
          data: {
            'openid': sessionStorage.openid,
          },
          dataType: 'json',
          type: 'post',
          success: function (data) {
            console.log(data, '登陆用户');
            if (data.code == 1) {

            } else {
              sessionStorage.clear();
            }
          },
        })
      },
      GetQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      },
      toMyCoupon() {
        if(sessionStorage.openid == null) {
          Toast({
            message: '请先登陆',
            duration: 2000
          });
          return;
        }
        this.$router.push({
          path : '/home/mycouponRouter',
        })
      },
    	//获取优惠卷
    	getCoupon(){
    		this.getAxios();
    	},
      //
      getYanzhenCode(){
        this.getYanzhengAxios();
      },
      //发送验证码
      getYanzhengAxios: function(){
        var _vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/sendMsg',
          data:{
            openid:sessionStorage.openid,
            type : 3,//获取优惠劵
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
      closeHomePop(){
        this.isShowFirstPop = false;
        this.isShowBlackCover = false;
        // localStorage.setItem('isShowFirstPop',false);
        // localStorage.setItem('isShowBlackCover',false)
        this.dianjile = true;
      },
      // checkPhone(){
      //   let reg = /^1\d{10}$/;
      //   if(reg.test(this.phoneNumber)){
      //     //调用发送验证码方法
      //     this.pop.isOk = true;
      //   }else {
      //     Toast({
      //       //mintui提示效果
      //       message: "手机号码输入格式错误",
      //       duration: 2000
      //     });
      //   }
      // },
      clickTitle(item,i){

        if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
          Toast({
            message: '请先登陆',
            duration: 2000
          });
          return;
        }
        if(item.userStatus == 0 || item.userStatus == 1 || item.userStatus == -1) {
          return;
        } else {
          let index = i;
          if(item.typeId === 2){
            this.isShowFirstPop = true;
            this.isShowBlackCover = true;
            this.popCounpon = this.couponData[index];
          }
          if(item.title === '去使用'){
            this.$router.push({
              path : '/home/homeSearchRouter'
            })
          }else if (item.title === '点击领取'){
            //  调用领取优惠劵方法
            this.couponId = item.id;
            if(item.typeId != 2) {
              this.getAxios();
            }

            this.getCouponAxios();//领取优惠劵后，再次调用优惠劵列表数据方法
            item.title = '去使用';
            this.couponData.splice(100,0);
            console.log(item.title)
          }else if( item.title === '已使用'){
            Toast({
              //mintui提示效果
              message: '优惠劵已使用',
              duration: 2000,
            });
          }else if(item.title === '已过期'){
            Toast({
              //mintui提示效果
              message: '优惠劵已过期',
              duration: 2000,
            });
          }
        }

      },
      //获取优惠劵列表
      getCouponAxios: function() {
        var _vm = this;
        $.ajax({
          url: comLink.yxtHost + '/index/couponList',
          data: {
            openid: sessionStorage.openid
          },
          dataType: 'json',
          type: 'post',
          success: function (data) {
            console.log("返回值优惠劵：", data);
            if (data.code == 1) {
              _vm.couponData = data.data;
              //判断优惠劵是否被领取
              for(var i = 0,l = _vm.couponData.length;i < l; i ++){
                if (_vm.couponData[i].userStatus == 0 || _vm.couponData[i].userStatus == 1) {
                  _vm.couponData[i].title = '已领取';
                } else if(_vm.couponData[i].userStatus == 1) {
                  _vm.couponData[i].title = '已使用';
                } else {
                  _vm.couponData[i].title = '点击领取';
                }
                if(_vm.couponData[i].needMoney==0){
                	_vm.couponData[i].needMoney="任意金额"
                }
              }
              console.log(_vm.couponData)
            }
          },
          error: function (data) {

          }
        })
      },
      //领取优惠劵
      getAxios: function() {
        var _vm = this;
        $.ajax({
          url: comLink.yxtHost + '/index/getCoupon',
          data: {
            openid: sessionStorage.openid,
            couponId : _vm.couponId,
            code : _vm.code
          },
          dataType: 'json',
          type: 'post',
          success: function (data) {
            console.log("返回值优惠劵：", data);
            _vm.getCouponAxios();
            if (data.code == 1) {
              Toast({
                //mintui提示效果
                message: '领取成功',
                duration: 1500,
              });
              this.closeHomePop();
            }else{
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000,
              });
            }
          },
          error: function (data) {

          }
        })
      }
    },
    components : {
      // couponComponent
    }
  }
</script>
<style>
  .router{
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
.coupon-content-all {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #eee;
  font-size: p(38);
  .my-coupon {
      width: 100%;
      height: p(95);
      /*border-radius: p(20);*/
      background: #fff;
      text-align: center;
      position: fixed;
      bottom: 0;
      font-size: p(34);
			.word{
				width: 100%;
				height: p(95);
				line-height: p(95);
				background-color: #fe842f;
			}
      .word:after {
        content: '';
        background-image: url("../../../static/img/home/coupon/pointer.png");
        background-size: p(54) p(38);
        position: absolute;
        width: p(54);
        border-radius: p(20);
        height: p(38);
        z-index: 100;
        bottom: p(27);
        margin-left: p(5);
      }
    }
  .coupon-detail {
    padding-bottom: 9rem;
    overflow-y: auto;
    -webkit-overflow-scrolling : touch;
    top: 0;
    bottom: p(125);
    width: 100%;
    .coupon-main {
      padding: p(0) p(23);

      .coupon-row {
        width: 100%;
        height: p(230);
        /*padding: p(0) p(23);*/
        background-image: url("../../../static/img/coupon.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
		position: relative;

		>.yiling{
			right:0;
			top: 0;
			width: p(114);
			position: absolute;
		}
        .left-main {
          width: p(220);
          text-align: center;

          .money {
          	color: #fff;
            margin-top: p(45);
            margin-bottom: p(20);
          }
        }

        .right-main {
          padding: p(40) 0 0 p(35);

          .ellipsis{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            max-width: p(320);
            color: #fc842e;
          }
          .limit{
            font-size: 2.1rem;
            font-weight: 500;
            color: #333;
            margin-bottom: 5rem;
          }
          .shipping{
            color: #333;
          }
          .time{
            color: #666;
          }
        }

        .get-coupon {
          text-align: center;
          color: white;
          padding-right: 0.6rem;
          p{
          	color: #5e80d9;
          	margin-top:5rem ;
          	text-align: center;
          	font-weight: 550;
          	width: p(112);
			height: p(36);
			background-color: #ffffff;
			border-radius: p(18);
			font-size: p(20);
			line-height: p(30);
			border: solid 1px #5e80d9;
          }
        }


      }
    }
  }
  /*进入页面的广告弹窗*/
  .enter-popup-content{
    position: fixed;
    z-index: 99;
    left: p(95);
    right: p(95);
    top: p(220);
    height: p(900);

    .white-part{
      /*<!--background: $bgBlue;-->*/
      height: p(800);
      background-image: url("../../../static/image/home/pop_img.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      padding-top: p(225);

      .top-img{
        width: 100%;
        position: absolute;
        top: p(-85);
        text-align: center;

        .img-pic{
          width: 80%;
          height: p(220);
        }
      }
      .title{
        /*margin-top: p(135);*/
        width: 100%;
        text-align: center;
        color: white;

        .big-title{
          font-size: p(55);
          display: block;
        }
        .small-title{
          line-height: p(54);
          margin-bottom: p(20);
        }
      }
      .coupon-content{
        padding: 0 p(30);

        .coupon-img{
          width: 100%;
        }
        .coupon-words{
          width: 100%;
          top: 0;
          .left{
            width: 31.3131%;
            .coupon-price{
              font-size: p(60);
            }
          }
          .right{
            width: 68.6868%;
            .right-details{
              display: inline-block;
              width: 100%;
              float: left;
            }
            .right-details:nth-child(1){
              line-height: p(44);
              margin-top: p(10);
            }
            .right-details:nth-child(2){
              height: p(30);
            }
            .right-details:nth-child(3){
              line-height: p(58);
            }
          }
        }
      }
      .get-yanzhengCode-content{
        width: 100%;
        .phone{
          padding: 0 p(40);
          width: 100%;
          margin-bottom: p(10);
          .ipt{
            width: 100%;
          }
        }
        .yanzheng-code{
        	margin: p(60) 0 p(60) 0;
          padding: 0 p(40);
          width: 100%;
          .ipt{
            width: 60%;
          }
          .get-btn{
            width: 35%;
            display: inline-block;
            height: 100%;
            line-height: p(60);
            text-align: center;
            background: #eee;
            border-radius: p(10);
          }
        }
        .ipt{
          display: inline-block;
          box-sizing: border-box;
          border: 1px solid $danlan;
          border-radius: p(10);
          height: p(60);
          line-height: p(60);
          padding-left: p(10);
        }
      }
      .get-coupon-btn{
        width: 100%;
        padding: 0 p(120);
        height: p(60);
        text-align: center;

        .btn{
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: p(60);
          background: white;
          color: $bgBlue;
          border-radius: p(60);
        }
      }
    }
    .close-main{
      width: 100%;
      height: p(60);
      text-align: center;
      .icon-close{
        height: p(60);
        line-height: p(60);
        font-size: p(30);
        width: p(60);
        color: white;
        border: 1px solid white;
        border-radius: 50%;

      }
    }
  }

  }
  .black-cover{
    position: fixed;
    z-index: 98;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: black;
    opacity: 0.3;
  }
</style>
