<template>
  <div class="serach-pro-content"  v-title data-title="平台商品">
    <scroller height="-0.8" lock-x @on-scroll-bottom="getMoreProducts">
      <div class="scroller-content">
        <div class="search-main f-oh">
          <div class="search-inp-main f-oh f-fl">
            <i class="icon iconfont icon-search f-fl"></i>
            <input class="head-search f-fl" type="text" placeholder="搜索" v-model="keyWords">
          </div>
          <p class="search-btn f-fl fontSize-14 w-color" @click="confirmBtn()">搜索</p>
        </div>
        <!--筛选条件选择-->
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
                <p class="f-fl btn p-right12" style="color: #307ff5">筛选</p>
                <i class="shaixuan-icon"></i>
              </div>
              <div class="btn fontSize-14 f-pr" @click="showPopup" v-else>
                <p class="f-fl btn p-right12">筛选</p>
                <i class="shaixuan-icon"></i>
              </div>
            </li>
          </ul>
        </div>
        <!--产品展示区-->
        <div class="pro-lists-content">
          <ul class="pro-lists-main">
            <li class="pro-lists-row f-oh p-lef-rig24" v-for="(item,i) in productLists" :key="i" @click="clickItems(item,i)">
              <div class="div_cla">
                <i class="select-btn f-fl" :class="{active : item.checked}"></i>
              </div>
              <img class="pro-img f-fl" :src=item.logo alt="">
              <div class="pro-infos dis-inblo">
                <span class="fontSize-13 f-db ellipsis">{{item.name}}</span>
                <span class="fontSize-12">商城价：￥{{item.mallPrice}}<span class="fontSize-10 m-left5" style="color: #c6c6c6;">市场价：￥{{item.marketPrice}}</span>
                  <span v-if="item.isRecommend == 1" style="float: right;background: #f76d6b;color: white;padding: 0.2rem">已推荐</span>
                  <span v-if="item.isRecommend == 0" style="float: right;background: #307ff5;color: white;padding: 0.2rem">未推荐</span>
                </span>
                <span class="fontSize-12 f-db">已售：{{item.sale}}</span>
              </div>
              <!--<div class="stock f-pr f-fr fontSize-12">
                <span class="stock-inner">库存：{{item.stock}}</span>
              </div>-->
            </li>
          </ul>
        </div>
      </div>
    </scroller>
    <!--筛选弹窗及黑色遮罩层-->
    <!--<div v-if="isShowShaixuanPop" class="shaixuan-popup">-->
    <!--<ul class="shaixuan-main fontSize-14">-->
    <!--<li class="shaixuan-row f-oh">-->
    <!--<span class="f-fl">分类</span>-->
    <!--<i class="icon iconfont icon-more f-fr"></i>-->
    <!--<span class="f-fr">全部</span>-->
    <!--</li>-->
    <!--<li class="shaixuan-row">-->
    <!--<span>价格</span>-->
    <!--<i class="icon iconfont icon-more f-fr"></i>-->
    <!--<span class="f-fr">全部</span>-->
    <!--</li>-->
    <!--</ul>-->
    <!--<div class="pop-btns fontSize-18">-->
    <!--<span class="reset btn" @click="reSetBtn()">重置</span>-->
    <!--<span class="confirm btn" @click='confrimBtn()'>确定</span>-->
    <!--</div>-->
    <!--</div>-->
    <div v-if="isShowBlackCover" class="black-cover" @click="hideShaixuanPop()"></div>
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
    <!--底部选项按钮-->
    <ul class="bottom-btns fontSize-18 f-oh p-lef-rig24">
      <!--<li class="btns-row dangqian-now f-fl" @click="dangqian()">
        <i class="select-btn" :class="{active : dangqianChecked}"></i>
        <span>当前</span>
      </li>
      <li class="btns-row all f-fl" @click="all()">
        <i class="select-btn" :class="{active : allChecked}"></i>
        <span>所有</span>
      </li>
      <li class="btns-row update-shangjia f-fr" @click="shangjia()">
        <span>上架</span>
      </li>
      <li class="btns-row update-shangjia f-fr" @click="shangjia()">
        <span>上架</span>
      </li>
      <li class="btns-row ruku-instock f-fr" @click="f()">
        <span>下架</span>
      </li>-->
      <li class="btns-row dangqian-now f-fl" :class="{active : dangqianChecked}" @click="dangqian()">
        <i class="select-btn"></i>
        <span>当前</span>
      </li>
      <li class="btns-row all f-fl" :class="{active : allChecked}" @click="all()">
        <i class="select-btn"></i>
        <span>所有</span>
      </li>
      <li class="btns-choose fontSize-17 f-fr">
        <span @click="tuijian">推荐</span>
        <span @click="quxiao">取消</span>
      </li>
    </ul>

  </div>
