<template>
  <div class="order-detail-content" v-title data-title="订单详情">
    <div class="head-content f-oh">
      <div class="head-word f-fl" v-if="!resttime">
        <span class="fontSize-14">等待买家付款</span>
        <span class="fontSize-11" v-text="setTime"></span>
      </div>
      <div class="head-word f-fl" v-if="resttime">
        <span class="fontSize-14">订单已取消</span>
      </div>
      <div class="img-wai f-fr">
        <img class="img-icon" :src=imgIcon alt="">
      </div>
    </div>
    <div class="address-content">
      <span class="title fontSize-12  p-lef-rig24">收货地址:</span>
      <div class="receiver-infos fontSize-14  p-lef-rig24">
        <div class="detailed-address">
        	<div class="" v-if="orderDetail.order.getName">
        		<span>收货人：{{orderDetail.order.getName}}</span><br>
		        <span>电话：{{orderDetail.order.getPhone}}</span><br>
		        <span>地址：{{orderDetail.order.province}} {{orderDetail.order.city}} {{orderDetail.order.area}} {{orderDetail.order.address}}</span>

        	</div>
          <div class="" v-else>
            <a v-if="!resttime" class="do-address" @click="doAddress(orderDetail.order.id)">去完善</a>
            <a v-if="resttime" class="do-address" style="background-color: gray;">去完善</a>
          </div>

        </div>
      </div>
    </div>
    <div class="address-content" v-for="(item,i) in orderDetail.list" :key="i">
      <div class="order-content f-oh" v-for="(pro,j) in item.productList" :key="j">
        <div class="bar-main m-top10 f-fl f-oh b-white p-lef-rig24">
          <img :src=item.logo class="icon-tostore f-fl m-right5">
          <dt class="fontSize-12 f-fl m-right10" @click="toHomePage">{{item.name}}</dt>
          <i class="icon iconfont icon-more f-fl fontSize-18"></i>
        </div>
        <div class="f-oh f-fl list-main f-pr">
          <img class="img-pic dis-inblo f-fl" :src=pro.logo alt="" @click="toProDetail(pro)">
          <div class="pro-name-infos f-fl m-left10">
            <span class="pro-title fontSize-14 f-db"><span  class="brand w-color f-fl m-right5">品牌</span>{{pro.name}}</span>
            <span class="pro-detail fontSize-10 f-db">{{pro.skuName}}</span>
          </div>
          <span class="pro-price dis-inblo fontSize-10 f-fr">￥{{pro.price}}</span>
          <span class="pro-num dis-inblo fontSize-10 f-fl">X{{pro.number}}</span>
        </div>
      </div>
    </div>
    <div class="real-price">
      <ul>
        <li>
          <span>商品总价</span>
          <span>￥ {{order.sumAmount}}</span>
        </li>
        <li>
          <span>折扣</span>
          <span>-￥ {{order.discount}}</span>
        </li>
        <li>
          <span>优惠</span>
          <span>-￥ {{order.coupon}}</span>
        </li>
        <li>
          <span>运费</span>
          <span>+￥ 0</span>
        </li>
        <li class="shifukuan">
          <span class="title">实付款</span>
          <span class="price">￥ {{order.realAmount}}</span>
        </li>
      </ul>
    </div>
    <div class="order-infos fontSize-14">
      <ul>
        <li>
          <span>分期付款</span>
          <span>￥{{order.showPeriod}} (含手续费￥0.00/期)</span>
        </li>
        <li>
          <span>订单号：</span>
          <span>{{order.ordId}}</span>
          <button class="tag-read" :data-clipboard-text=order.ordId @click="copy">复制</button>
        </li>
        <li>
          <span>支付方式：</span>
          <span>建设银行（分期）</span>
        </li>
        <li>
          <span>支付单号：</span>
          <span>{{order.tradeNo}}</span>
        </li>
        <li>
          <span>创建时间：</span>
          <span>{{order.createTime}}</span>
        </li>
        <li>
          <span>付款时间：</span>
          <span>{{order.payTime}}</span>
        </li>
      </ul>
    </div>

    <div class="bottom-btns f-oh p-lef-rig24">
      <!--<div class="">
        <span class="f-fl total-price-acount" style="margin-left: 1rem">总价： ￥{{order.realAmount}}</span>
      </div>-->
      <div class="btns f-fr" v-if="!resttime">
        <span @click="payBtn()"  v-if="!resttime">付款</span>
        <span  v-else  style="background: #eee;color: #000;">已超时</span>
        <span @click="cancelOrderAxios()">取消订单</span>
      </div>
      <div class="btns f-fr" v-if="resttime">
        <span style="background-color: white"></span>
        <span>已失效</span>
      </div>
    </div>
  </div>
