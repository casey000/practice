<template>
  <div class="pro-detail-content" v-title data-title="组合产品">
  	<div id="searchBar">
        <!--<div class="nav-content b-white">
          <ul class="nav-main f-oh">
            <li class="nav-row f-fl" @click="toMyCenter()">
              <dt class="row-inner f-oh">
                <i class="icon iconfont icon-account f-fl fontSize-18"></i>
                <p class="f-fl fontSize-15">个人中心</p>
              </dt>
            </li>
            <li class="nav-row f-fl">
              <dt class="row-inner f-oh" @click="getQrcode()">
                <i class="icon iconfont icon-erweima f-fl fontSize-18"></i>
                <p class="f-fl fontSize-15">二维码</p>
              </dt>
            </li>
          </ul>
        </div>-->

        <div class="pro-infos f-oh">
          <div class="pro-main-pic b-white f-fl">
            <div class="pic-show-here f-pr">


              <swiper :list="lunboUrl"
                      style="margin:0 auto;"
                      height="43.8rem" dots-class="custom-bottom"
                      dots-position="center">
              </swiper>
              <!--<mt-swipe :auto="100000000000000000000000000000">-->
              <!--<mt-swipe-item v-for="(item,i) in lunboUrl" class="f-oh" :key="i">-->
                <!--<img class="slideshow-pic f-fl" :src=item.img alt="">-->
              <!--</mt-swipe-item>-->
              <!--</mt-swipe>-->
            </div>
            <div class="pro-details p-lef-rig20 fontSize-14 f-oh">
              <!--<span class="pro-name m-top10 f-fl"> <span class="brand w-color f-fl m-right5">品牌</span>{{productData.name}}</span>-->
              <p class=" m-top10 ">{{comTitle}}</p>
              <p class=" m-top15 ">{{comremark}}</p>
              <p class=" m-top15 ">搭配价: <span style="font-size: 1.5rem;color: red">¥</span><span class="price" style="padding-left: 0">{{comprice}}</span>  <span class="f-fr time">活动截止：{{endtime}}</span></p>
            </div>
          </div>
          <!--<div class="fenqi-ways  m-top10 b-white fontSize-15 f-fl">
            <div class="fenqi-name p-lef-rig20">分期方式</div>
            <div class="pro-fenqi-detail p-lef-rig20 fontSize-11">
              <dt class="detail-main f-oh" v-for="(item,i) in productData.periodShowArray" :key="i">
                <i class="detail-num w-color f-fl fontSize-6">{{i+1}}</i>
                <p class="detail-word f-fl ">￥{{item}}</p>
              </dt>
            </div>
            <div class="price-main p-lef-rig20 f-oh">
              <dt class="new-price f-fl fontSize-15 m-right15" v-if="productData.mallPrice > 0">商城价：￥{{productData.mallPrice}}</dt>
              <s class="old-price f-fl fontSize-10">市场价：￥{{productData.marketPrice}}</s>
              <dt class="f-fr fontSize-12">已售{{productData.sale}}</dt>
            </div>
          </div>-->
        </div>
    <!--上次到这里-->
        <!--<div class="check-bounty-content p-lef-rig20 f-oh b-white" @click="jinglijin()">
          <img class="img-pic f-fl" :src=jianglijinIcon alt="">
          <p class="word f-fl fontSize-14">查看可赚取奖励金</p>
        </div>-->
        <div v-if="isShowJianglijin" class="jianglijin">
          <span class="fontSize-15 p-lef-rig24">提示</span>
          <span class="p-lef-rig24 fontSize-14" style="color: #666;">您自己购买可获得{{productData.shareMoney}}元(仅供参考)</span>
          <span class="fontSize-15 know" @click="blockClick">知道了</span>
        </div>
        <!--<div class="brand-store-name b-white p-lef-rig20 f-oh" @click="toStore()">
          <dt class="img-main m-right10 f-fl">
            <img class="img-pic" :src=brandData.logo alt="">
          </dt>
          <dt class="store-word fontSize-16 b-white f-fl">{{brandData.storeName}}</dt>
        </div>-->

        <!--<div class="collect-pro-comm b-white">
          <ul class="collect-pro-comm-main f-oh">
            <li class="collect-pro-comm-row f-fl">
              <dt class="fontSize-14">{{brandData.enshrineCount}}</dt>

              <dt class="fontSize-12 collect">收藏</dt>
            </li>
            <li class="collect-pro-comm-row f-fl">
              <dt class="fontSize-14">{{brandData.count}}</dt>

              <dt class="fontSize-12 collect">全部商品</dt>
            </li>
            <li class="collect-pro-comm-row f-fl">
              <dt class="fontSize-14">{{brandData.commentCount}}</dt>
              <dt class="fontSize-12 collect">评论</dt>
            </li>
          </ul>
        </div>-->
      <div v-if="isShowQRCode" class="QRCode-main p-lef-rig24">
        <div class="QRCode-img">
          <!--<img :src=productData.logo >-->
          <img :src=qrcodeUrl >
        </div>
        <!--<div class="img-outside">
          <img class="QRcode-pro-img" :src=qrcodeUrl alt="">
        </div>
        <span class="fontSize-14 name" style="-webkit-box-orient: vertical;">{{productData.name}}</span>
        <span class="price">￥{{productData.mallPrice}}</span>-->
        <i class="icon iconfont icon-close close-QRcode" @click="blockClick"></i>
      </div>
				<div class="mix-pro-comm b-white">
						<p class="mix-pro-comm-title fontSize-14">搭配商品</p>
						<div class="mix-pro-comm-lunbo" >
							<ul>
								<li v-for="(pro,i) in detailpro" :key="i" class="goodslist">
                    <!--<div class="quanquan" @click=danxuanClick(pro,i)>
	                    <i v-if="pro.productChecked" class="iconfont icon-chenggong"></i>
	                    <i v-else  class="iconfont icon-not_Selected-copy"></i>
                    </div>-->
                    <div class="imgBox" @click="toProDetail(pro)">
                      <img :src="pro.logo" alt="">
                    </div>
                    <div class="content">
	                    <div class="proname fontSize-14 ellipsis">{{pro.name}}</div>

	                    <div class="price">￥ <span class="comprice">{{pro.marketPrice}}</span>
	                    	<span class="skuname" v-for="(pro,k) in parName[i]"  style="padding-left: 1rem;">{{pro}}</span>
	                    </div>
	                    <!--<div class="ellipsis-rows fontSize-12 f-fr">{{pro.periodShow}}</div>-->


	                    <p class="fontSize-14 m-top5 " @click="showBuyNow(pro.id,i)">
	                    	请选择规格 <span class="fontSize-12"></span>
	                    	<i class="icon iconfont icon-more f-fr fontSize-14" ></i>
	                    </p>
                    </div>
                </li>
                <!--<li>
                    <div class="quanquan" @click=danxuanClick()>
	                    <i v-if="xuanzhong" class="iconfont icon-chenggong"></i>
	                    <i v-else  class="iconfont icon-not_Selected-copy"></i>
                    </div>
                    <div class="imgBox" >
                        <img :src="picSrc" alt="">
                    </div>
                     <div class="content">
                        <div class="proname fontSize-14 ellipsis">小米8现货 新正品小米8现货 新正品小米8现货 新正品小米8现货 新正品</div>-->
                        <!--<div class="ellipsis-rows" v-if="!showDeletebtn">{{proItem.skuName}}</div>-->
                        <!--<div class="price">￥3999</div>

                        <p class="fontSize-14 m-top5">请选择规格  <i class="icon iconfont icon-more f-fr fontSize-14" ></i></p>
                      </div>
                </li>-->
							</ul>
						</div>
				</div>
				<div class="other-mix b-white m-top10" style="padding-bottom: 11rem;" v-if="otherCombine.length > 0">
						<p class="other-pro-comm-title fontSize-14">其他搭配</p>
						<ul>
							<li v-for="(item,i) in otherCombine" @click="jumpOther(item)">

									<div class="imgBox f-fl">
										<img :src=item.imgPath alt="">
									</div>
									<div class="content">
										<p class="proname fontSize-16" style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
											{{item.title}}
										</p>
										<dt style="height: 7.2rem; overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;">
											<dd v-for="(pro,j) in item.productList" class="fontSize-12" style="line-height: 1.8rem;">
												<span>{{j+1}}:</span>{{pro.name}}
											</dd>
										</dt>
										<p class="price fontSize-15">搭配价:<span>¥{{item.combinationPrice}}</span></p>
									</div>
							</li>
						</ul>
				</div>
      <div class="other-mix b-white m-top10" style="padding-bottom: 11rem;min-height: 0" v-else>

      </div>

		</div>


    <!--&lt;!&ndash;弹出二维码&ndash;&gt;-->
    <!--<div v-if="isShowQRCode" class="QRCode-main p-lef-rig24">
      <div class="QRCode-img">

      	<img :src=qrcodeUrl >
      </div>

      <i class="icon iconfont icon-close close-QRcode" @click="blockClick"></i>
    </div>-->
    <div v-if="isBlackCoverShow" class="blackCoverShow" @click="blockClick"></div>

    <!--&lt;!&ndash;产品规格弹窗&ndash;&gt;-->
    <div class="show-buynow-popup" v-if="isShowBuyNowPop && goodsId==pro.id && goodsIndex == i"  v-for="(pro,i) in detailpro" :key="i">
      <div class="popup-main">
        <div class="pro-img-infos f-oh">
          <img class="buy-now-headprofile f-fl" :src=productData[i].logo alt="">
          <div class="pro-word f-fl" style="width: 100%">
            <p class="pro-name fontSize-13">{{productData[i].name}}</p>
            <p class="pro-price fontSize-15" >￥{{skuPrice[goodsIndex]}}<span class="fontSize-15" style="text-decoration: line-through;color: gray;float: right">￥{{skuSourcePrice[goodsIndex]}}</span></p>
          </div>
        </div>

        <!--&lt;!&ndash;产品规格选择&ndash;&gt;-->

        <div class="choose-spec" >
          <ul class="spec-main fontSize-14">
          	<li class="spec-main-row f-oh">
              <p class="choose-title f-fl">库存：</p>
               <span class=" f-fl" style="padding: 1rem 0 0 2rem;">{{storeNum}}</span>
            </li>
            <li class="spec-main-row" v-for="(spec,k) in shaixuanData[i]" :key="k">
              <p class="choose-title f-fl">{{spec.attrName}}：</p>
              <div class="choose-detail f-fl f-oh">
                  <span class="choose-option f-fl"
                        v-for="(item,j) in spec.attrValue" :key="j"
                        :class="{'activeColor' : item.checked, 'activeNoneColor' : item.checked && storeNum <= 0}"
                        @click = 'chooseItem(spec,item,k, $event)'
                  >{{item.attrValueName}}</span>
              </div>
            </li>
            <!--<li class="spec-main-row choosefenqi">
              <p class="choose-title f-fl">分期选择：</p>
              <div class="choose-detail f-fl f-oh">
                  <span class="choose-option f-fl"
                        v-for="(item,j) in fenqiShu" :key="j"
                        @click="chooseFenqi(item,j)"
                        :class="{activeColor : item.checked}"
                  >{{item.title}}</span>
              </div>
            </li>-->
            <li class="spec-main-row f-oh">
              <p class="choose-title f-fl">数量：</p>
              <div class="choose-detail add-reduce-main f-fl f-oh" style="border: none;">
                <!--<p class="add-reduce-btns f-fl" @click="reduceBtn">-</p>-->
                <span class="buy-total-num f-fl" >{{buyCount}}</span>
                <!--<p class="add-reduce-btns f-fl" @click="addBtn">+</p>-->
              </div>
            </li>
          </ul>
        </div>
        <div class="addCart-confirm-btns fontSize-16 f-oh">
          <!--<dt class="addCart addCart-confirm-btn f-fl" @click="addBuyCart()">加入购物车</dt>-->
          <!--<router-link class="router" to="/home/confirmOrderRouter">-->
          <!--<dt class="confirm addCart-confirm-btn f-fl" @click="confirmOrder()">确定</dt>-->
          <dt class="confirm addCart-confirm-btn f-fl" @click="confirm()">立即购买</dt>

          <!--</router-link>-->
        </div>
      </div>
    </div>
		<div class="show-buynow-popup" v-if="xuanFenqi">
			<div class="popup-main">
			 <div class="choose-spec"  style="border: none;">
          <ul class="spec-main fontSize-14" style="padding: 8rem 0;">
          	<li class="spec-main-row choosefenqi">
              <p class="choose-title f-fl" style="width:25%">组合购分期：</p>
              <div class="choose-detail f-fl f-oh">
                  <span class="choose-option f-fl"
                        v-for="(item,j) in fenqiShu" :key="j"
                        @click="chooseFenqi(item,j)"
                        :class="{activeColor : item.checked}"
                  >{{item.title}}</span>
              </div>
            </li>
          </ul>
       </div>
        <div class="addCart-confirm-btns fontSize-16 f-oh">

          <dt class="confirm addCart-confirm-btn f-fl" @click="confirmOrderAxios()">立即购买</dt>


        </div>
     </div>
		</div>
    <!--显示可获得奖励金弹窗-->
    <div v-if="isShowMaiJianglijin" class="maiJiangli">
      <span class="fontSize-15 money">赚{{shareMoney}}元</span>
      <span class="fontSize-12 warn p-lef-rig24">只要你的好友通过你的链接购买此商品，你就能得到至少{{shareMoney}}元的奖励金</span>
      <div class="btns">
        <span class="share fontSize-15">
          <i class="icon iconfont icon-fenxiang m-right5 tag-read" :data-clipboard-text=productUrl @click="copy">分享</i>
        </span>
        <i class="white"></i>
        <span class="QRcode fontSize-15" @click="getQrcode"><i class="icon iconfont icon-erweima m-right5"></i>二维码</span>
      </div>
    </div>
    <!--<div class="tishi-fenxiang-pop f-oh" v-if="isShowFenxiang">
      <div class="jiantou">
        <img :src=jiantouImg alt="">
      </div>
      <div class="word">
        <span class="f-fl">点击右上角的</span>
        <img class="f-fl" :src=menuImg alt="">
        <span class="f-fl">去分享</span>
      </div>
      <span>不要让利润跑掉哦</span>
    </div>-->
    <!--&lt;!&ndash;底部导航&ndash;&gt;-->
    <div class="buy-btn-content b-white f-oh">
      <!--<ul class="feature-btn f-fl f-oh fontSize-12">
        <li class="feature-btn-row f-fl" @click='featureBtnCLick(item,index)'
            v-for="(item,index) in featureBtnLists" :key="index">
            <img class="inner-img f-db" :src=item.iconPic v-if="isCollectPro">
            <img class="inner-img f-db" :src=item.cancelIcon v-else>
            <p class="li-inner btn-name m-top5 f-db fontSize-12">{{ item.word }}</p>
        </li>
        <li class="feature-btn-row f-pr f-fl" @click='carBtn()'>
          <img class="inner-img  f-db" :src=buyCarIcon>
          <p class="li-inner btn-name m-top5 f-db fontSize-12">购物车</p>
          <i class="superscript" v-if="carCount > 0">{{carCount}}</i>
        </li>
      </ul>-->
      <div class="f-fl f-oh dapeiprice">
      	<p class="fontSize-16 ">搭配价: <span>¥{{allprice}}</span> </p>
      </div>

      <!--开售并未购买过-->
      <div class="buy-btn f-fr fontSize-15" v-if="setTime == ''">
        <div class="btn-wai f-fl f-oh">
          <span class="btn-inner f-fr buy" @click="showFenqi()">买</span>
        </div>
        <div class="btn-wai f-fl f-oh">
          <span class="btn-inner f-fr sale" @click="maijianglijin">卖</span>
        </div>
      </div>
      <!--未售-->
      <div class="daishou" v-if="setTime != ''" style="float:right;">
        <div class="daishoubtn" style="width: 100%;text-align: center">
          <span class="">{{setTime}}</span>
        </div>
      </div>

      <!--<div class="buy-btn f-fr fontSize-15" >
        <div class="btn-wai f-fl f-oh">
          <span class="btn-inner f-fr buy" @click="showFenqi()">买</span>
        </div>
        <div class="btn-wai f-fl f-oh">
          <span class="btn-inner f-fr sale" @click="maijianglijin">卖</span>
        </div>
      </div>-->
      <div v-if="isShowShare" class="share-popup"></div>


    </div>
  </div>
