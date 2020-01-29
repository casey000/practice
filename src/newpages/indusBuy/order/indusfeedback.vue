<template>
  <div class="tuikuan-content" v-title data-title="申请售后">
    <div class="tuikuan-title">
      <span class="fl">售后类型:</span>
      <el-select v-model="tkvalue" placeholder="请选择" v-if="flag" onClick="$('input').blur()">
      </el-select>

      <el-select v-model="tkvalue" @change="changeClass(tkvalue)" placeholder="请选择" v-else onClick="$('input').blur()"  >
        <el-option
          v-for="item in tksort"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          onClick="$('input').blur()">
        </el-option>
      </el-select>

    </div>
    <div class="tuikuan-reason clearfix">
      <span class="fl">售后原因:</span>
      <el-select v-model="value"  placeholder="请选择" @change="getValue(value)" v-if="!flag" onClick="$('input').blur()">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label" onClick="$('input').blur()">
        </el-option>
      </el-select>
      <el-select v-model="value"  placeholder="请选择" v-else onClick="$('input').blur()">
      </el-select>
    </div>
    <div class="tuikuan-reason clearfix">
      <div class="refuse-reason fontSize-14 p-left15 m-top10 p-bottom10" v-if="refuseReason != ''">
        <p class="p-left20" style="padding-left: 0;color: red"> 拒绝退款理由：{{refuseReason}}</p>
      </div>
    </div>
    <div class="tuikuan-text">
      <p>售后原因描述:</p>
      <el-input
        :readonly="flag"
        type="textarea"
        :autosize="{ minRows:5, maxRows: 8}"
        placeholder="请填写您的问题 最多125字"
        v-model="textarea3">
      </el-input>
      <div class="viewPhoto"id="portrait">
        <img :src="logo" alt="" v-if="refundVoucher" v-for="logo in refundVoucher"/>
      </div>
    </div>

    <form class="formList">
      <div class="tuikuan-img">
        <div :class="{add_img : !flag }">
          <span v-if="!flag">+</span>
          <a href="">
            <input id="saveImage" v-if="!flag" name="imgFile"  type="file" accept="image/*"/>
            <input id="saveImage" v-else name="imgFile"  type="hidden" accept="image/*"/>
          </a>

        </div>
        <p>最多可上传3张图片</p>
      </div>
    </form>

    <div class="content" v-if="!flag">
      <p class="fontSize-14 m-bottom20 p-left10">要售后的商品:</p>

      <ul class="goodsSonList">
        <li v-for="(proItem,j) in productList" :key="j">
          <div class="imgBox" @click="toProDetail(proItem)">
            <img :src=proItem.logo alt="">
          </div>
          <div class="content clearfix">
            <div class="f-fl" style="width: 70%;">
              <div class="ellipsis fontSize-14  name" style="width: 100%;">{{proItem.name}}</div>
              <div class="ellipsis-rows fontSize-14 m-top15 class" style="line-height: 2rem">{{proItem.skuName}}</div>
            </div>
            <div class="f-fl" style="width: 30%;">
              <div class="ellipsis fontSize-14  price" style="text-align: right;"> ￥ {{skuprice}}</div>
              <div class="m-top10" style="text-align: right;">
                <span class="minBtn" @click="minBtn(proItem)">-</span>
                <span class="fontSize-14" >{{proItem.number}}</span>
                <span class="addBtn" @click="addBtn(proItem)">+</span>
              </div>
            </div>

          </div>
        </li>
      </ul>
    </div>
    <div class="content" v-else>
      <p class="fontSize-14 m-bottom20 p-left10">您选择的售后商品:</p>
      <ul class="goodsSonList">
        <li v-for="(proItem,j) in productList2" :key="j" style="padding: 0 1rem">
          <div class="imgBox" @click="toProDetail(proItem)">
            <img :src=proItem.logo alt="">
          </div>
          <div class="content clearfix">
            <div class="f-fl" style="width: 70%;">
              <div class="ellipsis fontSize-14  name"  style="width: 100%;">{{proItem.name}}</div>
              <div class="ellipsis-rows  fontSize-14 m-top15 class" style="line-height: 2rem">{{proItem.skuName}}</div>
            </div>
            <div class="f-fl" style="width: 30%;">
              <div class="ellipsis fontSize-14  price" style="text-align: right;"> ￥{{skuprice}}</div>
              <div class="m-top10" style="text-align: right;">
                <span class="fontSize-14" >X{{proItem.number}}</span>
              </div>
            </div>

          </div>
        </li>
      </ul>
    </div>
    <div  class="bottom-button">
      <span  class="login-word" v-if="!flag && !notHuanhuo" @click="imageSubmit2()">提交</span>   <!--换货申请提交-->
      <span  class="login-word" v-if="!flag && notHuanhuo" @click="imageSubmit()">提交</span>     <!--退款退货退款申请提交-->
      <span  class="login-word" v-if="flag" @click="returnPage()">关闭</span>
    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  import "@/common/jq.min"; //导入总线

  import comLink from "@/common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  export default{
    inject: ['reload'],
    data(){
      return{
        refuseReason: '',
        number : 1,
        skuId : '',
        maxNum : 1,
        isDaifahuo:'',//是否是从待发货页面来的
        refundVoucher : [],
        imgStr : '',//图片base64路径
        price : 0,
        price2:0,
        orderId : '',
        tkvalue: '',
        goodsIcon:'@/../static/img/home/brand_store/pro_detail.png',
        nowIndex:0,
        show:false,
        textarea3:'',
        tksort:[
          {
            value: '0',
            label: '退款'
          },
          {
            value: '1',
            label: '退货退款'
          },
          {
            value: '2',
            label: '换货'
          },
        ],
        options: [
          {
            value: '0',
            label: '质量原因'
          },
          {
            value: '1',
            label: '商品信息描述不好'
          },
          {
            value: '2',
            label: '功能/效果不好'
          },
          {
            value: '3',
            label: '少件/漏件'
          },
          {
            value: '4',
            label: '包装商品破损'
          },
          {
            value: '5',
            label: '发票问题'
          },
          {
            value: '6',
            label: '其他'
          }
        ],
        value: '',//退款原因
        afterSaleApply : {},
        flag : false,
        productList:[],
        productList2:[],
        limitNum:'',
        refundNum:1,
        payPrice:0,//订单实际支付价格
        notHuanhuo:true,
        skuprice:'',
      }
    },
    methods:{
    	changeClass(value){
    		console.log(value)
    		if(value==2){
    			this.notHuanhuo=false;
    		}else{
    			this.notHuanhuo=true;

    		}
    	},

      //点击商品 跳转详情页
      toProDetail(proItem){
        this.$router.push({
          path : '/home/proDetailRouter',
          query : { id : proItem.id}
        })
      },
      returnPage() {
        this.$router.go(-1);
      },
      compress(path, obj) {
        var vm = this;

		    var img = new Image();
		    img.src = path;
		   	img.onload = function(){
				   var that = this;
				   // 默认按比例压缩
				   var w = that.width,
				   h = that.height,
				   scale = w / h;
				   w = obj.width * 2|| w * 2;
				   h = obj.height* 2 || (w / scale)* 2;
				   var quality = 0.6; // 默认图片质量为0.7
				   //生成canvas
				   var canvas = document.createElement('canvas');
				   var ctx = canvas.getContext('2d');
				   // 创建属性节点
				   var anw = document.createAttribute("width");
				   anw.nodeValue = w;
				   var anh = document.createAttribute("height");
				   anh.nodeValue = h;
				   canvas.setAttributeNode(anw);
				   canvas.setAttributeNode(anh);
				   ctx.drawImage(that, 0, 0, w, h);
				   // 图像质量
				   if(obj.quality && obj.quality <= 1 && obj.quality > 0){
				   quality = obj.quality;
				   }
				   // quality值越小，所绘制出的图像越模糊
				   var base64 = canvas.toDataURL('image/jpeg', quality );
					 vm.uploadImg(base64.split(',')[1])
		    }

    	},
      great(){
        var vm = this;
        document.getElementById('saveImage').onchange = function (e) {
          var imgFile = this.files[0];

          var fr = new FileReader();
          fr.readAsDataURL(imgFile);
          var num=$('#portrait img').length;
          var imgSize = imgFile.size;
          if(imgSize>4*1024*1024){
		        Toast({
	              message: "上传的图片大于4M,请重新选择",
	              duration: 3000
	            });
		        return false;
		    	}
          console.log(num)
          if(num > 2){
            Toast({
              message: "不能超过三张",
              duration: 2000
            });
            return false;
          }
          fr.onload = function () {
            var bigImg = document.createElement("img");     //创建一个img元素
            bigImg.src=fr.result;   //给img元素的src属性赋值

            bigImg.style.width="12rem";
            bigImg.style.height="12rem";
            bigImg.style.margin="0 0.3rem 0 2rem";
            var data=vm.compress(fr.result,bigImg)
//						console.log(data)
            document.getElementById('portrait').append(bigImg);

            if(num == 2) {
              // vm.flag = true;
              $('.add_img').remove();
            }
//          vm.uploadImg(fr.result.split(',')[1]);
//    			var trdata=data.split(',')[1]
//    			if(trdata){
//          	document.getElementById('portrait').append(bigImg);
//    			}
//          vm.uploadImg(trdata);
          };

        }
      },
      uploadImg(fileStr) {
        var vm = this;
        $.post(comLink.yxtHost +'/order/uploadImg', {
          'base64File' : fileStr
        }, function(resp) {
          if(resp.code == 1) {
            vm.imgStr += ',' + resp.data;
            /*Toast({
              message: resp.msg,
              duration: 2000
            });*/
            console.log(vm.imgStr);
          } else {
            Toast({
              message: resp.msg,
              duration: 2000
            });
          }
        });
      },
      getValue(value) {
        this.value = value;
      },
      //提交申请
      imageSubmit(){
      	if($('#payprice').val() >this.payPrice){
      		Toast({
            message: '退款金额不能超出订单总价'+this.payPrice+'元',
            duration: 2000
          });
    			return ;
    		}
      	if(this.price =="" || this.price==0){
    			Toast({
            message: '请输入有效退款金额数',
            duration: 2000
          });
          return
    		}
      	if(this.price > this.skuprice){
      		Toast({
            message: '退款金额不能超出该商品价格',
            duration: 2000
          });
          return
      	}
        var vm=this;
//      this.searchMon(vm.skuId, vm.number);

//      let sum = 0;
//      for(var i=0; i<vm.productList.length; i++) {
//        sum += vm.productList[i].number * vm.productList[i].mallPrice;
//      }
//      if(vm.price > sum) {
//        Toast({
//          message: '退款金额不能超出商品金额',
//          duration: 2000
//        });
//        return;
//      }

        $.post(comLink.yxtHost + "/order/afterSaleApply", {
          'numbers':vm.number,
          'skuIds':vm.skuId,
          'afterSalesType' : vm.tkvalue,
          'orderId' : vm.orderId,
          'refundCause' : vm.value,
          'refundDescription' : vm.textarea3,
          'refundMoney' : vm.price,
          'refundVoucher' : vm.imgStr.substr(1),
          'openid' : sessionStorage.openid,
        }, function(res) {
          if(res.code == 1) {
            vm.flag = true;
            Toast({
              message: res.msg,
              duration: 2000
            });
            vm.$router.push({
              path: '/mine/myAsset/orderRouter?index=5',
            });
          } else {
            vm.flag = false;
            Toast({
              message: res.msg,
              duration: 2000
            });
          }
        });
      },
      //换货申请
      imageSubmit2(){
        var vm=this;


        $.post(comLink.yxtHost + "/order/afterSaleApply", {
          'numbers':vm.number,
          'skuIds':vm.skuId,
          'afterSalesType' : vm.tkvalue,
          'orderId' : vm.orderId,
          'tradeCause' : vm.value,
          'tradeDescription' : vm.textarea3,
          'tradeVoucher' : vm.imgStr.substr(1),
          'openid' : sessionStorage.openid,
        }, function(res) {
          if(res.code == 1) {
            vm.flag = true;
            Toast({
              message: res.msg,
              duration: 2000
            });
            vm.$router.push({
              path: '/mine/myAsset/orderRouter?index=5',
            });
          } else {
            vm.flag = false;
            Toast({
              message: res.msg,
              duration: 2000
            });
          }
        });
      },
      afterSaleApplyDetail(afterOrderId) {
        var vm = this;
        $.post(comLink.yxtHost + "/order/afterSaleDetail", {
          'orderId' : vm.orderId,
          'openid': sessionStorage.openid,
          'afterOrderId' : afterOrderId
        }, function(res) {
          if(res.code == 1) {
            //回显数据

            vm.afterSaleApply = res.data;
            console.log(vm.afterSaleApply);
            if(vm.afterSaleApply.afterSalerOrder.refundCause == null) {
              vm.value = vm.afterSaleApply.afterSalerOrder.tradeCause;
            } else {
              vm.value = vm.afterSaleApply.afterSalerOrder.refundCause;
            }
            vm.price2 = vm.afterSaleApply.afterSalerOrder.refundMoney;
            if(vm.afterSaleApply.afterSalerOrder.refundDescription == null) {
              vm.textarea3 = vm.afterSaleApply.afterSalerOrder.tradeDescription;
            } else {
              vm.textarea3 = vm.afterSaleApply.afterSalerOrder.refundDescription;
            }
            // vm.tkvalue = res.data.refundStatus;
            if(vm.afterSaleApply.afterSalerOrder.afterSalesType == 0) {
              vm.tkvalue = '退款';
            }
            if(vm.afterSaleApply.afterSalerOrder.afterSalesType  == 1) {
              vm.tkvalue = '退货退款';
            }
            if(vm.afterSaleApply.afterSalerOrder.afterSalesType == 2) {
              vm.tkvalue = '换货';
            }
            if(vm.afterSaleApply.afterSalerOrder.refundVoucher){
            	 vm.imgStr =vm.afterSaleApply.afterSalerOrder.refundVoucher;
	            if(vm.imgStr != undefined && vm.imgStr != null && vm.imgStr != 'undefined' && vm.imgStr != 'null' && vm.imgStr != '') {
	              vm.refundVoucher = vm.imgStr.split(',');
	              for(var i=0; i<vm.refundVoucher.length; i++) {
	                vm.refundVoucher[i] = comLink.yxtHost + vm.refundVoucher[i];
	              }
	            } else {
	              vm.imgStr =vm.afterSaleApply.afterSalerOrder.tradeVoucher;
	              vm.refundVoucher = vm.imgStr.split(',');
	              for(var i=0; i<vm.refundVoucher.length; i++) {
	                vm.refundVoucher[i] = comLink.yxtHost + vm.refundVoucher[i];
	              }
	            }
            }
            vm.flag = true;
            vm.productList2=vm.afterSaleApply.skuList
            for(var i=0;i<vm.productList2.length;i++){
              vm.productList2[i].logo=comLink.yxtImgHost+vm.productList2[i].logo
            }
            vm.getRefundStatus(afterOrderId);
          } else {
            vm.flag = false;
            /*Toast({
              message: res.msg,
              duration: 2000
            });*/
          }
        });
      },
      //查询售后状态
      getRefundStatus(afterOrderId) {
        var vm = this;
        $.post(comLink.yxtHost + '/order/getRefundStatus',  {
          'orderId' : vm.orderId,
          'afterOrderId' : afterOrderId,
//        'openid' : sessionStorage.openid,
        }, function (resp) {
          if(resp.code == 1) {
            vm.afterSaleOrder = resp.data;
            console.log(vm.afterSaleOrder,'1234')
            if(vm.afterSaleOrder.refundStatus == -1) {//拒绝退款
              vm.refuseReason=vm.afterSaleOrder.refusedCause;
            }
          }
        },'json');
      },
      refunds(){

      },
      getPrice(skuId, number){
        var vm=this;
        $.ajax({
          type:"post",
          url:comLink.yxtHost+"/order/getMaxRefundMoney",
          data:{
            numbers:number,
            orderId:vm.orderId,
            skuIds:skuId,
            openid : sessionStorage.openid,
          },
          success:function(data){
            if(data.code==1){
              console.log(data)
              vm.skuprice=data.data
            }else{
              Toast({
                message: data.msg,
                duration: 2000
              });
              vm.reload();
            }
          }
        });
      },
      searchMon(skuId, number){
        var vm=this;
        $.ajax({
          type:"post",
          url:comLink.yxtHost+"/order/getMaxRefundMoney",
          data:{
            numbers:number,
            orderId:vm.orderId,
            skuIds:skuId,
            openid : sessionStorage.openid,
            flag : 1
          },
          success:function(data){
            if(data.code==1){
              console.log(data)
//            vm.price=data.data
            }else{
              Toast({
                message: data.msg,
                duration: 2000
              });
              vm.reload();
            }
          }
        });
      },
      //点击增加按钮
      addBtn(proItem){
        if(proItem.number < this.maxNum) {
          proItem.number+=1;
        }
        this.getPrice(this.skuId, proItem.number);
      },
      minBtn(proItem){
        if(proItem.number==1){
          proItem.number=1;
        }else{
          proItem.number-=1;
        }
        this.getPrice(this.skuId, proItem.number);
      },
    },
    created(){

    },
    mounted(){
      this.great();
      var vm=this;
      let hash = window.location.hash;//?orderId=748&price=2715.03
      hash = hash.split('?');
      console.log(hash[1],'2222');
      let orderId = hash[1].split('&')[0].split('=')[1];//传递过来的id
      let afterOrderId = hash[1].split('&')[1].split('=')[1];//传递过来的id
      let skuId = hash[1].split('&')[2].split('=')[1];
      let status = hash[1].split('&')[3].split('=')[1];
      if(status==2){
      	this.tksort=[
          {
            value: '0',
            label: '退款'
          }
        ]
      }
      // let type = hash[1].split('&')[3].split('=')[1];
      this.orderId = orderId;

      //查询退款详情
      if(afterOrderId != undefined && afterOrderId != null && afterOrderId != 'undefined' && afterOrderId != 'null' && afterOrderId != '') {
        this.afterSaleApplyDetail(afterOrderId, skuId);
      }

      //查询退款商品
      $.ajax({
        type:"post",
        url:comLink.yxtHost + "/order/getSkuByOrderId",
        data:{
          'openid' : sessionStorage.openid,
          'orderId' : vm.orderId,
          'skuId' : skuId
        },
        success:function(data){
          vm.productList=data.data
          for(var i=0;i<vm.productList.length;i++){
            vm.productList[i].logo=comLink.yxtImgHost+vm.productList[i].logo;
            vm.maxNum = vm.productList[i].number;
            vm.number = vm.maxNum;
            vm.skuId = skuId;

            //默认查询全部
            vm.getPrice(skuId, vm.number);
          }
        },
      });
      //查询订单支付价格
      $.ajax({
      	type:"post",
      	url:comLink.yxtHost +"/order/detail",
      	data:{
      		'openid' : sessionStorage.openid,
            'orderId' : vm.orderId,
      	},
      	success:function(data){
      		if(data.code==1){
      			vm.payPrice=data.data.order.realAmount;

      		}
      	}
      });
    }
  }
