<template>
  <div class="serach-pro-content"  v-title data-title="产品搜索列表" >
  	<div style="width: 100%; height: 0.1rem;"></div>
    <scroller height="-0.01" lock-x  @on-scroll-bottom="scrollerRequire" :scrollbar-y = true  @on-scroll="lostblur()"  ref="myScroller">
      <div>
        <!--<div class="search-main f-oh">
          <div class="search-inp-main f-oh f-fl">
            <i class="icon iconfont icon-search f-fl"></i>
            <input v-focus ref="input" @focus="showHot" class="head-search f-fl" type="text" v-model="searchData.keyword" placeholder="仅限建行信用卡，全场购物包邮">
          </div>
          <p class="search-btn f-fl fontSize-14 w-color" @click="confirmBtn()">搜索</p>
        </div>-->
        <div class="search-main f-oh">
	      <div class="search-inp-main f-oh f-fl">
	        <i class="icon iconfont icon-search f-fl"  ></i>
	        <input class="head-search f-fl fontSize-15"  v-model="queryData.productName" type="text" placeholder="搜索商品名称">
	      </div>
	      <div class="search-btn f-pr f-fl w-color fontSize-14" @click="getInsideProduct">
	      	搜索
	      </div>
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
        <pripro-component :proDetailData = 'page.list'></pripro-component>
        <p class="pointer fontSize-14" v-if="isAllgoods" >
        	<span id="scrollBottom" style="width: 100%; height: 3rem;display: inline-block; ">
        		----- 向下滚动加载更多 -----
        	</span>
        </p>
        <p class="pointer fontSize-14" v-else>----- 已全部加载完毕 -----</p>
      </div>
      <!--<divider>我是有底线的</divider>-->
    </scroller>

    <div v-if="isShowBlackCover" class="black-cover" @click="hidePopup"></div>
  </div>
