<template>
  <div class="mycollect-content" v-title data-title="我的收藏">
    <scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequireD" >
    <div style="">
      <div class="head-item">
        <dt class="head-item-main f-oh fontSize-15">
        <span class="btn f-fl" @click="chooseCollect(i)"
              :class="{ active : num === i}"
              v-for="(item,i) in navs" :key="i"
        >
          {{item.name}}
        </span>
        </dt>
      </div>
      <!--展示收藏商品-->
      <div class="pro-content" v-if="num === 0">
        <div class="count-bar p-lef-rig24 b-white f-oh">
        <span class="fontSize-14 f-fl">
          共收藏<span style="color: #ff675f;">{{proNum}}件</span>商品
        </span>
          <span class="fontSize-15 f-fr edit-btn" @click="editPro()">{{isProEdit}}</span>
        </div>
          <div class="pro-list-show f-oh">
            <div class="f-oh f-fl list-main f-pr" v-for="(item,i) in collectProData" :key="i" @click="toProDetail(item)">
              <i class="selected-btn" :class="{ chooseAll : item.checked}" v-if="isShowChooseOicon" @click="checkProduct(item)"></i>
              <img class="img-pic dis-inblo f-fl" :src=item.logo alt="">
              <div class="pro-name-infos f-fl m-left10">
                <span class="pro-title fontSize-14 f-db">{{item.name}}</span>
                <!--<span class="pro-detail fontSize-10 f-db">全面屏/400Ah大电量/前置柔光自拍/14nm</span>-->
              </div>
              <div class="price" :class="{aaa : isShowChooseOicon}">
                <span class="fontSize-12">￥<span style="font-weight: bold;font-size: 2rem">{{item.mallPrice}}</span></span>
                <span class="fontSize-9" style="text-decoration: line-through;">￥{{item.marketPrice}}</span>
              </div>
              <span class="pro-num dis-inblo fontSize-10 f-fl">已售：{{item.sale}}</span>
            </div>
          </div>
      </div>
      <!--展示收藏店铺-->
      <div class="pro-content" v-if="num === 1">
        <div class="count-bar p-lef-rig24 b-white f-oh">
        <span class="fontSize-14 f-fl">
          共收藏<span style="color: #ff675f;">{{storeNum}}间</span>店铺
        </span>
          <span class="fontSize-15 f-fr edit-btn" @click="editStore()">{{isStoreEdit}}</span>
        </div>

          <div class="collect-store ">
            <ul class="collect-store-main p-lef-rig24 f-oh">
              <li class="collect-store-row p-lef-rig24 f-oh f-fl"
                  v-for="(item,i) in collectStoreData" :key="i" @click="Tobrand(item)"
              >
                <i class="selected-btn f-fl" :class="{ chooseAll : item.checked}" v-if="isShowChooseOicon" @click="checkStore(item)"></i>
                <div class="img-wai f-fl">
                  <img class="img-pic" :src=item.logo alt="">
                </div>
                <span class="f-fl com-name fontSize-15">{{item.storeName}}</span>
              </li>
            </ul>
          </div>
      </div>
    </div>
    </scroller>
    <div v-if="isDelectBtnShow" class="delete-btn-main p-lef-rig24 f-oh fontSize-17">
      <div class="f-fl" @click="chooseAllpro()" v-if="num === 0">
        <i class="selected-btn" :class="{ chooseAll : isChooseAll }"></i>
        <span>全选</span>
      </div>
      <div class="f-fl" @click="chooseAllstore()" v-if="num ===1">
        <i class="selected-btn" :class="{ chooseAll : isChooseAllst }"></i>
        <span>全选</span>
      </div>
      <div class="delect-button f-fr" @click="delAll()">
        <span>删除</span>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  // import orderProListComponent from "./../../../subcomponents/orderProList-component.vue";
  import { Scroller } from 'vux'
  export default{
 		inject: ['reload'],
    data (){
      return {
        num : 0,
        proNum : 0,//收藏店铺数量
        storeNum : 0,//收藏商品数量
        isProEdit : '编辑',//产品编辑
        isStoreEdit : '编辑',
        //编辑状态以下变量为true
        isShowChooseOicon:false,//选中单项
        isDelectBtnShow : false,//是否显示底部删除按钮
        isChooseAll : false,//全选
        isChooseAllst:false,
        confirmDelect : false,

        deleIndex : null,
        deleIndexCom : null,
        isChooseTotal : 0,//共选中数量
        isChooseComTotal : 0,//店铺被选中数量
        navs : [
          { name : '商品' },
          { name : '店铺' }
        ],
        proInfoLists : [],
        companyCollectLists : [],
        collectStoreData : [],//收藏店铺数据
        collectProData : [],//商品收藏列表
        pageNum : 1,
        storePageNum : 1,
        isRequest : true,
        ids : [],//取消收藏的id
      }
    },
    mounted (){
      this.collectStoreAxios();//收藏店铺数据
      this.collectProductsAxios();
    },
    methods : {
      //编辑店铺
      editStore(){
        if(this.isStoreEdit === '编辑'){
          this.isShowChooseOicon = true;//选中单项
          this.isDelectBtnShow = true;//是否显示底部删除按钮
          this.isStoreEdit = '取消'
        }else{
          this.isShowChooseOicon = false;//选中单项
          this.isDelectBtnShow = false;//是否显示底部删除按钮
          this.isStoreEdit = '编辑'
          for(var i = 0,l = this.collectStoreData.length;i < l;i ++){
            this.collectStoreData[i].checked = false
            this.isChooseAll = false
          }
        }
      },
      //取消收藏
      delAll() {
        let type = this.num;
        var vm=this;
        if(type === 0) {
          $.post(comLink.yxtHost + '/product/enshrineProduct', {
            'productId' : this.ids.join(','),
            'openid' : sessionStorage.openid,
          }, function(resp) {
            if(resp.code === 1) {
             	vm.reload();
            }
          });
        } else if(type === 1) {
          $.post(comLink.yxtHost + '/brand/enshrineBrand', {
            'brandId' : this.ids.join(','),
            'openid' : sessionStorage.openid,
          }, function(resp) {
            if(resp.code === 1) {
            	for(var i=0,l = vm.collectStoreData.length;i < l;i ++){
            		if(vm.collectStoreData[i].checked){
            			vm.collectStoreData.splice(i,1)
            		}
            	}
//           	vm.reload();
            }
          });
        }
      },
      //点击店铺
      checkStore(item){
        item.checked = !item.checked;
        this.collectStoreData.splice(100,0);
        console.log(item.checked)
        var count = 0;
        for(var i = 0,l = this.collectStoreData.length;i < l;i ++){
          if(this.collectStoreData[i].checked){
            count ++;
            this.isChooseAllst = true;
          }else{
            this.isChooseAllst = false;
          }
        }
        if(count === this.collectStoreData.length) {
          this.isChooseAllst = true;
        } else {
          this.isChooseAllst = false;
        }
        if(item.checked) {
          this.ids.push(item.id);
        } else {
          var newArr = [];
          for(var i=0; i<this.ids.length; i++) {
            if(item.id != this.ids[i]) {
              newArr.push(this.ids[i]);
            }
          }
          this.ids = newArr;
        }
      },
      //编辑商品
      editPro(){
        if(this.isProEdit === '编辑'){
          this.isShowChooseOicon = true;//选中单项
          this.isDelectBtnShow = true;//是否显示底部删除按钮
          this.isProEdit = '取消'
        }else{
          this.isShowChooseOicon = false;//选中单项
          this.isDelectBtnShow = false;//是否显示底部删除按钮
          this.isProEdit = '编辑'
          for(var i = 0,l = this.collectProData.length;i < l;i ++){
            this.collectProData[i].checked = false
            this.isChooseAll = false
          }
        }
      },
      //单选编辑产品
      checkProduct(item){
        item.checked = !item.checked;
        this.collectProData.splice(100,0);
        var count = 0;
        for(var i = 0,l = this.collectProData.length;i < l;i ++){
          if(this.collectProData[i].checked){
            this.isChooseAll = true;
            count ++;
          }else{
            this.isChooseAll = false;
          }
        }
        if(count === this.collectProData.length) {
          this.isChooseAll = true;
        } else {
          this.isChooseAll = false;
        }
        if(item.checked) {
          this.ids.push(item.id);
        } else {
          var newArr = [];
          for(var i=0; i<this.ids.length; i++) {
            if(item.id != this.ids[i]) {
              newArr.push(this.ids[i]);
            }
          }
          this.ids = newArr;
        }
      },
      //全选按钮
      chooseAllpro(){
        this.isChooseAll = !this.isChooseAll;
				
        if(this.isChooseAll) {
        	for(var i = 0,l = this.collectProData.length;i < l;i ++){
	          this.collectProData[i].checked=true;
	        }
        	
          $('.selected-btn').addClass('chooseAll');
        } else {
        	for(var i = 0,l = this.collectProData.length;i < l;i ++){
	          this.collectProData[i].checked=false;
	        }
        	
          $('.selected-btn').removeClass('chooseAll');
        }
        // for(var i = 0,l = this.collectProData.length;i < l;i ++){
        //   if(this.isChooseAll){
        //     this.collectProData[i] = true;
        //     this.collectProData.splice(100,0);
        //   }else{
        //     this.collectProData[i] = false;
        //     this.collectProData.splice(100,0);
        //   }
        //   this.collectProData.splice(100,0);
        // }
      },
      chooseAllstore(){
      	this.isChooseAllst = !this.isChooseAllst;
				
        if(this.isChooseAllst) {
        	
        	for(var i = 0,l = this.collectStoreData.length;i < l;i ++){
	          this.collectStoreData[i].checked=true;
	        }
          $('.selected-btn').addClass('chooseAll');
        } else {
        	
        	for(var i = 0,l = this.collectStoreData.length;i < l;i ++){
	          this.collectStoreData[i].checked=false;
	        }
          $('.selected-btn').removeClass('chooseAll');
        }
      },
      //跳转商品详情列表
      toProDetail(item){
        if(this.isDelectBtnShow === false){
          this.$router.push({
            path : '/home/proDetailRouter',
            query:{id:item.id}
          })
        }

      },
      Tobrand(item){
      	if(this.isDelectBtnShow === false){
          this.$router.push({
            path : '/home/brandStoreRouter',
            query:{id:item.id}
          })
        }
      },
      //店铺收藏列表
      scrollerRequireD(){
        if(this.isRequest){
          this.pageNum ++;
          this.isRequest = false;
          var vm = this
          axios.get(comLink.yxtHost + '/brand/getCollectBrand', {
            params:{
              openid:sessionStorage.openid,
              pageNum : _vm.storePageNum,
            }
          }).then(function(response) {
            console.log('店铺收藏列表response',response)
            setTimeout(function(){//todo
              vm.isRequest = true;
            },2000);
            if (response.data.code == 1) {
              if(response.data.data && response.data.data.length > 0){
                vm.collectStoreData = vm.collectStoreData.concat(response.data.data)
                vm.storeNum = vm.collectStoreData.length;
                for ( var i = 0, l = vm.collectStoreData.length;i < l;i ++){
                  vm.collectStoreData[i].logo = comLink.yxtImgHost + vm.collectStoreData[i].logo;
                  vm.collectStoreData[i].isChoosedItem = false;
                }
              }else{
                vm.pageNum --
              }
            }else{
              vm.pageNum --
            }
          })
            .catch(function(res) {
              // Toast({
              //   //mintui提示效果
              //   message: "数据请求失败",
              //   duration: 2000
              // });
            });
        }
      },
      //店铺收藏列表
      collectStoreAxios: function(){
        var _vm = this;
        console.log(111111);
        axios.get(comLink.yxtHost + '/brand/getCollectBrand', {
          params:{
            openid:sessionStorage.openid,
            pageNum : _vm.storePageNum,
          }
        }).then(function(response) {
          console.log('店铺收藏列表response',response)
          if (response.data.code == 1) {
            _vm.collectStoreData = response.data.data;//获取11项品牌店铺列表
            console.log('aaaaa',_vm.collectStoreData)
            _vm.storeNum = _vm.collectStoreData.length;
            for ( var i = 0, l = _vm.collectStoreData.length;i < l;i ++){
              _vm.collectStoreData[i].logo = comLink.yxtImgHost + _vm.collectStoreData[i].logo;
              _vm.collectStoreData[i].isChoosedItem = false;
            }
            _vm.countStoreNum();
            console.log(_vm.collectStoreData[0].isChoosedItem,'店铺');
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
    //  商品收藏滚动事件
      scrollerRequireS(){
        if(this.isRequest){
          this.pageNum ++;
          this.isRequest = false;
          var vm = this;
          axios.get(comLink.yxtHost + '/product/getEnshrineProduct', {
            params:{
              openid:sessionStorage.openid,
              pageNum : vm.pageNum,
            }
          }).then(function(response) {
            setTimeout(function(){//todo
              vm.isRequest = true;
            },2000);
            console.log('商品收藏列表response',response.data.data);
            if (response.data.code == 1) {
              if(response.data.data && response.data.data.length > 0){
                vm.collectProData = vm.collectProData.concat(response.data.data)
              }else{
                vm.pageNum --;
            }
              // vm.collectProData = response.data.data;
              // vm.proNum = vm.collectProData.length;
              // for(var i = 0,l = vm.collectProData.length;i < l;i ++){
              //   vm.collectProData[i].logo = comLink.yxtImgHost + vm.collectProData[i].logo;
              //   vm.collectProData[i].checked = false;
              // }
            }else{
              // alert('失败')
              this.pageNum --;
            }
          })
            .catch(function(res) {
              // Toast({
              //   //mintui提示效果
              //   message: "数据请求失败",
              //   duration: 2000
              // });
            });
        }
      },
    //  商品收藏列表
      collectProductsAxios: function(){
        var _vm = this;
        axios.get(comLink.yxtHost + '/product/getEnshrineProduct', {
          params:{
            openid:sessionStorage.openid,
            pageNum : _vm.pageNum,
          }
        }).then(function(response) {
          console.log('商品收藏列表response',response);
          if (response.data.code == 1) {
            _vm.collectProData = response.data.data;
            _vm.proNum = _vm.collectProData.length;
            for(var i = 0,l = _vm.collectProData.length;i < l;i ++){
              _vm.collectProData[i].logo = comLink.yxtImgHost + _vm.collectProData[i].logo;
              _vm.collectProData[i].checked = false;
            }
          }else{
            // alert('失败')
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
    //  点击切换收藏商品和收藏店铺
      chooseCollect(i){
        this.num = i;
        //点击切换页面，隐藏删除按钮 编辑选项
        this.isShowChooseOicon = false;//选中单项
        this.isDelectBtnShow = false;//是否显示底部删除按钮
        this.isProEdit = '编辑';
        this.isStoreEdit = '编辑';
      },

    },
    components : {
      Scroller,
    }
  }
</script>
<style>
  .mycollect-content .pro-content .pro-list-show .list-main{
    background: white;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  *{
    padding: 0;
    margin: 0;

  }
  .mycollect-content{
    /*position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;*/

    .head-item{
      width: 100%;
      height: p(90);
      background: $bgBlue;
      text-align: center;
      color: #f5f8fe;

      .head-item-main{
        margin-top: p(8);
        display: inline-block;
        box-sizing: border-box;
        border: p(3) solid #f5f8fe;
        border-radius: p(10);

        .btn{
          padding: p(20) p(75);
        }
        .active{
          background: #f5f8fe;
          color: $bgBlue;
        }
      }
    }

    .pro-content{
      display: inline-block;
      width: 100%;
      .count-bar{
        display: inline-block;
        width: 100%;
        height: p(70);
        line-height: p(70);

        .edit-btn{
          display: inline-block;
          width: p(180);
          height: p(50);
          border-radius: p(10);
          text-align: center;
          line-height: p(50);
          margin-top: p(10);
          color: #999999;
          background: $bdColorEee;
        }
      }
      .pro-list-show{
        /*padding: 0 p(24);*/

        .list-main{
          padding: p(20) p(24);
          background: white;
          margin-top: p(20);
          width: 100%;
          &:last-child{
          	margin-bottom: 6.35rem;
          }
          .img-pic{
            width: p(133);
            height: p(133);
            background: #eee;
          }
          .pro-name-infos{
            /*max-width: p(300);*/
            color: #9fa0a1;
            line-height: p(30);
            text-align: left;
            max-width:70%;
            /*margin-top: p(15);*/
          }
          .pro-num{
            position: absolute;
            bottom: p(20);
            right: p(24);
          }
          .pro-price{
            color: #ff2727;
          }
          .price{
            position: absolute;
            bottom: p(20);
            left: p(174);
            >span:nth-child(1){
              color: #e40000;
            }
            >span:nth-child(2){
              color: #959595;
            }
          }
          .price.aaa{
            left: p(220);
          }
        }
      }
      .collect-store{
        display: inline-block;
        width: 100%;
        .collect-store-main{
          display: inline-block;
          width: 100%;
          margin-top: p(8);
          .collect-store-row{
            margin-top: p(20);
            display: inline-block;
            width: 100%;
            height: p(190);
            line-height: p(190);
            background: white;
            border-radius: p(15);


            .img-wai{
              width: p(130);
              height: p(130);
              overflow: hidden;
              text-align: center;
              margin-top: p(30);

              .img-pic{
                display: inline-block;
                width: 100%;
                background: #49BD28;
              }
            }
            .com-name{
              color: $bgBlue;
              margin-left: p(35);
            }
            .selected-btn{
              margin: p(80) p(20) 0 0;
            }
          }
        }
      }
    }
    .delete-btn-main{
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: p(100);
      line-height: p(100);
      box-sizing: border-box;
      border-top: p(1) solid #999999;
      background: white;
      .selected-btn{
        display: inline-block;
        width: p(40);
        height: p(40);
        border-radius: 50%;
        border: p(1) solid #d6d6d6;
      }
      .delect-button{
        display: inline-block;
        width: p(250);
        height: p(80);
        line-height: p(80);
        text-align: center;
        background: $bgBlue;
        color: white;
        margin-top: p(10);
        border-radius: p(10);
      }
    }
    .pro-list-show .selected-btn{
      display: inline-block;
      width: p(40);
      height: p(40);
      border-radius: 50%;
      border: p(1) solid #d6d6d6;
      float: left;
      margin: p(51) p(15) 0 0;
    }
  }
  .chooseAll{
    background: #8cbaff;
  }
  .selected-btn{
    display: inline-block;
    width: p(40);
    height: p(40);
    border-radius: 50%;
    border: p(1) solid #d6d6d6;
  }
</style>
