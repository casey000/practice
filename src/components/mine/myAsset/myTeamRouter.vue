<template>
  <div class="team-content" v-title data-title="我的团队">
  	<scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire">
  		<div class="">
  			<div class="search-main f-oh">
      <div class="search-inp-main f-oh f-fl">
        <i class="icon iconfont icon-search f-fl"></i>
        <input class="head-search f-fl" type="text" placeholder="搜索" v-model="name">
      </div>
	     <p class="search-btn f-fl fontSize-14 w-color" @click="searchWordBtn()">搜索</p>
	    </div>
	    <div class="choose-btn-row b-white p-lef-rig24 fontSize-14">
	      <img class="btn f-fl" :src=menuImg alt="" @click="menuShow()">
	      <span class="f-fr team-total fontSize-14">团队总人数：{{teamPeople}}</span>
	    </div>



      <div class="team-man-lists p-lef-rig24" >
        <ul class="f-oh">
          <li class="f-fl f-oh" @click="toTeamDetail(item)" v-for="(item,i) in myTeamLists" :key="i">
            <img class="f-fl" :src=item.headLogo>
            <div class="inner-words f-fl">
              <span class="fontSize-12 m-top15 f-toe" style="height: 2rem;line-height: 2rem">{{item.name}}</span>
              <span class="fontSize-14 tuijianren" style="color: #919191;">推荐人：{{item.referName}}</span>
              <span class="fontSize-12" style="color: #cecece; ">{{item.creatTime}}</span>
              <i class="fontSize-12 m-top5">{{item.memberName}}</i>
            </div>
            <div class="right-content ">
              <i class="icon iconfont icon-more"></i>
              <dt class="laiyuan">
                <span>来源：</span>
                <!--<i class="icon iconfont icon-erweima"></i>-->
                <i class="el-icon-share"></i>
              </dt>
            </div>
          </li>
        </ul>
      </div>
  		</div>


    </scroller>


    <!--<div style="height: 4rem;width: 100%"></div>-->
    <!--弹窗-->
    <div v-if="isShowPopup" class="choose-pop b-white fontSize-14 ">
      <div class="title m-top15 p-lef-rig24">
        <span>角色</span>
        <ul class="choose-main f-oh m-top15">
          <li class="choose-row fontSize-12 f-fl"
              @click = 'character(item,i)'
              :class="{active : characterNum === i}"
              v-for="(item,i) in charactarLists" :key="i">
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="title m-top15 p-lef-rig24">
        <span>会员身份</span>
        <ul class="choose-main m-top15 f-oh">
          <li class="choose-row fontSize-12 f-fl"
              @click = 'vip(item,i)'
              :class="{active : vipNum === i}"
              v-for="(item,i) in vipLists" :key="i">
            {{item.label}}
          </li>
        </ul>
      </div>
      <div class="confirm-btn" @click="confirmSubmit()">
        <span class="words">确定</span>
      </div>
    </div>
    <div v-if="isShowBlackCover" class="back-cover" @click="hidePop()"></div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  import { Scroller } from 'vux'
  export default {
    data (){
      return{
        menuImg : '@/../static/image/mine/team_menu.png',
        teamPeople : 0,
        isShowPopup : false,
        isShowBlackCover : false,
        characterNum : 0,
        vipNum : 0 ,
        charactarLists :[
          { name : '全部'},
          { name : '龙飞客'},
          { name : '代理商'},
          { name : '合作商'}
        ],
        vipLists : [],
        pageNum : 1,
        myTeamLists : [],
        name : '',//搜索名
        memberName : '',//会员名称
        type : '',
        isRequest : true,
      }
    },
    mounted(){
      this.myTeamAxios();
      this.getVipList();
    },
    methods : {
      getVipList() {
        var vm = this;
        $.post(comLink.yxtHost + '/team/memberName', {
          'openid' : sessionStorage.openid
        }, function(res) {
          if(res.code === 1){
            vm.vipLists = res.data;
          }else{
            Toast({
              message: data.msg,
              duration: 2000
            });
          }
        });
      },
      //
      searchWordBtn(){
        this.pageNum = 1;//初始化页码；
        this.myTeamAxios();
      },
      //跳转团队详情
      toTeamDetail(item){
        this.$router.push({
          path : '/mine/teamDetail',
          query:{userId : item.id},
        })
      },
      //我的团队 滑动请求
      scrollerRequire(){
        if(this.isRequest){
          this.pageNum ++ ;
          this.isRequest = false;
          var vm = this;
          $.ajax({
            url:comLink.yxtHost + '/team/getPage',
            data:{
              openid : sessionStorage.openid,
              pageNum : vm.pageNum,
              memberName : vm.memberName,
              name : vm.name,
              type : vm.type,
            },
            dataType:'json',
            type:'get',
            success:function (res) {
                setTimeout(function(){//todo
                  vm.isRequest = true;
                },2000);
              if(res.code == 1){
                if(res.data.list && res.data.list.length > 0){
                  vm.myTeamLists = vm.myTeamLists.concat(res.data.list);
                }else{
                  vm.pageNum --
                }
              }else{
                vm.pageNum --
              }
            },
            error:function (res){

            }
          })
        }
      },
      //我的团队数据
      myTeamAxios : function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/team/getPage',
          data:{
            openid : sessionStorage.openid,
            pageNum : vm.pageNum,
            memberName : vm.memberName,
            name : vm.name,
            type : vm.type,
          },
          dataType:'json',
          type:'get',
          success:function (res) {
            if(res.code == 1){
              vm.myTeamLists = res.data.list;
              vm.teamPeople = res.data.total;
            } else {

            }
          },
          error:function (res){

          }
        })
      },
      //点击弹出筛选框
      menuShow(){
       this.isShowPopup = true;
       this.isShowBlackCover = true;
      },
      hidePop(){
        this.isShowPopup = false;
        this.isShowBlackCover = false;
      },
      character(item,i){
        this.characterNum = i;
        if(item.name === '龙飞客'){
          this.type = 1;
        }else if(item.name === '代理商'){
          this.type = 2;
        }else if(item.name === '合作商'){
          this.type = 3;
        }else{
          this.type = '';
        }
      },
      vip(item,i){
        this.vipNum = i;
        this.memberName = item.label;
      },
      confirmSubmit(){
        this.pageNum = 1;//初始化页码；
        this.myTeamAxios();
        this.isShowPopup = false;
        this.isShowBlackCover = false;
      }
    },
    components : {
      Scroller
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
.team-content{
  width: 100%;

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
  .choose-btn-row{
    width: 100%;
    height: p(70);
    border-bottom: p(1) solid #ccc;

    .btn{
      width: p(45);
      margin-top: p(15);
    }
    .team-total{
      line-height: p(70);
    }
  }
  /*团队成员列表*/
  .team-man-lists{
    background: white;
    >ul{
			margin-bottom: 3rem;
      >li{
        width: 100%;
        height: p(215);
        border-bottom: 1px solid #ddd;
        padding-bottom: 1rem;
        >img{
          display: inline-block;
          width: p(120);
          height: p(120);
          border-radius: 50%;
          background: pink;
          margin-right: p(10);
          margin-top: p(40);
        }
        .inner-words{
          display: inline-block;
          width: 35%;
          overflow: hidden;
          .tuijianren{
            line-height: p(58);
          }
          >span{
            display: inline-block;
            width: 17rem;
            float: left;
          }
          >i{
            display: inline-block;
            padding: p(5);
            border-radius: p(5);
            background: $danlan;
            float: left;
            color: $bgBlue;
            text-align: center;
            line-height: p(34);
          }
        }
        .right-content{
          float: right;
          font-size: p(28);
          text-align: right;
          >i{
            margin-top: p(50);
            display: inline-block;

          }
          .laiyuan{
            margin-top: p(20);
            display: inline-block;
            width: 100%;
            color: #808080;
          }
        }
        &:last-child{
        	margin-bottom: 1.5rem;
        }
      }
    }
  }
  /*弹出筛选框*/
  .choose-pop{
    position: fixed;
    top: p(90);
    right: 0;
    width: p(530);
    bottom: 0;
    z-index: 9;

    .title{

      .choose-main{

        .choose-row{
          display: inline-block;
          width: p(150);
          height: p(60);
          text-align: center;
          line-height: p(60);
          box-sizing: border-box;
          border: p(1) solid #ccc;
          border-radius: p(10);
          margin-right: p(20);
          margin-bottom: p(20);
        }
      }
    }
    .confirm-btn{
      width: 100%;
      height: p(100);
      line-height: p(100);
      font-size: p(36);
      text-align: center;
      background: $bgBlue;
      color: white;
      position: absolute;
      bottom: 0;
    }
  }
  /*黑色背景*/
  .back-cover{
    position: fixed;
    top: p(90);
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    opacity: 0.4;
    z-index: 8;
  }
}
  .active{
    border: p(1) solid $bgBlue;
    color: $bgBlue;
  }
</style>
