<template>
  <div class="my-right-content" v-title data-title="我的特权">
    <div class="headBg-infos fontSize-15">
      <dt class="head-pic">
        <img class="head-pic-img" :src=headPic alt="">
      </dt>
      <dt class="name">{{nickName}}</dt>
      <dt class="is-vip">
        <span class="vip-word">V{{showLists.memberName}}</span>
      </dt>
    </div>
    <div class="vip-detail-page p-lef-rig24">
      <span class="user-agres fontSize-12" @click="showUserXieyi()">用户协议</span>
      <img class="vip-img" :src=vipImg alt="">
      <p class="fontSize-17 orange-color p-left10">恭喜您成为我们的{{showLists.memberName}}！</p>
      <span class="fontSize-14">赶紧去享受下你的权益吧</span>
    </div>
    <div class="user-xieyi-popup" v-if="showPop">
    	<div class="xieyi-main">
    		<span>{{contentInfos.label}}</span>
      	<div v-html=contentInfos.description></div>
    	</div>

    </div>
    <div class="block-black" v-if="showPop" @click="hide()"></div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  export default{
    data (){
      return{
        headPic : '',
        vipImg : '@/../static/image/mine/vip.png',
        showLists : {},
        nickName : '',
        contentInfos : {},
        showPop : false,
      }
    },
    mounted(){
      this.vipRightAxios();
//    this.getUserInfos();
//    this.headPic = sessionStorage.headLogo;
    },
    methods : {
      //
      hide(){
        this.showPop = false;
      },
      //
      showUserXieyi(){
        this.showPop = true;
        console.log(this.showPop)
      },
      //从session获取用户名
//    getUserInfos (){
//      this.nickName = sessionStorage.nickName;
//    },
      //会员特权数据
      vipRightAxios: function() {
        var vm = this;
					$.ajax({
						type:"post",
						url:comLink.yxtHost + '/privilege/index',
						data:{
							openid : sessionStorage.openid,
						},
						async:true,
						success:function(data){
							if(data.code == 1){
								vm.showLists = data.data.member;
								vm.contentInfos = data.data.dic;
							}
						}
					});
					$.ajax({
		        url: comLink.yxtHost + '/user/getInformation',
		        data: {
		          openid: sessionStorage.openid,
		        },
		        dataType: 'json',
		        type: 'post',
		        success: function (data) {
		          if (data.code == 1) {
		            let headLogo = data.data.userWx.headLogo;//头像
		            let nickName = data.data.userWx.nickName;//昵称
		            vm.headPic = headLogo;
		            vm.nickName = nickName;
		          } 
		        },
		        error: function (data) {

		        }
		      })
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件

  .my-right-content{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: inline-block;
    width: 100%;

    .headBg-infos{
      background-image: url("./../../../../static/img/vipBg.png");
      background-size: 100%;
      width: 100%;
      height: p(265);
      .head-pic{
        display: inline-block;
        width: 100%;
        height: p(103);
        text-align: center;
        margin-top: p(50);

        .head-pic-img{
          height: p(100);
          width:p(100);
          border: p(3) solid white;
          border-radius: 50%;
        }
      }
      .name{
        color: white;
        display: inline-block;
        width: 100%;
        text-align: center;
        line-height: p(50);
      }
      .is-vip{
        text-align: center;
        width: 100%;

        .vip-word{
          font-size: p(20);
          color: #ff675f;
          padding: p(4) p(10);
          background: white;
          border-radius: p(10);
        }
      }
    }

    .vip-main{

      .vip-main-all{

        .vip-main-row{

          .vip-V{
            display: inline-block;
            width: p(50);
            height: p(40);
            background: red;
            margin-top: p(36);
          }
          .vip-main-word{
            padding: p(20);
            .main-word{
              display: block;
            }
            .main-word:nth-child(1){
              margin-bottom: p(14);
            }
            .main-word:nth-child(2){
              color: #666666;
            }
          }
          .icon-more{
            font-size: p(40);
            margin-top: p(36);
            color: #666666;
          }
        }
      }
    }
    .vip-detail-page{
      position: absolute;
      top: p(265);
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      text-align: center;

      .user-agres{
        display: inline-block;
        height: p(68);
        line-height: p(68);
        color: #307ff5;
        float: right;
      }
      .vip-img{
        width:100% ;
        padding: 0 p(175);
        margin: p(55) 0 p(40) 0;

      }
      .orange-color{
        color: #fe842f;
        margin-bottom: p(14);
      }
    }
    .user-xieyi-popup{
    	overflow-y:scroll;
      position: fixed;
      top: p(200);
      height: 50rem;
      width: 44rem;
      left: p(24);
      right: p(24);
      padding: p(50) 0;
      background: white;
      z-index: 9;
      text-align: center;
      border-radius: p(10);
      display: table;
      .xieyi-main{
      	 display: table-cell;
      	vertical-align: middle;

      	 >span{
	        font-size: p(28);
	      }
	      div{
	      	height: 40rem;
	      	overflow-y:scroll ;
	      	padding: 0 0.8rem 0 0.8rem;
	      	letter-spacing: 0.1rem;
	      	margin-top: p(20);
	      	line-height: p(60);
	      	font-size: 2rem;
	      	p{
	      		height: 100%;
	      		overflow-y: scroll;
	      	}
	      }
      }

    }
    .block-black{
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: black;
      opacity: 0.3;
      z-index: 8;
    }
  }
</style>