</template>
<script>
  // import { Popup } from 'mint-ui';//引入弹窗
  import { Divider, TransferDom, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, Scroller } from 'vux';
 	import { Indicator } from 'mint-ui';
  import $ from "jquery"; //导入jquery
  import axios from 'axios'
  import comLink from "@/common/common_link"; //导入总线
  import priproComponent from "@/subcomponents/induspripro-component.vue";
  export default {
    name : 'indusSearch',
    directives: {
      TransferDom
    },
    data (){
      return{
        isShowHotWord : false,
        howWords : [],
      	isAllgoods:true,
      	homeSearchWord:'',
        isShowBlackCover : false,
        showPop: false,
        wNum : 0,
        upDown : 0,
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
        popupVisible:false,
        pageNum : 1,
        pageSizeData : 10,
        proDetailData : [],//商品列表数据
        isRequest : true,
        requestLink : '',
        No1_Items : [],
        No2_Items : [],
        parentId : null,
        activeName : " 1",
        showPriceChoose : false,
        xuanzhongPinpai : '',
        queryData: {
          'openid': sessionStorage.openid,
          'insideId': sessionStorage.insideId,
          'pageNum': 1,
          'pageSize': 20,
          'productName': '',
          'categoryId': '',
          'brandId': '',
          'maxPrice': '',
          'minPrice': '',
          'order': 'desc',    //asc
          'sidx': 'ip.create_time'  //p.sale
        },
        axiosLinkSearch : false,
        priceText :'',
        page : {},  //分页对象
      }
    },


    mounted(){
      this.getInsideProduct();
    },
    methods : {
      //内购商品列表
      getInsideProduct() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/area/getInsideProduct',
          data: vm.queryData,
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.page = resp.data;
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      showHot() {
        this.isShowHotWord = true;
      },
      hideHotWords(){
        if(this.isShowHotWord){
          this.isShowHotWord = false
        }
      },
      //点击关键词 赋值到input中
      chooseHotWords(item){
        this.isShowHotWord = false;
        // this.hotValue = item.hotWordName;//没有数据 先注释
        // this.hotValue = item.hotWordName;
        this.searchData.keyword = item.hotWordName;
        this.searchData.pageNum = 1;
        this.searchProAxios();
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
              vm.isShowHotWord = true;
              vm.howWords = data.data;
              console.log(vm.howWords,111111)
            }
          },
          error:function (data) {

          }
        })
      },
    	lostblur(){
    		$('input').blur()
    	},
    	 loadings(){
				$('#scrollBottom').html('<img style="width:3rem; height:3rem;" src=" '+this.loading +'"/>');
			},
      confirmChoosePrice(){
        // $('.showPop-content').css('display', 'none');
        this.searchProAxios();
        this.showPop = false;
        // this.showPriceChoose = false
        this.isShowBlackCover = false;
      },
      //选中价格区间
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
      //点击选中详细品牌 同步到全部上
      clickDetail(key){
        this.brandId = key.id;
        this.xuanzhongPinpai = key.name
        this.showPriceChoose = true;
        // alert(this.xuanzhongPinpai);
        // alert(this.brandId);
      },
      //点击黑色弹窗，隐藏弹出框
      hidePopup : function(){
        this.showPop = false;
        this.isShowBlackCover = false;
        // this.isShowTongji = false;
      },
      //点击确定 传参请求数据
      confirmBtn(){


        this.searchProAxios();
        this.showPop = false;
        this.isShowBlackCover = false;
        // this.axiosLinkSearch = false;
      },
      //点击重置按钮
      reset(){
        // this.axiosLinkSearch = false;
        this.searchData.keyword = null;
        this.searchData.maxPrice = '';
        this.searchData.minPrice = '';
        $('.f-fr').text('');
        this.brandId = '';
        this.xuanzhongPinpai = '';
        this.showPriceChoose = false;
      },
      //搜索产品
      searchProAxios:function(){
        var vm=this;
        let keyword = '';
        if(vm.searchData.keyword != undefined && vm.searchData.keyword != null && vm.searchData.keyword != 'undefined' && vm.searchData.keyword != 'null' && vm.searchData.keyword != '') {
          sessionStorage.setItem('homeSearchWord',vm.searchData.keyword);
          keyword = sessionStorage.homeSearchWord;
        }
        $.ajax({
          url:comLink.yxtHost + '/product/search',
          data:{
            keyword : keyword,
            maxPrice : vm.searchData.maxPrice,
            minPrice : vm.searchData.minPrice,
            pageNum : vm.searchData.pageNum,
            pageSize : vm.searchData.pageSize,
            categoryId : vm.brandId,
            sortBy : vm.searchData.sortBy,
            sortDir : vm.searchData.sortDir,
            openid : sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.proDetailData = data.data;
              for(var i = 0,l = vm.proDetailData.length;i<l ;i ++){
                vm.proDetailData[i].logo = comLink.yxtImgHost + vm.proDetailData[i].logo;

                vm.proDetailData[i].periodShow1 = vm.proDetailData[i].periodShow.split('x')[0];
                vm.proDetailData[i].periodShow2 = vm.proDetailData[i].periodShow.split('x')[1];
              }
              if(data.data.length<10){
              	vm.isAllgoods=false;
              }
            }
          },
          error:function (data) {

          }
        })
      },
      // //////////////////////////////////////////////////////////////////////////////

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
      /////////////////////////////////////////////////////////////////////////////
      //滑动方法
      scrollerRequire(){
        if(this.isRequest){
          this.searchData.pageNum++;
          this.isRequest = false;
          var vm = this;
          let keyword = '';
          if(vm.searchData.keyword != undefined && vm.searchData.keyword != null && vm.searchData.keyword != 'undefined' && vm.searchData.keyword != 'null' && vm.searchData.keyword != '') {
            sessionStorage.setItem('homeSearchWord',vm.searchData.keyword);
            keyword = sessionStorage.homeSearchWord;
          }

          $.ajax({
            url:comLink.yxtHost + '/product/search',
            data:{
              keyword : keyword,
              maxPrice : vm.searchData.maxPrice,
              minPrice : vm.searchData.minPrice,
              pageNum : vm.searchData.pageNum,
              pageSize : vm.searchData.pageSize,
              categoryId : vm.brandId,
              sortBy : vm.searchData.sortBy,
              sortDir : vm.searchData.sortDir,//升序 降序
              openid : sessionStorage.openid
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
            },
            error:function (data) {

            }
          })
        }
      },
      changeColor : function (item,i) {
        console.log(this.upDown,this.wNum,i);
				this.searchData.pageNum=1;
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
          this.searchProAxios();
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
        this.searchProAxios();
      },
      showPopup : function(){
        this.showPop = true;
        this.isShowBlackCover = true;
      },
      chooseBrand : function(i){
        this.num = i
      }
    },
    watch: {
      '$route'(to,from) {
        console.log(to.name,'to的名字')
        if(from.name !== 'proDetailRouter' && to.name == 'homeSearchRouter'){
          this.$nextTick(() => {
            this.$refs.myScroller.reset({top:0})
          })
          this.moreFenleiAxios();//一级分类
        }
      }
    },
    deactivated(){
    	this.reset();
    	this.isAllgoods=true;
    	this.showPop = false;
      this.isShowBlackCover = false;
    },
    components :{
      // searchComponent,
      Scroller,
      priproComponent,
      Popup,
      Group,
      Cell,
      XSwitch,
      Toast,
      XAddress,
      XButton,
      Divider
    }
  }