</template>
<style>


</style>
<script>
  import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
  import { Navbar, TabItem ,Indicator, Toast, Popup, DatetimePicker,MessageBox } from "mint-ui";
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
//import '../../../../common/jq.min';
  import Clipboard from 'clipboard';

   export default{
     inject: ['reload'],
     data () {
       return {
         setTime: '预售中...',
       	 xuanFenqi:false,
       	 allprice:0,//搭配总价
       	 comprice:'',
       	 comTitle:'',
       	 comremark:'',
       	 endtime:'' ,//活动截止时间
         carCount : '',
         selecteda: '1',
         isShowMaiJianglijin : false,
         isShowJianglijin : false,
         isBlackCoverShow : false ,
         isContactWaysShow : false,
         isShowBuyNowPop : false,
         isShowQRCode : false,
         isShowFenxiang : false,
         isShowShare : false,
         buyNum : null,
         activeNum : 0,
         buyInfosLists : null,
         // selected : '1',
         productId : '',
         productUrl : '',
         // demo03_list: demoList,
         picSrc : '@/../static/img/home/brand_store/pro_detail.png',
         jianglijinIcon : '@/../static/image/home/brand_store/jianglijin_01.png',
         featureBtnLists : [
           {
             iconPic : '@/../static/image/home/brand_store/contact_01.png',
             cancelIcon : '@/../static/image/home/brand_store/contact_01.png',
             word : '客服',
           },
           {
             iconPic : '@/../static/image/home/brand_store/homePage_01.png',
             cancelIcon : '@/../static/image/home/brand_store/homePage_01.png',
             word : '首页',
           },
           {
             iconPic : '@/../static/image/home/brand_store/collect_01.png',
             cancelIcon : '@/../static/image/home/notCollect.png',
             word : '收藏',
           },
           // {
           //   iconPic : '@/../static/image/home/brand_store/buycart_01.png',
           //   cancelIcon : '@/../static/image/home/brand_store/buycart_01.png',
           //   word : '购物车',
           // },
         ],//底部导航
         buyCarIcon : '@/../static/image/home/brand_store/buycart_01.png',
         proDetailData : {},//产品细节全部资料
         productData : {},//产品细节--Product
         shareMoney : 0,
         brandData : {},//店铺信息
         shaixuanData : [],//筛选规格选择
         skuShowLists : [],//sku展示列表
         buyCount : 1,//购买数
         fenqiShu : [
           // {
           //   title: '',
           //   checked : false,
           //   num : ''
           // },
         ],//分期数
         fenqiXuanzhongNum : '',//选中分期数
         fenqiArr:[],  //分期数组
         storeNum:"请选择规格",
         skuProObj : '',//选中的sku对象选取不规格 显示不同价格
         skuPrice : [],
         skuSourcePrice : [],
         selected : {
           chooseI : 0,
           chooseJ : 0,
          },
         specParamsIDArr:[],//规格字符串,隔开
         skuId : null,//skuid
         jiantouImg : '@/../static/image/home/brand_store/jiantou.png',
         menuImg : '@/../static/image/home/brand_store/menu.png',
         qrcodeUrl:null,//二维码地址
         lunboUrl : [

         ],
         pageNum : 1,
         pageSize : 10,
         content : '',//产品规格详情
         comContent : [],
         guigeContent : '',//规格详情
         shouHouSevice : '',
         isCollectPro : false,//是否收藏了商品
         isCollectStore : false,//是否收藏了店铺
         collectStore : '收藏店铺',
         videoSrc : '@/../static/image/test_video.mp4',//视频地址
         isShowVideo : false,
         detailpro:[],//组合详情
         detaillength:'',//组合商品总长度
         goodsIndex:'',//具体商品的index
         specgoodsIDArr:[],//组合商品id字符串,隔开
         skujiheArr:[],		//所有sku集合数组
         skujiheStr:'',		//所有sku集合字符串
         maingoodsId:'',  //主商品id
         otherCombine:[], //其他组合
         parName:[],
         goodsId:'',
         zongjia:[],
         flag:true,
       }
     },
     methods : {
//   		danxuanClick(item,j){
//					item.productChecked = !item.productChecked;
//					this.detailpro.splice(100,0)
//					console.log(item)
//   		},
       getShareUrl() {
         let hash = window.location.hash;
         var vm = this;
         $.post(comLink.yxtHost + '/product/getShareProductUrl', {
           "openid" : (sessionStorage.openid == undefined || sessionStorage.openid == null || sessionStorage.openid == 'undefined' || sessionStorage.openid == 'null') ? '' : sessionStorage.openid,
           "id" : hash.split('=')[1]
         }, function(resp) {
           vm.productUrl = resp.data;
         });
       },
			toProDetail(pro){
        this.$router.push({
          path : '/home/proDetailRouter',
          query : { id : pro.id}
        })
      },
       showFenqi(){
        this.isBlackCoverShow = true;
       	this.xuanFenqi=true;
       },
     		jumpOther(item){
     			 this.$router.push({
	           path: '/home/mixproDetailRouter',
	           query: { id: item.id}
	         })
			  	this.reload();

     		},
       //倒计时
       daojishi(leftTime){//173057506
         if(leftTime > 0) {
           var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天
           var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
           var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
           var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
           this.setTime =
             (days > 0 ? (days +"天") : '') +
             (hours < 10? '0'+hours:hours)+"小时" +
             (minutes < 10 ? '0'+minutes : minutes)+"分"+
             (seconds < 10 ? '0'+seconds:seconds)+"秒后开售";
         } else {
           this.setTime = '';
         }

       },
       carBtn(){
         this.$router.push({
           path : '/cart'
         })
       },
       //
       clickNavBtns(){
         if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
           Toast({
             message: '请先登陆',
             duration: 2000
           });
           return;
         }
         if(this.isCollectStore){
           MessageBox.confirm('确定取消收藏?').then(action => {
             this.collectStoreAxios();
             this.brandData.enshrineCount --;
           });
         }else{
           this.collectStoreAxios();
           this.brandData.enshrineCount ++;
         }
       },
       //进入店铺
       toStore(){
         this.$router.push({
           path : '/home/brandStoreRouter',
           query : {
             brandId : this.brandData.id
           }
         })
       },
      	//选择单独商品规格
      	confirmsku(){

      	},
      	 //显示 立即购买 弹窗
       showBuyNow : function(goodsid,index){
       		this.goodsId=goodsid
         	this.isShowBuyNowPop = true;
         	this.isBlackCoverShow = true;
         	this.proDetailAxios(goodsid,index);
         	console.log(goodsid)
         	this.goodsIndex=index;
         	if(this.parName[this.goodsIndex]==null){
				  	this.parName[this.goodsIndex]=[];
         	}
         	this.specgoodsIDArr[this.goodsIndex]=goodsid;
       		console.log(this.specgoodsIDArr,'组合所有商品id集合数组')
         	var specgoodsIDStr=this.specgoodsIDArr.join(',');
         	console.log(specgoodsIDStr,'组合所有商品id集合字符串')
         	this.specParamsIDArr=[];


       },
       	//选择型号
        chooseItem:function(spec,item,index,event) {
         var parsName=$(event.srcElement).parents('.choose-detail').siblings('.choose-title').text();
//       this.parName=parsName


				 var pars=$(event.srcElement).parents('.choose-detail').siblings('.choose-title')
         var t = $(event.currentTarget);
         if($(t).attr('class').indexOf('activeColor') > -1 || $(t).attr('class').indexOf('activeNoneColor') > -1) {
          return;
         }
         var skuname=$(t).text()


//       console.log($(event.srcElement).parents('.choose-detail').siblings('.choose-title').text(),'794564654')
//					for(var i=0;i<pars.length;i++){
//						if()
//					}
//       if(this.parName==parsName){
//
//
//      	$('.goodslist').eq(this.goodsIndex).children('.content').children('.price').children('.skuname').children('span').last().remove()
//        $('.goodslist').eq(this.goodsIndex).children('.content').children('.price').children('.skuname').append('<span style="padding-left:1rem;">'+skuname+'</span>');
//
//       }else {
//        $('.goodslist').eq(this.goodsIndex).children('.content').children('.price').children('.skuname').append('<span style="padding-left:1rem;">'+skuname+'</span>');
//       	this.parName=parsName
//       }


       	 this.buyCount=1;
         var isTrue = item.checked;
         for(var i=0, l = spec.attrValue.length;i < l;i++ ){
           spec.attrValue[i].checked = false;
         }
         item.checked = !isTrue;
         this.shaixuanData[index].splice(100,1);
         if(item.checked){
         		this.parName[this.goodsIndex][index]=item.attrValueName;
//         this.specParamsIDArr[index] = item.id;
            this.specParamsIDArr[index]= item.id;
         }else{
           this.specParamsIDArr[index] = null
         }
				 console.log(this.parName,'12321312321')
         console.log(this.specParamsIDArr,'拼接');
         // specParamsIDArr
         this.getSkuItems(t);
       },
       getSkuItems(t){
         var specParamsIDStr = this.specParamsIDArr.join(',');
         console.log(specParamsIDStr ,'23');
         for(var i = 0,l = this.skuShowLists.length;i < l;i++){
           if(this.skuShowLists[i].attrValId === specParamsIDStr){
             this.skuId = this.skuShowLists[i].id;
             console.log(this.skuId ,'单独商品sku')
             this.skujiheArr[this.goodsIndex]=this.skuId;
        		 console.log( this.skujiheArr,'sku集合数组');
        		 console.log( this.skujiheArr.length,'sku集合数组长度');
        		 this.skujiheStr=this.skujiheArr.join(',')
        		 console.log(this.skujiheStr,'发到后台sku集合字符串')     //发到后台
             this.skuProObj = this.skuShowLists[i];
             console.log(this.skuProObj,'46789');
             this.skuPrice[this.goodsIndex] = this.skuShowLists[i].combinationPrice;
             this.skuSourcePrice[this.goodsIndex] = this.skuShowLists[i].salePrice;
             this.zongjia[this.goodsIndex]=this.skuShowLists[i].combinationPrice;
             $('.goodslist').eq(this.goodsIndex).children('.content').children('.price').children('.comprice').text(this.skuPrice[this.goodsIndex]);
//           var danjia=$('.goodslist').eq(this.goodsIndex).children('.content').children('.price').children('.comprice').text()
//           this.allprice+= Number(danjia) ;

             if(this.skuShowLists[i].store<0){
             	this.skuShowLists[i].store=0;
             }
             this.storeNum= this.skuShowLists[i].store;
             if(this.storeNum==0){
             	this.buyCount=0;
             }
             break;
             this.skuObject = this.skuShowLists[i];
           }
         }
         var sum=0;
         console.log(this.zongjia,'总价')
         if(this.checkArr(this.zongjia)){
	         	for(var i=0;i<this.zongjia.length;i++){
		         	 sum += this.zongjia[i]
		         	 console.log(sum)
		        }
         }

        	this.allprice=sum

       },


			//获取商品详情
			 proDetailAxios:function(goodsid,index){
          var _vm = this;

	        let hash = window.location.hash;
	        hash = hash.split('=');
	        let proId = hash[1];//传递过来的id
         $.ajax({
           url:comLink.yxtHost + '/product/combination/details',
           data:{
             id : proId,
             openid: (sessionStorage.openid == undefined || sessionStorage.openid == null || sessionStorage.openid == 'undefined' || sessionStorage.openid == 'null') ? '' : sessionStorage.openid,
           },
           dataType:'json',
           type:'post',
           success:function (data) {
             if(data.code == 1){

               _vm.proDetailData = data.data;
               console.log(_vm.proDetailData);

               _vm.brandData = _vm.proDetailData.brand;
//             _vm.shaixuanData = _vm.proDetailData.attrAndAttrValueMap[goodsid];//获取筛选规格
               _vm.skuShowLists = _vm.proDetailData.skuMap[goodsid];
//             console.log(_vm.shaixuanData[goodsid],'规格');

               console.log(_vm.shaixuanData,'规格');
               console.log(_vm.skuShowLists,'sku');

               for(var i = 0 ,l = _vm.proDetailData.attrAndAttrValueMap[index].length;i<l;i++){
                 for(var j = 0,il = _vm.proDetailData.attrAndAttrValueMap[index][i].attrValue.length;j<il;j++){
                   _vm.proDetailData.attrAndAttrValueMap[index][i].attrValue[j].checked = false;
                 }
               }

             }else{
             		 Toast({
				          message:data.msg,
				          duration: 2000
				        });
             }
           },
           error:function (data) {

           }
         })
       },

       //获取分期数
       // getPeriodAxios: function(){
       //   var _vm = this;
       //   let hash = window.location.hash;
       //   hash = hash.split('=');
       //   let proId = hash[1];//传递过来的id
       //   var params = new URLSearchParams();
       //   params.append('openid',sessionStorage.openid);
       //
       //   this.$axios({
       //     method: 'post',
       //     url:comLink.yxtHost + '/product/period',
       //     data: params
       //   }).then((res)=>{
       //     if(res.data.code == 1){
       //       _vm.fenqiShu = res.data.data;
       //       for( var i = 0, l = _vm.fenqiShu.length;i < l;i ++ ){
       //         _vm.fenqiShu[i].checked = false;
       //       }
       //       //
       //       // Toast({
       //       //   message: res.data.msg,
       //       //   duration: 2000
       //       // });
       //     }
       //   });
       // },


       //添加购物车
       addCartAxios: function(){
         var _vm = this;
         $.ajax({
           url:comLink.yxtHost + '/car/add',
           data:{
             'number' : _vm.buyCount,//购买数量
             'period' : _vm.fenqiXuanzhongNum,//选择分期
             'skuId' : _vm.skuId,//sku数字
             'openid':sessionStorage.openid,
           },
           dataType:'json',
           type:'post',
           success:function (data) {
             if(data.code == 1){
               Toast({
                 //mintui提示效果
                 iconClass: 'icon iconfont icon-chenggong',
                 message: '加入购物车成功',
                 duration: 2000
               });
             }
           },
           error:function (data) {

           }
         })
       },
      	//检验sku是否选择完全
      	checkArr(arr){

            if (arr.length < this.detaillength) {
                return false;
            }
             for (var i = 0; i < arr.length;i++) {
                if (!arr[i] && arr[i] !== 0) {
                    return false
                }
            }


            return true;
       },


       //提交订单
       confirmOrderAxios: function(){
         let openid = sessionStorage.getItem('openid');
         if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
           MessageBox.confirm('请先登陆', '提示', {confirmButtonText: '去登陆'}).then(({ value, action }) => {
             this.$router.push({
               path: '/mine/denglu'
             })
           })
           return;
         }

         var _vm = this;
         $.post(comLink.yxtHost + '/user/getInformation', {
           'openid' : sessionStorage.openid
         }, function(resp) {
           if(resp.code == 1) {
             let phone = resp.data.user.phone;
             if(phone == undefined || phone == null || phone == '' || phone == 'undefined' || phone == 'null') {
               MessageBox.confirm('请先绑定手机号', '提示', {confirmButtonText: '去绑定'}).then(({ value, action }) => {
                 _vm.$router.push({
                   path: '/mine/perInfor/setPhoneNum'
                 })
               })
               return;
             }
           } else {
             Toast({
               message: resp.msg,
               duration: 2000
             });
           }
         });

				if(this.fenqiXuanzhongNum == ''){
           Toast({
             message: '请选中分期',
             duration: 2000
           });
           return;
         }


         this.getSkuItems(null);
         if(!this.checkArr(this.skujiheArr)){
           Toast({
             message: '请为所有商品选中规格',
             duration: 2000
           });
         }else if(this.storeNum==0){
           Toast({
             //mintui提示效果
             message: '此商品无货 请选择其他规格商品',
             duration: 2000
           });
         }else{
         	 	let hash = window.location.hash;
         		hash = hash.split('=');
         		let id = hash[1];//传递过来的id
         		for(var j=0;j<_vm.detaillength-1;j++){
	     				_vm.buyCount=_vm.buyCount+','+'1'
	     			}
           $.ajax({
             url:comLink.yxtHost + '/car/postOrder',
             data:{
             	 combinationId: id ,       //组合活动活动id
               numbers : _vm.buyCount,//购买数量
               period : _vm.fenqiXuanzhongNum,//选择分期
               skuIds : _vm.skujiheStr,//sku数字
               openid : sessionStorage.openid,
             },
             dataType:'json',
             type:'post',
             success:function (data) {
               if(data.code == 1){
                 Toast({
                   //mintui提示效果
                   message: data.msg,
                   duration: 2000
                 });
                 _vm.$router.push({
                   path : "/home/confirmOrderRouter",
                   query:{orderId:data.data}
                 });
               } else {
                 Toast({
                   //mintui提示效果
                   message: data.msg,
                   duration: 2000
                 });
               }
             },
             error:function (data) {

             }
           })
           this.isShowBuyNowPop = false;
           this.isBlackCoverShow = false;

         }
       },
       //添加购物车按钮
       addBuyCart(){
         let openid = sessionStorage.getItem('openid');
         if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
           MessageBox.confirm('请先登陆', '提示', {confirmButtonText: '去登陆'}).then(({ value, action }) => {
             this.$router.push({
               path: '/mine/denglu'
             })
           })
           return;
         }

         var _vm = this;
         $.post(comLink.yxtHost + '/user/getInformation', {
           'openid' : sessionStorage.openid
         }, function(resp) {
           if(resp.code == 1) {
             let phone = resp.data.user.phone;
             if(phone == undefined || phone == null || phone == '' || phone == 'undefined' || phone == 'null') {
               MessageBox.confirm('请先绑定手机号', '提示', {confirmButtonText: '去绑定'}).then(({ value, action }) => {
                 _vm.$router.push({
                   path: '/mine/perInfor/setPhoneNum'
                 })
               })
               return;
             }
           } else {
             Toast({
               message: resp.msg,
               duration: 2000
             });
           }
         });

         if(this.fenqiXuanzhongNum == ''){
           Toast({
             message: '请选中分期',
             duration: 2000
           });
           return;
         }
         this.getSkuItems(null);
         if(!this.skuProObj){
           Toast({
             message: '请选中商品规格',
             duration: 2000
           });
         }else if(this.storeNum==0){
         		Toast({
                 //mintui提示效果
                 message: '此商品无货 请选择其他规格商品',
                 duration: 2000
               });
         }else if(this.buyCount===0){
         		Toast({
                 //mintui提示效果
                 message: '请填写有效数量',
                 duration: 2000
               });
         }else{

         		this.addCartAxios();
         		this.isShowBuyNowPop = false;
          	this.isBlackCoverShow = false;
            // 动态更新购物车数量
           this.carCount = ($('.superscript').text()*1 + $('.buy-total-num').text()*1);
           $('.superscript').text($('.superscript').text()*1 + $('.buy-total-num').text()*1);
         }
       },

       //跳转我的中心
       toMyCenter(){
         this.$router.push({
           path: '/mine'
         })
       },


       //点击选择分期
       chooseFenqi(item,i){
       	console.log(item)
       	if(item.title=='只有主商品可选'){
       		return
       	}
         var isTrue = item.checked;
         for(var i=0, l = this.fenqiShu.length;i < l;i++ ){
           this.fenqiShu[i].checked = false;
         }
         item.checked = !isTrue;
         this.fenqiShu.splice(100,1);
         if(item.checked){
//       	this.fenqiArr[this.goodsIndex]=item.label
           this.fenqiXuanzhongNum = item.label;
         }else{
//         this.fenqiArr[this.goodsIndex] = '';
           this.fenqiXuanzhongNum = null;

         }
//       this.fenqiXuanzhongNum =this.fenqiArr.join(',')
//       console.log(this.fenqiArr)
//       console.log(this.fenqiXuanzhongNum,'分期集合字符串')
       },
       //QRCode
       getQrcode(){
         if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
           Toast({
             message: '请先登陆',
             duration: 2000
           });
           return;
         }

         this.getQRCodeAxios();
         this.isShowQRCode = true;
         this.isBlackCoverShow = true;
         this.isShowMaiJianglijin = false;
       },
       //获取二维码地址
       getQRCodeAxios: function(){
         var _vm = this;
         let hash = window.location.hash;
         let openid = '';
         if(sessionStorage.openid != undefined || sessionStorage.openid != null || sessionStorage.openid != 'undefined' || sessionStorage.openid != 'null' || sessionStorage.openid != '') {
           openid = sessionStorage.openid;
         }
         $.post(comLink.yxtHost + '/product/processQrCode', {
           'id' :hash.split('=')[1],
           'openid' : openid
         }, function(res) {
           if(res.code == 1){
             _vm.qrcodeUrl = comLink.yxtImgHost + res.data;
             // $('#qrcodeUrl').attr('src', comLink.yxtImgHost + res.data);
           }
         });
       },
       featureBtnCLick : function(item,index){
         if( index === 0 ){
           if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
             Toast({
               message: '请先登陆',
               duration: 2000
             });
             return;
           }
           this.isBlackCoverShow = true;
           this.isContactWaysShow = true
         }
         if(item.word ==="首页"){
           this.$router.push({
             path : '/'
           })
         }
         if(item.word ==="收藏"){
           if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
             Toast({
               message: '请先登陆',
               duration: 2000
             });
             return;
           }
           if(this.isCollectPro){
             MessageBox.confirm('确定取消收藏?').then(action => {
               this.collectProAxios();
             });
           }else{
             this.collectProAxios();
           }
         }
         if(item.word === '购物车' ){
           this.$router.push({
             path : '/cart'
           })
         }
       },
       hidePop : function(){
         if(this.isContactWaysShow = true){
           this.isBlackCoverShow = false;
           this.isContactWaysShow = false;
         }
       },
       makrWechat() {
         window.open('https://mp.weixin.qq.com/s?__biz=MzU0Mjc5MzEyMw==&tempkey=OTY1X25sdGVud0JvSUJnejg4OVc0TzdqZnUyM0pNeW9MeHcyclVpYkFzVHlQZ09nYU5yR0JhdjFRN3FHX1FPcl9oVEt4VzJvZWRVeGZPRkN5Y3htWTVJd2ljVGJFZDZxSTJOREFGcGZJMzFDQ1MxcHZsaXA1eG5lUlR2ZW5ob001Ql92cnp0cjd1TW04NDF5LXlHd0k4b09HZkJEM3hGUnl6WFlPVGpJREF%2Bfg%3D%3D&chksm=7b140da54c6384b3184416e307141d13a18990d2ea0579a20043931ebc32a6c6a435a2593954&scene=0&previewkey=7Ps4lhvUad3XXVo%252B0nh%252Bf51iJUUG%252F7eLf7OA%252FVEtaJE%253D#wechat_redirect', '_self');
         /*Toast({
           message: '建设中...敬请期待！',
           duration: 2000
         });*/
       },


       copy : function () {
         var clipboard = new Clipboard('.tag-read');
         clipboard.on('success', e => {
           Toast({
             message: '链接已复制到剪切板，赶紧去粘贴吧~',
             duration: 2000
           });
           // 释放内存
           clipboard.destroy();
         });
         clipboard.on('error', e => {
           // 不支持复制
           console.log('该浏览器不支持自动复制')
           // 释放内存
           clipboard.destroy();
         })
       },



       //隐藏 立即购买 弹窗
       confirm : function(){
				this.isShowBuyNowPop = false;
        this.isBlackCoverShow = false;
       	if(this.storeNum==0){
       		Toast({
             //mintui提示效果
             message: "此商品无货 请选择其他规格商品",
             duration: 2000,
          });
       	}else{
//       	this.confirmOrderAxios()


       	}

         // this.getDefaultAddress();
         // this.$router.push({
         //   path : "/home/confirmOrderRouter",
         //   // query:{idArr:this.cardIdStr,orderId:data.data}
         // })
       },
       //点击弹出 分享 提示
       sharePopup(){
         this.isBlackCoverShow = true;
         this.isShowFenxiang = true;
         this.isShowMaiJianglijin = false;
       },
       //选择购买数量
       reduceBtn : function(){
         if(this.buyCount > 1){
           this.buyCount --;
         }else{
           this.buyCount = 1;
         }
       },
       addBtn : function () {
         this.buyCount ++;
         if(this.buyCount>this.storeNum){
         		this.buyCount=this.storeNum
         }
       },
       // activeChooseSpec : function(index3,spe){
       //   spe.index = index3;
       // },
       //点击黑色遮罩层，隐藏弹窗
       blockClick : function(){
         if(this.isBlackCoverShow){
         	this.xuanFenqi=false;
         	 this.showPjimg=false;
           this.isBlackCoverShow = false;
           this.isContactWaysShow = false;
           this.isShowBuyNowPop = false;
           this.isShowMaiJianglijin = false;
           this.isShowJianglijin = false;
           this.isShowQRCode = false;
           this.isShowFenxiang = false;
           this.isShowBuyNowPop = false;
           this.isCall = false
         }
       },
     //  奖励金
       jinglijin(){
         // this.isBlackCoverShow = true;
         // this.isShowJianglijin = true;
         this.isBlackCoverShow = true;
         this.isShowMaiJianglijin = true;
       },
     //  卖 奖励金
       maijianglijin(){
         this.isBlackCoverShow = true;
         this.isShowMaiJianglijin = true;
       },
       //base64加密方法
       jiaMi(input){
         var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "="
         var output = "";
         var chr1, chr2, chr3 = "";
         var enc1, enc2, enc3, enc4 = "";
         var i = 0;
         do {
           chr1 = input.charCodeAt(i++);
           chr2 = input.charCodeAt(i++);
           chr3 = input.charCodeAt(i++);
           enc1 = chr1 >> 2;
           enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
           enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
           enc4 = chr3 & 63;
           if (isNaN(chr2)) {
             enc3 = enc4 = 64;
           } else if (isNaN(chr3)) {
             enc4 = 64;
           }
           output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
             + keyStr.charAt(enc3) + keyStr.charAt(enc4);
           chr1 = chr2 = chr3 = "";
           enc1 = enc2 = enc3 = enc4 = "";
         } while (i < input.length);

         return output;
       },


       closeVideo(){
         var video = document.getElementById("video");
         video.pause();
         this.isShowVideo = false;
       },