</template>
<script>
  import $ from "jquery"; //导入jquery
  import { Switch } from 'mint-ui';
  import comLink from "./../../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import axios from 'axios'
  import { Scroller } from 'vux'
  export default {
    inject: ['reload'],
    data (){
      return{
        num : 0,
        proImg:'@/../static/image/home/phone_pro.png',
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
        isShowBlackCover : false,
        dangqianChecked :false,
        allChecked :false,
        keyWords : '',
        maxPrice :'',
        minPrice : '',
        productLists : [],//数据Arr
        pageNum : 1,
        pageSize : 10,
        sortBy : '',
        sortDir : '',
        productIds : [],
        isRequest : true,
        checkedNum : 0,
        showPop : false,
        showPriceChoose : false,
        xuanzhongPinpai : '',
        priceText :'',
        No1_Items : [],
        No2_Items : [],
        searchData: {
          isAll : '',
          keyword : '',
          maxPrice : '',
          minPrice : '',
          pageNum : 1,
          pageSize : 10,
        },
        categoryId : '',
        productIdsStr :'',
      }
    },
    methods : {
      confirmChoosePrice(){
        this.showPriceChoose = false;//隐藏折叠 不做其他操作
      },
      //点击选中详细品牌 同步到全部上
      clickDetail(key){
        this.categoryId = key.id;
        this.xuanzhongPinpai = key.name
      },
      //筛选左侧列表
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
            console.log(response,'分类列表')
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
      //点击确定 传参请求数据
      confirmBtn(){
        this.proListsAxios();
        this.showPop = false;
        this.isShowBlackCover = false;
      },
      //重置
      reset(){
        this.axiosLinkSearch = false;
        this.searchData.keyword = '';
        this.searchData.maxPrice = '';
        this.searchData.minPrice = '';
        this.categoryId = '';
      },
      clickItems(item,i){
//    	item.checked=!item.checked
//    	this.productLists.splice(100,1);
//    	console.log(item)
        this.productLists[i].checked = !this.productLists[i].checked;
        this.productLists.splice(100,1);

      },
      //
      hidePopup : function(){
        this.showPop = false;
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
        console.log(item.checked,'item.checked')
        this.No1_Items.splice(100,1);
        this.parentId = item.id;
        this.detailFenleiAxios();
        console.log(item.checked,11111)
      },
      //点击选择价格
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
      //点击弹出价格折叠
      priceChoose(){
        this.showPriceChoose = !this.showPriceChoose;
      },
      //选中当前（其实也是选中全部）
      dangqian(){
        this.dangqianChecked = !this.dangqianChecked;
        for(var i = 0 ,l = this.productLists.length;i < l; i ++){
          if(this.dangqianChecked){
            this.allChecked = false;
            this.productLists[i].checked = true;
            this.productLists.splice(100,1);
            console.log(this.productLists[0].checked,111111111111)
          }else{
            this.productLists[i].checked = false;
            this.productLists.splice(100,1)
          }
        }
      },
      //全部选中
      all(){
        this.allChecked = !this.allChecked;
        for(var i = 0 ,l = this.productLists.length;i < l; i ++){
          if(this.allChecked){
            this.searchData.isAll = 1;
            this.dangqianChecked = false;
            this.productLists[i].checked = true;
            this.productLists.splice(100,1);
          }else{
            this.productLists[i].checked = false;
            this.productLists.splice(100,1)
            this.searchData.isAll = '';
          }
        }
      },
      //点击下架
      quxiao(){
        for( var i = 0,l = this.productLists.length;i < l; i ++){
          if(this.productLists[i].checked){
            if(this.productIds.indexOf(this.productLists[i].id) < 0){
              this.productIds.push(parseInt(this.productLists[i].id));
            }
          }
          this.productIdsStr = this.productIds.join(',');
        }

        if(this.productIdsStr.length == 0) {
          Toast({
            message: '请选中商品',
            duration: 2000
          });
          return;
        }
        this.xiajiaAxios(this.productIdsStr);//下架接口//todo
        console.log(999,this.productIds)
      },
      //点击上架
      tuijian(){
        for( var i = 0,l = this.productLists.length;i < l; i ++){
          if(this.productLists[i].checked){
            if(this.productIds.indexOf(this.productLists[i].id) < 0){
              this.productIds.push(parseInt(this.productLists[i].id));
            }
          }
          this.productIdsStr = this.productIds.join(',');
          console.log(this.productIdsStr,1111111)
        }
        this.shangjiaAxios(this.productIdsStr);//上架接口//todo
      },
      //下架
      xiajiaAxios: function(productIdsStr){
        var vm = this;
        console.log(productIdsStr,'productIdsStr')
        axios.get(comLink.yxtHost + '/store/updateRecommend', {
          params:{
            'isAll' : vm.searchData.isAll,
            'isRecommend' : 0,
            storeId : sessionStorage.weiStoreId,
            productIds : productIdsStr,
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            vm.allChecked = false;
            vm.dangqianChecked = false;
            for(var i = 0,l = vm.productLists.length;i < l;i ++){
              vm.productLists[i].checked = false;
            }
            Toast({
              //mintui提示效果
              message: response.data.msg,
              duration: 2000,
            });
            vm.reload();
            // window.location.reload();
          }else{
            Toast({
              //mintui提示效果
              message: response.data.msg,
              duration: 2000,
            });
          }
        })
          .catch(function(res) {
            Toast({
              //mintui提示效果
              message: response.data.msg,
              duration: 2000,
            });
          });
      },
      //推荐
      shangjiaAxios: function(productIdsStr){
        var vm = this;
        axios.get(comLink.yxtHost + '/store/updateRecommend', {
          params:{
            'isAll' : vm.searchData.isAll,
            'isRecommend' : 1,
            storeId : sessionStorage.weiStoreId,
            productIds : productIdsStr,
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            vm.allChecked = false;
            vm.dangqianChecked = false;
            for(var i = 0,l = vm.productLists.length;i < l;i ++){
              vm.productLists[i].checked = false;
            }
            Toast({
              //mintui提示效果
              message: response.data.msg,
              duration: 2000,
            });
            vm.reload();
            // window.location.reload();
          }else{
            Toast({
              //mintui提示效果
              message: response.data.msg,
              duration: 2000,
            });
          }
        })
          .catch(function(res) {
            Toast({
              //mintui提示效果
              message: "数据请求失败",
              duration: 2000,
            });
          });
      },

      //滚动请求数据方法
      getMoreProducts(){
        // alert('滚动了')
        if(this.isRequest){
          this.searchData.pageNum++;
          this.isRequest = false;
          var vm = this;
          sessionStorage.setItem('homeSearchWord',vm.searchData.keyword);
          $.ajax({
            url:comLink.yxtHost + '/store/getProductList',
            data:{
              keyword : sessionStorage.homeSearchWord,
              maxPrice : vm.searchData.maxPrice,
              minPrice : vm.searchData.minPrice,
              pageNum : vm.searchData.pageNum,
              pageSize : vm.searchData.pageSize,
              categoryId : vm.categoryId,
              sortBy : vm.sortDir,
              sortDir : vm.sortBy,//升序 降序
              openid : sessionStorage.openid,
              storeId : sessionStorage.weiStoreId,
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
                  vm.productLists = vm.productLists.concat(newData);
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
      //搜索商品列表
      proListsAxios: function(){
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/store/getProductList',
          data: {
            keyword : vm.keyWords,
            maxPrice : vm.searchData.maxPrice,
            minPrice : vm.searchData.minPrice,
            pageNum : vm.searchData.pageNum,
            pageSize : vm.searchData.pageSize,
            categoryId : vm.categoryId,
            sortBy : this.searchData.sortBy,
            sortDir : this.searchData.sortDir,
            openid : sessionStorage.openid,
            storeId : sessionStorage.weiStoreId,
          },
          dataType: 'json',
          type: 'post',
          success: function (res) {
            console.log(res)
            if (res.code == 1) {
              vm.productLists = res.data;
              for( var i = 0,l = vm.productLists.length; i < l;i ++){
                vm.productLists[i].checked = false;
                vm.productLists[i].logo = comLink.yxtImgHost + vm.productLists[i].logo;
              }
            }
          },
          error: function (res) {

          }
        })
      },
      changeColor : function (item,i) {
        console.log(this.upDown,this.wNum,i);

        if(this.upDown === this.wNum && this.wNum === i) {
          this.upDown = -1;
          this.searchData.sortDir = 'asc';
          if(i === 0) {
            this.searchData.sortBy = 'sale ' + this.searchData.sortDir + ',mall_price ' + this.searchData.sortDir + ',sp.creat_time';
          }
          if(i === 1) {
            this.searchData.sortBy = 'sale';
          }
          if(i === 2) {
            this.searchData.sortBy = 'mall_price';
          }
          if(i === 3) {
            this.searchData.sortBy = 'sp.creat_time';
          }
          this.proListsAxios();
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
          this.searchData.sortBy = 'sale ' + this.searchData.sortDir + ',mall_price ' + this.searchData.sortDir + ',sp.creat_time';
        }
        if(i === 1) {
          this.searchData.sortBy = 'sale';
        }
        if(i === 2) {
          this.searchData.sortBy = 'mall_price';
        }
        if(i === 3) {
          this.searchData.sortBy = 'sp.creat_time';
        }
        this.proListsAxios();
      },
      showPopup : function(){
        this.wNum = 4
        this.showPop = true;
        this.isShowBlackCover = true;
      },
      hideShaixuanPop : function(){
        this.showPop = false;
        this.isShowBlackCover = false;
      },
      reSetBtn(){//弹出框 重置 按钮

      },
      confrimBtn(){//弹出框 确定 按钮
        this.pageNum = 1;
        this.searchMoreAxios();
      }
    },
    mounted:function(){
      this.proListsAxios();
      this.moreFenleiAxios();
      this.detailFenleiAxios();
    },
    components :{
      Scroller
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
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .p-lef-rig24 {
    padding: 0 p(20) 0 p(10);
  }
  .active{
    background: $danlan;
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
  /*.active{*/
  /*color: green;*/
  /*}*/
  .serach-pro-content{
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    /*overflow-y: auto;*/
    width: 100%;
    height: 100%;
    .yemian-content{
      padding-bottom: p(90);
    }
    .scroller-content{
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
    /*搜索head*/
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
    /*产品筛选导航*/
    .nav-choose{
      width: 100%;
      background: white;

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

          /*筛选图标*/
          .shaixuan-icon{
            position: absolute;
            top: 1.2rem;
            right: 0;
            display: inline-block;
            width: 1.125rem;
            height: 1.625rem;
            background: url('./../../../../../static/image/home/shuaixuanIco.png') no-repeat center;
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
    /*产品展示列表*/
    .pro-lists-content{
      /*position: absolute;*/
      /*top: p(157);*/
      /*right: 0;*/
      /*left: 0;*/
      /*bottom: p(90);*/
      /*overflow-y: auto;*/
      width: 100%;
      height: 100%;
      .pro-lists-main{
        width: 100%;
        .pro-lists-row{
          width: 100%;
          height: p(170);
          margin: p(20) 0;
          background: white;
          .pro-img{
            width: p(120);
            margin-top: p(12);
          }

          .div_cla {
            width: 7%;
            padding-right: 1rem;
            position: relative;
            float: left;
            height: 1rem;

            .select-btn{
              display: inline-block;
              width: p(30);
              height: p(30);
              border-radius: 50%;
              /*background: white;*/
              box-sizing: border-box;
              border: 0.5px solid #9a9a9a;
              margin: p(80) p(20) 0 0;
              position: absolute;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              top: 43%;
            }
          }

          .pro-infos{
            height: p(160);
            margin-top: p(15);
            max-width: 70%;
            margin-left: p(10);

            >span{
              display: inline-block;
              float: left;
              width: 100%;
            }
            >span:nth-child(2){
              margin-top: p(30);
              color: #f76d6b;
            }
            >span:nth-child(3){
              margin-top: p(45);
            }

            .m-left5 {
              text-decoration: line-through;
            }
          }
          .stock{
            height: 100%;
            width: 20%;
            max-width: 18%;
            .stock-inner{
              position: absolute;
              bottom: p(20);
              right: 0;
            }
          }
        }
      }
    }
    .bottom-btns{
      width: 100%;
      height: p(90);
      background: white;
      position: fixed;
      bottom: 0;
      /*display: flex;*/
      /*justify-content: space-evenly;*/

      .active {
        background-color: white;
      }
      .btns-row{
        height: 100%;
        line-height: p(90);
        display: inline-block;
        .select-btn{
          display: inline-block;
          width: p(30);
          height: p(30);
          border-radius: 50%;
          background: white;
          box-sizing: border-box;
          border: p(1) solid #9a9a9a;
        }
      }
      .btns-row.active .select-btn{
        background: #c0daff;
      }
      .dangqian-now{
        margin-right: p(20);
        width: 20%;
      }
      .all {
        width: 20%;
      }
      .btns-choose{
        margin-top: p(5);
        height: p(80);
        display: flex;
        justify-content: space-around;
        width: 55%;

        >span{
          width: 48%;
          display: inline-block;
          height: 100%;
          line-height: p(80);
          background: $bgBlue;
          text-align: center;
          color: white;
          border-radius: p(10);
        }
        >span:nth-child(1){
          color: white;
          background: $qianhong;
        }
        >span:nth-child(2){
          color: white;
          background: $bgBlue;
        }
      }
      /*.cancel,.tuijian{*/
      /*width: p(150);*/
      /*height: p(80);*/
      /*line-height: p(80);*/
      /*text-align: center;*/
      /*border-radius: p(10);*/
      /*margin-top: p(5);*/
      /*!*color: white;*!*/
      /*}*/
      /*.cancel{
        background: #c0daff;
        margin-left: p(20);
        color: $bgBlue;
      }
      .tuijian{
        background: $bgBlue;
      }*/
    }
  }
</style>
