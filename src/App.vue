<template>
      <div id="app">
        <div class="all-content">
          <div class="back-icon-allpage" @click="backBtn()" v-if="isShowBackBtnIcon">
            <i class="icon iconfont icon-back"></i>
          </div>

        	<keep-alive include="home-mian,sort,leibieSearchPro,searchproRt,homeSearchRouter,cart,storeSearch,newhome">
            <router-view v-if="isRouterAlive"></router-view>
          </keep-alive>
          <!--<transition name="slide">-->
            <!---->
          <!--</transition>-->
          <div class="app-tabber"  v-show="app_tabberShowHidden">
            <ul>
              <li>
                <router-link class="router" to="/newhome">
                  <img src="./../static/img/home_02.png" v-if="path=='/newhome'">
                  <img src="./../static/img/home_01.png" v-else>
                  <div :class="path=='/newhome' ? 'active-tabber' : '' ">首页</div>
                </router-link >
              </li>
              <li>
                <router-link class="" to="/sort">
                  <img src="./../static/img/sort_02.png" v-if="path=='/sort'">
                  <img src="./../static/img/sort_01.png" v-else>
                  <div :class="path=='/sort' ? 'active-tabber' : '' ">进入分类</div>
                </router-link >
              </li>
              <li>
                <router-link class="" to="/cart">
                  <img src="./../static/img/cart_02.png" v-if="path=='/cart'">
                  <img src="./../static/img/cart_01.png" v-else>
                  <div :class="path=='/cart' ? 'active-tabber' : '' ">购物车</div>
                </router-link >
              </li>
              <li>
                <router-link class="" to="/mine">
                  <img src="./../static/img/mine_02.png" v-if="path=='/mine'">
                  <img src="./../static/img/mine_01.png" v-else>
                  <div :class="path=='/mine' ? 'active-tabber' : '' ">个人中心</div>
                </router-link >
              </li>
            </ul>
          </div>
          <!--<showItemBott-component v-if="showFixed"></showItemBott-component>-->
          <div class="bottom-show-item" v-if="showFixed">
            <div class="show-item-content">
              <ul class="show-main w-color">
                <li class="show-row icon-main" v-if="!showAll" @click="changeShow">
                  <i class="icon iconfont icon-less"></i>
                </li>
                <li class=" icon-main" v-if="showAll" @click="changeHide">
                  <i class="icon iconfont icon-moreunfold"></i>
                </li>

                <li class="m-top10 icon-main lists" v-for="(item,i) in classes"
                    @click="changeHide"
                    :key="i" v-if="showAll">
                  <!--<a class="router w-color" :href = "item.index === 5?'yxtccb.com:8080/chat/wab/index':''">-->
                  <!--<a style='width: 100%;' :href="item.index === 5?'http://www.yxtccb.com/admin/chat/wab/index':
                 '#'+item.routerPath">-->
                  <a style='width: 100%;' :href="item.routerPath">
                    <img class="img-pic" :src=item.imgPath>
                  </a>
                  <!--<i :class=item.class></i>-->
                </li>
                <li class="m-top10 icon-main lists" v-for="(item,j) in chatclass"
                    @click="changeHide"
                    v-if="showAll">
                  <a style='width: 100%;' @click="toChatNow()">
                    <img class="img-pic" :src=item.imgPath>
                  </a>
                </li>
              </ul>
            </div>
            <div class="cover" v-if='isShowCover' @click="hide"></div>
          </div>
          <div class="cover" v-if='isShowCover' @click="hide"></div>
          <div class="to-top" v-if="huidaodingbu" @click="goTop">
            <i class="icon iconfont icon-less"></i>
            <dt>TOP</dt>
          </div>
        </div>
        <div id="chat">

				</div>
    		<!--<div v-if="isBlackCoverShow" class="blackCoverShow" @click=""></div>-->
      </div>
</template>
<script>
//import store from "./store";
import './common/jq.min';
import './common/chat';
import $ from "jquery"; //导入jquery
import comLink from "@/common/common_link"; //导入总线
import { Toast} from "mint-ui";

