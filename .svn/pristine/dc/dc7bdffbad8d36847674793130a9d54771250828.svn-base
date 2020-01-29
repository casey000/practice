<template>
  <div class="income-content" v-title data-title="累计收益">
    <div class="head-content  f-pr">
      <div class="f-oh left dis-inblo" @click="menuShow()">
        <img class="f-fl sort-img fontSize-15" :src=sortImg alt="">
        <span class="f-fl fontSize-15 w-color" >{{text}}</span>
      </div>
      <div class="block f-fr fontSize-12">
        <!--<span class="demonstration">月</span>-->
        <el-date-picker
          style="color:white; margin-left: -1rem;"
          v-model="date"
          type="month"
          @change="xuanzhongData"
          placeholder="2018-01"
          onClick="$('input').blur()">
        </el-date-picker>
      </div>
      <!--<i class="icon iconfont icon-moreunfold"></i>-->

      <div class="count-main w-color" @click="toZhexiantu()">
        <span class="number">{{homeData.daiJieSuan + homeData.hasJieSuan}}</span>
        <span class="fontSize-11 f-db f-tac m-top12">查看具体参数与报表></span>
      </div>
      <div class="pay w-color" >
        <div class="f-fl">
          <p class="fontSize-14 f-tac">{{homeData.daiJieSuan}}</p>
          <span class="fontSize-13 f-tac">待结算</span>
        </div>
        <div class="f-fl">
          <p class="fontSize-14 f-tac">{{homeData.hasJieSuan}}</p>
          <span class="fontSize-13 f-tac">已结算</span>
        </div>
      </div>
    </div>
    <div class="bottom-line fontSize-13" style="margin-top: 0">
      <ul class="detail-main f-oh">
        <li class="detail-row f-oh f-fl p-lef-rig24" v-for="profit in listData">
          <div class="left f-fl">
            <span  class="f-db online-buy fontSize-14" v-if="profit.status == 1">已结算</span>
            <span  class="f-db online-buy fontSize-14" v-if="profit.status == 0" style="color: black">待结算</span>
            <span  class="f-db time fontSize-10">{{profit.createTime}}</span>
          </div> <div  class="right fontSize-13 f-fr">+¥ {{profit.amount}}</div>
        </li>
      </ul>
    </div>
    <div class="bottom-line fontSize-13">
      <span>---已无更多记录---</span>
    </div>
    <!--全部分类弹窗-->
    <div v-if="isShowPopup" class="choose-pop b-white fontSize-14 ">
      <div class="title m-top15 p-lef-rig24">
        <!--<span>角色</span>-->
        <ul class="choose-main f-oh m-top15">
          <li class="choose-row fontSize-12 f-fl"
              @click = 'character(i)'
              :class="{active : characterNum === i}"
              v-for="(item,i) in charactarLists" :key="i">
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="title m-top15 p-lef-rig24" style="text-align: center;height: 4rem;width: 20rem;padding: 0 auto;margin-top: 3rem">
        <p style="height: 4rem;width: 20rem;background-color: #307ff5;color: white;line-height: 4rem" @click="updateStatus">确定</p>
      </div>
    </div>
    <!--黑色遮罩层-->
    <div v-if="isShowBlackCover" class="back-cover" @click="hidePop()"></div>
  </div>
