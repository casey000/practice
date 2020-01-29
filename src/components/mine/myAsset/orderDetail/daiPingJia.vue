<template>
  <div class="order-detail-content" v-title data-title="订单详情">
    <div class="steps" v-if="isDaifu">
      <el-steps :space="200" :active=activeWord align-center>
        <el-step :title=diyibu></el-step>
        <el-step :title=dierbu></el-step>
        <el-step :title=disanbu></el-step>
      </el-steps>
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
          <span v-if="order.status == 1">
            <span class="status fontSize-10 f-fl" v-if="pro.refundStatus == -1" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">拒绝退款</span>
            <span class="expr f-fl" v-if="pro.refundStatus == -1"  @click="todfTuikuan(pro.afterOrderId, pro.skuId, order.status)">二次售后 </span>
            <span class="status fontSize-10 f-fl" v-else-if="pro.refundStatus == 0" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">审核中</span>
            <span class="status fontSize-10 f-fl" v-else-if="pro.refundStatus == 3" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">成功</span>
            <span class="status fontSize-10 f-fl" v-else @click="toTuikuan('', pro.skuId)">申请退款</span>
          </span>
          <span v-if="order.status > 1">
            <span class="status fontSize-10 f-fl" v-if="pro.refundStatus == -1" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">拒绝退款</span>
            <span class="status fontSize-10 f-fl" v-if="pro.tradeStatus == -1" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">拒绝换货</span>
            <span class="expr f-fl" v-if="pro.refundStatus == -1 || pro.tradeStatus == -1"  @click="todfTuikuan(pro.afterOrderId, pro.skuId, order.status)">二次售后 </span>
            <span class="status fontSize-10 f-fl" v-else-if="pro.refundStatus == 0 || pro.tradeStatus == 0" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">审核中</span>
            <span class="status fontSize-10 f-fl" v-else-if="pro.refundStatus == 1 || pro.tradeStatus == 1" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">同意</span>
            <span class="status fontSize-10 f-fl" v-else-if="pro.refundStatus == 2 || pro.tradeStatus == 2" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">退货中</span>
            <span class="status fontSize-10 f-fl" v-else-if="pro.refundStatus == 3 || pro.tradeStatus == 3" @click="toTuikuan(pro.afterOrderId, pro.skuId, order.status)">成功</span>
            <span class="status fontSize-10 f-fl" v-else @click="toTuikuan('', pro.skuId, order.status)">申请售后</span>
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
        <li class="shifukuan" v-if="order.payIncome">
          <span class="title">消费积分</span>
          <span class="price">{{order.payIncome}} 积分</span>
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
          <span>支付订单号：</span>
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
      <div class="btns f-fr">
        <span @click="pingjia">评价</span>
        <span @click="seeWhere">查看物流</span>
        <span @click="closeFa">开具发票</span>
      </div>
    </div>

    <div class="fapiao-modal" v-if="iskaiPiao">
      <div class="fapiao-title clearfix" >
        <p class="f-fl">开具发票 </p>
        <i class="f-fr icon iconfont icon-close" @click="closeFa()"></i>
      </div>
      <div class="fapiao-body" style="width: 100%;background-color: #fff; height: auto; padding-bottom: 3rem;">
        <div class="fapiao-class" style="">
          <span class="fl" >发票类型:</span>
          <el-select v-model="radioClass" placeholder="请选择" class="fr" onClick="$('input').blur()">
            <el-option
              v-for="item in piaoclass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              onClick="$('input').blur()">
            </el-option>
          </el-select>

        </div>

        <div class="" style="width: 100%; text-align: left; margin-top: 2rem; padding-left: 2rem;" v-if="radioClass==2">
          <el-radio-group v-model="fpgroup" style="font-size:2rem;">
            <el-radio :label="1">个人</el-radio>
            <el-radio :label="2">公司</el-radio>
          </el-radio-group>
          <ul class="forperson" v-if="fpgroup==1">
            <li class="clearfix">
              <span class="f-fl fontSize-16" style="color:#999;">发票抬头:</span>
              <input class="inp f-fl" type="text" placeholder="个人(不可修改)"  v-model="fapiaotille" readonly>
            </li>
            <li>
              <span class="f-fl fontSize-16">手机号:</span>
              <input class="inp f-fl" type="text" placeholder="请输入收票人手机号(非必填项)"  v-model="fapiaophone">
            </li>
            <li>
              <span class="f-fl fontSize-16">邮箱:</span>
              <input class="inp f-fl" type="text" placeholder="请输入邮箱"  v-model="fapiaoemail">
            </li>
          </ul>
          <ul class="forcom" v-if="fpgroup==2">
            <li class="clearfix">
              <span class="f-fl fontSize-16">公司名:</span>
              <input class="inp f-fl" type="text" placeholder="请输入公司名称"  v-model="fapiaotille">
            </li>
            <li>
              <span class="f-fl fontSize-16">识别号:</span>
              <input class="inp f-fl" type="text" placeholder="纳税人识别号"  v-model="fapiaoiden">
            </li>
            <li>
              <span class="f-fl fontSize-16">手机号:</span>
              <input class="inp f-fl" type="text" placeholder="请输入收票人手机号(非必填项)"  v-model="fapiaophone">
            </li>
            <li>
              <span class="f-fl fontSize-16">邮箱:</span>
              <input class="inp f-fl" type="text" placeholder="请输入邮箱"  v-model="fapiaoemail">
            </li>
          </ul>
        </div>

      </div>
      <div class="" style="width: 100%;text-align: center;">
        <span class="fapiaoBtn" @click="fapiaoCompany()" v-if="radioClass == 2&&fpgroup==2">提交</span>
        <span class="fapiaoBtn" @click="fapiaoPerson()" v-if="radioClass == 2&&fpgroup==1">提交</span>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import  "./../../../../common/jq.min"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker,MessageBox } from "mint-ui";
  import Clipboard from 'clipboard';
