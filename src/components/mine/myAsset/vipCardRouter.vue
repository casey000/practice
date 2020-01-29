<template>
  <div class="vip-card-content p-lef-rig24" v-title data-title="会员卡管理">
    <div class="cards f-pr">
      <img class="card-img" :src=carImgPath alt="">
      <span class="clazz">{{vipCard.memberName}}</span>
      <span>会员卡编号：{{vipCard.num}}</span>
    </div>
    <!--<div class="withdraw-money-btn" @click="DrawOutMoney">
      <span class="withdraw-money-word fontSize-18">提现</span>
    </div>-->
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  export default{
    data (){
      return{
        carImgPath : '@/../static/image/mine/vipCard.png',
        vipCard : {},
      }
    },
    methods : {
      cardAxios: function(){
        var vm = this;
        console.log(window.location.hash);
        // let hash = window.location.hash;
        // hash = hash.split('=');
        // let id = hash[1];//传递过来的id
        // console.log(id);
        axios.get(comLink.yxtHost + '/access/member', {
          params:{
            openid : sessionStorage.openid
          }
        }).then(function(response) {
          if (response.data.code = "200") {
            vm.vipCard = response.data.data;//收货地址首页数据
            console.log(vm.vipCard,'会员卡')
          }
        })
          .catch(function(res) {

          });
      },
      DrawOutMoney (){
        //提现
        this.$router.push({
          path : '/mine/myAsset/withdrawRouter',
          // query : { id : 'id'}
        })
        console.log('点击提现')
      }
    },
    mounted(){
      this.cardAxios();
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
 .vip-card-content{
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: white;

   .cards{
     width: 100%;
     margin-top: p(40);

     .card-img{
       width: 100%;
     }
     >span{
       position: absolute;
       bottom: p(25);
       left: p(22);
       color: white;
       font-size: p(24);
     }
     .clazz {
       bottom: 10.6rem;
       color: #784500;
       font-size: 3rem;
       right: 7rem;
       display: inline-block;
       text-align: right;
     }
   }
   .withdraw-money-btn{
     width: 100%;
     height: p(90);
     margin-top: p(100);
     text-align: center;
     background: $bgBlue;
     border-radius: p(10);
     line-height: p(90);
     color: white;
   }
 }
</style>
