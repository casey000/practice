<template>
  <div class="brand-store-home"  v-title data-title="店铺">
  	<div style="width: 100%; height: 0.1rem;"></div>
    <scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire" ref="myScroller" >
      <div style="padding-bottom:2rem; height: 100%;">
        <div class="search-main f-oh">
          <!--<search-component></search-component>-->
          <!--搜索框-->
          <i class="icon iconfont icon-wode1 w-color f-fl" @click="toMine"></i>
          <div class="search-inp-main f-oh f-fl f-pr">
            <i class="icon iconfont icon-search f-fl"></i>
            <input class="head-search f-fl"type="text" placeholder="搜索" @click="searchBlur()">
          </div>
          <!--类别按钮-->
          <i class="icon iconfont icon-category f-fr w-color" @click="showPopup"></i>
        </div>
        <!--显示关键词-->

        <!--banner-->
        <div class="banner-main">
          <img class="banner-pic" :src=pinpaiStore.advert alt="">
        </div>

        <!--<div class="warranty-main b-white f-oh">
          <ul class="f-fr warranty-ul f-oh">
            <li class="warranty-row f-fl f-oh" v-for="(item,i) in warrantyMain" :key="i">
              <div class="row-inner  f-oh">
                <img class="img-pic f-fl" :src=item.imgSrc alt="">
                <p class="word fontSize-10 f-fl">{{ item.word }}</p>
              </div>
            </li>
          </ul>
        </div>-->
        <!--店铺开始-->
        <div class="store-profile fontSize-10 b-white f-oh">
          <div class="head-profile f-fl f-oh">
            <img class="head-img" :src=pinpaiStore.logo alt="">
            <p class="store-name fontSize-16 ">{{pinpaiStore.storeName}}</p>
          </div>
          <div class="store-right-content f-fr f-oh">
            <div class="store-right store-code f-fl" @click = 'showQRCode'>
              <i class="top icon iconfont icon-erweima"></i>
              <p class="word">店铺二维码</p>
            </div>
            <div class="store-right fans-num f-fl m-left15">
              <p class="top fans fontSize-16" >{{ pinpaiStore.enshrineCount }}</p>
              <p class="word" style="padding-top: 0.5rem;">粉丝数</p>
            </div>
            <div class="store-right collect-store f-fl m-left15" @click="collectStoreBtn()">
              <!--<i class="icon iconfont icon-shoucang8"></i>-->
              <img class="top shoucangImg" :src=yiCollectImg alt="" v-if="isEnshrine" >
              <img class="top shoucangImg" :src=notCollectImg alt="" v-else >
              <p class="word" style="padding-top: 0.5rem;" v-text="shoucangZhuangtai"></p>
            </div>
          </div>
        </div>
        <!--店铺产品类别-->
        <div class="prolist-content b-white fontSize-10">
          <div class="prolist-head">
            <ul class="prolist-head-main f-oh">
              <li class="prolist-head-row f-fl" v-for="(item,i) in navlists" :key="i" :class="{ activeClass : navIndex === i }">
                <div class="li-inner" :class="{ activeClass : navIndex === i }" @click="navFunc(i)">
                  <img class="img-pic" :src = item.blueImg alt="" v-if="i === navIndex">
                  <img class="img-pic" :src=item.greyImg alt="" v-else>
                  <p class="word"> {{ item.name }} </p>
                </div>
              </li>

            </ul>
          </div>

        </div>
        <div class="pro-lists p-top10 b-white ">
          <pripro-component :proDetailData = 'proDetailData'></pripro-component>
          <p class="pointer fontSize-14" v-if="isAllgoods">----- 向下滚动加载更多 -----</p>
        	<p class="pointer fontSize-14" v-else>----- 已全部加载完毕 -----</p>
        </div>

      </div>
    </scroller>
    <!--点击菜单按钮弹窗-->
    <div v-if="isShowBlackCover" class="black-cover" @click="hidePopup"></div>

    <div class="showPop-content" v-if="isShowPop">
      <div class="item-list-content">
        <div class="item-list-main fontSize-14">
          <dt class="item-row f-oh" @click="priceChoose()">
            <p class="f-fl">价格</p>
            <i class="icon iconfont icon-moreunfold f-fr" v-if="showPriceChoose"></i>
            <i class="icon iconfont icon-more f-fr" v-else></i>
            <span class="f-fr" v-text="priceText"></span>
          </dt>
          <dt class="price-lists f-oh" v-if="showPriceChoose">
            <ul class="price-list-main">
              <li class="price-list-row" @click="choosePrice(1)">
                <span>￥0-￥100</span>
              </li>
              <li class="price-list-row" @click="choosePrice(2)">
                <span>￥100-￥500</span>
              </li>
              <li class="price-list-row" @click="choosePrice(3)">
                <span>￥500-￥1000</span>
              </li>
              <li class="price-list-row" @click="choosePrice(4)">
                <span>￥1000-￥3000</span>
              </li>
              <li class="price-list-row" style="background-color: #eee">
                <span>自定义</span>
              </li>
              <li class="edit-price price-list-row f-oh">
                <input class="price-arrange f-fl" type="text f-fl"
                       v-model="searchData.minPrice"
                       placeholder="最低价格">
                <i class="f-fl">—</i>
                <input class="price-arrange f-fl" type="text f-fr"
                       v-model="searchData.maxPrice"
                       placeholder="最高价格">
                <span class="confirm f-fr" @click="confirmChoosePrice()">确定</span>
              </li>
            </ul>
          </dt>
        </div>
        <ul class="item-list-main fontSize-14">
          <li class="item-row f-oh">
            <p class="f-fl">分类</p>
            <span class="f-fr m-right10">{{xuanzhongPinpai}}</span>
            <!--<i class="icon iconfont icon-more f-fr"></i>-->
          </li>
        </ul>
        <ul class="item-list-main fontSize-14" v-for="(item,i) in No1_Items" :key="i"
            @click="clickItem(item)"
        >
          <li class="item-row f-oh">
            <p class="f-fl p-lef-rig24">{{item.name}}</p>
            <i class="icon iconfont icon-moreunfold f-fr" v-if="item.checked"></i>
            <i class="icon iconfont icon-more f-fr" v-else></i>
          </li>
          <ul class="detail-main p-lef-rig24 f-oh" v-if="item.checked">
            <li class="detail-row f-fl"
                @click="clickDetail(key)"
                v-for="(key,j) in No2_Items" :key="j">
              <span class="detail">{{key.name}}</span>
            </li>
          </ul>
        </ul>
      </div>
      <div class="bottom-btns">
        <span class="reset" @click="reset()">重置</span>
        <span class="confirm" @click="confirmBtn()">确定</span>
      </div>
    </div>
    <!--QRCode show here-->
    <!--<div v-if="isShowQRCode" class="full-screen">-->
      <div class="image-show-here" v-if="isShowQRCode">
        <!--<p class="back-img-word">品牌合作商</p>-->
        <div class="img-main QRCode-img">
        	<img :src=QRCode />
        </div>
        <i class="icon iconfont icon-close" @click="hideQRCode"></i>
      </div>
    <!--</div>-->
    <!--<div class="black-full-screen" v-if="isShowQRCode" ></div>-->
    <!--<div v-if="isUnloadPro"></div>-->
  </div>
