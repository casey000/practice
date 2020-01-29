<template>
  <div  class="confirm-order-content" v-title data-title="确认订单">
    <div class="back-icon-allpage" @click="closePage"><i class="icon iconfont icon-back"></i></div>
    <div class="view">
      <div class="head-content p-lef-rig24" v-if="orderList.address" @click="toAddAddress()">
        <div class="contact-infos f-oh fontSize-15">
          <div class="name f-fl">{{orderList.address.name}}</div>
          <div class="phone-number f-fl">{{orderList.address.phone}}</div>
        </div>
        <dt class="address f-oh fontSize-12">
          <span class="is_default" v-if="orderList.address.isDefault == 1">[默认]</span>
          <div class="detailed-address f-fl">
            {{orderList.address.province}}
            {{orderList.address.city}}
            {{orderList.address.area}}
            {{orderList.address.address}}
          </div>
        </dt>
      </div>
      <div class="not-address-title" v-if="!orderList.address" @click="toAddAddress()">
        <span>请去填写收货地址</span>
      </div>
      <!--添加地址下背景图边框-->
      <div class="border-content">
        <div class="color-line"></div>
        <div class="white-back"></div>
      </div>

      <div class="pro-content" v-for="item in orderList.list">
        <div class="company-infos p-lef-rig24 f-oh">
          <img class="company-headprofile m-top10 f-fl" :src="item.logo" alt="">
          <dt class="conpany-name m-left10 f-fl fontSize-15">{{item.name}}</dt>
        </div>
        <div class="pro-infos fontSize-12 f-oh p-lef-rig24" v-for="itemChild in item.productList">
          <img class="pro-pics f-fl" :src="itemChild.logo" alt="">
          <dt class="pri-name padd-left right-infos f-oh">
            <span class="pro-name f-fl">{{itemChild.name}}</span>
            <!--<span class="pro-price f-fr">￥{{itemChild.price}}</span>-->
          </dt>
          <div class="pro-spec">
            <dt class="spec right-infos m-top10 padd-left f-oh">
              <span class="f-fl right-firt-line">{{itemChild.skuName}}</span>
            </dt>
            <!--<dt class="byStage right-infos padd-left m-top5 f-oh">
              <span class="f-fl">分期情况：</span>
              <span class="f-fl">{{orderList.order.period}}期</span>
            </dt>-->
          </div>

          <dt class="f-oh pro-ID right-infos padd-left f-oh">
            <!--<span class="f-fl">产品ID：{{itemChild.id}}</span>-->
            <span class="f-fr">X{{itemChild.number}}</span>
          </dt>
        </div>
        <!--每个订单下都有的部分-->
        <div class="itemLists b-white fontSize-15">
          <ul class="item-list-main p-lef-rig24">
            <li class="item-list-row">
              <div class="f-fl">配送方式</div>
              <div class="f-fr">免邮</div>
            </li>
            <!--<li class="item-list-row" v-if="orderList.couponName != '暂无可用优惠券'" @click="toCoupon()">
              <span class="f-fl">优惠劵</span>
              <i class="icon iconfont icon-more f-fr fontSize-15 f-fwb" v-if="orderList.couponName"></i>
              <span class="coupon-infos f-fr" style="color: #ff675f;">{{orderList.couponName}}</span>
            </li>
            <li class="item-list-row" v-else>
              <span class="f-fl">优惠劵</span>
              <i class="icon iconfont icon-more f-fr fontSize-15 f-fwb" v-if="orderList.couponName"></i>
              <span class="coupon-infos f-fr" style="color: #ff675f;">{{orderList.couponName}}</span>
            </li>-->

            <!--<li class="item-list-row" @click="toCoupon()" v-if="orderList.couponName != '暂无可用优惠券'">
              <span class="f-fl">优惠劵</span>
              <i class="icon iconfont icon-more f-fr fontSize-15 f-fwb" v-if="isHaveCoupon"></i>
              <span class="coupon-infos f-fr" v-if="isHaveCoupon">{{orderList.couponName}}</span>
              <span class="coupon-infos f-fr" v-if="!isHaveCoupon">暂无可用优惠劵</span>
            </li>
            <li class="item-list-row" v-else>
              <span class="f-fl">优惠劵</span>
              <i class="icon iconfont icon-more f-fr fontSize-15 f-fwb" v-if="orderList.couponName"></i>
              <span class="coupon-infos f-fr">{{orderList.couponName}}</span>
            </li>-->
            <li class="item-list-row" style="height: 11rem">
              <span class="f-fl">买家留言</span>
              <el-input @blur="blurMsg"
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 2}"
                        placeholder="给卖家留言"
                        v-model="textarea3" >
              </el-input>
            </li>
            <!-- <li class="total item-list-row f-oh" style="border-bottom: none;">
               <span class="f-fr m-left8">合计：￥{{item.brandPrice}}</span>
               <span class="f-fr">共{{item.brandCount}}件</span>
             </li>-->
          </ul>
        </div>
      </div>
      <!--<div class="finally-pice m-top10 f-pr b-white fontSize-13">
        <dt class="shipping-cost count-price f-oh">
          <div>
            <span>满减活动：</span>
            <i class="icon iconfont icon-moreunfold f-fr" v-if="showManjianChooseItems"></i>
            <i class="icon iconfont icon-more f-fr fontSize-15 f-fwb" v-else></i>
            <span class="title f-fr" @click="showManjianBts()" v-text="manjianTitle">请选择</span>
          </div>
          <div class="tanchu-part" v-if="showManjianChooseItems">
            <span class="items" v-for="(item,i) in manjianArr"
                  @click="chooseItem(item)" :key="i">{{item.title}}</span>
          </div>
        </dt>
      </div>-->
      <div class="finally-pice f-pr m-top10 b-white fontSize-13">
        <dt class="total-price count-price f-oh">
          <span class="f-fl">商品金额</span>
          <span class="f-fr total-price-acount">￥ {{orderList.order.sumAmount}}</span>
        </dt>

        <dt class="discount count-price f-oh">
          <span class="f-fl">折扣</span>
          <span class="f-fr total-price-acount">-￥ {{orderList.order.discount}}</span>
        </dt>
        <dt class="reduce count-price f-oh">
          <span class="f-fl">优惠</span>
          <span class="f-fr total-price-acount">-￥ {{orderList.order.coupon}}</span>
        </dt>
        <dt class="shipping-cost count-price f-oh">
          <span class="f-fl">运费</span>
          <span class="f-fr total-price-acount">+￥ 0</span>
        </dt>
      </div>
      <!--<div class="finally-pice m-top10 f-pr b-white fontSize-13" style="margin-bottom: 5rem;">
        <dt class="shipping-cost count-price f-oh">
          <div>
            <span>开具发票：</span>
            <span class="title f-fr" @click="closeFa()" v-text="">不开发票<i class="icon iconfont icon-more f-fr"></i></span>
          </div>

        </dt>
      </div>-->

    </div>
    <div class="pay-now p-lef-rig24 b-white fontSize-15 f-oh">
      <dt class="f-fl m-right10">共{{orderList.order.productCount}}件</dt>
      <dt class="f-fl total-price-acount">消耗：  {{orderList.order.exchangeIntegral}} 积分</dt>
      <dt class="f-fr pay-btn" @click="payNow" v-if="payStatus">立即支付</dt>
      <dt class="f-fr pay-btn" v-else>立即支付</dt>
    </div>
    <div class="fapiao-modal" v-if="iskaiPiao">
      <div class="fapiao-title clearfix" >
        <p class="f-fl">开具发票 </p>
        <i class="f-fr icon iconfont icon-close" @click="closeFa()"></i>
      </div>
      <div class="fapiao-body" style="width: 100%;background-color: #fff; height: auto; padding-bottom: 3rem;">
        <div class="fapiao-class" style="">
          <span class="fl" >发票类型:</span>
          <el-select v-model="radioClass" placeholder="请选择">
            <el-option
              v-for="item in piaoclass"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </div>

        <div class="" style="width: 100%; text-align: left; margin-top: 2rem; padding-left: 2rem;" v-if="radioClass==2">
          <el-radio-group v-model="fpgroup" style="font-size:2rem;">
            <el-radio :label="0">个人</el-radio>
            <el-radio :label="1">公司</el-radio>
          </el-radio-group>
          <ul class="forperson" v-if="fpgroup==0">
            <li class="clearfix">
              <span class="f-fl fontSize-16" style="color:#999;">发票抬头:</span>
              <input class="inp f-fl" type="text" placeholder="个人不可修改"  v-model="fapiaotille" readonly>
            </li>
            <li>
              <span class="f-fl fontSize-16">手机号:</span>
              <input class="inp f-fl" type="text" placeholder="请输入收票人手机号"  v-model="fapiaophone">
            </li>
          </ul>
          <ul class="forcom" v-if="fpgroup==1">
            <li class="clearfix">
              <span class="f-fl fontSize-16">公司名:</span>
              <input class="inp f-fl" type="text" placeholder="请输入公司名称"  v-model="companyName">
            </li>
            <li>
              <span class="f-fl fontSize-16">手机号:</span>
              <input class="inp f-fl" type="text" placeholder="请输入收票人手机号"  v-model="fapiaophone">
            </li>
            <li>
              <span class="f-fl fontSize-16">识别号:</span>
              <input class="inp f-fl" type="text" placeholder="纳税人识别号(非必填项)"  v-model="fapiaoiden">
            </li>
          </ul>
        </div>

      </div>
      <div class="" style="width: 100%;text-align: center;">
        <span class="fapiaoBtn">提交</span>
      </div>
    </div>
  </div>
