<template>
    <div class="mine-main" style="" v-title data-title="个人中心">
      <div class="top">
        <img class="bg-img" :src=bannerImg alt="">
        <div class="headportrait" @click="login">
          <div class="imgBox">
            <img :src=headLogo>
          </div>
          <div>{{userName}}</div>
          <div>ID：{{userId}}</div>
          <div v-if="memberName != ''"><i class="iconfont icon-wode"></i>{{memberName}}</div>
          <div v-else><i class="iconfont icon-wode"></i>马上登陆</div>
        </div>
        <a class="intercalate" href="javascript:void(0)" @click="toIntercalate"><i class="iconfont icon-shezhi"></i></a>
        <!--<router-link to="/mine/intercalate" class="intercalate"><i class="iconfont icon-shezhi"></i></router-link>-->
      </div>
      <div class="money">
        <ul>
          <li v-for="(data,i) in moneyData" :key="i" @click="toTouterPath(i)">
            <p>{{data.num}}</p>
            <p>{{data.text}}</p>
          </li>
        </ul>
      </div>
      <div class="orderForm">
        <div class="tit clearfix">
          <a class="router f-oh f-fl" href="javascript:void(0)" @click="toOrder">
            <div class="left fl">
              <i class="iconfont icon-form"></i> 商城订单
            </div>
            <div class="fr iconfont icon-more"></div>
          </a>
        </div>
        <div class="content">
          <ul>
              <li v-for="(nav,i) in navLists" :key="i">
                <a href="javascript:void(0)" @click="toMineOrder(i)">
                  <img class="nav-img" :src=nav.greyImg alt="">
                  <p>{{nav.name}}</p>
                <i class="superscript" v-if="nav.number !== 0">{{nav.number}}</i>
                </a>
              </li>
          </ul>
        </div>
      </div>
      <!--我的资产~我的微店 选项-->
      <div class="mineContent fontSize-12">
        <ul>
          <li @click="myAssetLink(index)" v-for="(item,index) in chooseLists" :key="index">
            <div class="imgBox">
              <img :src=item.iconPath alt="">
            </div>
            <div class="feature-lsit-word">{{item.title}}</div>
          </li>
        </ul>
      </div>
      <!--二维码弹窗-->
      <div v-if="isShowQRCode" class="full-screen">
        <div class="image-show-here">
          <div class="img-outside">
            <img class="back-img QRCode-img" :src=QRcodeData alt="">
          </div>
          <!--<p class="back-img-word">品牌合作商</p>-->
         <!-- <div class="img-main"  alt="">
          	<img class="back-img QRCode-img" :src=QRcodeData />
          </div>
          <p class="word fontSize-15">扫二维码，进入店铺</p>-->
          <i class="icon iconfont icon-close" @click="hideQRCode"></i>
        </div>
      </div>
      <div class="black-full-screen" v-if="isShowQRCode" ></div>

      <div class="funtion">
        <div class="tit clearfix" @click="moreGongneng()">
          <div class="left fl">
            <i class="iconfont icon-gongnengguanli" style="color:#F7A10E"></i> 功能
          </div>
          <div class="right fr clearfix">
          <div class="fr iconfont icon-more"></div>
          <span class="fr more">更多</span>
          </div>
        </div>
        <div class="content">
          <ul>
             <!--<li @click="myZengsong()">
               <div class="imgBox">
              <img src="@/../static/image/mine/myZengsong@3x.png" alt="">
            </div>
                <p>我的赠送</p>
              </li>-->
             <li @click="tuiguangRanking()">
               <div class="imgBox">
                 <img src="@/../static/image/mine/tuiguangRanking3x.png" alt="">
               </div>
                <p>推广排行榜</p>
              </li>
             <li @click="tuiguangResault()">
               <div class="imgBox">
              <img src="@/../static/image/mine/tuiguangResault3x.png" alt="">
            </div>
                <p>推广成果</p>
              </li>
             <li @click="duihuanJifen()">
               <div class="imgBox">
                <img src="@/../static/image/mine/jifen3x.png" alt="">
               </div>
                <p>积分兑换专区</p>
             </li>
            <li>
              <div class="imgBox">
                <!--<img src="@/../static/image/mine/myZengsong@3x.png" alt="">-->
              </div>
              <p></p>
            </li>
          </ul>
        </div>
      </div>
      <beian></beian>
      
      <div class="zhicheng" style="height:6.5rem;"></div>
    </div>
