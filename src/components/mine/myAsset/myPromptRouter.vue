<template>
  <div class="prompt-content" v-title data-title="我的推广">
    <div class="prompt-head p-lef-rig24">
      <img class="head-img m-top10 f-fl" :src=userWx.headLogo alt="">
      <div class="f-fl name-infos m-top10 m-left10 w-color">
        <p class="fontSize-18 m-top5">{{user.name}}</p>
        <span class="fontSize-13 dis-inblo m-top10">No.{{user.id}}</span>
      </div>
      <div class="vip-logo f-fr">
        <img class="head-img f-fl" :src=userWx.qrCode alt="">
      </div>
    </div>

    <div class="vip-details p-lef-rig24 m-top15">
      <div class="required-detail">
        <div class="title fontSize-15 p-lef-rig30">
          <span>会员资料</span>
        </div>
        <div class="warn-word fontSize-12">
          <span>以下信息将作为发奖凭证，已绑定数据不能修改</span>
        </div>
        <div class="input-area">
          <ul class="input-area-main p-lef-rig20">
            <li class="input-area-row f-oh">
              <span class="name u-red-star fontSize-14 f-fl">姓名</span>
              <input class="inp f-fl" type="text" placeholder="姓名" v-model="user.name" readonly>
            </li>
            <li class="input-area-row f-oh">
              <span class="name u-red-star fontSize-14 f-fl">手机号码</span>
              <input class="inp f-fl" type="text" placeholder="手机号码" v-model="user.phone" readonly>
            </li>
          </ul>
        </div>
      </div>
      <div class="more-detail m-top10">
        <ul class="input-area-main" >
          <li class="input-area-row f-oh">
            <span class="name fontSize-14 f-fl">微信名称</span>
            <input class="inp f-fl" type="text" placeholder="微信名称" v-model="userWx.nickName" readonly>
          </li>
          <li class="input-area-row f-oh">
            <span class="name fontSize-14 f-fl">生日</span>
            <input class="inp f-fl" type="text" placeholder="生日" v-model="userWx.birthday" readonly>
          </li>
          <li class="input-area-row f-oh">
            <span class="name fontSize-14 f-fl">性别</span>
            <el-select v-model="user.sex" placeholder="请选择" style="width: 77%;" onClick="$('input').blur()">
              <el-option
                v-for="item in sexList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                onClick="$('input').blur()"
                 >
              </el-option>
            </el-select>
            <!--<input class="inp f-fl" type="text" placeholder="性别">-->
          </li>
          <li class="input-area-row f-oh">
            <span class="name fontSize-14 f-fl">地址</span>
            <input class="inp f-fl" type="text" placeholder="地址" v-model="userWx.address" style="background-color: white;border: 1px solid #dcdfe6;height: 95%">
          </li>
          <li class="input-area-row remark">
            <span class="name fontSize-14 f-fl">备注</span>
            <!--<input class="inp f-fl" type="text" placeholder="备注">-->
            <textarea class="inp f-fl" name="" cols="30" rows="10" v-model="user.remark" style="resize: none"></textarea>
          </li>
        </ul>
      </div>
    </div>
    <div class="save-btn p-lef-rig24">
      <span class="btn-inner fontSize-18" @click="save">保存</span>
    </div>
  </div>
</template>
<script>
	import axios from 'axios'
	import '../../../common/jq.min';
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import $ from "jquery"; //导入jquery

  export default {
    data (){
      return{
        user : {},
        userWx : {},
        headProfile : '@/../static/image/mine/touxiang.png',
        sexList : [
          {
            value : 1,
            label : '男',
          },
          {
            value : 2 ,
            label : '女',
          },
          {
            value : 0,
            label :'保密',
          },
        ]
      }
    },
    methods: {
      save() {
        var vm = this;
        $.post(comLink.yxtHost + '/user/saveMyPrompt', {
          'openid' : sessionStorage.openid,
          'remark' : vm.user.remark,
          'address' : vm.userWx.address,
          'sex' : vm.user.sex,
        }, function(resp) {
          Toast({
            message: resp.msg,
            duration: 2000
          });
          if (resp.code == 1) {
            //跳转个人中心
            vm.$router.push({
              path : '/mine'
            })
          }
        });
      },
      //获取个人信息
      getManInfos(){
        var _vm = this;
        $.ajax({
          url: comLink.yxtHost + '/user/getInformation',
          data: {
            'openid': sessionStorage.openid,
          },
          dataType: 'json',
          type: 'post',
          success: function (data) {
            if (data.code == 1) {
              _vm.user = data.data.user;
              _vm.user.phone = _vm.user.phone.substr(0,3) + "****" + _vm.user.phone.substr(-4);
              console.log(_vm.user,'123')
              _vm.userWx = data.data.userWx;
              console.log( _vm.user);
              console.log( _vm.userWx);
            } else {
              sessionStorage.clear();
              Toast({
                message: data.msg,
                duration: 2000
              });
            }
          },
        })
      }
    },
    mounted(){
    	 $(window).scrollTop('0');
    	 this.getManInfos();
    }
  }
