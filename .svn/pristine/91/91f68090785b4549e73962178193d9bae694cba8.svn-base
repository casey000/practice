<template>
  <div class="set-password" v-title data-title="设置支付密码">
    <div class="set-content">
      <ul class="set-main fontSize-15">
        <li class="set-row">
          <span>密码：</span>
          <input type='password' placeholder="填写6位数字支付密码" v-model="firstPassWord">
        </li>
        <li class="set-row f-pr">
          <span>确认密码：</span>
          <input type='password' placeholder="再次填写支付密码" v-model="secondPassWord">
        </li>
      </ul>
    </div>
    <div class="bottom-button" @click="submitBtn()">
      <span>确定</span>
    </div>
  </div>
</template>
<script>
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  export default {
    data (){
      return {
        firstPassWord : null,
        secondPassWord : null,
      }
    },
    methods :{
      submitBtn(){
        let reg=/^\d{6}$/;
        console.log(this.firstPassWord);
        if(this.firstPassWord){
          if(!reg.test(this.firstPassWord)){
            Toast({
              message: '密码输入格式不对',
              duration: 2000
            });
          }else if(this.secondPassWord === null){//
            Toast({
              message: '确认密码为空',
              duration: 2000
            });
          }else if(this.secondPassWord === this.firstPassWord){
            Toast({
              message: '密码修改成功',
              duration: 2000
            });
            //session储存起来
            sessionStorage.setItem('payPassword',this.firstPassWord);
            this.$router.back(-1);
          }else{
            Toast({
              message: '2次密码输入不一致',
              duration: 2000
            });
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss";
  .set-password{

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
          }
          >input{
            display: inline-block;
            height: 98%;
            width: 75%;
            float: left;
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
