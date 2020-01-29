<template>
  <div class="mycollect-content" v-title data-title="我的足迹">
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
    <div class="pro-content " v-if="num === 0">
      <div class="count-bar p-lef-rig24 b-white f-oh">
        <span class="fontSize-14 f-fl">
          共浏览<span style="color: #ff675f;">{{proNum}}件</span>商品
        </span>
        <span class="fontSize-15 f-fr edit-btn" @click="editBtn">{{isProEdit}}</span>
      </div>
      <div class="pro-list-show f-oh">
        <div class="f-oh f-fl list-main f-pr" v-for="(item,i) in proInfoLists" :key="i" @click="toProDetail(item)">
          <i class="selected-btn" :class="{ chooseAll : item.checked}" v-if="isShowChooseOicon" @click="checkProduct(item)"></i>
          <img class="img-pic dis-inblo f-fl" :src=item.logo alt="">
          <div class="pro-name-infos f-fl m-left10">
            <span class="pro-title fontSize-14 f-db">{{ item.name }}</span>
            <!--<span class="pro-detail fontSize-10 f-db">{{ item.spec }}</span>-->
          </div>
          <span class="pro-price dis-inblo fontSize-10 f-fr">￥{{ item.mallPrice }}</span>
          <!--<span class="pro-num dis-inblo fontSize-10 f-fl">X{{ item.count }}</span>-->
        </div>
      </div>
    </div>
    <div class="store-content" v-if="num === 1">
      <div class="count-bar p-lef-rig24 b-white f-oh">
        <span class="fontSize-14 f-fl">
          共浏览<span style="color: #ff675f;">{{storeNum}}间</span>店铺
        </span>
        <span class="fontSize-15 f-fr edit-btn"  @click="editBtn">{{isProEdit}}</span>
      </div>
      <div class="collect-store ">
        <ul class="collect-store-main p-lef-rig24 f-oh">
          <li class="collect-store-row p-lef-rig24 f-oh f-fl"
              v-for="(item,i) in companyCollectLists" :key="i"
              @click = 'Tobrand(item)'
          >
            <i class="selected-btn f-fl" :class="{ chooseAll : item.isChoosedItem}" v-if="isShowChooseOicon" @click="checkStore(item)"></i>
            <img class="img-pic f-fl" :src=item.logo alt="">
            <span class="f-fl com-name fontSize-15">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="isDelectBtnShow" class="delete-btn-main p-lef-rig24 f-oh fontSize-17">

      <div class="f-fl" @click="chooseAllpro()" v-if="num === 0">
        <i class="selected-btn" :class="{ chooseAll : isChooseAll }"></i>
        <span>全选</span>
      </div>
      <div class="f-fl" @click="chooseAllstore()" v-if="num ===1">
        <i class="selected-btn" :class="{ chooseAll : isChooseAllst }"></i>
        <span>全选</span>
      </div>
      <div class="delect-button f-fr" @click="confirmedDe()">
        <span>删除</span>
      </div>
    </div>
    <div v-if="isBlackCoverShow" class="blackCoverShow" @click="blockClick"></div>
  </div>