</template>
<script>
  import comLink from "../../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  export default{
    data () {
      return {
        companyName:'',    //公司名字
        fapiaoiden:'',    //公司识别号
        fapiaotille:'',   //发表抬头
        fapiaophone:'',   //发票手机
        fpgroup:0,				//开票组织 0:个人;1:公司
        piaoclass: [{
          value: '1',
          label: '不开发票'
        }, {
          value: '2',
          label: '电子发票'
        },
        ],

        kaiClass:"",
        radioClass:"",
        iskaiPiao:false,
        payStatus : true,
        textarea3 : sessionStorage.getItem('textarea3'),
        orderList:{},
        isRender:false,
        orderId:'',
        totalPrice : null,
        isHaveCoupon :false,
        showManjianChooseItems : false,
        manjianArr : [],//满减数据
        manjianTitle : '请选择',//满减选中项
      }
    },
    methods : {
      closeFa(){
        this.iskaiPiao=!this.iskaiPiao
      },
      closePage() {
        sessionStorage.setItem('couponId', '');
        sessionStorage.setItem('enoughId', '');
        this.$router.go(-1);
      },
      blurMsg() {
        sessionStorage.setItem('textarea3', this.textarea3);
        // alert(this.textarea3);
      },
      //点击弹出满减
      showManjianBts(){
        this.showManjianChooseItems = !this.showManjianChooseItems;
        // this.manjianTitle = item.title
      },
      //选中满减项
      chooseItem(item){
        this.manjianTitle = item.title;
        sessionStorage.setItem('enoughId', item.id);
        sessionStorage.setItem('couponId', '');
        if(this.showManjianChooseItems){
          this.showManjianChooseItems = false;
        }
        this.getOrderDetail();
      },
      //点击确定 调详情接口
      clickJiesuanAxios: function(){

      },
      //请求满减数据
      getManjianData(){
        var vm = this;
        //拼接skuid
        var skuIds = [];
        var numbers = [];
        for(var i=0; i< vm.orderList.list.length; i++) {
          let brand = vm.orderList.list[i];
          for(var j=0; j< brand.productList.length; j++) {
            let product = brand.productList[j];
            skuIds.push(product.skuId);
            numbers.push(product.number);
          }
        };

        $.ajax({
          url:comLink.yxtHost + '/car/enoughList',
          data:{
            openid: sessionStorage.openid,
            'totalPrice' : vm.orderList.order.realAmount,
            'skuIds' : skuIds.join(','),
            'numbers' : numbers.join(','),
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.manjianArr = data.data;
            }
          },
        })
      },
      //跳转留言页面
      // toLeaveMessage(){
      //   this.$router.push({
      //     path : '/order/leaveOrderMessage'
      //   })
      // },
      //跳转优惠劵选择页面
      toCoupon(){
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
        this.$router.push({
          path : '/order/chooseCoupon',
          query : { orderId : orderId }
        })
        comLink.totalPrice = this.orderList.order.realAmount
      },
      //如果没地址 跳转添加地址页面
      toAddAddress(){
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
        this.$router.push({
          path : '/home/payAddressRouter',
          query : { id : orderId}
        })
      },
      //点击立即支付
      payNow(){
        if(!this.orderList.address){
          Toast({
            //mintui提示效果
            message: '请选择收货地址',
            duration: 2000,
          });
        }else{
//        $('.pay-btn').css('background', '#ccc');
//        $('.pay-btn').text('跳转中...');
          var vm = this;
          vm.payStatus = false;
//        Toast({
//          //mintui提示效果
//          message: '跳转建行信用卡支付中...',
//          duration: 2000,
//        });

          let hash = window.location.hash;
          hash = hash.split('=');
          let orderId = hash[1];
          var params = {
            addressId:vm.orderList.address.id,
//          message:comLink.leaveMsg,
            message:vm.textarea3,
            orderId:orderId,
            openid : sessionStorage.openid,
//          enoughId : sessionStorage.enoughId,
//          couponId : sessionStorage.couponId,
          };
          $.ajax({
            url:comLink.yxtHost + '/order/payIntegral',
            data:params,
            dataType:'json',
            type:'post',
            success:function (data) {
              if(data.code == 1){
              	Toast({
                //mintui提示效果
                message: '支付成功',
                duration: 3000
              });
              vm.$router.push({
			          path : '/mine/myAsset/orderRouter?index=2',
			          query : { id : orderId}
			        })
//              $.ajax({
//                url:comLink.yxtHost + '/pay/payOrder',
//                data:{
//                  orderId : data.data,
//                },
//                dataType:'json',
//                type:'post',
//                success:function (data) {
//                  if(data.code == 1){
//                    sessionStorage.setItem('textarea3', '');
//                    window.open(data.data,'_self');
////                    sessionStorage.setItem('enoughId', '');
////                    sessionStorage.setItem('couponId', '');
//                  } else {
//                    Toast({
//                      //mintui提示效果
//                      message: data.msg,
//                      duration: 2000
//                    });
//                  }
//                },
//              })
              }
            },
          })
        }
      },
      //订单详情
      getOrderDetail(){
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/order/detail',
          data:{
            'orderId':orderId,
            'openid' : sessionStorage.openid,
            'addressId' : sessionStorage.addressId,
            'enoughId' : sessionStorage.enoughId,
            'couponId' : sessionStorage.couponId
          },
          // dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code===1){
              // sessionStorage.addressId = '';//返回确认页面 传addressId之后清空session里的addressId
              vm.orderList = data.data;
              vm.getManjianData();//订单确认详情返回数据成功 调用满减接口
//            console.log(vm.orderList);
              let lists = data.data.list;
              for(var i = 0,l = lists.length;i < l;i ++){
                lists[i].logo = comLink.yxtImgHost + lists[i].logo;
                vm.orderId = lists[0].orderId;
                if(vm.orderList.couponName){
                  vm.isHaveCoupon = true;
                }else{
                  vm.isHaveCoupon = false;
                }
                for( var j = 0,jl = lists[i].productList.length;j < jl;j ++){
                  lists[i].productList[i].logo = comLink.yxtImgHost + lists[i].productList[i].logo;
                }
              }
              vm.isRender = true;
            }
          },
          error:function (data) {

          }
        })
      }
    },
    mounted(){
      sessionStorage.setItem('enoughId','');
      this.getOrderDetail();
      if(sessionStorage.getItem('couponId') == '' || sessionStorage.getItem('couponId') == undefined) {
        sessionStorage.setItem('couponId','');
      }
    }
  }
