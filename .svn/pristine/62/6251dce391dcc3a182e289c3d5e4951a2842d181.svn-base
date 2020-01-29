<template>
  <div  class="edit-address-content fontSize-14" v-title data-title="编辑地址">
    <div class="address-main">
      <ul class="edit-main">
        <li class="edit-row p-lef-rig24 f-oh">
          <span class="left-title f-fl">收件人：</span>
          <input class="right-inpt f-fl" type="text" v-model="saveData.name" placeholder="姓名">
        </li>
        <li class="edit-row p-lef-rig24 f-oh">
          <span class="left-title f-fl">联系方式：</span>
          <input class="right-inpt f-fl" v-model="saveData.phone" type="number" placeholder="联系方式" maxlength="12">
        </li>
        <li class="edit-row p-lef-rig24 f-oh">
          <span class="left-title f-fl" @click="exportData">选择地区： </span>
          <x-address class="f-fl address-detail"
                     title="" v-model="addressValue"
                     raw-value :list="addressData"
                     value-text-align="left">
          </x-address>
        </li>
        <li class="detail-address p-lef-rig24 f-oh">
          <span class="left-title f-fl">详细地址： </span>
          <textarea class="textarea" v-model="saveData.address" placeholder="请填写详细信息"></textarea>
          <!--<x-textarea class="text-area ellipsis-rows" title="" placeholder="请填写详细信息"
                      v-model="saveData.address"
                      :show-counter="false" :rows="2">
          </x-textarea>-->
          <!--<p class="add-detai f-fl">宝安区渔业旧村福广大厦201（人不在可寄存附近菜鸟网点）</p>-->
        </li>
        <!--<li class="edit-row p-lef-rig24 f-oh">
          <span class="left-title f-fl">邮政编码： </span>
          <input class="right-inpt f-fl" v-model="code" type="text" placeholder="邮政编码">
        </li>-->
      </ul>
      <div class="set-moren-address f-oh fontSize-11 p-lef-rig24"   style="width: 100%;">
      	<div class="f-fl" @click="chooseAdd">
      		<i class="choosed-icon " :class="{ 'choosed' : saveData.isDefault}"></i>
        	<span class="word m-left5">设为默认地址</span>
      	</div>
        <div class="f-fr" @click="deleteAdd">
          <i class="icon iconfont icon-delete f-fl fontSize-14"></i>
        	<span class="word m-left5">删除地址</span>
      	</div>

      </div>
    </div>
    <div class="p-lef-rig24 submit-btn" @click="saveAddress()">
      <i class="submit-main fontSize-18">保存</i>
    </div>
  </div>
