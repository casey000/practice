<template>
  <div class="indusbrand-content fontSize-12" v-title data-title="品牌专区">
  	<scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire">
	    <div class="inOrder b-white">
	    	<div class="tab">
	    		<ul>
	    			<li @click = "showPop = true ;isShowBlackCover = true"><img src="../../../static/img/indus/indusPrice.png" ><span>价格</span></li>
	    			<li @click = "classflow = true ;isShowBlackCover = true"><img src="../../../static/img/indus/indusBrand.png" ><span>品牌</span></li>
	    		</ul>
	    	</div>
	    	<div class="">
		    	<div class="brand-list">
		    		<ul class="f-oh">
		    			<li class="f-fl" v-for="data in page.list">
                <img v-lazy="data.productLogo" @click="toBuy(data.productId)"/>
		    				<p class="name">{{data.productName}}</p>
		    				<p class="price">实付:¥{{data.insidePrice}} <span class="oldPrice">官网:¥{{data.mallPrice}}</span></p>
                <p class="price" style="margin-top: 0;margin-bottom: 0;font-size: 1.4rem;color: #999">{{data.title}}</p>
		    				<p class="num">已售: {{data.sale}}
		    					<span @click="toBuy(data.productId)">立刻购买</span>
		    				</p>
		    			</li>
		    		</ul>
		    	</div>
	    	</div>
	    </div>
	 	</scroller>
    <div class="showPop-content" v-if="showPop">
      <div class="item-list-content">
        <div class="item-list-main fontSize-14">
          <dt class="item-row f-oh">
            <p class="f-fl" style="font-weight: 500;">价格</p>
            <p class="f-fr" @click="showPop = false ; isShowBlackCover = false">返回</p>
          </dt>
          <dt class="item-row f-oh" @click="priceChoose()">
            <p class="f-fl">价格区间</p>
            <i class="icon iconfont icon-moreunfold f-fr" v-if="showPriceChoose"></i>
            <i class="icon iconfont icon-more f-fr" v-else></i>
            <span class="f-fr"></span>
          </dt>
          <dt class="price-lists f-oh" v-if="showPriceChoose">
            <ul class="price-list-main">
              <li class="price-list-row"  @click="choosePrice(1)" :class = "{choose : Pricejd == 1}">
                <span>￥0-￥100</span>
              </li>
              <li class="price-list-row" @click="choosePrice(2)" :class = "{choose : Pricejd == 2}">
                <span>￥100-￥500</span>
              </li>
              <li class="price-list-row" @click="choosePrice(3)" :class = "{choose : Pricejd == 3}">
                <span>￥500-￥1000</span>
              </li>
              <li class="price-list-row" @click="choosePrice(4)" :class = "{choose : Pricejd == 4}">
                <span>￥1000-￥3000</span>
              </li>
              <li class="price-list-row edit-price">
                <span>自定义：</span>
                <input class="price-arrange" type="number"
                       v-model="queryData.minPrice"
                       placeholder="最低价格">
                        <i class="">—</i>
                <input class="price-arrange" type="number"
                       v-model="queryData.maxPrice"
                       placeholder="最高价格">
              </li>
            </ul>
          </dt>
        </div>
      </div>
      <div class="bottom-btns">
        <span class="reset" @click="clearData">重置</span>
        <span class="confirm" @click="getInsideAreaProductList">确定</span>
      </div>
    </div>

     <div class="showPop-content" v-if="classflow">
      <div class="item-list-content">
        <div class="item-list-main fontSize-14">
          <dt class="item-row f-oh">
            <p class="f-fl" style="font-weight: 500;">品牌</p>
            <p class="f-fr" @click="classflow = false ; isShowBlackCover = false">返回</p>
          </dt>

        </div>
        <ul class="item-list-main fontSize-14">
          <li class="item-row f-oh" @click="brandChoose">
            <p class="f-fl">品牌</p>
            <span class="f-fr m-right10"></span>
            <i class="icon iconfont icon-moreunfold f-fr" v-if="showBrandChoose"></i>
            <i class="icon iconfont icon-more f-fr" v-else></i>
          </li>
        </ul>
        <ul class="item-list-main brand-ul f-oh fontSize-14" v-if = "showBrandChoose">
          <li class="brand-row f-fl" v-for="data in brandList" @click="chooseBrand(data)" :class="{'chosen': data.brandId == queryData.brandId}">
            <img :src="data.brandLogo" :alt="data.brandName">
            <p>{{data.brandName}}</p>
          </li>
        </ul>
      </div>
      <div class="bottom-btns">
        <span class="reset" @click="clearData">重置</span>
        <span class="confirm" @click="getInsideAreaProductList">确定</span>
      </div>
    </div>
    <div class="black-cover" v-if="isShowBlackCover">
    </div>
  </div>
