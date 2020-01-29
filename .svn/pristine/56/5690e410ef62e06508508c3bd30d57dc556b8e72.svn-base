<template>
  <div class="home-content fontSize-12" v-title data-title="邮讯通商城">


    <!--头部搜索-->
    <!--<scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire">-->
    <div class="search-main f-oh">
      <div class="search-inp-main f-oh f-fl">
        <i class="icon iconfont icon-search f-fl" @click="searchBtn()" ></i>
        <input class="head-search f-fl fontSize-15"  @click="searchBtn()" v-model="homeSearchWord" type="text" placeholder="仅限建行信用卡，全场购物包邮">
      </div>
      <div class="search-btn f-pr f-fl w-color" @click="toMine()">
        <i class="search-right f-abs icon iconfont icon-wode1" style="top: 0.13rem;
    font-size: 3rem;
    left: 2rem;"></i>
        <!--<div class="mine-icon-wai">
          <img class="mineIcon" :src=mineIcon alt="">
        </div>-->
        <i class="mine f-abs fontSize-12" style="top: 2.78rem;
    width: 100%;
    left: 0.5rem;">我的</i>

        <!--<span class="mine fontSize-14">我的</span>-->
      </div>
    </div>
    <div style="font-size: 1.5rem;color: gray;margin-top: 0.3rem;text-align: center">商品及服务由邮讯通负责，建设银行仅提供信用卡分期支付</div>
    <!--首页轮播图-->
      <div class="slideshow-content" style="margin-top: 0.2rem">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,i) in lunboUrl" class="f-oh" :key="i">
            <a :href=item.url>
              <img class="slideshow-pic f-fl" :src=item.img alt="">
            </a>
          </mt-swipe-item>
        </mt-swipe>
        <!--vux轮播图插件-->
        <!--<swiper :list="lunboUrl" auto-->
                <!--style="margin:0 auto;"-->
                <!--height="20rem" dots-class="custom-bottom"-->
                <!--dots-position="center">-->
        <!--</swiper>-->
      </div>
      <div class="item-list b-white">
        <ul class="list-main f-oh">
          <li class="list-main-row f-fl f-oh" v-for="(item,i) in itemLists" :key="i">
            <div class="li-inner">
              <img class="list-pic f-fl" v-lazy= item.imgSrc alt="">
              <p class="word f-fl m-left5">{{ item.word }}</p>
            </div>
          </li>
        </ul>
      </div>

       <!--<div class="coupon-content b-white m-top10">-->
        <!--喇叭轮播图-->
        <div class="laba-adv m-top10">
          <souna-component :fastNews="fastNews"></souna-component>
        </div>
      <!--</div>-->

      <!--功能列表>领优惠劵-今日抢购-->
      <div class="active-item-list b-white">
        <ul class="active-item-main f-oh">
          <li class="active-item-main-row f-fl m-bottom10" >
            <router-link :to="{ path: lingYouhuijuan.link}">
              <img class="active-pics" v-lazy=lingYouhuijuan.icon alt="">
              <p class="active-words m-top5">领优惠劵</p>
            </router-link>
          </li>
          <li class="active-item-main-row f-fl m-bottom10">
            <a :href=yxtVip.link>
              <img class="active-pics" v-lazy=yxtVip.icon alt="">
              <p class="active-words m-top5">邮讯通会员</p>
            </a>

          </li>
          <li class="active-item-main-row f-fl m-bottom10">
            <a :href=jifen.link>
              <img class="active-pics" v-lazy=jifen.icon alt="">
              <p class="active-words m-top5">商城积分</p>
            </a>

          </li>
          <li class="active-item-main-row f-fl m-bottom10" v-for="(activeItem,i) in searchPro" :key="i"
              @click="daohangRouter(activeItem)"
          >
            <img class="active-pics" v-lazy=activeItem.icon alt="">
            <p class="active-words m-top5">{{activeItem.title}}</p>
          </li>
          <li class="active-item-main-row f-fl m-bottom10">
            <a href="https://ccb.topoto.cn/spread/index.html?business_id=707&code=956135">
              <img class="active-pics" v-lazy=banka.icon alt="">
              <p class="active-words m-top5">在线办卡</p>
            </a>

          </li>
        </ul>
      </div>

      <!--精选频道-->
      <div class="selection-pro has-title b-white fontSize-12 m-top10">
        <div class="select-title p-top10 m-bottom10">
          <p class="import-choose fontSize-16">精选频道</p>

          <p class="fontSize-12 pTitle m-top10">建行龙卡信用卡 全场12期免息</p>
        </div>
        <ul class="selection-pro-main f-oh" v-if="choicenessData.length > 0">
          <li class="selection-pro-row f-fl" v-for="(proItem,i) in choicenessData"
              :key="i"
              @click="danjiMoreFenlei(proItem,i)"
          >
            <div class="img-wai">
              <img class="select-pic" v-lazy= proItem.logo alt="">
            </div>

            <p class="select-word">{{ proItem.name }}</p>
          </li>
          <li class="import-choosemore-btn selection-pro-row f-fl" @click="moreItems">
            <img class='checkMoreImg' v-lazy=checkMore>
            <p class="more-item fontSize-14">更多分类</p>
          </li>
        </ul>
      </div>
      <!--品牌店铺-->
      <div class="brand-store has-title m-top10 b-white">
        <div class="select-title p-top10 m-bottom10">
          <p class="import-choose fontSize-16">品牌店铺</p>


        </div>
        <ul class="brandpro-main f-oh" style="display: none">
          <li class="pro-pic-row f-fl m-bottom5" v-for="(item,i) in pinpaiStoreData" :key="i"
              @click="toPinpaiStore(i)"
          >
            <img class="pro-pics" v-lazy=item.logo alt="">
          </li>
          <li class="pro-pic-row m-bottom5 more-brand f-fl fontSize-15 f-pr" @click="morePinpai">
            <dt class="word-btn">
              更多品牌
            </dt>
          </li>
        </ul>
        <div class="brand-adv-content" v-if="pinpaiProData.length > 0">
          <div class="brand-adv-main f-oh" v-for="(item,i) in pinpaiProData" :key="i">
            <div class="title f-fl fontSize-15">{{item.name}}</div>
            <dt class="banner-pic m-top10 f-fl" @click="toBrandStore(item)">
              <img class="big-img" v-lazy=item.advert alt="">
            </dt>
            <ul class="pro-pri-main f-fl fontSize-9 f-oh">
              <li class="pro-pai-row f-fl m-top12" :key="i"
                  @click="toProDetail(pro,i)"
                  v-for="(pro,i) in item.productList">
                <dt class="row-inner">
                  <p class="pro-name">{{pro.name}}</p>
                  <img class="pro-img m-top10" v-lazy=pro.logo alt="">
                  <p class="pro-fenqi-price fontSize-11">¥<span style="font-size: 2rem">{{pro.periodShow1}}</span>x<span>{{pro.periodShow2}}</span></p>
                  <p class="pro-price">商城价： ￥{{pro.mallPrice}}</p>
                </dt>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <!--</scroller>-->

    <div  class="blackCoverShow" @click="isblack = false" v-if="isblack"></div>
    <div class="indusNum" v-if="isblack">
    	<i class="icon iconfont icon-close " @click="isblack = false"></i>
    		<img :src='background'/>
    		<div class="" style="">
    			<input type="text" v-model="companyCode" placeholder="请输入企业内购码" />
    		</div>
				<div class="btn">
					<span class="confirm" @click="enterHome">立 即 进 入</span>
				</div>
    </div>

  </div>
