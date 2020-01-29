<template>
  <div class="score-content" v-title data-title="我的积分">
    <scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire" >
      <div>
        <div class="score-main">
          <ul class="score-main-inner f-oh fontSize-10">
            <li class="score-row f-fl"
                v-for="(nav,i) in navLists" :key="i"
                @click="chooseProList(i)"
                :class="{ activeShow : activeNum === i}"
            >
              <img class="img-pic" :src=nav.blue alt="" v-if="activeNum === i">
              <img class="img-pic" :src=nav.grey alt="" v-else>
              <dt>{{ nav.name }}</dt>
            </li>
          </ul>
        </div>
          <div class="score-details">
            <ul class="score-details-main p-lef-rig24 f-oh">
              <li class="score-details-row f-fl fontSize-14 f-oh"
                  v-for="(item,i) in qiandaoLists"
                  :key = 'i'
                  @click="pushRouterPath(item)"
              >
                <div class="give-score-detail f-oh f-fl">
                  <p class="big-word f-fl">{{item.text}}</p>
                  <!--<p class="big-word f-fl">{{item.text}}：{{item.value}}</p>-->
                  <p class="sma-word f-fl fontSize-11" v-if="item.type!=2">收入：{{item.value}}</p>
                  <p class="sma-word f-fl fontSize-11" v-else>支出：{{item.value}}</p>
                  
                </div>
                <dt class="score-num colorff6 f-fr" v-if="item.type!=2">+{{item.value}}积分</dt>
                <dt class="score-num colorff6 f-fr" v-else>-{{item.value}}积分</dt>
                
              </li>
            </ul>
          </div>
      </div>
    </scroller>
  </div>
</template>
<script>
//import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import { Scroller } from 'vux'
  import $ from "jquery"; //导入jquery
  export default {
    data() {
      return {
        navLists: [
          {
            blue: '@/../static/image/mine/all_blue.png',
            grey : '@/../static/image/mine/all_grey.png',
            name: '全部',
            key: 0
          },
          {
            blue: '@/../static/image/mine/income_blue.png',
            grey : '@/../static/image/mine/income_grey.png',
            name: '收入',
            key: 1
          },
          {
            blue: '@/../static/image/mine/pay_blue.png',
            grey : '@/../static/image/mine/pay_grey.png',
            name: '支出',
            key: 2
          },
        ],
        proLists: null,
        activeNum: 0,
        proListsData: [
          {
            prolist: [
              {
                openSendScoreBig: 1000,
                openSendScoreSmall: 1000,
                score: 10000
              },
              {
                openSendScoreBig: 1000,
                openSendScoreSmall: 1000,
                score: 10000
              },
              {
                openSendScoreBig: 1000,
                openSendScoreSmall: 1000,
                score: 10000
              },
            ]
          },
          {
            prolist: [
              {
                openSendScoreBig: 1000,
                openSendScoreSmall: 1000,
                score: 10000
              },
              {
                openSendScoreBig: 1000,
                openSendScoreSmall: 1000,
                score: 10000
              }
            ]
          },
          {
            prolist: [
              {
                openSendScoreBig: 1000,
                openSendScoreSmall: 1000,
                score: 10000
              }
            ]
          },
        ],
        pageNum :1,
        qiandaoLists : [],//签到列表
        type : 0,// 1：收入 2：支出,0:全部
        isRequest : true,
      }
    },
    components:{
      Scroller
    },
    mounted(){
      this.jifenAxios();
      this.begainVal()//调用页面切换函数
    },
    methods: {
      //滚动请求
      scrollerRequire(){
        if(this.isRequest){
          this.pageNum ++;
          this.isRequest = false;
          var vm = this;
          $.ajax({
            url: comLink.yxtHost + '/access/integralRecord',
            data: {
              pageNum: vm.pageNum,
              openid: sessionStorage.openid,
              type : vm.type,
            },
            dataType: 'json',
            type: 'post',
            success: function (res) {
              setTimeout(function(){//todo
                vm.isRequest = true;
              },2000);
              console.log(res)
              if (res.code == 1) {
                if(res.data.list && res.data.list.length > 0){
                  // vm.proDetailData = vm.proDetailData.concat(data.data);//todo
                  vm.qiandaoLists = vm.qiandaoLists.concat(res.data.list);//todo
                }else{
                  vm.pageNum --;//todo
                }
              }else{
                vm.pageNum --
              }
            },
            error: function (res) {

            }
          })
        }
      },
      //积分列表
      jifenAxios: function () {
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/access/integralRecord',
          data: {
            pageNum: vm.pageNum,
            openid: sessionStorage.openid,
            type : vm.type,
          },
          dataType: 'json',
          type: 'post',
          success: function (res) {
            console.log(res)
            if (res.code == 1) {
              vm.qiandaoLists = res.data.list;
              console.log(vm.qiandaoLists)
            }
          },
          error: function (res) {

          }
        })
      },
      begainVal() {//给proLists 初始值
        this.proLists = this.proListsData[0].prolist;
      },
      chooseProList(i) {
        this.activeNum = i
        if(this.activeNum === 1){
          this.type = 1
          this.jifenAxios();
        }
        else if(this.activeNum === 2){
          this.type = 2
          this.jifenAxios();
        }else{
          this.type = 0;
          this.jifenAxios();
        }
        // this.proLists = this.proListsData[this.indexNumber].prolist
      },
      pushRouterPath(item) {
        this.$router.push({
          path: '/mine/scoreDetailRouter',
          query : { id : item.id}
        });
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .score-content{
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    background: white;
    .score-main{
      width: 100%;
      padding: p(10) 0;
      border-bottom: p(1) solid #eeeeee;
      .score-main-inner{
        width: 100%;
        .score-row{
          width: 33.3333%;
          box-sizing: border-box;
          border-right: p(2) solid #e8e8e8;
          text-align: center;
          .img-pic{
            width: p(30);
            height: p(30);
            display: inline-block;
            margin-bottom: p(10);
          }
        }
        .activeShow{
          color: $bgBlue;
        }
      }
    }
    .score-details{
      width: 100%;
      background: white;
      .score-details-main{
        width: 100%;

        .score-details-row{
          width: 100%;
          border-bottom: p(1) solid #eeeeee;
          .give-score-detail{

            .big-word{
              display: inline-block;
              width: 100%;
              height: p(60);
              line-height: p(60);
              margin-top: p(5);
            }
            .sma-word{
              display: inline-block;
              /*margin-top: p(37);*/
              width: 100%;
              height: p(37);
              line-height: p(37);
              margin-bottom: p(5);
              color: #999999;
            }
          }
          .score-num{
            line-height: p(60);
          }
        }
      }
    }
  }
</style>