</script>
<style>
  .tuikuan-content .el-input {
    width: 20rem;
    font-size: 1.8rem;

  }
  .tuikuan-content .el-input__inner{
    border: 0;
    padding-left: 1rem;
  }
  .tuikuan-content .el-input--suffix {
    /*padding-right: 2rem;*/
  }
  .tuikuan-content .el-input--suffix .el-input__inner {
    /*padding-right: 3rem;*/
    text-align: right;
  }

  .tuikuan-content .el-select {
    float: right;
  }

  .tuikuan-content .el-popper .popper__arrow{
    display: none;
  }
  .tuikuan-content .el-select-dropdown__item {
    font-size: 1.8rem;
    padding: 0 2.2rem;
    text-align: center;
    color: #606266;
    height:4.6rem;
    line-height: 4.6rem;

  }
  .tuikuan-content .el-textarea__inner{
    border: none;
  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .minBtn,.addBtn{
    background: white;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    display: inline-block;
    margin-top: p(10);
  }
  .tuikuan-content .icon-chenggong {
    color: #538be8 !important;
  }
  .content{
  	width: 100%;
  	overflow: hidden;
    padding-top: 1.25rem;
    >ul{
      padding-bottom: 0.01rem;
      >li{
        background: #e7f5ff;
        height: 11.25rem;
        padding: 0rem 1.5625rem;
        padding-top: 1.3rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        margin-bottom: 1.5rem;
        .quanquan{
          width: 8%;
          padding-right: 2%;
          position: relative;
          i{
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            top: 43%;
          }
        }
        .imgBox{
          width: 9rem;
          height: 9rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .content{
          width: 75%;
          position: relative;
          .price{
            color: red;
          }
        }
      }
    }
  }
  .bottom-button {
    width: 100%;
    height: 5.625rem;
    text-align: center;
    margin: 5rem 0;

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
  .tuikuan-content{
    width: 100%;
    height: auto;
    .tuikuan-title{
      padding-left:p(40);
      font-size:p(30);
      height:p(70);
      line-height:p(70);
      width:100%;
      background:#fff;
    }
    .tuikuan-reason{
      width:100%;
      background:#fff;

      height: auto;
      line-height: p(60);
      >span{
        font-size:p(30);
        margin-left: p(40);
        padding-top: p(13);
        margin-right: p(100);
      }
      .selection-component{

        .selection-show{
          span{
            font-size: p(25);
            color: #666;
          }
        }
      }

    }
    .tuikuan-text{
      background:#fff;
      margin-top: p(30);
      p{
        font-size: p(35);
        padding-top: p(30);
        margin-bottom: p(30);
        padding-left: p(20);
      }
      .viewPhoto {
        img {
          width: 10rem;
          height: 10rem;
          margin: 0 2.5rem;
        }
      }
    }
    .tuikuan-img{
      background-color: #fff;
      width: 100%;
      padding: p(20);
      .add_img{
        width: p(130);
        height: p(130);
        border:p(2) solid #999;
        display:table;
        margin-bottom:1rem;
        span{
          /*width: 100%;
                    height: 100%;*/
          display:table-cell;
          vertical-align:middle;
          width: 100%;
          text-align: center;
          font-size: p(100);
          color: #ccc;
        }
        a{
          opacity: 0;


          input{
            position: absolute;
            left: p(20);
            width: p(130);
            height: p(130);
            display: inline-block;

          }
        }
      }
      >p{
        font-size: p(28);
        color: #999;
        margin-top: p(10);
      }
    }
    .tuikuan-money{
      background: #fff;
      margin-top: p(20);
      p{
        height: p(70);
        padding: p(20) p(30);
        font-size: p(30);
        margin-bottom: p(10);
        span{
          padding-top: p(5);
        }
        .num-money{
          padding: p(5) p(35);
          border: p(2) solid #999;
        }
      }
      p:nth-child(1){
        padding-bottom: p(60);
        border-bottom: p(5) solid #eee;
      }
    }
    .sub-btn{
      margin-top: p(80);
      width: 100%;
      text-align: center;
      span{
        border-radius: p(10);
        border: p(2) solid #999;
        font-size: p(35);
        display: inline-block;
        background-color: #409EFF;
        color: white;
        text-align: center;
        width: p(350);
        padding: p(10) p(20);
      }
    }
  }
</style>