// import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {//代码
    return {
      isRouterAlive: true,
      showFixed : true,//是否显示右下角全部选项列表
      // search2Data: "",
      path: "/home", //保存hash值
      app_tabberShowHidden: true, //是否显示底部导航
      isBackNone: false,
      isWordColor: false,
      huidaodingbu : false,
      isShowCover : false,
      showAll : false,
      classes : [
        {
          class : 'icon iconfont icon-comments',
          index : 1,
          imgPath : '@/../static/image/home/brand_store/home_01 (2).png',
          routerPath : '#/home'
        },
        {
          class : 'icon iconfont icon-wode',
          index : 2,
          imgPath : '@/../static/image/home/brand_store/mycenter_01.png',
          routerPath : '#/mine'
        },
        {
          class : 'icon iconfont icon-set',
          index : 3,
          imgPath : '@/../static/image/home/brand_store/zuji_01.png',
          routerPath : '#/mine/mytrackRouter'
        },
        {
          class : 'icon iconfont icon-xihuan',
          index : 4,
          imgPath : '@/../static/image/home/brand_store/collect_02.png',
          routerPath : '#/mine/myAsset/mycollectRouter'
        },
//      {
//        class : 'icon iconfont icon-comments',
//        index : 5,
//        imgPath : '@/../static/image/home/brand_store/mymessage_01.png',
//        routerPath : '/'
//      },
      ],
      chatclass:[
       {
          class : 'icon iconfont icon-comments',
          index : 1,
          imgPath : '@/../static/image/home/brand_store/mymessage_01.png',

        },
      ],
      isHuanCun : true,
      isShowBackBtnIcon : false,
    };
  },
  created() {
    this.pathChange(this.$route.fullPath);
  
  },
  methods: {
  		getInsideDetail() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/getInsideDetail',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId,
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.background = resp.data.background;
              vm.title = resp.data.title
              document.title = vm.title
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
  	 toChatNow(){//直接聊天

         //判断客服是否在线
      	$('#chat').click()
      },
    //刷新路由页面
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    backBtn(){
      this.$router.back(-1);
    },
    changeShow : function () {
      this.showAll = true;
      this.isShowCover = true;
    },
    changeHide : function () {
      this.showAll = false;
      this.isShowCover = false;
    },
    hide(){
      this.showAll = false;
      this.isShowCover = false;
    },
    //根据hash值判断头部和底部是否显示
    pathChange(newValue,oldValue) {
      //获取城市数据
      // this.city = this.$store.getters.getvuexCityData.city;
      // this.headerTitle = this.$route.meta.title; //设置头部标题
//    if(
//    		(newValue === "/indusorder/chooseCoupon" &&  oldValue === "/indus/orderConfirm") ||
//    		(newValue === "/indus/induspayAddress" &&  oldValue === "/indus/orderConfirm")	||
//    		(newValue === "/indus/orderConfirm" &&  oldValue === "/indus/induspayAddress")	||
//    		(newValue === "/indus/orderConfirm" &&  oldValue === "/indusorder/chooseCoupon") ||
//    		(newValue === "/indus/orderConfirm" &&  oldValue === "/")
//    	)
//    {
//    	console.log(1)
//    }else{
//    	console.log(2)
//				sessionStorage.removeItem("couponUserId");
// 			sessionStorage.removeItem("addressId");
//    }
      if(
      	newValue === "/indus/orderConfirm" ||
      	newValue === "/indus/induspayAddress" ||
      	newValue === "/indusorder/chooseCoupon" ||
      	newValue === "/home/carConfirmOrder" ||
      	newValue === "/home/confirmOrderRouter"||
      	newValue === "/home/payAddressRouter" ||
      	newValue === "/indusorder/chooseCoupon2"
      	
      ){
      }else{
      	sessionStorage.removeItem("couponUserId");
      	sessionStorage.removeItem("couponId");
 				sessionStorage.removeItem("addressId");
      }

      switch (newValue) {
        case "/home":
          this.path = "/home";
          this.app_tabberShowHidden = true;//是否显示tabbar
          this.showFixed = true;
          this.isShowBackBtnIcon = false;
          break;
        case "/newhome":
          this.path = "/newhome";
          this.app_tabberShowHidden = true;//是否显示tabbar
          this.showFixed = true;
          this.isShowBackBtnIcon = false;
          break;
        case "/indusBuyhome":
          this.path = "/indusBuyhome";
          this.app_tabberShowHidden = false;//是否显示tabbar
          this.showFixed = false;
          this.isShowBackBtnIcon = false;
          break;
        case "/indusInput":
          this.path = "/indusInput";
          this.app_tabberShowHidden = false;//是否显示tabbar
          this.showFixed = false;
          this.isShowBackBtnIcon = false;
          break;
        case "/indushome":
          this.path = "/indushome";
          this.app_tabberShowHidden = true;//是否显示tabbar
          this.showFixed = true;
          this.isShowBackBtnIcon = false;
          break;
        case "/sort":
          this.path = "/sort";
          this.app_tabberShowHidden = true;
          this.showFixed = true
          this.isShowBackBtnIcon = true;
          break;
        case "/cart":
          this.path = "/cart";
          this.app_tabberShowHidden = true;
          this.showFixed = true
          this.isShowBackBtnIcon = true;
          break;
        case "/indusCart":
          this.path = "/indusCart";
          this.app_tabberShowHidden = false;
          this.showFixed = false
          this.isShowBackBtnIcon = true;
          break;
        case "/indus/mycoupon":
          this.path = "/indus/mycoupon";
          this.app_tabberShowHidden = false;
          this.showFixed = false
          this.isShowBackBtnIcon = true;
          break;
        case "/mine":
          this.path = "/mine";
          this.app_tabberShowHidden = true;
          this.showFixed = false;
          this.isShowBackBtnIcon = true;
          break;
        case "/indus/personcenter":
          this.path = "/personcenter";
          this.app_tabberShowHidden = false;
          this.showFixed = false;
          this.isShowBackBtnIcon = false;
          break;
        default:
          this.app_tabberShowHidden = false;
          this.showFixed = true;
          this.isShowBackBtnIcon = true;
      }
      if(newValue.indexOf('order/daiFaHuo') != -1){
        this.isShowBackBtnIcon = false;
      }
      if(newValue.indexOf('indus') != -1){
        this.showFixed = false;
        if(sessionStorage.insideId){
		    	this.getInsideDetail()
		    }
      }

      //调用判断函数
      this.judgeRouter(newValue);
    },
    huadong(){//滑动效果
      var that = this;
      $(window).scroll(function () {
        let height=$(window).height();
        if($(window).scrollTop() > height){
          that.huidaodingbu = true;
          // that.goTop();//返回顶部按钮出现，调用方法
        }else{
          that.huidaodingbu = false;
        }
      })
    },
    goTop(){
//      $(window).scrollTop('0')
        $('html,body').animate({'scrollTop':'0'},550)
    },

    //
    //
    judgeRouter(newValue) {
      let routerValue = newValue;
//    console.log(routerValue)
      var pathValue = newValue.slice(0, 5);
      var sorceVal = newValue;
      // if(routerValue === '/home/proDetailRouter'){
      //   this.isHuanCun = false;
      // }

      this.isBackNone = false;
      this.isWordColor = false;
      if (pathValue === "/sort") {
        this.app_tabberShowHidden = true;
      }
      if(pathValue === '/mine'||pathValue === '/orde'){
        this.showFixed = false
      }

      // if (pathValue === "/mine" || pathValue === "/cart") {
      //   this.isBackNone = true;
      // }
      // if (sorceVal === "/mine/scoreRouter") {
      //   this.isWordColor = true;
      // }
      // console.log("路径:", sorceVal);
      if(routerValue==="/mine/myAsset/orderRouter"){
        this.showFixed = true;
      }
    },

  },
  mounted (){
    this.huadong();
		var _vm = this;


//			window.addEventListener('scroll', function () {
//			    console.log("移动端可以实现")
//			})
//			window.addEventListener('click', function () {
//			    console.log("移动端可以实现")
//			})
    // this.bandAdjustSize();
    // this.goTop();
    // this.judgeRouter(newValue)
  },
  components : {
    // Scroller,
    // Divider,
    // Spinner,
    // XButton,
    // Group,
    // Cell,
    // LoadMore
  },
  watch: {
    //监控更改,newValue是当前路由信息，oldVal是上一个路由信息
    $route: function(newValue,oldVal) {
      //路由更改执行事件
      this.pathChange(newValue.path,oldVal.path);
//    console.log(newValue.path,'-',oldVal.path)
    },

  },


};
</script>
<style>