</template>

<script>
//导入子组件
	import { Scroller } from 'vux'
  	import { Toast} from "mint-ui";
  	import $ from "jquery"; //导入jquery
  	import axios from 'axios'
  	import comLink from "@/common/common_link"; //导入总线

export default {//
  data() {
    return {
    	Pricejd:0,
      showPriceChoose:true,
      showBrandChoose:true,
      showPop: false,
      classflow:false,
      isShowBlackCover : false,
      queryData: {
        'openid': sessionStorage.openid,
        'insideId': sessionStorage.insideId,
        'pageNum': 1,
        'pageSize': 20,
        'insideAreaId': '',
        'brandId': '',
        'maxPrice': '',
        'minPrice': ''
      },
      page: {},  //分页对象
      insideAreaId: '',  //专区id
      brandList: [],  //品牌列表
    }
  },
  mounted (){
    var insideAreaId = window.location.hash.split('=')[1];
    if(insideAreaId != undefined && insideAreaId != null) {
      this.insideAreaId = insideAreaId;
    }

    this.getInsideAreaProductList();
    this.getBrandList();
  },
  methods: {
    //专区商品列表
    getInsideAreaProductList() {
      var vm = this;
      vm.queryData.insideAreaId = vm.insideAreaId;
      $.ajax({
        url:comLink.yxtHost + '/inside/area/getInsideAreaProductList',
        data: vm.queryData,
        dataType:'json',
        type:'post',
        success:function (resp) {
          if(resp.code == 1){
            vm.page = resp.data;
            vm.showPop = false;
            vm.classflow = false;
            vm.isShowBlackCover = false;
          }else{
            Toast({
              message: resp.msg,
              duration: 2000
            });
          }
        }
      })
    },
    //专区品牌列表
    getBrandList() {
      var vm = this;
      vm.queryData.insideAreaId = vm.insideAreaId;
      $.ajax({
        url:comLink.yxtHost + '/inside/area/getBrandList',
        data: {
          'openid': sessionStorage.openid,
          'insideId': sessionStorage.insideId,
          'insideAreaId': vm.insideAreaId
        },
        dataType:'json',
        type:'post',
        success:function (resp) {
          if(resp.code == 1){
            vm.brandList = resp.data;
          }else{
            Toast({
              message: resp.msg,
              duration: 2000
            });
          }
        }
      })
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
    //重置
    clearData() {
      this.queryData.minPrice = '';
      this.queryData.maxPrice = '';
      this.queryData.brandId = '';
    },
    priceChoose(){
        this.showPriceChoose = !this.showPriceChoose;
    },
    brandChoose(){
        this.showBrandChoose = !this.showBrandChoose;
    },
    choosePrice(ind){
      if(ind == 1) {
        this.queryData.minPrice = 0;
        this.queryData.maxPrice = 100;
      }
      if(ind == 2) {
        this.queryData.minPrice = 100;
        this.queryData.maxPrice = 500;
      }
      if(ind == 3) {
        this.queryData.minPrice = 500;
        this.queryData.maxPrice = 1000;
      }
      if(ind == 4) {
        this.queryData.minPrice = 1000;
        this.queryData.maxPrice = 3000;
      }
    },
    //选择品牌
    chooseBrand(data) {
      this.queryData.brandId = data.brandId;
    },
    scrollerRequire(){

    }
  },


  components: {
    //注册子组件
    Scroller
  },
  watch: {
      '$route'(to,from) {

        if(from.name === 'homeSearchRouter' || from.name === 'searchproRt' || from.name === 'sort' || from.name === 'cart' || from.name === 'mine'){

					if(to.name == 'home-mian'){
        		this.sendWxtoOther();
					}
        }


      },
    },
};
</script>
<style>
  /*.router{*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
 /*.mint-swipe-indicator {
    width: 1rem!important;
    height: 1rem!important;
    background: #eee!important;
    opacity: 0.8!important;
    margin: 0 0.5rem!important;
}*/
.indushome-content .mint-swipe-indicators{
	background-color: rgba(255,255,255,0.7);
	border-radius: 1rem;
}
.indushome-content .mint-swipe-indicator.is-active{
	background: #307ff5!important;
	opacity: 1;
}
.indushome-content .mint-swipe-indicator{
	background: #fff!important;
	opacity: 1;
}
</style>
<style lang="scss" scoped>
@import "@/../src/sass/public.scss"; //导入scss初始文件
.to-top{
  position: fixed;
  display: inline-block;
  width: p(60);
  height: p(70);
  bottom: p(355);
  right: p(20);
  background: black;
  opacity: 0.6;
  color: white;
  text-align: center;

  .icon-less{
    font-size: p(40);
  }
}
.marginRight{
  padding-left: p(10);
  margin-right: p(10);
}
  .indusbrand-content{
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: p(90);*/
    /*right: 0;*/
    /*left: 0;*/
    width: 100%;
    height: 100%;
    /*overflow-y: auto;*/
    .showPop-content{
      position: fixed;
      top: p(90);
      bottom: 0;
      right: 0;
      width: p(530);
      background: white;
      z-index: 10;
      overflow-y: scroll;
      animation:myfirst 0.5s ;
      @keyframes myfirst
      {
        0%   {right:0;top: 100%;}
        100% { right:0; top:p(90);}
      }
      .item-list-content{
        padding-bottom: p(90);
        width: 100%;
        .brand-ul{
        	padding: 0 p(25);
        }
        .item-list-main{
			.brand-row{
				margin: p(10) p(15) p(10) 0;
				width: p(150);
				height: p(140);
            	border: p(1) solid #ccc;
            	text-align: center;
            	box-sizing: border-box;
            	border-radius: p(10);
            	overflow: hidden;
				img{
					width: p(148);
					height: p(98);
				}
			}
			.brand-row.chosen{
				border: p(1) solid $bgBlue;
			}
			.brand-row:nth-child(3n){
				margin-right: 0;
			}
          .item-row{
            /*padding: 0 p(25);*/
            display: inline-block;
            width: 100%;
            height: p(90);
            box-sizing: border-box;
            border-bottom: p(1) solid #ccc;
            line-height: p(90);
            padding: 0 p(25);
            font-size: p(28);
          }
          .detail-main{
            width: 100%;
            border-bottom: 0.5px solid #ccc;
            padding: p(20) p(24) p(30) p(48);

            .detail-row{
              padding: 1rem;

              .detail{
                display: inline-block;
                padding: 1rem;
                border: 0.5px solid #ccc;
                border-radius: p(10);
                margin: p(5) p(5) 0 0;
              }
            }
          }
          .price-lists{
            width: 100%;
            text-align: center;
            /*padding: 0 p(24);*/
            border-bottom: 0.5px solid #eee;
            .edit-price{
              .price-arrange{
                display: inline-block;
                width: 30%;
                height: 78%;
                border: 1px solid #eee;
                border-radius: p(10);
                text-align: center;
                margin-bottom: 2%;
              }
              .confirm{
                display: inline-block;
                height: p(40);
                line-height: p(36);
                margin-top: p(10);
                text-align: center;
                width: p(100);
                box-sizing: border-box;
                border: 0.5px solid #ccc;
                border-radius: p(2);
              }
            }

            .price-list-main{
              width: 100%;
              .price-list-row{
                width: 100%;
                height: p(85);
                font-size: p(26);
                color: #333333;
                line-height: p(85);
                padding: 0 p(10);
                text-align: left;
                border-bottom: 0.5px solid #ccc;
              }
              .price-list-row.choose{
              	background-color: #EEEEEE;
              }
            }
          }
        }
      }
      .bottom-btns{
        position: fixed;
        width: p(530);
        bottom: 0;
        right: 0;
        z-index: 9;
        /*width: 100%;*/
        height: p(90);
        line-height: p(90);
        display: flex;
        justify-content: space-around;
        overflow: hidden;
        .reset,.confirm{
          display: inline-block;
          width: 50%;
          float: left;
          height: 100%;
          line-height: p(90);
          text-align: center;
        }
        .reset {
          color: $bgBlue;
          background: $danlan;
        }
        .confirm{
          color: white;
          background: $bgBlue;
        }
      }
    }
	.inOrder{
		width:100%;
		.tab{
			ul{
				width: 100%;
				height: p(80);
				display: flex;
				border-bottom: 1px solid #eee;
				li{
					flex: 1;
					line-height: p(80);
					text-align: center;
					img{
						 width: p(38);
						 height: p(35);
						 vertical-align:-8%;
					}
					span{
						padding-left: p(15);
						font-size: p(28);
						color: #333333;
					}
				}
				li:first-child{
					&:after{
						content: '';
						display: inline-block;
						width: 1px;
						height: p(40);
						background-color: #DDDDDD;
						float: right;
						margin-top: p(20);

					}
				}
			}
		}
		.inOrder-List{
			display: flex;
			border-bottom:1px solid #eee;
			li{
				flex: 1;
				height:p(80);
				line-height: p(80);
				text-align: center;
				font-size: p(28);
				color: #999;
				padding-left: p(25);
			}
			li.active{
				color: #000;
			}

			li:first-child{
				background: url(../../../static/img/indus/gOrder1.png) no-repeat p(44);
				background-size:p(34) p(40) ;
			}
			li.active:first-child{
				background: url(../../../static/img/indus/bOrder1.png) no-repeat p(44);
				background-size:p(34) p(40) ;
			}
			li:nth-child(2){
				background: url(../../../static/img/indus/gOrder2.png) no-repeat p(38);
				background-size:p(34) p(40) ;
			}
			li.active:nth-child(2){
				background: url(../../../static/img/indus/bOrder2.png) no-repeat p(38);
				background-size:p(34) p(40) ;
			}
			li.active:nth-child(3){
				background: url(../../../static/img/indus/bOrder3.png) no-repeat p(65);
				background-size:p(34) p(40) ;
			}
			li:nth-child(3){
				background: url(../../../static/img/indus/gOrder3.png) no-repeat p(65);
				background-size:p(34) p(40) ;
			}
		}
		.brand-con{
			height: auto;
			width: 100%;
			background-color: #fff;
			.title{
				width: p(710);
				height: p(80);
				margin:  p(10) auto;
				padding: 0 p(24);
				background: url(../../../static/img/indus/brand-Bg.png) no-repeat center ;
				background-size:100% ;
				display: flex;
				align-items: center;
				>span{
					min-width: p(565);
					padding-left: p(15);
					font-size: p(28);
					color: #333333;
				}
				img.brand{
					width: p(60);
					align-items: center;
					height: p(60);
				}
				img.right{
					width: p(40);
					float: right;
					align-items: center;
					height: p(40);
				}
			}
		}
		.brand-list{
			width: 100%;
			height: auto;
			padding: 0 p(15);
			ul{
				padding:p(10);
				li{
					width: 49%;
					height: p(489);
					margin-bottom: p(20);
					box-shadow:#d2ddf2 0px 0px p(10) ;
					/*border: p(1) solid #eee;*/
					margin-right: 2%;
					text-align: center;
					img{
						width: 100%;
						height: p(300);
					}
					.name{
						font-size: p(30);
						color: #333333;
						padding-left: p(15);
						text-align: left;
						margin-top: p(27);
						margin-bottom: p(19);
						width: 100%;
						text-overflow:ellipsis;
  						white-space:nowrap;
						overflow: hidden;
					}
					.price{
						text-align: left;
						font-size: p(28);
						color: #ff2727;
						padding-left: p(15);
						margin-bottom: p(12);
						.oldPrice{
							font-size: p(24);
							color: #999999;
							text-decoration: line-through;
							padding-left: p(30);
						}
					}
					.num{
						text-align: left;
						font-size: p(24);
						padding-left: p(18);
						color: #999;
						line-height: p(42);
						span{
							float: right;
							margin-right: p(16);
							display: inline-block;
							background-color: #307ff5;
							border-radius: p(6);
							font-size: p(20);
							border: solid 1px #307ff5;
							text-align: center;
							color: #fff;
							width: p(100);
							height: p(42);
							line-height: p(42);
						}
					}
				}
				li:nth-child(2n){
					margin-right: 0;
				}
			}
		}
	}
   	.active-main{
   		.title{
   			height: p(80);
   			line-height: p(80);
   			text-align: center;
   			font-size: p(36);
   			letter-spacing: p(2);
   			font-weight: 500;
			color: #333333;
			position: relative;
			background: url(../../../static/img/couponbg.png) no-repeat center;
			background-size:100% ;
			span{
				position: absolute;
				right: p(15);
				font-size: p(24);
				color: #666666;
				img{
					vertical-align: -5%;
					display: inline-block;
					margin-left: p(5);
					width: p(26);
					height: p(26);
				}
			}
   		}
   		.active-show{
   			box-sizing: border-box;
   			height: p(530);
   			width: 100%;
   			.left{
   				width: 50%;
   				display: inline-block;
	   			height: p(265);
   				img{
   					width: 100%;
   				}
   			}
   			.right{
   				width: 50%;
   				display: inline-block;
	   			height: p(265);
   				div{
	   				line-height: 0.8;
   					a{
   						display: inline-block;
   						box-sizing: content-box;
	   					width: 100%;
	   					height: p(265);
	   					img{
		   					width: 100%;
   							height: 100%;
		   				}
   					}

   				}

   			}
   		}
   	}
   	.coupon-main{
   		.title{
   			height: p(80);
   			line-height: p(80);
   			text-align: center;
   			font-size: p(36);
   			letter-spacing: p(2);
   			font-weight: 500;
			color: #333333;
			position: relative;
			background: url(../../../static/img/couponbg.png) no-repeat center;
			background-size:100% ;
			span{
				position: absolute;
				right: p(15);
				font-size: p(24);
				color: #666666;
				img{
					vertical-align: -5%;
					display: inline-block;
					margin-left: p(5);
					width: p(26);
					height: p(26);
				}
			}
   		}
   		.all-Coupon{
   			width: 100%;
   			img{
   				width: 100%;
   			}
   		}
   		.coupon-divide{
   			padding: p(10) p(30);
   			.top{
   				margin:p(10) 0;
   				a{
   					display:inline-block;
   					position: relative;
   					img{
   						width: p(330);
   						height: p(120);
   					}
   					.tit{
   						font-size: p(24);
						color: #fff2f2;
						position: absolute;
						top: p(15);
						left: p(16);
   					}
   					.num{
   						font-size: p(20);
						color: #FFF2FD;
						position: absolute;
						top: p(45);
						left: p(16);
   					}
   				}
   				a:first-child{
   					margin-right: p(22);
   				}
   			}
   		}


    }
	.miaos{
		>p{
			padding: p(20);
			.tit{
				font-size: p(30);
				line-height: p(30);
				color: #333333;
				font-weight: 500;
			}
			.name{
				font-size: p(28);
				color: #333333;
				display: inline-block;
				margin-right: p(20);
			}
			.time{
				font-size: p(28);
				color: #333333;
				i{
					display: inline-block;
					width: p(33);
					height: p(30);
					background-color: #3e3e3e;
					border-radius: p(4);
					color: #fff;
					line-height: p(30);
					text-align: center;
					font-size: p(24);
				}
			}
		}
		.msList{
			overflow-x: auto;
			width: auto;
			white-space: nowrap;
			overflow-y: hidden;
			padding: 0 p(16);
			li{
				width: p(210);
				height: p(285);
				display: inline-block;
				margin: 0 p(12) 0 0;
				img{
					width: p(210);
					height: p(210);
				}
				p{
					font-size: p(36);
					color: #f66800;
					line-height: p(75);
					font-weight: 500;
					text-align: center;
					i{
						font-size: p(24);
						color: #b1b1b1;
						display: inline-block;
						margin-left: p(10);
						text-decoration: line-through;
					}
				}
			}
		}
	}

    .search-main{
      height: p(90);
      width: 100%;
      background: #fff;
      padding: 0 p(30);

      .search-inp-main{
        margin: p(12) 0;
        width: 90%;
        height: p(64);
        border-radius: p(6);
        background: #f5f5f5;
        line-height: p(70);
        position: relative;
        .icon-search{
          position: absolute;
          /*width: 15%;*/
          left: 20%;
          font-size: p(35);
          background: #f5f5f5;
        }
        .head-search{
          width: 100%;
          height: 100%;
          text-align: center;
          background: #f5f5f5;
          border-radius: 1rem;
          font-size: p(24);
        }
      }
      .search-btn{
        display: inline-block;
        width: 10%;
        height: 100%;
        text-align: center;
        /*margin-top: p(8);*/
		vertical-align: middle;
		padding-top: p(25);
		position: relative;
		.newsNum{
			display: inline-block;
			width: p(30);
			position: absolute;
			height: p(30);
			border-radius: 50%;
			text-align: center;
			color: #fff;
			line-height: p(30);
			right: 0;
			font-size: p(20);
			top: p(8);
			background-color: #ad090a;
		}
		img{
			display: inline;
			width: p(38);
			height: p(35);
			vertical-align: middle;
		}
        .mine-icon-wai{
          width: 100%;
          height: 50%;
          text-align: center;
          .mineIcon{
            height: 100%;

          }
        }
        .mine{
          display: inline-block;
          width: 100%;
          text-align: center;
          margin-top: p(5);
        }
      }
    }
    .page-content{
      position: absolute;
      top: p(90);
      bottom: 0;
      right: 0;
      left: 0;
      overflow-y: auto;
    }
    /*轮播图开始*/
    .slideshow-content{
      width: 100%;
      height : p(300);
      .slideshow-pic{
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      .btn{
        width: p(70);
        height: p(18);
        background: transparent;
        opacity: 0.7;
        bottom: p(20);
        left: 50%;
        margin-left: p(-35);
        border-radius: p(20);
        display: flex;
        justify-content: space-evenly;

        .pic-btn.active{
          background: #307ff5;
        }
        .pic-btn{
          display: inline-block;
          margin-top: p(4);
          width: p(10);
          height: p(10);
          border-radius: 50%;
          background: white;
          opacity: 1;
        }
      }
    }
    /*轮播图结束*/
    .item-list{
      width: 100%;
      height: p(50);

      .list-main{

        .list-main-row{
          width: 33.3%;
          height: 100%;
          text-align: center;

          .li-inner{
            display: inline-block;
            /*width: 100%;*/
            height: 100%;
            margin: p(10) auto;

            .list-pic{
              width: p(32);
              height: p(32);
            }
            .word{
              margin-top: p(3);
            }
          }

        }
      }
    }



    /*功能列表—今日抢购-领优惠劵 等*/
    .active-item-list{
      padding: p(30) 0 p(10) 0;
      margin-top: p(2);

      .active-item-main{
		display: flex;
        .active-item-main-row{
          /*width: 33.3%;*/
         flex: 1;
          height: 100%;
          text-align: center;
          .active-pics{
            display: inline-block;
            width: p(90);
            height: p(90);
            /*border-radius: 50%;*/
          }
          .active-words{
          	color: #333;
          	font-size: p(24);
          }
        }
      }
    }

    /*精选频道*/
    .has-title .select-title{
      text-align: center;

      .import-choose{
      	letter-spacing: 0.1rem;
        margin-bottom: p(5);
        font-weight: 550;
        color: #666;
      }
      .pTitle{
        color: $bgBlue;
      }
    }
    .selection-pro{

      .selection-pro-main{
        padding: p(15) p(15);
        /*display: flex;*/
        /*justify-content: space-evenly;*/

        .selection-pro-row{
          margin: p(10) 0 p(30) 0;
          width: 25%;
          /*box-sizing: border-box;*/
          /*border: p(1) solid #ccc;*/
          text-align: center;
          height: p(180);

          .img-wai{
            display: inline-block;
            width: 80%;
            /*height: p(100);*/
            overflow: hidden;
            text-align: center;

            .select-pic{
              width: 100%;
              /*height: p(90);*/
            }
          }

          .select-word{
            margin-top: p(27);
          }
          /*.item-line{*/
            /*width: p(60);*/
            /*height: p(10);*/
            /*background: #444444;*/
            /*display: inline-block;*/
            /*text-align: center;*/
          /*}*/
        }
        .import-choosemore-btn{
          height: p(100);
          text-align: center;
          margin-top: p(50);

          .checkMoreImg{
            width: p(40);
            margin-top: p(25);
          }

          .more-item{
            margin-top: p(20);
            padding-left: p(20);
          }
          .more-item:after{
            content: ' >';
          }
        }
      }
    }

    /*品牌产品*/
    .brand-store{

      .brandpro-main{
        padding: 0 p(20);
        .pro-pic-row{
          width: 25%;
          height: p(170);
          padding: p(2);
          box-sizing: border-box;
          text-align: center;
          /*border: p(1) solid #ccc;*/
          .pro-pics{
            width: 100%;
          }
        }

        .more-brand{
          width: 25%;
          height: p(170);
          text-align: center;
          line-height: p(37);
          box-sizing: border-box;
          /*border: p(1) solid #ccc;*/
          .word-btn{
            display: inline-block;
            width: p(60);
            position: absolute;
            top: 50%;
            margin-top: p(-40);
            left: 50%;
            margin-left: p(-30);

            /*<!--margin-top: p(-20);-->*/
          }
        }
      }
    }

    .brand-adv-content{
      padding-bottom: p(20);
      .brand-adv-main{
        width: 100%;
        text-align: center;
        margin-bottom: p(20);
        .title{
          margin-top: p(20);
        }
        .title,.banner-pic{
          padding: 0 p(20);
        }

        .banner-pic{
          width: 100%;
          padding: 0 p(15);

          .big-img{
            width: 100%;
            border-radius: p(20);
          }
        }
        /*产品详细及价格*/
        .pro-pri-main{
          width: 100%;
          padding: 0 p(10);
          .pro-pai-row{
            width: 33.33%;
            padding: 0 p(10);
            .row-inner{
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: p(2) solid #d9d9d9;
              border-radius: p(10);
              padding: 0 p(10);

              .pro-name{
                margin-top: 0.5rem;
                line-height: 2.2rem;
                text-align: left;
                height: 4.4rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;  //这里是在第二行有省略号
                overflow: hidden;
                font-size: 1.6rem;
              }

              .pro-fenqi-price{
                margin-top: 1rem;
                color: $qianhong;
              }

              .pro-fenqi-price{
                margin-top: 0.5rem;
                text-align: left;
              }
              .pro-price{
                margin: 0.5rem 0 0.5rem 0;
                color: #9d9d9d;
                text-align: left;
              }
              .pro-img{
                display: inline-block;
                margin-top: 0;
                /*width: 100%;*/
                height: p(160);
              }
            }
          }
        }
      }
    }
    /*产品价格及详细列表*/
    .today-recom-content{
      width: 100%;
      /*引入组件*/
    }

    .black-cover{
      position: fixed;
      z-index: 9;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: black;
      opacity: 0.3;
    }
  }
</style>

