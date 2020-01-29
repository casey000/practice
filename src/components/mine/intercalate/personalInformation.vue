<template>
  <div class="personalInformation" v-title data-title="个人信息">
      <div class="commonList clearfix headImg">
          <div class="left fl">
              <span>头像</span>
          </div>
          <div class="right fr clearfix">
              <i class="iconfont fr icon-more"></i>
              <div class="imgBox fr">
                <img :src=userWx.headLogo alt="">
              </div>
              <input class="touxiangupload" type="file" @change="onFileChange" ref="inputUpload">
          </div>
      </div>
      <div class="commonList clearfix ewm">
          <div class="left fl">
              <span>微信二维码</span>
          </div>
          <div class="right fr">
              <input class="touxiangupload" type="file"  @change="onFileChange2" ref="inputUpload2">
              <i class="iconfont icon-more fr"></i>
              <span v-if="userWx.qrCode==''">上传</span>
              <div v-else  class="imgBox fr">
                <img :src=userWx.qrCode alt="">
              </div>
          </div>
      </div>
      <div class="commonList clearfix">
          <div class="left fl">
              <span>我的ID</span>
          </div>
          <div class="right fr">
              <span>{{user.id}}</span>
              <i class="iconfont"></i>
          </div>
      </div>
      <div class="commonList clearfix">
          <div class="left fl">
              <span>昵称</span>
          </div>
          <div class="right fr">
              <span>{{user.name}}</span>
              <i class="iconfont"></i>
          </div>
          </div>
      <div class="commonList clearfix" @click="toChangeWeChatName()">
          <div class="left fl">
              <span>微信</span>
          </div>
          <div class="right fr">
              <span>{{userWx.nickName}}</span>
              <i class="iconfont icon-more"></i>
          </div>
      </div>
      <div class="commonList clearfix" @click="toChangeQQnum()">
          <div class="left fl">
              <span>QQ</span>
          </div>
          <div class="right fr">
              <span>{{userWx.qq}}</span>
              <i class="iconfont icon-more"></i>
          </div>
      </div>
      <div class="jianxi" style="height:1.3125rem;"></div>
      <div class="commonList clearfix" @click="changNameLink()">
          <div class="left fl">
              <span>真实姓名</span>
          </div>
          <div class="right fr">
              <span>{{userWx.realityName}}</span>
              <i class="iconfont icon-more"></i>
          </div>
      </div>
      <div class="commonList clearfix">
          <div class="left fl">
              <span>性别</span>
          </div>
          <div class="right fr">
              <span>{{user.sexuality}}</span>
              <i class="iconfont"></i>
          </div>
      </div>
      <div class="commonList clearfix">
          <div class="left fl">
              <span>生日</span>
          </div>
          <div class="right fr" @click="shengri">
              <span>{{userWx.birthday}}</span>
              <i class="iconfont icon-more"></i>
          </div>
      </div>
      <div class="commonList clearfix" @click="toChangeJob()">
          <div class="left fl">
              <span>职业</span>
          </div>
          <div class="right fr">
              <span>{{userWx.profession}}</span>
              <i class="iconfont icon-more"></i>
          </div>
      </div>
      <!-- 时间选择器 -->
        <mt-datetime-picker
            ref="picker"
            type="date"
            @confirm="xuanzhongriqi"
            :startDate="birthdayData.startData"
            :endDate="birthdayData.endDate"
            v-model="birthdayData.pickerValue">
        </mt-datetime-picker>

    <form id="formList" method="post" action="https://yxtccb.com/user/updateHeadLogo" target="hidden_frame" enctype="multipart/form-data">
      <input id="uploader" type="file" name="imgFile" v-on:change="aaa($event)">
      <input id="uploader" type="file" name="imgFile2" v-on:change="aaa2($event)">
      <input type="text" name="openid" :value=openid>
      <input type="text" name="id" :value=userId>
      <iframe name='hidden_frame' id="hidden_frame" style='display:none'></iframe>
    </form>
    <form id="formQR" method="post" action="https://yxtccb.com/user/updateQrCode" target="hidden_frame" enctype="multipart/form-data">
      <input id="uploader2" type="file" name="imgFile" v-on:change="qrSubmit($event)">
      <input type="text" name="openid" :value=openid>
      <input type="text" name="id" :value=userId>
      <iframe name='hidden_frame' id="hidden_frame" style='display:none'></iframe>
    </form>
    <div class="bottom-button" @click="submit()">
      <span class="login-word" @click="quitCenter()">返回个人中心</span>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker, MessageBox } from "mint-ui";
  import $ from "jquery"; //导入jquery
  // import md5 from './../../../common/MD5.js'
