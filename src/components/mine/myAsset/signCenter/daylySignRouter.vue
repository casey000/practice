<template>
  <div class="dayly-sign-content" v-title data-title="每日签到">
    <div class="inner-content">
      <div class="head">
        <span class=" f-tac f-db">{{dataObj.count}}</span>
        <p class="f-tac m-top20 f-db fontSize-14">---已连续签到---</p>
      </div>
      <div class="nav-content">
        <ul>
          <li>
            <p>总积分</p>
            <span>{{dataObj.totalIntegral}}</span>
          </li>
          <li>
            <p>剩余积分</p>
            <span>{{dataObj.residualIntegral}}</span>
          </li>
          <li>
            <p>签到积分</p>
            <span>{{dataObj.signIntegral}}</span>
          </li>
          <li>
            <p>消费积分</p>
            <span>{{dataObj.consumeIntegral}}</span>
          </li>
        </ul>
      </div>
      <div class="earn-score-btn fontSize-15">
        <span @click="getSignScore()">{{dianjiqiandao}}</span>
      </div>
      <div class="score-details">
        <div class="check-detail f-pr b-white fontSize-15 p-lef-rig24">
          <span>查看每月签到及积分详情</span>
          <div class="block f-fr fontSize-12">
            <!--<span class="demonstration">月</span>-->
            <el-date-picker
              style="{ width: inputWidth }"
              v-model="dataVal"
              type="month"
              @change="huidiaoQiandao"
              placeholder="选择日期"
              onClick="$('input').blur()">
            </el-date-picker>
          </div>
          <!--<i class="icon iconfont icon-moreunfold" v-model="dataVal"></i>-->
        </div>
        <div class="score-item fontSize-15">
          <ul class="detail-nav">
            <li class="detail-nav-row">日期</li>
            <li class="detail-nav-row">签到情况</li>
            <li class="detail-nav-row">积分</li>
          </ul>
          <ul class="details-lists b-white f-oh fontSize-14">
            <li class="details-row f-fl" v-for="(item,i) in qiandaoLists" :key="i">
              <span>{{item.signTime}} {{item.day}}</span>
              <span style="color: #307FF5;">{{item.sign}}</span>
              <span>+{{item.value}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="total f-oh fontSize-18 p-lef-rig24 b-white">
      <span class="f-fr">合计：+{{total}}</span>
    </div>
  </div>
</template>
<script>
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  export default {
    inject: ['reload'],
    data () {
      return {
      	boolen:false,
        dataVal: '',
        dataStr : '',
        qiandaoLists : [],
        dataObj : {},
        dianjiqiandao : '',
        total : 0,
        signList : {}
      }
    },
    mounted(){

      this.qiandaoDetailAxios();
    },
    methods : {
      //选中日期再次调用签到接口
      huidiaoQiandao(){
        var d = this.dataVal; //格式化中国标准时间
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        this.dataStr = year +'-'+ (month<10?'0'+month:month);
        this.total=0;
        console.log(this.dataStr)
        this.qiandaoDetailAxios();
      },
      //点击签到
      dianjiQiandaoAxios: function () {
        var _vm = this;
        this.$axios({
          method: 'post',
          url: comLink.yxtHost + '/sign/getIntegral',
          params : {
            openid:sessionStorage.openid,
          }
        }).then((res) => {
          if (res.data.code == 0) {
            Toast({
              //mintui提示效果
              message: res.data.msg,
              duration: 2000,
            });
          } else {
            Toast({
              //mintui提示效果
              message: res.data.msg,
              duration: 2000,
            });
            _vm.reload();
          }
        });
      },
      //签到详细数据
      qiandaoDetailAxios: function () {
        var _vm = this;
        this.$axios({
          method: 'post',
          url: comLink.yxtHost + '/sign/signPage',
          params : {
            openid:sessionStorage.openid,
            dateStr : _vm.dataStr,
          }
        }).then((res) => {
          console.log('签到中心详细数据',res);
          if (res.data.code == 1) {
            this.signList = res.data.data.list;
            for(var i = 0,l = this.signList.length;i < l;i++){
              this.total +=this.signList[i].value;
            }
            _vm.dataObj = res.data.data;
            if(!_vm.dataObj.count){
              _vm.dataObj.count = 0
            }
            if( _vm.dataObj.status === 1){
            //    已完成签到
              _vm.dianjiqiandao = '已完成签到'
            }else{
              _vm.dianjiqiandao = '点击这里签到赚积分'
            }
            let lists = res.data.data.list;
            _vm.qiandaoLists = lists.reverse();
          }
        });
      },
      getSignScore(){
      //  点击这里获取签到积分 按钮
        this.dianjiQiandaoAxios();//点击签到
        console.log('点击 获取签到积分按钮')
      }
    }
  }
</script>
<style>
  .check-detail .block .el-input--suffix input{
    background: transparent;
    border: none;
    color: #307FF5;
    /*height: 13px;*/
    padding-left: 30px;
    padding-right: 0;
    /*width: 10rem;*/
  }
  /*设置input里placeholder颜色*/
  .check-detail .block .el-input--suffix input::-webkit-input-placeholder{
    color:#307FF5;
  }
  .check-detail .block .el-input--suffix input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #307FF5;
  }
  .check-detail .block .el-input--suffix input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#307FF5;
  }
  .check-detail .block .el-input--suffix input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:#307FF5;
  }
  .check-detail .block .el-input--suffix .el-input__icon{
    line-height: 10px;
    /*height: 13px;*/
    color: white;
  }
  .check-detail .block .el-input--suffix{
    width: 12.5rem;
  }
  .check-detail .block .el-date-editor .el-input__suffix{
    color: white;
  }
  .check-detail .block .el-date-editor .el-input__suffix{
    color: white;
  }
  .dayly-sign-content .el-icon-date:before {
    content: "\E608";
    color: red;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件

  .el-input__icon {
    color: red;
  }
  .inner-content{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    bottom: p(90);
    overflow-y: auto;
  }
  .total{
    width:100%;
    height: p(90);
    line-height: p(90);
    position: absolute;
    bottom: 0;
  }
  .dayly-sign-content{

    .head{
      width: 100%;
      height: p(360);
      background: $bgBlue;
      color: white;
      padding-top: p(90);
      span{
        font-size: p(85);
      }
    }
    .nav-content{
      width: 100%;
      >ul{
        display: flex;
        justify-content: space-evenly;
        height: p(125);
        background: white;

        >li{
          width: 25%;
          box-sizing: border-box;
          border-right: p(1) solid #efefef;
          text-align: center;
          height: p(105);
          margin-top: p(10);

          >p{
            font-size: p(23);
            line-height: p(43);
            margin-top: p(10);
            color: #989898;
          }
          >span{
            font-size: p(25);
            line-height: p(45);
          }
        }
        >li:nth-child(4){
          border: none;
        }
      }
    }
    .earn-score-btn{
      width: 100%;
      text-align: center;
      margin: p(30) 0;
      >span{
        display: inline-block;
        width: p(500);
        height: p(70);
        line-height: p(70);
        text-align: center;
        background: #ff675f;
        border-radius: p(50);
        color: white;
      }
    }
    .score-details{
      width: 100%;
      .check-detail{
        width: 100%;
        height: p(70);
        line-height: p(70);
        .icon-moreunfold{
          font-size: p(36);
          position: absolute;
          right: p(24);
          top: p(7);
          color: $bgBlue;
        }
      }
      .score-item{
        width: 100%;
        line-height: p(65);
        .detail-nav{
          height:p(65);
          color: #6e6e6e;
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          .detail-nav-row{
            width: 33.3333%;
            text-align: center;
          }
        }
        .details-lists{
          width: 100%;
          background: white;
          color: #9b9b9b;
          .details-row{
            width: 100%;
            height: p(65);
            display: flex;
            justify-content: space-evenly;
            border-bottom: p(1) solid #eee;
            >span{
              display: inline-block;
              width: 33.33%;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
