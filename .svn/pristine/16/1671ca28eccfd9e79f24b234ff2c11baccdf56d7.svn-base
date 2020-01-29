<template>
	<div class="indus-center">
		<div class="about-order">
			<div class="myorder">
				<p class="fontSize-16">
					<img src="../../../static/img/indus/centerMo.png"/>
					我的订单
          <router-link to = "/indus/orderlist?index=0">
            <i class="icon iconfont icon-more fontSize-18 f-fr"></i>
          </router-link>
				</p>
			</div>
			<div class="order-list">
				<ul class="f-oh">
					<li class="f-fl">
						<router-link to = "/indus/orderlist?index=0">
							<div class="list-det">
								<img src="../../../static/img/indus/centerAll.png"/>
								<p>全部</p>
							</div>
						</router-link>
					</li>
					<li class="f-fl">
						<router-link to = "/indus/orderlist?index=1">
							<div class="list-det">
								<img src="../../../static/img/indus/centerDfg.png"/>
								<p>待付款</p>
               					<i  class="superscript" v-if="json.daifukuan > 0">{{json.daifukuan}}</i>
							</div>
						</router-link>
					</li>
					<li class="f-fl">
						<router-link to = "/indus/orderlist?index=2">
							<div class="list-det">
								<img src="../../../static/img/indus/centerDfh.png"/>
								<p>待发货</p>
                				<i  class="superscript" v-if="json.daifahuo > 0">{{json.daifahuo}}</i>
							</div>
						</router-link>

					</li>
					<li class="f-fl">
						<router-link to = "/indus/orderlist?index=3">
							<div class="list-det">
								<img src="../../../static/img/indus/centerDsh.png"/>
								<p>待收货</p>
                				<i  class="superscript" v-if="json.daishouhuo > 0">{{json.daishouhuo}}</i>
							</div>
						</router-link>

					</li>
					<li class="f-fl">
						<router-link to = "/indus/orderlist?index=4">
							<div class="list-det">
								<img src="../../../static/img/indus/centersh.png"/>
								<p>售后</p>
                				<i  class="superscript" v-if="json.shouhouzhong > 0">{{json.shouhouzhong}}</i>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="list">
			<ul>
				<li>
					<router-link to = "/indus/mycoupon2">
						<img src="../../../static/img/indus/mycoupon.png"/>
						<span>我的优惠券</span>
		          		<i class="icon iconfont icon-more fontSize-18 f-fr"></i>
					</router-link>
				</li>
				<li>
					<router-link to = "/indus/induspayAddress">
						<img src="../../../static/img/indus/myaddress.png"/>
						<span>我的收货地址</span>
		          		<i class="icon iconfont icon-more fontSize-18 f-fr"></i>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="beian">
      	 ©粤ICP备14033764号-2
    	</div>
    	<indusfooter/>
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
        json: {},  //数量
			}
		},
    mounted() {
  	  this.orderCount();
    },
		methods:{
      //查询各订单的数量
      orderCount() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/order/orderCount',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.json = resp.data;
            }else{
              Toast({
                message: resp.msg,
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
	.indus-center{
		width:100%;
		padding-top: p(24);
		.beian{
				width: 100%;
			  	background: #eee;
			  	color: #333;
			  	position:fixed;
			  	bottom:p(100);
			  	text-align: center;
			  	height: 3rem;
			  	line-height: 3rem;
			  	font-size: p(24);
			}
		.about-order{
			background-color: #fff;
			.myorder{
				width: 100%;
				border-bottom:1px solid #eee;
				height: p(80);
				img{
					width: p(28);
					height: p(32);
					vertical-align: -5%;
				}
				p{
					padding: 0 p(10) 0 p(20);
					line-height: p(80);
					font-size: p(28);
					font-weight: 500;
				}
			}
			.order-list{
				width: 100%;
				height: p(142);
				ul{
					display: flex;
					li{
						text-align: center;
						flex: 1;
						.list-det{
							img{
								width: p(44);
								height: p(44);
								display: inline-block;
								margin: p(25) 0 p(20);
							}
							p{
								text-align: center;
								color: #333;
								font-weight: 500;
								font-size: p(26);
							}
						}
					}
				}
			}
		}
		.list{
			background-color: #fff;
			margin-top: p(20);
			ul{
				li{
					a{
						width: 100%;
						display: inline-block;
					}
					width: 100%;
					border-bottom:1px solid #eee;
					height: p(88);
					line-height: p(88);
					padding: 0 p(10) 0 p(15);
					img{
						width: p(46);
						height: p(42);
						vertical-align: -10%;
					}
					span{
						font-size: p(28);
						color: #333333;
						font-weight: 500;
						padding-left: p(20);
					}
				}
			}
		}
    .superscript {
      font-size: 1rem;
      position: relative;
      right: -0.8rem;
      top: -7.2rem;
      background: #ff5d74;
      width: 1.5rem;
      height: 1.5rem;
      line-height: 1.7rem;
      text-align: center;
      color: white;
      border-radius: 50%;
      display: inline-block;
    }
	}
</style>