//     getPhone() {
//       var vm = this;
//       $.post(comLink.yxtHost + '/system/getProductPhone', {}, function(resp) {
//         if(resp.code == 1) {
//           vm.phoneNumber = resp.data;
//         }
//       });
//     },
        GetQueryString(name) {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]);
         return null;
       },
       //获取个人信息
       getManInfos(){
         var _vm = this;
         $.ajax({
           url: comLink.yxtHost + '/user/getInformation',
           data: {
             'openid': sessionStorage.openid,
           },
           dataType: 'json',
           type: 'post',
           success: function (data) {
             console.log(data, '登陆用户');
             if (data.code == 1) {
               console.log(data.data.user.phone, '登陆用户手机号');
               let userId = data.data.user.id;//userId
               let headLogo = data.data.userWx.headLogo;//头像
               // let name = data.data.user.name;//姓名
               let sex = data.data.user.sex;
               let nickName = data.data.userWx.nickName;//昵称
               let qrCode = data.data.userWx.qrCode;//用户二维码
               let phone = data.data.user.phone;//用户手机

               sessionStorage.setItem('userId',userId);
               // sessionStorage.setItem('name',name);
               sessionStorage.setItem('headLogo',headLogo);
               sessionStorage.setItem('sex',sex);
               sessionStorage.setItem('nickName',nickName);
               sessionStorage.setItem('qrCode',qrCode);
               sessionStorage.setItem('phone',phone);
             } else {
               sessionStorage.clear();
             }
           },
         })
       },
       //时间戳转时间
		 	formatDateTime(obj) {
		     var date =  new Date(obj);
		    var y = 1900+date.getYear();
		    var m = "0"+(date.getMonth()+1);
		    var d = "0"+date.getDate();
		    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);

     	},
     },
     mounted:function(){
     	$(window).scrollTop('0')
       var openid = sessionStorage.openid;
       if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined') {
         openid = this.GetQueryString('openid');
         if(openid != null && openid != 'null' && openid != undefined && openid != 'undefined' && openid != ''){
           sessionStorage.setItem('openid', openid);
           this.getManInfos();//获取个人信息
         }
       }

       this.getShareUrl();
       // this.proDetailAxios();
       // this.getQRCodeAxios();//直接生成图片，出问题以后再说
