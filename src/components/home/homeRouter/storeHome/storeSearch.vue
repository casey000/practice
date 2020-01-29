<template>
  <div class="store-search-content">
  	<div style="width: 100%; height: 0.1rem;"></div>
    <scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire" ref="myScroller"  @on-scroll="lostblur()">
  	<div class="">
	    <div class="search-main f-oh">
	      <!--<search-component></search-component>-->
	      <!--搜索框-->
	      <!--<i class="icon iconfont icon-wode1 w-color f-fl"></i>-->
	      <div class="search-inp-main f-oh f-fl f-pr">
	        <div class="select-store-all">
	          <span @click="showItems()" class="word">{{allStore}}</span>
	        </div>
	        <div class="items" v-if="isShowItems">
	          <span @click="choose(1)">店铺</span>
	          <span @click="choose(2)">全部</span>
	        </div>
	        <input v-focus class="head-search f-fl" v-model=hotValue type="text" placeholder="请输入店铺或商品" @focus="clickInput()">
	      </div>
	      <!--类别按钮-->
	      <dt class="sousuo-btn f-fl">
	        <span class="sousuo-word" @click="searchBtn()">搜索</span>
	      </dt>
	    </div>
	    <div v-if="isShowHotWord">
	      <div class="hot-word"  @click="hideHotWords()">
	        <dt class="title">
	          <img class='img-pic' src="" alt="">
	          <span class="fontSize-14">热门搜索</span>
	        </dt>
	        <ul class="hot-word-main fontSize-12 f-oh">
	          <li class="hot-word-row f-fl" @click="chooseHotWords(item)" v-for="(item,i) in howWords" :key="i">
	            <span>{{item.hotWordName}}</span>
	          </li>
	        </ul>
	      </div>
	    </div>

	    <div class="pro-lists">
	        <div class="nav-choose">

		        <ul class="nav-choose-main f-oh">
		          <li class="nav-choose-row f-fl fontSize-14 " v-for="(item,i) in navs" :key="i"
		              @click="changeColor(i)"
		          >
		            <div class="f-oh row-main" :class="{'c-word' : wNum === i}">
		              <p class="f-fl">{{ item.name }}</p>
		              <i :class = item.downClass v-if="upDown === i"></i>
		              <i :class = "item.upClass" v-else></i>
		            </div>
		          </li>
		          <li class="nav-choose-row filte-btn f-fl f-oh fontSize-14 ">
		            <div class="btn fontSize-14 f-pr" @click="showPopup" v-if="!showPriceChoose">
		              <p class="f-fl btn p-right12">筛选</p>
		              <i class="shaixuan-icon"></i>
		            </div>
		            <div class="btn fontSize-14 f-pr" @click="showPopup" v-else>
		              <p class="f-fl btn p-right12" style="color: #307ff5">筛选</p>
		              <i class="shaixuan-icon"></i>
		            </div>
		          </li>
		        </ul>

	        </div>
	        <pripro-component :proDetailData = 'proDetailData'></pripro-component>
	        <!--<p class="pointer fontSize-14" v-if="isAllgoods">----- 向下滚动加载更多 -----</p>-->
	        <p class="pointer fontSize-14" v-if="isAllgoods">
	        	<span id="scrollBottom" style="width: 100%; height: 3rem;display: inline-block; ">
	        		----- 向下滚动加载更多 -----
	        	</span>
	        </p>
	        <p class="pointer fontSize-14" v-else>----- 已全部加载完毕 -----</p>
	    </div>
    </div>
    </scroller>

    <div class="showPop-content" v-if="showPop">
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
    <div v-if="isShowBlackCover" class="black-cover" @click="hidePopup"></div>
  </div>
</template>
<script>
  import priproComponent from "./../../../../subcomponents/pripro-component.vue";
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  // import QRCode from 'qrcodejs2'
  import {  Scroller } from 'vux';
  import { Navbar, TabItem ,Indicator, Toast, Popup, DatetimePicker,MessageBox } from "mint-ui";
  import $ from "jquery"; //导入jquery
