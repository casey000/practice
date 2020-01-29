<template>
  <div v-title data-title="编辑微店">
    <div class="weistore-introduce">
      <textarea class="textarea" cols="30" v-model="leaveMsg" rows="10"></textarea>
    </div>
    <div class="confirm-btns" @click="addLeaveMsg()">
      <span>确定</span>
    </div>
  </div>
</template>
<script>
  import comLink from "../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  export default {
    data (){
      return{
        leaveMsg : ''
      }
    },
    methods : {
      addLeaveMsg () {
        comLink.leaveMsg = this.leaveMsg;
        this.$router.back(-1);
        Toast({
          //mintui提示效果
          message: "编辑成功",
          duration: 2000,
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss";
  .weistore-introduce{
    width: 100%;
    margin-top: p(20);
    padding: p(10) p(20);
    background: white;

    .textarea{
      display: inline-block;
      width: 100%;
      height: p(145);
      border: none;
      font-size: p(24);
      line-height: p(34);
      resize: none;

    }
  }
  .confirm-btns{
    display: inline-block;
    height: p(70);
    width: 100%;
    font-size: p(30);
    text-align: center;
    margin-top: p(20);
    >span{
      display: inline-block;
      width: p(200);
      height: 100%;
      line-height: p(70);
      background: $bgBlue;
      color: white;
      border-radius: p(10);
    }
  }
</style>
