<template>
  <div class="serach-pro-content"  v-title data-title="产品搜索列表">
  	<div style="width: 100%; height: 0.1rem;"></div>
    <scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire"  ref="myScroller">
      <div>
        <div class="search-main f-oh">
          <!--<search-component></search-component>-->
          <!--搜索框-->
          <div class="search-inp-main f-oh f-fl">
            <i class="icon iconfont icon-search f-fl"></i>
            <input class="head-search f-fl" type="text" v-model="searchData.keyword" placeholder="搜索">
          </div>
          <p class="search-btn f-fl fontSize-14 w-color" @click="searchWordBtn()">搜索</p>
        </div>
        <div class="nav-choose ">
          <ul class="nav-choose-main f-oh">
            <li class="nav-choose-row f-fl fontSize-14 " v-for="(item,i) in navs" :key="i"
                @click="changeColor(item,i)"
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
      </div>
      <!--<divider>我是有底线的</divider>-->
    </scroller>

    <div class="showPop-content" v-if="showPop">
      <div class="item-list-content">
        <div class="item-list-main fontSize-14">
          <dt class="item-row f-oh" @click="priceChoose()">
            <p class="f-fl">价格</p>
            <i class="icon iconfont icon-moreunfold f-fr" v-if="showPriceChoose"></i>
            <!--<i class="icon iconfont icon-more f-fr" v-else></i>-->
            <span class="f-fr fontSize-14"  v-else>请选择</span>
            <span class="f-fr" v-text="priceText" v-if="showPriceChoose"></span>
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
              <li class="price-list-row" style="background-color: #307ff5;color: #fff;">
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
        <!--<ul class="item-list-main fontSize-14">-->
          <!--<li class="item-row f-oh">-->
            <!--<p class="f-fl">分类</p>-->
            <!--<span class="f-fr m-right10">{{xuanzhongPinpai}}</span>-->
            <!--<i class="icon iconfont icon-more f-fr"></i>-->
          <!--</li>-->
        <!--</ul>-->
        <!--<ul class="item-list-main fontSize-14" v-for="(item,i) in No1_Items" :key="i"-->
            <!--@click="clickItem(item)"-->
        <!--&gt;-->
          <!--<li class="item-row f-oh">-->
            <!--<p class="f-fl p-lef-rig24">{{item.name}}</p>-->
            <!--<i class="icon iconfont icon-moreunfold f-fr" v-if="item.checked"></i>-->
            <!--<i class="icon iconfont icon-more f-fr" v-else></i>-->
          <!--</li>-->
          <!--<ul class="detail-main p-lef-rig24 f-oh" v-if="item.checked">-->
            <!--<li class="detail-row f-fl"-->
                <!--@click="clickDetail(key)"-->
                <!--v-for="(key,j) in No2_Items" :key="j">-->
              <!--<span class="detail">{{key.name}}</span>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</ul>-->
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
  // import { Popup } from 'mint-ui';//引入弹窗
  import { Divider, TransferDom, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, Scroller } from 'vux'
  import $ from "jquery"; //导入jquery
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import priproComponent from "./../../../subcomponents/pripro-component.vue";
  export default {
    name : 'homeSearchRouter',
    directives: {
      TransferDom
    },
    data (){
      return{
        activeNames: '1',
        isShowBlackCover : false,
        num : 0,
        startVal : '最低价',
        endVal : '最高价',
        startPrice: '',
        getStartPrice : null,
        endPrice: '',
        getEndPrice: null,
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
        searchData: {
          keyword : '',
          maxPrice : '',
          minPrice : '',
          pageNum : 1,
          pageSize : 10,
        },
        priceText :'',
        sortDir : '',//综合:默认不填;销量：传 sale;价格： market_price;时间：	create_time
        sortBy : '',//desc降序  asc升序
        categoryId : '',
      }
    },
    mounted(){
      this.searchData.pageNum = 1;
      this.pageNum = 1;
      this.searchProAxios();
      this.moreFenleiAxios();//一级分类
    },
    watch: {
      '$route'(to,from) {
        if(from.name !== 'proDetailRouter' && to.name == 'leibieSearchPro'){
          this.$nextTick(() => {
            // console.log(741,this.$refs.myScroller)
            this.$refs.myScroller.reset({top:0})
          })
          this.searchData.pageNum = 1;
          this.pageNum = 1;
          this.searchProAxios();
        }
      }
    },
    methods : {
      confirmChoosePrice(){
        // $('.showPop-content').css('display', 'none');
        this.searchData.pageNum = 1;//初始化pageNum
        this.pageNum = 1;
        this.searchProAxios();
        this.showPop = false;
        this.showPriceChoose = false;
        this.isShowBlackCover = false;
      },
      //
      searchWordBtn(){
        this.searchProAxios();
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
        // this.categoryId = key.id;
        // this.xuanzhongPinpai = key.name
      },
      //点击黑色弹窗，隐藏弹出框
      hidePopup : function(){
        this.showPop = false;
        this.isShowBlackCover = false;
        // this.isShowTongji = false;
      },
      //点击确定 传参请求数据
      confirmBtn(){
 		this.searchData.pageNum = 1;
        this.pageNum = 1;
        this.searchProAxios();
        this.showPop = false;
        this.isShowBlackCover = false;      },
      //点击重置按钮
      reset(){
        this.searchData.keyword = null;
        this.searchData.maxPrice = '';
        this.searchData.minPrice = '';
        this.priceText = '';
        this.brandId = '';
        this.xuanzhongPinpai = '';
        $('.f-fr').css('color', '');
      },
      //搜索产品
      searchProAxios:function(){
        let hash = window.location.hash;
        hash = hash.split('=');
        let categoryId = hash[1];
        var vm = this;
        sessionStorage.setItem('homeSearchWord',vm.searchData.keyword);
        $.ajax({
          url:comLink.yxtHost + '/product/search',
          data:{
            keyword : vm.searchData.keyword,
            maxPrice : vm.searchData.maxPrice,
            minPrice : vm.searchData.minPrice,
            pageNum : vm.pageNum,
            pageSize : vm.searchData.pageSize,
            categoryId : categoryId,
            sortBy : this.searchData.sortBy,
            sortDir : this.searchData.sortDir,
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
            }
          },
          error:function (data) {

          }
        })
      },
      // ///////////////////////////////////////分割线///////////////////////////////////////

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
      ////////////////////////////////////分割线/////////////////////////////////////////
      //滑动方法
      scrollerRequire(){
        if(this.isRequest){
          this.searchData.pageNum++;
          this.isRequest = false;
          var vm = this;
          let hash = window.location.hash;
          hash = hash.split('=');
          let categoryId = hash[1];
          // sessionStorage.setItem('homeSearchWord',vm.searchData.keyword);//废除
          $.ajax({
            url:comLink.yxtHost + '/product/search',
            data:{
              keyword : sessionStorage.homeSearchWord,
              maxPrice : vm.searchData.maxPrice,
              minPrice : vm.searchData.minPrice,
              pageNum : vm.searchData.pageNum,
              pageSize : vm.searchData.pageSize,
              categoryId : categoryId,
              sortBy : vm.sortDir,
              sortDir : vm.sortBy,//升序 降序
              openid : sessionStorage.openid
            },
            dataType:'json',
            type:'post',
            success:function (data) {
              setTimeout(function(){//todo
                vm.isRequest = true;
              },2000);
              if(data.code == 1){
                if(data.data && data.data.length > 0){
                  let newData = data.data;
                  for( var i = 0,l = newData.length;i < l;i ++){
                    newData[i].logo = comLink.yxtImgHost + newData[i].logo;
                  }
                  vm.proDetailData = vm.proDetailData.concat(newData);
                }else{
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
  /*a:hover{*/
  /*display: none;*/
  /*}*/
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
  /*.popup1 {*/
  /*width:100%;*/
  /*height:100%;*/
  /*}*/
  .vux-popup-dialog{
    width: 70%;
    right: 0;
    left: 30%;
    bottom: 0;
  }
  .serach-pro-content{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: auto;
    background: white;
    .search-main{
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
    }

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
            background: url('./../../../../static/img/home/shuaixuanIco.png') no-repeat center;
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
    /*.showPop-content{*/
    /*position: fixed;*/
    /*top: p(90);*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*width: p(530);*/
    /*background: white;*/
    /*z-index: 9;*/
    /*overflow-y: auto;*/
    /*animation:myfirst 0.5s ;*/
    /*@keyframes myfirst*/
    /*{*/
    /*0%   {right:0;top: 100%;}*/
    /*100% { right:0; top:p(90);}*/
    /*}*/
    /*}*/
    /*.detail-item-main{*/
    /*width: 100%;*/

    /*.detail-item-row{*/

    /*.detail{*/
    /*padding: p(5);*/
    /*border: 0.5px solid #eee;*/
    /*border-radius: p(5);*/
    /*}*/
    /*}*/
    /*}*/
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
                margin-top: p(18);
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
                height: p(90);
                font-size: p(26);
                color: #333333;
                line-height: p(90);
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
</style>
