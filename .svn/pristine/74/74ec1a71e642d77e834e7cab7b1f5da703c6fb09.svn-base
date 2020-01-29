<template>
  <div v-title data-title="微店介绍">
    <div class="weistore-introduce">
      <textarea class="textarea" cols="40" v-model="introduce" rows="15"></textarea>
    </div>
    <div class="confirm-btns" @click="addIntroduce()">
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
        introduce : ''
      }
    },
    methods : {
      addIntroduce () {
        if(this.introduce){
          this.uploadIntroAxios();
          this.$router.back(-1);
        }else{
          Toast({
            //mintui提示效果
            message: "请输内容",
            duration: 2000,
          });
        }
      },
      //确认上传，请求接口
      uploadIntroAxios() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/store/saveStore',
          data:{
            // backgroundFile : comLink.weiStoreImg,
            // 'isRecommend' : 1,//1:是 0:否 不填则查询所有
            introduce : vm.introduce,
            // isOpenAdvert : vm.isOpenAdvert,
            // isOpenPho : vm.isOpenPho,
            // name : vm.changedName,
            storeId : sessionStorage.weiStoreId,
            openid:sessionStorage.openid,
          },
          dataType:'json',
          type:'get',
          success:function (data) {
            if(data.code == 1){
              Toast({
                //mintui提示效果
                message: "微店介绍编辑完成",
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
    height: p(250);
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