</style>
<style lang="scss">
@import "./../src/sass/public.scss"; //导入scss初始文件
html { -webkit-text-size-adjust:100%!important; }
body { -webkit-text-size-adjust:100%!important; }
.back-icon-allpage{
  position: fixed;
  top: p(15);
  left: p(5);
  width: p(55);
  height: p(55);
  text-align: center;
  line-height: p(55);
  border-radius: 50%;
  background: black;
  opacity: 0.3;
  color: white;
  z-index: 9;
}

/*@media only screen and (device-width: 375px) and (device-height: 812px) and*/

/*(-webkit-device-pixel-ratio: 3) {*/

  /*!*增加头部适配层*!*/

  /*#app {*/

    /*height: 100%;*/

    /*box-sizing: border-box;*/

    /*padding-top: 44px;*/

    /*&:before {*/

      /*content: '';*/

      /*position: fixed;*/

      /*top: 0;*/

      /*left: 0;*/

      /*width: 100%;*/

      /*height: 44px;*/

      /*background-color: #000000;*/

      /*z-index: 9998;*/

    /*}*/

  /*}*/
/*}*/
/*.all-content {*/
  /*box-sizing: border-box;*/
  /*padding-bottom: 34px;*/
  /*&:after {*/
    /*content: '';*/
    /*z-index: 9998;*/
    /*position: fixed;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    /*height: 34px;*/
    /*background: #f7f7f8;*/
  /*}*/
