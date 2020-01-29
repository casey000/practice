<template>
  <div class="confirm-order-content" v-title data-title="确认订单">
    <!--<div class="back-icon-allpage"><i class="icon iconfont icon-back"></i></div>-->
    <div class="view">
      <div class="head-content p-lef-rig24" v-if="data.address" @click="toAddAddress">
        <div class="contact-infos f-oh fontSize-15">
          <div class="name f-fl">{{data.address.name}}</div>
          <div class="phone-number f-fl">{{data.address.phone}}</div>
        </div>
        <dt class="address f-oh fontSize-12">
          <span class="is_default" v-if="data.address.isDefault == 1">[默认]</span>
          <div class="detailed-address f-fl">
            {{data.address.province}}
            {{data.address.city}}
            {{data.address.area}}
            {{data.address.address}}
          </div>
        </dt>
      </div>
      <div class="not-address-title"  v-if="!data.address" @click="toAddressList">
        <span style="color: red">请填写收货地址</span>
      </div>
      <!--添加地址下背景图边框-->
      <div class="border-content">
        <div class="color-line"></div>
        <!--<div class="white-back"></div>-->
      </div>
      <div class="pro-content"  v-for="item in data.insideProductList">
        <div class="pro-infos fontSize-12 f-oh p-lef-rig24">
          <img class="pro-pics f-fl" :src="item.insideSkuImgPath" :alt="item.productName" @click="toBuy(item.productId)">
          <dt class="pri-name padd-left right-infos f-oh">
            <span class="pro-name f-fl" @click="toBuy(item.productId)">{{item.productName}}</span>
          </dt>
          <div class="pro-spec">
            <dt class="spec right-infos m-top10  f-oh p-left15">
              <span class="f-fl right-firt-line">{{item.insideSkuname}}</span>
            </dt>
          </div>
          <dt class="f-oh pro-ID right-infos">
            <span class="pro-price ">￥{{item.insideSkuInsidePrice}}</span>
            <span class="f-fr">x{{item.number}}</span>
          </dt>
        </div>
      </div>
      <div class="itemLists b-white fontSize-15">
        <ul class="item-list-main p-lef-rig24">
          <li class="item-list-row">
            <div class="f-fl">商品金额</div>
            <div class="f-fr">¥{{data.totlalPrice}}</div>
          </li>
          <li class="item-list-row">
            <div class="f-fl">运费</div>
            <div class="f-fr" v-if="data.expPrice > 0">¥{{data.expPrice}}</div>
            <div class="f-fr" v-else>商家包邮</div>
          </li>
          <span>
            <li class="item-list-row" @click="toCoupon" v-if="data.insideCoupon">
              <span class="f-fl">优惠劵</span>
              <i class="icon iconfont icon-more f-fr fontSize-15 f-fwb" ></i>
              <span class="f-fr" :class="{'coupon-infos': data.insideCoupon}">{{data.couponRemark}}</span>
            </li>
            <li class="item-list-row" v-else>
              <span class="f-fl">优惠劵</span>
              <!--<i class="icon iconfont icon-more f-fr fontSize-15 f-fwb" ></i>-->
              <span class="f-fr">{{data.couponRemark}}</span>
            </li>
          </span>
          <li class="item-list-row" style="height: 11rem">
            <span class="f-fl">备注</span>
            <el-input
						  type="textarea"
						  :autosize="{ minRows: 1, maxRows: 2}"
						  placeholder="备注"
						  v-model="remark" >
						</el-input>
          </li>
	         <li class="item-list-row">
	            <div class="f-fl">应付金额</div>
	            <div class="f-fr">¥{{data.realPrice}}</div>
	          </li>
        </ul>
      </div>
    </div>

    <div class="pay-now p-lef-rig24 b-white fontSize-15 f-oh">
      <dt class="f-fl">共 1 件</dt>
      <dt class="f-fl total-price-acount" style="margin-left: 1rem">总价： ¥{{data.realPrice}}</dt>
      <dt class="f-fr pay-btn" style="background-color: gray;color: white" v-if="payStatus && !canSubmit">提交订单</dt>
      <dt class="f-fr pay-btn" @click="postOrder" v-if="payStatus && canSubmit">提交订单</dt>
      <dt class="f-fr pay-btn" v-else style="background-color: #C0CCDA;">提交中<img src="../../../../static/img/load.gif" style="display: inline-block;margin-left: 1rem;width: 2rem; height: 2rem; vertical-align: -7%;" ></dt>
    </div>

  </div>
