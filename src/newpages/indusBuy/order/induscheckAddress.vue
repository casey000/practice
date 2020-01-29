<template>
	<div class="indus-checkad f-oh">
		<!--<div class="shouhuo-address f-fl f-oh">
	      <i class="icon-address f-fl"></i>
	      <span class="f-fl">[收货地址]{{exp.order.address}}</span>
	    </div>-->
	    <div class="address">
        <p>[联系人]：{{exp.order.linkName}} - {{exp.order.linkPhone}}</p>
	    	<p>[收货地址]：{{exp.order.address}}</p>
	    	<p>[快递单号]：{{exp.expName}}（{{exp.expNo}}）</p>
	    </div>
    <span v-if="exp.list">
      <flow orientation ="vertical" style="min-height: 50rem; background-color: #fff; float: left;">
        <template v-for="(i, index) in steps" >
           <flow-state :state="index + 1"   :title="i.title" :is-done="i.isDone"></flow-state>
           <flow-line  :is-done="i.lineDone" :tip="i.tip ? i.tip : null" tip-direction = "right"></flow-line>
        </template>
      </flow>
    </span>
    <span v-else>
      暂无物流数据
    </span>
	</div>
</template>
<script>
	import { Flow, FlowState, FlowLine } from 'vux'
  import comLink from "@/common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
	export default{
		data(){
			return{
				steps: [],
        exp: {}, // 物流对象
			}
		},
    mounted() {
      var orderId = this.$route.query.orderId;
      this.getExp(orderId);
    },
    methods: {
		  //查询订单物流
      getExp(orderId) {
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/inside/order/exp',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId,
            'orderId': orderId,
            'type': 1
          },
          dataType: 'json',
          type: 'post',
          success: function (resp) {
            if (resp.code == 1) {
              vm.exp = resp.data;
              var expList = resp.data.list;
              vm.doExpData(expList);
            } else {
               Toast({
                 message: resp.msg,
                 duration: 2000
               });
            }
          }
        })
      },
      //处理快递数据
      doExpData(expList) {
        var vm = this;
        vm.steps = [];
        var obj = {};
        obj.title = '已付款';
        obj.isDone = true;
        obj.lineDone = true;
        vm.steps.push(obj);
        obj = {};
        obj.title = '待接单';
        obj.isDone = true;
        obj.lineDone = true;
        obj.tip = '快件正在等待揽收';
        vm.steps.push(obj);
        for(var i = 0; i < expList.length; i++) {
          obj = {};
          obj.title = expList[i].acceptTime;
          obj.isDone = true;
          obj.lineDone = true;
          obj.tip = expList[i].acceptStation;
          vm.steps.push(obj);
        }
//      obj = {};
//      obj.title = '已签收';
//      obj.isDone = false;
//      obj.lineDone = false;
//      vm.steps.push(obj);
      },
    },
		components: {
	    Flow,
	    FlowState,
	    FlowLine
	  }


	}
</script>
<style>

.indus-checkad .weui-wepay-flow, .weui-wepay-flow-auto {
    padding: 2rem!important;
	}
.indus-checkad .weui-wepay-flow__line_ing .weui-wepay-flow__info-right {
    background-color: #fff;
    color: #666;
	}
.indus-checkad .weui-wepay-flow__title-right{
	font-size: 1.8rem!important;
	color: #307ff5!important;
}
.indus-checkad .weui-wepay-flow__info-right {
	display: block!important;
    background-color: #fff!important;
    color: #666!important;
    white-space:  normal!important;
    width: 41rem;
	font-size: 1.5rem!important;

}
.weui-wepay-flow_vertical .weui-wepay-flow__line {
    height: 5rem!important;
    vertical-align: top;
    width: 3px;
}
.indus-checkad .weui-wepay-flow__bd{
	min-height: 50rem;
}
.indus-checkad .weui-wepay-flow__info-right:after {
	border-color:transparent!important;
}
.indus-checkad .weui-wepay-flow__li_done .weui-wepay-flow__state{
  background-color: #307ff5!important;
}
.indus-checkad .weui-wepay-flow__process {
    background-color: #307ff5!important;
}
</style>
<style lang="scss" scoped="scoped">
  @import "@/../src/sass/public.scss"; //导入scss初始文件
	.indus-checkad{
		width:100%;
		height: auto;
		padding:0 p(30);
		background-color: #fff;
		.address{
			padding:p(20);
			p{
				font-size: p(26);
				line-height: p(40);
				color: #999;
			}
		}
		.news-list{
			width:100%;
			li{
				.time{
					width: p(200);
					height: p(40);
					background-color: #dcdcdc;
					border-radius: p(6);
					font-size: p(24);
					color: #fff;
					line-height: p(40);
					margin: p(20) auto;
					text-align: center;
				}
				.detail{
					border-radius:p(6);
					background-color: #FFF;
					height:p(310);
					.mes{
						border-bottom: 1px dashed #eee;
						.img{
							width: p(150);
							height: p(256);
							img{
								width: p(100);
								display: inline-block;
								margin: p(35) p(26);
								height: p(100);
							}
						}
						.text{
							width: p(540);
							height: p(256);
							.name{
								font-size: p(30);
								color: #333333;
								margin:p(45) 0 p(21) 0 ;
							}
							.des{
								font-size: p(28);
								line-height: p(40);
								color: #666;
								overflow : hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}
							.number{
								font-size: p(26);
								color: #333;
								margin-top: p(24);
								span{
									color: #999999;
								}
							}
						}
					}
					.search{
						font-size: p(25);
						color: #333;
						padding:0 p(10) 0 p(24);
						line-height: p(52);
					}

				}
			}
		}
	}
</style>