</template>

<script>
//导入子组件
  import sounaComponent from "./../../subcomponents/souna-component.vue";
	import axios from 'axios'
  import comLink from "./../../common/common_link"; //导入总线
  import { Swiper,GroupTitle, SwiperItem } from 'vux'
  import $ from "jquery"; //导入jquery
  import { Indicator , Lazyload , Toast} from "mint-ui";

export default {//
  name: "indushome-mian",
  data() {
    return {
      companyCode:'',
      background: '@/../static/image/home/jifen.png',
    	isblack:true,
      headTitle : '邮讯通专区',
      picId: 0,
      gengduoIndex : 0,
      isMarginRight : '',
      timer: null,
      checkMore : '@/../static/image/home/check_more.png',
      imgSrc : '@/../static/image/home/banner_01.png',
      couponImg : '@/../static/image/home/coupon_banner.png',
      //轮播图演示路径
      lunboUrl : [],
      itemLists :[
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
      daohangData : [],//首页导航栏
      daoIndex : 0,//导航下标
      choicenessData : [],//精选频道数据
      pinpaiProData : [],//品牌店铺及商品 后台数据
      pinpaiStoreData : [],//品牌店铺数据
      huidaodingbu : false,
      pipaiIndex : 0,//品牌店铺点击下标
      luobotuPics : [],//轮播图数组
      couponData : [],//首页优惠劵列表
      gerenInfos : {},//首页获取客户个人信息并存储
      fastNews : [],//快讯列表
      activeIndex: 0,
      lingYouhuijuan : {},
      yxtVip : {},
      jifen : {},
      banka : {},
      searchPro :[
      	{title:''}
      ],
      mineIcon : '@/../static/image/home/brand_store/mycenter_01.png',
      shareIcon : '@/../static/img/share.jpg',
      isShowFirstPop : false,
      isShowBlackCover : false,
      homePopObj : {},//首页弹窗内容
      pop : {
        phoneNumber : null,
        isOk : false,
      },
      dianjile : false,
      homeSearchWord : '',//头部搜索框输入文字
      scoller:'',
    }
  },
  created(){

  },
  methods: {
    enterHome() {
      var vm = this;
      let hash = window.location.hash;
      let id =  hash.split('=')[1];
     $.post(comLink.yxtHost + '/purchase/bindUser', {
       'openid' : sessionStorage.openid,
       'id' : id,
       'companyCode' : vm.companyCode
     }, function(resp) {
       if(resp.code == 1) {
         Toast({
           message: resp.msg,
           duration: 2000
         });
         vm.$router.push({
           path : '/home',
         })
       } else {
         Toast({
           message: resp.msg,
           duration: 2000
         });
       }
     });
    },
    //头部搜索按钮
    searchBtn(){
//    sessionStorage.setItem('homeSearchWord','')
      $('input').blur();
     this.$router.push({
        path : '/home/homeSearchRouter',
      })
//    alert(this.homeSearchWord)
//    sessionStorage.setItem('homeSearchWord',this.homeSearchWord)
    },
    closeHomePop(){
      this.isShowFirstPop = false;
      this.isShowBlackCover = false;
      // localStorage.setItem('isShowFirstPop',false);
      // localStorage.setItem('isShowBlackCover',false)
      this.dianjile = true;
    },
    //获取验证码
    getYanzhengCode(){

    },
    //获取首页广告弹窗
    homePopAxios: function () {
      var vm = this;
      $.ajax({
        url: comLink.yxtHost + '/index/activity',
        data: {
          openid: sessionStorage.openid,
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
          if (data.code == 1) {
            vm.homePopObj = data.data;
            vm.homePopObj.logo = comLink.yxtImgHost + vm.homePopObj.logo
          }
        },
        error: function (data) {

        }
      })
    },
    //滚动方法
    scrollerRequire() {//

    },
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
          if (data.code == 1) {
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

          // window.location.href='/yxt/?#/home';
          } else {
            sessionStorage.clear();
          }
        },
      })
    },
    //点击 品牌广告条 跳转品牌店铺
    toBrandStore(item) {
      this.$router.push({
        path: '/home/brandStoreRouter',
        query: {id: item.id}
      })
    },
    //获取优惠劵列表
    getCouponAxios: function () {
      var _vm = this;
      $.ajax({
        url: comLink.yxtHost + '/index/couponList',
        data: {
          'openid': sessionStorage.openid,
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
          if (data.code == 1) {
            _vm.couponData = data.data.slice(0, 4);
          }

        },
        error: function (data) {

        }
      })
    },
    //
    toProDetail(pro, i) {
      this.$router.push({
        path: "/home/proDetailRouter",
        query: {id: pro.id}
      })
    },
    //点击搜索框中的头像 跳转个人中心
    toMine() {
      this.$router.push({
        path: '/mine'
      })
    },
    //精选频道
    jingxuanAxios: function() {
      var vm = this;
//    axios.get(comLink.yxtHost + '/index/category', {
//      params:{
//        openid : sessionStorage.openid,
//      }
//    }).then(function(response) {
//      if (response.data.code == 1) {
//        vm.choicenessData = response.data.data;
//        for(var i = 0,l = vm.choicenessData.length;i < l; i ++){
//          vm.choicenessData[i].logo = comLink.yxtImgHost + vm.choicenessData[i].logo
//        }
//        // vm.getJingxunaData()//调用数据获取方法
//      }
//    })
//      .catch(function(res) {
//
//      });



      $.ajax({
        url: comLink.yxtHost + '/index/category',
        data: {
          'openid': sessionStorage.openid,
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
          if (data.code == 1) {
            vm.choicenessData = data.data;
	          for(var i = 0,l = vm.choicenessData.length;i < l; i ++){
	            vm.choicenessData[i].logo = comLink.yxtImgHost + vm.choicenessData[i].logo
	          }
          }

        },
        error: function (data) {

        }
      })

    },
    getJingxunaData(){

    },
    // 品牌店铺
    pinpaiStoreAxios: function(){
      var _vm = this;
//    axios.get(comLink.yxtHost + '/index/brand', {
//      params:{
//        openid : sessionStorage.openid,
//      }
//    }).then(function(response) {
//      if (response.data.code == 1) {
//        _vm.pinpaiStoreData = response.data.data;//获取11项品牌店铺列表
//        _vm.pinpaiId = _vm.pinpaiStoreData = response.data.data
//        // _vm.getPinpaiData()//调用数据获取方法
//        for( var i = 0,l = _vm.pinpaiStoreData.length;i < l;i ++){
//          _vm.pinpaiStoreData[i].logo = comLink.yxtImgHost + _vm.pinpaiStoreData[i].logo;
//        }
//      }
//    })
//      .catch(function(res) {
//        // Toast({
//        //   //mintui提示效果
//        //   message: "数据请求失败",
//        //   duration: 2000
//        // });
//      });



      $.ajax({
        url: comLink.yxtHost + '/index/brand',
        data: {
          'openid': sessionStorage.openid,
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
          if (data.code == 1) {
            _vm.pinpaiStoreData = data.data;//获取11项品牌店铺列表
	          _vm.pinpaiId = _vm.pinpaiStoreData = data.data
	          // _vm.getPinpaiData()//调用数据获取方法
	          for( var i = 0,l = _vm.pinpaiStoreData.length;i < l;i ++){
	            _vm.pinpaiStoreData[i].logo = comLink.yxtImgHost + _vm.pinpaiStoreData[i].logo;
	          }
          }

        },
        error: function (data) {

        }
      })
    },
    //品牌店铺及商品数据
    pinPaiProAxios: function(){
      var pipro_vm = this;
//    axios.get(comLink.yxtHost + '/index/brandDetail', {
//      params:{
//        openid : sessionStorage.openid,
//      }
//    }).then(function(response) {
//      if (response.data.code == 1) {
//        pipro_vm.pinpaiProData = response.data.data;//获取11项品牌店铺列表
//        for(var i = 0,l = pipro_vm.pinpaiProData.length;i < l;i ++){//给广告条图片加上绝对路径
//          pipro_vm.pinpaiProData[i].advert = comLink.yxtImgHost + pipro_vm.pinpaiProData[i].advert;
//          for( var j = 0,il = pipro_vm.pinpaiProData[i].productList.length;j<il;j++){//给品牌下产品图片添加前缀
//            pipro_vm.pinpaiProData[i].productList[j].logo = comLink.yxtImgHost + pipro_vm.pinpaiProData[i].productList[j].logo;
//
//            pipro_vm.pinpaiProData[i].productList[j].periodShow1 = pipro_vm.pinpaiProData[i].productList[j].periodShow.split('x')[0];
//            pipro_vm.pinpaiProData[i].productList[j].periodShow2 = pipro_vm.pinpaiProData[i].productList[j].periodShow.split('x')[1];
//          }
//        }
//      }
//    })
//      .catch(function(res) {
//        // Toast({
//        //   //mintui提示效果
//        //   message: "数据请求失败",
//        //   duration: 2000
//        // });
//      });



      $.ajax({
        url: comLink.yxtHost + '/index/brandDetail',
        data: {
          'openid': sessionStorage.openid,
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
          if (data.code == 1) {
            pipro_vm.pinpaiProData = data.data;//获取11项品牌店铺列表
          for(var i = 0,l = pipro_vm.pinpaiProData.length;i < l;i ++){//给广告条图片加上绝对路径
            pipro_vm.pinpaiProData[i].advert = comLink.yxtImgHost + pipro_vm.pinpaiProData[i].advert;
            for( var j = 0,il = pipro_vm.pinpaiProData[i].productList.length;j<il;j++){//给品牌下产品图片添加前缀
              pipro_vm.pinpaiProData[i].productList[j].logo = comLink.yxtImgHost + pipro_vm.pinpaiProData[i].productList[j].logo;

              pipro_vm.pinpaiProData[i].productList[j].periodShow1 = pipro_vm.pinpaiProData[i].productList[j].periodShow.split('x')[0];
              pipro_vm.pinpaiProData[i].productList[j].periodShow2 = pipro_vm.pinpaiProData[i].productList[j].periodShow.split('x')[1];
            }
          }
          }

        },
        error: function (data) {

        }
      })
    },
    //首页导航栏
    daohangAxios:function(){
      var vm = this;
//    axios.get(comLink.yxtHost + '/index/indexNavigation', {
//      params:{
//        openid : sessionStorage.openid,
//      }
//    }).then(function(response) {
//      if (response.data.code == 1) {
//        vm.daohangData = response.data.data;//
//        //给导航图片加前缀
//        for( var i = 0,l = vm.daohangData.length; i < l; i ++){
//          vm.daohangData[i].icon =  comLink.yxtImgHost + vm.daohangData[i].icon;
//        }
//        // vm.searchPro = vm.daohangData.slice(3,3)
//        vm.searchPro[0] = vm.daohangData[3];
//        vm.searchPro[0].type = 1;
//        vm.searchPro[1] = vm.daohangData[4];
//        vm.searchPro[1].type = 2;
//        vm.searchPro[2] = vm.daohangData[5];
//        vm.searchPro[2].type = 3;
//        vm.searchPro[3] = vm.daohangData[6];
//        vm.searchPro[3].type = 4;
//        vm.lingYouhuijuan = vm.daohangData[0];
//        vm.yxtVip = vm.daohangData[1];
//        vm.jifen = vm.daohangData[2];
//        vm.banka = vm.daohangData[7]
//      }
//    })
//      .catch(function(res) {
//        // Toast({
//        //   //mintui提示效果
//        //   message: "数据请求失败",
//        //   duration: 2000
//        // });
//      });


      $.ajax({
        url: comLink.yxtHost + '/index/indexNavigation',
        data: {
          'openid': sessionStorage.openid,
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
          if (data.code == 1) {
           	vm.daohangData = data.data;//
          //给导航图片加前缀
	          for( var i = 0,l = vm.daohangData.length; i < l; i ++){
	            vm.daohangData[i].icon =  comLink.yxtImgHost + vm.daohangData[i].icon;
	          }
	          // vm.searchPro = vm.daohangData.slice(3,3)
	          vm.searchPro[0] = vm.daohangData[3];
	          vm.searchPro[0].type = 1;
	          vm.searchPro[1] = vm.daohangData[4];
	          vm.searchPro[1].type = 2;
	          vm.searchPro[2] = vm.daohangData[5];
	          vm.searchPro[2].type = 3;
	          vm.searchPro[3] = vm.daohangData[6];
	          vm.searchPro[3].type = 4;
	          vm.lingYouhuijuan = vm.daohangData[0];
//	          vm.lingYouhuijuan.link='#' + vm.daohangData[0].link
	          vm.yxtVip = vm.daohangData[1];
	          vm.jifen = vm.daohangData[2];
	          vm.banka = vm.daohangData[7]
          }

        },
        error: function (data) {

        }
      })
    },
    //品牌店铺子选项点击事件
    toPinpaiStore(i){
      this.pipaiIndex = i;
      this.$router.push({
        path : '/home/brandStoreRouter',
        query : { id : this.pinpaiStoreData[this.pipaiIndex].id }
      })
    },
    morePinpai(){
      this.$router.push({
        path : '/home/morePinpai',
      })
    },
    // //轮播图
    luobotuAxios: function() {
      var vm = this;
//    axios.get(comLink.yxtHost + '/index/banner', {
//      params:{
//        openid : sessionStorage.openid,
//      }
//    }).then(function(response) {
//      if (response.data.code == 1) {
//        vm.getJingxunaData();//调用数据获取方法
//        for(var i = 0,l = response.data.data.length;i<l;i++){
//          var obj = {
//            // url: '/#'+response.data.data[i].url,
//            // url: '/index.html#'+response.data.data[i].url,
//            url: 'http://yxtccb.com/yxt/index.html#'+response.data.data[i].url,
//            img: comLink.yxtImgHost+response.data.data[i].imgUrl,
//            title: ''
//          };
//          vm.lunboUrl.push(obj)
//        }
//      }
//    })
//      .catch(function(res) {
//        // Toast({
//        //   //mintui提示效果
//        //   message: "数据请求失败",
//        //   duration: 2000
//        // });
//      });
//

      $.ajax({
        url: comLink.yxtHost + '/index/banner',
        data: {
          'openid': sessionStorage.openid,
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
          if (data.code == 1) {
           vm.getJingxunaData();//调用数据获取方法
	          for(var i = 0,l = data.data.length;i<l;i++){
//	          	data.data[i].url=data.data[i].url.split('?')[0]
	            var obj = {
	              // url: '/#'+response.data.data[i].url,
	              // url: '/index.html#'+response.data.data[i].url,
	              url: 'https://yxtccb.com/yxt/index.html#'+data.data[i].url,
//								url: '/#'+data.data[i].url,
	              img: comLink.yxtImgHost+data.data[i].imgUrl,
	              title: ''
	            };
	            vm.lunboUrl.push(obj)
	            console.log(vm.lunboUrl)
	          }
					}
        },
        error: function (data) {

        }
      })
    },
    // //获取快讯列表
    getKuaixunAxios: function() {
      var vm = this;
//    axios.get(comLink.yxtHost + '/index/consult', {
//      params : {
//        openid : sessionStorage.openid,
//      }
//    }).then(function(response) {
//      if (response.data.code = "200") {
//        vm.fastNews = response.data.data;
//        for(var i = 0,l = vm.fastNews.length;i < l;i ++){
//          vm.fastNews[i].CheckMore = '更多';
//        }
//      }
//    })
//      .catch(function(res) {
//
//      });


        $.ajax({
        url: comLink.yxtHost + '/index/consult',
        data: {
          'openid': sessionStorage.openid,
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
          if (data.code = "200") {
	          vm.fastNews = data.data;
	          for(var i = 0,l = vm.fastNews.length;i < l;i ++){
	            vm.fastNews[i].CheckMore = '更多';
	          }
	        }
        },
        error: function (data) {

        }
      })

    },
    moreItems(){
      this.$router.push({
        path : '/sort',
        // query : { id : this.pinpaiStoreData[this.gengduoIndex].id}
      })
    },
    danjiMoreFenlei(proItem,i){
      this.$router.push({
        path : '/sort',
        query : {
          id : proItem.id,
          index : i
        }
      });
      this.$emit('changeActiveTabber');
    },

    daohangRouter(activeItem){
      this.$router.push({
        path : activeItem.link,
        query : {type : activeItem.type}
      })
    },
    //测试
    test(){},
    getOpenId(){
      let hash = window.location.href;
      hash = hash.split('#');
      let value = hash[0];
      value = value.split("=");
      let openid = value[1];


				if(openid == null || openid == 'null' || openid == undefined || openid == 'undefined' || openid == '') {
	        return;

	      } else {
	      	 if(openid.indexOf("?")!=-1) {
							openid = openid.substr(0, openid.length - 1);
						}
	        sessionStorage.setItem('openid',openid);
	        this.getManInfos();//获取个人信息
	      }



    	// sessionStorage.setItem('openid','oo7sq046UioBY4THLJNita9Qo8v8');//写死openId
    },
    handleScroll () {
		  let scrollTop = document.body.scrollTop;
		  this.scroll = scrollTop;
		},
    getPurchase(id) {
      var vm = this;
      $.post(comLink.yxtHost + '/purchase/getPurchase', {
        'id' : id
      }, function(resp) {
        if(resp.code == 1) {
          vm.background = resp.data.img;
        } else {
          Toast({
            message: resp.msg,
            duration: 2000
          });
        }
      });
    },
		sendWxtoOther(){
			var vm=this;
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
			        title: '邮讯通商城',
			        desc: '邮讯通商城企业内购页',
			        link: window.location.href,
              // link: data.data.link,
			        imgUrl: "https://www.yxtccb.com/yxt/static/img/share.png",
			        success: function() {

			        },
			        cancel: function() {

			        }
			   		 });
						//分享朋友圈
		        wx.onMenuShareTimeline({
		            title: '邮讯通商城', // 分享标题
			        	desc: '邮讯通商城企业内购页',
		            link: window.location.href, // 分享链接
		            imgUrl: "https://www.yxtccb.com/yxt/static/img/share.png", // 分享图标
		            success: function () {
		                // 用户确认分享后执行的回调函数
		            },
		            cancel: function () {
		                // 用户取消分享后执行的回调函数
		            }
		        });