</template>
<script>
  import comLink from "@/common/common_link"; //导入总线
  import { Navbar, TabItem ,Indicator, Toast, Popup ,MessageBox ,Radio} from "mint-ui";
  import $ from "jquery"; //导入jquery
  export default{
    data () {
      return {
        queryData: {
          'openid': sessionStorage.openid,
          'insideId': sessionStorage.insideId,
          'addressId': sessionStorage.addressId,
          'couponUserId': sessionStorage.couponUserId,
          'insideSkuIds': [],
          'numbers': [],
        },
        remark: '',
        payStatus: true,
        isCar: 0,  //是否为购物车进入
        data: {
          'address': {},  //地址
          'insideCoupon': {},  //优惠券
          'expPrice': '0',   //快递价格
          'insideProductList': [],   //商品列表
          'realPrice': '0',   //实际金额
          'totlalPrice': '0',   //总金额
          'couponRemark': '暂无可用优惠券',
        }, //页面数据
        canSubmit: false,  //是否可提交
      }
    },
    mounted(){
      this.queryData.insideSkuIds = this.$route.query.insideSkuId;
      this.queryData.numbers = this.$route.query.number;
      this.isCar = this.$route.query.isCar;

      this.getConfirmOrderData();
    },
    methods : {
      //查询确认订单页数据
      getConfirmOrderData() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/order/confirmOrderData',
          data: vm.queryData,
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.data = resp.data;
              if(vm.data.address != null && vm.data.address != undefined) {
                vm.queryData.addressId = vm.data.address.id;
              }
              vm.canSubmit = true;
              if(vm.data.insideCoupon != null && vm.data.insideCoupon.insideCouponUserId !== null && vm.data.insideCoupon.insideCouponUserId != undefined) {
                vm.queryData.couponUserId = vm.data.insideCoupon.insideCouponUserId;
              }
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //单品页面
      toBuy(productId) {
        this.$router.push({
          path: '/indus/productDetail',
          query: {
            'productId': productId
          }
        })
      },
      //如果没地址 跳转添加地址页面
      toAddAddress() {
        this.$router.push({
          path : '/indus/induspayAddress',
          query : {
            addressId : this.data.address.id
          }
        })
      },
      //如果没地址 跳转添加地址页面
      toAddressList() {
        this.$router.push({
          path : '/indus/induspayAddress'
        })
      },
      //查询可使用优惠券列表
      toCoupon() {
        comLink.totalPrice = this.data.totlalPrice;
        this.$router.push({
          path: '/indusorder/chooseCoupon2',
          query: {
            url: window.location.hash
          }
        })
      },
      //下订单
      postOrder() {
        var vm = this;
        vm.payStatus = false;
        vm.queryData.isCar = vm.isCar;
        vm.queryData.remark = vm.remark;
        $.ajax({
          url:comLink.yxtHost + '/inside/order/postOrder',
          data: vm.queryData,
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              var insideOrder = resp.data;
              vm.$router.push({
                path: '/indusorder/Orderpay',
                query: {
                  'orderNo': insideOrder.orderNo,
                  'money': insideOrder.realMoney
                }
              });

              // window.location.href = url;

              // if(orderNo !== undefined && orderNo !== null) {
              //   $.ajax({
              //     url:comLink.yxtHost + '/inside/order/unifiedOrder',
              //     data: vm.queryData,
              //     dataType:'json',
              //     type:'post',
              //     success:function (resp) {
              //       if(resp.code == 1){
              //         var orderNo = resp.data;
              //         if(orderNo !== undefined && orderNo !== null) {
              //
              //         }
              //       }else{
              //         Toast({
              //           message: resp.msg,
              //           duration: 2000
              //         });
              //       }
              //     }
              //   })
              // }
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
    },
    watch: {
    }
  }
</script>
<style type="text/css">
.confirm-order-content .el-radio__label {
    font-size: 2rem;
    padding-left: 1.4rem;
}
.confirm-order-content .el-textarea__inner {
		border:none;
		padding-left: 0;
    resize: none;
    height: p(200);
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
	color: transparent;
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
    line-height: 5rem;
    font-size: 1.8rem;
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
		    z-index: 10;
			}
  .padd-left{
    padding-left: p(20);
  }
  .title-enough {
    background: #ff675f;
    color: white;
    padding: p(5) p(10);
    line-height: p(32);
    border-radius: p(5);
    margin-top: p(3);
    font-size: 1.5rem;
    /*height: p(40);*/
    display: inline-block;
  }
  .coupon-infos{
    background: #ff675f;
    color: white;
    padding: p(5) p(10);
    line-height: p(32);
    border-radius: p(5);
    margin-top: p(12);
    font-size: 1.5rem;
    /*height: p(40);*/
    display: inline-block;
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
        min-height: 4rem;

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
        background: url("../../../../static/img/cart/color_line.png") no-repeat;
        background-size: 100% ;
        height: p(5);
      }
    }

    .pro-content{
      width: 100%;
      background: white;
      margin-top: p(20);
      border-bottom: p(1) solid #eeeeee;
      padding-bottom: p(20);

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
        /*border-bottom: 0.0625rem solid #eeeeee;*/
				padding-top: p(15);
        .pro-pics{
          width: p(100);
          height: p(100);
          display: inline-block;
          background: #ccc;
          box-sizing: border-box;
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
          padding-left: p(22);
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
          border-bottom: p(1) solid #eeeeee;;
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
        background-color: #ff1f44;
        line-height: p(80);
        margin-top: p(10);
        color: white;
        padding: 0 p(65);
      }
    }
  }
</style>