/*}*/
/*!*导航操作栏上移*!*/
/*.bottom-menu-fixed {*/
  /*bottom: 34px;*/
/*}*/
/*.all-content{*/
  /*display: inline-block;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*!*padding-bottom: p(20);*!*/
/*}*/
.cover{
  position: fixed;
  top: 0 ;
  right: 0;
  left: 0;
  bottom: 0;
  background: transparent;
  z-index: 98;
}
.to-top{
  position: fixed;
  display: inline-block;
  width: p(85);
  height: p(85);
  bottom: p(305);
  right: p(20);
  background: #666;
  opacity: 0.6;
  color: white;
  text-align: center;
  font-size: p(24);

  .icon-less{
    font-size: p(40);
  }
}
.header-main{
  width: 100%;
  height: p(90);
  /*background-color: #307ff5;*/
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.mint-header-title {
  font-size: 2.25rem;
  line-height: 2.5rem;
  height: 2.5rem;
  font-weight: 500;
}
#app {
  height: 100% !important;
  /*padding-bottom: p(20);*/
}
// 动画切换效果
.slide-enter-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
// 顶部标题begin
.mint-header {
  background-color: black;
  height: 2.8125rem*2;
}

.mint-header.backNone {
  background-color: white !important;
  color: black;
  border-bottom: p(1) solid #999999;
}
.mint-header.wordColor {
  background-color: rgba(0, 0, 0, 0) !important;
  z-index: 1;
  color: #ffffff;
  /*font-size: p(38);*/
}
//搜索begin
.home-search {
  z-index: 9999999999;
  height: 2.8125rem*2;
  line-height: 2.8125rem*2;
  padding: 0 0.9375rem*2;
  width: 100%;
  box-sizing: border-box;
  background: #307feb;
  position: fixed;
  color: white;
  top: 0;
  display: flex;
  justify-content: space-between;
  .left {
    font-size: 0.8125rem*2;
    font-weight: 500;
    width: 18%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .middle {
    width: 55%;
    line-height: p(90);
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.3rem*2;
      text-align: left;
      font-size: 0.6875rem*2;
      height: 1.4375rem*2;
      background: rgba(0, 0, 0, 0);
      border: 1px solid white;
      border-radius: 0.3rem*2;
      color: white;
    }
    input:-moz-placeholder {
      color: white;
      opacity: 1;
    }

    input::-moz-placeholder {
      color: white;
      opacity: 1;
    }

    input:-ms-input-placeholder {
      color: white;
      opacity: 1;
    }

    input::-webkit-input-placeholder {
      color: white;
      opacity: 1;
    }
  }
  .right {
    width: 21%;
    margin-top: 0.75rem*2;
    color: #307feb;
  }
  .mint-button--small {
    font-size: 0.8125rem*2;
    height: 1.4rem*2;
    padding: 0 0.375rem*2;
  }
}
.home-search2 {
  z-index: 9999999999;
  height: 2.8125rem*2;
  line-height: 2.8125rem*2;
  padding: 0 0.9375rem*2;
  width: 100%;
  box-sizing: border-box;
  background: #307feb;
  position: fixed;
  color: white;
  top: 0;
  display: flex;
  justify-content: space-between;
  .left {
    font-size: 0.8125rem*2;
    font-weight: 500;
    width: 7%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .middle {
    width: 75%;
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.3rem*2;
      text-align: center;
      font-size: 0.6875rem*2;
      height: 1.4375rem*2;
      background: rgba(0, 0, 0, 0);
      border: 1px solid white;
      border-radius: 0.3rem*2;
      color: $fontGray;
      background: white;
    }
    input:-moz-placeholder {
      color: $fontGray;
      opacity: 1;
    }

    input::-moz-placeholder {
      color: $fontGray;
      opacity: 1;
    }

    input:-ms-input-placeholder {
      color: $fontGray;
      opacity: 1;
    }

    input::-webkit-input-placeholder {
      color: $fontGray;
      opacity: 1;
    }
  }
  .right {
    width: 10%;
    margin-top: 0.75rem*2;
    color: white;
    background: #307feb;
    font-size: 0.8125rem*2;
    height: 1.4rem*2;
    line-height: 2.8rem;
    padding: 0 0;
  }
}
// 顶部标题end
// 底部tabber***begin
/*.zhicheng {*/
  /*height: 7.25rem;*/