</template>

<script>
//import axios from 'axios'
  import comLink from "./../../common/common_link"; //导入总线
	import '../../common/jq.min';
  import $ from "jquery"; //导入jquery
//import '../../common/jquery.qrcode.min';
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import beian from "@/subcomponents/beian.vue";
  
export default {
  data() {
    return {
      chooseIndex : 0,
      moneyDataNum : 0,
      moneyData: [
        { text: "零钱（元）", num: 0,routerPath : '/mine/myMoneyRouter' },
        { text: "积分", num: 0 ,routerPath : '/mine/scoreRecordRouter'},
        { text: "消费总额（元）", num: 0,routerPath : '/mine/buyDetailRouter' }
      ],
      isShowQRCode : false,
      popBackImg : '@/../static/image/home/brand_store/QRcode_back.png',
      chooseLists : [
        {
          iconPath :'@/../static/image/mine/myZichan3x.png',
          title : '我的资产',
          key: 'money',
          routerPath : '/mine/myAsset'
        },
        {
          iconPath :'@/../static/image/mine/myRight3x.png',
          title : '我的特权',
          key : 'vip',
          routerPath : '/mine/vipRightRouter'
        },
        {
          iconPath :'@/../static/image/mine/myTeam3x.png',
          title : '我的团队',
          key: 'team',
          routerPath : '/mine/myTeamRouter'
        },
        {
          iconPath :'@/../static/image/mine/leijishouyi3x.png',
          title : '累计收益',
          key: 'allGain',
          routerPath : '/mine/incomeRouter'
        },
        {
          iconPath :'@/../static/image/mine/yhq.png',
          title : '我的优惠劵',
          key: 'coupon',
          routerPath : '/indus/mycoupon'
        },
        {
          iconPath :'@/../static/image/mine/QRCode3x.png',
          title : '二维码',
          key: 'QRcode',
          routerPath : ''
        },
        {
          iconPath :'@/../static/image/mine/shouhuoAddress3x.png',
          title : '收货地址',
          key: 'address',
          routerPath : '/home/payAddressRouter'
        },
        {
          iconPath :'@/../static/image/mine/qiandaoCenter3x.png',
          title : '签到中心',
          key: 'signCenter',
          routerPath : '/mine/signCenterRouter'
        },
        {
          iconPath :'@/../static/image/mine/myCollect3x.png',
          title : '我的收藏',
          key: 'myCollect',
          routerPath : '/mine/myAsset/mycollectRouter'
        },
        {
          iconPath :'@/../static/image/mine/myTuiguang3x.png',
          title : '我的推广',
          key: 'expand',
          routerPath : '/mine/myPromptRouter'
        },
        {
          iconPath :'@/../static/image/mine/myWeiStore3x.png',
          title : '我的微店',
          key: 'myWeiStore',
          routerPath : '/mine/myWeStoreRouter'
        },
      ],
      navLists : [

      ],
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
      QRCode : '',//获取二维码地址
      headLogo : '',//会员头像
      userName : '',//会员姓名
      memberName : '',//会员姓名
      user : {},//user 数据
      userWx : {},//userWx数据
      bannerImg : "@/../static/image/mine/mineBg.png" ,
      userId : null,//用户id userId
      openId : null,
      orderNumberObj : {},//订单状态数量
      QRcodeData : null,
    }
  },
  created() {},
  components: {
      beian
    },
  methods: {
    toMineOrder(i) {
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }
      this.$router.push({
        path : '/mine/myAsset/orderRouter',
        query : {
          'index' : i
        }
//				name:'orderRouter',
//		params: {
//	        'index' : i
//	      }
      })
    },
    toOrder() {
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }
      this.$router.push({
        path : '/mine/myAsset/orderRouter',
      })
    },
    toIntercalate() {
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }
      this.$router.push({
        path : '/mine/intercalate',
      })
    },
    //点击头像登录
    login (){
      if(sessionStorage.openid != null && sessionStorage.openid != undefined && sessionStorage.openid != 'undefined' && sessionStorage.openid != 'null' && sessionStorage.openid != '') {
        return;
      }
      if(!sessionStorage.openid) {
        this.$router.push({
          path : '/mine/denglu',
        })
      } else {
        // Toast({
        //   message: '您已登录',
        //   duration: 2000
        // });

        this.$router.push({//未登录才跳转路由 调试暂时允许跳转
          path : '/mine/denglu',
        })
      }
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
                if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
                  vm.daohangLists[i].number = 0;
                } else {
                  vm.daohangLists[i].number = vm.orderNumberObj.preparePay;
                }
              }else if(vm.daohangLists[i].status === 2){
                if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
                  vm.daohangLists[i].number = 0;
                } else {
                  vm.daohangLists[i].number = vm.orderNumberObj.prepareTransport;
                }
              }else if(vm.daohangLists[i].status === 3){
                if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
                  vm.daohangLists[i].number = 0;
                } else {
                  vm.daohangLists[i].number = vm.orderNumberObj.prepareCollect;
                }
              }else if(vm.daohangLists[i].status === 4){
                if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
                  vm.daohangLists[i].number = 0;
                } else {
                  vm.daohangLists[i].number = vm.orderNumberObj.prepareEvaluate;
                }
              }else if(vm.daohangLists[i].status === 5){
                if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
                  vm.daohangLists[i].number = 0;
                } else {
                  vm.daohangLists[i].number = vm.orderNumberObj.saled;
                }
              }
              vm.navLists = vm.daohangLists
            }
          }
        },
        error: function (data) {

        }
      })
    },
    //获取个人信息
    getManInfos(){
      var _vm = this;
      $.ajax({
        url: comLink.yxtHost + '/user/getInformation',
        data: {
          openid: sessionStorage.openid,
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
          if (data.code == 1) {
//          console.log(data.data.user,'aaaaa')
            _vm.moneyData[0].num = data.data.user.balance;
            _vm.moneyData[1].num = data.data.user.integral;
            _vm.moneyData[2].num = data.data.user.consumptionSum;
            let userId = data.data.user.id;//userId
            _vm.userId = userId;
            let headLogo = data.data.userWx.headLogo;//头像
            _vm.headLogo = headLogo
            let name = data.data.user.name;//姓名
            let memberName = data.data.user.memberName;//姓名

            _vm.userName = name;
            _vm.memberName = memberName;
            let sex = data.data.user.sex;
            let nickName = data.data.userWx.nickName;//昵称
            let qrCode = data.data.userWx.qrCode;//用户二维码
            // sessionStorage.setItem('userId',userId);
            // sessionStorage.setItem('name',name);
            // sessionStorage.setItem('headLogo',headLogo);
            // sessionStorage.setItem('sex',sex);
            // sessionStorage.setItem('nickName',nickName);
            // sessionStorage.setItem('qrCode',qrCode);
          } else {
            sessionStorage.clear();
          }
        },
        error: function (data) {

        }
      })
    },
    //二维码
    myAssetLink(index){
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }

      this.chooseIndex = index//获取点击选项对应下标
      this.$router.push({
        // path:"/mine/myAsset"
        path: this.chooseLists[this.chooseIndex].routerPath
      });
      if(this.chooseLists[this.chooseIndex].key === 'QRcode'){
        this.isShowQRCode = true//1111
        this.QRCodeAxios();
        /*var vm = this;
        setTimeout(function(){
          var qWidth = $('.img-main').width();
          var qHeight = $('.img-main').height();
          jQuery('.img-main').qrcode({
            render: "canvas", //也可以替换为table
            width: qWidth,
            height: qHeight,
            /!*text: vm.QRcodeData*!/
          });
        })*/
      }
    },
    //获取二维码
    QRCodeAxios: function(){
      $.post(comLink.yxtHost + '/store/processQrCode', {
        "openid":sessionStorage.openid
      }, function(resp) {
        if (resp.code == 1) {
          this.QRcodeData = comLink.yxtImgHost+resp.data;//收货地址首页数据
//        console.log(this.QRcodeData);
          $('.QRCode-img').attr('src' ,this.QRcodeData);
        }
      });
    },
    hideQRCode (){
      this.isShowQRCode = false
    },
    toTouterPath(i) {
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }
      this.moneyDataNum = i
      this.$router.push({
        path: this.moneyData[this.moneyDataNum].routerPath
      });
    },
    moreGongneng(){
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }

      this.$router.push({
        path : '/mine/moreGongneng'
      })
    },
    myZengsong(){//to 我的赠送
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }
      this.$router.push({
        path : '/mine/myZengsong'
      })
    },
    tuiguangRanking(){
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }
      this.$router.push({
        path : '/mine/tuiguangRanking'
      })
    },
    tuiguangResault(){
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }
      this.$router.push({
        path : '/mine/tuiguangResault',
      })
    },
    duihuanJifen(){
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
        Toast({
          message: '请先登陆',
          duration: 2000
        });
        return;
      }
      this.$router.push({
        path : '/exchangePoint'
      })
    },
  },
  mounted(){
    this.getManInfos();
    $(window).scrollTop(0)
    this.orderNumberAxios();//获取订单状态数量
    	$.ajax({
	        url: comLink.yxtHost + '/user/sign',
	        data: {
	          'url': window.location.href,
	        },

	        dataType: 'json',
	        type: 'post',
	        success: function (data) {
	          if(data.code==1){
	          	 wx.config({
		            debug: false,
		            appId: data.data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
		            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
		            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
		            signature: data.data.signature, // 必填，签名
		            jsApiList: [
		              'hideMenuItems',
		            ]
			        });
			        wx.ready(function() {
			        	  wx.hideMenuItems({
                    menuList: ['menuItem:copyUrl'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                    success:function(res){
                        //alert("隐藏");
                    }
                	});
			        })
	          }

	        },
	        error: function (data) {

	        }
	    })
  },
};
</script>
<style>

