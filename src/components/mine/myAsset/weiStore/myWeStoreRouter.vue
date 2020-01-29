<template>
  <div class="brand-store-home"  v-title data-title="我的微店">
    <scroller height="-1" lock-x @on-scroll-bottom="getCollectListsAxios" >
      <div class="weStore-main">
        <div class="search-main f-oh">
          <!--搜索框-->
          <i class="icon iconfont icon-wode1 w-color f-fl" @click="toMine"></i>
          <div class="search-inp-main f-oh f-fl">
            <i class="icon iconfont icon-search f-fl"></i>
            <input class="head-search f-fl" v-model="keyword" type="text" placeholder="搜索">
          </div>
          <dt class="sousuo-btn f-fl" @click="proListsAxios"><span class="sousuo-word">搜索</span></dt>

        </div>
        <!--banner-->
        <div class="banner-main f-pr" v-if="storeInfos.background">
          <img class="banner-pic" :src=storeInfos.background alt="">
          <i class="icon iconfont icon-edit" @click="changeImg"></i>
        </div>
				<div class="banner-main f-pr" v-else>
          <img class="banner-pic" :src=bannerImg alt="">
          <i class="icon iconfont icon-edit" @click="changeImg"></i>
        </div>
        <!--<div class="warranty-main b-white f-oh">
          <ul class="f-fr warranty-ul f-oh">
            <li class="warranty-row f-fl f-oh" v-for="(item,i) in warrantyMain" :key="i">
            	<div>
            		<img class="img-pic f-fl" :src=item.imgSrc alt="">
              	<p class="word fontSize-10 f-fl">{{ item.word }}</p>
            	</div>

            </li>
          </ul>
        </div>-->

        <!--店铺开始-->
        <div class="store-profile fontSize-10 b-white f-oh">
          <div class="head-profile f-fl f-oh">
            <img class="head-img" :src=storeInfos.logo alt="">
            <p class="store-name fontSize-16 ">{{storeInfos.name}}</p>
          </div>
          <div class="store-right-content f-fr f-oh">
            <div class="store-right store-code f-fl" @click = 'showQRCode'>
              <i class="icon iconfont icon-erweima fontSize-18"></i>
              <p class="word">店铺二维码</p>
            </div>
            <div class="store-right fans-num f-fl m-left15">
              <p class="fans">{{ storeInfos.fans }}</p>
              <p class="word">粉丝数</p>
            </div>
            <div class="store-right collect-store f-fl m-left15" @click="toPhone()">
              <i class="icon iconfont icon-dianhua-xianxingyuankuang fontSize-18"></i>
              <p class="word">电话</p>
            </div>
          </div>
        </div>
        <!--QRCode show here-->
        <div v-if="isShowQRCode" class="full-screen">
          <div class="image-show-here">
            <!--<p class="back-img-word">品牌合作商</p>-->
            <img class="img-main" :src=qrimg alt="">
           <!-- <p class="word fontSize-15">扫二维码，进入店铺</p>-->
            <i class="icon iconfont icon-close" @click="hideQRCode"></i>
          </div>
        </div>
        <div class="black-full-screen" v-if="isShowQRCode" ></div>
        <!--店铺产品类别-->
        <div class="prolist-content b-white fontSize-10">
          <div class="prolist-head">
            <ul class="prolist-head-main f-oh">
              <li class="prolist-head-row f-fl" v-for="(item,i) in navlists" :key="i"
                  @click="toShoppingCart(item)"
              >
                <div class="li-inner" :class="{ activeWeiStore : i === navIndex }" @click="navFunc(i)">
                  <img class="img-pic" :src = item.blueImg alt="" v-if="i === navIndex">
                  <img class="img-pic" :src=item.greyImg alt="" v-else>
                  <p class="word"> {{ item.name }} </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--点击菜单按钮弹窗-->
        <div class="showPop-content" v-if="isShowPop">
          <div class="item-list-content">
            <ul class="item-list-main fontSize-14">
              <li class="item-row f-oh" v-for="(item,i) in itemChoooseLists" :key="i">
                <p class="f-fl">{{item.name}}</p>
                <i class="icon iconfont icon-more f-fr"></i>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="isShowBlackCover" class="black-cover" @click="hidePopup"></div>
        <div class="pro-lists p-top10 b-white ">
          <pripro-component :proDetailData = 'proDetailData'></pripro-component>
          <p class="pointer fontSize-14" v-if="isAllgoods">----- 向下滚动加载更多 -----</p>
      	  <p class="pointer fontSize-14" v-else>----- 已全部加载完毕 -----</p>
        </div>
      </div>
    </scroller>
    <!--显示搜索店铺-->
    <div class="bottom-btns b-white fontSize-17" v-if="showWeStore">
      <div class="btn-row" @click="toWeiStore">
        <i class="icon iconfont icon-edit"></i>
        <span>编辑微店</span>
      </div>
      <div class="btn-row" @click="shujuTongji()">
        <i class="icon iconfont icon-edit"></i>
        <span>数据统计</span>
      </div>
    </div>
    <div class="shujutongjiPop" v-if="isShowTongji">
      <span class="warn-title fontSize-18">提示</span>
      <span class="warn-word fontSize-14">建设中，请耐心等待...</span>
      <span class="confirm fontSize-15 w-color" @click="hidePopup()">知道了</span>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  import { Scroller } from 'vux'
  // import '../../common/jq.min';
  // import '../../common/jquery.qrcode.min';
  import priproComponent from "../../../../subcomponents/pripro-component.vue";
  export default {
    data (){
      return{
      	isAllgoods:true,
      	phoneNumber:'110',
        keyword : '',
      	qrimg:'',
        fansNum : 12000,
        isShowPop: false,
        isShowBlackCover : false,
        showWeStore : true,
        isShowQRCode : false,
        isShowTongji : false,
        bannerImg : '@/../static/img/home/brand_store/banner.jpg',
        popBackImg : '@/../static/image/home/brand_store/QRcode_back.png',
        warrantyMain : [
          {
            word : '正品保障',
            imgSrc : "@/../static/image/home/_01.png"
          },
          {
            word : '正规发票',
            imgSrc : "@/../static/image/home/_02.png"
          },
          {
            word : '全国联保',
            imgSrc : "@/../static/image/home/_03.png"
          },
          {
            word : '12期免息',
            imgSrc : "@/../static/image/home/_04.png"
          }
        ],
        navlists : [
          {
            blueImg : '@/../static/image/home/brand_store/store3b.png',
            greyImg : '@/../static/image/home/brand_store/store3g.png',
            name : '全部'
          },
          {
            blueImg : '@/../static/image/home/brand_store/pro3b.png',
            greyImg : '@/../static/image/home/brand_store/pro3g.png',
            name : '推荐'
          },
          {
            blueImg : '@/../static/image/home/cart_01.png',
            greyImg : '@/../static/image/home/cart_01.png',
            name : '购物车'
          },
          {
            blueImg : '@/../static/image/home/mine_01.png',
            greyImg : '@/../static/image/home/mine_01.png',
            name : '个人中心'
          },
        ],
        navIndex : 0,
        proDetailData:[],//商品列表
        itemChoooseLists : [
          {
            name : '全部商品',
            routerPath : ''
          },
          {
            name : '智能生活',
            routerPath : ''
          },
          {
            name : '智能家电',
            routerPath : ''
          },
          {
            name : '智能手机',
            routerPath : ''
          },
          {
            name : '笔记本电脑',
            routerPath : ''
          },
          {
            name : '智能配件',
            routerPath : ''
          },
        ],
        storeInfos : {},//微店数据
        isRecommend : '',
        searchWord : '',
        pageNum : 1,
        user : {},//user 数据
        userWx : {},//userWx数据
        vipHeadProfile: '',//头像
        userId : '',//用户id userId
        openId : '',
        userName : '',
        isRequest : true,
        weiStoreProInfos : {//上传参数请求微店商品
          isRecommend : '',//是否为推荐
          pageNum : 1,
          productName : '',
          status : '',
          storeId : '',
        },
        storeId : '',
        shareUrl:'',
      }
    },
    mounted(){
      var openid = sessionStorage.openid;
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
        openid = this.GetQueryString('openid');
        if(openid != null && openid != 'null' && openid != undefined && openid != 'undefined' && openid != ''){
          sessionStorage.setItem('openid', openid);
          this.getManInfos();//获取个人信息
        }
      }

      this.weiStoreAxios();
      // this.isDenglu();
      var vm = this
      let hash = window.location.hash;
      hash = hash.split('=');
      let storeId = hash[1];//从地址栏获取微店id
      $.ajax({
          url:comLink.yxtHost + '/store/getStore',
          data:{
            "openid" : sessionStorage.openid,
            "storeId" : storeId,
          },
          dataType:'json',
          type:'get',
          success:function (data) {
            if(data.code == 1){
              vm.storeInfos = data.data;//微店id为_vm.storeInfos.id

            	$.ajax({
								 url: comLink.yxtHost + '/store/getShareStoreUrl',
					        data: {
					          'openid': sessionStorage.openid,
					          'storeId': vm.storeInfos.id
					        },
					        dataType: 'json',
					        type: 'post',
					        success:function(data){
					        	console.log(data)
					        	if(data.code == 1){
					        		vm.shareUrl = data.data
					        		//w微信分享
									   	$.ajax({
									        url: comLink.yxtHost + '/user/sign',
									        data: {
									          'url': window.location.href,
									        },
									        dataType: 'json',
									        type: 'post',
									        success: function (data) {
									          console.log(data)
									          if(data.code==1){
									          	 wx.config({
										            debug: false,
										            appId: data.data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
										            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
										            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
										            signature: data.data.signature, // 必填，签名
										            jsApiList: [
										              'onMenuShareAppMessage',
	              									'onMenuShareTimeline',

										            ]
										        });
										        wx.ready(function() {

										        	wx.onMenuShareAppMessage({ //朋友
													        title: '邮讯通商城龙卡专区',
													        desc: "我的微店",
													        link: vm.shareUrl,
													        imgUrl: vm.storeInfos.logo,
													        success: function() {

													        },
													        cancel: function() {

													        }
													    });
													    //分享朋友圈
											        wx.onMenuShareTimeline({
											        		title: '邮讯通商城龙卡专区',
											            desc: "我的微店",// 分享标题
											            link:  vm.shareUrl,
											            imgUrl: vm.storeInfos.logo,
											            success: function () {
											                // 用户确认分享后执行的回调函数
											            },
											            cancel: function () {
											                // 用户取消分享后执行的回调函数
											            }
											        });
										        })
									          }

									        },
									        error: function (data) {

									        }
									      })
						        	}

						        }

								})

	            }

          },
          error:function (data) {

          }
        })


    },
    methods : {
      //获取个人信息
      getManInfos(){
        var _vm = this;
        $.ajax({
          url: comLink.yxtHost + '/user/getInformation',
          data: {
            'openid': sessionStorage.openid,
          },
          dataType: 'json',
          type: 'post',
          success: function (data) {
            console.log(data, '登陆用户');
            if (data.code == 1) {
              console.log(data.data.user.phone, '登陆用户手机号');
              let userId = data.data.user.id;//userId
              let headLogo = data.data.userWx.headLogo;//头像
              // let name = data.data.user.name;//姓名
              let sex = data.data.user.sex;
              let nickName = data.data.userWx.nickName;//昵称
              let qrCode = data.data.userWx.qrCode;//用户二维码
              let phone = data.data.user.phone;//用户手机

              // sessionStorage.setItem('userId',userId);
              // sessionStorage.setItem('name',name);
              // sessionStorage.setItem('headLogo',headLogo);
              // sessionStorage.setItem('sex',sex);
              // sessionStorage.setItem('nickName',nickName);
              // sessionStorage.setItem('qrCode',qrCode);
              // sessionStorage.setItem('phone',phone);
            } else {
              sessionStorage.clear();
            }
          },
        })
      },
    	toPhone(){
        if(this.storeInfos.phone != undefined && this.storeInfos.phone != null && this.storeInfos.phone != 'undefined' && this.storeInfos.phone != 'null' && this.storeInfos.phone != '') {
          window.location.href = 'tel://' + this.storeInfos.phone;
        } else {
          Toast({
            message: '店铺未启用电话功能',
            duration: 2000
          });
        }
    	},
      //獲取店鋪數據
      weiStoreAxios:function(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let storeId = hash[1];//从地址栏获取微店id
        if(storeId != undefined && storeId != null && storeId != '') {
          vm.showWeStore = false;
        }

        $.ajax({
          url:comLink.yxtHost + '/store/getStore',
          data:{
            "openid" : sessionStorage.openid,
            "storeId" : storeId,
          },
          dataType:'json',
          type:'get',
          success:function (data) {
            if(data.code == 1){
              vm.storeInfos = data.data;//微店id为_vm.storeInfos.id
              console.log(vm.storeInfos,1111111)
              vm.storeInfos.background = comLink.yxtImgHost + vm.storeInfos.background;
              // vm.storeInfos.logo =vm.storeInfos.logo;
              sessionStorage.setItem('weiStoreId',vm.storeInfos.id);//id
              vm.proListsAxios();
              //是否开启微店广告栏
              if(vm.storeInfos.isOpenAdvert === 1){
              //    状态为1  开启微店广告栏
              }
            //  状态是否禁用
              if( vm.storeInfos.status === 0){
              //  店铺禁用
              }
            }

          },
          error:function (data) {

          }
        })
      },
      GetQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      },
      //獲取微店二維碼/store/processQrCode
      getQRcodeAxios:function(){
        var openid = sessionStorage.openid;
        if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
          openid = this.GetQueryString('openid');
          if(openid != undefined && openid != null && openid != 'undefined' && openid != 'null') {
            sessionStorage.setItem('openid', openid);
          }
        }

        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/store/processQrCode',
          data:{
            'storeId' : this.storeInfos.id,
            "openid":openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            // console.log("返回值二维码：",data);
            if(data.code == 1){
								console.log(data)
								vm.qrimg=comLink.yxtImgHost+data.data
            }
          },
          error:function (data) {

          }
        })
      },
      //滚动方法
      getCollectListsAxios(){
        if(sessionStorage.weiStoreId){
          if(this.isRequest){
            this.pageNum ++
            this.isRequest = false;
            var vm =this;
            $.ajax({
              url:comLink.yxtHost + '/store/getProductList',
              data:{
                'storeId' : vm.storeInfos.id,
                // 'isRecommend' : 1,//1:是 0:否 不填则查询所有
                'pageNum' : vm.pageNum,
                'productName' : vm.searchWord,
                "isRecommend" : vm.isRecommend,
                "openid":sessionStorage.openid,
                "status" : 1
              },
              dataType:'json',
              type:'get',
              success:function (data) {
                setTimeout(function(){//todo
                  vm.isRequest = true;
                },1700);
                if(data.code == 1){
                  if(data.data && data.data.length > 0){
                    let newData = data.data;//给新请求的列表中的图片加上前缀
                    for(var i = 0,l = newData.length;i < l;i ++){
                      newData[i].logo = comLink.yxtImgHost + newData[i].logo;

                      newData[i].periodShow1 = newData[i].periodShow.split('x')[0];
                      newData[i].periodShow2 = newData[i].periodShow.split('x')[1];
                    }
                    vm.proDetailData = vm.proDetailData.concat(newData);
                    if(data.data.length < 10){
	                		vm.isAllgoods=false;
	                  }
                  }else {
	                	vm.isAllgoods=false;
                    vm.pageNum --
                  }
                }else{
                  vm.pageNum --
                }
              },
              error:function (data) {

              }
            })
          }
        }
      },
      //获取商品列表
      proListsAxios:function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/store/getProductList',
          data:{
            'storeId' : sessionStorage.weiStoreId,
            'pageNum' : vm.pageNum,
            'productName' : vm.searchWord,
            "isRecommend" : vm.isRecommend,
            "openid":sessionStorage.openid,
            "status" : 1,
            "keyword" : vm.keyword,
          },
          dataType:'json',
          type:'get',
          success:function (data) {
            if(data.code == 1){
              vm.proDetailData = data.data;
              for(var i = 0,l = vm.proDetailData.length;i < l;i ++){
                vm.proDetailData[i].logo = comLink.yxtImgHost + vm.proDetailData[i].logo;
                vm.proDetailData[i].periodShow1 = vm.proDetailData[i].periodShow.split('x')[0];
                vm.proDetailData[i].periodShow2 = vm.proDetailData[i].periodShow.split('x')[1];
              }
              if(data.data.length < 10){
	              vm.isAllgoods=false;
	            }
              console.log(vm.proDetailData,'vm.proDetailData')
            }
          },
        })
      },
      toMine() {
        this.$router.push({
          path : '/mine',
        })
      },
      //点击跳转购物车
      toShoppingCart(item){
        if( item.name === '购物车'){
          this.$router.push({
            path : '/cart',
          })
        }
        if( item.name === '个人中心'){
          this.$router.push({
            path : '/mine',
          })
        }
        if( item.name === '推荐'){
          this.isRecommend = 1;
          this.proListsAxios();
        }else{
          this.isRecommend = null;
          this.proListsAxios();
        }
      },
      navFunc : function (i) {
        this.navIndex = i;
        this.pageNum = 1;
      },
      showPopup : function(){//筛选菜单弹出
        this.isShowPop = true;
        this.isShowBlackCover = true;//黑色遮罩层弹出
      },
      hidePopup : function(){
        this.isShowPop = false;
        this.isShowBlackCover = false;
        this.isShowTongji = false;
      },
      showQRCode : function(){//弹出二维码
        if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
          Toast({
            message: '请先登陆',
            duration: 2000
          });
          return;
        } else {
          this.isShowQRCode = true;
          this.getQRcodeAxios();   //获取二维码
        }
        // this.proListsAxios()
      },
      hideQRCode : function(){//隐藏二维码
        this.isShowQRCode = false;
      },
      changeImg(){
        this.$router.push({
          path : '/mine/weiChangeImgRouter'
        })
      },
      toWeiStore(){
        this.$router.push({
          path : '/mine/editWeiStore',
        })
      },
      shujuTongji(){//数据统计
        this.isShowBlackCover = true;//黑色遮罩层弹出
        this.isShowTongji = true;
      }
    },
    components : {
      priproComponent,
      Scroller
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .pointer{
  	text-align: center;
  	color: #999;
  	padding-bottom: 1.5rem;
  }
  .collect-store{
  		margin-top: p(-1);

  }
  .fans-num{
  	.fans{
  		font-size:p(35);
  		color: #666;
  		margin-top: p(2);
  	}
  }
  .pro-lists{
  	min-height:p(1000)
  }
  .brand-store-home {
    /*头部搜索框--开始*/
    .search-main {
      height: p(90);
      width: 100%;
      background: #307ff5;
      padding: 0 p(10) 0 p(60);
      line-height: p(90);

      .icon-wode1{
        font-size: p(50);
        margin-right: p(15);
      }
      .icon-category{
        font-size: p(50);
        /*margin-left: p(25);*/
      }
      .search-inp-main {
        margin: p(10) 0;
        width: 77%;
        height: p(70);
        border-radius: p(40);
        background: white;
        line-height: p(70);

        .icon-search {
          width: 15%;
          font-size: p(40);
          padding-left: p(35);
        }
        .head-search {
          width: 85%;
          height: 100%;
        }
      }
      .sousuo-btn {
        display: inline-block;
        font-size: 1.75rem;
        color: white;
        padding-left: 1rem;
        height: 100%;
        line-height: 5.625rem;
      }
      .search-btn {
        display: inline-block;
        width: 15%;
        text-align: center;
      }
    }
    .pop-content{
      position: fixed;
      z-index: 2005;
      top: p(90);
      right: p(0);
      left: 50%;
      bottom: 0;
      background: white;
    }
    .v-modal{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: .5;
      background: #000;
    }
    /*banner*/
    .banner-main{
      /*width: p(750);*/
     	width: 100%;
			height: 17.2rem;
      overflow: hidden;

      .banner-pic{
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      .icon-edit{
        position: absolute;
        top: p(20);
        right: p(20);
        color: white;
        font-size: p(45);
      }
    }
    /*warranty lists*/
    .warranty-main{
      padding: p(5) 0;
      margin-top: p(-4);
      .warranty-ul{
        width: 100%;
        .warranty-row{
        	width: 25%;
          height: p(35);
          text-align: center;
          div{
          	height: 100%;
          	display: inline-block;
	          .img-pic{
	            width: 1.875rem;
					    height: 1.875rem;
					    margin-right: 0.25rem;
	          }
	          p{
	          	margin-top: 0.5rem;
	          }
          }
          /*margin-left: p(10);*/

        }
      }
    }
    /*store*/
    .store-profile{
      color: #a1a1a1;
      width: 100%;
      height: p(120);
      padding: 0 p(22);
      box-sizing: border-box;
      border-bottom: p(2) solid #999999;
      .head-profile{
      	position: absolute;
      	top: 19.5rem;
      	left: 2rem;
        .head-img{
          display:block;
          width: p(100);
          height: p(100);
          margin: 0 auto;
          margin-left: 0;
        }
        .store-name{
          line-height: p(65);
          width: 26rem;
          text-align: left;
          color: #666;
          white-space: nowrap ;
					overflow: hidden ;
					text-overflow: ellipsis;
        }
      }
      .store-right-content{
        margin-top: p(30);
        .store-right{
          text-align: center;
          .fans{
            color: #666;
          }
          .word{
            margin-top: p(10);
            color: #666;

          }
        }
      }
    }
    .prolist-content{
      color: #a1a1a1;

      .prolist-head{

        .prolist-head-main{

          .prolist-head-row{
            text-align: center;
            width: 25%;
            border-bottom: p(1) solid #eeeeee;

            .li-inner{
              box-sizing: border-box;
              border-left: p(2) solid #e8e8e8;
              margin: p(10) 0;
              .img-pic{
                width: p(30);
                height: p(30);
              }
              .word{
                margin-top: p(10);
                color:#666;
              }
            }
            .li-inner.activeWeiStore{
              color: #307ff5;
            }
          }
        }
      }
    }
    .pro-lists{
      padding-bottom: p(100);
    }
    .showPop-content{
      position: fixed;
      top: p(90);
      bottom: 0;
      right: 0;
      width: p(530);
      background: white;
      z-index: 9;
      animation:myfirst 0.5s ;
      @keyframes myfirst
      {
        0%   {right:0;top: 100%;}
        100% { right:0; top:p(90);}
      }
      .item-list-content{

        .item-list-main{

          .item-row{
            /*padding: 0 p(25);*/
            display: inline-block;
            width: 100%;
            height: p(100);
            box-sizing: border-box;
            border-bottom: p(1) solid #ccc;
            line-height: p(100);
            padding: 0 p(25);
          }
        }
      }
    }
    .black-cover{
      position: fixed;
      z-index: 8;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: black;
      opacity: 0.3;
    }
    /*弹出二维码*/
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
          width: 100%;
          height: 100%;
          background: #ccc;
          border-radius: 2rem;
        }

        .back-img{
          display: inline-block;
          height: p(200);
          margin-top: p(50);
        }

        .word{
          margin-top: p(0);
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
        margin-top: p(10);
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

    .bottom-btns{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: p(100);
      display: flex;
      justify-content: space-evenly;
      border-top: p(1) solid #ccc;

      .btn-row{
        width: 50%;
        height: 100%;
        text-align: center;
        line-height: p(100);
        box-sizing: border-box;
        border-right: p(1) solid #ccc;
      }
      .btn-row:nth-child(2){
        border: none;
      }
    }
    .shujutongjiPop{
      position: fixed;
      z-index: 9;
      display: inline-block;
      width: p(600);
      height: p(290);
      bottom: 50%;
      left: 50%;
      margin-left: p(-300);
      background: white;
      border-radius: p(10);
      overflow: hidden;
      .warn-title{
        display: block;
        text-align: center;
        line-height: p(96);
      }
      .warn-word{
        text-align: center;
        display: block;
        line-height: p(68);
      }
      .confirm{
        display: inline-block;
        width: 100%;
        margin-top: p(30);
        line-height: p(100);
        background: $bgBlue;
        text-align: center;
      }
    }
  }

</style>