//     this.getPhone();

       // this.endCloseVideo();

        //查询组合产品详情
	       	 var _vm = this;
	         let hash = window.location.hash;
	         hash = hash.split('=');
	         let proId = hash[1];//传递过来的id
	         $.ajax({
	           url:comLink.yxtHost + '/product/combination/details',
	         		data:{
	         		 id : proId,
	             openid: (sessionStorage.openid == undefined || sessionStorage.openid == null || sessionStorage.openid == 'undefined' || sessionStorage.openid == 'null') ? '' : sessionStorage.openid,
	         		},
	         		dataType:'json',
	         		type:'post',
	         		success:function(data){
	         			if(data.code==1){
                  console.log(data.data,'qitachanpin')
	         				_vm.combinepro=data.data;
		         			_vm.detailpro=_vm.combinepro.productList;
	         				_vm.maingoodsId=_vm.detailpro[0].id;

                  //开售倒计时
                  if(_vm.combinepro.combination.countDown != '' && _vm.combinepro.combination.countDown != null && _vm.combinepro.combination.countDown != undefined && _vm.combinepro.combination.countDown != 'undefined' && _vm.combinepro.combination.countDown != 'null') {
                    var leftTime = _vm.combinepro.combination.countDown;
                    if(leftTime>0){
                      setInterval(function(){//todo
                        if(leftTime>=1000 && leftTime<2000) {
                          _vm.setTime = '';
                        }
                        leftTime -= 1000;
                        _vm.daojishi(leftTime);
                      },1000);
                    }
                  } else {
                    _vm.setTime = '';
                  }

	         				//查询其他组合产品
	         				if(_vm.maingoodsId){
	         					 $.ajax({
									       url:comLink.yxtHost + '/product/combination',
									     		data:{
									     		 productId : _vm.maingoodsId,
									         openid: (sessionStorage.openid == undefined || sessionStorage.openid == null || sessionStorage.openid == 'undefined' || sessionStorage.openid == 'null') ? '' : sessionStorage.openid,
                            combinationId: _vm.combinepro.combination.id
									     		},
									     		dataType:'json',
									     		type:'post',
									     		success:function(data){
									     			if(data.code==1){
									     				_vm.otherCombine=data.data;
									     				for(var i=0;i<_vm.otherCombine.length;i++){
									     					_vm.otherCombine[i].imgPath=comLink.yxtImgHost+_vm.otherCombine[i].imgPath
									     				}
									     			}
									     		}
									     })
	         				}
		         			_vm.detaillength=_vm.detailpro.length;
		         			_vm.endtime=_vm.combinepro.combination.endTime;
		         			_vm.comTitle=_vm.combinepro.combination.title;
		         			_vm.comremark=_vm.combinepro.combination.remark;
		         			_vm.comprice=_vm.combinepro.combination.combinationPrice;
		         			for(var i=0;i<_vm.detailpro.length;i++){
		         				_vm.detailpro[i].logo=comLink.yxtImgHost+_vm.detailpro[i].logo

		         			};
		         			var arr=[]
		         				arr=_vm.combinepro.combination.imgPath.split(',')
		         					for(var j=0;j<arr.length;j++){
		         						var obj = {
				                  img : comLink.yxtImgHost + arr[j]
				                };
				                 _vm.lunboUrl.push(obj);
		         					}
		         			_vm.shaixuanData=_vm.combinepro.attrAndAttrValueMap;

		         	 //初始化分期

//		         	_vm.proDetailData = data.data;
//             console.log(_vm.proDetailData);
	          		_vm.fenqiShu=[]
              	var newFenqiShu=[]
               _vm.productData = _vm.combinepro.productList;
                  newFenqiShu = _vm.productData[0].period.split(',');
              for(var i=0;i<_vm.productData.length;i++){
                   _vm.shareMoney += _vm.productData[i].shareMoney;
              }

//	              newFenqiShu= newFenqiShu.slice(0,1)
	              console.log('newFenqiShu',newFenqiShu);
//	              if(this.goodsId==_vm.maingoodsId){
			              for(var i =0,l = newFenqiShu.length;i < l; i ++){
			                 _vm.fenqiShu[i] = {};
			                 _vm.fenqiShu[i].title = '分' + newFenqiShu[i] + '期';
			                 _vm.fenqiShu[i].label = newFenqiShu[i];
			                 _vm.fenqiShu[i].checked = false;

			               }
//	               }else{
//	               	_vm.fenqiShu[0]={};
//	               	_vm.fenqiShu[0].title='只有主商品可选'
//	               	_vm.fenqiShu[0].label = '';
//			            _vm.fenqiShu[0].checked = false;
//	               }

	         			}
	         			console.log(_vm.combinepro,'组合')
	         		}
	         });






     },
     components : {

       Swiper,
       SwiperItem,
       GroupTitle,
       XButton,
       Divider,

     },
     // watch: {
     //   // 监控更改,newValue是当前路由信息，oldVal是上一个路由信息
     //   $route: function(newValue) {
     //     //路由更改执行事件
     //     console.log('router')
     //     this.proDetailAxios();
     //   }
     // },
     // watch: {
     //   '$route' (to, from) {
     //     let hash = window.location.hash;
     //     hash = hash.split('=');
     //     console.log(hash,'hash')
     //     if(!hash[1]){
     //       window.history.back(-1);
     //       return
     //     }
     //     this.sendAxios();
     //   }
     // },
   }
