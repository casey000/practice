<template>
  <div class="confirm-address-content"  v-title data-title="收货地址">
    <div class="address-infos-lists">
      <ul class="address-main">
        <li class="address-row b-white m-bottom10"
            v-for="(item,i) in shouhuoAddressData"
            :key="i">
          <div class="infos-detail p-lef-rig24" @click="selAddress(item.id)">
            <div class="name-phone">
              <span class="fontSize-15 m-left15">{{ item.name }}</span>
              <span class="fontSize-13 m-left10">{{ item.phone }}</span>
            </div>
            <dt class="address fontSize-12 f-oh">
              <!--<i class="icon iconfont icon-weizhi-xianxing f-fl"></i>-->
              <img class="address-icon" :src="addressIcon" alt="">
              <span class="f-fl word ellipsis">{{item.province}} {{item.city}} {{item.area}} {{item.address}}</span>
            </dt>
          </div>
          <div class="confirm-btn fontSize-12 f-oh p-lef-rig30 m-bottom10">
            <dt class="f-oh f-fl" @click = 'choosedAddress(item,i)'>
              <i class="choose-btn f-fl" :class="{chooseAddress : item.checked}"></i>
              <span class="f-fl m-left5">设为默认地址</span>
            </dt>
            <div class="f-fr f-oh doubtn">
              <dt class="f-oh f-fl" @click="delectAddress(item,i)">
                <i class="icon iconfont icon-delete f-fl"></i>
                <span class="f-fl m-left5 m-right15">删除</span>
              </dt>

              <dt class="f-oh f-fl" @click="editAddress(item)">
                <!--<router-link class="router" to="">

                </router-link>-->
                <i class="icon iconfont icon-edit f-fl"></i>
                <span class="f-fl m-left5">
                    编辑
                  </span>
              </dt>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--删除提示，确认才能删除-->
    <div class="warning" v-if="isShowWarning">
      <div class="word" @click="decideDelete">确定删除</div>
      <div class="word" @click="cancel">取消</div>
    </div>
    <div class="blackCover" v-if="isShowBlackCover"></div><!--黑色遮罩层-->
    <div class="add-address-btns p-lef-rig24 fontSize-18">
      <router-link class="f-oh" to="/home/addAddressRouter">
        <div class="add-new-address p-lef-rig24 m-bottom15 f-fl">
          +新建地址
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import { Navbar, TabItem ,Indicator, Toast, Popup,MessageBox } from "mint-ui";
  import $ from "jquery"; //导入jquery
  export default{
    data (){
      return {
        visible: false,
        isChoosed : 0,
        deleIndex : 0,
        delateId : null,
        isConfirmDelect : false,//点击确定删除
        isShowWarning : false,//提示是否弹出
        isShowBlackCover : false,//黑色背景是否
        shouhuoAddressData : [],//收货地址首页后台数据
      //  获取地址对应id
        idIndex : 0,
        addressId : null,
        userWx : {},//userWx data
        addressIcon : '@/../static/image/mine/shouhuoAddress3r.png'
      }
    },
    methods : {
      //点击添加地址
      //设置为默认地址
      saveMorenAxios: function(id){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/address/save',
          data:{
            'id' :id,
            'openid' :sessionStorage.openid,
            'isDefault' : 1,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            console.log("地址返回值：",data);
            if(data.code == 1){
              // vm.shouhuoAddressData = data.data;
            }
          },
          error:function (data) {

          }
        })
      },
      //获取收货地址首页数据
      shouhuoAxios: function(){
        var vm = this;
        // var params = new URLSearchParams();
        // params.append('id',proId);
        $.ajax({
          url:comLink.yxtHost + '/address/index',
          data:{
            "openid":sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            console.log("地址返回值：",data);
            if(data.code == 1){
              vm.shouhuoAddressData = data.data;
              for(var i = 0,l = vm.shouhuoAddressData.length;i < l;i ++){
                if(vm.shouhuoAddressData[i].isDefault === 1){
                  vm.shouhuoAddressData[i].checked = true;
                }else{
                  vm.shouhuoAddressData[i].checked = false;
                }

              }
              console.log( vm.shouhuoAddressData,' vm.shouhuoAddressData')
            }
          },
          error:function (data) {

          }
        })
      },
      //删除地址
      delateAxios: function(delateid){
        var vm = this;
        // console.log('vm.delateId',vm.delateId);
        axios.get(comLink.yxtHost + '/address/del', {
          params:{
            id : delateid,
            openid : sessionStorage.openid,
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            Toast({
              //mintui提示效果
              message: "已删除",
              duration: 2000
            });
            vm.shouhuoAxios();//删除后调用收货地址列表接口
          }
        })
          .catch(function(res) {

          });
      },
      editAddress(item){
        console.log(this.idIndex);
        this.addressId = item.id;//地址id

        //携带参数
        let hash = window.location.hash;
        hash = hash.split('=');
        let param = hash[1];

        console.log(this.addressId);
        this.$router.push({
          path : '/home/addAddressRouter',
          query : {
            id : this.addressId,
            param : param
          }//地址id
        })
      },
      //点击删除对应地址信息
      delectAddress:function(item,i){
        let delateid = item.id;
        MessageBox.confirm('确定删除地址吗？').then(action => {
        this.delateAxios(delateid);
        });

      },
      cancel : function(){
        this.isShowWarning = false;
        this.isShowBlackCover = false;
      },
      //点击选中默认地址
      choosedAddress : function(item,i){
        item.checked = !item.checked;
        console.log(item.checked)
        this.shouhuoAddressData.splice(100,1)
        for(var i = 0,l = this.shouhuoAddressData.length;i < l;i ++){
          this.shouhuoAddressData[i].checked = false;
          this.shouhuoAddressData.splice(100,1)
        }
        item.checked = true;
        let id = item.id;
        this.saveMorenAxios(id)
      },
      selAddress : function(id) {
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];
        if(orderId) {
          this.$router.back(-1);
          sessionStorage.setItem('addressId',id);
        } else {
          return;
        }
      }
    },
    mounted(){
      this.shouhuoAxios();
      // this.getUserId()
    },
    created (){},
    beforeDestroy () {}
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .doubtn{
  	color: #333;
  }
  .confirm-address-content{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    .address-infos-lists{
      position: absolute;
      overflow-y: auto;
      top: 0;
      right: 0;
      left: 0;
      bottom: p(240);
      .address-main{

        .address-row{
          width: 100%;
          height: p(200);
          color: #666666;

          .infos-detail{
            display: inline-block;
            width: 100%;
            height: p(140);
            box-sizing: border-box;
            border-bottom: p(1) solid #eee;

            .name-phone{
              line-height: p(68);
              color: black;
            }
            .address{
              line-height: p(46);
              .address-icon{
                /*font-size: p(40);*/
                width: p(20);
                float: left;
                margin-top: p(10);
                margin-left: p(6);
              }
              .word{

              }
            }
          }
          .confirm-btn{
            display: inline-block;
            width: 100%;
            height: p(60);
            line-height: p(60);

            .choose-btn{
              display: inline-block;
              width: p(20);
              height: p(20);
              box-sizing: border-box;
              border: 0.5px solid #6a6a6a;
              border-radius: 50%;
              margin-top: p(20);
            }
            .chooseAddress{
              background: $bgBlue;
              border: none;
            }
          }
        }
      }
    }
    .add-address-btns{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      .add-wechat-address,.add-new-address{
        display: inline-block;
        width: 100%;
        height: p(100);
        background: $bgGreen;
        text-align: center;
        line-height: p(100);
        color: $fontWhite;
      }
      .add-new-address{
        background: $bgBlue;
      }
    }
    .warning{
      display: inline-block;
      position: fixed;
      top: 50%;
      margin-top: p(-100);
      left: 50%;
      margin-left: p(-150);
      width: p(300);
      height: p(200);
      line-height: p(200);
      background: white;
      z-index: 99;
      /*t弹出确认删除框*/
      .word{
        display: inline-block;
        width: 50%;
        height: p(90);
        float: left;
        line-height: p(90);
        text-align: center;
        font-size: p(30);
      }
    }
    .blackCover{
      display: inline-block;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: black;
      opacity: 0.4;
    }
  }
</style>
