<template>
  <div class="my-zengsong-content" v-title data-title="我的赠送">
    <div class="head-main">
      <span class="total-money fontSize-18 f-db">赠送总金额</span>
      <span class="money f-db f-tac">￥{{money}}</span>
    </div>
    <!--达到获取赠送的条件显示内容-->
    <div v-if="getMoney" class="could-get-money">
      <div class="btn">
        <span class="dis-inblo fontSize-15">一键领取</span>
      </div>
    </div>
    <!--未达到获取赠送的条件显示内容-->
    <div v-if="!getMoney" class="not-get-money">
      <span class="tiaojian f-tac f-db fontSize-15">抱歉，您还需要消费5000元才可领取！</span>
      <div class="btn">
        <span class="dis-inblo fontSize-15">一键领取</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data (){
      return {
        money : 0,
        getMoney : true,
      }
    },
    methods : {
      ifGetMoney(){
        if(this.getMoney === true){
          this.money = 100;
        }
      }
    },
    mounted:function(){
      this.ifGetMoney();
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .my-zengsong-content{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: white;

    .head-main{
      width: 100%;
      height: p(350);
      background: $bgBlue;
      padding-top: p(80);

      .total-money{
        color: #f2f3ed;
        text-align: center;
      }
      .money{
        font-size: p(80);
        margin-top: p(55);
        color: white;
      }
    }
    .not-get-money{
      width: 100%;
      .tiaojian{
        color: #fb8931;
        margin-top: p(30);
      }
      .btn{
        display: inline-block;
        width: 100%;
        height: p(70);
        text-align: center;
        margin-top: p(50);
        >span{
          width: p(590);
          height: 100%;
          line-height: p(70);
          text-align: center;
          background: #eee;
          color: #9e9e9e;
          border-radius: p(10);
        }
      }
    }
    .could-get-money{
      width: 100%;

      .btn{
        display: inline-block;
        width: 100%;
        height: p(70);
        text-align: center;
        margin-top: p(50);
        >span{
          width: p(590);
          height: 100%;
          line-height: p(70);
          text-align: center;
          background: $chengse;
          color: white;
          border-radius: p(10);
        }
      }
    }
  }
</style>