</template>
<script>
  import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch } from 'vux'
  const phoneReg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
  const codeReg = /^[0-9]\d{5}$/;
  import axios from 'axios'
  import comLink from "@/common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker, MessageBox} from "mint-ui";
  export default{
    data () {
      return {
        addressValue: ['北京市', '北京市', '朝阳区'],
        addressData: ChinaAddressData,
        phoneReg:phoneReg,
        codeReg : codeReg,
        // phoneNum : '',
        code : '',
        isEnterInput : true,
        isChoosed : false,
        morendizhi : [],
        saveData : {
          isDefault:false
        },
      }
    },
    methods : {
    	deleteAdd(){
        MessageBox.confirm('确定删除地址吗？').then(action => {
          var vm = this;
          $.ajax({
            url:comLink.yxtHost + '/address/del',
            data: {
              'openid': sessionStorage.openid,
              'id': vm.saveData.id
            },
            dataType:'json',
            type:'post',
            success:function (resp) {
              if(resp.code == 1){
                vm.$router.push({
                  path: '/indus/induspayAddress'
                })
              }else{
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            }
          });
        });
    	},
    	//加密操作
    	Encrypt(word){
            var strInfo = "0102030405060708";
            var key = CryptoJS.enc.Utf8.parse(strInfo);
            var iv  = CryptoJS.enc.Utf8.parse(strInfo);
            var srcs = CryptoJS.enc.Utf8.parse(word);
            var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
            return encrypted.toString();
     },
      //编辑地址
      editAxios: function(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('?');
        let str = hash[1];//传递过来的id
        let id = '';
        // let param = '';
        if(str.indexOf('&') > -1) {
          id = str.split('&')[0].split('=')[1];
          // param = str.split('&')[1].split('=')[1];
        } else {
          hash = window.location.hash.split('=');
          id = hash[1];//传递过来的id
        }

//      console.log(id);
        axios.get(comLink.yxtHost + '/address/toEdit', {
          params:{
            id : id
          }
        }).then(function(response) {
          if (response.data.code == 1) {
            vm.saveData = response.data.data;//收货地址首页数据
            vm.addressValue[0] = vm.saveData.province;
            vm.addressValue[1] = vm.saveData.city;
            vm.addressValue[2] = vm.saveData.area;
            vm.addressValue.splice(1000,1)
          }
        })
          .catch(function(res) {

          });
      },
      //保存地址
      saveAxios: function(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let id = hash[1];//传递过来的id

        if(id != undefined && id.indexOf('&') > -1) {
          id = id.split('&')[0];
        }

        if(vm.saveData.name == undefined) {
          Toast({
            message: '请添加姓名',
            duration: 2000
          });
          return;
        }
        if(vm.saveData.name.length < 2) {
          Toast({
            message: '姓名至少包含2个字符',
            duration: 2000
          });
          return;
        }
        if(vm.saveData.phone == undefined) {
          Toast({
            message: '请添加手机号',
            duration: 2000
          });
          return;
        }
        if(vm.saveData.phone.length != 11) {
          Toast({
            message: '电话号码为11位数字',
            duration: 2000
          });
          return;
        }
        if(vm.saveData.address == undefined || vm.saveData.address == null || vm.saveData.address == '') {
          Toast({
            message: '请添加详细地址',
            duration: 2000
          });
          return;
        }

//      console.log(vm.saveData);
//        url:"http://47.106.134.150:8080/yxt-home/"+ '/user/phoneLogin',
        axios.get(comLink.yxtHost + '/address/save', {
          params:{
            address : vm.saveData.address,
            area : vm.saveData.area,
            city : vm.saveData.city,
            isDefault : vm.saveData.isDefault ? 1 : 0,
            name : vm.saveData.name,
            phone : vm.Encrypt(vm.saveData.phone),
//          phone : vm.saveData.phone,
            province : vm.saveData.province,
            id : id,
            openid:sessionStorage.openid,
          }
        }).then(function(response) {
          if (response.data.code = "200") {
            // this.$router.push({
            //   path : '/home/payAddressRouter',
            //   query : {
            //     param : param
            //   }//地址id
            // })
            vm.$router.back(-1)
          }
        })
          .catch(function(res) {

          });
      },
      //获取需要传的值
      saveAddress(){
        let addressAll = $('.address-detail').text();
        addressAll = addressAll.split(' ');
        this.saveData.area = addressAll[6];
        this.saveData.city = addressAll[5];
        this.saveData.province = addressAll[4];
        this.saveAxios();
      },
      // judgePhoneNum : function(){
      //   if( this.phoneNum === ''){
      //     alert('手机号码不能为空')
      //   }
      //   else if(!phoneReg.test(this.phoneNum)){
      //     alert('手机号码输入格式不正确')
      //   }
      //   else if(this.code === ''){
      //     alert('邮编不能为空')
      //   }else if(!codeReg.test(this.code)){
      //     alert("邮编格式不正确")
      //   }
      //   console.log("验证成功了")
      // },
      exportData : function(){
//      console.log(this.addressValue)
      },
      chooseAdd : function(){
//      console.log(111)
        this.saveData.isDefault = !this.saveData.isDefault
//      console.log(this.saveData.isDefault)
      },
    },
    mounted(){
      let hash = window.location.hash;
      hash = hash.split('=')
      if(!hash[1]){

      }else{
          this.editAxios();
      }

    },
    created(){

    },
    components : {
      Group,
      GroupTitle,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
      XNumber,
      XTextarea,
      XSwitch
    }
  }
</script>
<style>
  /*<!--清楚城市插件上边框-->*/
  .edit-row .vux-cell-box:not(:first-child):before{
    border-top: 1px solid transparent;
  }
  .edit-row .weui-cell:before,.weui-cell.vux-x-textarea{
    border-top: 1px solid transparent;
  }
  .edit-row .weui-cell{
    padding: 0;
  }
  .edit-row .vux-x-textarea{
    padding: 0;
  }

</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .textarea {
    padding: p(20) 1rem 1rem 0;
    border: 0.1rem solid #ccc;
    width: 70%;
    max-width: 80%;
    height: 8rem;
    border: 0;
    resize: none;
  }
  .edit-address-content{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $fontWhite;
    .address-main{

      .edit-main{

        .edit-row{
          border-bottom: p(1) solid $bdColorEee;
          line-height: p(80);
          height: p(80);

          .left-title{
            display: inline-block;
            width: 24%;
          }
          .right-inpt{
            display: inline-block;
            width: 76%;
            height: 100%;
            border-bottom: p(1) solid $bdColorEee;
          }
          .address-detail{
            display: inline-block;
            width: 76%;
            height: 100%;
            line-height: p(80);
          }
        }
        .detail-address{
          min-height: p(80);
          border-bottom: p(1) solid $bdColorEee;

          .add-detai{
            display: inline-block;
            width: 76%;
            text-align: left;
            line-height: p(48);
            margin-top : p(10);
          }
          .left-title{
            display: inline-block;
            width: 24%;
            height: 100%;
            line-height: p(48);
            margin: p(10) 0;
          }
          .text-area{
            line-height: p(48);
            margin: p(10) 0;
            padding-left: 0;
          }
        }
      }
    }
    .set-moren-address{
      float: right;
      line-height: p(62);

      .choosed-icon{
        display: inline-block;
        width: p(22);
        height: p(22);
        border-radius: 50%;
        box-sizing: border-box;
        border: p(1) solid #666;
        margin-top: p(20);
      }
      .word{
        color: #808080;
      }
      .choosed{
        background: $bgBlue;
      }
    }
    .submit-btn{
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: p(90);

      .submit-main{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: $bgBlue;
        border-radius: p(10);
        line-height: p(90);
        text-align: center;
        color: white;
      }
    }
  }
</style>
