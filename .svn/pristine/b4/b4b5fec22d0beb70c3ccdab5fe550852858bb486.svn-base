<template>
	<div class="mynews-con">
		<scroller height="-50" lock-x  @on-scroll-bottom="scrollerRequire"   ref="myScroller">
			<div>
				<ul class="news-list">
					<li>
						<p class="time">2018年10月28日</p>
						<div class="detail">
							<div class="mes  f-oh">
								<div class="img f-fl">
									<img src="../../../static/img/goods4.png"/>
								</div>
								<div class="text f-fl">
									<p class="name">商品已签收</p>
									<p class="des">您购买的[多喜爱家纺 新品简色（北欧简约）]已签收！</p>
									<p class="number"><span>运单编号:</span>1078365865874（顺丰）</p>
								</div>
							</div>
							<div class="search">
								查看详情
		          				<i class="icon iconfont icon-more fontSize-16 f-fr"></i>
							</div>
						</div>
					</li>
					<li>
						<p class="time">2018年10月28日</p>
						<div class="detail">
							<div class="mes  f-oh">
								<div class="img f-fl">
									<img src="../../../static/img/goods2.png"/>
								</div>
								<div class="text f-fl">
									<p class="name">商品已签收</p>
									<p class="des">您购买的[多喜爱家纺 新品简色（北欧简约）]已签收！</p>
									<p class="number"><span>运单编号:</span>1078365865874（顺丰）</p>
								</div>
							</div>
							<div class="search">
								查看详情
		          				<i class="icon iconfont icon-more fontSize-16 f-fr"></i>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</scroller>
	</div>
</template>

<script>
  	import comLink from "@/common/common_link"; //导入总线
  import { Swiper,GroupTitle, SwiperItem ,Scroller} from 'vux'
  	
	export default{
		data(){
			return{
				
			}
		},
		components:{
			Swiper,
		    SwiperItem,
		    GroupTitle,
		    Scroller
		},
		methods:{
			scrollerRequire(){
				
			}
		}
		
	}
</script>

<style lang="scss" scoped="scoped">
  	@import "@/../src/sass/public.scss"; //导入scss初始文件
	.mynews-con{
		width:100%;;
		height: auto;
		padding:0 p(30);
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