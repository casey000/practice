<template>
  <div class="mycoupon-content"  v-title data-title="请选择优惠劵">
    <div class="top-content">
      <div class="header-choose fontSize-15 w-color f-oh">
        <dt class="choose-item f-fl" @click="navClick(0)" :class="{ 'color-back' : num === 0}">可用（{{ canUse }}）</dt>
        <dt class="choose-item f-fl" @click="navClick(-1)" :class="{ 'color-back' : num === -1}">失效（{{ noUse }}）</dt>
      </div>
    </div>

    <!--<div v-if="hasCoupon" class="detail-main">-->
    <div class="detail-main">
      <div class="coupon-detail">
        <dt class="coupon-main" v-for="(item,i) in couponUsetList" :key="i" v-if="useStatus == 0">
        <!--<i class="left" @click="chooseCoupon(item)" :class="{active : item.checked}"></i>-->
          <div class="coupon-row m-top10 f-oh f-pr" @click="confirm(item.couponId)">
            <div class="left-main f-fl w-color dis-inblo">
              <p class="money">￥<span style="font-size: 4.625rem;font-family: '叶根友毛笔行书2.0版';">{{ item.reduceMoney }}</span></p>
              <p class="fontSize-14" style="color: black">{{ item.couponName }}</p>
            </div>
            <div class="right-main f-fl dis-inblo">
              <p style="font-size: 2.25rem ;color:#d20404;" class="ellipsis">{{ item.couponName }}</p>
              <p class="limit fontSize-12 m-top15">{{item.remark}}</p>
              <p class="time fontSize-11 m-top15">有效期截止：{{ item.endTime }}</p>
            </div>
          </div>
        </dt>
        <dt class="coupon-main" v-for="(item,i) in couponUsetList" :key="i" v-if="useStatus == 1 || useStatus == -1" style="opacity: 0.5">
          <!--<i class="left" @click="chooseCoupon(item)" :class="{active : item.checked}"></i>-->
          <div class="coupon-row m-top10 f-oh f-pr" @click="confirm(item.couponId)">
            <div class="left-main f-fl w-color dis-inblo">
              <p class="money">￥<span style="font-size: 4.625rem;font-family: '叶根友毛笔行书2.0版';">{{ item.reduceMoney }}</span></p>
              <p class="fontSize-14" style="color: black">{{ item.couponName }}</p>
            </div>
            <div class="right-main f-fl dis-inblo">
              <p style="font-size: 2.25rem ;color:#d20404;" class="ellipsis">{{ item.couponName }}</p>
              <p class="limit fontSize-12 m-top15">{{item.remark}}</p>
              <p class="time fontSize-11 m-top15">有效期截止：{{ item.endTime }}</p>
            </div>
          </div>
        </dt>

      </div>
      <!--<coupon-component :couponLists = 'couponLists' ></coupon-component>-->
    </div>

    <div class="no-coupon-content" v-if="!hasCoupon">
      <img class="no-coupon-img" src="./../../../../../static/img/home/coupon/nocoupon.png" alt="">
    </div>
    <!--前往商城领劵中心-->
    <!--<div class="my-coupon f-pr " @click="confirm()">
        <p class="word dis-inblo w-color">确定</p>
    </div>-->
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  import couponComponent from "./../../../../subcomponents/coupon-component.vue";
  export default {
    data (){
      return{
        allItem : '全部类型',
        num : 0,
        wNum : 0,
        canUse : null,
        noUse : 0,
        hasCoupon : true,
        showSort : false,
        showSortNum: 0,
        selectSort : true,
        allItems : [
          {
            name : '全部类型',
            routerPath : ''
          },
          {
            name : '平台专用',
            routerPath : ''
          },
          {
            name : '商品专用',
            routerPath : ''
          },
          {
            name : '餐饮专用',
            routerPath : ''
          }
        ],
        couponUsetList : [],
        useStatus : 0,//（0未使用 1已使用 -1过期）
        type : null,
        totalPrice : null,
        canUseArr : [],
        noCanUseArr : [],
      }
    },
    mounted(){
      // this.getTotalPrice();
      this.youhuiCouponAxios();
      this.youhuiCouponInvalidAxios();
    },
    methods : {
      youhuiCouponInvalidAxios : function() {
        $.post(comLink.yxtHost + '/car/getCouponCount', {
          'openid' : sessionStorage.openid,
          'totalCount' : comLink.totalPrice,
        }, function(resp) {
          this.canUse = resp.data.useCount;
          this.noUse = resp.data.invalidCount;
        });
      },
      //点击确定 调结算接口
      clickJiesuanAxios: function(){
        $.ajax({
          url:comLink.yxtHost + '/car/postOrder',
          data:{
            openid : sessionStorage.openid,
            skuIds : sessionStorage.confirmSkuIds,
            couponId :sessionStorage.couponId,
            numbers : sessionStorage.confirmNumbers,
            period : sessionStorage.confirmPeriod,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){

            }else {

            }
          },
          error:function (data) {

          }
        })
      },
      //选择优惠劵确定
      confirm(couponId){
        if(couponId == 'undefined' || couponId == '') {
          Toast({
            //mintui提示效果
            message: "请选择优惠劵",
            duration: 2000,
          });
        } else {
          sessionStorage.setItem('couponId', couponId);
          sessionStorage.setItem('enoughId', '');
          this.$router.back(-1);
        }
        /*if(this.num === 0){
          for(var i = 0,l = this.canUseArr.length;i < l;i ++){

	          if(!this.canUseArr[i].checked){

		              Toast({
		                //mintui提示效果
		                message: "请选择优惠劵",
		                duration: 2000,
		              });

		          }else{
		              sessionStorage.setItem('couponId',this.canUseArr[i].couponId);
		              this.$router.back(-1);
		              break;
		          }


          }
        }else{
          Toast({
            //mintui提示效果
            message: "抱歉，优惠劵已失效",
            duration: 2000,
          });
        }*/
      },
      chooseCoupon(item){
        if(this.num === 0){
          for(var i = 0,l = this.canUseArr.length;i < l;i ++){
            this.canUseArr[i].checked = false;
            this.canUseArr.splice(100,0)
          }
          item.checked = true;
          this.canUseArr.splice(100,0);
        }else{
          Toast({
            //mintui提示效果
            message: "优惠劵已失效",
            duration: 2000,
          });
        }
      },
      getTotalPrice (){
        // this.totalPrice = comLink.totalPrice;
        // this.youhuiCouponAxios();
      },
      //获取优惠劵接口
      youhuiCouponAxios: function(){
        var vm = this;
        // let hash = window.location.hash;
        // hash = hash.split('=');
        let price = comLink.totalPrice;
        console.log(price);
        $.ajax({
          url:comLink.yxtHost + '/car/selectCoupon',
          data:{
            totalCount : price,//sessionStorage.orderZongjia,
            openid : sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              // vm.couponUsetList = data.data;
              let lists = data.data;
              for(var i = 0,l = lists.length;i < l;i ++){
                if(lists[i].useStatus === 0){
                  vm.canUseArr.push(lists[i]);
                  console.log(vm.canUseArr)
                  vm.canUse = vm.canUseArr.length;
                  if(!vm.canUse){
                    vm.canUse = 0
                  }
                }else{
                  vm.noCanUseArr.push(lists[i])
                  for(var j = 0,jl = vm.noCanUseArr.length;j < jl;j ++){
                    vm.noCanUseArr[i].checked = false;
                  }
                  vm.noUse = vm.noCanUseArr.length;
                  if(vm.noCanUseArr != ''){
                    vm.noUse = vm.noCanUseArr.length;
                  }else{
                    vm.noUse = 0;
                  }
                  console.log(vm.noCanUseArr)
                }
              }
              for(var i = 0,l = vm.canUseArr.length;i < l;i ++){
                vm.canUseArr.checked = false;
              }
              console.log(vm.canUseArr,111111)
              vm.getStartArr();//获取初始数据
            }
          },
          error:function (data) {

          }
        })
      },
      getStartArr(){
        this.couponUsetList = this.canUseArr
      },
      navClick : function (n) {
        this.num = n;
        if(this.num === 0){
          this.couponUsetList = this.canUseArr
        }
        if(this.num === -1){
          // this.useStatus = -1;
          this.couponUsetList = this.noCanUseArr
        }
      },
      headClick : function (i) {
        this.wNum = i
        if(this.wNum === 1){
          this.showSort = !this.showSort
        }

      },
      isShowSort : function (i) {
        this.showSortNum = i
        this.showSort = false
        this.allItem = this.allItems[i].name
      }
    },
    components : {
      couponComponent,
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .getCoupon{
    /*background: #eee;*/

  }
  .mycoupon-content .active{
    background-color: #8cbaff;
  }
  .redBtn{
    background: #ff675f;
  }
  .mycoupon-content{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: p(0);
    background: white;
    overflow-y: auto;

    .top-content{
      width: 100%;
      height: p(90);
      background: #307ff5;
      padding-top: p(10);

      .header-choose{
        width: p(400);
        height: p(70);
        margin: 0 auto ;

        .color-back{
          background: #d6e5fd;
          color: #307ff5;
        }

        .choose-item{
          box-sizing: border-box;
          width: 49%;
          line-height: p(70);
          text-align: center;
          height: 100%;
          border: p(2) solid #d6e5fd;
        }
        .choose-item:nth-child(1){
          border-radius: p(10) 0 0 p(10);
        }
        .choose-item:nth-child(2){
          border-radius:  0 p(10) p(10) 0 ;
        }
      }
    }

    /*筛选-分类-时间-金额*/
    .filter-nav{
      width: 100%;
      height: p(65);
      box-sizing: border-box;
      border-bottom: p(1) solid #eeeeee;

      .w-color.filter-main{
        color: #307ff5;
      }

      .filter-main{
        height: 100%;
        line-height: p(65);
        width: 33.3333%;
        text-align: center;
        color: #cdcdcd;

      }
      .filter-main:nth-child(1){
        box-sizing: border-box;
        border-right: p(1) solid #eeeeee;
      }
    }

    .no-coupon-content{

      .no-coupon-img{
        width: p(250);
        position: absolute;
        top: p(380);
        left: 50%;
        margin-left: p(-125);
      }
    }
    /*全部选项弹出*/
    .allItem{
      width: 33.33%;
      height: p(200);
      top: p(160);
      left: 0;
      z-index: 1;
      text-align: center;
      box-sizing: border-box;
      border-right: p(1) solid #eeeeee;
      border-bottom: p(1) solid #eeeeee;

      .all-item-word{
        margin: p(20) 0;

        .word {
          color: #d3d3d3;
        }
        .c-ba-color,word{
          color: #307ff5;
        }
      }

    }
    /*底部按钮*/
    .my-coupon {
      background: white;
      position: fixed;
      height: p(120);
      width: 100%;
      bottom: 0;
      font-size: p(34);
      text-align: center;

      .word:after {
        content: '';
        background-image: url("./../../../../../static/img/home/coupon/pointer.png");
        background-size: p(54) p(38);
        position: absolute;
        width: p(54);
        height: p(38);
        z-index: 100;
        bottom: p(42);
        margin-left: p(10);
      }
      .word {
        display: inline-block;
        width: p(700);
        height: p(90);
        border-radius: p(20);
        background: #fe842f;
        text-align: center;
        line-height: p(90);
      }
    }
    .detail-main{
      /*position: relative;*/
      .coupon-detail {
        /*position: absolute;*/
        /*overflow-y: auto;*/
        /*top: 0;*/
        /*bottom: p(125);*/
        width: 100%;
        .coupon-main {
          padding: p(0) p(23);
          position: relative;
          .coupon-row {
            width: 100%;
            height: p(230);
            display: inline-block;
            /*padding: p(0) p(23);*/
            background-image: url("./../../../../../static/image/home/coupon/coupon_back.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat;

            .left-main {
                width: p(220);
                text-align: center;

                .money {
                  margin-top: p(45);
                  margin-bottom: p(20);
                  color: #bf0303;
                }
              }

              .right-main {
                padding: p(30) 0 0 p(20);
              }
          }
          .left{
            display: inline-block;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            border: 0.5px solid #ccc;
            position: absolute;
            top: 50%;
            margin-top: -0.5rem;;
            left: p(5);
          }
        }
      }
    }

  }
</style>