</script>
<style>
  .mint-msgbox-confirm {
    color: #26a2ff;
    width: 50%;
  }

</style>
<style lang="scss">
	.mint-tab-container-item{
		margin-top:0.3rem!important;
	}
  .blackCoverShow{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: black;
    opacity: 0.4;
  }
 .mint-tab-container-wrap .mint-tab-container-item .xiangxi img{
   width: 100%;
 }
 .details-all .mint-tab-item .mint-tab-item-label{
    display: inline-block;
    height: 3.75rem;
    line-height: 3.75rem;font-size: 1.75rem;
    border-bottom: none;
  }
  .details-all .mint-tab-item.is-selected .mint-tab-item-label{
    border-bottom: none;
  }
  .mint-navbar .mint-tab-item{
    border-bottom: 1px solid #ccc;
    padding: 0.1875rem 0;

  }
  .mint-navbar .mint-tab-item.is-selected{
    /*border-bottom: 1px solid #ccc;*/
    margin-bottom: 0;
  }
  .mint-tab-item.is-selected .mint-tab-item-label{
    color: #307ff5;
    box-sizing: border-box;
    /*border-bottom: 0.3125rem solid #307ff5;*/

  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .skuname{
  	color: #999;
  }
  .daishou{
  	width: 57%;
    height: 5rem;
    color: white;
    overflow: hidden;
    /* display: flex; */
    /* justify-content: space-evenly; */
   .daishoubtn{
   	width: 50%;
    text-align: center;
    height: 100%;
    overflow: hidden;
    span{
    	  display: inline-block;
		    font-size: 1.75rem;
		    line-height: 5rem;
		    width: 90%;
		    border-radius: 0.625rem;
		    float: right;
        background: #ff675f;
    }
   }
  }
  .pingjia-img{
		position: fixed;
	    top: 6.25rem;
	    left: 6.25rem;
	    right: 6.25rem;
	    width: 35rem;
	    height:38rem;
	    background: white;
	    border-radius: 0.625rem;
	    z-index: 9999;
	    img{
	    	width:100%;
	    	height: 100%;
	    }
	}
  .QRCode-img img{
  	width: 100%;
  	height: 100%;
  }
  .is-fixed{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
	}
  .pro-detail-content{
    width: 100%;
    height: 100%;
    /*position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: p(100);*/
    overflow-y: scroll;
    -webkit-overflow-scrolling: scroll;

    /*是否弹出分享弹窗*/
    .tishi-fenxiang-pop{
      position: fixed;
      top: 0;
      width: 100%;
      right: p(0);
      z-index: 9;
      color: white;
      font-size: p(40);
      line-height: p(86);
      padding: 0 p(70);

      .jiantou{
        width: 100%;
        height: p(270);
        text-align: right;
        >img{
          height: 100%;
        }
      }
      .word{
        display: inline-block;
        width: 100%;
        >img{
          width: p(100);
          margin: p(20) p(10) 0 p(10);

        }
      }
    }
    .maiJiangli{
      display: inline-block;
      width: p(500);
      height: p(285);
      background: white;
      position: fixed;
      top: p(310);
      left: 50%;
      margin-left: p(-250);
      text-align: center;
      .money{
        display: block;
        width: 100%;
        text-align: center;
        margin: p(25) 0;
      }
      .warn{
        line-height: p(40);
        display: inline-block;
      }
      .btns{
        width: 100%;
        height: p(85);
        margin-top: p(46);
        >span{
          display: inline-block;
          width: 49%;
          height: 100%;
          line-height: p(85);
        }
        .share{
          width: 49%;
          float: left;
          background: $danlan;
          color: $bgBlue;

          i {
            font-size: 2rem;
          }
        }
        .QRcode{
          width: 49%;
          float: right;
          color: white;
          background: $bgBlue;

          i {
            font-size: 2rem;
          }
        }
        .white{
          display: inline-block;
          width: 2%;
          height: 100%;
          background: white;
        }
      }
    }
    .nav-content{

      .nav-main{
        width: 100%;
        height: p(90);
        border-bottom: p(1) solid #ccc;
        .nav-row{
          width: 50%;
          height: p(50);
          text-align: center;
          margin: p(20) 0;
          box-sizing: border-box;
          border-right: p(1) solid #ccc;

          .row-inner{
            display: inline-block;
            height: p(50);
            line-height: p(50);
            text-align: center;
            margin: 0 auto;
          }
        }
      }
    }

    .pro-main-pic{
      padding-bottom: p(20);
      width: 100%;

      .pic-show-here{
        /*padding: p(20);*/
        border-bottom: p(2) solid #ccc;
        height: 45rem;
        overflow: hidden;

        .pic-main{
          width: 100%;
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .pro-details{
				p:nth-child(1){
					font-weight: 500;
				}
				p:nth-child(2){
					color: rgb(102,102,102);
				}
				p:nth-child(3){
					color: rgb(153,153,153);
					.price{
						color: red;
					}
					.time{
					}
				}
        .brand{
          display: inline-block;
          padding: p(0) p(10);
          border-radius: p(5);
          background: #ff251a;
          height: p(38);
          line-height: p(38);
          /*margin-top: p(17);*/
        }

        .pro-name{
          line-height: p(40);
          max-height: p(120);
          display: inline-block;
        }
      }
      .btn-main{
        color: #eeeeee;
        text-align: center;
        bottom: 0;
        left: 50%;
        margin-left: p(-40);

        .btn-row{
          display: inline-block;
          width: p(20);
          height: p(20);
          background: #eeeeee;
          border-radius: p(20);
          margin: 0 p(10);
        }
      }
    }

    .fenqi-ways{
      width: 100%;
      .fenqi-name{
        height: p(65);
        line-height: p(65);
        border-bottom: p(1) solid #999999;
      }

      .pro-fenqi-detail{
        padding-bottom: p(10);
        color: #ff251a;
        border-bottom: p(1) solid #eeeeee;

        .detail-main{
          margin: p(20) 0;
          .detail-num{
            display: inline-block;
            background: #ff251a;
            width: p(25);
            line-height: p(25);
            height: p(25);
            border-radius: 50%;
            text-align: center;
          }
          .detail-word{
            display: inline-block;
            height: p(30);
            line-height: p(30);
          }
        }
      }

      .price-main{
        height: p(70);
        line-height: p(70);
        .old-price{
          text-decoration: line-through;
          color: #a1a1a1;
        }
      }
    }

    .check-bounty-content{
      height: p(65);
      line-height: p(65);
      margin: p(20) 0;

      .img-pic{
        display: inline-block;
        width: p(33);
        height: p(33);
        margin: p(12) p(5) 0 0;
      }
      .word{
        display: inline-block;
      }
    }

    .jianglijin{
      display: inline-block;
      width: p(500);
      height: p(285);
      background: white;
      position: fixed;
      top: p(310);
      left: 50%;
      margin-left: p(-250);
      text-align: center;
      z-index: 9;
      >span{
        display: inline-block;
        width: 100%;
        text-align: center;
        margin-top: p(30);
      }
      .know{
        display: inline-block;
        width: 100%;
        height: p(80);
        line-height: p(80);
        text-align: center;
        background: $bgBlue;
        color: white;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    .brand-store-name{
      width: 100%;
      height: p(140);
      padding: p(20) p(20);
      border-bottom: p(1) solid #999999;
      .img-main{
        width: p(100);
        height: p(100);
        box-sizing: border-box;
        text-align: center;

        .img-pic{
          width: 99%;//100x100像素店铺头像
        }
      }
      .store-word{
        height: p(100);
        line-height: p(100);
      }
    }

    .collect-pro-comm{
      border-bottom: p(1) solid #eeeeee;
      .collect-pro-comm-main{
        width: 100%;
        height: p(130);
        padding: p(20) 0;

        .collect-pro-comm-row{
          width: 33.33%;
          height: p(90);
          box-sizing: border-box;
          border-right: p(1) solid #eeeeee;
          text-align: center;
          line-height: p(44);

          .collect{
            color: #bfbfbf;
          }
        }
        .collect-pro-comm-row:nth-child(3){
          border: none;
        }
      }
    }
		.mix-pro-comm{
			margin: 2.2rem 0;
			.mix-pro-comm-title{
				width: 100%;
				font-weight: 500;
        height: p(70);
        padding: p(20);
        border-bottom:p(1) solid #999 ;
			}
			.mix-pro-comm-lunbo{
				padding-top: 1.25rem;
				ul{
					li{
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
				    	width: 25%;
					    height: 9rem;
					    margin-right: 5%;
					    img{
					    	width: 100%;
					    	height: 100%;
					    }
				    }
				    .content{
			    	  width: 67%;
							position: relative;
							.proname{
								width: 100%;
								margin: 0rem 0 2rem 0;
							}
							.price{
								color: #f5746f;
								font-size: 1.6rem;
								padding-bottom: 1rem;
								border-bottom: p(1) solid #ddd;
							}

				    }
					}
				}
			}
		}
		.other-mix{
				width: 100%;
				min-height: 25rem;
				.other-pro-comm-title{
					font-weight: 500;
					width: 100%;
			    height: 4.375rem;
			    padding: 1.25rem;
			    border-bottom: 0.0625rem solid #999;
				}
				ul{
					li{
						height: 16rem;
						padding: 1rem 1.5rem;
						border-bottom: p(1) solid #E8E8E8;
						.imgBox{
				    	width: 13rem;
					    height: 13rem;
					    margin-left: 1%;
					    margin-right: 4%;
					    img{
					    	width: 100%;
					    	height: 100%;
					    }
				    }
				    .content{
				    	.proname{
				    		font-weight: 500;
				    		margin: 1rem 0 1rem 0;
				    	}
				    	.price{
				    		span{
				    			padding-left: 1rem;
									color: red;

				    		}
				    	}
				    }
					}
				}
		}
    .collect-store-btn{
      height: p(110);
      width: 100%;
      padding:p(24) 0;
      .collect-main{
        width: 100%;
        height: p(65);

        .collect-btn-row{
          height: 100%;
          width: 33.33%;
          text-align: center;
            .row-inner{
              display: inline-block;
              /*padding: 0 p(44);*/
              width: 90%;
              height: 100%;
              box-sizing: border-box;
              border: 0.5px solid #666666;
              border-radius: p(10);
              line-height: p(65);
            }
          .collectedStore{
            color: red;
            border-color: red;
          }
        }
      }
    }

    .details-all{
      padding-bottom: p(180);
      .xiangxi{
        min-height: p(400);
        line-height: p(60);
        /*padding: p(10) p(24);*/
      }
      .comment-content{

        .comment-main{

          .comment-row{
            width: 100%;
            /*height: p(230);*/
            padding: 0 p(25);
            box-sizing: border-box;
            border-bottom: p(1) solid #eeeeee;

            .comment-top{
              display: inline-block;
              height: p(80);
              width: 100%;
              margin-top: p(30);

              .head-profile{
                display: inline-block;
                width: p(80);
                height: p(80);
                overflow: hidden;
                border-radius: 50%;
                background: pink;
                margin-right: p(20);
              }

              .name,.time{
                display: inline-block;
                height: 100%;
                line-height: p(80);
                color: #8bb0f8;
              }
              .time{
                color: #a1a1a1;
              }
            }

            .comment-text{
              display: inline-block;
              line-height: p(36);
              margin-top: p(5);
              margin-left: p(15);
              /*max-height: p(90);*/
              padding-bottom: p(20);
            }

            .div_img {
              width: 100%;
              height: 9rem;
               img {
                 height: 9rem;
                 width: p(140);
                 margin: 0 p(20);
               }
            }
          }
        }
      }
    }

    .buy-btn-content{
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      height: p(100);
      display: inline-block;
      padding: p(10) p(20);
      border-top: p(1) solid #999999;
			.dapeiprice{
				font-weight: 500;
				line-height: p(75);
				p{
					span{
						color: red;
					}
				}
			}
      .feature-btn{
        width: 41%;
        height: 100%;

        .feature-btn-row{
          display: inline-block;
          height: 100%;
          width: 25%;

          .li-inner{
            text-align: center;
          }

          .icon-shoucang2{
            font-size: p(45);
            color: #fe842f;
          }
          .inner-img{
            display: inline-block;
            width: p(40);
            margin: 0 auto;
          }
          .superscript {
            font-size: 1rem;
            position: fixed;
            left: 38%;
            bottom: 3.5rem;
            /* background: #ff5d74; */
            background: #6dd6ee;
            width: 2rem;
            height: 2rem;
            /*background: #ff5d74;*/
            line-height: 2rem;
            text-align: center;
            color: white;
            border-radius: 50%;
          }
        }
      }
      .buy-btn{
        width: 59%;
        height: p(80);
        color: white;
        overflow: hidden;
        /*display: flex;*/
        /*justify-content: space-evenly;*/
        .btn-wai{
          width: 50%;
          text-align: center;
          height: 100%;
          overflow: hidden;
          .btn-inner{
            display: inline-block;
            font-size: p(28);
            line-height: p(80);
            width: 90%;
            border-radius: p(10);
            float: right;
          }
          .buy{
            background: $qianhong;
          }
          .sale{
            background: $bgBlue;
          }
        }
      }

      .call-popup{
        display: inline-block;
        height: p(290);
        border-radius: p(10);
        background: white;
        position: fixed;
        top: p(375);
        right: p(75);
        left: p(75);
        z-index: 999;
        overflow: hidden;

        .warn{
          text-align: center;
          margin-top: p(30);
        }
        .confirm-call{
          margin-top: p(50);
          text-align: center;
        }
        .btn-main{
          display: flex;
          justify-content: space-between;
          margin-top: p(48);
          .btns{
            width: 49.5%;
            display: inline-block;
            height: p(100);
            line-height: p(100);
            text-align: center;
          }
          .cancel-btn{
            background: #c0d9ff;
            color: #307ff5;
          }
          a{
          	display: inline-block;
          	width: 50%;
          	height: p(100);
	          background: #307ff5;
            line-height: p(100);
            text-align: center;
          	.confirm-btn{
	            background: #307ff5;
	            color: white;
	          }
          }

        }
      }

      .share-popup{
        display: inline-block;
        position: fixed;

      }

    }

    .close-btn{
      width: p(120);
      height: p(70);
      line-height: 4rem;
      text-align: center;
      background-color: #333;
      position: absolute;
      top: p(30);
      right: p(30);
      border-radius: p(10);
      color: white;
      /*opacity: 0.6;*/

      .icon-close{
        width: p(32);
      }
    }
    .show-buynow-popup{
      width: 100%;
      /*height: p(575);*/
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      background: white;
      z-index: 10;
      padding-bottom: p(120);

      .popup-main{
        width: 100%;
        z-index: 11;
        margin-top: p(-50);

        .pro-img-infos{
          padding: 0 p(23);
          .buy-now-headprofile{
            background: white;//产品图片
            display: inline-block;
            width: p(150);
            height: p(150);
            box-sizing: border-box;
            border: p(1) solid #ccc;
            border-radius: p(10);
            box-shadow: 0px 0px p(1) p(1) #aaa;

          }
          .pro-word{
            display: inline-block;
            margin-top: p(60);
            margin-left: p(15);
            max-width: 70%;
            line-height: p(28);
            .pro-price{
              color: #ff374c;
              margin-top: p(15);
            }

            .pro-name {
              height: p(35);
              line-height: p(35);
              display: inline-block;
            }

            .pro-price {
              margin-top: p(40);
            }
          }
        }

        .choose-spec{
          margin-top: p(30);
          border-top: p(1) solid #eeeeee;
          padding: 0 p(23);

          .spec-main{
            margin-top: p(10);
            .spec-main-row{
              display: inline-block;
              width: 100%;
              /*height: p(46);*/
              margin-top: p(20);

              .choose-title{
                width: 20%;
                height: 100%;
                display: inline-block;
                line-height: p(50);
              }
              .choose-detail{
                width: 75%;
                .choose-option{
                  margin-left: p(30);
                  display: inline-block;
                  height: 100%;
                  padding: p(12) p(22);
                  border: p(2) solid #ccc;
                  border-radius: p(10);
                  margin-bottom: p(10);
                }
                .active.choose-option{
                  color: blue;

                }
               .choose-option.activeColor{
                	border: p(2) solid #307ff5;
                }
                .choose-option.activeNoneColor{
                  border: p(2) solid #ccc;
                }
              }
              .add-reduce-main{
                display: inline-block;
                width: p(180);
                height: p(45);
                margin-left: p(30);
                box-sizing: border-box;
                border-top: 0.5px solid #999999;
                border-bottom: 0.5px solid #999999;
                border-radius: p(10);
                line-height: p(45);
                .add-reduce-btns{
                  /*margin-left: p(30);*/
                  display: inline-block;
                  width: 25%;
                  height: 100%;
                  /*height: p(43);*/
                  border-radius: p(10);
                  /*box-sizing: border-box;*/
                  border: 0.5px solid #333333;
                  line-height: p(45);
                  text-align: center;
                }
                .buy-total-num{
                  display: inline-block;
                  width: 50%;
                  text-align: center;

                }
              }
            }
          }
        }
        .addCart-confirm-btns{
          position: fixed;
          bottom: 0;
          right:0;
          left: 0;
          display: inline-block;
          width: 100%;
          height: p(100);

          .addCart-confirm-btn{
            width: 100%;
            height: 100%;
            line-height: p(100);
            text-align: center;
          }
          .addCart{
            background: #c0d9ff;
            color: #307ff5;
          }
          .confirm {
            background: #307ff5;
            color: white;
          }

          .router{
            display: inline-block;
            width: 50%;

            .confirm{
              width: 100%;
              display: inline-block;
            }
          }
        }
      }
    }
    /*点击弹出二维码*/
    .QRCode-main{
      position: fixed;
      top: p(100);
      left: p(100);
      right: p(100);
      /*width: p(540);*/
      /*left: 50%;*/
      /*margin-left: p(-270);*/
      /*height: p(700);*/
      background: white;
      border-radius: p(10);
      z-index: 9;

      .img-outside{
        //margin-top: p(30);
        width: p(160);
        height: p(160);
        position: relative;
        bottom: p(20);
        right: p(5);
        float: right;
        img{
          width: 100%;
        }
      }
      >span{
        display: inline-block;
      }
      .name{
        line-height: p(45);
        margin-top: p(20);
        max-width: p(360);
        max-height: p(90);
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
      }
      .price{
        font-size: p(26);
        color: #e26a86;
        display: block;
        margin-top: p(20);
      }
      .QRCode-img{
        /*width: p(120);*/
        /*height: p(120);*/
        /*position: absolute;*/
        /*bottom: p(24);*/
        /*right: p(24);*/
        /*background: grey;*/
        width: 98%;
        /*height: p(400);*/
        display: block;
        margin: p(20) auto;
      }
      .close-QRcode{
        font-size: p(60);
        font-weight: bold;
        color: white;
        position: absolute;
        bottom: p(-20);
        left: 50%;
        margin-left: p(-25);
      }
    }
    .contact-service{
      width: 100%;
      height: p(330);
      z-index: 99;
      position: fixed;
      bottom: p(220);
      right: 0;
      left: 0;
      color: white;

      .icon-close{
        font-size: p(40);
        width: p(100);
        height: p(100);
        text-align: center;
        line-height: p(100);
        background: #307ff5;
        border-radius: 50%;
        bottom: 0;
        left: 50%;
        margin-left: p(-50);
      }

      .contact-ways{
        width: p(130);
        height: p(130);
        display: inline-block;
        border-radius: 50%;
        background: white;
        img{
          display: inline-block;
          width: p(80);
          margin-top: p(25);
          margin-left: p(25);
        }
      }
      .phone img{
        margin-left: 0;
      }

      .wechat{
        top: 0;
        left: 50%;
        margin-left: p(-65);
      }
      .phone{
        bottom: p(50);
        left: p(95);
        text-align: center;
        .icon-dianhua{
          color: #ff675f;
          font-size: p(55);
          font-weight: bold;
          line-height: p(130);

        }
      }
      .chatnow{
        bottom: p(50);
        right: p(95);
      }
    }
  }
  .activeColor{
    color: $bgBlue;
    border-color: $bgBlue;
    border: p(2) solid #307ff5;
  }
  .activeNoneColor {
    color: gray;
    background-color: #ddd;
    border: p(2) solid #ddd
  }
  .icon-chenggong {
    color: #538be8 !important;
  }
</style>
