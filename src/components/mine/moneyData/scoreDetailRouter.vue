<template>
  <div class="score-detail-content fontSize-14" v-title data-title="积分明细">
    <div class="all-score b-white p-lef-rig24 f-oh">
      <span class="f-fl color666 ">入账积分</span>
      <span class="f-fr colorff6" v-if="jifenDetail.type!=2">+{{jifenDetail.value}}</span>
      <span class="f-fr colorff6" v-else>-{{jifenDetail.value}}</span>
      
    </div>
    <ul class="detail-main m-top10 f-oh b-white p-lef-rig24">
      <li class="detail-row f-oh f-fl ">
        <span class="f-fl color666">类型</span>
        <span class="f-fr"> {{jifenDetail.text}}</span>
      </li>
      <li class="detail-row f-oh f-fl ">
        <span class="f-fl color666">时间</span>
        <span class="f-fr"> {{jifenDetail.createTime}}</span>
      </li>
      <li class="detail-row f-oh f-fl ">
        <span class="f-fl color666">备注</span>
        <span class="f-fr" v-if="jifenDetail.type!=2"> {{jifenDetail.text}}:获得{{jifenDetail.value}}积分</span>
        <span class="f-fr" v-else> {{jifenDetail.text}}：消耗{{jifenDetail.value}}积分</span>
      </li>
    </ul>
  </div>
</template>
<script>
//import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery
  export default{
    data(){
      return {
        jifenDetail : {},//积分明细数据
      }
    },
    mounted (){
      this.jifenDetailAxios()
    },
    methods : {
      //积分详情页列表
      jifenDetailAxios: function () {
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let jifenId = hash[1];
        console.log(jifenId);
        $.ajax({
          url: comLink.yxtHost + '/access/integralDetail',
          data: {
            openid: sessionStorage.openid,
            id : jifenId,
          },
          dataType: 'json',
          type: 'post',
          success: function (res) {
            console.log(res)
            if (res.code == 1) {
              vm.jifenDetail = res.data;
            }
          },
          error: function (res) {

          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
 .color666{
   color: #666666;
 }
  .score-detail-content{

    .all-score{
      line-height: p(90);
    }
    .detail-main{
      width: 100%;

      .detail-row{
        width: 100%;
        line-height: p(80);
        border-bottom: p(1) solid #eeeeee;
      }
    }

  }
</style>
