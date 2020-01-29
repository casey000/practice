<template>
  <div class="all-order-content " v-title data-title="我的订单">
  	 <div class="nav-lists b-white">
      <ul class="order-main f-oh">
        <li class="order-row f-fl" @click="chooseNavItems(0)">
          <img src="@/../static/image/mine/all_blue2.png" alt="" v-if="index == 0">
          <img src="@/../static/image/mine/all_grey2.png" alt="" v-else>
          <p class="icon-word" :class="{activeBlye : index == ''}">全部</p>
        </li>
        <li class="order-row f-fl" @click="chooseNavItems(1)">
          <img src="@/../static/image/mine/waitPay_blue2.png" alt="" v-if="index == 1">
          <img src="@/../static/image/mine/waiPay_grey2.png" alt="" v-else>
          <p class="icon-word" :class="{activeBlye : index == 1}">待付款</p>
          <i class="superscript" v-if="json.daifukuan > 0">{{json.daifukuan}}</i>
        </li>
        <li class="order-row f-fl" @click="chooseNavItems(2)">
          <img src="@/../static/image/mine/waitSend_blue.png" alt="" v-if="index == 2">
          <img src="@/../static/image/mine/waitSend_grey.png" alt="" v-else>
          <p class="icon-word" :class="{activeBlye : index == 2}">待发货</p>
          <i class="superscript" v-if="json.daifahuo > 0">{{json.daifahuo}}</i>
        </li>
        <li class="order-row f-fl" @click="chooseNavItems(3)">
          <img src="@/../static/image/mine/shouhuo2b.png" alt="" v-if="index == 3">
          <img src="@/../static/image/mine/shouhuo2g.png" alt="" v-else>
          <p class="icon-word" :class="{activeBlye : index == 3}">待收货</p>
          <i class="superscript" v-if="json.daishouhuo > 0">{{json.daishouhuo}}</i>
        </li>
        <li class="order-row f-fl" @click="chooseNavItems(4)">
          <img src="@/../static/image/mine/shouhou2b.png" alt="" v-if="index == 4">
          <img src="@/../static/image/mine/shouhou2g.png" alt="" v-else>
          <p class="icon-word" :class="{activeBlye : index == 4}">售后</p>
          <i class="superscript" v-if="json.shouhouzhong > 0">{{json.shouhouzhong}}</i>
        </li>
      </ul>
    </div>
  	<scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire">
      <div style="padding-top: 7.5rem ;">
        <div class="fontSize-16" style="text-align: center; margin-top: 5rem; color: #999;" v-if="orderList.length <= 0">
          <span>-----无更多订单-----</span>
        </div>
        <div class="list-outside" v-for="order in orderList">
          <span style="font-size: 1.8rem;margin-left: 1rem ;display: inline-block;padding-top: 1.5rem">订单号：<span>{{order.orderNo}}</span></span>
          <div class="order-pro-list" v-for="data in order.subList" @click="toOrderDetail(order)">
            <div class="pro-list-show f-oh">
              <div class="f-oh f-fl list-main f-pr">
                <img class="img-pic dis-inblo f-fl" :src=data.productLogo :alt="data.productName">
                <div class="pro-name-infos f-fl m-left10">
                  <span class="pro-title fontSize-14">{{data.productName}}</span>
                  <span class="pro-detail fontSize-10 f-db">{{data.skuName}}</span>
                </div>
                <span class="pro-price dis-inblo fontSize-10 f-fr">￥{{data.money}}</span>
                <span class="pro-num dis-inblo fontSize-10 f-fl">x{{data.num}}</span>
              </div>
            </div>
          </div>
          <div class="confirm-pay fontSize-12 b-white p-lef-rig24">
            <span>共{{order.numbers}}件商品</span>
            <span class="fontSize-13">合计：￥<span class="fontSize-16" style="color: red;font-weight: bold">{{order.realMoney}}</span></span>
            <span v-if="order.expMoney > 0">（邮费：￥{{order.expMoney}}）</span>
            <span v-else>（包邮）</span>
          </div>
          <div class="pay-btn fontSize-12 b-white p-lef-rig24">
            <span class="btns m-right12" @click="proBtns1(order, btn)" v-for="btn in order.btns">{{btn}}</span>
            <!--<span class="btns m-right12" @click="showMenu(order)" v-if="order.btns.length > 1">…</span>-->
          </div>
        </div>
      </div>
    </scroller>
    <!--<actionsheet v-model="showBot" :menus="menusBtn" @on-click-menu="click" show-cancel v-if="menusBtn.cancelOrder" @on-click-menu-cancelOrder = "cancelOrderClick"></actionsheet>
    <actionsheet v-model="showBot" :menus="menusBtn" @on-click-menu="click" show-cancel v-if="menusBtn.showExp" @on-click-menu-showExp = "showExpClick"></actionsheet>-->
    <div v-transfer-dom>
      <x-dialog v-model="show" class="dialog-demo">
        <div class="img-box">
          <p class="fontSize-16 p-top20" style="min-height:10rem ;">拒绝原因:长得太丑</p>
        </div>
        <div @click="show=false">
          <span class="icon iconfont icon-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  // import orderProListComponent from "./../../../subcomponents/orderProList-component.vue";
  import axios from 'axios'
  import comLink from "@/common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker, MessageBox} from "mint-ui";
  import { Scroller } from 'vux'
  import { XDialog, XButton, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'
  import { Actionsheet } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    inject: ['reload'],
    data() {
      return {
      	showBot:false,
      	menusBtn: {},  //按钮
        show: false,
        showrea: false,
        payStatus: true,
        navNum: 0,
        daohangLists: [
          {
            name: '全部',
            status: 0,
            blueImg: '@/../static/image/mine/all_blue2.png',
            greyImg: '@/../static/image/mine/all_grey2.png',
          },
          {
            name: '待付款',
            status: 1,
            blueImg: '@/../static/image/mine/waitPay_blue2.png',
            greyImg: '@/../static/image/mine/waiPay_grey2.png',
          },
          {
            name: '待发货',
            status: 2,
            blueImg: '@/../static/image/mine/waitSend_blue.png',
            greyImg: '@/../static/image/mine/waitSend_grey.png',
          },
          {
            name: '待收货',
            status: 3,
            blueImg: '@/../static/image/mine/shouhuo2b.png',
            greyImg: '@/../static/image/mine/shouhuo2g.png',
          },
//        {
//          name : '待评价',
//          status : 4,
//          blueImg : '@/../static/image/mine/pingjia2b.png',
//          greyImg : '@/../static/image/mine/pingjia2g.png',
//        },
          {
            name: '售后中',
            status: 5,
            blueImg: '@/../static/image/mine/shouhou2b.png',
            greyImg: '@/../static/image/mine/shouhou2g.png',
          }
        ],
        brandicon: '@/../static/image/mine/orderBrand3x.png',
        isNoContent: true,
        btn1: '',
        btn2: '',
        notDaifahuo: true,
        isDaishouhuo: false,
        isAllowReq: true,
        newData: [],
        yanshiShouhuo: null,//延时收货
        queryData: {
          'openid': sessionStorage.openid,
          'insideId': sessionStorage.insideId,
          'pageNum': 1,
          'pageSize': 10,
          'status': ''
        },
        index: 1,
        orderList: [], // 订单列表
        json: {}, // 订单数量
        orderId: '', // 订单id
      }
    },
    mounted: function () {
      var openid = sessionStorage.openid;
      if (sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        openid = this.GetQueryString('openid');
        if (openid != undefined && openid != null && openid != 'undefined' && openid != 'null' && openid != '') {
          sessionStorage.setItem('openid', openid);
        }
      }

      this.orderCount();
      var status = parseInt(this.$route.query.index);
      this.index = status;
      if(status > 0) {
        if(status == 4) {
          this.queryData.status = -2;
          this.getOrderList();
        } else {
          this.queryData.status = status;
          this.navNum = status;
          this.getOrderList();
        }
      } else {
        this.queryData.status = '';
        this.getOrderList();
      }
    },
    methods: {
      //点击更多按钮
    	showMenu(data){
    	  this.orderId = data.id;
    		this.showBot = true ;
        this.menusBtn = {};
    		for(var i = 1; i < data.btns.length; i++) {
          if(data.status === 1) {
            this.menusBtn.cancelOrder = data.btns[1];
          } else if(data.status === 3) {
            this.menusBtn.showExp = data.btns[1];
          } else if(data.status === 4) {
            this.menusBtn.showExp = data.btns[1];
          } else if(data.status === 5) {
            this.menusBtn.showExp = data.btns[1];
            this.menusBtn.delOrder = data.btns[2];
          } else if(data.status === -2) {
            this.menusBtn.showExp = data.btns[1];
          }
        }
    	},
      //查询各订单的数量
      orderCount() {
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/inside/order/orderCount',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId
          },
          dataType: 'json',
          type: 'post',
          success: function (resp) {
            if (resp.code == 1) {
              vm.json = resp.data;
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //订单列表
      getOrderList() {
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/inside/order/getOrderList',
          data: vm.queryData,
          dataType: 'json',
          type: 'post',
          success: function (resp) {
            if (resp.code == 1) {
              vm.orderList = resp.data.list;
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },

      //点击切换对应目录下的订单
      chooseNavItems(status) {
        this.index = status;
        this.queryData.status = status == 0 ? '' : status == 1 ? 1 : status == 2 ? 2 : status == 3 ? 3 : status == 4 ? -2 : '';
        this.$router.push({
          path: '/indus/orderlist?index=',
          query: {
            index: this.index
          }
        })
        this.getOrderList();
      },
      //跳转订单详情页
      //订单详情
      toOrderDetail(order) {
        this.$router.push({
          path: '/indusorder/orderDetail',
          query: {
            'orderId': order.id
          }
        })
      },
      //滚动数据 判断 方法
      getGundongData() {

      },
      //点击按钮
      click(key) {
    	  var vm = this;
        //删除订单
        if(key == 'delOrder') {
          MessageBox.confirm('确认删除订单?').then(action => {
            $.post(comLink.yxtHost + '/inside/order/delOrder', {
              'openid': sessionStorage.openid,
              'insideId': sessionStorage.insideId,
              'orderId': vm.orderId
            }, function (resp) {
              if (resp.code == 1) {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
                vm.reload();
              } else {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            });
          });
        }
      },
      //点击第一个按钮
      proBtns1(order, btn) {
        var vm = this;
        if (btn === '立即付款') {
          vm.$router.push({
            path: '/indusorder/Orderpay',
            query: {
              'orderNo': order.orderNo,
              'money': order.realMoney
            }
          });
        }
        if (btn === '确认收货') {
          MessageBox.confirm('是否确认收货?').then(action => {
            $.post(comLink.yxtHost + '/inside/order/confirmCollect', {
              'openid': sessionStorage.openid,
              'insideId': sessionStorage.insideId,
              'orderId': order.id
            }, function (resp) {
              if (resp.code == 1) {
                Toast({
                  message: '确认收货成功，请对我们的服务提出您的宝贵建议',
                  duration: 2000
                });
                vm.$router.push({
                  path: '/home/customback',//反馈
                  query : {'orderId' : order.id}
                });
              } else {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            });
          });
        }
        if (btn === '立即评价') {
          vm.$router.push({
            path: '/indusorder/pingjia',
            query: {
              'orderId': order.id
            }
          });
        }
        if (btn === '查看评价') {
          vm.$router.push({
            path: '/indusorder/pingjia',
            query: {
              'insideOrderId': order.id,
              'orderId': order.orderId
            }
          });
        }
        if (btn === '查看物流') {
          vm.$router.push({
            path: '/indusorder/checkAddress',
            query: {
              orderId: order.id
            }
          })
        }
        //删除订单
        if (btn === '删除订单') {
          MessageBox.confirm('确认删除订单?').then(action => {
            $.post(comLink.yxtHost + '/inside/order/delOrder', {
              'openid': sessionStorage.openid,
              'insideId': sessionStorage.insideId,
              'orderId': order.id
            }, function (resp) {
              if (resp.code == 1) {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
                vm.reload();
              } else {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            });
          });
        }
        /*if (btn === '填写快递单') {
          $.post(comLink.yxtHost + '/inside/order/uploadInsideExpress', {
            // 'afterSaleOrderId' : vm.order.afterSaleId,
            'orderId' : vm.order.id,
            'expressId' : vm.kdgs,
            'expressCode' : vm.kddh,
            'openid' : sessionStorage.openid,
            'insideId' : sessionStorage.insideId
          }, function (resp) {
            Toast({
              message: resp.msg,
              duration: 2000
            });
            this.dialogExpVisible = false;
            vm.reload();
          });
        }*/
        //取消订单
        if (btn === '取消订单') {
          //取消订单
          MessageBox.confirm('确定取消订单?').then(action => {
            var vm = this;
            $.ajax({
              url: comLink.yxtHost + '/inside/order/cancelOrder',
              data: {
                'openid': sessionStorage.openid,
                'insideId': sessionStorage.insideId,
                'orderId': order.id
              },
              dataType: 'json',
              type: 'post',
              success: function (resp) {
                if (resp.code == 1) {
                  Toast({
                    message: resp.msg,
                    duration: 2000
                  });
                  vm.reload();
                } else {
                  Toast({
                    message: resp.msg,
                    duration: 2000
                  });
                }
              }
            })
          });
        }
      },
      /*// 点击取消订单
      cancelOrderClick(){
        //取消订单
        MessageBox.confirm('确定取消订单?').then(action => {
          var vm = this;
          $.ajax({
            url: comLink.yxtHost + '/inside/order/cancelOrder',
            data: {
              'openid': sessionStorage.openid,
              'insideId': sessionStorage.insideId,
              'orderId': vm.orderId
            },
            dataType: 'json',
            type: 'post',
            success: function (resp) {
              if (resp.code == 1) {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
                vm.reload();
              } else {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            }
          })
        });
      },
      // 点击查看物流
      showExpClick(){
        this.$router.push({
          path: '/indusorder/checkAddress',
          query: {
            orderId: this.orderId
          }
        })
      },*/
      /*// 点击我要退款
      tuikuanClick(){
        console.log("点击了我要退款")
      },*/
      // 点击删除订单
      delOrderClick(){
        console.log("点击了删除订单")
      },
      //滚动请求
      scrollerRequire() {

      },
      GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
    },
    components : {
      // orderProListComponent
      Scroller,
      XDialog,
	    XButton,
	    Group,
	    XSwitch,
	    Actionsheet
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .showlist{
	display: block!important;
}
  .text-box{
    width: 100%;
    height: 500px;
    background: red;
  }
  .activeBlye{
    color: $bgBlue;
  }
  .all-order-content{
    width: 100%;
    height: 100%;
    .nav-lists{
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1;

      .order-main{
        padding: p(10) 0;
        .order-row{
          position: relative;
          width: 20%;
          text-align: center;
          padding: p(10) 0;
          box-sizing: border-box;
          border-right: p(1) solid #e8e8e8;
          img{
            width: 24px;
          }
          .icon-word{
            font-size: p(20);
            margin-top: p(10);
          }
          .superscript{
            font-size: 1rem;
            position: absolute;
            right: 2.2rem;
            top: 0;
            background: #ff5d74;
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            color: white;
            border-radius: 50%;
          }
        }
        .order-row:nth-child(5){
          border-right: none;
        }
      }
    }
    .list-outside{
      display: inline-block;
      width: 100%;
      background: white;
      margin-top: p(10);
      /*padding-bottom: p(50);*/

    }
    .bar-main{
      color: #8c8c8c;
      line-height: p(60);
      border-bottom: p(1) solid #eeeeee;

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
    .order-pro-list{
      background: white;
      /*padding-top: p(20);*/
      width: 100%;
      .pro-list-show{
        /*padding: p(0) p(24);*/
        .white-back{

        }

        .list-main{
          padding: p(20) p(24) p(10) p(24);
          background: #e6f5ff;
          margin-top: p(20);
          width: 100%;
          .img-pic{
            width: p(133);
            height: p(133);
            background: #eee;
          }
          .pro-name-infos{
            max-width: 60%;
 						overflow : hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
            .pro-detail{
              color: #9fa0a1;
              line-height: p(30);
              text-align: left;
              margin-top: p(5);
            }
            .pro-title{
              line-height: p(40);
              height:p(85) ;
              overflow : hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
            }
          }
          .pro-num{
            position: absolute;
            bottom: p(40);
            right: p(24);
          }
          .pro-price{
            color: #ff2727;
          }
        }
      }
    }
    .pay-btn{
      border-top: p(1) solid #eee
    }
    .confirm-pay,.pay-btn{
      width: 100%;
      height: p(70);
      line-height: p(70);
      text-align: right;
      .btns{
        padding: p(10) p(20);
        border: p(2) solid #333333;
        border-radius: p(10);
      }
    }
  }
</style>
