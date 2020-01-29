<template>
  <div class="sort-content b-white" v-title data-title="分类">
    <!--搜索输入框-->
    <!--<div class="search-main f-oh">
      <div class="search-inp-main f-oh f-fl">
        <i class="icon iconfont icon-search f-fl" @click="searchBtn()"></i>
        <input class="head-search f-fl" type="text" placeholder="搜索" @click="searchBtn()">
      </div>
      <p class="search-btn f-fl fontSize-14 w-color">搜索</p>
    </div>-->
		<div class="search-main f-oh">
      <div class="search-inp-main f-oh f-fl">
        <i class="icon iconfont icon-search f-fl" @click="searchBtn()" ></i>
        <input class="head-search f-fl fontSize-15"  @click="searchBtn()"  type="text" placeholder="邮讯通免息购物平台">
      </div>
      <!--<div class="search-btn f-pr f-fl w-color" @click = "toMes">
        <span class="newsNum" v-if="msgCount > 0">{{msgCount}}</span>
        <img src="../../../static/img/homemes.png"/>
      </div>-->
    </div>
    <!--产品分类列表-->
    <div class="pro-item-content fontSize-15">
      <!--左边选项列表-->
      <div class="left-lists">
        <ul class="left-lists-main">
          <li class="lists-row all-brand"
              :class="{listActive : listNum === -1 }"
              @click="clickAllBrand(-1)"
          >
            全部品牌
          </li>
          <li class="lists-row" v-for="(item,$index) in morePingdao"
              :key="$index"
              :class="{listActive : listNum === $index,'isListActive':isActive }"
              @click = "changeClick(item,$index)"
          >{{item.name}}
          </li>
        </ul>
      </div>
      <!--右边产品列表-->
      <div class="pro-right-content">
          <div>
            <dt class="pro-title fontSize-12">
              <span class="fontSize-14">—  {{detailBrandName}}  —</span>
              <span @click="visitMoreCategrage()" v-if="isShowMoreBtns">更多></span>
              <span @click="visitMoreBrand()" v-else>更多></span>
            </dt>
            <ul class="pro-main f-oh">
              <li class="pro-main-row f-fl m-top5" v-for="(pro,i) in erjiMuluData"
                  @click="toErjiMenu(pro,i)"
                  :key="i">
                <i class="img-main">
                  <img class="imgPic" :src=pro.logo alt="">
                </i>
                <p class="word fontSize-11">{{ pro.name }}</p>
              </li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
