<template>
  <div class="confirm-address-content"  v-title data-title="收货地址">
    <div class="address-infos-lists">
      <ul class="address-main">
        <li class="address-row b-white m-bottom10" v-for="data in addressList">
          <div class="infos-detail p-lef-rig24" @click="selAddress(data)">
            <div class="name-phone">
              <span class="fontSize-15 m-left15">{{data.name}}<span class="default f-fr" v-if="data.isDefault == 1">默认地址</span></span>
              <span class="fontSize-13 m-left10">{{data.phone}}</span>
            </div>
            <dt class="address fontSize-12 f-oh">
              <!--<i class="icon iconfont icon-weizhi-xianxing f-fl"></i>-->
              <img class="address-icon" :src="addressIcon" alt="">
              <span class="f-fl word ellipsis">{{data.province}} {{data.city}} {{data.area}} {{data.address}}</span>
            </dt>
          </div>
          <div class="edit">
          	<img src="../../../static/img/indus/edit.png"/>
          	<span @click="editaddress(data)">编辑</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="blackCover" v-if="isShowBlackCover"></div><!--黑色遮罩层-->
    <div class="add-address-btns p-lef-rig24 fontSize-18">
      <router-link class="f-oh" to="/indus/indusaddAddress">
        <div class="add-new-address p-lef-rig24 m-bottom15 f-fl">
          +新建地址
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "@/common/common_link"; //导入总线
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
        addressList : [],//收货地址首页后台数据
        idIndex : 0,
        addressId : null,
        userWx : {},//userWx data
        addressIcon : '@/../static/image/mine/shouhuoAddress3r.png'
      }
    },
    methods : {
    	editaddress(data){
    		this.$router.push({
    			path:'/indus/indusaddAddress',
          query: {
    			  'id': data.id
          }
    		})
    	},
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
      shouhuoAxios() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/order/getUserAddressList',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.addressList = resp.data;
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
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
      //选中地址
      selAddress(data) {
        sessionStorage.setItem('addressId', data.id);
        this.$router.back(-1);
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
          height: p(140);
          color: #666666;
					position: relative;
					.edit{
						position:absolute;
						right: p(25);
						bottom:p(15);
						img{
							width: p(30);
							height: p(30);
						}
						span{
		          font-size: p(26);
						}
					}
          .infos-detail{
            display: inline-block;
            width: 100%;
            height: p(140);
            box-sizing: border-box;
            .name-phone{
              line-height: p(68);
              color: black;
              .default{
              	color: #307ff5;
              	padding-top: p(8);
              	font-size: p(26);
              }
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
								display: inline-block;
								width: p(500);
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