</template>
<script>
//import axios from 'axios'
	import './../../../../common/jq.min';
  import $ from "jquery"; //导入jquery
  import comLink from "./../../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";

  export default {
    data (){
      return{
        text : '全部',
        sortImg : '@/../static/image/mine/all.png',
        isShowPopup : false,
        isShowBlackCover : false,
        characterNum : 0,
        date: '',
        charactarLists : [
          { name : '全部'},
          { name : '推广奖励'},
        ],
        listData : [],
        homeData : {
          daiJieSuan : 0,
          hasJieSuan : 0,
        },
      }
    },
    mounted (){
      this.getMonth()
      this.shouyiAxios();
    },
    methods : {
      updateStatus() {
        if(this.characterNum == 0) {
          this.text = '全部';
        }
        if(this.characterNum == 1) {
          this.text = '店铺收益';
        }
        this.isShowPopup = false;
        this.isShowBlackCover = false;
      },
      //选中日期后调用请求
      xuanzhongData(){
        let d = this.date;
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        this.date =year + '-' + (month<10?'0'+month:month)
        console.log('选中日期为：',this.date)
        this.shouyiAxios();
      },
      //获取初始日期
      getMonth(){
        let date = new Date;
        let year=date.getFullYear();
        let month = date.getMonth()+1;
        this.date = year + '-'+(month<10?'0'+month:month);
        console.log(this.date)
      },
      ///user/totalProfit
      //累计收益首页
      shouyiAxios: function(){
        var _vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/totalProfit',
          data:{
            'openid':sessionStorage.openid,
            'date' : _vm.date
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            console.log(data,'data11111');
            if(data.code == 1){
              _vm.homeData = data.data.profit;
              _vm.listData = data.data.list;
            }
          },
          error:function (data) {

          }
        })
      },
      menuShow(){
        this.isShowPopup = true;
        this.isShowBlackCover = true;
      },
      hidePop(){
        this.isShowPopup = false;
        this.isShowBlackCover = false;
      },
      character(i){
        this.characterNum = i;
      },
    //  跳转折线图
      toZhexiantu(){
        this.$router.push({
          path : '/mine/zhexiantu'
        })
      }
    }
  }
</script>
<style>
  .head-content .block .el-input--suffix input{
    background: transparent;
    border: none;
    color: white;
    text-align: center;
    padding-left: 3.8rem;
    padding-right: 0;
  }
  .head-content .block .el-input--suffix .el-input__icon{
    line-height: 1.3rem;
    /*height: 13px;*/
    color: white;
  }
  .head-content .block .el-input--suffix{
    width: 12.5rem;
  }
  .head-content .block .el-date-editor .el-input__suffix{
    color: white;
  }
  .head-content .block .el-date-editor .el-input__suffix{
    color: white;
  }
  html body .el-picker-panel .el-date-picker{
    position: fixed;
    top: 50%;
    left: 50%;
  }
 .income-content .el-input__suffix-inner{
  	/*padding-left: 5rem;*/
  	display: none;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .active{
    border: p(1) solid $bgBlue;
    color: $bgBlue;
  }

.income-content{
	width: 100%;
	overflow-x: hidden;
  .head-content{
    width: 100%;
    height: p(450);
    background: $bgBlue;
    padding: p(20) p(22);

    .left{

      .sort-img{
        width: p(30);
        margin-right: p(10);
      }
    }
    .block{
      display: inline-block;
      height: p(20);
      line-height: p(20);
      position: absolute;
      top: 0;
      right: p(14);
      /*<!--right: p(-230);-->*/
    }
    .icon-moreunfold{
      position: absolute;
      top: p(23);
      right: p(18);
      color: white;
    }
    .count-main{
      position: absolute;
      top: p(160);
      width: 100%;
      padding-right: p(24);
      .number{
        display: block;
        font-size: p(60);
        text-align: center;

      }
    }
    .pay{
      width: 100%;
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: p(45);
    }
  }
  .bottom-line{
    text-align: center;
    margin-top: p(100);

    .detail-main{

      .detail-row{
        display: inline-block;
        width: 100%;
        height: p(135);
        border-bottom: p(1) solid #e5e5e5;

        .left{
          margin: p(15) 0;
          .online-buy{
            height: p(58);
            line-height: p(58);
          }
          .time{
            height: p(50);
            line-height: p(50);
          }
        }
        .right{
          height: 100%;
          line-height: p(135);
          font-weight: bold;

        }
      }
    }
  }
  .bottom-line span{
    color: #999999;
  }
  /*全部分类弹窗*/
  .choose-pop{
    position: fixed;
    top: 0;
    right: 0;
    width: p(530);
    bottom: 0;
    z-index: 9;

    .title{

      .choose-main{

        .choose-row{
          display: inline-block;
          width: p(110);
          height: p(45);
          text-align: center;
          line-height: p(45);
          box-sizing: border-box;
          border: p(1) solid #ccc;
          border-radius: p(10);
          margin-right: p(20);
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
    .title{
      .choose-main{
        .choose-row{
          display: inline-block;
          width: p(115);
          height: p(45);
          text-align: center;
          line-height: p(45);
          box-sizing: border-box;
          border: p(1) solid #ccc;
          border-radius: p(10);
          margin-right: p(20);
        }
      }
    }
  }
  /*黑色遮罩层*/
  .back-cover{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    opacity: 0.4;
    z-index: 8;
  }
}
</style>