/*}*/
.app-tabber {
  border-top: 1px solid #ededed;
  display: inline-block;
  width: 100%;
  background: white;
  // position: absolute;
  position: fixed;
  right: 0;
  left: 0;
  z-index: 9;
  bottom: 0;
  > ul {
    display: flex;
    justify-content: space-between;
    > li {
      box-sizing: border-box;
      padding-top: 0.375rem*2;
      width: 20%;
      text-align: center;
      height: 3.125rem*2;

      > a {
        display: inline-block;
        width: 100%;
        height: 100%;
        img {
          width: 1.375rem*2;
          height: 1.375rem*2;
        }
        div {
          font-size: 0.625rem*2;
          line-height: 1.3rem*2;
        }
        .active-tabber {
          color: #307feb;
        }
      }
    }
  }
}
.bottom-show-item{

  .show-item-content{
    .show-main{
      display: inline-block;
      position: fixed;
      width: p(85);
      /*height: p(85);*/
      bottom: p(405);
      text-align: center;
      right: p(20);
      z-index: 99;
      background: #666;
      opacity: 0.6;
      padding-bottom: p(10);
      text-align: center;
    }
  }
}
.icon-main{
  /*padding: 0 p(5);*/

  .img-pic{
    width: p(40);
  }
  a{
    width: 100%;
    height: p(50);
  }
}
.lists{
  padding: p(5) p(5) p(10) p(5);
}
.icon{
  font-size: p(50);
}
.show-row{
	padding-top: p(10);
  width: p(65);
  text-align: center;
  margin: 0 auto;
}
.icon-main.lists .router{
  width: 100%;
  height: 100%;
  display: inline-block;
}
.cover{
  position: fixed;
  top: 0 ;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  background: transparent;
}
// 底部tabber***end
// 部分页面用到的右上角按钮
.rightTopBtn {
  position: fixed;
  top: 0;
  right: 0;
  width: 10rem;
  height: 5.62rem;
  z-index: 3;
}
//解决上下拉问题，不能用scoped
.mint-loadmore-content {
  width: 100%;
}
</style>

