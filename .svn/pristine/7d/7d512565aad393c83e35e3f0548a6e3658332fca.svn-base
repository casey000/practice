<template>
  <div class="tuiguang-result-content b-white" v-title data-title="推广成果">
    <div class="head-content p-lef-rig24 f-oh">
      <span class="f-fl">{{user.name}}</span>
      <div class="choose-month-btn f-pr fontSize-12 f-fr">
        <!--<span>选择月份</span>-->
        <div class="block f-fr fontSize-12">
          <!--<span class="demonstration">月</span>-->
          <el-date-picker
            style="color:white;"
            v-model="dataVal"
            type="month"
            @change="xuanzhongData"
            placeholder="选择月份"
            onClick="$('input').blur()">
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="customer-infos p-lef-rig24 b-white f-oh">
      <img class="head-pic f-fl m-top15" :src=headLogo alt="">
      <ul class="infos-main f-fl fontSize-14 m-top15">
        <li class="infos-row">
          <span>商家名称：</span>
          <span>{{companyName}}</span>
        </li>
        <li class="infos-row">
          <span>电话号码：</span>
          <span>{{companyPhone}}</span>
        </li>
        <li class="infos-row">
          <span>公司地址：</span>
          <span class="address">{{companyAddress}}</span>
        </li>
      </ul>
    </div>

    <div class="tuiguang-shu-content p-lef-rig24 b-white">
      <ul class="tuiguang-shu-main fontSize-12 f-oh">
        <li class="tuiguang-shu-row f-fl">
          <span>推广会员</span>
          <span>{{resaultLists.count}}</span>
        </li>
        <li class="tuiguang-shu-row f-fl">
          <span>总粉丝</span>
          <span>{{resaultLists.count}}</span>
        </li>
      </ul>
    </div>
    <div class="block-color"></div>
    <!--奖励金-->
    <div class="jianglijin-content b-white p-lef-rig24">
      <ul class="jianglijin-main fontSize-14">
        <li class="jianglijin-row f-oh">
         <span class="left-title f-fl">累计奖励总金额（元）</span>
          <dt class="right-value f-fr">
            <span>{{resaultLists.bonus}}</span>
          </dt>
        </li>
        <li class="jianglijin-row f-oh">
          <span class="left-title f-fl">未到账奖励（元）</span>
          <dt class="right-value f-fr">
            <span>{{resaultLists.notAccount}}</span>
          </dt>
        </li>
        <li class="jianglijin-row f-oh">
          <span class="left-title f-fl">推广金额总计（元）</span>
          <dt class="right-value f-fr">
            <span>{{resaultLists.promote}}</span>
          </dt>
        </li>
      </ul>
    </div>
    <div class="block-color"></div>
    <div class="mingxi">
      <ul class="nav-main f-oh fontSize-14">
        <li class="nav-row">时间</li>
        <li class="nav-row">消费金额</li>
        <li class="nav-row">奖励金</li>
        <!--<li class="nav-row">备注</li>-->
      </ul>
      <ul class="mingxi-main fontSize-10">
        <li class="mingxi-row" v-for="(item,i) in list" :key="i">
          <span class="time">{{item.createTime}}</span>
          <span>¥ {{item.consumAmount}}</span>
          <span class="jianglijin">¥ {{item.amount}}</span>
         <!-- <span>{{item.remark}}</span>-->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import "./../../../common/jq.min"; //导入总线
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  export default {
    data (){
      return{
        companyPhone : '',
        companyName : '',
        companyAddress : '',
        dataVal: null,
        headPic : '@/../static/image/mine/touxiang.png',
        resaultLists : {},
        user : {},
        list : [],//推广成果列表
        headLogo : ''
      }
    },
    mounted(){
      var vm = this;
      $.post(comLink.yxtHost + '/user/getInformation', {
        'openid' : sessionStorage.openid
      }, function(resp) {
        if(resp.code == 1) {
          vm.headLogo = resp.data.userWx.headLogo;
        }
      });
      this.tuiguangResaultAxios();
      this.getPhone();
    },
    methods : {
      getPhone() {
        var vm = this;
        $.post(comLink.yxtHost + '/system/getCompany', function(resp) {
        	console.log(resp.data,'1323133')
          if(resp.code == 1) {
            vm.companyPhone = resp.data.sysProductorPhone;
            vm.companyName = resp.data.sysProductorName;
            vm.companyAddress = resp.data.sysProductorAddress;
          }
        });
      },
    	lostblur(){
    		$('input').blur()
    	},
      //选择日期筛选
      xuanzhongData(){

        let d = this.dataVal;
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        this.dataVal =year + '-' + (month<10?'0'+month:month);
        this.tuiguangResaultAxios();
      },
      //
      tuiguangResaultAxios : function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/promote/detail',
          data:{
            startDate : vm.dataVal,
            openid : sessionStorage.openid,
          },
          dataType:'json',
          type:'get',
          success:function (res) {
          	console.log(res.data)
            if(res.code == 1){
              vm.resaultLists = res.data;
              vm.list = res.data.list;
              /*vm.isNull()
              vm.user = vm.resaultLists.user;
              vm.list = vm.resaultLists.list;
              for(var i = 0,l = vm.list.length;i < l; i ++){
                vm.list[i].createTime = vm.list[i].createTime.slice(0,10);
                if(vm.list[i].remark === null){
                  vm.list[i].remark = '无'
                }
              }*/
            }
          },
          error:function (res){

          }
        })
      },
      //判断是否为null 为null则改为0
      isNull(){
        if(this.resaultLists.bonus === null){
          this.resaultLists.bonus = 0
        }
        if(this.resaultLists.notAccount === null){
          this.resaultLists.notAccount = 0;
        }
        if(this.resaultLists.promote === null){
          this.resaultLists.promote = 0;
        }
      },
      //查询我的推广人数 No.1用(pageNum-1)*pageSize+当前页的第几条数据
      // myTuiCountAxios : function(){
      //   var vm = this;
      //   $.ajax({
      //     url:comLink.yxtHost + '/access/integralRecord',
      //     data:{
      //       // pageNum : vm.pageNumData,
      //     },
      //     dataType:'json',
      //     type:'get',
      //     success:function (res) {
      //       console.log(res)
      //       if(res.code == 1){
      //
      //       }
      //     },
      //     error:function (res){
      //
      //     }
      //   })
      // },
    },
  }