</template>
<script>
  import comLink from "./../../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker,MessageBox } from "mint-ui";
  import Clipboard from 'clipboard';
  export default {
    data (){
      return {
      	resttime:false,
        imgIcon : '@/../static/image/home/brand_store/newPro3g.png',
        activeWord : 1,
        orderId : '',
        orderDetail : {
          order : {
            status : 0,
          },
          address:{

          }
        },//订单详情
        order : {
          sumAmount : 0,
          realAmount :0,
          createTime : '',
          payTime : '',
          ordId : '',
          coupon : 0,
          discount : 0,
          showPeriod : '',
        },
        address:{
          id : '',
        },
        setTime : '正在估算时间...',
      }
    },
    mounted(){
      var openid = sessionStorage.openid;
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        openid = this.GetQueryString('openid');
        if(openid != undefined && openid != null && openid != 'undefined' && openid != 'null' && openid != '') {
          sessionStorage.setItem('openid', openid);
          // alert(openid);
        }
      }
      this.orderDetailAxios();

//    this.daojishi();
    },
    methods :{
      doAddress(id) {
        this.$router.push({
          path : '/home/confirmOrderRouter',///home/confirmOrderRouter?orderId=115
          query : { orderId : id}
        })
      },
      GetQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]);
        return null;
      },
      //回到主页
      toHomePage (){
        this.$router.push({
          path: '/'
        });
      },
      //
      toProDetail(pro){
        this.$router.push({
          path : '/home/proDetailRouter',
          query : { id : pro.id}
        })
      },
   	  //24小时倒计时
      daojishi(leftTime){

        leftTime=parseInt(leftTime)
        var hours =  Math.floor(leftTime / 1000 / 60 / 60 % 24); //计算剩余的小时
        var minutes =  Math.floor(leftTime / 1000 / 60 % 60);//计算剩余的分钟
        var seconds =  Math.floor(leftTime / 1000 % 60);//计算剩余的秒数
    	this.setTime =
        (hours < 10? '0'+hours:hours)+"小时" +
        (minutes < 10 ? '0'+minutes : minutes)+"分"+
        (seconds < 10 ? '0'+seconds:seconds)+"秒"+'后将关闭订单支付';

      },
      //获取订单详情
      orderDetailAxios : function(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
        $.ajax({
          url:comLink.yxtHost + '/order/detail',
          data:{
            openid : sessionStorage.openid,
            orderId:orderId,
          },
          dataType:'json',
          type:'post',
          success:function (res) {
            if(res.code == 1){
            	var leftTime = res.data.order.countDown;
            	let status = res.data.order.status;
              		// alert(res.data.order.status);
	            if(leftTime >= 0 && status == 1){
	              	var timer=setInterval(function(){
			                vm.daojishi(leftTime);
			                leftTime -= 1000;
			            },1000);
	              	}else{
	              	  	vm.resttime=true;
		            	clearInterval(timer);
	              	}
              // vm.order = vm.orderDetail.order;
            	vm.orderDetail = res.data;

              	vm.order.sumAmount = vm.orderDetail.order.sumAmount;
              	vm.order.realAmount = vm.orderDetail.order.realAmount;
             	vm.order.createTime = vm.orderDetail.order.createTime;
              vm.order.payTime = vm.orderDetail.order.payTime;
              vm.order.ordId = vm.orderDetail.order.ordId;
              vm.order.coupon = vm.orderDetail.order.coupon;
              vm.order.discount = vm.orderDetail.order.discount;
              vm.order.showPeriod = vm.orderDetail.order.showPeriod;
              vm.order.productCount = vm.orderDetail.order.productCount;
              vm.orderDetail.address=vm.orderDetail.address;
              // vm.orderDetail.address.name=vm.orderDetail.order.getName;
              // vm.orderDetail.address=vm.orderDetail.address;
              if(vm.orderDetail.address){
                vm.address.id = vm.orderDetail.address.id;
              }else{
                vm.address.id = null;
              }

              let listArr = vm.orderDetail.list;
              for(var i = 0;i < listArr.length;i ++){
                listArr[i].logo = comLink.yxtImgHost + listArr[i].logo;

                let productArr = listArr[i].productList;
                for( var j = 0;j < productArr.length;j ++){
                  productArr[j].logo = comLink.yxtImgHost + productArr[j].logo
                }
              }


              // vm.daojishi();

            }else{
//               Toast({
//                 message: res.msg,
//                 duration: 2000
//               });
            }
          },
          error:function (res){

          }
        })
      },

      //支付按钮
      payBtn(){
        // alert('点击了')
        // if(this.address.id){
        //   alert('aaaaaa')
        //   this.payNowAxios();
        // }//因为地址不存在 先注释
        this.payNowAxios();
      },
      copy : function () {
        var clipboard = new Clipboard('.tag-read');
        clipboard.on('success', e => {
            Toast({
                message: '复制成功',
                duration: 2000
              });
          // 释放内存
          clipboard.destroy();
        });
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
        //立即支付
      payNowAxios : function(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=')
        let orderId = hash[1]
        console.log(hash,1111111111111)
        $.ajax({
            url:comLink.yxtHost + '/pay/payOrder',
            data:{
            	openid :sessionStorage.openid,
              orderId:orderId
            },
            dataType:'json',
            type:'post',
            success:function (data) {
              if(data.code == 1){
                Toast({
                  //mintui提示效果
                  message: '跳转建行信用卡支付中...',
                  duration: 2000,
                });

                // window.location.href = data.data
                window.open(data.data,'_self');
                window.open(data.data,'_self')
              } else {
                Toast({
                  message: data.msg,
                  duration: 2000
                });
              }
            },
            error:function (data) {

            }
          })
//      $.ajax({
//        url:comLink.yxtHost + '/order/pay',
//        data:{
//          openid : sessionStorage.openid,
//          orderId:orderId,
//          addressId : vm.address.id,
//        },
//        dataType:'json',
//        type:'post',
//        success:function (res) {
//          if(res.code == 1){
//            $.ajax({
//              url:comLink.yxtHost + '/pay/payOrder',
//              data:{
//              	openid : sessionStorage.openid,
//                orderId:res.data
//              },
//              dataType:'json',
//              type:'post',
//              success:function (data) {
//                if(data.code == 1){
//
//                  // window.location.href = data.data
//                  window.open(data.data,'_self');
//                  window.open(data.data,'_self')
//                } else {
//                  Toast({
//                    message: data.msg,
//                    duration: 2000
//                  });
//                }
//              },
//              error:function (data) {
//
//              }
//            })
//          }else{
//            Toast({
//              message: res.msg,
//              duration: 2000
//            });
//          }
//        },
//        error:function (res){
//
//        }
//      })
      },
      //取消订单/order/cancel
      cancelOrderAxios: function(){
        MessageBox.confirm('确定取消订单?').then(action => {
          var vm = this;
          let hash = window.location.hash;
          hash = hash.split('=')
          let orderId = hash[1];
          $.ajax({
            url:comLink.yxtHost + '/order/cancel',
            data:{
              orderId : orderId,
              openid : sessionStorage.openid
            },
            dataType:'json',
            type:'post',
            success:function (data) {
              if(data.code == 1){
                // vm.orderLists = data.data;
                Toast({
                  message: data.msg,
                  duration: 2000
                });
                vm.$router.back(-1);
              }else if(data.code == 0){
                Toast({
                  message: data.msg,
                  duration: 2000
                });
              }

            },
            error:function (data) {

            }
          })
        });


      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .order-detail-content{
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    .head-content{
      width: 100%;
      height: p(180);
      background: $bgBlue;
      padding: 0 p(50);

      .head-word{
        color: white;
        >span:nth-child(1){
          line-height: p(68);
        }
        >span{
          margin-top: p(20);
          display: block;
        }
      }
      .img-wai{
        margin-top: p(40);
        width: p(110);
        .img-icon{
          width: 100%;
        }
      }
    }
    .address-content{
      margin-top: p(20);
      width: 100%;
      background: white;

      .title{
        margin-top: p(20);
        color: #a1a1a1;
      }
      .receiver-infos{
        line-height: p(48);
        .phone{
          margin-left: p(200);
        }
        .name{
          margin-left: p(30);
        }
        .address-detail{
          margin-left: p(30);
        }

        .do-address {
          padding: 0.5rem 1rem;
          display: inline-block;
          background-color: #307ff5;
          color: white;
          margin: 0.5rem;
          border-radius: 0.5rem;
        }
      }
      .order-content{
        overflow: hidden;
        background: white;
        padding-bottom: p(20);

      }
      .bar-main{
        color: #8c8c8c;
        line-height: p(60);
        border-bottom: p(1) solid #eeeeee;
        width: 100%;

        .icon-tostore{
          display: inline-block;
          width: p(30);
          height: p(30);
          margin-top: p(15);
        }
        .icon-more{
          margin-top: p(2);
        }
      }
    }

    .list-main{
      padding: p(20) p(24);
      background: #e6f5ff;
      margin-top: p(20);
      width: 100%;
      .img-pic{
        width: p(133);
        height: p(133);
        background: #eee;
      }
      .pro-name-infos{
        width : 58%;
        /*max-width: p(380);*/
        height: p(133);

        .pro-detail{
          color: #9fa0a1;
          line-height: p(40);
          height: p(40);
          text-align: left;
          margin-top: p(18);
        }

        .pro-title {
          line-height: p(40);
          height: p(80);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient: vertical
        }

        .brand {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 0.3125rem;
          background: #ff251a;
          /*margin-top: 0.6rem;*/
          font-size: p(22);
          height: p(30);
          line-height: p(30);
        }
      }
      .pro-num{
        position: absolute;
        bottom: p(20);
        right: p(24);
      }
      .pro-price{
        color: #ff2727;
      }
    }



    .order-infos{
      background: #FFFFFF;
      width: 100%;
      padding: 0 p(24) p(100) p(24);
      margin-top: p(20);
      line-height: p(30);

      >ul{
        padding: p(20) 0;
        >li:nth-child(1){
          margin-top: p(10);
          color: #a1a1a1;
          >span:nth-child(2){
            float: right;
          }
        }
        >li:nth-child(1),>li:nth-child(2){
          font-size: p(22);
        }
        >li:nth-child(2){
          line-height: p(42);
        }
        >li{
          overflow: hidden;
          margin-top: p(20);
          span{
            float: left;
          }
          button{
            display: inline-block;
            float: right;
            font-size: p(22);
            width: p(100);
            height: p(40);
            text-align: center;
            line-height: p(40);
            background: #eee;
            color: #999;
            border-radius: p(10);
            border: none;
          }
        }
      }
    }

    .bottom-btns{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: p(100);
      background: white;
      text-align: right;

      .btns{
        display:inline-block;
        overflow: hidden;
        >span{
          display: inline-block;
          width: p(155);
          height: p(70);
          line-height: p(70);
          text-align: center;
          margin-top: p(15);
          background: #eee;
          float: left;
          margin-left: p(10);
          font-size: p(30);
          border-radius: p(10);
        }
        >span:nth-child(1){
          color: white;
          background: $bgBlue;
        }
      }
    }
    .real-price{
      width: 100%;
      overflow: hidden;
      background: #FFFFFF;
      margin-top: p(20);
      font-size: p(24);
      >ul{
        padding: 0 p(24);
        width: 100%;
        float: left;
        overflow: hidden;
        color: #999999;
        >li{
          line-height: p(44);
          margin-top: p(10);
          overflow: hidden;
          width: 100%;
          float: left;
          >span:nth-child(1){
            float: left;
          }
          >span:nth-child(2){
            float: right;
          }
        }
        .shifukuan{
          font-size: p(28);
          color: black;
          .price{
            color: #ff2726;
            font-size: 3rem;
            height: 3rem;
            line-height: 3rem;
          }
        }
      }
    }
  }
</style>
