<template>
  <div class="mycoupon-content"  v-title data-title="我的优惠券">
    <div class="top-content">
      <div class="header-choose fontSize-15 w-color f-oh" style=" width: 38rem;
    height: 4.6rem;
    margin: 0 auto;
    text-align: center;">
    		<div style="display: inline-block; width: 79%;">
        <dt style="box-sizing: border-box;
          width: p(160)!important;
          max-width: p(200);
          line-height: p(70);
          text-align: center;
          height: 100%;
          border: p(2) solid #d6e5fd;" class="choose-item f-fl" @click="navClick(0)" :class="{ 'color-back' : num === 0}">可用(&nbsp;{{ canUse }}&nbsp;)</dt>
        <dt style="box-sizing: border-box;
        	border-radius: 0;
          width: p(160)!important;
          max-width: p(200);
          line-height: p(70);
          text-align: center;
          height: 100%;
          border: p(2) solid #d6e5fd;" class="choose-item f-fl" @click="navClick(-1)" :class="{ 'color-back' : num === -1}">失效(&nbsp;{{ noUse }}&nbsp;)</dt>
        <dt style="box-sizing: border-box;
          width: p(160)!important;
          max-width: p(200);
          line-height: p(70);
          text-align: center;
          height: 100%;
          border: p(2) solid #d6e5fd;"class="choose-item f-fl" @click="navClick(1)" :class="{ 'color-back' : num === 1}">已用(&nbsp;{{ used }}&nbsp;)</dt>
      </div>
    	</div>
    </div>
    <div class="filter-nav fontSize-13 f-oh">
      <dt class="filter-main f-fl f-pr" @click="headClick(0)" :class="{ 'w-color' : wNum === 0}">
      	<span>{{allItem}}</span>
        <i class="narrow icon iconfont icon-sanjiaoxing-down" v-if="updownNum === 0"></i>
        <i class="narrow icon iconfont icon-sanjiaoxing-up" v-else></i>
      </dt>
      <dt class="filter-main f-fl" @click="headClick(1)" :class="{ 'w-color' : wNum === 1}">
      	<span>领取时间</span>
        <!--<div class="getTime">-->
          <!--<p></p>-->
        <!--</div>-->

        	 <i class="narrow icon iconfont icon-sanjiaoxing-down" v-if="updownNum === 1"></i>
        	 <i class="narrow icon iconfont icon-sanjiaoxing-up" v-else></i>


      </dt>
      <dt class="filter-main f-fl" @click="headClick(2)" :class="{ 'w-color' : wNum === 2}">
      	<span>领取金额</span>
        <!--<div class="getMoney"></div>-->
        <i class="narrow icon iconfont icon-sanjiaoxing-down" v-if="updownNum === 2"></i>
        <i class="narrow icon iconfont icon-sanjiaoxing-up" v-else></i>
      </dt>
    </div>

    <!--全部分类弹出-->
    <div class="allItem fontSize-12 b-white f-abs" v-if="showSort">
        <div class="all-item-word" v-for="(item,i) in allItems"
           :key="i"
        >
          <p class="word" @click="isShowSort(item,i)" :class="{ 'c-ba-color' : i === showSortNum}">{{item.title}}</p>
        </div>
    </div>

    <div v-if="hasCoupon" class="detail-main">
      <div class="coupon-detail">
        <ul class="coupon-main">
          <li class="coupon-row m-top10 f-oh f-pr" v-for="(item,i) in couponUsetList" :key="i" v-if="useStatus == 0">
            <div class="left-main f-fl w-color dis-inblo">
              <p class="money">￥<span style="font-size: 4.625rem;font-family: '叶根友毛笔行书2.0版';">{{ item.reduceMoney }}</span></p>
              <p class="fontSize-14" style="color: #333; padding-left: 0.5rem; font-weight: 500;">{{item.couponName}}</p>
            </div>
            <div class="right-main f-fl dis-inblo">
              <p style="font-size: 2.25rem ;color:#d20404;" class="ellipsis">{{ item.couponName }}</p>
              <!--<p class="shipping fontSize-12 m-top10">不含邮费</p>-->
              <p class="limit fontSize-12 m-top15">{{item.remark}}</p>
              <p class="time fontSize-11 m-top15">有效期截止：{{ item.endTime }}</p>
            </div>
            <div class="get-coupon fontSize-16 w-color f-fr getCoupon" v-if="useStatus == 0">
              <router-link to="/" v-if="item.btn = '立即使用'">
                <p>{{item.btn}}</p>
              </router-link>
            </div>
            <div class="get-coupon fontSize-16 w-color f-fr getCoupon" v-else-if="useStatus == 1" style="margin-top: 2.6rem">
                <p>{{item.btn}}</p>
            </div>
            <div class="get-coupon fontSize-16 w-color f-fr getCoupon" v-else-if="useStatus == -1" style="margin-top: 2.6rem">
              <p>{{item.btn}}</p>
            </div>
          </li>
          <li class="coupon-row m-top10 f-oh f-pr" v-for="(item,i) in couponUsetList" :key="i" v-if="useStatus == 1 || useStatus == -1" style="opacity: 0.5">
            <div class="left-main f-fl w-color dis-inblo">
              <p class="money">￥<span style="font-size: 4.625rem;font-family: '叶根友毛笔行书2.0版';">{{ item.reduceMoney }}</span></p>
              <p class="fontSize-14" style="color: #333; padding-left: 0.5rem; font-weight: 500;">{{item.couponName}}</p>
            </div>
            <div class="right-main f-fl dis-inblo">
              <p style="font-size: 2.25rem ;color:#d20404;" class="ellipsis">{{ item.couponName }}</p>
              <!--<p class="shipping fontSize-12 m-top10">不含邮费</p>-->
              <p class="limit fontSize-12 m-top15">{{item.remark}}</p>
              <p class="time fontSize-11 m-top15">有效期截止：{{ item.endTime }}</p>
            </div>
            <div class="get-coupon fontSize-16 w-color f-fr getCoupon" v-if="useStatus == 0">
              <router-link to="/" v-if="item.btn = '立即使用'">
                <p>{{item.btn}}</p>
              </router-link>
            </div>
            <div class="get-coupon fontSize-16 w-color f-fr getCoupon" v-else-if="useStatus == 1" style="margin-top: 2.6rem">
              <p>{{item.btn}}</p>
            </div>
            <div class="get-coupon fontSize-16 w-color f-fr getCoupon" v-else-if="useStatus == -1" style="margin-top: 2.6rem">
              <p>{{item.btn}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!--<coupon-component :couponLists = 'couponLists' ></coupon-component>-->
    </div>

    <div class="no-coupon-content" v-if="!hasCoupon">
      <img class="no-coupon-img" src="./../../../../static/img/home/coupon/nocoupon.png" alt="">
    </div>
    <!--前往商城领劵中心-->
    <div class="my-coupon f-pr ">
      <router-link class= "router" to="/home/couponRouter">
        <p class="word dis-inblo w-color">前往商城领劵中心</p>
      </router-link>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  import couponComponent from "./../../../subcomponents/coupon-component.vue";
  export default {
    data (){
      return{
        updownNum : 0,
        allItem : '全部类型',
        num : 0,
        wNum : 0,
        canUse : 0,
        noUse : 0,
        used : 0,
        hasCoupon : true,
        showSort : false,
        showSortNum: -1,
        orderByTimeDESC : '',//1:升序 null:降序
        orderByMoneyDESC : '',//1:升序 null:降序
        sordDir : '',
        selectSort : true,
        allItems : [],
        couponUsetList : [],
        useStatus : 0,//（0未使用 1已使用 -1过期）
        type : null,
      }
    },
    mounted(){
        this.youhuiCouponAxios();
        this.getCouponTypeList();
        // this.getCouponCount();
    },
    methods : {
      //从
      getCouponTypeList : function() {
        var vm = this;
        $.post(comLink.yxtHost + '/access/couponType', {}, function(resp) {
          vm.allItems = resp.data;
        });
      },
     /* getCouponCount : function() {
        var vm = this;
        $.post(comLink.yxtHost + '/access/getCouponCount', {
          'openid' : sessionStorage.openid
        }, function(resp) {
          if(resp.code == 1) {
            console.log(resp.data,111);
            vm.canUse = resp.data.useCount;
            vm.noUse = resp.data.invalidCount;
            vm.used = resp.data.usedCount;
          }
        });
      },*/
      youhuiCouponAxios: function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/access/coupon',
          data:{
            'openid':sessionStorage.openid,
            'status' : vm.useStatus,
            'type': vm.type,
            'orderByMoneyDESC' : vm.orderByMoneyDESC,
            'orderByTimeDESC' : vm.orderByTimeDESC,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.couponUsetList = data.data.couponUsetList;
              console.log('优惠劵列表',vm.couponUsetList)
              for(var i = 0,l=vm.couponUsetList.length;i<l;i++){
                if(vm.couponUsetList[i].useStatus == 0){
                  vm.couponUsetList[i].btn = '去使用'
                }else if(vm.couponUsetList[i].useStatus == 1){
                  vm.couponUsetList[i].btn = '已使用'
                }else if(vm.couponUsetList[i].useStatus == -1) {
                  vm.couponUsetList[i].btn = '已过期'
                }
              }
              vm.canUse = data.data.usable;
              vm.noUse = data.data.excessive;
              vm.used = data.data.easilyUse;
              console.log(vm.couponUsetList)
            }
          },
          error:function (data) {

          }
        })
      },
      navClick : function (n) {
        this.num = n;
        if(this.num === 0){
          this.useStatus = 0;
          this.youhuiCouponAxios();
        }
        if(this.num === -1){
          this.useStatus = -1;
          this.youhuiCouponAxios();
        }
        if(this.num === 1){
          this.useStatus = 1;
          this.youhuiCouponAxios();
        }

      },
      headClick : function (n) {
        this.wNum = n;
        if(this.wNum === 0){
          this.showSort = !this.showSort
        }else if(this.showSort){
          this.showSort = false;
        }
        console.log(this.updownNum,this.wNum)
        if(this.updownNum === this.wNum && this.wNum === n){
          // alert('aaaa')
          this.updownNum = -1;
        }else{
          this.updownNum = n
        }
        if(this.wNum == 1) {
          if(this.updownNum == this.wNum) {
            this.orderByTimeDESC = 1;
          } else {
            this.orderByTimeDESC = 0;
          }
          this.orderByMoneyDESC = '';
        } else if(this.wNum == 2) {
          if(this.updownNum == this.wNum) {
            this.orderByMoneyDESC = 1;
          } else {
            this.orderByMoneyDESC = 0;
          }
        }
        this.youhuiCouponAxios();
      },
      isShowSort : function (item,i) {
        // alert(item.id)
        // this.showSortNum = i;
        this.showSort = false;
        this.allItem = item.title;
        this.type = item.id;
        this.youhuiCouponAxios();
      }
    },
    components : {
      couponComponent,
    }
  }
