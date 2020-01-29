<template>
	<div class="indus-orderPay">
		<div class="order-info">
				<p class="num"><span class="tit">订单号:</span><span class="ellipsis">{{orderNo}}</span></p>
				<p class="price"><span class="tit">商品金额:</span><span>¥{{money}}</span></p>
		</div>
		<div class="pay-way m-top20">
			<p class="p-left20 fontSize-16 title">支付方式</p>
			<p class="row p-left20 p-right20">
				<img src="../../../../static/img/indus/wechat.png" class="wx">
				<span class="p-left20">微信支付</span>
				<!--<img src="../../../../static/img/indus/wxz.png" class="chosen f-fr" v-if = "tabindex == 2" @click="tabindex=2">-->
				<img src="../../../../static/img/indus/yxz.png" class="chosen f-fr">
			</p>
		</div>
		<div class="btn">
			<span class="f-fl" @click="goBack">返回</span>
			<span class="f-fl" @click="goPay">立即支付</span>
		</div>
    	<div v-if="isJudge" class="blackCoverShow"></div>
		<div class="flow-show" v-if = "isJudge">
			<p class="title fontSize-16">请确认微信支付是否已完成</p>
			<p class="success fontSize-14" @click="queryOrder">已完成支付</p>
			<p class="failed fontSize-14" @click="goPay">支付遇到问题,重新支付</p>
		</div>
	</div>
</template>

<script>
  import comLink from "@/common/common_link"; //导入总线
  import { Toast, MessageBox } from "mint-ui";
	import $ from "jquery"; //导入jquery
	export default{
  	inject: ['reload'],
		data(){
			return{
				isJudge:false,		//判断微信支付是否完成 true时弹窗显示
				tabindex: 2,
        orderNo: '',
        money: '0',
        orderId: '',
        json: {},  //统一下单返回数据
			}
		},
    mounted() {
  	  this.orderNo = this.$route.query.orderNo;
  	  this.money = this.$route.query.money;
    },
		methods:{
      goBack() {
        this.$router.go(-1);
      },
      //支付，统一下单
      goPay() {
        var vm = this;
        if (typeof WeixinJSBridge == "undefined"){
          //h5支付
          $.ajax({
            url: comLink.yxtHost + '/inside/order/unifiedH5Order',
            data: {
              'openid': sessionStorage.openid,
              'insideId': sessionStorage.insideId,
              'orderNo': vm.orderNo
            },
            dataType: 'json',
            type: 'post',
            success: function (resp) {
              if (resp.code == 1) {
                vm.isJudge = true;
                window.location.href = resp.data;
              } else {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            }
          })
        } else {
          $.ajax({
            url: comLink.yxtHost + '/inside/order/unifiedOrder',
            data: {
              'openid': sessionStorage.openid,
              'insideId': sessionStorage.insideId,
              'orderNo': vm.orderNo
            },
            dataType: 'json',
            type: 'post',
            success: function (resp) {
              if (resp.code == 1) {
                vm.json = resp.data;
                vm.orderId = vm.json.orderId;
                //发起微信支付
                vm.pay();
              } else {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            }
          })
        }
      },
      /**
       * @method 支付费用方法
       * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
       */
      onBridgeReady(){
        var vm = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
          "appId": vm.json.appId,     //公众号名称，由商户传入
          "timeStamp": vm.json.timeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr": vm.json.nonceStr, //随机串
          "package": vm.json.prepayId,
          "signType": vm.json.signType,         //微信签名方式：
          "paySign": vm.json.paySign //微信签名
        },
        function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            //查询是否真的支付成功
            vm.queryOrder();
          } else {
            vm.$router.push({
              path: '/indusorder/orderDetail',
              query: {
                'orderId': vm.orderId
              }
            });
          }
        });
      },
      //支付
      pay() {
        var vm = this;
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(), false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady());
            document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady());
          }
        }else{
          vm.onBridgeReady();
        }
      },
      //查询订单
      queryOrder() {
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/inside/order/orderquery',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId,
            'orderNo': vm.orderNo
          },
          dataType: 'json',
          type: 'post',
          success: function (resp) {
            if (resp.code == 1) {
              vm.$router.push({
                path: '/indusorder/orderDetail',
                query: {
                  'orderId': vm.orderId
                }
              });
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      }
		},
		components: {
	    //注册子组件
	  },
	}

</script>

<style lang="scss" scoped="scoped">
  @import "@/../src/sass/public.scss"; //导入scss初始文件
   .blackCoverShow{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: black;
    opacity: 0.4;
  }
	.indus-orderPay{
		width:100%;;
		.flow-show{
			position: absolute;
			background: #fefefe;
			width: p(600);
			height: p(320);
			 top: 50%;
		    left: 50%;
		    transform: translate(-50%,-50%);
			z-index: 2;
			border-radius: p(10);
			overflow:hidden;
			p{
				text-align: center;

			}
			.success{
				color: #FF0000;
				border-bottom: 0.5px solid #ddd;
				height: p(90);
				line-height: p(90);
			}
			.failed{
				color: #999;
				height: p(90);
				line-height: p(90);
			}
			.title{
				height: p(140);
				line-height: p(140);
				border-bottom: 0.5px solid #ddd;
			}
		}
		.btn{
			position:fixed;
			bottom:0;
			width:100%;;
			height:p(98);
			span{
				display: inline-block;
				width: 50%;
				box-sizing: border-box;
				line-height: p(98);
				text-align: center;
				font-size: p(36);
			}
			span:first-child{
				color: #999;
				background-color: #dddddd;
			}
			span:last-child{
				color: #fff;
				background-color: #ff2727;
			}
		}
		.pay-way{
			width:100%;;
			min-height:p(170);
			background-color: #fff;
			.title{
				line-height: p(80);
				height: p(80);
				border-bottom: 1px solid #ddd;
			}
			.row{
				line-height: p(89);
				height: p(89);
				img.wx{
					display: inline-block;
					margin-top: p(15);
					width: p(60);
					height: p(60);
				}
				img.chosen{
					display: inline-block;
					margin-top: p(25);
					width: p(30);
					height: p(30);
				}
				span{
					font-size: p(28);
					display: inline-block;
					vertical-align: 25%;
					color: #333333;
				}
			}
		}
		.order-info{
			width:100%;
			height:p(142);
			background-color: #fff;
			padding:p(24);
			p{
				font-size: p(28);
				color: #999;
				height:p(50);
				line-height:p(50);
				.tit{
					display:inline-block;
					min-width:p(162);

				}
			}
			.num{
				span:last-child{
					color:#333;
					font-weight:500;
				}
			}
			.price{
				span:last-child{
					color: #ff2727;
					font-weight:500;
				}
			}
		}

	}
</style>