//			   		 	wx.hideMenuItems({
//              menuList: ['menuItem:copyUrl'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
//              success:function(res){
//              }
//          	});
	        })
         }

        },
        error: function (data) {

        }
      })
		}
  },
  mounted (){
    if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
      this.getOpenId();
    } else {
      this.getManInfos();//获取个人信息
    }
  	window.addEventListener('scroll', this.handleScroll);
    this.homePopAxios();
    this.jingxuanAxios();//精选品牌
    this.pinpaiStoreAxios();//品牌店铺
    this.pinPaiProAxios();//品牌店铺及商品数据
    this.daohangAxios();//首页导航栏
    this.luobotuAxios();//轮播图数据
    this.getKuaixunAxios();//获取快讯
    // this.getCouponAxios();//获取优惠劵
    this.sendWxtoOther();

    let hash = window.location.hash;
    let id =  hash.split('=')[1];
    this.getPurchase(id);//获取企业购信息
  },
  activated() {
    if(this.scroll > 0){
       window.scrollTo(0, this.scroll);
       this.scroll = 0;
       window.addEventListener('scroll', this.handleScroll);
    }
	},
	deactivated(){
     window.removeEventListener('scroll', this.handleScroll);

	},
  components: {
    //注册子组件
    sounaComponent,//喇叭轮播图
    Swiper,
    SwiperItem,
    GroupTitle,
  },
  watch: {
      '$route'(to,from) {

        if(from.name === 'homeSearchRouter' || from.name === 'searchproRt' || from.name === 'sort' || from.name === 'cart' || from.name === 'mine'){

					if(to.name == 'home-mian'){
        		this.sendWxtoOther();
					}
        }


      },
    },
};
</script>
<style>
  /*.router{*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
 .mint-swipe-indicator {
    width: 1rem!important;
    height: 1rem!important;
    background: #eee!important;
    opacity: 0.8!important;
    margin: 0 0.5rem!important;
}
.mint-swipe-indicator.is-active{
	background: #307ff5!important;
}
  input::-webkit-input-placeholder {
    color: white
  }
</style>
<style lang="scss" scoped>
@import "@/../src/sass/public.scss"; //导入scss初始文件
.blackCoverShow{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: black;
    opacity: 0.4;
    z-index: 98;
  }
.indusNum{
	position: fixed;
    top: 20%;
    left: 10%;
    right: 10%;
    width: 80%;
    height: 60%;
    background: white;
    border-radius: 1rem;
    z-index:99;
    i{
    	color: #fff;
    	font-size:p(50) ;
    	position: absolute;
    	right: p(40);
    	top: 0;
    	font-weight: 600;
    	z-index:100;

    }
    img{
    	width: 100%;
    	height: 100%;
    	position: absolute;
    	top: 0;
    	right: 0;
    	z-idnex:99;
      border-radius: 1rem;
    }
    input{
    	position: absolute;
    	bottom: 27%;
    	height: 5rem;
    	width: 70%;
    	line-height: 5rem;
    	display: inline-block;
    	box-sizing: border-box;
    	border-radius: 1rem;
    	left: 15%;
    	z-index:1000;
      text-align: center;
      border: 1px solid #eee;
      color: white;
      background:transparent;

      -webkit-input-placeholder {
        color: white;
      }
    }

    .btn{
    	position: absolute;
      bottom: 12%;
    	width: 100%;
      text-align: center;
    	span{
    		display: inline-block;
    		height: 4.5rem;
    		text-align: center;
    		line-height: 4.5rem;
    		border-radius: 3rem;
    		font-size: 1.6rem;
    		width: 20rem;
        background-color: white;
        color: #fd7789;
    	}
    }
}
.to-top{
  position: fixed;
  display: inline-block;
  width: p(60);
  height: p(70);
  bottom: p(355);
  right: p(20);
  background: black;
  opacity: 0.6;
  color: white;
  text-align: center;

  .icon-less{
    font-size: p(40);
  }
}
.marginRight{
  padding-left: p(10);
  margin-right: p(10);
}
  .home-content{
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: p(90);*/
    /*right: 0;*/
    /*left: 0;*/
    padding-bottom: p(100);
    width: 100%;
    height: 100%;
    /*overflow-y: auto;*/

    .search-main{
      height: p(90);
      width: 100%;
      background: #307ff5;
      padding: 0 p(20);

      .search-inp-main{
        margin: p(12) 0;
        width: 87%;
        height: p(64);
        border-radius: p(40);
        background: white;
        line-height: p(70);

        .icon-search{
          width: 15%;
          font-size: p(40);
          padding-left: p(35);
        }
        .head-search{
          width: 85%;
          height: 100%;
          border-radius: p(40);
          font-size: p(28);
        }
      }
      .search-btn{
        display: inline-block;
        width: 13%;
        height: 100%;
        text-align: center;
        margin-top: p(8);

        .mine-icon-wai{
          width: 100%;
          height: 50%;
          text-align: center;
          .mineIcon{
            height: 100%;

          }
        }
        .mine{
          display: inline-block;
          width: 100%;
          text-align: center;
          margin-top: p(5);
        }
      }
    }
    .page-content{
      position: absolute;
      top: p(90);
      bottom: 0;
      right: 0;
      left: 0;
      overflow-y: auto;
    }
    /*轮播图开始*/
    .slideshow-content{
      width: 100%;
      height : p(300);
      .slideshow-pic{
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      .btn{
        width: p(70);
        height: p(18);
        background: transparent;
        opacity: 0.7;
        bottom: p(20);
        left: 50%;
        margin-left: p(-35);
        border-radius: p(20);
        display: flex;
        justify-content: space-evenly;

        .pic-btn.active{
          background: #307ff5;
        }
        .pic-btn{
          display: inline-block;
          margin-top: p(4);
          width: p(10);
          height: p(10);
          border-radius: 50%;
          background: white;
          opacity: 1;
        }
      }
    }
    /*轮播图结束*/
    .item-list{
      width: 100%;
      height: p(50);

      .list-main{

        .list-main-row{
          width: 25%;
          height: 100%;
          text-align: center;

          .li-inner{
            display: inline-block;
            /*width: 100%;*/
            height: 100%;
            margin: p(10) auto;

            .list-pic{
              width: p(30);
              height: p(30);
            }
            .word{
              margin-top: p(3);
            }
          }

        }
      }
    }

    /*优惠劵内容开始*/
    .coupon-content{
      width: 100%;
      /*height: p(55);*/
      padding: 1px 0;

      .word{
        /*display: inline-block;*/
        height: p(44);
        line-height: p(44);
        text-align: center;
        color: $bgBlue;
      }
      .coupon{
        .coupon-main{
          width: 100%;
          .coupon-main-row{
            display: inline-block;
            width: 25%;
            height: p(85);
            text-align: center;
            .row-inner{
              display: inline-block;
              width: 95%;
              height: 100%;
              background-image: url('./../../../static/img/home/coupon.png');
              background-size: p(170) p(85);
              background-repeat: no-repeat;
              .coupon-detail{
                padding-top: p(10);
                padding-bottom: p(8);
                color: white;
                .price{
                  font-size: p(36);
                }
              }
            }
            .coupon-need{
              display: inline-block;
              color: #fd6c3a;
              background: white;
              width: p(120);
              height: p(20);
              text-align: center;
              line-height: p(20);
            }
          }
        }
      }
      /*喇叭广告*/
      .laba-adv{
        padding: 1px 0;
        width: 100%;
        height: p(65);
        line-height: p(65);
        box-sizing: border-box;
        position: relative;
        .thGgao{
          margin-top: 0.1rem;
          .juzDuiqi{
            line-height: p(27);
          }
        }
      }
    }

    /*功能列表—今日抢购-领优惠劵 等*/
    .active-item-list{
      padding: p(30) 0 p(10) 0;
      margin-top: p(2);

      .active-item-main{

        .active-item-main-row{
          width: 25%;
          height: 100%;
          text-align: center;
          .active-pics{
            display: inline-block;
            width: p(100);
            height: p(100);
            /*border-radius: 50%;*/
          }
        }
      }
    }

    /*精选频道*/
    .has-title .select-title{
      text-align: center;

      .import-choose{
      	letter-spacing: 0.1rem;
        margin-bottom: p(5);
        font-weight: 550;
        color: #666;
      }
      .pTitle{
        color: $bgBlue;
      }
    }
    .selection-pro{

      .selection-pro-main{
        padding: p(15) p(15);
        /*display: flex;*/
        /*justify-content: space-evenly;*/

        .selection-pro-row{
          margin: p(10) 0 p(30) 0;
          width: 25%;
          /*box-sizing: border-box;*/
          /*border: p(1) solid #ccc;*/
          text-align: center;
          height: p(180);

          .img-wai{
            display: inline-block;
            width: 80%;
            /*height: p(100);*/
            overflow: hidden;
            text-align: center;

            .select-pic{
              width: 100%;
              /*height: p(90);*/
            }
          }

          .select-word{
            margin-top: p(27);
          }
          /*.item-line{*/
            /*width: p(60);*/
            /*height: p(10);*/
            /*background: #444444;*/
            /*display: inline-block;*/
            /*text-align: center;*/
          /*}*/
        }
        .import-choosemore-btn{
          height: p(100);
          text-align: center;
          margin-top: p(50);

          .checkMoreImg{
            width: p(40);
            margin-top: p(25);
          }

          .more-item{
            margin-top: p(20);
            padding-left: p(20);
          }
          .more-item:after{
            content: ' >';
          }
        }
      }
    }

    /*品牌产品*/
    .brand-store{

      .brandpro-main{
        padding: 0 p(20);
        .pro-pic-row{
          width: 25%;
          height: p(170);
          padding: p(2);
          box-sizing: border-box;
          text-align: center;
          /*border: p(1) solid #ccc;*/
          .pro-pics{
            width: 100%;
          }
        }

        .more-brand{
          width: 25%;
          height: p(170);
          text-align: center;
          line-height: p(37);
          box-sizing: border-box;
          /*border: p(1) solid #ccc;*/
          .word-btn{
            display: inline-block;
            width: p(60);
            position: absolute;
            top: 50%;
            margin-top: p(-40);
            left: 50%;
            margin-left: p(-30);

            /*<!--margin-top: p(-20);-->*/
          }
        }
      }
    }

    .brand-adv-content{
      padding-bottom: p(20);
      .brand-adv-main{
        width: 100%;
        text-align: center;
        margin-bottom: p(20);
        .title{
          margin-top: p(20);
        }
        .title,.banner-pic{
          padding: 0 p(20);
        }

        .banner-pic{
          width: 100%;
          padding: 0 p(15);

          .big-img{
            width: 100%;
            border-radius: p(20);
          }
        }
        /*产品详细及价格*/
        .pro-pri-main{
          width: 100%;
          padding: 0 p(10);
          .pro-pai-row{
            width: 33.33%;
            padding: 0 p(10);
            .row-inner{
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: p(2) solid #d9d9d9;
              border-radius: p(10);
              padding: 0 p(10);

              .pro-name{
                margin-top: 0.5rem;
                line-height: 2.2rem;
                text-align: left;
                height: 4.4rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;  //这里是在第二行有省略号
                overflow: hidden;
                font-size: 1.6rem;
              }

              .pro-fenqi-price{
                margin-top: 1rem;
                color: $qianhong;
              }

              .pro-fenqi-price{
                margin-top: 0.5rem;
                text-align: left;
              }
              .pro-price{
                margin: 0.5rem 0 0.5rem 0;
                color: #9d9d9d;
                text-align: left;
              }
              .pro-img{
                display: inline-block;
                margin-top: 0;
                /*width: 100%;*/
                height: p(160);
              }
            }
          }
        }
      }
    }
    /*产品价格及详细列表*/
    .today-recom-content{
      width: 100%;
      /*引入组件*/
    }
    /*进入页面的广告弹窗*/
    .enter-popup-content{
      position: fixed;
      z-index: 99;
      left: p(95);
      right: p(95);
      top: p(280);
      height: p(900);

      .white-part{
        /*<!--background: $bgBlue;-->*/
        height: p(800);
        background-image: url("./../../../static/image/home/pop_img.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding-top: p(225);

        .top-img{
          width: 100%;
          position: absolute;
          top: p(-85);
          text-align: center;

          .img-pic{
            width: 80%;
            height: p(220);
          }
        }
        .title{
          /*margin-top: p(135);*/
          width: 100%;
          text-align: center;
          color: white;

          .big-title{
            font-size: p(55);
            display: block;
          }
          .small-title{
            line-height: p(54);
            margin-bottom: p(20);
          }
        }
        .coupon-content{
          padding: 0 p(30);

          .coupon-img{
            width: 100%;
          }
          .coupon-words{
            width: 100%;
            top: 0;
            .left{
              width: 31.3131%;
              .coupon-price{
                font-size: p(60);
              }
            }
            .right{
              width: 68.6868%;
              .right-details{
                display: inline-block;
                width: 100%;
                float: left;
              }
              .right-details:nth-child(1){
                 line-height: p(44);
                 margin-top: p(10);
               }
              .right-details:nth-child(2){
                height: p(30);
              }
              .right-details:nth-child(3){
                line-height: p(58);
              }
            }
          }
        }
        .get-yanzhengCode-content{
          width: 100%;
          .phone{
            padding: 0 p(40);
            width: 100%;
            margin-bottom: p(10);
            .ipt{
              width: 100%;
            }
          }
          .yanzheng-code{
            padding: 0 p(40);
            width: 100%;
            .ipt{
              width: 60%;
            }
            .get-btn{
              width: 35%;
              display: inline-block;
              height: 100%;
              line-height: p(60);
              text-align: center;
              background: #eee;
              border-radius: p(10);
            }
          }
          .ipt{
            display: inline-block;
            box-sizing: border-box;
            border: 1px solid $danlan;
            border-radius: p(10);
            height: p(60);
            line-height: p(60);
            padding-left: p(10);
          }
        }
        .get-coupon-btn{
          width: 100%;
          padding: 0 p(120);
          height: p(60);
          text-align: center;

          .btn{
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: p(60);
            background: white;
            color: $bgBlue;
            border-radius: p(60);
          }
        }
      }
      .close-main{
        width: 100%;
        height: p(60);
        text-align: center;
        margin-top: p(40);
        .icon-close{
          height: p(60);
          line-height: p(60);
          font-size: p(30);
          width: p(60);
          color: white;
          border: 1px solid white;
          border-radius: 50%;

        }
      }
    }
    .black-cover{
      position: fixed;
      z-index: 98;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: black;
      opacity: 0.3;
    }
  }
</style>