//import { Scroller } from 'vux'
  export default {
    inject: ['reload'],
    data (){
      return {
        fapiaoemail:'',//发票邮箱
        fapiaoId: '',//发票id
        fapiaoiden:'',    //公司识别号
        fapiaotille:'',   //发表抬头
        fapiaophone:'',   //发票手机
        fpgroup:1,				//开票组织 1:个人;2:公司
        piaoclass: [{
          value: '1',
          label: '不开发票'
        }, {
          value: '2',
          label: '电子发票'
        },
        ],
        radioClass:"",
        iskaiPiao:false,
        isDaifu : true,
        diyibu : '已提交',
        dierbu :'已收货',
        disanbu : '待评价',
        imgIcon : '@/../static/image/home/brand_store/newPro3g.png',
        activeWord : 3,
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
        address:{
          id : '',
        },
        setTime : '24小时00时00分后付款失败',
      }
    },
    mounted(){
      this.orderDetailAxios();
      this.daojishi();
    },
    methods :{
      //个人提交电子发票
      fapiaoPerson() {
        this.fapiaotille = '个人';
        var emiReg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        var reg = /^1\d{10}$/;
        if(!this.fapiaoemail){
          Toast({
            //mintui提示效果
            message: "邮箱不能为空",
            duration: 2000,
          });
          return false;
        }else if(emiReg.test(this.fapiaoemail)){
          var vm = this;
          let hash = window.location.hash;
          hash = hash.split('=');
          let orderId = hash[1];
          $.post(comLink.yxtHost + '/order/fillInvoices', {
            'companyName' : vm.fapiaotille,
            'ihead' : 0,
            'imobile' : vm.fapiaophone,
            'openid' : sessionStorage.openid,
            'orderId' : orderId,
            'taxCode' : vm.fapiaoiden,
            'itype' : 0,
            'iemail':vm.fapiaoemail,
          }, function(resp) {
            console.log(resp, '填写发票');
            if(resp.code == 1) {
              //后台审核开票
              Toast({
                message: resp.msg,
                duration: 2000
              });
              vm.reload();
              /*vm.fapiaoId = resp.data;
                      //创建发票
                      $.post(comLink.yxtHost + '/order/createInvoices', {
                        'id' : resp.data,
                        'openid' : sessionStorage.openid
                      }, function(res) {
                        console.log(res, '创建发票');
                        if(res.code == 1) {
                          Toast({
                            message: res.msg,
                            duration: 2000
                          });
                          vm.closeFa();
                          vm.reload();
                        } else {
                          Toast({
                            message: res.msg,
                            duration: 2000
                          });
                        }
                      });*/
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          });
        }else{
          Toast({
            //mintui提示效果
            message: "邮箱格式输入有误",
            duration: 2000,
          });
        }

      },
      //公司提交电子发票
      fapiaoCompany() {
        if(!this.fapiaoiden){
          Toast({
            //mintui提示效果
            message: "识别号不能为空",
            duration: 2000,
          });
          return;
        }
        if(!this.fapiaotille){
          Toast({
            //mintui提示效果
            message: "公司名不能为空",
            duration: 2000,
          });
          return;
        }
        var emiReg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        var reg = /^1\d{10}$/;
        if(!this.fapiaoemail){
          Toast({
            //mintui提示效果
            message: "邮箱不能为空",
            duration: 2000,
          });
          return;
        }else if(emiReg.test(this.fapiaoemail)){
          var vm = this;
          let hash = window.location.hash;
          hash = hash.split('=');
          let orderId = hash[1];
          $.post(comLink.yxtHost + '/order/fillInvoices', {
            'companyName' : vm.fapiaotille,
            'ihead' : 1,
            'imobile' : vm.fapiaophone,
            'openid' : sessionStorage.openid,
            'orderId' : orderId,
            'taxCode' : vm.fapiaoiden,
            'itype' : 0,
            'iemail':vm.fapiaoemail,
          }, function(resp) {
            console.log(resp, '填写发票');
            if(resp.code == 1) {
              Toast({
                message: resp.msg,
                duration: 2000
              });
              vm.reload();
              /*vm.fapiaoId = resp.data;
              //创建发票
              $.post(comLink.yxtHost + '/order/createInvoices', {
                'id' : resp.data,
                'openid' : sessionStorage.openid
              }, function(res) {
                console.log(res, '创建发票');
                if(res.code == 1) {
                  Toast({
                    message: res.msg,
                    duration: 2000
                  });
                  vm.closeFa();
                  vm.reload();
                } else {
                  Toast({
                    message: res.msg,
                    duration: 2000
                  });
                }
              });*/
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          });
        }else{
          Toast({
            //mintui提示效果
            message: "邮箱格式输入有误",
            duration: 2000,
          });
        }
      },
      closeFa(){
        var vm = this;
        vm.iskaiPiao=!vm.iskaiPiao;
        if(vm.iskaiPiao) {
          if(vm.fapiaoId != undefined && vm.fapiaoId != null && vm.fapiaoId != 'undefined' && vm.fapiaoId != 'null' && vm.fapiaoId != '') {
            //查询电子发票
            $.post(comLink.yxtHost + '/order/getInvoices', {
              'id' : vm.fapiaoId,
              'openid' : sessionStorage.openid
            }, function(res) {
              console.log(res);
              if(res.code == 1) {
                Toast({
                  message: res.msg,
                  duration: 2000
                });
              }
            });
          }
        }
      },
      closeFa2(){
        var vm = this;
        if(vm.fapiaoId != undefined && vm.fapiaoId != null && vm.fapiaoId != 'undefined' && vm.fapiaoId != 'null' && vm.fapiaoId != '') {
          //查询电子发票
          $.post(comLink.yxtHost + '/order/getInvoices', {
            'id' : vm.fapiaoId,
            'openid' : sessionStorage.openid
          }, function(res) {
            console.log(res);
            if(res.code == 1) {
              window.open(res.data.url, '_self');
            } else {
              Toast({
                message: res.msg,
                duration: 2000
              });
            }
          });
        }
      },
      pingjia() {
        var vm = this;
        // let hash = window.location.hash;
        // hash = hash.split('=');
        // let orderId = hash[1];

        this.$router.push({
          path: '/order/pingjia',
          query : {
            'orderId' : vm.order.id
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
      seeWhere(){
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];

        this.$router.push({
          path: '/order/checkAddress',
          query : {'orderId' : orderId}
        });
        /*var qs = require('qs');
        this.$axios.post(comLink.yxtHost + '/order/exp',qs.stringify({
					'openid' :  sessionStorage.openid,
          'id':	orderId,
        }))
          .then(res=>{
            console.log(res.data);
            if(res.data.code==0){
              Toast({
                message: res.data.msg,
                duration: 2000
              });
            }else{
              this.$router.push({
                path: '/order/checkAddress',
                query : {'orderId' : orderId}
              });
            }
          })*/
      },
      toTuikuan (afterOrderId, skuId ,status){
      	if(this.orderDetail.order.orderType===1 || this.orderDetail.order.orderType==='on'){
      		Toast({
            message: '组合购和积分商品不能售后',
            duration: 2000
          });
          return false;
      	}
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
        this.$router.push({
          path: '/order/Tuikuan',
          query : {
            'orderId' : orderId,
            'afterOrderId' : afterOrderId,
            'skuId' : skuId,
            'status' :status
          }
        });
      },
      //二次售后
      todfTuikuan(afterOrderId, skuId ,status){
      	if(this.orderDetail.order.orderType===1 || this.orderDetail.order.orderType==='on'){    //orderType=1 为积分商品
      		Toast({
            message: '组合购和积分商品不能售后',
            duration: 2000
          });
          return false;
      	}
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
        this.$router.push({
          path: '/order/DfTuikuan',
          query : {
            'orderId' : orderId,
            'afterOrderId' : afterOrderId,
            'skuId' : skuId,
            'status': status,

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
              vm.order.sumAmount = vm.orderDetail.order.sumAmount;
              vm.order.realAmount = vm.orderDetail.order.realAmount;
              vm.order.createTime = vm.orderDetail.order.createTime;
              vm.order.payTime = vm.orderDetail.order.payTime;
              vm.order.ordId = vm.orderDetail.order.ordId;
              vm.order.coupon = vm.orderDetail.order.coupon;
              vm.order.discount = vm.orderDetail.order.discount;
              vm.order.showPeriod = vm.orderDetail.order.showPeriod;
              vm.order.productCount = vm.orderDetail.order.productCount;
              vm.fapiaoId = vm.orderDetail.order.invoiceId;
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
  .steps .el-step__main .el-step__title{
    font-size: 1.75rem;
  }
  .steps .el-step__head.is-process{
    color: #307FF5;
    border-color: #307FF5;
  }
  .steps .el-step__title.is-process{
    color: #307FF5;
  }
 .order-detail-content .fapiao-modal .el-input__suffix{
  	right:1rem;
  }
.order-detail-content .fapiao-modal .el-select-dropdown__list {
    list-style: none;
    padding: 0.8rem 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.order-detail-content .el-select-dropdown__item{
    font-size: 1.8rem;
    padding: 0 2.5rem;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 4.2rem;
    line-height: 4.2rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.order-detail-content .fapiao-modal .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 0.5rem;
    border: none;
    text-align: center;
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
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .order-detail-content{
    .steps{
      padding: p(20) 0 p(10) 0;
      background: white;
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
		    font-size: 1.5rem;
      }
      .expr{
      	position: absolute;
        bottom: p(15);
        right: p(150);
        display: inline-block;
		    width: 6.5rem;
		    height: 2.5rem;
		    text-align: center;
		    line-height: 2.5rem;
		    background: #fff;
		    color: #409EFF;
		    border-radius: 0.625rem;
		    border: none;
		    font-size: 1.5rem;
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
    position: fixed;
    top: 0;
    display: block;
    opacity: 1;
    height: 100%;
    width: 100%;
    max-height: 100%;
    background-color: #eee;
    z-index: 999;
  }
</style>
