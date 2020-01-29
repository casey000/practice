<template>
  <div class="edit-weistore-content fontSize-14" v-title data-title="编辑微店">
    <ul class="edit-main">
      <li class="edit-row name f-oh" @click="changeName()">
        <span class="f-fl">微店昵称</span>
        <i class="icon iconfont icon-more f-fr"></i>
      </li>
      <li class="edit-row introduce f-oh" @click="editWeiIntro()">
        <span class="f-fl">微店介绍</span>
        <i class="icon iconfont icon-more f-fr"></i>
      </li>
    </ul>
    <ul class="manage-main">
      <li class="manage-row" @click="proManage()">
        <img class="inner-img" :src=advIcon.pingtaiPro alt="">
        <span class="word">平台商品</span>
      </li>
      <li class="manage-row" @click="bossTuijian()">
        <img class="inner-img" :src=advIcon.bossTuijian alt="">
        <span class="word">店主推荐</span>
      </li>
      <li class="manage-row" @click="bossManagePro()">
        <img class="inner-img" :src=advIcon.proGuanli alt="">
        <span class="word">微店商品管理</span>
      </li>
    </ul>
    <div class="is-contact f-oh p-lef-rig24">
      <span class="f-fl">是否开启微信电话联系？</span>
      <mt-switch class="switch f-fr" :value.sync="phoneContact" @change="phone()"></mt-switch>
    </div>
    <div class="is-contact f-oh p-lef-rig24">
      <span class="f-fl">是否开启微店广告栏？</span>
      <mt-switch class="switch f-fr" :value.sync="weiDianAdv" @change="adv()"></mt-switch>
    </div>
    <!--<div class="confirm-btns" @click="saveBtn()">
      <span>确定</span>
    </div>-->
  </div>
</template>
<script>
  import { Indicator, Toast, Popup, DatetimePicker,Switch } from "mint-ui";
  import comLink from "./../../../../common/common_link"; //导入总线
  import axios from 'axios'
  export default {
    data (){
      return{
        advIcon:{
          pingtaiPro : '@/../static/image/mine/weiStorePro.png',
          bossTuijian : '@/../static/image/mine/bossTuijian.png',
          proGuanli : '@/../static/image/mine/weiStorePro.png',
        },
        phoneContact : false,//是否开启电话联系
        weiDianAdv : false,//是否开启微店广告
        introduce : null,
        weiStoreName : null,
        backgroundFile : comLink.weiStoreImg,
        weiStoreId : '',
        isOpenAdvert : 0,
        isOpenPho : 0,
      }
    },
    mounted (){
      // this.getSessionData()
      	this.getWeiStoreAxios()
    },
    methods : {
      phone(){
        this.phoneContact = !this.phoneContact;
        console.log(this.phoneContact)
        if(this.phoneContact){
          this.isOpenPho = 1
        }else{
          this.isOpenPho = 0;
        }
        this.editWeiStoreAxios();//点击是否电话联系 发送请求
      },
      adv(){
       this. weiDianAdv = !this.weiDianAdv;
        console.log(this.weiDianAdv)
        if(this.weiDianAdv){
          this.isOpenAdvert = 1
        }else{
          this.isOpenAdvert = 0;
        }
        this.editWeiStoreAxios();//点击是否开启微店广告栏 发送请求
      },
      //保存微店
      editWeiStoreAxios: function(){
        var _vm = this;
        axios.get(comLink.yxtHost + '/store/saveStore', {
          params:{
            storeId : sessionStorage.weiStoreId,
            openid : sessionStorage.openid,
            // backgroundFile : null,
            isOpenAdvert : _vm.isOpenAdvert,
            isOpenPho : _vm.isOpenPho,
            // name : _vm.weiStoreName,
            // expId : storeId,
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            // Toast({
            //   //mintui提示效果
            //   message: response.data.msg,
            //   duration: 2000,
            // });
          }else{
            // alert('失败')
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
       getWeiStoreAxios: function(){
        var _vm = this;
        axios.get(comLink.yxtHost + '/store/getStore', {
          params:{
            storeId : sessionStorage.weiStoreId,
            openid : sessionStorage.openid,
            // backgroundFile : null,
          
            // name : _vm.weiStoreName,
            // expId : storeId,
          }
        }).then(function(response) {
        	console.log(response.data)
          if (response.data.code == 1) {
          		
          		if(response.data.data.isOpenAdvert===1){
          			_vm.weiDianAdv=true;
          		}
          		if(response.data.data.isOpenPho===1){
          			_vm.phoneContact=true;
          		}
          		
          
          }else{
            // alert('失败')
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
      //从储存器获取书记
      getSessionData (){
        // this.weiStoreId = sessionStorage.weiStoreId;
      },
      changeName(){
        this.$router.push({
          path : '/mine/editChangeName'
        })
      },
      editWeiIntro(){
        this.$router.push({
          path : '/mine/introduceWeiStore'
        })
      },
      proManage(){
        this.$router.push({
          path : '/mine/weiStorePro',
          // query : {storeId : this.weiStoreId}
        })
      },
      bossTuijian(){
        this.$router.push({
          path : '/mine/bossTuijian',
          // query : {storeId : this.weiStoreId}
        })
      },
      bossManagePro(){
        this.$router.push({
          path : '/mine/bossManagePro'
        })
      }
    }
  }
</script>
<style>
  .is-contact .mint-switch-input:checked+.mint-switch-core{
    border-color: #fe842f;
    background-color: #fe842f;
  }

</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss";
.edit-weistore-content{
  width: 100%;
  .edit-main{
    width: 100%;
    margin-top: p(10);

    .edit-row{
      width: 100%;
      height: p(95);
      line-height: p(95);
      padding: p(0) p(24);
      display: inline-block;
      background: white;
      margin-top: p(10);
    }
  }
  .manage-main{
    width: 100%;
    height: p(195);
    background: white;
    margin-top: p(16);/*已有4像素margin*/
    display: flex;
    justify-content: space-evenly;
    .manage-row{
      width: 33.33%;
      height: 100%;
      text-align: center;
      padding: p(30) 0 0 0 ;

      .inner-img{
        display: block;
        margin: 0 auto;
        width: p(90);
        height: p(90);
        /*border: p(1) solid #eee;*/
        box-sizing: border-box;
        border-radius: p(20);
      }
      .word{
        display: block;
        margin-top: p(20);
        color: #747474;
      }
    }
  }
  .is-contact{
    width: 100%;
    height: p(95);
    line-height: p(95);
    background: white;
    margin-top: p(20);
    .switch{
      margin-top: p(16);
    }
  }
  .confirm-btns{
    display: inline-block;
    height: p(70);
    width: 100%;
    font-size: p(30);
    text-align: center;
    margin-top: p(20);
    >span{
      display: inline-block;
      width: p(200);
      height: 100%;
      line-height: p(70);
      background: $bgBlue;
      color: white;
      border-radius: p(10);
    }
  }
}
</style>
