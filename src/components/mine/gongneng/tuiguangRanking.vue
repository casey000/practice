<template>
  <div class="tuiguang-ranking" v-title data-title="推广排行榜">
  	<scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire" >
  	<div style="padding-bottom: 7rem;">
	    <ul class="ranking-nav-main fontSize-15">
	      <li class="nav-row" :class='{activeClass : activeNum === 1}' @click="navChoose(1)">今日排行</li>
	      <li class="nav-row" :class='{activeClass : activeNum === 2}' @click="navChoose(2)">本月排行</li>
	      <li class="nav-row" :class='{activeClass : activeNum === 3}' @click="navChoose(3)">时间排行</li>
	    </ul>

    <!--时间排行日历-->
    <div class="block" v-if="isShowDate" style="text-align: center;">
      <!--<span class="demonstration">带快捷选项</span>-->
      <el-date-picker
        v-model="shaixuanData"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getTimeData"
        :picker-options="dateLists"
        onClick="$('input').blur()">
      </el-date-picker>
    </div>
    <!--排行第一用户-->
    <div class="head-content p-lef-rig24 f-pr f-oh">
      <div class="number1">
        <span>No.{{firstGuy.mingci}}</span>
      </div>
      <div class="pic-wai f-fl">
        <img class="head-profile-img" :src=firstGuy.headLogo alt="">
      </div>
      <span class="name dis-inblo fontSize-15 f-fl m-top5">{{firstGuy.name}}</span>
      <span class="tuiguang-total dis-inblo fontSize-11 f-fl m-top5">推广人数：{{firstGuy.count}}</span>
    </div>

    <!--排行榜列表-->
    <div class="ranking-lists-content fontSize-12">
      <ul class="ranking-lists-main">
        <li class="ranking-lists-row f-oh p-lef-rig24" v-for="(item,i) in allList" :key="i">
          <span class="f-fl paiming">No.{{item.mingci}}</span>
          <img class="ranking-pic m-top5 f-fl" :src=item.headLogo alt="">
          <span class="name fontSize-14">{{item.name}}</span>
          <div class="tuiguang-renshu f-fr">
            <p>推广人数</p>
            <p>{{item.count}}</p>
          </div>
        </li>
      </ul>
    </div>
   
    </div>
    </scroller>
     <div class="my-ranking fontSize-12 p-lef-rig24">
      <span class="f-fl paiming">No.{{myPaiming.mingci}}</span>
      <img class="ranking-pic m-top5 f-fl" :src=myPaiming.headLogo alt="">
      <span class="name fontSize-14">{{myPaiming.name}}</span>
      <div class="tuiguang-renshu f-fr">
        <p>推广人数</p>
        <p class="" style="text-align: center;">{{myPaiming.count}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Scroller } from 'vux'
  export default {
    data (){
      return {
        headPic : '@/../static/image/mine/touxiang.png',
        activeNum : 1,
        selRankingData:null,
        isShowDate : false,
        dateLists: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        shaixuanData: '',
        startDate : null,
        endDate : null,
        pageNum : 1,
        // timePageNum : 1,
        firstGuy : {},
        allList : [],
        myPaiming : {},
        isRequest : true,
        zongming:'',
      }
    },
    methods:{
      getTimeData(){
        let s = this.shaixuanData[0];
        let year = s.getFullYear();
        let month = s.getMonth() + 1;
        let day = s.getDate()
        this.startDate =year + '-' + (month<10?'0'+month:month)+'-'+(day<10?'0'+day:day);

        let e = this.shaixuanData[1]
        let y = e.getFullYear();
        let m = e.getMonth() + 1;
        let d = e.getDate()
        this.endDate =y + '-' + (m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
        console.log(this.startDate,this.endDate)
        this.zhidingDateAxios();//调用时间请求接口
        this.isShowDate = true;
      },
      //格式化日期：yyyy-MM-dd
      formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth()+1;
        var myweekday = date.getDate();

        if(mymonth < 10){
          mymonth = "0" + mymonth;
        }
        if(myweekday < 10){
          myweekday = "0" + myweekday;
        }
        return (myyear+"-"+mymonth + "-" + myweekday);
      },
      //获得某月的天数
      getMonthDays(nowYear, myMonth){
        var monthStartDate = new Date(nowYear, myMonth, 1);
        var monthEndDate = new Date(nowYear, myMonth + 1, 1);
        var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
        return days;
      },
      //点击导航
      navChoose(n){
        var now = new Date(); //当前日期
        var nowDayOfWeek = now.getDay(); //今天本周的第几天
        var nowDay = now.getDate(); //当前日
        var nowMonth = now.getMonth(); //当前月
        var nowYear = now.getFullYear(); //当前年

        this.activeNum = n;
        this.pageNum = 1;
        if(this.activeNum === 2){
          var monthStartDate = new Date(nowYear, nowMonth, 1);
          var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowYear, nowMonth));
          this.startDate = this.formatDate(monthStartDate);
          this.endDate = this.formatDate(monthEndDate);

          this.zhidingDateAxios();
          this.isShowDate = false;
        }else if(this.activeNum === 3){
          console.log('点击了第三项');
          // this.startDate = this.formatDate(monthStartDate);
          // this.endDate = this.formatDate(monthEndDate);

          this.zhidingDateAxios();
          this.isShowDate = true;
        }else{
          this.startDate = '';
          this.endDate = '';

          this.zhidingDateAxios();
          this.isShowDate = false;
        }
      },
      //指定日期查询推广排行榜
      zhidingDateAxios(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/promote/ranking',
          data:{
            'openid': sessionStorage.openid,
            'pageNum' : vm.pageNum,
            'endDate' : vm.endDate,
            'startDate' : vm.startDate,
          },
          dataType:'json',
          type:'get',
          success:function (res) {
            console.log('指定日期搜索',res)
            if(res.code==1){
              vm.allList = res.data.list;
              vm.firstGuy = res.data.list[0];

              for(var i = 0,l = vm.allList.length;i < l;i ++){
                vm.allList[i].mingci = i + 1;
                vm.zongming=vm.allList[l-1].mingci
              }
              vm.allList.splice(0,1)
              vm.myPaiming = res.data.user;
              console.log(vm.myPaiming,'排名数据');
              console.log(vm.zongming,'排名数据');
              
              vm.myPaiming.mingci = res.data.rank
            }
          },
          error:function (res){

          }
        })
      },
      scrollerRequire(){
        if(this.isRequest){
          this.pageNum ++ ;
          this.isRequest = false;
          var vm = this;
          $.ajax({
            url:comLink.yxtHost + '/promote/ranking',
            data:{
              'openid': sessionStorage.openid,
	            'pageNum' : vm.pageNum,
	            'endDate' : vm.endDate,
	            'startDate' : vm.startDate,
            },
            dataType:'json',
            type:'get',
            success:function (res) {
                setTimeout(function(){//todo
                  vm.isRequest = true;
                },2000);
              if(res.code == 1){
                if(res.data.list && res.data.list.length > 0){
                		for(var i = 0,l = res.data.list.length;i < l;i ++){
			                	res.data.list[i].mingci = vm.zongming +i+ 1;
			              }
                		vm.allList = vm.allList.concat(res.data.list);  
                		let len=vm.allList.length;
                		vm.zongming=vm.allList[len-1].mingci;
			              console.log(vm.myPaiming,'排名数据');
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
    },
    mounted(){
      this.zhidingDateAxios();
    },
    components : {
      Scroller
    }
  }
</script>
<style>
  body .el-picker-panel.el-date-range-picker.el-popper.has-sidebar{
    width: 100%;
  }
  .tuiguang-ranking .el-date-range-picker__content.is-left{

  }
  .tuiguang-ranking .el-picker-panel__body .is-left{
    width: 51%;
  }
  .tuiguang-ranking .el-picker-panel__body .is-right{
    width: 51%;
  }
  .el-date-editor .el-range-separator{
  	padding: 0;
  }
  .el-date-editor .el-range-separator {
    line-height: 4.1rem;
    width: 5%;
    font-size: 1.8rem;
    color: #303133;
}
.el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange{
	width: 43.75rem;
	border: none;
	padding-left: 4.5rem;
}
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .tuiguang-ranking{
    /*position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: p(120);*/
    background: white;
    overflow-y: scroll;

    .ranking-nav-main .nav-row.activeClass{
      border-bottom: p(5) solid $bgBlue;
    }
    .ranking-nav-main{
      width: 100%;
      height: p(90);
      display: flex;
      justify-content: space-around;

      .nav-row{
        height: 100%;
        box-sizing: border-box;
        line-height: p(90);
      }
    }

    .head-content{
      width: 100%;
      height: p(250);
      background: #c0daff;
      text-align: center;

      .number1{
        font-size: p(40);
        color: $qianhong;
        position: absolute;
        top: 50%;
        left: p(24);
        margin-top: p(-20);
      }
      .pic-wai{
        display: block;
        text-align: center;
        width: 100%;
				margin-top: 2rem;
        .head-profile-img{
          display: inline-block;
          width: p(103);
          height: p(103);
          border-radius: 50%;
          border: p(3) solid white;
        }
      }
      .tuiguang-total,.name{
        width: 100%;
        text-align: center;
      }
      .name{
        color: #616773;
      }
      .tuiguang-total{
        color: #3a7ee3;
      }
    }

    .ranking-lists-content{
      width: 100%;

      .ranking-lists-main{
        width: 100%;
        border-top: p(1) solid #ddd;
        padding-bottom: p(20);
        .ranking-lists-row{
          width: 100%;
          height: p(100);
          line-height: p(100);
          border-bottom: p(1) solid #ddd;
          .paiming{
            width: 18%;
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
            /*white-space: nowrap;*/
          }

          .ranking-pic{
            width: p(80);
            height: p(80);
            border-radius: 50%;
            margin: p(10) p(30) 0 0;

          }
          .name{
            color: #707070;
          }
          .tuiguang-renshu{
            line-height: p(30);
            margin-top: p(20);
            color: #313131;
            p{
            	text-align: center;
            }
          }
        }
      }
    }
    .my-ranking{
      width: 100%;
      height: p(120);
      background: white;
      border-top: p(1) solid #ddd;
      position: fixed;
      bottom: 0;
      line-height: p(120);
      .paiming{
        width: 18%;
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
      }
      .ranking-pic{
        width: p(80);
        height: p(80);
        border-radius: 50%;
        margin: p(20) p(30) p(0) 0;

      }
      .name{
        color: #707070;
      }
      .tuiguang-renshu{
        color: #313131;
        line-height: p(30);
        margin-top: p(30);
      }
    }
  }
</style>
