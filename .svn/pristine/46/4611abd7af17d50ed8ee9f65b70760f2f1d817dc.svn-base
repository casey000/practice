<template>
	<div class="indus-mycoupon">
		<div class="coupon-flex">
			<ul>
				<li :class="{active : tabindex == 1}" @click="chgStatus(1)">未使用</li>
				<li :class="{active : tabindex == 2}" @click="chgStatus(2)">已使用</li>
				<li :class="{active : tabindex == 3}" @click="chgStatus(3)">已过期</li>
			</ul>
		</div>
		<div class="coupon-detail">
	      <ul class="coupon-main">
	        <li class="coupon-row m-top10 f-oh f-pr" v-for="data in couponUsetList" v-if="data.useStatus == 0">
	          <div class="left-main f-fl w-color dis-inblo">
	            <p class="money">￥<span style="font-size: 4.625rem;">{{data.reduceMoney}}</span></p>
	            <p class="fontSize-12" style="color: #fff; padding-left: 2rem; font-weight: 500; text-align: center;">{{data.couponName}}</p>
	          </div>
	          <div class="right-main f-fl dis-inblo">
	            <p class="limit fontSize-12">
                {{data.remark}}
	            </p>
	            <p class="time fontSize-11 m-top15">有效期截止：{{data.endTime}}</p>
	          </div>
	        </li>
	        <!--class = uesd  即为灰色背景-->
	        <li class="coupon-row m-top10 f-oh f-pr used" v-for="data in couponUsetList" v-if="data.useStatus == 1">
	          <div class="left-main f-fl w-color dis-inblo">
	            <p class="money">￥<span style="font-size: 4.625rem;">{{data.reduceMoney}}</span></p>
	            <p class="fontSize-12" style="color: #fff; padding-left: 2rem; font-weight: 500; text-align: center;">{{data.couponName}}</p>
	          </div>
	          <div class="right-main f-fl dis-inblo">
	            <p class="limit fontSize-12">
                {{data.remark}}
	            	<!--全场通用-->
	            </p>
	            <p class="time fontSize-11 m-top15">有效期截止：{{data.endTime}}</p>
	          </div>
	          <img src="../../../static/img/yishiyong.png" class="yiling">		<!--已使用图片-->
	        </li>
	        <li class="coupon-row m-top10 f-oh f-pr used" v-for="data in couponUsetList" v-if="data.useStatus == -1">
	          <div class="left-main f-fl w-color dis-inblo">
	            <p class="money">￥<span style="font-size: 4.625rem;">{{data.reduceMoney}}</span></p>
	            <p class="fontSize-12" style="color: #fff; padding-left: 2rem; font-weight: 500; text-align: center;">{{data.couponName}}</p>
	          </div>
	          <div class="right-main f-fl dis-inblo">
	            <p class="limit fontSize-12">
                {{data.remark}}
	            	<!--全场通用-->
	            </p>
	            <p class="time fontSize-11 m-top15">有效期截止：{{data.endTime}}</p>
	          </div>
	          <img src="../../../static/img/yiguoqi.png" class="yiling">		<!--已过期图片-->
	        </li>
	      </ul>
	    </div>
	</div>
</template>

<script>
  import comLink from "@/common/common_link"; //导入总线
  import indusfooter from "../../subcomponents/indus-footer";
  import { Toast, MessageBox } from "mint-ui";
	import $ from "jquery"; //导入jquery
	export default{
  	inject: ['reload'],
		data(){
			return{
				tabindex:1,
        useStatus: '0',  //优惠券状态
        couponUsetList: [], //优惠券列表
			}
		},
    mounted() {
  	  this.myCoupon();
    },
		methods:{
  	  chgStatus(ind) {
  	    this.tabindex = ind;
  	    if(ind == 1) {
  	      this.useStatus = 0;
        }
        if(ind == 2) {
          this.useStatus = 1;
        }
        if(ind == 3) {
          this.useStatus = -1;
        }
        this.myCoupon();
      },
      myCoupon: function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/access/coupon',
          data:{
            'openid':sessionStorage.openid,
            'status' : vm.useStatus,
            // 'type': vm.type,
            // 'orderByMoneyDESC' : vm.orderByMoneyDESC,
            // 'orderByTimeDESC' : vm.orderByTimeDESC,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.couponUsetList = data.data.couponUsetList;
              for(var i = 0,l=vm.couponUsetList.length;i<l;i++){
                if(vm.couponUsetList[i].useStatus == 0){
                  vm.couponUsetList[i].btn = '去使用'
                }else if(vm.couponUsetList[i].useStatus == 1){
                  vm.couponUsetList[i].btn = '已使用'
                }else if(vm.couponUsetList[i].useStatus == -1) {
                  vm.couponUsetList[i].btn = '已过期'
                }
              }
              // vm.canUse = data.data.usable;
              // vm.noUse = data.data.excessive;
              // vm.used = data.data.easilyUse;
            } else {
              Toast({
                message: data.msg,
                duration: 2000
              });
            }
          }
        })
      },
		},
		 components: {
	    //注册子组件
	    indusfooter
	  },
	}

</script>

<style lang="scss" scoped="scoped">
  @import "@/../src/sass/public.scss"; //导入scss初始文件
	.indus-mycoupon{
		width:100%;
		box-sizing: border-box;
		.coupon-flex{
			width:100%;
			height:p(70);
			background-color: #fff;
			ul{
				display:flex;
				li{
					flex:1;
					text-align: center;
					line-height: p(70);
					font-size: p(29);
					color: #999999;
					font-weight:500;
					&:after{
						content:'';
						color: #999;
						float: right;
						display: inline-block;
						height: p(45);
						margin-top: p(15);
						width: 1px;
						background-color: #ddd;
					}
				}
				li:last-child{
					&:after{
						display: none;
					}
				}
				li.active{
					color: #307ff5;
				}
			}
		}
		  .coupon-detail {
    padding-bottom: 9rem;
    overflow-y: auto;
    -webkit-overflow-scrolling : touch;
    top: 0;
    bottom: p(125);
    width: 100%;
    .coupon-main {
      padding: p(0) p(23);
		.coupon-row.used{
			background-image: url("../../../static/img/greyBoupon.png");
        	background-size: 100% 100%;
		}
      .coupon-row {
        width: 100%;
        height: p(230);
        /*padding: p(0) p(23);*/
        background-image: url("../../../static/img/coupon.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
		position: relative;

		>.yiling{
			right:0;
			top: 0;
			width: p(114);
			position: absolute;
		}
        .left-main {
          width: p(230);
          text-align: center;

          .money {
          	color: #fff;
            margin-top: p(45);
            margin-bottom: p(20);
          }
        }

        .right-main {
          padding: p(40) 0 0 p(40);
			box-sizing: border-box;
          .ellipsis{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            max-width: p(320);
            color: #fc842e;
          }
          .limit{
            font-size: 2.1rem;
            font-weight: 500;
            color: #333;
            margin-bottom: 5rem;
          }
          .shipping{
            color: #333;
          }
          .time{
            color: #666;
          }
        }

        .get-coupon {
          text-align: center;
          color: white;
          padding-right: 1rem;
          p{
          	color: #5e80d9;
          	margin-top:5rem ;
          	/*margin-right: 2rem;*/
          	text-align: center;
          	font-weight: 550;
          	width: p(112);
			height: p(36);
			background-color: #ffffff;
			border-radius: p(18);
			font-size: p(20);
			line-height: p(30);
			border: solid 1px #5e80d9;
          }
        }


      }
    }
  }
	}
</style>
