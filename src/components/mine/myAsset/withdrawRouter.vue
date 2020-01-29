<template>
  <div class="withdraw-money-content" v-title data-title="提现">
    <div class="withdraw-money p-lef-rig24" v-if="!isWithdrawed">
      <ul class="withdraw-money-main fontSize-14">
        <li class="f-oh money-row">
          <dt class="f-fl row-inner m-right5">到账到银行卡</dt>
          <dt class="f-fl row-inner m-left12 grey-c">
            <span>中国银行借记卡（3548）</span>
            <p class="fontSize-11">提现手续费用0.1%</p>
          </dt>
        </li>
        <li class="money-row m-top20">
          <dt>提现金额</dt>
        </li>
        <li class="money-row m-top10">
          <input class="inp-main" type="text" placeholder="金额">
        </li>
        <li class="money-row">
          <p class="grey-c fontSize-10">可提现金额￥1000，<span class="all-withdraw"> 全部提现</span></p>
        </li>
        <li class="withdraw-btn-main" @click="withdrawBtn">
          <div class="withdraw-btn-word fontSize-15">提现</div>
        </li>
      </ul>
    </div>
    <div v-if="isWithdrawed" class="after-withdraw fontSize-14">
      <icon type="success" is-msg></icon>
      <span class="success-warn fontSize-18">提现成功</span>
      <!--weui-icon_msg-->
      <div class="withdraw-infos f-oh">
        <span class="grey-c f-fl">储蓄卡</span>
        <span class="f-fr">中国银行 尾号8888</span>
      </div>
      <div class="withdraw-infos f-oh">
        <span class="grey-c f-fl">提现金额</span>
        <span class="f-fr">10000</span>
      </div>
      <div class="complate-btn p-lef-rig24 fontSize-18">
        <span class="button">完成</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { Box, Icon } from 'vux'
  export default  {
    data (){
      return{
        isWithdrawed :false
      }
    },
    methods : {
      withdrawBtn (){
        this.$router.push({
          // path:"/mine/myAsset"
          // path: '/'
        });
        this.isWithdrawed = true
      }
    },
    components : {
      Box,
      Icon
    }
  }
</script>
<style>
  .after-withdraw .weui-icon_msg{
    font-size: 12.5rem;
    margin-top: 12.5rem;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .grey-c{
    color: #b0b0b0;
  }

  .withdraw-money-content{
    .withdraw-money{
      margin-top: p(30);

      .withdraw-money-main{
        background: white;
        padding: 0 p(30);
        .money-row{
          line-height: p(35);

          .inp-main{
            display: inline-block;
            width: 100%;
            height: p(50);
            line-height: p(50);
            border-bottom: p(1) solid #333333;
            color: #ff675f;
          }

          .row-inner{
            margin-top: p(25);
          }
          .grey-c.fontSize-10{
            line-height: p(40);
          }
          .all-withdraw{
            color: $bgBlue;
          }
        }
        .withdraw-btn-main{
          padding: p(50) p(100);
          margin-top: p(40);

          .withdraw-btn-word{
            width: 100%;
            height: p(70);
            line-height: p(70);
            text-align: center;
            color: white;
            background: $bgBlue;
            margin-top: p(35);
            border-radius: p(10);

          }
        }
      }
    }
    .after-withdraw{
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: white;
      text-align: center;

      .success-warn{
        display: inline-block;
        width: 100%;
        text-align: center;
        line-height: p(85);
        margin-bottom: p(35);
      }
      .withdraw-infos{
        padding: p(0) p(80);
        line-height: p(78);//字体28 上下间距25
      }
      .complate-btn{
        width: 100%;
        height: p(100);
        line-height: p(100);
        text-align: center;
        color: white;
        margin-top: p(75);
        .button{
          display: inline-block;
          width: 100%;
          height: 100%;
          background: $bgBlue;
          border-radius: p(10);
        }
      }
    }
  }

</style>
