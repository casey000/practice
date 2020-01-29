<template>
	<div class="indus-cart">
		<ul class="cart-list" v-if="page.list.length > 0">
			<li class="f-oh" v-for="data in page.list" v-if="data.store > 0 && data.productStatus == 1 && data.skuStatus == 1">
				<div class="img f-fl">
					<div class="status f-fl" :class="{active : data.isChecked}" @click ="choose(data)">
					</div>
					<router-link :to="{path: '/indus/productDetail',query:{productId : data.productId}}">
          				<img v-lazy="data.productLogo" />
					</router-link>
				</div>
				<div class="text f-fl">
					<p class="ellipsis name" @click="toBuy(data.productId)">{{data.productName}}</p>
					<p class="ellipsis classlfy">{{data.skuName}}</p>
					<p class="price">￥{{data.price}}</p>
				</div>
				<div class="caozuo f-fl">
					<div class="delete f-oh">
						<img src="../../../static/img/indus/delete.png" class="f-fr" @click="delCarProduct(data)">
					</div>
					<div class="jiajian">
						<span class="minus" @click = reduceCarProductCount(data)>-</span>
						<span class="num">{{data.number}}</span>
						<span class="plus" @click = addCarProductCount(data)>+</span>
					</div>
				</div>
			</li>
		</ul>
		<div class="timeout-list" v-if="hasInvalid">
			<p class="fontSize-16 moveout"><span @click="clearInvalidProduct">清空失效物品</span></p>
			<ul class="">
		        <li class="f-oh" v-for="data in page.list" v-if="data.store <= 0 || data.productStatus !== 1 || data.skuStatus !== 1">
		          <span class="fontSize-12 tmout">已失效</span>
		          <div class="img f-fl" v-if="data.store <= 0">
		            <router-link :to="{path: '/indus/productDetail',query:{productId : data.productId}}">
		              <img v-lazy="data.productLogo" />
		            </router-link>
		          </div>
		          <div class="img f-fl" v-else>
		            <img v-lazy="data.productLogo" />
		          </div>
		          <div class="text f-fl">
		            <p class="ellipsis name">{{data.productName}}</p>
		            <p class="ellipsis classlfy">{{data.skuName}}</p>
		            <p class="price">￥{{data.price}}</p>
		          </div>
		        </li>
			</ul>
		</div>
		<div class="bottom">
			<div class="beian">
      	 ©粤ICP备14033764号-2
    	</div>
			<p>
				<span class="choose">选择了{{total}}件商品</span>
				<span class="price">共计：<span class="money">¥{{totalPrice}}</span></span>
				<span class="btn" @click="settment">结算</span>
			</p>
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
				isChecked:false,
        queryData: {
          'openid': sessionStorage.openid,
          'insideId': sessionStorage.insideId,
          'pageNum': 1,
          'pageSize': 100
        },
        page: {
				  list: {
				    isChecked: false
          }
        }, // 分页对象
        hasInvalid: false, // 是否有失效的商品
        totalPrice: 0, // 总价
        total: 0, // 总量
        insideSkuIds: [],
        numbers: [],
			}
		},
    mounted() {
      this.getInsideProduct();
    },
		methods:{
      //购物车列表
      getInsideProduct() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/car/getCarList',
          data: vm.queryData,
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.page = resp.data;
              //处理失效宝贝
              var carList = vm.page.list;
              var car = null;
              for(var i = 0; i < carList.length; i++) {
                car = carList[i];
                if(car.store <= 0 || car.productStatus !== 1 || car.skuStatus !== 1) {
                  vm.hasInvalid = true;
                  break;
                }
              }
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //删除购物车
      delCarProduct(data) {
        var vm = this;
        MessageBox.confirm('确定删除购物车商品吗？', '警告', {confirmButtonText: '确定'}).then(({ value, action }) => {
          $.ajax({
            url:comLink.yxtHost + '/inside/car/delCarProduct',
            data: {
              'openid': sessionStorage.openid,
              'insideId': sessionStorage.insideId,
              'insideCarId': data.id
            },
            dataType:'json',
            type:'post',
            success:function (resp) {
              if(resp.code == 1){
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
                vm.reload();
              }else{
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
              }
            }
          })
        })
      },
      //减少购物车数量
      reduceCarProductCount(data) {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/car/reduceCarProductCount',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId,
            'insideCarId': data.id
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              data.number--;
              vm.updatePrice(data);
              vm.page.list.splice(1000, 0);
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //增加购物车商品数量
      addCarProductCount(data) {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/car/addCarProductCount',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId,
            'insideCarId': data.id
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              data.number++;
              vm.updatePrice(data);
              vm.page.list.splice(1000, 0);
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //清空失效商品
      clearInvalidProduct() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/car/clearInvalidProduct',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.reload();
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //结算
      settment() {
        if(this.insideSkuIds.length <= 0) {
          Toast({
            message: '还未选中任何商品',
            duration: 2000
          });
          return;
        }

        this.$router.push({
          path: '/indus/orderConfirm',
          query: {
            insideSkuId: this.insideSkuIds.join(','),
            number: this.numbers.join(','),
            isCar: 1
          }
        });
      },
      //单品页面
      toBuy(productId) {
        this.$router.push({
          path: '/indus/productDetail',
          query: {
            'productId': productId
          }
        })
      },
      //选中商品
			choose(data){
        data.isChecked = !data.isChecked;
        this.updatePrice(data);
			},
      updatePrice(data) {
        var carList = this.page.list;
        carList.splice(1000, 0);
        this.total = 0;
        this.totalPrice = 0;
        this.insideSkuIds = [];
        this.numbers = [];
        var car = null;
        for(var i = 0; i < carList.length; i++) {
          car = carList[i];
          if(car.isChecked) {
            this.totalPrice = this.totalPrice*1 + (car.number*1) * (car.price*1);
            this.total = this.total*1 + car.number*1;
            this.insideSkuIds.push(car.insideSkuId);
            this.numbers.push(car.number);
          }
        }
      }
		},
		 components: {
	    //注册子组件
	    indusfooter
	  },
	}

</script>

<style lang="scss" scoped="scoped">
  @import "@/../src/sass/public.scss"; //导入scss初始文件
	.indus-cart{
		width:100%;
		.moveout{
			padding:p(25) 0 0 p(30);
			color:#f33;
		}
		span.tmout{
			margin-left:p(20);
			position:absolute;
			text-align:center;
			top:p(90);
			display:inline-block;
			width:p(95);
			height:p(35);
			line-height:p(35);
			color:#333;
			border-radius:p(15);
			background-color: #eee;
		}
		.cart-list{
			margin-top:p(20);
			width:100%;
			box-sizing: border-box;
			margin-bottom:p(200);
			li{
				margin-bottom:p(20);
				background-color: #fff;
				width:100%;
				height:p(208);
				position: relative;
				.img{
					height:p(208);
					width:p(210);
					.status{
						width: p(70);
						height:p(208);
						background: url(../../../static/img/indus/wxz.png) no-repeat p(20) center;
						background-size: p(38) p(38);
					}
					.status.active{
						width: p(70);
						height:p(208);
						background: url(../../../static/img/indus/yxz.png) no-repeat p(20) center;
						background-size: p(38) p(38);
					}
					img{
						width: p(120);
						height: p(120);
						display: inline-block;
						margin: p(40) 0 0 p(0);
					}
				}
				.text{
					width:p(400);
					height:p(208);
					.name{
						font-size: p(28);
						line-height: p(45);
						color: #333333;
						padding-left: p(5);
						margin: p(26) 0;
					}
					.classlfy{
						font-size: p(24);
						padding-left: p(5);
						color: #666;
					}
					.price{
						margin-top: p(40);
						font-size: p(36);
						color: #ff2727;
					}
				}
				.caozuo{
					width:p(130);
					.delete{
						/*width: 100%;*/
						right: p(20);
						top: p(30);
						position: absolute;
						img{
							width: p(34);
							height: p(34);
							display: inline-block;
							/*margin-top: p(30);*/
							/*margin-right: p(25);*/
						}
					}
					.jiajian{
						right: p(20);
						top: p(130);
						position: absolute;
						.minus,.plus{
							width: p(40);
							height: p(40);
							display: inline-block;
							text-align: center;
							background-color: #ffffff;
							border-radius: p(10);
							border: solid 1px #999999;
						}
						.num{
							font-size: p(30);
							color: #333;
							display: inline-block;
							margin: 0 p(5);
							vertical-align: 12%;
						}
					}
				}
			}
		}
		.timeout-list{
			margin-top:p(20);
			width:100%;
			background-color: #fff;
			margin-bottom:p(200);
			ul{
				li{
					border-bottom: 1px dashed #eee;
				background-color: #fff;
				width:100%;
				height:p(208);
				position: relative;
				.img{
					height:p(208);
					width:p(140);
					text-align: center;
					margin-left:p(140);
					img{
						width: p(120);
						height: p(120);
						display: inline-block;
						margin: p(40) 0 0 p(0);
					}
				}
				.text{
					width:p(400);
					height:p(208);
					margin-left: p(20);
					.name{
						font-size: p(28);
						line-height: p(45);
						color: #333333;
						padding-left: p(5);
						margin: p(26) 0;
					}
					.classlfy{
						font-size: p(24);
						padding-left: p(5);
						color: #666;
					}
					.price{
						margin-top: p(40);
						font-size: p(36);
						color: #ff2727;
					}
				}
			}
			}
		}
		.bottom{
			width: 100%;
			height: 9.25rem;
			border-top: 1px solid #eee;
			box-sizing: border-box;
			position: fixed;
			bottom: p(100);
			background-color: #fff;
			.beian{
				width: 100%;
		  	background: #eee;
		  	color: #333;
		  	text-align: center;
		  	height: 3rem;
		  	line-height: 3rem;
		  	font-size: p(24);
			}
			>p{
				height: 100%;
				line-height: p(100);
				.choose{
					font-size: p(28);
					height: p(100);
					padding-left: p(20);
					color: #999999;
					line-height: p(90);
					display: inline-block;
				}
				.price{
					font-size: p(28);
					padding-left: p(130);
					color: #333;
					display: inline-block;
					font-weight: 500;
					.money{
						padding-left: p(10);
						color: #ff2727;
					}
				}
				.btn{
					display: inline-block;
					width: p(170);
					position: absolute;
					right: p(30);
					top: p(55);
					height: p(78);
					line-height: p(78);
					margin-left: p(25);
					color: #fff;
					font-size: p(28);
					text-align: center;
					background-color: #ff2727;
					border-radius: p(10);
				}
			}
		}
	}
</style>