</script>
<style lang="scss">
  .vux-popup-bottom.vux-popup-show{
    position: absolute;
    top: 5.625rem;
    background: white;
  }
  .vux-divider{
    font-size: 1.5rem;
  }
</style>
<style lang="scss" scoped>
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
  }
  .line1{
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-62deg);
    /*transform-origin: top;*/
    display: inline-block;
    width: 100px;
    height: 1px;
    box-sizing: border-box;
    border-bottom: 1px solid black;
  }
  .active{
    color: green;
  }

  .vux-popup-dialog{
    width: 70%;
    right: 0;
    left: 30%;
    bottom: 0;
  }
  .serach-pro-content{
    /*position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: auto;*/
    background: white;
    .search-main{
      height: p(90);
      width: 100%;
      background: #fff;
      padding: 0 p(30);

      .search-inp-main{
        margin: p(12) 0;
        width: 90%;
        height: p(64);
        border-radius: p(6);
        background: #f5f5f5;
        line-height: p(70);
        position: relative;
        .icon-search{
          position: absolute;
          /*width: 15%;*/
          left: 20%;
          font-size: p(35);
          background: #f5f5f5;
        }
        .head-search{
          width: 100%;
          height: 100%;
          text-align: center;
          background: #f5f5f5;
          border-radius: 1rem;
          font-size: p(24);
        }
      }
      .search-btn{
        display: inline-block;
        width: 10%;
        height: 100%;
        font-size: p(25);
        line-height: p(34);
        padding-left: p(10);
        text-align: center;
        color: #666;
        /*margin-top: p(8);*/
		vertical-align: middle;
		padding-top: p(25);
		position: relative;
		/*>span{
          font-size: p(25);
          color: #666;
          padding-left: p(10);
          letter-spacing: p(4);
		}*/
		.newsNum{
			display: inline-block;
			width: p(30);
			position: absolute;
			height: p(30);
			border-radius: 50%;
			text-align: center;
			color: #fff;
			line-height: p(30);
			right: 0;
			font-size: p(20);
			top: p(8);
			background-color: #ad090a;
		}
		img{
			display: inline;
			width: p(38);
			height: p(35);
			vertical-align: middle;
		}
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
    /*.search-main{
      height: p(90);
      width: 100%;
      background: #307ff5;
      padding: 0 p(20);
      line-height: p(90);

      .search-inp-main{
        margin: p(10) 0;
        width: 85%;
        height: p(70);
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
        }
      }
      .search-btn{
        display: inline-block;
        width: 15%;
        text-align: center;
      }
    }*/

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
            background: url('../../../static/img/home/shuaixuanIco.png') no-repeat center;
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

    .showPop-content{
      position: fixed;
      top: p(90);
      bottom: 0;
      right: 0;
      width: p(530);
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

  .pop-main{
    top: 0;
    bottom: 0;
    background: transparent;

    .clear-back-color{
      width: 100%;
      height: p(90);
      background: transparent;
    }

    .clear-back-color{

    }
    .pop-content-all,.brand-select{
      padding: 0 p(20);

      .price-range{

        .start-end-price{
          display: inline-block;
          width: 33.33%;
          height: p(60);
          background: #eeeeee;
          text-align: center;
        }

        .fenjie-line{
          /*margin:0 p(35);*/
          width: 33.33%;
          height: p(60);
          line-height: p(60);
          text-align: center;
          display: inline-block;
        }
      }
    }
    .space-color{
      background: #eeeeee;
      display: inline-block;
      width: 100%;
      height: p(20);
    }
    .brand-select{

      .brand-main{

        .brand-row{
          margin: p(10) 0;
          width: 33.33%;
          height: p(65);

          text-align: center;
          padding: 0 p(10);

          .li-inner{
            background: #ccc;
            width: 100%;
            height: 100%;
            line-height: p(65);
          }
        }
      }
    }

    .select-btns{
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;

      .btn{
        width: 50%;
        height: p(100);
        line-height: p(100);
        text-align: center;
      }
      .reset{
        background: #c0d9ff;
        color: #307ff5;
      }
      .confirm {
        background: #307ff5;
        color: white;
      }
    }
    .show-popup{
      width: 70%;
      height: 100%;
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
</style>
