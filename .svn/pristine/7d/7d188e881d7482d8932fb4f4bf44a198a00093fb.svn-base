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
    <div class="vip-main">
      <ul class="vip-main-all">
        <li class="vip-main-row p-lef-rig24 m-top10 b-white f-oh" @click="toDetail()">
          <img class="vip-V f-fl" :src=iconImg>
          <dt class="vip-main-word f-fl">
            <span class="main-word fontSize-18">{{showLists.memberName}}</span>
            <span class="main-word fontSize-11">您已成为{{showLists.memberName}}</span>
          </dt>
          <i class="icon iconfont icon-more f-fr"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup } from "mint-ui";
  import $ from "jquery"; //导入jquery
  export default{
    data (){
      return{
        headPic : '',
        vipImg : '@/../static/image/mine/vip.png',
        iconImg : '@/../static/image/mine/vipIcon.png',
        showLists : {},
        nickName : '',
      }
    },
    mounted(){
      this.vipRightAxios();
      this.getUserInfos();
//    this.headPic = sessionStorage.headLogo;
    },
    methods : {
      getUserInfos (){
//      this.nickName = sessionStorage.nickName;
      },
      //
      toDetail (){
        this.$router.push({
          path : '/mine/vipRightDetail'
        })
      },
      //会员特权数据
      vipRightAxios: function() {
        var vm = this;
//      axios.post(comLink.yxtHost + '/privilege/index', {
//        params : {
//          openid : sessionStorage.openid,
//        }
//      }).then(function(response) {
//        if (response.data.code == 1) {
//          vm.showLists = response.data.data.member;
//          console.log(vm.showLists);
//          console.log(response)
//          // Toast({
//          //   //mintui提示效果
//          //   message: "已登录",
//          //   duration: 2000
//          // });
//          vm.isDenglu();
//        }
//      })
//        .catch(function(res) {
//        });
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
        height: 6.4375rem;
        text-align: center;
        margin-top: p(50);

        .head-pic-img{
          height: 6.25rem;
   				width: 6.25rem;
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
            /*height: p(40);*/
            margin-top: p(33);
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
  }
</style>