</script>
<style>
	.el-input--prefix .el-input__inner{
		padding-left: 1.1rem;
	}
  .tuiguang-result-content .block .el-input--suffix input{
    background: transparent;
    border: none;
    color: #307FF5;
    padding-left: 4rem;
    padding-right: 0;
    /*width: 10rem;*/
  }
  /*设置input里placeholder颜色*/
  .tuiguang-result-content .block .el-input--suffix input::-webkit-input-placeholder{
    /*color:#307FF5;*/
    color: #307FF5;
  }
  .tuiguang-result-content .block .el-input--suffix input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    /*color: #307FF5;*/
    color: white;
  }
  .tuiguang-result-content .block .el-input--suffix input::-moz-placeholder { /* Mozilla Firefox 19+ */
    /*color:#307FF5;*/
    color: white;
  }
  .tuiguang-result-content .block .el-input--suffix input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    /*color:#307FF5;*/
    color: white;
  }
  .tuiguang-result-content .block .el-input--suffix .el-input__icon{
    line-height: 1.2rem;
    /*height: 13px;*/
    color: red;
  }
  .tuiguang-result-content .block .el-input--suffix{
    width: 12.5rem;
  }
  .tuiguang-result-content .block .el-date-editor .el-input__suffix{
    color: white;
  }
  .tuiguang-result-content choose-month-btn .block .el-date-editor .el-input__suffix{
    color: white;
  }
  .tuiguang-result-content .block .el-input{
    font-size: 1.75rem;
    /*background: #307FF5;*/
    line-height: 1.5rem;
  }
  .tuiguang-result-content .choose-month-btn .block{
    position: absolute;
    top: -0.8rem;
    right: 0.55rem;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
 .tuiguang-result-content{
   width: 100%;
   position: absolute;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   .head-content{
     width: 100%;
     height: p(80);
     line-height: p(80);
     background: white;
     font-size: p(30);
     color: $bgBlue;

     .choose-month-btn{
       width: p(140);
       height: p(50);
       border-radius: p(10);
       line-height: p(50);
       text-align: center;
       color: white;
       margin-top: p(15);
     }
   }
   .customer-infos{
     width: 100%;
     height: p(183);
     margin-top: p(20);

     .head-pic{
       display: inline-block;
       width: p(123);
       height: p(123);
       box-sizing: border-box;
       border: p(3) solid white;
       border-radius: 50%;
     }
     .infos-main{
       height: p(123);
       display: inline-block;
       width: 77%;
       margin-left: p(30);

       .infos-row{
         overflow: hidden;
         span{
           float: left;
         }

         >span:nth-child(1){
           width: 27%;
         }
         >span:nth-child(2){
           width: 73%;
           color: #9d9d9d;
         }
         .address{
           /*line-height: p(38);*/
         }
       }
       .infos-row:nth-child(2){
         margin: p(20) 0;
       }
     }

   }
   .tuiguang-shu-content{
     width: 100%;
     height: p(110);
     .tuiguang-shu-main{
       width: 100%;
       border-top: p(1) solid #999999;

       .tuiguang-shu-row{
         margin-top: p(10);
         width: 50%;
         text-align: center;
         height: p(90);
         >span:nth-child(1){
           display: block;
           margin: p(10) 0 p(20) 0;
           color: #989898;
         }
         >span:nth-child(2){
           color: $bgBlue;
           font-size: p(28);
           display: block;
         }
       }
       .tuiguang-shu-row:nth-child(1){
         border-right: p(2) solid #999999;
       }
     }
   }
   .block-color{
     width: 100%;
     height: p(20);
     background: #eee;
   }
   /*奖励金内容*/
   .jianglijin-content{
     width: 100%;
     height: p(290);

     .jianglijin-main{
       width: 100%;
       height: p(100);
       padding-top: p(20);

       .jianglijin-row{
         width: 100%;
         height: p(70);
         line-height: p(70);
         margin-bottom: p(20);

         .left-title{
           display: inline-block;
           width: 44%;
           height: 100%;
         }
         .right-value{
           display: inline-block;
           width: 56%;
           height: 100%;
           text-align: center;
           border-radius: p(10);
           background: #eeeeee;
           color: #656565;
         }
       }
     }
   }

   .mingxi{
     width: 100%;

     .nav-main{
       height: p(70);
       display: flex;
       justify-content: space-evenly;
       border-bottom: p(1) solid #ccc;
       color: #363636;

       .nav-row{
         width: 25%;
         text-align: center;
         line-height: p(70);
         float: left;
       }
     }
     .mingxi-main{
       width: 100%;
       margin-top: p(10);
       .mingxi-row{
         display: flex;
         justify-content: space-evenly;
         height: p(60);
         line-height: p(60);
         text-align: center;

         >span{
           display: inline-block;
           width: 25%;
         }
         .time{
           color: #686868;
         }
         .jianglijin{
           color: $bgBlue;
         }
       }
     }
   }
 }
</style>
