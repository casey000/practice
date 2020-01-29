<template>
  <div class="mymoney-content" v-title data-title="零钱记录">
    <div class="nav-content b-white">
      <ul class="nav-main f-oh fontSize-15">
        <li class="nav-row f-fl" :class="{ active : activeNum === ''}" @click="activeFunc('')">
          <span class="nav-inner">全部</span>
        </li>
        <li class="nav-row f-fl" :class="{ active : activeNum === 1}" @click="activeFunc(1)">
          <span class="nav-inner">收入</span>
        </li>
        <li class="nav-row f-fl" :class="{ active : activeNum === 2}" @click="activeFunc(2)">
          <span class="nav-inner">支出</span>
        </li>
      </ul>
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
  </div>
</template>
<script>
  const a = [
    {
      item: '在线购买',
      time : '2018-03-04  15:20:34',
      score : 20
    },
    {
      item: '邀请好友购买物品',
      time : '2018-03-04  15:20:34',
      score : 20
    },
  ];
  const b = [
    {
      item: '在线购买',
      time : '2018-03-04  15:20:34',
      score : 20
    },
  ];
  const c = [
    {
      item: '在线购买',
      time : '2018-03-04  15:20:34',
      score : 20
    },
    {
      item: '邀请好友购买物品',
      time : '2018-03-04  15:20:34',
      score : 20
    },
    {
      item: '被好友邀请购买物品',
      time : '2018-03-04  15:20:34',
      score : 20
    },
  ];
//import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  export default {
    data (){
      return {
        activeNum :'',
        value : [],
        pageSize : 20,
        pageNum : 1,
        type : ''
      }
    },
    methods : {
      activeFunc(n){
        this.activeNum = n;
        this.type = n;
        this.getPeriodAxios();
      },
    //  获取零钱记录数据
      getPeriodAxios: function(){
        var vm = this;
        // var params = new URLSearchParams();
        // params.append('productId',vm.activeNum);
        // params.append('openid',sessionStorage.openid);
        // console.log(vm.activeNum,'vm.activeNum');
        $.ajax({
          url: comLink.yxtHost + '/access/incomeRecord',
          data: {
            // date : '2018-01-01',
            pageNum : vm.pageNum,
            pageSize : vm.pageSize,
            type : vm.type,
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
        // this.$axios({
        //   method: 'post',
        //   url:comLink.yxtHost + '/access/incomeRecord',
        //   data: {
        //     date : '',
        //     pageNum : vm.pageNum,
        //     pageSize : vm.pageSize,
        //     type : 1,
        //   },
        // }).then((res)=>{
        //   console.log(res,'res')
        //   if(res.data.code == 1){
        //
        //   }
        // });
      },
    },
    mounted(){
      this.getPeriodAxios();
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
.mymoney-content{
  width: 100%;

  .nav-content{
    width:100%;
    height: p(90);
    border-bottom: p(1) solid #e5e5e5;
    color: #666666;
    .nav-main{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .nav-row{
        width: 33.3333%;
        text-align: center;
        line-height: p(90);

        .nav-inner{
          display: inline-block;
          height: 100%;
          box-sizing: border-box;
          padding: 0 p(20);
        }
      }
      .nav-row.active .nav-inner{
        border-bottom: p(3) solid $bgBlue;
        color: $bgBlue;
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
}

</style>
