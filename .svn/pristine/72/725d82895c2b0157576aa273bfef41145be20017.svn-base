<template>
  <div class="order-detail-content" v-title data-title="订单详情">
    <div class="steps" v-if="isDaifu">
      <el-steps :space="200" :active=activeWord align-center>
        <el-step :title=diyibu></el-step>
        <el-step :title=dierbu></el-step>
        <el-step :title=disanbu></el-step>
      </el-steps>
      <div class="refuse-reason fontSize-14 p-left20 m-top10 p-bottom10" v-if="refuseReason">
      	<p class="p-left20"> 拒绝理由：{{refuseReason}}</p>
      </div>
    </div>
    <div class="address-content">
      <span class="title fontSize-12  p-lef-rig24">收货地址:</span>
      <div class="receiver-infos fontSize-14  p-lef-rig24">
        <div class="" v-if="orderDetail.order.getName">
          <span>收货人：{{orderDetail.order.getName}}</span><br>
          <span>电话：{{orderDetail.order.getPhone}}</span><br>
          <span>地址：{{orderDetail.order.province}} {{orderDetail.order.city}} {{orderDetail.order.area}} {{orderDetail.order.address}}</span>

        </div>
        <div class="" v-else>
          <a class="do-address" @click="doAddress(orderDetail.order.id)">去完善</a>
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
          <span class="pro-num dis-inblo fontSize-10 f-fl" style="top: 5rem;">X{{pro.number}}</span>
          <span class="cancle fontSize-10 f-fr" @click="afterSaleApplyCancle(pro.afterOrderId)" v-if="pro.refundStatus == 1 || pro.tradeStatus ==1 || pro.refundStatus == 0 || pro.tradeStatus == 0 ">撤销售后</span>
          <span class="expr fontSize-12 f-fr" @click="toTuihuo(pro.afterOrderId)" v-if="pro.refundStatus == 1 && pro.tradeStatus ==null ">提交退货物流</span>
          <!--<span class="expr fontSize-12 f-fr" @click="dialogFormVisible = true" v-if="pro.refundStatus == 1 && pro.tradeStatus ==null ">提交退货物流</span>-->
      		<span class="expr fontSize-12 f-fr" @click="seeWhere(pro.afterOrderId)" v-if="pro.refundStatus == 2 && pro.tradeStatus ==null ">查询退货物流</span>
      		<!--<span class="expr fontSize-12 f-fr" @click="dialogFormVisible2 = true" v-if="pro.refundStatus == null && pro.tradeStatus == 1 ">提交换货物流</span>-->
      		<!--<span class="expr fontSize-12 f-fr" @click="seeWhere" v-if="pro.refundStatus == null && pro.tradeStatus == 2 ">查询换货物流</span>-->
          <span v-if="order.status == 1">
            <span class="status fontSize-12 f-fl" v-if="pro.refundStatus == -1 || pro.tradeStatus == -1" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">拒绝退款</span>
            <span class="expr f-fl" v-if="pro.refundStatus == -1"  @click="todfTuikuan(pro.afterOrderId, pro.skuId, order.status)">二次售后 </span>
            <span class="status fontSize-12 f-fl" v-else-if="pro.refundStatus == 0 || pro.tradeStatus == 0" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">审核中</span>
            <span class="status fontSize-12 f-fl" v-else-if="pro.refundStatus == 3 || pro.tradeStatus == 3" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">成功</span>
            <span class="status fontSize-12 f-fl" v-else @click="toTuikuan('', pro.skuId, order.status)">申请退款</span>
          </span>
          <span v-if="order.status > 1">
            <span class="status fontSize-12 f-fl" v-if="pro.refundStatus == -1" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">拒绝退款</span>
            <span class="status fontSize-12 f-fl" v-if="pro.tradeStatus == -1" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">拒绝换货</span>
            <span class="expr f-fl" v-if="pro.refundStatus == -1 || pro.tradeStatus == -1"  @click="todfTuikuan(pro.afterOrderId, pro.skuId, order.status)">二次售后 </span>
            <span class="status fontSize-12 f-fl" v-else-if="pro.refundStatus == 0 || pro.tradeStatus == 0" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">审核中</span>
            <span class="status fontSize-12 f-fl" v-else-if="pro.refundStatus == 1 || pro.tradeStatus == 1" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">同意</span>
            <span class="status fontSize-12 f-fl" v-else-if="pro.refundStatus == 2 || pro.tradeStatus == 2" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">退货中</span>
            <span class="status fontSize-12 f-fl" v-else-if="pro.refundStatus == 3 || pro.tradeStatus == 3" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">成功</span>
            <span class="status fontSize-12 f-fl" v-else @click="toTuikuan('', pro.skuId, order.status)">申请售后</span>
          </span>
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
		<el-dialog :visible.sync="dialogFormVisible" style="margin-top: 10rem;">
	  <el-form >
      <el-form-item label="快递公司" :label-width="formLabelWidth" >
        <el-select v-model="kdgs" placeholder="请选择快递公司" onClick="$('input').blur()">
          <el-option :label="exp.company" :value="exp.id" v-for="(exp,i) in expressList" :key=i onClick="$('input').blur()"></el-option>
        </el-select>
      </el-form-item>
	    <!--<el-form-item label="快递单号" :label-width="formLabelWidth" onClick="$('input').blur()">-->
	      <!--<el-input v-model="kddh" auto-complete="off" placeholder="请输入快递单号"  ></el-input>-->
	      <label for=""class="fontSize-15 " style="height: 3rem; line-height: 3rem; padding-left: 1.7rem;">快递单号</label>
	      <input v-model="kddh"  placeholder="请输入快递单号"  class="p-left15 fontSize-14" style="height: 3rem; line-height: 3rem; padding-bottom: 0.4rem;"></input>

	    <!--</el-form-item>-->
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="todata">确 定</el-button>
	  </div>
	</el-dialog>
		<!--<el-dialog :visible.sync="dialogFormVisible2" style="margin-top: 10rem;">
	  <el-form >
      <el-form-item label="快递公司" :label-width="formLabelWidth" >
        <el-select v-model="kdgs" placeholder="请选择快递公司2" onClick="$('input').blur()">
          <el-option :label="exp.company" :value="exp.id" v-for="(exp,i) in expressList" :key=i onClick="$('input').blur()"></el-option>
        </el-select>
      </el-form-item>

	      <label for=""class="fontSize-15 " style="height: 3rem; line-height: 3rem; padding-left: 1.7rem;">快递单号</label>
	      <input v-model="kddh"  placeholder="请输入快递单号"  class="p-left15 fontSize-14" style="height: 3rem; line-height: 3rem; padding-bottom: 0.4rem;"></input>


	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
	    <el-button type="primary" @click="tohuanhuo">确 定</el-button>
	  </div>
	</el-dialog>-->
    <!--<div class="bottom-btns f-oh p-lef-rig24">
      <div class="">
        <span class="f-fl total-price-acount" style="margin-left: 1rem">总价： ￥{{order.realAmount}}</span>
      </div>
      <div class="btns f-fr">
      	<span type="text" @click="dialogFormVisible = true" v-if="isagree">提交退货物流</span>
      	<span type="text" @click="seeWhere" v-if="istuiIng">查询退货物流</span>
        <span @click="detail">查看详情</span>
        <span @click="afterSaleApplyCancle" v-if="afterSaleOrder.refundStatus == 0 || afterSaleOrder.tradeStatus == 0">撤销</span>
      </div>
    </div>-->
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup ,MessageBox } from "mint-ui";
  import Clipboard from 'clipboard';
