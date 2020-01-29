<template>
  <div class="all-order-content " v-title data-title="我的订单">
  	 <div class="nav-lists b-white">
      <ul class="order-main f-oh">
        <li class="order-row f-fl" v-for="(item,i) in navLists" :key="i" @click="chooseNavItems(item,i)">
          <img :src=item.blueImg alt="" v-if="navNum === i">
          <img :src=item.greyImg alt="" v-else>
          <p class="icon-word" :class="{activeBlye : navNum === i}">{{item.name}}</p>
          <i class="superscript" v-if="item.number !== 0">{{item.number}}</i>
        </li>
      </ul>
    </div>
  	<scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire">
      <div style="padding-top: 7.5rem ;">

   <!-- <div style="height: 7.5rem;width: 100%" class="content_div"></div>-->
   				<div class="fontSize-16" style="text-align: center; margin-top: 5rem; color: #999;" v-if="!isNoContent">
   					<span >-----无更多订单-----</span>
   				</div>
        <div class="list-outside" v-if='isNoContent' v-for="(allItem,index1) in orderLists" :key="index1">
          <span style="font-size: 1.8rem;margin-left: 1rem ;display: inline-block;padding-top: 1.5rem">订单号：<span>{{allItem.ordId}}</span></span>
          <div class="order-pro-list" v-for="(brandItem,index2) in allItem.brandList" :key="index2">
            <div class="bar-main m-top10 f-oh b-white p-lef-rig24">
              <img :src=brandItem.logo class="icon-tostore f-fl m-right5">
              <dt class="fontSize-12 f-fl m-right10" @click="toHomePage(brandItem.id)">{{brandItem.name}}</dt>
              <i class="icon iconfont icon-more f-fl fontSize-18"></i>
            </div>
            <div class="pro-list-show f-oh">
              <div class="f-oh f-fl list-main f-pr"
                   @click="toOrderDetail(allItem)"
                   v-for="(item,index3) in brandItem.productList" :key="index3">
                <img class="img-pic dis-inblo f-fl" :src=item.logo alt="">
                <div class="pro-name-infos f-fl m-left10">
                  <span class="pro-title fontSize-14 f-db">{{item.name}}</span>
                  <span class="pro-detail fontSize-10 f-db">{{item.skuName}}</span>
                </div>
                <span class="pro-price dis-inblo fontSize-10 f-fr">￥{{item.price}}</span>
                <span class="pro-num dis-inblo fontSize-10 f-fl">X{{item.number}}</span>
              </div>
            </div>
          </div>
          <div class="confirm-pay fontSize-12 b-white p-lef-rig24">
            <span>共{{allItem.productCount}}件商品</span>
            <span class="fontSize-13">合计：￥<span class="fontSize-16" style="color: red;font-weight: bold">{{allItem.realAmount}}</span></span>
            <span>（包邮）</span>
          </div>
          <div class="pay-btn fontSize-12 b-white p-lef-rig24" v-if="notDaifahuo">

              <span class="btns m-right12"
                  @click="proBtns1(allItem,brandItem)"
                  v-if="allItem.btn1 !== null">{{allItem.btn1}}
              </span>
            <span class="btns m-right12"
                @click="proBtns2(allItem,brandItem)"
                v-if="allItem.btn2 !== null">{{allItem.btn2}}
            </span>
            <!--<span class="btns"
                @click="yanshiShouhuoClick(allItem,brandItem)"
                v-if="yanshiShouhuo !== null">{{yanshiShouhuo}}
            </span>-->
          </div>

          <div class="pay-btn fontSize-12 b-white p-lef-rig24" v-else-if="isDaishouhuo">
             <!--<div class="f-fl morereason" ><span @click="showWhy">更多</span>
             	<ul style="position: absolute;background-color: rgba(0,0,0,0.5); color: #fff;padding: 0 1rem; display: none;" >
             		<li style="height: 3.5rem; line-height: 3.5rem;" @click="show=true">查看原因</li>
             	</ul>
             </div>-->
            <span class="btns m-right12"
                @click="proBtns1(allItem)"
                v-if="allItem.btn1 !== null">{{allItem.btn1}}
            </span>
            <span class="btns m-right12"
                @click="proBtns2(allItem)"
                v-if="allItem.btn2 !== null">{{allItem.btn2}}
            </span>
          </div>
          <div class="pay-btn fontSize-12 b-white p-lef-rig24" v-else>
             <!--<div class="f-fl morereason" ><span @click="showWhy($event)">更多</span>
             	<ul style="position: absolute;background-color: rgba(0,0,0,0.5); color: #fff;padding: 0 1rem; display: none;" >
             		<li style="height: 3.5rem; line-height: 3.5rem;" @click="show=true">查看原因</li>
             	</ul>
             </div>-->
            <span class="btns m-right12"
                @click="proBtns1(allItem)"
                v-if="allItem.btn1 !== null">{{allItem.btn1}}
            </span>
            <span class="btns m-right12"
                @click="proBtns2(allItem)"
                v-if="allItem.btn2 !== null">{{allItem.btn2}}
            </span>
          </div>
        </div>
      </div>
    </scroller>
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
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker, MessageBox} from "mint-ui";
  import { Scroller } from 'vux'
  import { XDialog, XButton, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'

  export default{
    directives: {
	    TransferDom
	  },
	  inject: ['reload'],
    data (){
      return {
      	show:false,
      	showrea:false,
        payStatus : true,
        proTotal : 0,
        proPrice : 0,
        shippingPrice : 0,
        navNum : 0,
        navLists : [],
        daohangLists : [
          {
            name : '全部',
            status : 0,
            blueImg : '@/../static/image/mine/all_blue2.png',
            greyImg : '@/../static/image/mine/all_grey2.png',
          },
          {
            name : '待付款',
            status : 1,
            blueImg : '@/../static/image/mine/waitPay_blue2.png',
            greyImg : '@/../static/image/mine/waiPay_grey2.png',
          },
          {
            name : '待发货',
            status : 2,
            blueImg : '@/../static/image/mine/waitSend_blue.png',
            greyImg : '@/../static/image/mine/waitSend_grey.png',
          },
          {
            name : '待收货',
            status : 3,
            blueImg : '@/../static/image/mine/shouhuo2b.png',
            greyImg : '@/../static/image/mine/shouhuo2g.png',
          },
          {
            name : '待评价',
            status : 4,
            blueImg : '@/../static/image/mine/pingjia2b.png',
            greyImg : '@/../static/image/mine/pingjia2g.png',
          },
          {
            name : '售后中',
            status : 5,
            blueImg : '@/../static/image/mine/shouhou2b.png',
            greyImg : '@/../static/image/mine/shouhou2g.png',
          }
        ],
        brandicon : '@/../static/image/mine/orderBrand3x.png',
        orderLists : [],//订单列表
        isNoContent : true,
        btn1 : '',
        btn2 : '',
        notDaifahuo : true,
        isDaishouhuo:false,
        orderId : null,//订单号，取消订单传值
        scrollerReqParams:{//滚动请求的方法
          pageNum:1,
          status:'',
          openid : sessionStorage.openid
        },
        isAllowReq:true,
        newData : [],
        yanshiShouhuo : null,//延时收货
      }
    },
    methods : {
    	showWhy(e){
    		console.log($(e.srcElement).parents('.morereason').children('ul'))
    		$(e.srcElement).parents('.morereason').children('ul').toggleClass('showlist')
    	},
      //获取订单状态数量
      orderNumberAxios(){
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/order/getCount',
          data: {
            openid: sessionStorage.openid,
          },
          dataType: 'json',
          type: 'post',
          success: function (data) {
            if (data.code == 1) {
              vm.orderNumberObj = data.data;
              for(var i = 0,l = vm.daohangLists.length;i < l;i ++){
                if(vm.daohangLists[i].status === 0){
                  vm.daohangLists[i].number = 0
                }else if(vm.daohangLists[i].status === 1){
                  vm.daohangLists[i].number = vm.orderNumberObj.preparePay;
                }else if(vm.daohangLists[i].status === 2){
                  vm.daohangLists[i].number = vm.orderNumberObj.prepareTransport;
                }else if(vm.daohangLists[i].status === 3){
                  vm.daohangLists[i].number = vm.orderNumberObj.prepareCollect;
                }else if(vm.daohangLists[i].status === 4){
                  vm.daohangLists[i].number = vm.orderNumberObj.prepareEvaluate;
                }else if(vm.daohangLists[i].status === 5){
                  vm.daohangLists[i].number = vm.orderNumberObj.saled;
                }
                vm.navLists = vm.daohangLists
              }
              console.log(vm.daohangLists,'打印数字对象')
            }
          },
          error: function (data) {

          }
        })
      },
      //点击切换对应目录下的订单
      chooseNavItems(item,i){
        this.orderNumberAxios();
        this.navNum = i;
        this.isAllowReq = true;
        // alert(this.navNum);
        this.scrollerReqParams.status = i;
        this.getListsAxios(i);
        /*if(this.navNum === 0){
          // this.orderListsAxios(1);
          this.getListsAxios();
        }else{

          this.getListsAxios();
        }*/
        if(item.name === '待发货'){
          this.notDaifahuo = false;
        }else{
          this.notDaifahuo = true;
        }
        if(item.name === '待收货'){
          this.isDaishouhuo = true;
        }else{
          this.isDaishouhuo = false;
        }
      },
      //跳转订单详情页
      toOrderDetail(allItem){
        console.log(allItem.status);
        if(allItem.status === 1){
          this.$router.push({
            path : '/order/daiFuKuan',
            query : { orderId : allItem.id }
          })
          //点击了待付款
        }else if(allItem.status === 2){
          //点击了 待发货
          this.$router.push({
            path : '/order/daiFaHuo',
            query : { orderId : allItem.id }
          })
        }else if (allItem.status === 3){
          //点击了 待收货
          this.yanshiShouhuo = '延时收货'
          this.$router.push({
            path : '/order/daiShouHuo',
            query : { orderId : allItem.id }
          })
        }else if (allItem.status === 4){
          //点击了 待评价
          this.$router.push({
            path : '/order/daiPingJia',
            query : { orderId : allItem.id }
          })
        }else if (allItem.status === 5){
          //点击了 售后中
          this.$router.push({
            path : '/order/shouHouZhong',
            query : { orderId : allItem.id }
          })
        } else if (allItem.status === 6){
          //点击了 售后中
          this.$router.push({
            path : '/order/daiShouHuo',
            query : { orderId : allItem.id }
          })
        } else if (allItem.status === -1){
          //点击了 已取消
          this.$router.push({
            path : '/order/daiFuKuan',
            query : { orderId : allItem.id }
          })
        }
        // this.$router.push({
        //   path : '/order/orderDetail',
        //   query : { orderId : allItem.id}
        // })
      },
      //获取订单列表
      orderListsAxios : function(page){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/order/list',
          data:{
            openid : sessionStorage.openid,
            pageNum:page,
          },
          dataType:'json',
          type:'post',
          success:function (res) {
            console.log(res,'res');
            vm.orderLists = res.data;
            console.log('vm.orderLists',vm.orderLists);
            if(res.code == 1){
              if(res.data && res.data.length > 0){
                // vm.isNoContent = true;
                vm.orderLists = res.data;
                vm.getData ();
              }else{
                // vm.isNoContent = false;
              }
            }else{
              // vm.isNoContent = false;
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
      //获取数据 方法
      getData (){
        for( var i = 0,l=this.orderLists.length;i<l;i++ ){
          if(this.orderLists[i].status === 1){//待付款
            this.orderLists[i].btn1 = '去付款';
            this.orderLists[i].btn2 = '取消订单'
          }else if(this.orderLists[i].status === 2){//待发货
            this.orderLists[i].btn1 = null;
            this.orderLists[i].btn2 = null;
          }else if(this.orderLists[i].status === 3){//待收货
            this.orderLists[i].btn1 = '查看物流';
            this.orderLists[i].btn2 = '确认收货';
          }else if(this.orderLists[i].status === 4){//待评价
            this.orderLists[i].btn1 = '查看物流';
            this.orderLists[i].btn2 = '评价'
          }else if(this.orderLists[i].status === 5){//售后中
            this.orderLists[i].btn1 = null;
//          this.orderLists[i].btn2 = '撤销';
            this.orderLists[i].btn2 = null;
          }else if(this.orderLists[i].status === 6){//完成
            this.orderLists[i].btn1 = '删除订单';
            this.orderLists[i].btn2 = '订单详情';
          }else if (this.orderLists[i].status === -1){
            this.orderLists[i].btn1 = '删除订单';
            this.orderLists[i].btn2 = '已取消';
          }
          for(var j = 0,braL = this.orderLists[i].brandList.length;j<braL;j++){
            // this.orderLists[i].brandList[j].totalPrice = 0
            this.orderLists[i].brandList[j].logo = comLink.yxtImgHost + this.orderLists[i].brandList[j].logo;
            this.orderLists[i].brandList[j].buyNumber = this.orderLists[i].brandList[j].productList.length;
            for( var k = 0,proL = this.orderLists[i].brandList[j].productList.length;k<proL;k ++){
              this.orderLists[i].brandList[j].productList[k].logo =
              comLink.yxtImgHost + this.orderLists[i].brandList[j].productList[k].logo;
            }
          }
        }
      },
      //滚动数据 判断 方法
      getGundongData (){
        for( var i = 0,l=this.newData.length;i<l;i++ ){
          for(var j = 0,braL = this.newData[i].brandList.length;j<braL;j++){
            this.newData[i].brandList[j].totalPrice = 0;
            this.newData[i].brandList[j].logo = comLink.yxtImgHost+this.newData[i].brandList[j].logo;
            this.newData[i].brandList[j].buyNumber = this.newData[i].brandList[j].productList.length;
            for( var k = 0,proL = this.newData[i].brandList[j].productList.length;k<proL;k ++){

              this.newData[i].brandList[j].productList[k].logo =
                comLink.yxtImgHost + this.newData[i].brandList[j].productList[k].logo;

              if(this.newData[i].status === 1){
                this.newData[i].btn1 = '去付款';
                this.newData[i].btn2 = '取消订单'
              }
              if( this.newData[i].status === 2 ){
                this.newData[i].btn1 = null;
                this.newData[i].btn2 = null;
              }
              if(this.newData[i].status === 3 ){
                this.newData[i].btn1 = '查看物流';
                this.newData[i].btn2 = '确认收货';
              }
              if(this.newData[i].status === 4 ){
                this.newData[i].btn1 = '查看物流';
                this.newData[i].btn2 = '评价';
              }
              if(this.newData[i].status === 5 ){
                this.newData[i].btn1 = null;
//              this.newData[i].brandList[j].btn2 = '撤销';
                this.newData[i].btn2 = null;

              }
              if(this.newData[i].status === 6 ){
                this.newData[i].btn1 = '删除订单';
                this.newData[i].btn2 = '订单详情';
              }
              if(this.newData[i].status === -1 ){
            	this.newData[i].btn1 = '删除订单';
                this.newData[i].btn2 = '已取消';
              }
              this.newData[i].brandList[j].totalPrice +=
                this.newData[i].brandList[j].productList[k].price *
                this.newData[i].brandList[j].productList[k].number
            }
          }
        }
      },
      //传参请求订单列表
      getListsAxios: function(status){
        if(status === 0) {
          status = '';
        }
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/order/list',
          data:{
            status: status,
            pageNum : vm.scrollerReqParams.pageNum,
            openid:sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (res) {
            if(res.code == 1){
              if(res.data && res.data.length > 0){
                vm.isNoContent = true;
                vm.orderLists = res.data;
                console.log( vm.orderLists,'213')
                vm.getData ();
              }else{
                vm.isNoContent = false
              }
            }else{
              vm.isNoContent = false
              /*Toast({
                message: res.msg,
                duration: 2000
              });*/
            }

          },
        })
      },

      //取消订单

      //取消订单/order/cancel
      cancelOrderAxios: function(orderId){
        MessageBox.confirm('确定取消订单?').then(action => {
          var vm = this;
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
                Toast({
                  message: data.msg,
                  duration: 2000
                });
                vm.reload();
                // window.location.reload();
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
      //点击第一个按钮
      proBtns1(allItem){
        var vm = this;
        if(allItem.btn1 === '去付款'){
          this.payStatus = false;
          //立即支付
          $.post(comLink.yxtHost + '/pay/payOrder', {
            'openid' : sessionStorage.openid,
            'orderId' : allItem.id,
          }, function(resp) {
            if(resp.code == 1){
              Toast({
                //mintui提示效果
                message: '跳转建行信用卡支付中...',
                duration: 2000,
              });
              // window.location.href = data.data
              window.open(resp.data,'_self');
              window.open(resp.data,'_self')
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          });
        }
        if(allItem.btn1 === '查看物流'){
          this.$router.push({
            path : '/order/checkAddress',
            query : {'orderId' : allItem.id}
          })
        }
        //只有售后中有订单详情
        if(allItem.btn1 === '查看进度'){
          this.$router.push({
            path : '/order/shouHouZhong',
            query : {'orderId' : allItem.id}
          });
        }
        //只有售后中有订单详情
        if(allItem.btn1 === '订单详情'){
          this.$router.push({
            path : '/order/daiShouHuo',
            query : {'orderId' : allItem.id}
          });
        }
        //删除订单
        if(allItem.btn1 === '删除订单'){
        	 MessageBox.confirm('确认删除订单?').then(action => {
            $.post(comLink.yxtHost + '/order/delOrder', {
              'openid' : sessionStorage.openid,
              'orderId' : allItem.id
            }, function(resp) {
              if(resp.code == 1){
              	Toast({
                  message: resp.msg,
                  duration: 2000
                });
                vm.reload();
//              window.location.reload();
              }else{
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            });
          });
        }
      },
      //点击第二个按钮
      proBtns2(allItem){
        var vm = this;
         //只有售后中有订单详情
        if(allItem.btn2 === '订单详情'){
          this.$router.push({
            path : '/order/daiShouHuo',
            query : {'orderId' : allItem.id}
          });
        }
        if(allItem.btn2 === '取消订单'){
          this.cancelOrderAxios(allItem.id);
        }
        if(allItem.btn2 === '确认收货'){
          MessageBox.confirm('是否确认收货?').then(action => {
            $.post(comLink.yxtHost + '/order/confirmCollect', {
              'openid' : sessionStorage.openid,
              'orderId' : allItem.id
            }, function(resp) {
              if(resp.code == 1){
                vm.$router.push({
                  path: '/home/customback',//反馈
                  query : {'orderId' : allItem.id}
                });
              }else{
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            });
          });
        }
        if(allItem.btn2 === '评价'){
          this.$router.push({
            path: '/order/pingjia',
            query : {
              'orderId' : allItem.id
            }
          });
        }
        if(allItem.btn2 === '申请退款'){
        	var vm=this;
        	$.ajax({
        		url:comLink.yxtHost + '/order/detail',
          	data:{
	            openid : sessionStorage.openid,
	            orderId:allItem.id,
	          },
          	dataType:'json',
          	type:'post',
          	success:function(data){
          		if(data.code==1){
          			if(data.data.order.orderType===1|| data.data.order.orderType==='on'){
          				Toast({
					            message: '组合购和积分商品不能售后',
					            duration: 2000
					          });
					          return false;
          			}else{
	          				vm.$router.push({
					            path: '/order/Tuikuan',
					            query : {
					              'orderId' : allItem.id,
					              'price' : allItem.realAmount,
					            }
					          });
          			}
          		}

          	}
        	});

        }
        if(allItem.btn2 === '撤销') {
          MessageBox.confirm('您确定撤销售后申请吗？', '提示', {confirmButtonText: '确定'}).then(({ value, action }) => {
            $.post(comLink.yxtHost + '/order/afterSaleApplyCancle', {
              'openid' : sessionStorage.openid,
              'orderId' : allItem.id
            }, function(resp) {
              if(resp.code === 1){
                vm.reload();
              }else{
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            });
          })
        }
        //只有售后中有订单详情
        if(allItem.btn2 === '已取消'){
          this.$router.push({
            path: '/order/daiFuKuan',//跳转待评价
            query : {
              'orderId' : allItem.id,
            }
          });
        }
      },
      //
      yanshiShouhuoClick(allItem,brandItem){
      //  点击延时收货

      },
      //回到首页
      toHomePage (brandId){
        this.$router.push({
          path: '/home/brandStoreRouter',
          query : { brandId : brandId }
        });
      },
      //滚动请求
      scrollerRequire(){
        if(this.isAllowReq){//todo
          this.scrollerReqParams.pageNum ++;//todo
          this.isAllowReq = false;
          var vm = this;
          $.post(comLink.yxtHost + '/order/list', {
            'pageNum' : vm.scrollerReqParams.pageNum,
            'status' : vm.scrollerReqParams.status,
            'openid' : sessionStorage.openid,
          }, function(res) {
            if(res.code === 1){
              if(res.data && res.data.length > 0){
                vm.newData = res.data;
                console.log(vm.newData,'vm.newData')
                vm.getGundongData ();
                vm.orderLists = vm.orderLists.concat(vm.newData);
          		vm.isAllowReq = true;
              }else{
                vm.scrollerReqParams.pageNum --;
              }
            }else{
              vm.scrollerReqParams.pageNum --;
            }
          });
        }
      },
       GetQueryString(name) {
	      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	      var r = window.location.search.substr(1).match(reg);
	      if(r!=null)return  unescape(r[2]);
	      return null;
	    },
    },

    mounted:function(){
      var openid = sessionStorage.openid;
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        openid = this.GetQueryString('openid');
        if(openid != undefined && openid != null && openid != 'undefined' && openid != 'null' && openid != '') {
          sessionStorage.setItem('openid', openid);
        }
      }
			 let hash = window.location.hash;
      hash = hash.split('?');
      console.log(hash)

      this.orderNumberAxios();
      var type = this.$route.query.index;
      type = parseInt(type);
      if(type > 0){
        this.scrollerReqParams.status = type;
        this.navNum = type;
        this.getListsAxios(type);
      }else{
        this.orderListsAxios(1);//获取订单信息
      }
    },
    components : {
      // orderProListComponent
      Scroller,
      XDialog,
	    XButton,
	    Group,
	    XSwitch

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
          width: 16.66%;
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

            .pro-detail{
              color: #9fa0a1;
              line-height: p(30);
              text-align: left;
              margin-top: p(5);
            }
            .pro-title{
              line-height: p(40);
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