</style>
<style lang="scss" scoped>
@import "@/../src/sass/public.scss"; //导入scss初始文件
.QRCode-img{
	width: 100%;
	height: 100%;
}
.mine-main {
  width: 100%;
  height: 100%;
  .top {
    height: 23rem;
    /*<!--background: url("./../../../static/image/mine/mineBg.png") center/cover;-->*/
    // background: skyblue;
    position: relative;
    .bg-img{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 23rem;
      width: 100%;
    }
    .headportrait {
      position: absolute;
      text-align: center;
      @include jz();
      top: 58%;
      .imgBox {
        margin: 0 auto;
        width: 9.0625rem;
        height: 9.0625rem;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      > div {
        font-size: 1.4375rem;
        line-height: 2.5rem;
      }
      > div:nth-child(2) {
        color: white;
      }
      > div:nth-child(3) {
        color: #b8d0fe;
      }
      > div:nth-child(4) {
        color: white;
        i {
          padding-right: 0.5rem;
        }
      }
    }
    .intercalate {
      position: absolute;
      padding: 1.5rem;
      right: 0rem;
      top: 0rem;
      i:before {
        font-size: 3rem;
        color: white;
      }
    }
  }
  .money {
    background: white;
    > ul {
      display: flex;
      justify-content: space-around;
      padding: 1.875rem 0;
      > li {
        width: 33.3%;
        box-sizing: border-box;
        border-left: 1px solid $borderColor;
        text-align: center;
        font-size: 1.625rem;
        p {
          line-height: 2rem;
          color: black;
        }
        p:nth-child(1) {
          color: #327ff3;
        }
      }
      > li:nth-child(1) {
        border-left: 0 solid #000;
      }
    }
  }
  .orderForm {
    background: white;
    margin: 1.25rem 0;
    .tit {
      height: 5.4375rem;
      line-height: 5.4375rem;
      padding: 0 1.5rem;
      border-bottom: 1px solid $borderColor;
      .left {
        font-size: 1.625rem;
        position: relative;
        padding-left: 3rem;
        color: #333333;
        i {
          position: absolute;
          left: 0;
          top: 0.1rem;
          color: #4da4ff;
        }
      }
      .right {
        .fr {
          color: $fontGray2;
          font-size: 2rem;
        }
        .more {
          font-size: 1.5rem;
        }
      }
      .router{
        width: 100%;
      }
    }
    .content {
      > ul {
        display: flex;
        justify-content: space-around;
        > li {
          height: 8.125rem;
          text-align: center;
          width: 20%;
          font-size: 1.25rem;
          padding-top: 1.5rem;
          position: relative;
          i {
            font-size: 3rem;
          }
          p {
            line-height: 3rem;
            font-size: 1.5rem;
          }
          .superscript {
            font-size: 1rem;
            position: absolute;
            right: 2.2rem;
            top: 0.8rem;
            background: #ff5d74;
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            color: white;
            border-radius: 50%;
          }
          img{
            width: p(40);
          }
        }
      }
    }
  }
  .mineContent {
    background: white;
    > ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      > li {
        border-right: 1px solid $borderColor;
        border-bottom: 1px solid $borderColor;
        width: 25%;
        height: 10.3125rem;
        box-sizing: border-box;
        text-align: center;
        .imgBox {
          margin: 0 auto;
          width: 6.25rem;
          height: 6.25rem;
          position: relative;
          img {
            position: absolute;
            @include jz();
            width: 3.125rem;
            height: 3rem;
          }
        }
        > div:nth-child(2),.feature-lsit-word {
          font-size: 1.4375rem;
          color: #000;
          line-height: 2rem;
        }
      }
      >li .router{
        display: inline-block;
        width: 100%;
        height: 100%;
        .imgBox {
          margin: 0 auto;
          width: 6.25rem;
          height: 6.25rem;
          position: relative;
          img {
            position: absolute;
            @include jz();
            width: 3.125rem;
            height: 3rem;
          }
        }
      }
      > li:nth-child(4n) {
        border-right: 0px solid #000;
      }
    }
  }
  .funtion {
    background: white;
    margin: 1.25rem 0 0 0;
    .tit {
      height: 5.4375rem;
      line-height: 5.4375rem;
      padding: 0 1.5rem;
      border-bottom: 1px solid $borderColor;
      .left {
        font-size: 1.625rem;
        position: relative;
        padding-left: 3rem;
        color: #333333;
        i {
          position: absolute;
          left: 0;
          top: 0.1rem;
          color: #4da4ff;
        }
      }
      .right {
        .fr {
          color: $fontGray2;
          font-size: 2rem;
        }
        .more {
          font-size: 1.5rem;
        }
      }
    }
    .content {
      > ul {
        display: flex;
        justify-content: space-around;
        > li {
          height: 10.3125rem;
          text-align: center;
          width: 20%;
          font-size: 1.25rem;
          position: relative;
          .imgBox {
            margin: 0 auto;
            width: 6.25rem;
            height: 6.25rem;
            position: relative;
            img {
              position: absolute;
              @include jz();
              width: 3.125rem;
              height: 3rem;
            }
          }
          p {
            line-height: 3rem;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
  /*二维码弹出*/
  .full-screen{
    position: fixed;
    /*background: black;*/
    /*opacity: 0.5;*/
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 99;

    .image-show-here{
      position: fixed;
      top: p(120);
      left: p(50);
      right: p(50);
      height: p(880);
      background: white;
      opacity: 1;
      z-index: 99;
      text-align: center;
      border-radius: 2rem;

      .img-main{
        display: inline-block;
        width: p(300);
        height: p(300);
        background: #ccc;
        margin-top: p(70);
        border-radius: 2rem;
      }

      .img-outside{
        width: 100%;
        .back-img{
          display: inline-block;
          height: 100%;
        }
      }


      .word{
        margin-top: p(45);
      }

      .back-img-word{
        color: #307ff5;
        font-size: p(44.8);
        position: absolute;
        top: p(117);
        left: 50%;
        margin-left: p(-108);
      }
    }
    .icon-close{
      margin-top: p(20);
      font-size: p(65);
      width: p(65);
      height: p(65);
      color: white;
      font-weight: bold;
    }
  }
  .black-full-screen{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: black;
    opacity: 0.5;
    z-index: 98;
  }
}
</style>

