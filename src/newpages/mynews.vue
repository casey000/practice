<template>
	<div class="mynews-con" v-title data-title="我的消息">
	    <scroller height="-0.01" lock-x  @on-scroll-bottom="scrollerRequire"   ref="myScroller">
			<div>
		      <ul class="news-list">
		        <li v-for="data in msgList" v-if="msgList.length > 0">
		          <p class="time">{{data.createTime}}</p>
		          <div class="detail" @click="readMsg(data)">
		            <div class="mes  f-oh">
		              <div class="img f-fl">
		                <img v-if="data.icon" :src="data.icon"/>
		                <img v-else src="../../static/img/defaultImg.png">
		              </div>
		              <div class="text f-fl">
		                <p class="name">{{data.title}}</p>
		                <p class="des">{{data.content}}</p>
		                <p class="number" v-if="data.no"><span>订单编号:</span>{{data.no}}</p>
		              </div>
		            </div>
		            <div class="search" v-if="data.no">
		            	<span class="yidu" v-if="data.state == 0"></span>		<!-- 拥有yidu的class  即为未读的信息-->
		            	查看详情<i class="icon iconfont icon-more fontSize-16 f-fr"></i>
		            </div>
		          </div>
		        </li>
		        <li v-else>
		          暂无数据
		        </li>
		      </ul>
			</div>
		</scroller>

	</div>

</template>

<script>
  	import comLink from "@/common/common_link"; //导入总线
  import { Swiper,GroupTitle, SwiperItem ,Scroller} from 'vux'

    import { Indicator, Toast, Popup, DatetimePicker, MessageBox} from "mint-ui";
	export default{
		data(){
			return{
        isRequest: true,
        queryData:{//滚动请求的方法
          pageNum: 1,
          pageSize: 10,
          openid: sessionStorage.openid,
          insideId: sessionStorage.insideId
        },
        msgList: [], // 消息列表
        insideId: null, // 接口返回的insideId
			}
		},
		components:{
			Swiper,
		    SwiperItem,
		    GroupTitle,
		    Scroller
		},
		mounted() {
      this.getmsgList();
    },
		methods: {
      //消息列表
      getmsgList() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/message/getPage',
          data: vm.queryData,
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.msgList = resp.data.page.list;
              vm.insideId = resp.data.insideId;
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
     scrollerRequire(){
       if(this.isRequest){
         this.queryData.pageNum++;
         this.isRequest = false;
         var vm = this;
         $.ajax({
           url:comLink.yxtHost + '/message/getPage',
           data: vm.queryData,
           dataType:'json',
           type:'post',
           success:function (data) {
             setTimeout(function(){//todo
               vm.isRequest = true;
             },2000);
             if(data.code == 1){
               vm.msgList = vm.msgList.concat(data.data.page.list) ;
             }else{
               vm.queryData.pageNum--;
             }
           }
         })
       }
     },
      //阅读消息
      readMsg(data) {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/message/readMsg',
          data: {
            'openid': sessionStorage.openid,
            'insideId': sessionStorage.insideId,
            'id': data.id
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              if(data.insideOrderId != undefined) {
                vm.$router.push({
                  path: '/indusorder/orderDetail',
                  query: {
                    'orderId': data.insideOrderId
                  }
                })
              } else {
                if(data.no != null && data.no != undefined) {
                  if(data.status == 1) {
                    vm.$router.push({
                      path: '/order/daiFuKuan',
                      query: {
                        'orderId': data.orderId
                      }
                    })
                  }
                  if(data.status == 2) {
                    vm.$router.push({
                      path: '/order/daiFaHuo',
                      query: {
                        'orderId': data.orderId
                      }
                    })
                  }
                  if(data.status == 3) {
                    vm.$router.push({
                      path: '/order/daiShouHuo',
                      query: {
                        'orderId': data.orderId
                      }
                    })
                  }
                  if(data.status == 4) {
                    vm.$router.push({
                      path: '/order/daiPingJia',
                      query: {
                        'orderId': data.orderId
                      }
                    })
                  }
                  if(data.status == 5) {
                    vm.$router.push({
                      path: '/order/shouHouZhong',
                      query: {
                        'orderId': data.orderId
                      }
                    })
                  }
                  if(data.status == 6) {
                    vm.$router.push({
                      path: '/order/daiShouHuo',
                      query: {
                        'orderId': data.orderId
                      }
                    })
                  }
                  if(data.status == '-1') {
                    vm.$router.push({
                      path: '/order/daiFuKuan',
                      query: {
                        'orderId': data.orderId
                      }
                    })
                  }
                } else {
                  //秒杀提醒
                  vm.$router.push({
                    path: '/timeBuy',
                    query: {
                      'orderId': data.orderId
                    }
                  })
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
      }
    }
	}
</script>

<style lang="scss" scoped="scoped">
  	@import "@/../src/sass/public.scss"; //导入scss初始文件
	.mynews-con{
		width: 100%;
		padding:0 p(30);
		box-sizing: border-box;
		.news-list{
			width:100%;
			padding-bottom:p(40);
			li{
				.time{
					width: p(270);
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
					box-sizing: border-box;
					background-color: #FFF;
					height:p(310);
					.mes{
						border-bottom: 1px dashed #eee;
						.img{
							width: 22%;
							height: p(256);
							img{
								width: p(100);
								display: inline-block;
								margin: p(35) p(26);
								height: p(100);
							}
						}
						.text{
							width: 78%;
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
						>span{
							display: inline-block;
							border-radius: 50%;
							border:p(1) solid #ccc;
							width: p(20);
							height: p(20);
							box-sizing: border-box;
						}
						>span.yidu{
							display: inline-block;
							border-radius: 50%;
							background-color: red;
							width: p(20);
							height: p(20);
							border: none;
						}
					}

				}
			}
		}
	}
</style>