</script>
<style type="text/css">
	.el-select{

	}
	.more-detail .el-input{
		font-size: 1.8rem;
	}
	.more-detail .el-input__inner{
	-webkit-appearance: none;
    background-color: #eee;
    background-image: none;
    border-radius: 0.6rem;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 4.4rem;
    line-height: 4.7rem;
    outline: 0;
    padding: 0 1rem;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    background-color: white;
	}
	.more-detail .el-select .el-input.is-focus .el-input__inner {
	    border: 1px solid #dcdfe6;
	}
	.more-detail .el-select .el-input__inner:focus {
	    border: 1px solid #dcdfe6;
	}
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
.prompt-content{
  width: 100%;
  .prompt-head{
    width: 100%;
    height: p(140);
    background: $bgBlue;

    .head-img{
      display: inline-block;
      width: p(100);
      height: p(100);
      border-radius: p(10);
    }
    .name-infos{
      display: inline-block;
    }
    .vip-logo{
      display: inline-block;
      width: p(100);
      height: p(100);
      /*border:p(1) solid #ccc;*/
      margin-top: p(20);
    }
  }
  .vip-details{
    width: 100%;

    .required-detail{
      width: 100%;
      height: p(380);
      border-radius: p(20);
      background: white;
      overflow: hidden;

      .title{
        width: 100%;
        height: p(70);
        line-height: p(70);
        background: #666666;
        color: white;
      }
      .warn-word{
        width: 100%;
        height: p(45);
        line-height: p(45);
        text-align: left;
        background: #ffc2bf;
        color: #fb7665;
        margin-top: p(10);
        text-indent: 1rem;
      }
      .input-area{
        width: 100%;

        .input-area-main{
          width: 100%;

          .input-area-row{
            width: 100%;
            height: p(70);
            margin-top: p(30);
            .name{
              display: inline-block;
              width: 22%;
              height: 100%;
              line-height: p(70);
            }
            .inp{
              display: inline-block;
              width: 77%;
              border-radius: p(10);
              background: #eee;
              height: 100%;
            }
            input{
            	font-size: 1.75rem;
            	text-indent: 1rem;
            }
          }
        }
      }
    }
    .more-detail{
      width: 100%;
      height: p(640);
      background: white;
      border-radius: p(20);
      margin-top: p(30);
      .input-area-main{
        width: 100%;
        padding: p(30) p(20) 0 p(20);

        .input-area-row{
          width: 100%;
          height: p(70);
          margin-bottom: p(30);
          .name{
            display: inline-block;
            width: 22%;
            height: 100%;
            line-height: p(70);
          }
          .inp{
            display: inline-block;
            width: 77%;
            border-radius: p(10);
            background: #eee;
            height: 100%;
          }
          input{
            	font-size: 1.75rem;
            	text-indent: 1rem;
            }
        }
        .remark{
          display: inline-block;
          width: 100%;
          height: p(160);
          .inp{
            height: 100%;
            color: #333;
            box-sizing: border-box;
            border: 1px solid #dcdfe6;
            background-color: #fff;
            /*font-size: p(28);*/
           	padding: 0.5rem 0 0 1rem;
          }
        }
      }
    }
  }
  .save-btn{
    width: 100%;
    height: p(90);
    color: white;
    text-align: center;
    margin: p(100) 0 p(30) 0;

    .btn-inner{
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: p(90);
      background-color: $bgBlue;
      color: white;
      text-align: center;
      border-radius: p(10);
    }
  }
}
</style>
