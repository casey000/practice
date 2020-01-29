<template>
  <div class="change-img-content"  v-title data-title="我的微店">
    <div class="change-img-main">
      <div class="title fontSize-15 p-lef-rig30">
        <span>选择图片</span>
      </div>
      <div class="choose-file f-pr fontSize-15 p-lef-rig30">
      	<span  id="filePath" class="input" style=" 
      			position: absolute;
              background-color: #307ff5;
              color: #fff;
              width: 11rem;
              font-size: 1.8rem;
               height: 4rem;
               line-height: 4rem;
               border-radius: 10px;
              text-align: center;">请选择文件</span>
        <form class="submit_from" style=" opacity: 0;width: 11rem; height: 4rem;">
          <input type="file"
                 class="file-input"
                 id="up-file"
                 accept="image/*"
                 name="image"
                 v-on:change="changeFile($event)" style="position: absolute;width: 11rem; height: 4rem;"/>
          
        </form>
        <label class="file-label" for="up-file" style="color: red;font-size: 1.5rem ;display: inline-block; ">
          建议上传图片尺寸为750*325像素
        </label>
      </div>
      <div class="imgBox">
        <img class="img-pic" :src="userPicture" alt="">
      </div>
      <div class="submit-btn p-lef-rig30" @click="saveImg">
        <span class="btn-inner fontSize-19">提交</span>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../../../common/imagesUpload/js/alloy_crop";
  import "../../../../common/imagesUpload/js/alloy_finger";
  import "../../../../common/imagesUpload/js/transform";
  import { Switch ,Toast} from 'mint-ui';
  import comLink from "./../../../../common/common_link"; //导入总线
  import axios from 'axios'
  import $ from "jquery"; //导入jquery

  let CanvasResize = require("../../../../common/imagesUpload/js/resize.min");
  export default {
    data (){
      return{
        userPicture : '',
        backimg:'',
        // 'isRecommend' : 1,//1:是 0:否 不填则查询所有
        introduce : null,
        name : '',
        isOpenAdvert : 0,
        isOpenPho : 0,
      }
    },
    methods : {
      //保存图片
      saveImg(){
//     comLink.weiStoreImg = this.backimg.replace(/^.*,/, '');
       comLink.weiStoreImg = this.backimg;

        this.uploadConfirmAxios();
      },
      //添加图片
      changeFile(e) {
        let fileData = e.target.files[0];
        let vm = this;
        CanvasResize.ImgResize.default.canvasResize(fileData, {
          crop: true,
          quality: 1,
          rotate: 0,
          callback(baseStr) {
            //baseStr就是截图后的数据
//          vm.backimg = baseStr;
            new AlloyCrop({
              image_src: baseStr,
              width: 750,
              height: 325,
              ok_text: "确定",
              cancel_text: "取消",
              ok: function (base64) {
                vm.userPicture = base64;
                vm.backimg =base64
                let base64Arr = base64.split(',');
                base64 = base64Arr[1];
                e.target.parentNode.reset();
              },
              cancel: function () {
                e.target.parentNode.reset();
              }
            });
          }
        })
      },

      //确认上传，请求接口
      uploadConfirmAxios(baseStr) {
        var vm = this;
          $.ajax({
            url:comLink.yxtHost + '/store/saveStore',
            data:{
              backgroundFile : comLink.weiStoreImg,
              // 'isRecommend' : 1,//1:是 0:否 不填则查询所有
              // introduce : vm.introduce,
              // isOpenAdvert : vm.isOpenAdvert,
              // isOpenPho : vm.isOpenPho,
              // name : vm.name,
              storeId : sessionStorage.weiStoreId,
              openid:sessionStorage.openid,
            },
            dataType:'json',
            type:'post',
            success:function (data) {
              console.log("返回值商品列表333：",data);
              /*if(data.code == 1){
                vm.proDetailData = data.data;
                for(var i = 0,l = vm.proDetailData.length;i < l;i ++){
                  vm.proDetailData[i].logo = comLink.yxtImgHost + vm.proDetailData[i].logo
                }
                console.log(vm.proDetailData,'vm.proDetailData')
              }*/
              if(data.code == 1){
                Toast({
                  //mintui提示效果
                  message: data.msg,
                  duration: 2000
                });
                vm.$router.push({
                  path : '/mine/myWeStoreRouter',
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
    },
    mounted(){
      // this.saveImg();
      this.$nextTick(() => {
        //初始判断ios版本
        //解决ios9的bug，label无法聚焦的bug
        // 只有是ios9才添加,否则部分安卓会无法聚焦
        let str = navigator.userAgent.toLowerCase();
        let ver = str.match(/OS 9/i) ? str.match(/OS 9/i) : [];
        if (ver.length > 0) {
          let elm = this.$el.querySelector('.file-label');
          elm.setAttribute('style', 'pointer-events:none;');
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss";
  .file-input {
    /*background-color: #307ff5;*/
    color: white;
    width: 8rem;
    height: 2.9rem;
  }
  .change-img-content{
    width: 100%;
    height: p(825);
    padding: p(30) p(20) p(0) p(20);

    .change-img-main{
      background: white;
      width: 100%;
      height: 100%;
      border-radius: p(10);
      .title{
        height: p(70);
        line-height: p(70);
        border-bottom: p(1) solid #999999;
      }
      .choose-file{
        /*width: p(80);*/
        height: p(70);
        margin-top: p(20);

        .choosed{
          display: inline-block;
          width: p(200);
          height: 100%;
          line-height: p(70);
          text-align: center;
          background: $bgBlue;
          border-radius: p(10);
          color: white;
        }
        .noChoose{
          color: #999;
        }
        .unload-img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0);
          opacity: 0;
        }
      }
      .imgBox{
        width: p(750);
        height: p(325);
        border-radius: p(10);
        box-shadow:0 0 10px #e0e0e0 inset;
        margin: p(30) auto;
        text-align: center;
        padding: p(10) 0;
        width: 100%;

        .img-pic{
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
      .submit-btn{
        width: 100%;
        height: p(90);
        margin-top: p(100);

        .btn-inner{
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: p(90);
          background: $bgBlue;
          border-radius: p(10);
          text-align: center;
          color: white;
        }
      }
    }
  }

</style>