//import '../../../../common/jq.min';
//import '../../../../common/jquery.qrcode.min';



  export default{
    name : 'storeSearch',

    data (){
      return {
        isAllgoods : true,
        isShowHotWord : false,
        isShowBlackCover : false,
        showitems : false,
        allStore : '店铺',
        isShowItems : false,
        hotValue : '',
        howWords : [],
        proDetailData : [],//产品列表
        pageNum : 1,
        pageSize : 10,
        navs : [
          {
            name : '综合',
            downClass : 'icon iconfont icon-sanjiaoxing-down',
            upClass : 'icon iconfont icon-sanjiaoxing-up'
          },
          {
            name : '销量',
            downClass : 'icon iconfont icon-sanjiaoxing-down',
            upClass : 'icon iconfont icon-sanjiaoxing-up'
          },
          {
            name : '价格',
            downClass : 'icon iconfont icon-sanjiaoxing-down',
            upClass : 'icon iconfont icon-sanjiaoxing-up'
          },
          {
            name : '时间',
            downClass : 'icon iconfont icon-sanjiaoxing-down',
            upClass : 'icon iconfont icon-sanjiaoxing-up'
          }
        ],
        loading: "@/../static/img/load.gif",
        wNum : 0,
        upDown : 0,
        No1_Items : [],
        No2_Items : [],
        showPriceChoose : false,
        showPop : false,
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
        priceText :'',
        isShowBlackCover : false,
        brandId : '',
        categoryId : '',
        isRequest:true,
      }
    },
    mounted (){
      // this.getHotWord();
      this.searchProduct();
      this.hotWordsAxios();
      this.moreFenleiAxios();//一级分类

      let hash = window.location.hash;
      this.brandId = hash.split('=')[1];
    },
    methods : {
    	lostblur(){
    		$('input').blur()
    	},
    	 loadings(){
				$('#scrollBottom').html('<img style="width:3rem; height:3rem;" src=" '+this.loading +'"/>');
			},
      clickDetail(key){
        this.categoryId = key.id;
        this.xuanzhongPinpai = key.name
      },
      //
      hideHotWords(){
        if(this.isShowHotWord){
          this.isShowHotWord = false
        }
      },
      // //获取t弹窗分类 左侧 一级目录列表
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
            alert(response.data.data);
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
      //点击选中详细品牌 同步到全部上
      clickDetail(key){
        this.brandId = key.id;
        this.xuanzhongPinpai = key.name
      },
      reset(){
        this.axiosLinkSearch = false;
        this.searchData.keyword = '';
        this.searchData.maxPrice = '';
        this.searchData.minPrice = '';
        this.priceText = '';
        // this.showPriceChoose = true;
        $('.f-fr').text('');
        this.brandId = '';
        this.xuanzhongPinpai = '';
      },
      //点击确定 传参请求数据
      confirmBtn(){
        this.searchProduct();
        this.showPop = false;
        this.isShowBlackCover = false;
      },
      //点击黑色弹窗，隐藏弹出框
      hidePopup : function(){
        this.showPop = false;
        this.isShowBlackCover = false;
        // this.isShowTongji = false;
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
      // //获取t弹窗分类 左侧 一级目录列表
      moreFenleiAxios: function(){
        var vm = this;
        axios.get(comLink.yxtHost + '/category/categoryList', {
          params:{
            openid : sessionStorage.openid,
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            vm.No1_Items = response.data.data;
            for(var i = 0,l = vm.No1_Items.length;i < l;i ++){
              vm.No1_Items[i].checked = false;
            }
            // vm.parentId = vm.morePingdao[vm.listNum].id;//已经获取到需要传参id
            // vm.detailFenleiAxios()//调用二级目录请求函数
          }
        })
          .catch(function(res) {

          });
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
            vm.No2_Items = response.data.data;
          }
        })
          .catch(function(res) {

          });
      },

      priceChoose(){
        this.showPriceChoose = !this.showPriceChoose;
      },
      //关键词数据
      hotWordsAxios(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/hotWord/list',
          data:{
            pageNum : vm.pageNum,
            openid:sessionStorage.openid,
            pageSize : vm.pageSize,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.howWords = data.data;
              console.log(vm.howWords,111111)
            }
          },
          error:function (data) {

          }
        })
      },
      //
      showItems(){
        this.isShowItems = !this.isShowItems;
      },
      changeColor : function (i) {
        console.log(this.upDown,this.wNum,i);

        if(this.upDown === this.wNum && this.wNum === i) {
          this.upDown = -1;
          this.searchData.sortDir = 'asc';
          if(i === 0) {
            this.searchData.sortBy = 'sale ' + this.searchData.sortDir + ',mall_price ' + this.searchData.sortDir + ',create_time';
          }
          if(i === 1) {
            this.searchData.sortBy = 'sale';
          }
          if(i === 2) {
            this.searchData.sortBy = 'mall_price';
          }
          if(i === 3) {
            this.searchData.sortBy = 'create_time';
          }
          this.searchProduct();
          return;
        }
        if(this.wNum === i) {
          this.upDown = i;
          this.searchData.sortDir = 'desc';
        } else {
          this.wNum = i;
          this.searchData.sortDir = 'asc';
        }

        if(i === 0) {
          this.searchData.sortBy = 'sale ' + this.searchData.sortDir + ',mall_price ' + this.searchData.sortDir + ',create_time';
        }
        if(i === 1) {
          this.searchData.sortBy = 'sale';
        }
        if(i === 2) {
          this.searchData.sortBy = 'mall_price';
        }
        if(i === 3) {
          this.searchData.sortBy = 'create_time';
        }
        this.searchProduct();
      },
      showPopup : function(){
        $('.showPop-content').css('display', 'block');
        this.showPop = true;
        this.isShowBlackCover = true;
      },
      //
      choose(n){
        let hash = window.location.hash;
        let indexNum = n;
        if(indexNum === 1){
          this.allStore = '店铺';
          this.brandId = '';
        }else{
          this.allStore = '全部';
          this.brandId =  hash.split('=')[1];
        }
        this.isShowItems = false;
      },
      //input 获取焦点
      clickInput(){
        this.isShowHotWord = true;
      },
      //点击搜索按钮
      searchBtn(){
        this.isShowHotWord = false;
        this.searchProduct();
      },
      //点击关键词 赋值到input中
      chooseHotWords(item){
        this.isShowHotWord = false;
        // this.hotValue = item.hotWordName;//没有数据 先注释
        this.hotValue = item.hotWordName;
        this.searchProduct();
      },
      confirmChoosePrice : function() {
        // $('.showPop-content').css('display', 'none');
        this.searchProduct();
        this.showPriceChoose = false
      },
      //滚动请求
      scrollerRequire(){
        if(this.isRequest){
          this.searchData.pageNum ++;
          this.isRequest = false;
          var vm = this;
          let hash = window.location.hash;
          hash = hash.split('=');
          let storeId = hash[1];//传递过来的id
          $.ajax({
            url:comLink.yxtHost + '/product/search',
            data:{
              'keyword' : vm.hotValue,
              'maxPrice' : vm.searchData.maxPrice,
              'minPrice' : vm.searchData.minPrice,
              'pageNum' : vm.searchData.pageNum,
              'pageSize' : vm.searchData.pageSize,
              'categoryId' : vm.brandId,
              'openid' : sessionStorage.openid,
              'brandId' : storeId,
              'sortBy' : vm.searchData.sortBy,
              'sortDir' : vm.searchData.sortDir
            },
            dataType:'json',
            type:'post',
            beforeSuccess: vm.loadings(),//执行ajax前执行loading函数.直到success

            success:function (data) {
							$('#scrollBottom').html('----- 向下滚动加载更多 -----');
              setTimeout(function(){//todo
                vm.isRequest = true;
              },1500);
              if(data.code == 1){
                if(data.data && data.data.length > 0){
                  let newData = data.data;
                  for( var i = 0,l = newData.length;i < l;i ++){
                    newData[i].logo = comLink.yxtImgHost + newData[i].logo;

                    newData[i].periodShow1 = newData[i].periodShow.split('x')[0];
                    newData[i].periodShow2 = newData[i].periodShow.split('x')[1];
                  }
                  vm.proDetailData = vm.proDetailData.concat(newData);
                  if(data.data.length < 10){
                    vm.isAllgoods=false;
                  }
                }else{
                  vm.isAllgoods=false;
                  vm.searchData.pageNum--;
                }
                // vm.proDetailData = data.data;
                // for(var i = 0,l = vm.proDetailData.length;i<l ;i ++){
                //   vm.proDetailData[i].logo = comLink.yxtImgHost + vm.proDetailData[i].logo
                // }
              }else{
                vm.searchData.pageNum--;
              }


              /*if(data.code == 1){
                vm.proDetailData = data.data;
                console.log(vm.proDetailData,'vm.proDetailData')
                for(var i = 0,l = vm.proDetailData.length;i<l ;i ++){
                  vm.proDetailData[i].logo = comLink.yxtImgHost + vm.proDetailData[i].logo;

                  vm.proDetailData[i].periodShow1 = vm.proDetailData[i].periodShow.split('x')[0];
                  vm.proDetailData[i].periodShow2 = vm.proDetailData[i].periodShow.split('x')[1];
                }
              }*/
            },
            error:function (data) {

            }
          })
        }
      },
      //提交搜索请求
      searchProduct: function(){
        this.isShowBlackCover = false;
        var vm = this;
        let storeId = null;
        if( vm.allStore === '全部'){
          storeId = null;
        }else{
          let hash = window.location.hash;
          hash = hash.split('=');
          storeId = hash[1];//传递过来的id
        }
        $.ajax({
          url:comLink.yxtHost + '/product/search',
          data:{
            'keyword' : vm.hotValue,
            'maxPrice' : vm.searchData.maxPrice,
            'minPrice' : vm.searchData.minPrice,
            'pageNum' : vm.searchData.pageNum,
            'pageSize' : vm.searchData.pageSize,
            'categoryId' : vm.brandId,
            'openid' : sessionStorage.openid,
            'brandId' : storeId,
            'sortBy' : vm.searchData.sortBy,
            'sortDir' : vm.searchData.sortDir
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.proDetailData = data.data;
              console.log(vm.proDetailData,'vm.proDetailData')
              for(var i = 0,l = vm.proDetailData.length;i<l ;i ++){
                vm.proDetailData[i].logo = comLink.yxtImgHost + vm.proDetailData[i].logo;

                vm.proDetailData[i].periodShow1 = vm.proDetailData[i].periodShow.split('x')[0];
                vm.proDetailData[i].periodShow2 = vm.proDetailData[i].periodShow.split('x')[1];
              }
            }
          },
          error:function (data) {

          }
        })
      },
    },
    deactivated(){
    	this.reset();
    	this.isAllgoods=true;
    	this.showPop = false;
      this.isShowBlackCover = false;
    },
    components : {
      priproComponent,
	Scroller,

    },
  }
