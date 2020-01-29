<template>
  <div class="order-detail-content f-oh">
    <div class="shouhuo-address f-fl f-oh">
      <i class="icon-address f-fl"></i>
      <span class="f-fl">[收货地址]{{order.province}} {{order.city}} {{order.area}} {{order.address}}</span>
      <!--<span class="f-fl">[收货地址]:</span>-->
      
    </div>
   <!-- <div class="kuaidi100"><a href="https://m.kuaidi100.com/" target="_blank">快递查询</a></div>-->
    <div class="info-shows f-fl f-oh" >
      <span class="title f-fl">{{expName}}：{{expNo}}</span>
      <div class="steps-detail-words f-fl" v-if="this.wuliuLists.length > 0">
        <div class="wuliu-steps" style="" ><!--height: 300px;-->
          <el-steps direction="vertical" min-space='7rem' :active=activeNum>
            <el-step :title=item.acceptTime
                     :description=item.acceptStation
                     v-for="(item,i) in wuliuLists" :key="i">{{item}}</el-step>
          </el-steps>
        </div>
        
      </div>
      <div style="" v-else><!--height: 300px;-->
          	<p style="margin:15rem auto ; text-align: center; width: 100%; color: #333;">暂无物流信息</p>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  export default {
    data (){
      return {
        wuliuLists : [],
        activeNum : null,
        order : {},
        expName : '',
        expNo : '',
      }
    },
    mounted(){
//    this.jifenDuihuan();
    },
    created(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let afterSaleOrderId = hash[1];
       

        $.ajax({
          url:comLink.yxtHost + '/order/afterSaleExp',
          data:{
            openid : sessionStorage.openid,
            afterSaleOrderId: afterSaleOrderId
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            console.log(data);
            if(data.code == 1){
              vm.wuliuLists = data.data.list;
              vm.order = data.data.order;
              vm.expName = data.data.expName;
              vm.expNo = data.data.expNo;
              vm.activeNum = vm.wuliuLists.length
            }
          },
          error:function (data) {

          }
        })
      
    },
    methods :{
      //获取物流状态
//    jifenDuihuan: 
    },
  }
</script>
<style>
  .wuliu-steps .el-step__title{
    font-size: 1.5rem;
  }
  .wuliu-steps .el-step__description{
    font-size: 1.4rem;
  }
  .wuliu-steps .el-step__description.is-finish{
    color: #999;
  }
  .wuliu-steps .el-step__title.is-process,
  .wuliu-steps .el-step__description.is-process,
  .wuliu-steps .el-step__head.is-process{
    color: #09BB07;
  }
  .wuliu-steps .el-step__description {
    padding-right: 1rem;
  }
  .wuliu-steps .el-step.is-vertical{
  	display: block;
  }
  .wuliu-steps .el-step.is-vertical .el-step__line {
    display: none;
	}
  
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .wuliu-steps{
  	padding-bottom: 5rem;
  }
  .order-detail-content{
    width: 100%;

    .kuaidi100{
      color: blue;
      font-size: 1.8rem;
      margin: 1rem auto 0 1.3rem;
      padding-top: 2rem;

      a {
        padding-top: 1rem;
        color: blue;
        display: inline-block;
      }
    }

    .shouhuo-address{
      padding: p(10) p(20) 0 p(20);
      height: p(100);
      width: 100%;
      background: white;
      color: #a0a0a0;
      font-size: p(28);
      float: left;
      line-height: p(48);

      .icon-address{
        display: inline-block;
        width: p(20);
        height: p(28);
        background: #ccc;
        margin-top: p(10);
      }
      >span{
        margin-left: p(10);
      }
    }

    .info-shows{
      padding: 0 p(20);
      background: #FFFFFF;
      margin-top: p(20);
      width: 100%;

      .title{
        display: inline-block;
        width: 100%;
        height: p(70);
        font-size: p(28);
        line-height: p(70);
        border-bottom: p(1) solid #EDEDED;
      }
      .steps-detail-words{
        margin-left: p(30);
        >dt{
          line-height: p(40);
          margin-top: p(10);
          >span{
            color: $bgBlue;
            font-size: p(20);
          }
          >p{
            font-size: p(22);
            color: #999999;
          }
        }
      }
    }
  }
</style>