export default {
  inject: ['reload'],
  data() {
    return {
        userPicture: "@/../static/image/mine/touxiang.png",//。、 、
        ewmPicture: "",//头像
        birthdayData:{//生日数据
            startData: new Date("1917-01-01"),
            endDate: new Date(),
            pickerValue: new Date(),
        },
      user : {},
      userWx : {},
      userId : null,
      openid : null,
    };
  },
  mounted (){
    this.mansInfsoAxios();
      this.test ()
    this.getId ()
    },
  methods: {
    quitCenter() {
      this.$router.push({
        path : '/mine',
      })
    },
    //选中生日日期 点击确定按钮 执行方法
    // handleConfirm(){
    //   this.saveBirthdayAxios();
    //   console.log(this.birthdayData.pickerValue)
    // },
    //修改用户生日
    // saveBirthdayAxios:function(){
    //
    // },
    getId (){
      // this.userId = sessionStorage.userId;
      this.openid = sessionStorage.openid;
      var vm = this;
      $.post(comLink.yxtHost + '/user/getInformation', {
        'openid' : sessionStorage.openid
      }, function(resp) {
        if(resp.code == 1) {
          vm.userId = resp.data.user.id;
        }
      });
    },
    //测试md5加密
    test (){
      var h = md5("aa");
      console.log('md5',h)
    },
    //填写微信
    toChangeWeChatName(){
      this.$router.push({
        path : '/mine/perInfor/weChatNum'
      })
    },
    //编辑QQ号码
    toChangeQQnum(){
      this.$router.push({
        path : '/mine/perInfor/QQNum'
      })
    },
    //编辑个人信息
    toChangeJob(){
      this.$router.push({
        path : '/mine/perInfor/setJob'
      })
    },
    //获取个人信息 接口
    mansInfsoAxios:function(){
      var vm = this;
      let hash = window.location.hash;
      console.log('hash',hash);
      hash = hash.split('=');
      let userId = hash[1];
      // var params = new URLSearchParams();
      // params.append('id',proId);
      $.ajax({
        url:comLink.yxtHost + '/user/getInformation',
        data:{
          // 'userId' : userId,
          'openid':sessionStorage.openid,
        },
        dataType:'json',
        type:'post',
        success:function (data) {
          if(data.code == 1){
            console.log(data);
            vm.user = data.data.user;
            if(vm.user.sex === 1){
              vm.user.sexuality = '男'
            }else if(vm.user.sex === 2){
              vm.user.sexuality = '女'
            }else {
              vm.user.sexuality = '未知'
            }
            vm.userWx = data.data.userWx;
          } else {
            sessionStorage.clear();
          }
        },
        error:function (data) {

        }
      })
    },
    aaa:function(e){
      if($('#uploader').val() != ''){
        var vm = this;
        $('#formList').submit();//你问下上传图片，后端可以接收到数据吗？报500 看不到  你问  看下能不能收到嗯 你传一下 我跟他说
        console.log(e.target.files)
        var reader = new FileReader();
        reader.onload = function(evt) {
          console.log(2,evt.target.result)//展示图片,你用变量接住，直接显示就可以了   可以是吧？等下 我试试
          vm.userWx.headLogo = evt.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
      //下面这个方法是用来上传图片的
      // var formData = new FormData($("#formList")[0]);
      // $.ajax({
      //   // url: 'http://192.168.1.167/user/updateUser' ,  //测试用的地址
      //   url: comLink.yxtHost +'/user/updateHeadLogo' ,  /*这是处理文件上传的servlet*/
      //   type: 'POST',
      //   data: formData,//////
      //   cache: false,
      //   processData: false,
      //   success: function (returndata) {
      //
      //   },
      //   error: function (returndata) {
      //     alert(returndata);
      //   }
      // });
    },

    qrSubmit:function(e){
    	if($('#uploader2').val() != ''){
        var vm = this;
        $('#formQR').submit();
        console.log(e.target.files)
        var reader = new FileReader();
        reader.onload = function(evt) {
          console.log(2,evt.target.result)
          vm.userWx.qrCode = evt.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        vm.ewmPicture =  e.srcElement.result;
      }
    },
    onFileChange: function(e) {
      var files = this.$refs.inputUpload.files;
      var img = this.$refs.touxiangImg;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      var that = this;
      reader.onload = function(e) {
        var mb = e.total / 1024 / 1024;
        if (mb >= 3) {
          alert("文件大小大于3M");
          return;
        } else {

        }
      };
    },
    onFileChange2: function(e) {
      var files = this.$refs.inputUpload2.files;
      console.log('files',files123)
      var img = this.$refs.touxiangImg;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      var that = this;
      reader.onload = function(e) {
        var mb = e.total / 1024 / 1024;
        if (mb >= 3) {
          alert("文件大小大于3M");
          return;
        } else {
            // that.ewmPicture =  e.srcElement.result;//这句只做测试用
        }
      };
    },
    //修改姓名
    changNameLink(){
        this.$router.push({
            path:"/mine/changeName"
        })
    },
    // 修改生日
    shengri: function() {
      this.$refs.picker.open();
    },
    xuanzhongriqi: function(data) {
      var d = new Date(data); //格式化中国标准时间
      var youWant = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      var vm = this;
      console.log(youWant);
      $.ajax({
        url:comLink.yxtHost + '/user/updateUser',
        data:{
          'birthday' : youWant,
          'openid':sessionStorage.openid,
        },
        dataType:'json',
        type:'post',
        success:function (data) {
          console.log(data)
          if(data.code == 1){
            vm.reload();
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
  components: {},
};
</script>
<style lang="scss" scoped>
@import "@/../src/sass/public.scss";
.bottom-button {
  width: 100%;
  height: 5.625rem;
  text-align: center;
	margin-top:5rem;
  .login-word {
    display: inline-block;
    width: 80%;
    height: 100%;
    background: #307ff5;
    text-align: center;
    line-height: 5.625rem;
    font-size: 1.875rem;
    color: white;
    border-radius: 0.625rem;
  }
}
#formList{
  position: absolute;
  top: 0;
  right: 0;
  height: p(130);
  width: 100%;
  opacity: 0;
  #uploader{
    width: 100%;
    height: 100%;
  }
}
#formQR{
  position: absolute;
  top: 7rem;
  right: 0;
  height: p(130);
  width: 100%;
  opacity: 0;
  #uploader2{
    width: 100%;
    height: 100%;
  }
}
.personalInformation {
  .commonList {
    width: 100%;
    background: white;
    height: 6rem;
    line-height: 6rem;
    font-size: 1.6875rem;
    padding: 0 1.875rem;
    box-sizing: border-box;
    border-bottom: 1px solid $borderColor;
    .left {
      color: #000;
      position: relative;
      height: 100%;
      box-sizing: border-box;
      font-weight: 500;
      img {
        position: absolute;
        width: 2.25rem;
        height: 2.25rem;
        left: 0rem;
        top: 2rem;
      }
    }
    .right {
      box-sizing: border-box;
      height: 100%;
      color: #989898;
      i {
        display: inline-block;
        min-width: 2rem;
      }
    }
  }
  .headImg {
    height: 8.5rem;
    line-height: 8.5rem;
    .right {
        position: relative;
      .imgBox {
        margin-top: 1.875rem;
        width: 5.25rem;
        height: 5.25rem;
        border-radius: 50%;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .touxiangupload{
          position: absolute;
          background: rgba(0,0,0,0);
          opacity: 0;
          height: 100%;
          right: 0;
          top: 0;
      }
    }
  }
  .ewm{
      .right {
        position: relative;
      .imgBox {
        margin-top: 0.5rem;
        width: 4.8rem;
        height: 4.8rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .touxiangupload{
          position: absolute;
          background: rgba(0,0,0,0);
          opacity: 0;
          height: 100%;
          right: 0;
          top: 0;
      }
    }
  }
}
</style>


