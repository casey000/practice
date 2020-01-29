<template>
  <div class="set-weChat-num" v-title data-title="个人信息">
    <div class="set-content">
      <ul class="set-main fontSize-15">
        <li class="set-row">
          <span>职业：</span>
          <input type="text" placeholder="填写您的职业" v-model="profession">
        </li>
      </ul>
    </div>
    <div class="bottom-button" @click="saveJob()">
      <span>确定</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss";
  .set-weChat-num{

    .set-content{
      background: white;
      .set-main{
        width: 100%;

        .set-row{
          width: 100%;
          height: p(80);
          line-height: p(80);
          overflow:hidden;
          border-bottom: p(1) solid #eee;
          padding: 0 p(24);
          >span{
            display: inline-block;
            width: 25%;
            float: left;
            font-size: 1.8rem;
            
          }
          >input{
            display: inline-block;
            height: 98%;
            width: 75%;
            float: left;
            font-size: 1.8rem;
            
          }
          .get-yanzhengma-btn{
            position: absolute;
            top: 50%;
            margin-top: p(-16);
            right: p(24);
            font-size: p(22);
            background: $bgBlue;
            border-radius: p(10);
            color: white;
            display: inline-block;
            height: p(32);
            line-height: p(32);
            width: p(130);
            text-align: center;
            /*padding: p(10);*/
          }
        }
      }
    }

    .bottom-button{
      position: fixed;
      bottom: p(20);
      right: p(24);
      left: p(24);
      height: p(90);
      background: $bgBlue;
      border-radius: p(10);
      color: white;
      text-align: center;
      line-height: p(90);
      font-size: p(30);
    }
  }
</style>
<script>
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery

  export default {
    data() {
      return {
        name: "",
        newName: "",
        profession : '',
      };
    },
    created() {

    },
    methods: {
      //确定按钮
      saveJob(){
        this.saveJobAxios();
      },
      //保存qq
      saveJobAxios:function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/user/updateUser',
          data:{
            'profession' : vm.profession,
            'openid':sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000
              });
              vm.$router.push({
                path : '/mine/personalInformation',
                // query : { carId : orderId }
              })
            } else {
              Toast({
                //mintui提示效果
                message: data.msg,
                duration: 2000
              });
            }
          },
          error:function (data) {

          }
        })
      },
    }
  };
</script>