</script>
<style type="text/css">
  .confirm-order-content .el-textarea__inner {
    border:none;
    padding-left: 0;
  }
  .confirm-order-content 	.el-radio__label {
    font-size: 2rem;
    padding-left: 1.4rem;
  }

  .confirm-order-content .el-select {
    float: right;
  }
  .confirm-order-content .el-input {
    width: 20rem;
    font-size: 1.8rem;
  }
  .confirm-order-content .el-input--suffix .el-input__inner {
    /* padding-right: 3rem; */
    text-align: right;
  }

  .confirm-order-content .el-input__inner{
    border: 0;
    padding-left: 1rem;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .fapiao-title{
    height: 5rem;
    line-height: 5rem;
    background-color: #fff;
    width: 100%;
    padding-right:5rem;
    padding-left: 3rem;
    font-size: 2rem;
    border-bottom: 1px solid #eee;
  }
  .fapiao-class{
    padding-left: 2.5rem;
    font-size: 1.875rem;
    height: 4.375rem;
    line-height: 4.375rem;
    width: 100%;
    padding-bottom:5rem ;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  .fapiaoBtn{
    border-radius: 0.625rem;
    background: #307ff5;
    line-height:6rem;
    color: white;
    display: inline-block;
    margin: 3rem auto;
    text-align: center;
    height: 6rem;
    width: 35rem;
    padding: 0 4.0625rem;
  }
  .fapiao-body ul{
    margin-top: 5rem;
  }
  .fapiao-body ul li{
    width: 100%;
    height: 5rem;
    margin-bottom: 1.875rem;
    border-bottom: 1px solid #eee;
  }
  .fapiao-body ul li span{
    display: inline-block;
    width: 22%;
    height: 100%;
    font-size: 1.8rem;
    line-height: 5rem;
  }
  .fapiao-body ul li input{
    display: inline-block;
    width: 77%;
    font-size: 1.8rem;
    border-radius: 0.625rem;
    height: 100%;
    margin-top: 0.2rem;
    background-color: white;
    /*border: 1px solid rgb(220, 223, 230);*/
    height: 95%;
  }
  .fapiao-modal{
    position: absolute;
    display: block;
    opacity: 1;
    height: 100%;
    width: 100%;
    max-height: 100%;
    background-color: #eee;
  }
  .padd-left{
    padding-left: p(20);
  }
  .confirm-order-content{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    .view{
      position: absolute;
      top: 0;
      bottom: 6.25rem;
      right: 0;
      left: 0;
      overflow-y: auto;
    }

    .head-content{
      background: white;

      .contact-infos{
        padding-top: p(20);

        .phone-number{
          margin-left: p(50);
        }
      }
      .address{
        margin-top: p(25);
        padding-bottom: p(50);
        height: 2rem;
        line-height: 2rem;
        max-height: 4rem;

        .is_default {
          display: inline-block;
          float: left;
          color: red;
        }
      }
    }
    .not-address-title{
      font-size: p(28);
      color: #666;
      text-align: center;
      line-height: p(80);
    }

    .border-content{
      width: 100%;
      /*height: p(40);*/

      .white-back{
        width: 100%;
        height: p(15);
        background: white;
      }
      .color-line{
        background: url("./../../../../../static/img/cart/color_line.png") no-repeat;
        background-size: 100% ;
        height: p(5);
      }
    }

    .pro-content{
      width: 100%;
      background: white;
      margin-top: p(20);
      border-bottom: p(1) solid #eeeeee;

      .company-infos{
        /*display: inline-block;*/
        width: 100%;
        height: p(100);
        line-height: p(100);
        box-sizing: border-box;
        border-bottom: p(1) solid #eeeeee;

        .company-headprofile{
          display: inline-block;
          height: p(60);
          width: p(60);
          background: #ccc;
          border-radius: 50%;
        }
      }

      .pro-infos{
        margin-top: p(20);

        .pro-pics{
          width: p(100);
          height: p(100);
          display: inline-block;
          /*background: #ccc;*/
          /*box-sizing: border-box;*/
          /*border: p(1) solid #999;*/
        }
        .right-main{



          .pro-acount{
            display: inline-block;
            /*width: 100%;*/
            height: p(60);
            line-height: p(60);
            /*padding-left: p(120);*/
          }
        }
        .pro-ID{
          padding-left: p(120);
          display: block;
          height: p(60);
          line-height: p(60);

        }

        .right-firt-line{
          margin-right: p(50);
          padding-bottom: p(10);
          height: 2rem;
          line-height: 2rem;
        }
        .pro-spec{
          display: inline-block;
          .spec{
            margin-top: p(20);
            color: #999999;
          }
          .byStage{
            margin-top: p(10);
            color: #666;
            height: 2rem;
            line-height: 2rem;
          }
        }
        .pro-name{
          text-overflow: ellipsis;
          max-width: 80%;
          white-space: nowrap;
          overflow: hidden;
          height: 2rem;
          line-height: 2rem;
        }
        .pro-price{
          color: #ff675f;
          font-size: p(30);
          display: inline-block;
          max-width: 20%;
        }
      }
    }

    .itemLists{
      width: 100%;
      .item-list-main{
        width: 100%;

        .item-list-row{
          width: 100%;
          height: p(70);
          line-height: p(70);
          border-bottom: p(1) solid #eeeeee;
          .coupon-infos{
            background: #ff675f;
            color: white;
            padding: p(5) p(10);
            line-height: p(32);
            border-radius: p(5);
            margin-top: p(12);
            /*height: p(40);*/
            display: inline-block;
          }
          .iconfont{
            font-size: 2rem;
          }
        }
        .total{
          font-size: p(28);
          color: #ff675f;
        }
      }
    }

    .finally-pice{
      padding: p(10) p(24);

      .total-price,.count-price{
        width: 100%;
        line-height: p(46);
      }
      .tanchu-part{
        display: block;
        position: absolute;
        top: 6.875rem;
        right: 3.7rem;
        z-index: 9;
        background: #eee;
        border-right: 0.5px solid #ccc;
        border-left: 0.5px solid #ccc;
        border-bottom: 0.5px solid #ccc;
        box-shadow: 0 0 10px #cccccc;
        .items {
          display: block;
          background: white;
          padding: p(3) p(8);
        }
      }

    }

    .finally-pice .total-price-acount,.pay-now .total-price-acount{
      color: #ff675f;
    }
    .pay-now{
      display: inline-block;
      width: 100%;
      height: p(100);
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      line-height: p(100);

      .pay-btn{
        border-radius: p(10);
        background: #307ff5;
        line-height: p(80);
        margin-top: p(10);
        color: white;
        padding: 0 p(65);
      }
    }
  }
</style>