</script>
<style lang="scss">
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .getCoupon{
    /*background: #eee;*/

  }
  .redBtn{
    background: #ff675f;
  }
  .mycoupon-content {
    top: 0;
    left: 0;
    right: 0;
    bottom: p(120);
    background: white;
    overflow-y: auto;

    .top-content{
      width: 100%;
      height: p(90);
      background: #307ff5;
      padding-top: p(10);

      .header-choose{
        width: p(480);
        height: p(70);
        margin: 0 auto ;

        .color-back{
          background: #d6e5fd;
          color: #307ff5;
        }

        .choose-item{
          box-sizing: border-box;
          width: p(160);
          max-width: p(200);
          line-height: p(70);
          text-align: center;
          height: 100%;
          border: p(2) solid #d6e5fd;
        }
        .choose-item:nth-child(2){
          border-left: none;
          border-right: none;
        }
        .choose-item:nth-child(1){
          border-radius: p(10) 0 0 p(10);
        }
        .choose-item:nth-child(3){
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
        line-height: p(55);
        width: 33.3333%;
        text-align: center;
        color: #cdcdcd;
				>span{
					display: inline-block;
				}
      }
      .filter-main:nth-child(1){
        box-sizing: border-box;
      }
      .narrow{
      	display: inline-block;
      	height: 2.5rem;
      	line-height: 2.5rem;
      	font-size: 1.9rem;
      	/*padding-top: 1rem;*/
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
          color: gray;
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
        background-image: url("./../../../../static/img/home/coupon/pointer.png");
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
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        /*top: 0;*/
        /*bottom: p(125);*/
        width: 100%;
        .coupon-main {
          padding: p(0) p(23);
          padding-bottom: 9rem;

          .coupon-row {
            width: 100%;
            height: p(230);
            /*padding: p(0) p(23);*/
            background-image: url("./../../../../static/image/home/coupon/coupon_back.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat;

            .left-main {
              width: p(230);
              text-align: center;

              .money {
              	color: #bf0303;
                margin-top: p(45);
                margin-bottom: p(20);
              }
            }

            .right-main {
              padding: p(40) 0 0 p(20);
              .ellipsis{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                max-width: p(320);
                color: #fc842e;
              }
            }

            .get-coupon {
              margin: p(25) p(25) 0 0;
		          color: #bf0303;
		          width: p(50);
		          height: 100%;
		          line-height: p(45);
		          text-align: center;
		          color: white;
		          p{
		          	color: #bf0303;
		          	text-align: center;
		          	font-weight: 550;
		          }
              .router-link-active {
                color: white;
              }
            }
          }
        }
      }
    }

  }
</style>