</template>
<script>
  import priproComponent from "./../../../../subcomponents/pripro-component.vue";
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import { Scroller } from 'vux'
  import { TabItem ,Indicator, Toast, Popup ,MessageBox } from "mint-ui";
  import $ from "jquery"; //导入jquery
//import '../../../../common/jq.min';
  // let Base64 = require('js-base64').Base64;
  export default {
    name : 'brandStore-keep-alive',
    inject: ['reload'],
    data (){
      return{
        shareUrl: '',
      	isAllgoods:true,
        yiCollectImg : '@/../static/image/home/collected.png',
        notCollectImg : '@/../static/image/home/notCollect.png',
        shoucangZhuangtai : '未收藏',
        fansNum : 12000,
        isCollected : false,
        isShowPop: false,
        isShowBlackCover : false,
        isShowHotWord : false,
        isUnloadPro : false,
        isShowQRCode : false,
        xuanzhongPinpai : '',
        searchData: {
          keyword : '',
          maxPrice : '',
          minPrice : '',
          pageNum : 1,
          pageSize : 10,
          sortBy : '',
          sortDir : '',
        },
        No1_Items : [],
        No2_Items : [],
        priceText :'',
        brandId : '',
        showPriceChoose : false,
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
            key : 'hom',
            name : '店铺首页'
          },
          {
            blueImg : '@/../static/image/home/brand_store/pro3b.png',
            greyImg : '@/../static/image/home/brand_store/pro3g.png',
            key : 'all',
            name : '全部商品'
          },
          {
            blueImg : '@/../static/image/home/brand_store/newPro3b.png',
            greyImg : '@/../static/image/home/brand_store/newPro2g.png',
            key : 'newPro',
            name : '店铺上新'
          },
          {
            blueImg : '@/../static/image/home/brand_store/cart3b.png',
            greyImg : '@/../static/image/home/brand_store/cart3g.png',
            key : 'car',
            name : '购物车'
          },
        ],
        navIndex : 0,
        // bannerImg : '',
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
        pinpaiStore : {},//品牌店铺列表
        proDetailData : [

        ],
        user : {},//user 数据
        userWx : {},//userWx数据
        vipHeadProfile: '',//头像
        userId : null,//用户id userId
        openId : null,
        pageNum : 1,
        pageSize : 10,
        type : 5,
        isEnshrine : false,//店铺是否收藏了
        isRequest : true,
        QRCode : null,
        No1_Items:[],
        flag:true,
      }
    },
    methods : {
      clickDetail(key){
        this.brandId = key.id;
        this.xuanzhongPinpai = key.name
      },
    	toMine() {
	      this.$router.push({
	        path: '/mine'
	      })
	    },
      getQRCode(){

      },
      //点击确定 传参请求数据
      confirmBtn(){
        this.proInfosAxios();
        this.showPop = false;
        this.isShowPop = false;
        this.isShowBlackCover = false;
      },
      choosePrice(n){
        if(n === 1){
          this.priceText = '￥0-￥100'
          this.searchData.minPrice = 0;
          this.searchData.maxPrice = 100;
        }else if(n === 2){
          this.priceText = '￥100-￥500'
          this.searchData.minPrice = 100;
          this.searchData.maxPrice = 500;
        }else if(n === 3){
          this.priceText = '￥500-￥1000'
          this.searchData.minPrice = 500;
          this.searchData.maxPrice = 1000;
        }else if(n === 4){
          this.priceText = '￥1000-￥3000'
          this.searchData.minPrice = 1000;
          this.searchData.maxPrice = 3000;
        }
      },
      priceChoose(){
        this.showPriceChoose = !this.showPriceChoose;
      },
      //生成二维码 --
      makeQRcode(){
        var vm = this;
        setTimeout(function(){
//        console.log(jQuery('.QRCode-img'),'元素')
          var qWidth = $('.QRCode-img').width();
          var qHeight = $('.QRCode-img').height();
          jQuery('.QRCode-img').qrcode({
            render: "canvas", //也可以替换为table
            width: qWidth,
            height: qHeight,
            text: vm.QRcode//
          });
        },50)
      },
      //滚动请求
      scrollerRequire(){
        if(this.isRequest){
          this.pageNum ++;
          this.isRequest = false;
          var vm = this;
          let hash = window.location.hash;
          hash = hash.split('=');
          let storeId = hash[1];//传递过来的id
          $.ajax({
            url:comLink.yxtHost + '/product/brandProducts',
            data:{
              id : storeId,
              pageNum : vm.pageNum,
              pageSize : vm.pageSize,
              openid:sessionStorage.openid,
              type : vm.type,
              'keyword' : vm.hotValue,
              'maxPrice' : vm.searchData.maxPrice,
              'minPrice' : vm.searchData.minPrice,
              'categoryId' : vm.brandId,
              'brandId' : storeId,
              'sortBy' : vm.searchData.sortBy,
              'sortDir' : vm.searchData.sortDir
            },
            dataType:'json',
            type:'post',
            success:function (data) {
              setTimeout(function(){//todo
                vm.isRequest = true;
              },1000);
              if(data.code == 1){
                console.log(data.data,'data')
                if(data.data && data.data.length > 0){
                  let newData = data.data;
                  for( var i = 0,l = newData.length;i < l;i ++){
                    newData[i].logo = comLink.yxtImgHost + newData[i].logo;
                    newData[i].mulImagerUrl = comLink.yxtImgHost + newData[i].mulImagerUrl;

                    newData[i].periodShow1 = newData[i].periodShow.split('x')[0];
                    newData[i].periodShow2 = newData[i].periodShow.split('x')[1];
                  }
                  vm.proDetailData = vm.proDetailData.concat(newData);
                  if(data.data.length < 20){
                		vm.isAllgoods=false;
                  }
                }else{
                  vm.isAllgoods=false;
                  vm.pageNum--;
                }
              }else {
                vm.pageNum--;
              }
            },
            error:function (data) {

            }
          })
        }
      },
      //点击头部搜索 跳转搜索页面 关键词搜索
      searchBlur(){
      	$('input').blur();
        let hash = window.location.hash;
        hash = hash.split('=');
        let storeId = hash[1];//传递过来的id
        this.$router.push({
          path : '/home/storeSearch',
          query : {
            id : storeId
          }
        })
      },
      collectStoreBtn(){
        if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
          Toast({
            message: '请先登陆',
            duration: 2000
          });
          return;
        }

        var vm = this;
        if(this.isEnshrine){
          MessageBox.confirm('确定取消收藏?').then(action => {
            this.collectStoreAxios();
            this.shoucangZhuangtai = '未收藏';
            this.pinpaiStore.enshrineCount --;
          });
        }else{
          this.collectStoreAxios();
          this.shoucangZhuangtai = '已收藏';
          this.pinpaiStore.enshrineCount ++;
        }
        vm.reload();
      },
      //收藏店铺
      collectStoreAxios: function(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let storeId = hash[1];//传递过来的id
        axios.get(comLink.yxtHost + '/brand/enshrineBrand', {
          params:{
            brandId : storeId,
            openid:sessionStorage.openid,
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            console.log('收藏店铺',response);
            if(response.data.data === true){
              vm.isEnshrine = true;
              Toast({
                //mintui提示效果
                message: response.data.msg,
                duration: 2000,
              });
            }else{
              vm.isEnshrine = false;

            }
          }else{

          }
        })
          .catch(function(res) {

          });
      },
      //右侧弹出框商品搜索功能
      rightSearchAxios:function(){
      	var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let storeId = hash[1];//传递过来的id
        $.ajax({
          url:comLink.yxtHost + '/product/search',
          data:{
          	pageNum : 1,
          	pageSize : 10,
            brandId : storeId,
            openid:sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
          	console.log(data)
            if(data.code == 1){

            }
          },
          error:function (data) {

          }
        })
      },
      //店铺数据
      storeAxios: function(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let storeId = hash[1];//传递过来的id
        axios.get(comLink.yxtHost + '/brand/brandStore', {
          params:{
            brandId : storeId,
            openid:sessionStorage.openid,
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            vm.pinpaiStore = response.data.data.brand;//获取店铺数据 --对象
            if(response.data.data.isEnshrine === 1){
              vm.isEnshrine = true;
              vm.shoucangZhuangtai = '已收藏'
            }else{
              vm.isEnshrine = false;
              vm.shoucangZhuangtai = '未收藏'
            }
            console.log(vm.pinpaiStore,'vm.pinpaiStore');
            if(vm.pinpaiStore.count === null){
              vm.pinpaiStore.count = 0
            }
            vm.pinpaiStore.advert = comLink.yxtImgHost + vm.pinpaiStore.advert;
            vm.pinpaiStore.logo = comLink.yxtImgHost + vm.pinpaiStore.logo;

          }else{
            // alert('失败')
          }
        })
          .catch(function(res) {
            // Toast({
            //   //mintui提示效果
            //   message: "数据请求失败",
            //   duration: 2000,
            // });
          });
      },
      GetQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      },
      //获取店铺二维码地址
      QRCodeAxios: function(){
        var openid = sessionStorage.openid;
        if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
          openid = this.GetQueryString('openid');
          if(openid != undefined && openid != null && openid != 'undefined' && openid != 'null') {
            sessionStorage.setItem('openid', openid);
          }
        }

        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let storeId = hash[1];//传递过来的id
        $.ajax({
          url:comLink.yxtHost + '/brand/processQrCode',
          data:{
            brandId : storeId,
            openid: openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.QRCode = comLink.yxtImgHost+data.data;
           	 console.log(vm.QRCode,'vm.QRCode')

            }
          },
          error:function (data) {

          }
        })
      },
      //获取产品信息
      proInfosAxios: function(){
      	this.flag=false;
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let storeId = hash[1];//传递过来的id
        // Base64.encode(proId,111);
        vm.pageNum = 1;
        axios.get(comLink.yxtHost + '/product/brandProducts', {
          params:{
            id : storeId,
            pageNum : vm.pageNum,
            pageSize : vm.pageSize,
            openid:sessionStorage.openid,
            type : vm.type,

            'keyword' : vm.hotValue,
            'maxPrice' : vm.searchData.maxPrice,
            'minPrice' : vm.searchData.minPrice,
            'categoryId' : vm.brandId,
            'brandId' : storeId,
            'sortBy' : vm.searchData.sortBy,
            'sortDir' : vm.searchData.sortDir
          }
        }).then(function(response) {
          console.log('产品信息response',response);
          if (response.data.code == 1) {
            vm.proDetailData = [];
            vm.proDetailData = response.data.data;
            console.log(vm.proDetailData,'shuju ')
            for( var i = 0,l = vm.proDetailData.length;i < l;i ++){
              vm.proDetailData[i].logo = comLink.yxtImgHost + vm.proDetailData[i].logo;
              vm.proDetailData[i].mulImagerUrl = comLink.yxtImgHost + vm.proDetailData[i].mulImagerUrl;

              vm.proDetailData[i].periodShow1 = vm.proDetailData[i].periodShow.split('x')[0];
              vm.proDetailData[i].periodShow2 = vm.proDetailData[i].periodShow.split('x')[1];
            }
            if(response.data.data.lengnth<10){
            	vm.isAllgoods=false;
            }

          }else{

          }
        })
          .catch(function(res) {
            // Toast({
            //   //mintui提示效果
            //   message: "数据请求失败",
            //   duration: 2000
            // });
          });
      },
      navFunc : function (i) {
      	if(!this.flag){
      		if(this.navIndex==i){
	    	  	return false;
	    	  }
      	}
      	this.flag=true;
    	  this.pageNum = 1;
    	  this.isAllgoods=true;
        console.log(11111)
        this.navIndex = i;
        if(this.navlists[this.navIndex].key === 'newPro'){
          this.type = 2;
          this.proInfosAxios()
        }else if(this.navlists[this.navIndex].key === 'all'){
          this.type = null;
          this.proInfosAxios()
        }else if(this.navlists[this.navIndex].key === 'hom'){
          this.type = 5;
          this.proInfosAxios()
        }else{
          this.$router.push({
            path : '/cart',
          })
        }
      },
      showPopup : function(){//筛选菜单弹出
        this.isShowPop = true;
        this.isShowBlackCover = true;//黑色遮罩层弹出
      },
      hidePopup : function(){
        this.isShowPop = false;
        this.isShowBlackCover = false;
        this.isShowQRCode = false;
      },
      showQRCode : function(){//弹出二维码
        if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
          Toast({
            message: '请先登陆',
            duration: 2000
          });
          return;
        }
        this.isShowQRCode = true;
        this.isShowBlackCover = true;
     		this.QRCodeAxios();