export default {
  name : 'sort',
  data (){
    return{
      listNum : -1,
      proLists : '',
      title: '分类',
      isActive : false,
      morePingdao : [],//分类一级目录
      erjiMuluData : [],//二级目录数据
      parentId : null,
      detailBrandName : '',
      isShowMoreBtns : true,
    }
  },
  methods : {
    getIndex (){

    },
     searchBtn(){
      $('input').blur();
      this.$router.push({
        path : '/home/storeSearch',

      })

    },
    //获取分类 左侧 一级目录列表
    moreFenleiAxios: function(){
      var vm = this;
      axios.get(comLink.yxtHost + '/category/categoryList', {
        params:{
          openid : sessionStorage.openid,
        }
      }).then(function(response) {
        if (response.data.code == 1) {
          vm.morePingdao = response.data.data;
          console.log(vm.morePingdao,'123');
          vm.parentId = vm.morePingdao[vm.listNum].id;//已经获取到需要传参id
          vm.detailFenleiAxios()//调用二级目录请求函数
          vm.changeClick(vm.morePingdao[vm.listNum],vm.listNum)
        }
      })
        .catch(function(res) {

        });
    },
    //获取所有品牌分类
    allBrandAxios: function(){
      var vm = this;
      axios.get(comLink.yxtHost + '/brand/list', {
        params : {
          openid : sessionStorage.openid,
          parentId : null,
        }
      }).then(function(response) {
        console.log("response111111112121221",response)
        if (response.data.code == 1) {
          vm.erjiMuluData = response.data.data;
          vm.addQianzhui();
        }
      })
        .catch(function(res) {

        });
    },
    //给图片加上前缀
    addQianzhui(){
      for(var i = 0,l = this.erjiMuluData.length;i < l;i ++){
        this.erjiMuluData[i].logo = comLink.yxtImgHost + this.erjiMuluData[i].logo
      }
    },
    geterjiMulu(){
      let hash = window.location.hash;
      hash = hash.split('=');
      this.parentId = hash[1];//传递过来的id
      this.detailFenleiAxios();
    },
    //二级目录接口
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
          vm.erjiMuluData = response.data.data;
          //添加图片前缀
          vm.addQianzhui();
        }
      })
        .catch(function(res) {

        });
    },
    //点击查看更多品牌
    visitMoreBrand(){
      this.$router.push({
        path : '/home/morePinpai',
      })
    },

    visitMoreCategrage(){
      if(this.listNum === -1){
        this.isShowMoreBtns = false;
      }else{
        this.$router.push({
          path : '/home/leibieSearchPro',
          query : {moreid : this.morePingdao[this.listNum].id}
        })
      }
    },
    //
    toErjiMenu(pro,i){
      if(this.listNum === -1){
        this.$router.push({
          path : '/home/brandStoreRouter',
          query : { id : pro.id }
        })
      }else{
        this.$router.push({
          path : '/home/leibieSearchPro',
          query : { id : pro.id}
        })
      }
    },
    //点击全部品牌
    clickAllBrand(n){
      this.listNum = n;
      this.allBrandAxios();
      this.judge()
      // this.proLists = this.proChooseLists[$index];
    },
    changeClick : function (item,$index) {
    	this.detailBrandName=item.name;
      this.listNum = parseFloat($index);
      this.parentId = this.morePingdao[this.listNum].id;
      this.detailFenleiAxios();
      this.judge()
    },
    judge(){
      if(this.listNum === -1){
        this.detailBrandName = '全部品牌';
        this.isShowMoreBtns = false;
        }else{
        this.isShowMoreBtns = true;
      }
      // else{this.detailBrandName = this.morePingdao[this.listNum].name}
    },
    sendWxtoOther() {
      var vm = this;
      $.post(comLink.yxtHost + '/user/sign', {
        'url': window.location.href,
        'openid' :sessionStorage.openid
      }, function(resp) {
        if(resp.code==1){
          wx.config({
            debug: false,
            appId: resp.data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
            timestamp: resp.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: resp.data.nonceStr, // 必填，生成签名的随机串
            signature: resp.data.signature, // 必填，签名
            jsApiList: [
              'onMenuShareAppMessage',
	            'onMenuShareTimeline',

            ]
          });
          wx.ready(function() {
            wx.onMenuShareAppMessage({ //朋友
              title: '邮讯通商城龙卡专区',
              desc: '更多分类供您选择',
              link: window.location.href,
              imgUrl: vm.erjiMuluData[0].logo,
              success: function() {

              },
              cancel: function() {

              }
            });
             //分享朋友圈
		        wx.onMenuShareTimeline({
		        		title: '邮讯通商城龙卡专区',
		            desc: '更多分类供您选择',// 分享标题
		            link:  window.location.href,
		            imgUrl: vm.erjiMuluData[0].logo,
		            success: function () {
		                // 用户确认分享后执行的回调函数
		            },
		            cancel: function () {
		                // 用户取消分享后执行的回调函数
		            }
		        });
          })
        }
      });
    },
  },
  watch: {
    '$route'(to,from) {
      console.log(from.name,' from的名称');
       if(from.name === 'home-mian'  || from.name === 'cart' || from.name === 'mine' || from.name ==='storeSearch'){
	       	if(to.name == 'sort'){
	        	this.sendWxtoOther();
	        }
        }
      if(from.name !== 'brandStoreRouter'&& from.name !== 'leibieSearchPro'){
        if(to.name == 'sort'){
          this.$nextTick(() => {
            // this.$refs.myScroller.reset({top:0})
            $('body,html').animate({scrollTop:0},1000);
          })
          this.getIndex()
          this.judge();
          let hash = window.location.hash;
          hash = hash.split('=');
          this.parentId = hash[1];//传递过来的id
          if(!hash[1]){
            this.allBrandAxios();
          }else{
            let hash = window.location.hash;//..?id=11&index=1
            hash = hash.split('=');
            let getIdArr = hash[1].split('&');
            let getId = getIdArr[0];
            this.listNum = hash[2];
            this.parentId = getId;//传递过来的id


            // this.detailFenleiAxios();
          }
          this.moreFenleiAxios();//获取一级分类列表
          this.getIndex()
        }
      }
    }
  },
  mounted:function(){
    this.getIndex()
    this.judge();
    let hash = window.location.hash;
    hash = hash.split('=');
    this.parentId = hash[1];//传递过来的id
    if(!hash[1]){
      this.allBrandAxios();
    }else{
      let hash = window.location.hash;//..?id=11&index=1
      hash = hash.split('=');
      let getIdArr = hash[1].split('&');
      let getId = getIdArr[0];
      this.listNum = hash[2];
      this.parentId = getId;//传递过来的id
      // this.detailFenleiAxios();
    }
    this.moreFenleiAxios();//获取一级分类列表
    this.getIndex();
       this.sendWxtoOther();
  },
}
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  input::-webkit-input-placeholder {
    color: #666 !important;
  }
  .sort-content{
    position: absolute;
    top: 0;
    bottom: p(100);
    right: 0;
    left: 0;
    overflow-y: auto;
    .search-main{
      height: p(90);
      width: 100%;
      background: #fff;
      padding: 0 p(30);
      	border-bottom:1px solid #ddd;
      .search-inp-main{

        margin: p(12) 0;
        width: 100%;
        height: p(64);
        border-radius: p(6);
        background: #f5f5f5;
        line-height: p(64);
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
        text-align: center;
        /*margin-top: p(8);*/
        vertical-align: middle;
        padding-top: p(25);
        position: relative;
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

    /*搜索列表标题*/
    .pro-item-content{
      width: 100%;
      .left-lists{
        width: p(200);
        position: absolute;
        top: p(90);
        bottom: 0;
        overflow-y: auto;
        left: 0;
        .left-lists-main{
          width: 100%;
          height: 100%;

          .lists-row{
            width: 100%;
            height: p(80);
            text-align: center;
            line-height: p(80);
            background: #eeeeee;
            margin: p(2) 0;
          }
          .all-brand{
            margin-bottom: p(4);
          }
          .listActive,.isListActive{
             background: white;
             box-sizing: border-box;
             border-left: p(8) solid #307ff5;
           }
        }
      }
      /*右侧产品列表*/
      .pro-right-content{
        position: absolute;
        top: p(90);
        bottom: 0;
        right: 0;
        left: p(200);

        .pro-title{
          text-align: left;
          height: p(64);
          line-height: p(64);
          width: 100%;
          margin-bottom: 1rem;
          padding: 0 p(20) 0 0;
          >span{
            display: inline-block;
            float: left;
          }
          >span:nth-child(1){
            width: 70%;
            text-align: right;
          }
          >span:nth-child(2){
            width:30%;
            text-align: right;
            color: #666;
          }
        }
        .pro-main{

          .pro-main-row{
            width: 33.3333%;
            text-align: center;
            margin-bottom: p(60);

            .img-main{
              width: 90%;

              .imgPic{
                width: p(90);
                height: p(80);
              }
            }
          }
        }
      }
    }
  }
</style>
