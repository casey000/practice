<template>
  <div>
    <div class="head-content  f-pr">
      <div class="f-oh left dis-inblo" @click="menuShow()">
        <img class="f-fl sort-img fontSize-15" :src=sortImg alt="">
        <span class="f-fl fontSize-15 w-color" >{{text}}</span>
      </div>
      <div class="block f-fr fontSize-12">
        <!--<span class="demonstration">月</span>-->
        <!--<el-date-picker-->
          <!--style="color:white;"-->
          <!--v-model="value4"-->
          <!--type="month"-->
          <!--placeholder="2018-01">-->
        <!--</el-date-picker>-->
        <group class="block  f-pr">
          <datetime
            v-model="value1"
            @on-change="change"
            @on-cancel="log('cancel')"
            @on-confirm="onConfirm"
            @on-hide="log('hide',)"></datetime>
          <i class="icon iconfont icon-sanjiaoxing-down fontSize-14 f-abs"></i>
        </group>
      </div>
      <div class="count-main w-color">
        <span class="number">{{total}}</span>
        <span class="fontSize-11 f-db f-tac m-top12">累计返佣</span>
      </div>
    </div>
    <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
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
<style>
  .head-content .block .weui-cells{
    background: transparent;
    width: 15rem;
    border-bottom: 1px solid transparent;
    font-size: 1.75rem;
  }
  .head-content .block .weui-cells:after{
    border: none;
  }
  .head-content .block .weui-cells .vux-cell-value{
    color: white;
  }
  .weui-cells:before {
    border-top : none;
  }
</style>
<script>
  import { Datetime, Group, XButton } from 'vux'
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'hello',
    data() {
      return {
        text : '全部',
        isShowPopup : false,
        isShowBlackCover : false,
        total : 0,
        characterNum : 0,
        charactarLists : [
          { name : '全部'},
          { name : '佣金分红'},
        ],
        timeChar : [],
        dataChar : [],
        sortImg : '@/../static/image/mine/all.png',
        value1: '2018-05-12',
      }
    },
    created(){
    	var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      console.log(currentdate);
      this.value1 = currentdate;
    },
    mounted() {

      this.zhexianAxios();
    },
    methods: {
      hidePop(){
        this.isShowPopup = false;
        this.isShowBlackCover = false;
      },
      updateStatus() {
        if(this.characterNum == 0) {
          this.text = '全部';
        }
        if(this.characterNum == 1) {
          this.text = '佣金分红';
        }
        this.isShowPopup = false;
        this.isShowBlackCover = false;
      },
      character(i){
        this.characterNum = i;
      },
      menuShow(){
        this.isShowPopup = true;
        this.isShowBlackCover = true;
      },
      //折现图
      zhexianAxios: function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/totalProfitChars',
          data:{
            'openid':sessionStorage.openid,
            'date' : vm.value1,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.dataChar = data.data.profitList;
              vm.timeChar = data.data.dateList;
              vm.total = data.data.total;

              console.log(vm.dataChar, '数据');
              console.log(vm.timeChar, '时间');

              vm.drawLine();
            }
          },
        })
      },
      change (value) {
        // console.log('change', value)
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/totalProfitChars',
          data:{
            'openid':sessionStorage.openid,
            'date' : vm.value1,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.dataChar = data.data.profitList;
              vm.timeChar = data.data.dateList;
              vm.total = data.data.total;

              console.log(vm.dataChar, '数据');
              console.log(vm.timeChar, '时间');

              vm.drawLine();
            }
          },
        })
      },
      onConfirm (val) {
        // console.log('on-confirm arg', val)
        // console.log('current value', this.value1)
      },
      log (str1, str2 = '') {
        // console.log(str1, str2)
      },
      drawLine() {
        var vm = this;

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: "周期内返佣情况统计折线图（单位：元）",
            x: "left",
            textStyle:{
              fontSize:12,
            }
          },
          tooltip: {
            trigger: "item",
            // formatter: "{a} <br/>{b} : {c}"
          },
          legend: {
            x: 'left',
            data: ["累计收益"]
          },
          xAxis: [
            {
              type: "category",
              name: "",
              splitLine: {show: false},
              data: vm.timeChar,//['1', '2', '3']
            }
          ],
          yAxis: [
            {
//            type: "",
              name: "",
              axisTick:{       //y轴刻度线
                show:false
              },
              axisLabel : {
                formatter: function(){
                  return "";
                }
              }
            }
          ],
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: true
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: false
              }
            }
          },
          calculable: true,
          series: [
            {
              name: "累计收益",
              type: "line",
              data: vm.dataChar,

            }
          ]
        });
      }
    },
    components: {
      Datetime,
      Group,
      XButton
    },
  }
</script>
<style>
  #myChart div{
    /*width: 100%;*/
    padding: 0 1rem;
  }
  #myChart div canvas{
    padding: 0 0.8rem;
  }
  .weui-cells:before{
  	display: none;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  #myChart{
    padding: 0 p(10);
  }
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
  .active {
    color: #307ff5;
  }
</style>
