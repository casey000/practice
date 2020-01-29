<template>
  <div class="change-name" v-title data-title="编辑微店">
    <div class="change-main">
      <el-input
        placeholder="微店昵称"
        v-model="changedName"
        clearable>
      </el-input>
    </div>
    <div class="confirm-btns" @click="changeName()">
      <span>确定</span>
    </div>
  </div>
</template>
<script>
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import comLink from "./../../../../common/common_link"; //导入总线
  export default {
    data (){
      return{
        changedName : '',//输入的微店姓名
      }
    },
    methods : {
    //  提交更改微店名称
      changeName () {
        if(this.changedName){
          this.uploadNameAxios();
          this.$router.back(-1);
        }else{
          Toast({
            //mintui提示效果
            message: "请输入微店名称",
            duration: 2000,
          });
        }
      },
      //确认上传，请求接口
      uploadNameAxios() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/store/saveStore',
          data:{
            // backgroundFile : comLink.weiStoreImg,
            // 'isRecommend' : 1,//1:是 0:否 不填则查询所有
            // introduce : vm.introduce,
            // isOpenAdvert : vm.isOpenAdvert,
            // isOpenPho : vm.isOpenPho,
            name : vm.changedName,
            storeId : sessionStorage.weiStoreId,
            openid:sessionStorage.openid,
          },
          dataType:'json',
          type:'get',
          success:function (data) {
            if(data.code == 1){
              Toast({
                //mintui提示效果
                message: "名称更改成功",
                duration: 2000,
              });
            }
          },
          error:function (data) {

          }
        })
      },
    }
  }
</script>
<style>
  .change-name .change-main .el-input__inner{
    border:none;
  }
  .change-name .change-main .el-input--suffix .el-input__inner{
    border-radius: 0;
    height: 5.9375rem;
  }
  .el-input {
    position: relative;
    font-size: 1.6rem;
    display: inline-block;
    width: 100%;
}
.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 0.5rem;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 5.9375rem;
    line-height: 5.9375rem;
    outline: 0;
    padding: 0 1.8rem;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss";
  .change-name{

    .change-main{
      height: p(95);
      width: 100%;
      margin-top: p(20);
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
  }
</style>
