<template>
  <div class="order-detail-content" v-title data-title="订单详情">
    <div class="back-icon-allpage"><i class="icon iconfont icon-back" @click="goback"></i></div>
    <div class="steps b-white p-top20" v-if="order.status == 1">
      <el-steps :space="200" :active=activeWord align-center>
        <el-step title="已提交"></el-step>
        <el-step title="待付款"></el-step><!--倒计时-->
        <el-step title="待完成"></el-step>
      </el-steps>
      <div class="paytime">
        <p>付款截止时间：{{order.endTime}}</p>
	    </div>
    </div>
    <div class="steps b-white p-top20" v-if="order.status == 2">
      <el-steps :space="200" :active=activeWord align-center>
        <el-step title="已提交"></el-step>
        <el-step title="待发货"></el-step>
        <el-step title="待完成"></el-step>
      </el-steps>
    </div>
    <div class="steps b-white p-top20" v-if="order.status == 3">
      <el-steps :space="200" :active=activeWord align-center>
        <el-step title="已发货"></el-step>
        <el-step title="待收货"></el-step>
        <el-step title="待完成"></el-step>
      </el-steps>
    </div>
    <div class="steps b-white p-top20" v-if="order.status == 4">
      <el-steps :space="200" :active=activeWord align-center>
        <el-step title="已收货"></el-step>
        <el-step title="待评价"></el-step>
        <el-step title="待完成"></el-step>
      </el-steps>
    </div>
    <div class="steps b-white p-top20" v-if="order.status == 5 && flag"><!--是退款订单-->
      <el-steps :space="200" active=3 align-center>
        <el-step title="已提交"></el-step>
        <el-step title="已退款"></el-step>
        <el-step title="已完成"></el-step>
      </el-steps>
    </div>
    <div class="steps b-white p-top20" v-if="order.status == 5 && !flag"><!--不是退款订单-->
      <el-steps :space="200" active=3 align-center>
        <el-step title="已提交"></el-step>
        <el-step title="已收货"></el-step>
        <el-step title="已完成"></el-step>
      </el-steps>
    </div>
    <div class="steps b-white p-top20" v-if="order.status == -1">
      <el-steps :space="200" active=3 align-center>
        <el-step title="已提交"></el-step>
        <el-step title="待发货"></el-step>
        <el-step title="已失效"></el-step>
      </el-steps>
    </div>
    <div class="steps b-white p-top20" v-if="order.status == -2">
      <el-steps :space="200" :active=activeWord align-center>
        <el-step title="已提交"></el-step>
        <el-step title="售后中"></el-step>
        <el-step title="待完成"></el-step>
      </el-steps>
    </div>
    <div class="address-content">
      <span class="title fontSize-12  p-lef-rig24">收货地址:</span>
      <div class="receiver-infos fontSize-14  p-lef-rig24">
        <div class="detailed-address">
          <div class="">
            <span>收货人：{{order.linkName}}</span><br>
            <span>电话：{{order.linkPhone}}</span><br>
            <span>地址：{{order.address}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="address-content">
      <div class="order-content f-oh" v-for="data in order.subList">
        <div class="f-oh f-fl list-main f-pr">
          <img class="img-pic dis-inblo f-fl" :src="data.productLogo" :alt="data.productName" @click="toBuy(data.productId)">
          <div class="pro-name-infos f-fl m-left10">
            <span class="pro-title fontSize-14 f-db" @click="toBuy(data.productId)">{{data.productName}}</span>
            <span class="pro-detail fontSize-10 f-db">{{data.skuName}}</span>
          </div>
         <!-- <span class="shouhou" v-if="data.refundStatus == -1" @click="serviceApply(order, data)">申请售后</span>
          <span class="shouhou" @click="serviceApply(order, data)">申请售后</span>-->
          <!--待发货的-->
          <span v-if="order.status == 2">
            <span class="shouhou" v-if="data.refundStatus == -1" @click="serviceApply(order, data)">拒绝退款</span>
            <span class="shouhou" v-if="data.refundStatus == -1 || data.tradeStatus == -1"  @click="serviceApply(order, data)">售后详情</span>
            <span class="shouhou" v-else-if="data.refundStatus == 0 || data.tradeStatus == 0" @click="serviceApply(order, data)">审核中</span>
            <span class="shouhou" v-else-if="data.refundStatus == 3 || data.tradeStatus == 3" @click="serviceApply(order, data)">成功</span>
            <span class="shouhou" v-else @click="serviceApply(order, data)">申请退款</span>
          </span>
          <span v-else-if="order.status !== 1 && order.status !== -1">
            <span class="shouhou" v-if="data.refundStatus == -1"  @click="serviceApply(order, data)">拒绝退款</span>
            <span class="shouhou" v-if="data.tradeStatus == -1"  @click="serviceApply(order, data)">拒绝换货</span>
            <span class="shouhou" v-if="data.refundStatus == -1 || data.tradeStatus == -1"  @click="serviceApply(order, data)">售后详情</span>
            <span class="shouhou" v-else-if="data.refundStatus == 0 || data.tradeStatus == 0" @click="serviceApply(order, data)">审核中</span>
            <span class="shouhou" v-else-if="data.refundStatus == 1 || data.tradeStatus == 1" @click="serviceApply(order, data)">同意</span>
            <span class="shouhou" v-else-if="data.refundStatus == 2 || data.tradeStatus == 2" @click="serviceApply(order, data)">退货中</span>
            <span class="shouhou" v-else-if="data.refundStatus == 3 || data.tradeStatus == 3" @click="serviceApply(order, data)">成功</span>
            <span class="shouhou" v-else @click="serviceApply(order, data)">申请售后</span>
          </span>

          <span class="pro-price dis-inblo fontSize-10 f-fr">￥{{data.money}}</span>
          <span class="pro-num dis-inblo fontSize-10 f-fl">x{{data.num}}</span>
        </div>
      </div>
    </div>
    <div class="real-price">
      <ul>
        <li>
          <span>商品总价</span>
          <span>￥ {{order.originMoney}}</span>
        </li>
        <li>
          <span>优惠</span>
          <span v-if="order.couponMoney > 0">-￥ {{order.couponMoney}}</span>
          <span v-else>-￥ 0</span>
        </li>
        <li>
          <span>运费</span>
          <span v-if="order.expMoney > 0">+￥ {{order.expMoney}}</span>
          <span v-else>+￥ 0</span>
        </li>
        <li class="shifukuan">
          <span class="title">实付款</span>
          <span class="price">￥ {{order.realMoney}}</span>
        </li>
      </ul>
    </div>
    <div class="order-infos fontSize-14">
      <ul>
        <li>
          <span>订单号：</span>
          <span>{{order.orderNo}}</span>
          <!--<button class="tag-read" :data-clipboard-text=order.ordId @click="copy">复制</button>-->
        </li>
        <li v-if="order.status > -1 && order.status !== 1">
          <span>支付单号：</span>
          <span>{{order.payNo}}</span>
        </li>
        <li v-if="order.status > -1 && order.status !== 1">
          <span>支付方式：</span>
          <span>{{order.payChannel}}</span>
        </li>
        <li>
          <span>创建时间：</span>
          <span>{{order.createTime}}</span>
        </li>
        <li v-if="order.status > -1 && order.status !== 1">
          <span>付款时间：</span>
          <span>{{order.payTime}}</span>
        </li>
        <li v-if="order.status > -1 && order.status !== 1 && order.status !== 2">
          <span>发货时间：</span>
          <span>{{order.expTime}}</span>
        </li>
        <!-- <li>
          <span>自动收货时间：</span>
          <span>2018-08-08</span>
        </li>-->
      </ul>
    </div>

    <!--退货物流-->
    <el-dialog :visible.sync="dialogExpVisible" style="margin-top: 10rem;">
      <el-form >
        <el-form-item label="快递公司" :label-width="formLabelWidth" >
          <el-select v-model="kdgs" placeholder="请选择快递公司" onClick="$('input').blur()">
            <el-option :label="exp.company" :value="exp.id" v-for="(exp,i) in expressList" :key=i onClick="$('input').blur()"></el-option>
          </el-select>
        </el-form-item>
        <label for=""class="fontSize-15 " style="height: 3rem; line-height: 3rem; padding-left: 1.7rem;">快递单号</label>
        <input v-model="kddh"  placeholder="请输入快递单号"  class="p-left15 fontSize-14" type="number" style="height: 3rem; line-height: 3rem; padding-bottom: 0.4rem;"></input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExpVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTuiExp">确 定</el-button>
      </div>
    </el-dialog>

    <div class="bottom-btns f-oh p-lef-rig24">
      <div class="btns f-fr">
        <span @click="proBtns1(btn)" v-for="btn in order.btns">{{btn}}</span>
       <!-- <span @click = "showMenu" v-if="order.btns.length > 1">更多</span>-->
      </div>
      <div class="btns f-fr" v-if="resttime">
        <span style="background-color: white"></span>
        <span>已失效</span>
      </div>
    </div>
    <!--<actionsheet v-model="showBot" :menus="menusBtn" @on-click-menu="click" show-cancel v-if="menusBtn.cancelOrder" @on-click-menu-cancelOrder = "cancelOrderClick"></actionsheet>
    <actionsheet v-model="showBot" :menus="menusBtn" @on-click-menu="click" show-cancel v-if="menusBtn.showExp" @on-click-menu-showExp = "showExpClick"></actionsheet>
    <actionsheet v-model="showBot" :menus="menusBtn" @on-click-menu="click" show-cancel v-if="menusBtn.addExp" @on-click-menu-addExp = "addExpClick"></actionsheet>-->
  </div>
</template>
<script>
  import comLink from "@/common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker,MessageBox } from "mint-ui";
  import { Actionsheet } from 'vux'
  import Clipboard from 'clipboard';
  export default {
    inject: ['reload'],
    data (){
      return {
        showBot:false,
        menusBtn: {},
        kdgs:'',
        kddh:'',
        flag:false,  //是否为退款的
        formLabelWidth: '10rem',
        dialogFormVisible:false,
        dialogExpVisible:false,
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
        expressList : [],  //快递列表
      }
    },
    mounted(){
      // this.orderId = this.$route.query.orderId;
      this.orderId = window.location.hash.split('=')[1];
      this.getOrderDetail();
    },
    methods :{
      //订单详情
      getOrderDetail() {
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/inside/order/orderDetail',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId,
            'orderId': vm.orderId
          },
          dataType: 'json',
          type: 'post',
          success: function (resp) {
            if (resp.code == 1) {
              vm.order = resp.data;
              if(vm.order.status === 1) {
                vm.menusBtn.cancelOrder = vm.order.btns[1];
              } else if(vm.order.status === 3) {
                vm.menusBtn.showExp = vm.order.btns[1];
                vm.menusBtn.tuikuan = vm.order.btns[2];
              } else if(vm.order.status === 4) {
                vm.menusBtn.showExp = vm.order.btns[1];
              } else if(vm.order.status === 5) {
                vm.menusBtn.showExp = vm.order.btns[1];
                vm.menusBtn.delOrder = vm.order.btns[2];
              } else if(vm.order.status === -2) {
                if(vm.order.btns.length > 1) {
                  vm.menusBtn.addExp = vm.order.btns[1];
                }
              }
              for(var i = 0; i < vm.order.subList.length; i++) {
                if(vm.order.subList[i].refundStatus != null || vm.order.subList[i].refundStatus != undefined || vm.order.subList[i].tradeStatus != null || vm.order.subList[i].tradeStatus != undefined) {
                  vm.flag = true;
                  break;
                }
              }
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      goback() {
        this.$router.push({
          path: '/indus/personcenter',
          query: {
            'id': sessionStorage.insideId
          }
        })
      },
      serviceApply(order, data) {
        var status = '';
        if(order.status >= 1 && order.status <= 4) {
          status = order.status;
        } else if(order.status == 5) {
          status = 6;
        } else if(order.status == -1) {
          status = -1;
        } else if(order.status == -2) {
          status = 5;
        }
        this.$router.push({
          path: '/indusorder/TuiKuan',
          query: {
            'insideOrderId': order.id,
            'orderId': order.orderId,
            'afterOrderId' : data.afterOrderId,
            'skuId' : data.skuId,
            'status' : status
          }
        });
      },
      //查询快递列表
      getExpressList() {
        var vm = this;
        $.post(comLink.yxtHost + '/order/getExp', {}, function (resp) {
          if(resp.code == 1) {
            vm.expressList = resp.data;
          }
        });
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
      click(key){
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
      //更多按钮
      showMenu() {
        var vm = this;
        vm.showBot = true;
        if (vm.order.status === 1) {
          vm.menusBtn.cancelOrder = vm.order.btns[1];
        } else if (vm.order.status === 3) {
          vm.menusBtn.showExp = vm.order.btns[1];
        } else if (vm.order.status === 4) {
          vm.menusBtn.showExp = vm.order.btns[1];
        } else if (vm.order.status === 5) {
          vm.menusBtn.showExp = vm.order.btns[1];
          vm.menusBtn.delOrder = vm.order.btns[2];
        } else if (vm.order.status === -2) {
          if(vm.order.btns.length > 1) {
            vm.menusBtn.addExp = vm.order.btns[1];
          }
        }
      },
      //点击第一个按钮
      proBtns1(btn) {
        var vm = this;
        if (btn === '立即付款') {
          vm.$router.push({
            path: '/indusorder/Orderpay',
            query: {
              'orderNo': vm.order.orderNo,
              'money': vm.order.realMoney
            }
          });
        }
        /*if (vm.order.btns[0] === '我要退款') {
          vm.$router.push({
            path: '/indusorder/TuiKuan',
            query: {
              'orderId': vm.order.id
            }
          });
        }*/
        if (btn === '确认收货') {
          MessageBox.confirm('是否确认收货?').then(action => {
            $.post(comLink.yxtHost + '/inside/order/confirmCollect', {
              'openid': sessionStorage.openid,
              'insideId': sessionStorage.insideId,
              'orderId': vm.order.id
            }, function (resp) {
              if (resp.code == 1) {
                Toast({
                  message: '确认收货成功，请对我们的服务提出您的宝贵建议',
                  duration: 2000
                });
                vm.$router.push({
                  path: '/home/customback',//反馈
                  query : {'orderId' : vm.order.id}
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
              'orderId': vm.order.id
            }
          });
        }
        if (btn === '查看评价') {
          vm.$router.push({
            path: '/indusorder/pingjia',
            query: {
              'insideOrderId': vm.order.id,
              'orderId': vm.order.orderId
            }
          });
        }
        //删除订单
        if (btn === '删除订单') {
          MessageBox.confirm('确认删除订单?').then(action => {
            $.post(comLink.yxtHost + '/inside/order/delOrder', {
              'openid': sessionStorage.openid,
              'insideId': sessionStorage.insideId,
              'orderId': vm.order.id
            }, function (resp) {
              if (resp.code == 1) {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
                vm.$router.go(-1);
              } else {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            });
          });
        }
        if (btn === '查看物流') {
          vm.$router.push({
            path: '/indusorder/checkAddress',
            query: {
              orderId: vm.order.id
            }
          })
        }
        if (btn === '填写快递单') {
          this.dialogExpVisible = true;
          this.getExpressList();
        }
        if (btn === '取消订单') {
          //取消订单
          MessageBox.confirm('确定取消订单?').then(action => {
            var vm = this;
            $.ajax({
              url: comLink.yxtHost + '/inside/order/cancelOrder',
              data: {
                'openid': sessionStorage.openid,
                'insideId': sessionStorage.insideId,
                'orderId': vm.order.id
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
              'orderId': vm.order.id
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
            orderId: this.order.id
          }
        })
      },
      // 点击添加物流
      addExpClick(){
        this.dialogExpVisible = true;
        this.getExpressList();
      },*/
      // 添加货物物流
      addTuiExp() {
        var vm = this;
        $.post(comLink.yxtHost + '/inside/order/uploadInsideExpress', {
          // 'afterSaleOrderId' : vm.order.afterSaleId,
          'orderId' : vm.order.orderId,
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

      }
    },
    components:{
      Actionsheet
    }
  }

</script>
<style>
  .steps .el-step__main .el-step__title{
    font-size: 1.5rem;
  }
  .steps .el-step__head.is-process{
    color: #307FF5;
    border-color: #307FF5;
  }
  .steps .el-step__title.is-process{
    color: #307FF5;
  }
  .order-detail-content .el-input__suffix{
    right:-0.5rem;
  }
  .order-detail-content .el-dialog {
    position: relative;
    margin: 0 auto 6rem;
    background: #fff;
    border-radius: 0.5rempx;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 90%;
  }
  .order-detail-content .el-dialog__body {
    padding: 0.5rem 2rem 1rem 0rem;
    color: #606266;
    font-size: 1.5rem;
  }
  .order-detail-content .el-form-item__label {
    float: left;
    font-size: 1.8rem;
    color: #606266;
    line-height: 5rem;
    padding: 0 1.2rem 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .order-detail-content .el-select {
    display: inline-block;
    position: relative;
    width: 60%;
  }
  .order-detail-content .el-input__inner {
    text-align: left;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 0.5rem;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 5rem;
    line-height: 5rem;
    outline: 0;
    padding: 0 1.5rem;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .order-detail-content .el-form-item {
    margin-bottom: 2.5rem!important;
    margin-top: 1rem!important;

  }
  .order-detail-content .el-dialog__header {
    padding: 2.2rem 2.5rem 2rem;
  }
  .order-detail-content .el-button {
    display: inline-block;
    line-height: 4rem;
    height: 4rem;
    white-space: nowrap;
    width: 8rem;
    text-align: center;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    padding: 0;
    font-size: 1.6rem;
    border-radius: 0.5rem;
  }
  .order-detail-content .el-button span{
    display: inline-block;
    line-height: 4rem;
    height: 4rem;
  }
  .order-detail-content .el-button--primary {
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .order-detail-content{
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    .paytime{
			padding:p(20);
			p{
				font-size: p(26);
				line-height: p(40);
				color: #999;
			}
		}
    .shouhou{
      position: absolute;
      bottom: 0.9375rem;
      right: 1.25rem;
      display: inline-block;
      width: 6.5rem;
      height: 2.5rem;
      text-align: center;
      line-height: 2.5rem;
      background: #fff;
      color: #409EFF;
      border-radius: 0.625rem;
      border: none;
      font-size: 1.2rem;
    }
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
        bottom: p(70);
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
          font-size: p(28);
          border-radius: p(10);
        }
        >span.qrsh{
          color: white!important;
          background: #fe842f!important;

        }
        >span.ckwl{
          color: white!important;
          background: $bgBlue!important;
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