</template>
<script>
  // import orderProListComponent from "./../../../subcomponents/orderProList-component.vue";
  import { Scroller, Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
  import { Navbar, TabItem ,Indicator, Toast, Popup, DatetimePicker,MessageBox } from "mint-ui";
  import comLink from "./../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
//import '../../common/jq.min';
//import '../../common/jquery.qrcode.min';
  export default{
    data (){
      return {
        num : 0,
        proNum : 0,
        storeNum : 0,
        isProEdit : '编辑',
        isStoreEdit : '编辑',
        //编辑状态以下变量为true
        isShowChooseOicon:false,
        isDelectBtnShow : false,//是否显示底部删除按钮
        isChooseAll : false,//全选
        confirmDelect : false,

        deleIndex : null,
        deleIndexCom : null,
        isChooseTotal : 0,//共选中数量
        isChooseComTotal : 0,//店铺被选中数量
        isBlackCoverShow : false,
        isCall : false ,
        navs : [
          { name : '商品' },
          { name : '店铺' }
        ],
        proInfoLists : [
//        {
//          imgPath : '',
//          name : '红米note手机',
//          spec : '全面屏/400Ah大电量/前置柔光自拍/14nm',
//          price : 3998.99,
//          count : 1,
//          isChoosedItem : false ,
//        },
//        {
//          imgPath : '',
//          name : '红米note手机',
//          spec : '全面屏/400Ah大电量/前置柔光自拍/14nm',
//          price : 3998.99,
//          count : 1,
//          isChoosedItem : false ,
//        },
        ],
        companyCollectLists : [],
        type : '2',//类型 1：品牌 2：商品
        ids : [],//取消足迹的id

      }
    },
    methods : {
    	chooseAllstore(){
      	this.isChooseAllst = !this.isChooseAllst;

        if(this.isChooseAllst) {

        	for(var i = 0,l = this.companyCollectLists.length;i < l;i ++){
	          this.companyCollectLists[i].checked=true;
	        }
          $('.selected-btn').addClass('chooseAll');
        } else {

        	for(var i = 0,l = this.companyCollectLists.length;i < l;i ++){
	          this.companyCollectLists[i].checked=false;
	        }
          $('.selected-btn').removeClass('chooseAll');
        }
      },
    	//点击店铺
      checkStore(item){
        item.checked = !item.checked;
        this.companyCollectLists.splice(100,0);
        console.log(item.checked)
        var count = 0;
        for(var i = 0,l = this.companyCollectLists.length;i < l;i ++){
          if(this.companyCollectLists[i].checked){
            count ++;
            this.isChooseAllst = true;
          }else{
            this.isChooseAllst = false;
          }
        }
        if(count === this.companyCollectLists.length) {
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
    	Tobrand(item){
      	if(this.isDelectBtnShow === false){
          this.$router.push({
            path : '/home/brandStoreRouter',
            query:{id:item.id}
          })
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
      chooseAllpro(){
        this.isChooseAll = !this.isChooseAll;

        if(this.isChooseAll) {
        	for(var i = 0,l = this.proInfoLists.length;i < l;i ++){
	          this.proInfoLists[i].checked=true;
	        }

          $('.selected-btn').addClass('chooseAll');
        } else {
        	for(var i = 0,l = this.proInfoLists.length;i < l;i ++){
	          this.proInfoLists[i].checked=false;
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
      //单选编辑产品
      checkProduct(item){
        item.checked = !item.checked;
        this.proInfoLists.splice(100,0);
        var count = 0;
        for(var i = 0,l = this.proInfoLists.length;i < l;i ++){
          if(this.proInfoLists[i].checked){
            this.isChooseAll = true;
            count ++;
          }else{
            this.isChooseAll = false;
          }
        }
        if(count === this.proInfoLists.length) {
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
      chooseCollect(i) {
        this.num = i;
        if(this.num === 0){
          this.type = 2;
        }else{
          this.type = 1;
        }
        this.myTrackAxios();
      },
      //我的足迹列表
      myTrackAxios(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/footprint/index',
          data:{
            'type' : vm.type,//类型 1：品牌 2：商品
            'openid' : sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
          	console.log(data)
            if(data.code == 1){
              if(vm.type === 1){
                vm.companyCollectLists = data.data;
                vm.storeNum = vm.companyCollectLists.length;
                console.log(vm.proNum,'收藏店铺数量')
                for(var i = 0,l = vm.companyCollectLists.length;i < l;i ++){
                  vm.companyCollectLists[i].logo = comLink.yxtImgHost + vm.companyCollectLists[i].logo;
                }
              }else if(vm.type === 2){
                vm.proInfoLists = data.data;
                vm.proNum = vm.proInfoLists.length;
                for(var i = 0,l = vm.proInfoLists.length;i < l;i ++){
                  vm.proInfoLists[i].logo = comLink.yxtImgHost + vm.proInfoLists[i].logo;
                }
              }


//            Toast({
//              message: data.msg,
//              duration: 2000
//            });
            }

          },
          error:function (data) {

          }
        })
      },
      routerToStore (){
        // this.$router.push({
        //   path: '/home/brandStoreRouter'
        // });
      },
      editBtn(){//点击编辑按钮 页面显示编辑功能
        if(this.isProEdit === '编辑'&&this.proInfoLists.length!==0){
          this.isShowChooseOicon = true
          this.isDelectBtnShow = true
          this.isProEdit = '取消'
        }else if(this.isProEdit = '取消'){
          this.isShowChooseOicon = false
          this.isDelectBtnShow = false
          this.isProEdit = '编辑'
        }
      },
      ////判断收藏产品编辑是否被选中--结束
      blockClick : function(){//点击黑色遮罩层
        if(this.isBlackCoverShow){
          this.isBlackCoverShow = false
          this.isCall = false
          // this.isCall = false
        }
      },
    },
    created (){
      // this.countStoreNum();

    },
    components : {

    },
    mounted(){
      this.myTrackAxios();
    	this.chooseCollect(0)
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
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

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

    .pro-content,.store-content{
      display: inline-block;
      width: 100%;
      padding-bottom: p(120);
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
          .img-pic{
            width: p(133);
            height: p(133);
            background: #eee;
          }
          .pro-name-infos{
            max-width: p(300);

            .pro-detail{
              color: #9fa0a1;
              line-height: p(30);
              text-align: left;
              margin-top: p(15);
            }
          }
          .pro-num{
            position: absolute;
            bottom: p(40);
            right: p(24);
          }
          .pro-price{
            color: #ff2727;
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

            .img-pic{
              display: inline-block;
              width: p(130);
              height: p(130);
              background: #49BD28;
              margin-top: p(30);
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
        width: p(30);
        height: p(30);
        border-radius: 50%;
        border: 0.5px solid #d6d6d6;
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
      width: p(30);
      height: p(30);
      border-radius: 50%;
      border: 0.5px solid #d6d6d6;
      float: left;
      margin: p(51.5) p(15) 0 0;
    }
  }
  .call-popup{
    display: inline-block;
    height: p(290);
    border-radius: p(10);
    background: white;
    position: fixed;
    top: p(375);
    right: p(75);
    left: p(75);
    z-index: 99;
    overflow: hidden;

    .warn{
      text-align: center;
      margin-top: p(30);
    }
    .confirm-call{
      margin-top: p(50);
      text-align: center;
    }
    .btn-main{
      display: flex;
      justify-content: space-between;
      margin-top: p(48);
      .btns{
        width: 49.5%;
        display: inline-block;
        height: p(100);
        line-height: p(100);
        text-align: center;
      }
      .cancel-btn{
        background: #c0d9ff;
        color: #307ff5;
      }
      .confirm-btn{
        background: #307ff5;
        color: white;
      }
    }
  }
  .chooseAll{
    background: #8cbaff;
  }
  .selected-btn{
    display: inline-block;
    width: p(30);
    height: p(30);
    border-radius: 50%;
    border: p(1) solid #d6d6d6;
  }
</style>
