<template>
	<div class="exchange-point" v-title data-title="积分兑换">
  		<div style="width: 100%; height: 0.1rem;"></div>
	    <scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire"  :scrollbar-y = true ref="myScroller">
			<div class="">
				<div class="banner">
          <a :href="data.url" v-for="data in bannerList">
					  <img :src="data.imgUrl" :alt="data.name"/>
          </a>
				</div>
				<div class="list">
					<ul>
            <li class="f-oh" v-for="data in proDetailData">
              <div class="img f-fl">
                <img :src="data.logo"  @click="excharge(data)"/>
              </div>
              <div class="text f-fl">
                <p class="name"  @click="excharge(data)">{{data.name}}</p>
                <p class="other">
                  <span class="point">{{data.integral}}积分</span>
                  <span class="price">价值:¥{{data.marketPrice}}</span>
                  <span class="btn f-fr" @click="excharge(data)">点击兑换</span>
                </p>
              </div>
            </li>
					</ul>
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
	import { Scroller } from 'vux'
  	import { Toast} from "mint-ui";
  	import $ from "jquery"; //导入jquery
  	import axios from 'axios'
  	import comLink from "../common/common_link"; //导入总线
	export default{
		data(){
			return{
        proDetailData: [], //积分商品列表
        isRequest: false,
        bannerList: [],  //banner图
        searchData: {
          // keyword : '',
          // maxPrice : '',
          // minPrice : '',
          pageNum : 1,
          pageSize : 10,
        },
			}
		},
    mounted() {
      this.getBanner();
      this.searchProAxios();
    },
		methods:{
      //搜索产品
      searchProAxios:function(){
        var vm=this;
        $.ajax({
          url:comLink.yxtHost + '/product/integralProducts',
          data:{
            // keyword : vm.searchData.keyword,
            // maxPrice : vm.searchData.maxPrice,
            // minPrice : vm.searchData.minPrice,
            pageNum : vm.searchData.pageNum,
            pageSize : vm.searchData.pageSize,
            // categoryId : vm.brandId,
            // sortBy : this.searchData.sortBy,
            // sortDir : this.searchData.sortDir,
            openid : sessionStorage.openid
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.proDetailData = data.data;
              for(var i = 0,l = vm.proDetailData.length;i<l ;i ++){
                vm.proDetailData[i].logo = comLink.yxtImgHost + vm.proDetailData[i].logo
              }
            } else {
              Toast({
                message: res.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //立即兑换
      excharge(data) {
        this.$router.push({
          path: '/home/jifenproDetailRouter',
          query: {
            'id': data.id
          }
        })
      },
      //banner图
      getBanner() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/product/banner',
          data: {},
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.bannerList = resp.data;
              if(vm.bannerList.length > 0) {
                for(var i = 0; i < vm.bannerList.length; i ++){
                  vm.bannerList[i].imgUrl =  comLink.yxtImgHost + vm.bannerList[i].imgUrl;
                }
              }
            }else{
              Toast({
                message: res.msg,
                duration: 2000
              });
            }
          }
        })
      },

			scrollerRequire(){
        if(this.isRequest){
          this.searchData.pageNum++;
          this.isRequest = false;
          var vm = this;
          sessionStorage.setItem('homeSearchWord',vm.searchData.keyword);
          $.ajax({
            url:comLink.yxtHost + '/product/integralProducts',
            data:{
              // keyword : vm.searchData.keyword,
              // maxPrice : vm.searchData.maxPrice,
              // minPrice : vm.searchData.minPrice,
              pageNum : vm.searchData.pageNum,
              pageSize : vm.searchData.pageSize,
              // categoryId : vm.brandId,
              // sortBy : this.searchData.sortBy,
              // sortDir : this.searchData.sortDir,
              openid : sessionStorage.openid
            },
            dataType:'json',
            type:'post',
            success:function (data) {
              setTimeout(function(){//todo
                vm.isRequest = true;
              },2000);
              if(data.code == 1){
                if(data.data && data.data.length > 0){
                  let newData = data.data;
                  for( var i = 0,l = newData.length;i < l;i ++){
                    newData[i].logo = comLink.yxtImgHost + newData[i].logo;
                  }
                  vm.proDetailData = vm.proDetailData.concat(newData);
                }else{
                  vm.searchData.pageNum--;
                }
              }else{
                vm.searchData.pageNum--;
              }
            }
          })
        }
			}
		},
    	components :{
      		Scroller,
      		Toast
		}
	}
</script>

<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
.exchange-point{
    background: #fff;
    .banner{
    	width: 100%;
    	/*height: p(220);*/
    	img{
    		width: 100%;
    	}
    }
    .list{
    	ul{
    		li{
    			padding: 0 p(15);
    			height: p(252);
    			width: 100%;
    			box-sizing: border-box;
    			border-bottom: p(1) solid #dfdfdf;
    			.img{
    				width: 25%;
    				height: p(252) ;
    				img{
    					width: 100%;
    					display: inline-block;
    					margin-top:p(25) ;
    					/*height: p(192);*/
    				}
    			}
    			.text{
    				width: 75%;
    				padding-top:p(25) ;
    				padding-left: p(15);
    				.name{
    					font-size: p(28);
						line-height: p(40);
						color: #333333;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
    				}
    				.other{
    					margin-top: p(60);
    					.point{
    						font-size: p(28);
							line-height: p(30);
							color: #f66800;
    					}
    					.price{
    						font-size: p(22);
							line-height: p(30);
							color: #b1b1b1;
    					}
    					.btn{
    						width: p(148);
							height: p(56);
							background-color: #307ff5;
							border-radius: p(5);
							color: #fff;
							text-align: center;
    						font-size: p(26);
							line-height: p(56);
							margin-right:p(20) ;
    					}
    				}
    			}
    		}
    	}
    }
}
</style>
