<template>
  <div class="buy-detail" v-title data-title="消费明细">
    <div class="choose-time">
      <group class="choose-time-main  f-pr">
        <datetime
          v-model="value1"
          format="YYYY-MM"
          @on-change="change"
          @on-cancel="log('cancel')"
          @on-confirm="onConfirm"
          @on-hide="log('hide',)"></datetime>
        <i class="icon iconfont icon-sanjiaoxing-down fontSize-14 f-abs"></i>
      </group>
    </div>
    <div class="details-show-here b-white">
      <ul class="detail-main f-oh">
        <li class="detail-row f-oh f-fl p-lef-rig24" v-for="(item,i) in value" :key="i">
          <div class="left f-fl">
            <span class="f-db online-buy fontSize-14">{{item.remark}}</span>
            <span class="f-db time fontSize-10">{{item.createTime}}</span>
          </div>
          <div class="right fontSize-13 f-fr" v-if="item.type == 1">+{{item.incomeAmount}}</div>
          <div class="right fontSize-13 f-fr" v-if="item.type == 2">-{{item.incomeAmount}}</div>
        </li>
      </ul>
    </div>
    <div class="nomore-infos fontSize-17" v-if="isNoMoreInfos">
      <span>---无更多记录---</span>
    </div>
  </div>
</template>
<script>
  import { Datetime, Group, XButton } from 'vux';
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  export default{
    data (){
      return{
        value1: '',
        isNoMoreInfos : true,
        value : [],
        pageSize : 20,
        pageNum : 1,
      }
    },
    methods : {
      change (value) {
        // console.log('change', value)
        this.getPeriodAxios()
      },
      onConfirm (val) {
        // console.log('on-confirm arg', val)
        // console.log('current value', this.value1)
      },
      log (str1, str2 = '') {
        // console.log(str1, str2)
      },
      getPeriodAxios: function(){
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/access/incomeRecord',
          data: {
            // date : '2018-01-01',
            date:vm.value1,
            pageNum : vm.pageNum,
            pageSize : vm.pageSize,
            type : 2,
            openid : sessionStorage.openid,
          },
          dataType: 'json',
          type: 'post',
          success: function (res) {
            if (res.code == 1) {
              vm.value = res.data.list;
            }else{

            }
          },
          error: function (res) {

          }
        })

      },
    },
    mounted(){
    	this.getPeriodAxios()
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
      var currentdate = year + seperator1 + month;
      console.log(currentdate);
      this.value1 = currentdate;
    },
    components: {
      Datetime,
      Group,
      XButton
    },
  }
</script>
<style>
	.buy-detail .weui-cell {
    padding: 1.15rem 1.65rem;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
  .buy-detail .dp-container{
    position: fixed;
    width: 100%;
    height: 37.5rem;
    left: 0;
    top: 5rem;
    z-index: 10000;
    background-color: #fff;
    display: none;
    /*-webkit-transition: -webkit-transform 0.3s ease;*/
    /*transition: -webkit-transform 0.3s ease;*/
    transition: transform 0s ease;
    /*transition: transform 0.3s ease, -webkit-transform 0.3s ease;*/
  }
  body .buy-detail .dp-mask{
    background-color: transparent;
    display: none;
  }
 .buy-detail .choose-time .choose-time-main{
    height: 100%;
  }
  .buy-detail .choose-time .vux-no-group-title,.choose-time .weui-cells{
    margin-top: 0;
    height: 100%;
  }
  .buy-detail .choose-time .weui-cells .vux-datetime-value{
    text-align: center;
    line-height: 3.3rem;
  }
 .buy-detail .choose-time .weui-cells{
   font-size: 1.5rem;
 }
  .buy-detail .choose-time .weui-cell_access .weui-cell__ft:after {
    display: none;
  }
  .buy-detail .choose-time .weui-cells:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #eee;
    color: #eee;
    /*-webkit-transform-origin: 0 100%;*/
    /*transform-origin: 0 100%;*/
    /*-webkit-transform: scaleY(0.5);*/
    /*transform: scaleY(0.5);*/
  }
 .buy-detail .choose-time .dp-header .dp-item.dp-right,
 body .buy-detail .dp-header .dp-item.dp-right,
 .buy-detail .weui-cell_access .weui-cell__ft .vux-cell-value{
   color: #307ff5;
   display: inline-block;
   line-height: 2rem;
   font-size: 1.8rem;
 }
  body .buy-detail .dp-header,body .buy-detail .dp-header .dp-item{
    font-size: 1.625rem;
  }
  .dp-header .dp-item.dp-right {
    color: #307ff5!important;
}
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  body .buy-detail{
    width: 100%;
    border-bottom: p(1) solid #eeeeee;
    .choose-time{
      height: p(80);

      .choose-time-main{
        font-size: p(24);

        .icon-sanjiaoxing-down{
          top: 50%;
          right: 50%;
          margin-top: p(-14);
          margin-right: p(-90);
        }
      }
    }
    .details-show-here{

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
    .nomore-infos{
      margin-top: p(100);
      text-align: center;
      color: #999;
    }
  }
</style>