//import { Scroller } from 'vux'
  export default {
    inject: ['reload'],
    data (){
      return {
      	refuseReason:'',//拒绝理由
        isDaifu : true,
        diyibu : '已提交',
        dierbu :'售后中',
        disanbu : '待完成',
        imgIcon : '@/../static/image/home/brand_store/newPro3g.png',
        activeWord : 1,
        orderId : '',
        orderDetail : {},//订单详情
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
        address:{},
        setTime : '24小时00时00分后付款失败',
        dialogFormVisible: false,
        dialogFormVisible2:false,
//      form: {
//        num: '',
//        company: '',
//      },
        expressList : {},
				kdgs:'',
				kddh:'',
        formLabelWidth: '10rem',
        afterSaleOrder : {
          refundStatus : ''
        },
        afterSaleId:"",
//      isagree:false, //同意退货
//      istuiIng:false,//退货中
      }
    },
    mounted(){
      this.orderDetailAxios();
      this.daojishi();
      this.getExpressList();
      this.getRefundStatus();
    },
    methods :{
    	toTuihuo(afterOrderId){
    		this.dialogFormVisible=true;
    		this.afterSaleId=afterOrderId;
    	},
      seeWhere(afterSaleOrderId){
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];

        this.$router.push({
          path: '/order/tuihuoAddress',
          query : {
          	'afterSaleOrderId' : afterSaleOrderId,
//          'orderId' : orderId,
//          'type' : 2//退货物流
          }
        });
      },
      //查询订单退换货状态
      getRefundStatus() {
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
        $.post(comLink.yxtHost + '/order/getRefundStatus',  {
          'orderId' : orderId,
//        'openid' : sessionStorage.openid,
        }, function (resp) {
          if(resp.code == 1) {
            vm.afterSaleOrder = resp.data;
            console.log(vm.afterSaleOrder,'1234')
            if(vm.afterSaleOrder.refundStatus == -1) {//拒绝退款
              // vm.dierbu = '已拒绝';
              vm.disanbu = '已拒绝';
              vm.activeWord = 3;
              vm.refuseReason=vm.afterSaleOrder.refusedCause;
            }
            if(vm.afterSaleOrder.refundStatus == 0) {//审核中
              vm.dierbu = '审核中';
            }
            if(vm.afterSaleOrder.refundStatus == 1) {//同意退货
              vm.dierbu = '退货';
            }
            if(vm.afterSaleOrder.refundStatus == 2) {//退货中
              vm.dierbu = '退货中';
            }
            if(vm.afterSaleOrder.refundStatus == 3) {//成功
              vm.disanbu = '退款成功';
              vm.activeWord = 3;
            }
            if(vm.afterSaleOrder.refundStatus == 4) {//取消
              // vm.dierbu = '已取消';
              vm.disanbu = '已取消';
              vm.activeWord = 3;
            }
          }
        },'json');
      },
      getExpressList() {
        var vm = this;
        $.post(comLink.yxtHost + '/order/getExp', {}, function (resp) {
          if(resp.code == 1) {
            vm.expressList = resp.data;
          }
        });
        console.log(vm.expressList, '快递');
      },
      //提交退货物流
    	todata(){
        var vm = this;
//      let hash = window.location.hash;
//      hash = hash.split('=');
//      let orderId = hash[1];
    		this.dialogFormVisible = false;

    		$.post(comLink.yxtHost + '/order/uploadExpress', {
          'afterSaleOrderId' : vm.afterSaleId,
          'expressId' : vm.kdgs,
          'expressCode' : vm.kddh,
          'afterId' : vm.afterSaleOrder.id,
          'openid' : sessionStorage.openid,
        }, function (resp) {
          Toast({
            message: resp.msg,
            duration: 2000
          });
          vm.reload();
        });
    	},
    	//提交换货物流
    	tohuanhuo(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
    		this.dialogFormVisible2 = false;

    		$.post(comLink.yxtHost + '', {
          'orderId' : orderId,
          'expressId' : vm.kdgs,
          'expressCode' : vm.kddh,
          'afterId' : vm.afterSaleOrder.id,
          'openid' : sessionStorage.openid,
        }, function (resp) {
          Toast({
            message: resp.msg,
            duration: 2000
          });
          vm.reload();
        });
    	},
      detail() {
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];

        this.$router.push({
          path: '/order/Tuikuan',//跳转待评价
          query : {
            'orderId' : orderId,
            'price' : vm.order.realAmount
          }
        });

        /*MessageBox.confirm('是否确认收货？', '提示', {confirmButtonText: '确定'}).then(({ value, action }) => {
          $.post(comLink.yxtHost + '/order/confirmCollect', {
            'openid' : sessionStorage.openid,
            'orderId' : orderId
          }, function(resp) {
            if(resp.code == 1){
              this.$router.push({
                path: '/order/daiPingJia',//跳转待评价
                query : {'orderId' : orderId}
              });
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          });
        })*/
      },
      afterSaleApplyCancle(afterOrderId){
        var vm = this;
//      let hash = window.location.hash;
//      hash = hash.split('=');
//      let orderId = hash[1];

        MessageBox.confirm('您确定撤销售后申请吗？', '提示', {confirmButtonText: '确定'}).then(({ value, action }) => {
          $.post(comLink.yxtHost + '/order/afterSaleApplyCancle', {
            'openid' : sessionStorage.openid,
            'afterSaleOrderId' : afterOrderId
          }, function(resp) {
            if(resp.code === 1){
//            vm.$router.push({
//              path: '/order/daiPingJia',//跳转待评价
//              query : {'orderId' : orderId}
//            });
 							Toast({
                message: resp.msg,
                duration: 2000
              });
              vm.reload();
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          });
        })
      },
      toTuikuan (afterOrderId, skuId ,status){
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
        this.$router.push({
          path: '/order/Tuikuan',
          query : {
            'orderId' : orderId,
            'afterOrderId' : afterOrderId,
            'skuId' : skuId,
            'status' :status,
          }
        });
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
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        this.setTime =
          (hours < 10? '0'+hours:hours)+"小时" +
          (minutes < 10 ? '0'+minutes : minutes)+"分"+
          (seconds < 10 ? '0'+seconds:seconds)+"秒"+'后将关闭订单支付';
      },
      //获取订单详情
      orderDetailAxios : function(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=')
        let orderId = hash[1]
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
              console.log(leftTime);
              setInterval(function(){//todo
                leftTime -= 1000;
                if(leftTime > 0) {
                  vm.daojishi(leftTime);
                }
              },1000);
              // vm.daojishi();
              vm.orderDetail = res.data;


              vm.order = vm.orderDetail.order;
//            if(vm.order.status>1){
//            	for(var i=0;i< vm.orderDetail.list.length;i++){
//            		for(var j=0;j < vm.orderDetail.list[i].productList.length;j++){
//            			if(vm.orderDetail.list[i].productList[j].refundStatus == 1 || vm.orderDetail.list[i].productList[j].tradeStatus == 1){
//            				vm.isagree=true;
//            			}else if(vm.orderDetail.list[i].productList[j].refundStatus == 2 || vm.orderDetail.list[i].productList[j].tradeStatus == 2){
//            				vm.istuiIng=true;
//            			}
//            		}
//            	}
//            }
              vm.order.sumAmount = vm.orderDetail.order.sumAmount;
              vm.order.realAmount = vm.orderDetail.order.realAmount;
              vm.order.createTime = vm.orderDetail.order.createTime;
              vm.order.payTime = vm.orderDetail.order.payTime;
              vm.order.ordId = vm.orderDetail.order.ordId;
              vm.order.coupon = vm.orderDetail.order.coupon;
              vm.order.discount = vm.orderDetail.order.discount;
              vm.order.showPeriod = vm.orderDetail.order.showPeriod;
              vm.order.productCount = vm.orderDetail.order.productCount;
              vm.order.tradeNo = vm.orderDetail.order.tradeNo;
              if(vm.orderDetail.address){
                vm.address.id = vm.orderDetail.address.id;
              }else{
                vm.address.id = null;
              }

              console.log(vm.order,'order')
              let listArr = vm.orderDetail.list;
              for(var i = 0;i < listArr.length;i ++){
                listArr[i].logo = comLink.yxtImgHost + listArr[i].logo;

                let productArr = listArr[i].productList;
                for( var j = 0;j < productArr.length;j ++){
                  productArr[j].logo = comLink.yxtImgHost + productArr[j].logo
                }
              }
              console.log(vm.orderDetail,'订单列表')
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
          url:comLink.yxtHost + '/order/pay',
          data:{
            openid : sessionStorage.openid,
            orderId:orderId,
            addressId : vm.address.id,
          },
          dataType:'json',
          type:'post',
          success:function (res) {
            if(res.code == 1){
              $.ajax({
                url:comLink.yxtHost + '/pay/payOrder',
                data:{
                  orderId:res.data
                },
                dataType:'json',
                type:'post',
                success:function (data) {
                  if(data.code == 1){
                    // window.location.href = data.data
                    window.open(data.data,'_self');
                    window.open(data.data,'_self')
                  }
                },
                error:function (data) {

                }
              })
            }else{
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
<style>
  .order-detail-content .steps .el-step__main .el-step__title{
    font-size: 1.75rem;
  }
  .order-detail-content .steps .el-step__head.is-process{
    color: #307FF5;
    border-color: #307FF5;
  }
  .order-detail-content .steps .el-step__title.is-process{
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
    .steps{
      padding: p(20) 0 p(10) 0;
      background: white;
    }
		.refuse-reason{
			color: #999;
		}
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
      padding: p(20) p(20);
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
      .status{
      	position: absolute;
        bottom: p(15);
        right: p(20);
        display: inline-block;
		    width: 6.5rem;
		    height: 2.5rem;
		    text-align: center;
		    line-height: 2.5rem;
		    background: #fff;
		    color: #409EFF;
		    border-radius: 0.625rem;
		    border: none;
      }
      .expr{
      	position: absolute;
        bottom: p(15);
        right: p(150);
        display: inline-block;
			  width: 11rem;
		    height: 2.5rem;
		    text-align: center;
		    line-height: 2.5rem;
		    background: #fff;
		    color: #409EFF;
		    border-radius: 0.625rem;
		    border: none;
      }
      .cancle{
      	position: absolute;
        top: p(9);
        right: p(60);
        display: inline-block;
		    font-size: 1.375rem;
		    width: 8rem;
		    height: 2.5rem;
		    text-align: center;
		    line-height: 2.5rem;
		    color: #333;
		    border-radius: 0.625rem;
		    border: none;
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
          width: p(245);
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