//      this.makeQRcode();
      },
      hideQRCode : function(){//隐藏二维码
        this.isShowQRCode = false;
        this.isShowBlackCover = false;
      },
      //点击一级目录
      clickItem(item){
        if(item.checked){
          item.checked = false
        }else{
          for(var i = 0,l = this.No1_Items.length;i < l;i ++){
            this.No1_Items[i].checked = false;
          }
          item.checked = true;
        }
        this.No1_Items.splice(100,1);
        this.parentId = item.id;
        this.detailFenleiAxios();
      },
      moreFenleiAxios: function(){
        var vm = this;
        axios.get(comLink.yxtHost + '/category/categoryList', {
          params:{
            openid : sessionStorage.openid,
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            console.log(response,55555555555)
            vm.No1_Items = response.data.data;
            for(var i = 0,l = vm.No1_Items.length;i < l;i ++){
              vm.No1_Items[i].checked = false;
            }
            console.log(vm.No1_Items,'vm.No1_Items')
            // vm.parentId = vm.morePingdao[vm.listNum].id;//已经获取到需要传参id
            // vm.detailFenleiAxios()//调用二级目录请求函数
          }
        })
          .catch(function(res) {

          });
      },
      reset(){
        this.axiosLinkSearch = false;
        this.searchData.keyword = '';
        this.searchData.maxPrice = '';
        this.searchData.minPrice = '';
        // this.showPriceChoose = true;
        $('.f-fr').text('');
        this.brandId = '';
        this.xuanzhongPinpai = '';
      },
      // //点击一级目录弹出详细品牌
      detailFenleiAxios: function(){
        var vm = this;
        axios.get(comLink.yxtHost + '/category/categoryList', {
          params:{
            parentId : vm.parentId,
            openid : sessionStorage.openid,
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            // alert(response.data.data);
            console.log(response,'分类列表');
            vm.No2_Items = response.data.data;
            console.log(vm.No2_Items,'No2_Items')
            // vm.morePingdao = response.data.data;
            //添加图片前缀
            // vm.addQianzhui();
          }
        })
          .catch(function(res) {

          });
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
            console.log(data, '登陆用户');
            if (data.code == 1) {
              console.log(data.data.user.phone, '登陆用户手机号');
            } else {
              sessionStorage.clear();
            }
          },
        })
      },
      sendWxtoOther() {
        var _vm = this
        let hash = window.location.hash;
        hash = hash.split('=');
        let brandId = hash[1];//传递过来的id

        $.ajax({
          url: comLink.yxtHost + '/brand/getShareBrandUrl',
          data: {
            'openid': sessionStorage.openid,
            'brandId': brandId
          },
          dataType: 'json',
          type: 'post',
          success:function(data){
            console.log(data)
            if(data.code == 1){
              _vm.shareUrl = data.data;
              //w微信分享
              $.ajax({
                url: comLink.yxtHost + '/user/sign',
                data: {
                  'url': window.location.href,
                  'openid' :sessionStorage.openid
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
                        desc: _vm.pinpaiStore.storeName,
                        link: 'https://www.yxtccb.com/yxt/#/home/brandStoreRouter?brandId='+brandId,
//                      link: _vm.shareUrl,
                        imgUrl: _vm.pinpaiStore.logo,
                        success: function() {

                        },
                        cancel: function() {

                        }
                      });

                      //分享朋友圈
							        wx.onMenuShareTimeline({
							        		title: '邮讯通商城龙卡专区',
							            desc: _vm.pinpaiStore.storeName,// 分享标题
							            link: 'https://www.yxtccb.com/yxt/#/home/brandStoreRouter?brandId='+brandId,
							            imgUrl: _vm.pinpaiStore.logo, // 分享图标
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
    mounted (){
    	$(window).scrollTop('0');
      var openid = sessionStorage.openid;
      if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
        openid = this.GetQueryString('openid');
        if(openid != null && openid != 'null' && openid != undefined && openid != 'undefined' && openid != ''){
          sessionStorage.setItem('openid', openid);
          this.getManInfos();//获取个人信息
        }
      }

      this.storeAxios();
      // this.makeQRcode();
      // this.qrcode()
      this.rightSearchAxios();
      this.moreFenleiAxios();//一级分类
      // this.proInfosAxios();
      this.navFunc(0);
      this.sendWxtoOther();
    },
    components : {
      priproComponent,
      Scroller
    },
//  watch: {
//    '$route'(to,from) {
//      console.log(to.name,'to的名字')
//
//      if(from.name !== 'proDetailRouter' && to.name == 'brandProRouter'){
//        this.$nextTick(() => {
//          this.$refs.myScroller.reset({top:0})
//  				$(window).scrollTop('0')
//
//        })
//        this.storeAxios();
//        this.QRCodeAxios();
//        this.proInfosAxios();
//
//      }
//    }
//  }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
   .QRCode-img img{
   	 width: 100%;
   	 height: 100%;
     border-radius: 2rem;
   }
   .pointer{
   	background-color: #eee;
   	padding: 1.5rem 0;
  	text-align: center;
  	color: #999;
  }
  .brand-store-home {
		.showPop-content{
      position: fixed;
      top: p(90);
      bottom: 0;
      right: 0;
      width: p(550);
      background: white;
      z-index: 9;
      overflow-y: scroll;
      animation:myfirst 0.5s ;
      @keyframes myfirst
      {
        0%   {right:0;top: 100%;}
        100% { right:0; top:p(90);}
      }
      .item-list-content{
        padding-bottom: p(90);
        width: 100%;
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
          .detail-main{
            width: 100%;
            border-bottom: 0.5px solid #ccc;
            padding: p(20) p(24) p(30) p(48);

            .detail-row{
              padding: 1rem;

              .detail{
                padding: 1rem;
                display: inline-block;
                border: 0.5px solid #ccc;
                border-radius: p(10);
                margin: p(5) p(5) 0 0;
              }
            }
          }
          .price-lists{
            width: 100%;
            text-align: center;
            /*padding: 0 p(24);*/
            border-bottom: 0.5px solid #eee;
            .edit-price{
              line-height: p(54);
              .price-arrange{
                display: inline-block;
                width: 30%;
                height: 99%;
                text-align: center;
              }
              .confirm{
                display: inline-block;
                height: p(40);
                line-height: p(36);
                margin-top: p(10);
                text-align: center;
                width: p(100);
                box-sizing: border-box;
                border: 0.5px solid #ccc;
                border-radius: p(2);
              }
            }

            .price-list-main{
              width: 100%;
              .price-list-row{
                width: 100%;
                height: p(60);
                font-size: p(26);
                color: #333333;
                line-height: p(60);
                padding: 0 p(10);
                text-align: left;
                border-bottom: 0.5px solid #ccc;
              }
            }
          }
        }
      }
      .bottom-btns{
        position: fixed;
        width: p(550);
        bottom: 0;
        right: 0;
        z-index: 9;
        /*width: 100%;*/
        height: p(90);
        line-height: p(90);
        display: flex;
        justify-content: space-around;
        overflow: hidden;
        .reset,.confirm{
          display: inline-block;
          width: 50%;
          float: left;
          height: 100%;
          line-height: p(90);
          text-align: center;
        }
        .reset {
          color: $bgBlue;
          background: $danlan;
        }
        .confirm{
          color: white;
          background: $bgBlue;
        }
      }
    }
    /*头部搜索框--开始*/
    .search-main {
      height: p(90);
      width: 100%;
      background: #307ff5;
      padding: 0 p(10) 0 p(25);
      line-height: p(90);


      .icon-wode1{
        font-size: p(50);
        margin-left: p(35);
        margin-right: p(10);

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
      width: 100%;
			height: 17.2rem;
      .banner-pic{
        width: 100%;
        height: 100%;
      }
    }
    /*warranty lists*/
    .warranty-main{
      padding: p(10) 0;
      margin-top: p(-4);
      .warranty-ul{
        /*margin-right: p(24);*/
        width: 100%;
        /*display: flex;*/
        /*justify-content: space-evenly;*/
        .warranty-row{
          height: p(33);
          /*margin-left: p(10);*/
          width: 25%;
          text-align: center;
          .row-inner{
            display: inline-block;
            height: 100%;
            overflow: hidden;


            .img-pic{
              width: 1.875rem;
              height: 1.875rem;
              margin-right: p(4);
            }
            p{
            	margin-top: p(8);
            }
          }

        }
      }
    }
    /*store*/
    .store-profile{
      color: #a1a1a1;
      width: 100%;
      height: p(140);
      padding: 0 p(22);
      box-sizing: border-box;
      border-bottom: p(2) solid #999999;
      .head-profile{
      	position: absolute;
      	top: 21rem;
      	text-align:center;
        .head-img{
          display: block;
          width: p(90);
          height: p(90);
          background: #ccc;
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
        margin-top: p(35);
        .store-right{
          text-align: center;
          position:relative;
          >img{
          	display: inline-block;
          	margin-top: 0.4rem;
          }
          .fans{
            margin-top:0.59rem;
            color: black;
          }

          .word{
            margin-top: p(10);

          }
          .top{
            height: 1.9rem;

          }
        }
        .shoucangImg{
          width: p(34);
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
              }
            }
            .li-inner.activeClass{
              color: #307ff5;
            }
          }
          .prolist-head-row.activeClass{
          	border-bottom: 0.15rem solid #307FF5;
          }
        }
      }
    }

  }

  .showPop-content{
    position: fixed;
    top: p(90);
    right: 0;
    bottom: 0;
    left: p(200);
    background: white;
    z-index: 9;
    overflow-y: scroll;
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
    opacity: 0.4;
  }
  /*弹出二维码*/
  /*.full-screen{*/
    /*position: fixed;*/
    /*!*background: black;*!*/
    /*!*opacity: 0.5;*!*/
    /*top: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*z-index: 99;*/

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
      margin-top: p(10);
      font-size: p(65);
      width: p(65);
      height: p(65);
      color: white;
      font-weight: bold;
    }
  /*}*/
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

</style>