</script>
<style lang="scss">
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  input::-webkit-input-placeholder {
    color: #666 !important;
  }
   .pointer{
  	text-align: center;
  	color: #999;
  	width: 100%;
  	display: inline-block;
  	margin-top: 1.5rem;
  	padding-bottom: 2.5rem;
  	height: 5rem;
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
  .store-search-content{

    .search-main {
      height: p(90);
      width: 100%;
      background: #fff;
      padding: 0 p(30) 0 p(80);
      line-height: p(90);
      border-bottom:1px solid #ddd;
			
      .icon-wode1{
        font-size: p(50);
        margin-left:p(40);
        margin-right: p(5);
      }
      .icon-category{
        font-size: p(50);
        /*margin-left: p(25);*/
      }
      .search-inp-main {
        margin: p(10) 0;
        width: 90%;
        height: p(70);
        border-radius: p(6);
        background: #f5f5f5;
        line-height: p(70);
				position: relative;
        .icon-search {
          position: absolute;
          top: 0;
          left: p(30);
        }
        .head-search {
          width: 100%;
          height: 100%;
          text-align: center;
          background: #f5f5f5;
          border-radius: 1rem;
          font-size: p(24);
        }
        .select-store-all{
          display: inline-block;
          position: absolute;
          top: 0;
          left: p(20);
          color: #666;
          font-size: p(24);
          /*z-index: 11;*/
          .word{
            color: #666;
          }
        }
        .items{
          display: inline-block;
          position: fixed;
          top: p(85);
          left: p(80);
          color: #666;
          font-size: p(24);
          z-index: 11;
          background: #f5f5f5;
          width: p(120);
          box-shadow: 0px p(2) p(6) 0px 
						rgba(5, 0, 0, 0.35);
          padding: 0 2rem;
          /*<!--border-right:p(1) solid $bgBlue;-->*/
          >span{
            display: inline-block;
          }
          >span:nth-child(2){
            border-top: p(1) solid #ccc;
          }
        }
      }
      .search-btn {
        display: inline-block;
        width: 15%;
        color: #666;
        text-align: center;
      }
      .sousuo-btn{
        display: inline-block;
        font-size: p(28);
        color: #666;
        padding-left: p(5);
        height: 100%;
        line-height: p(90);
      }
    }
    .hot-word{
      background: white;
      width: 100%;
      /*bottom: 0;*/
      z-index: 10;
      padding: p(20) p(20) 0 p(20);

      .title{
        /*margin-top: p(20);*/
      }
      .hot-word-main{
        padding: 0 p(20);
        margin-top: p(25);
        .hot-word-row{
          height: p(44);
          line-height: p(44);
          padding: 0 p(10);
          border: p(1) solid #ccc;
          margin: 0 p(15) p(15) 0;
          color: #666;
          border-radius: p(5);
          background: #eee;
          z-index: 11;
        }
      }
    }
    .pro-lists{
      background: white;
      margin-top: p(20);
      .nav-choose{
        width: 100%;

        .nav-choose-main{
          color: #999999;
          .nav-choose-row{
            width: 20%;
            height: p(66);
            line-height: p(66);
            /*box-sizing: border-box;*/
            /*border: p(1) solid #ccc;*/
            text-align: center;

            .row-main{
              display: inline-block;
              margin: 0 auto;
              color: #999999;

            }
            .row-main.c-word{
              color: #307ff5;
            }
            .img-filter{
              width: p(30);
              height: p(30);
              display: inline-block;
              background: pink;
              margin-top: p(16);
              margin-left: p(10);
            }

            /*筛选图标*/
            .shaixuan-icon{
              position: absolute;
              top: 1.2rem;
              right: 0;
              display: inline-block;
              width: 1.125rem;
              height: 1.625rem;
              background: url('./../../../../../static/img/home/shuaixuanIco.png') no-repeat center;
              background-size: 1.125rem 1.625rem;
            }
          }
          .filte-btn{
            /*background: green;*/

            .btn{
              display: inline-block;
              line-height: p(66);
            }
          }
        }
      }
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
                display: inline-block;
                padding: 1rem;
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
        width: p(530);
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
</style>
