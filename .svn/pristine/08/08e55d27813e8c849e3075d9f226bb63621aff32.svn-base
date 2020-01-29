<template>
  <div class="pro-detail-content "  v-title data-title="商品详情">
    <div class="nav-content b-white">
      <ul class="nav-main f-oh">
        <li class="nav-row f-fl" @click="toMyCenter()">
          <dt class="row-inner f-oh">
            <i class="icon iconfont icon-account f-fl fontSize-18"></i>
            <p class="f-fl fontSize-15">个人中心</p>
          </dt>
        </li>
        <li class="nav-row f-fl">
          <dt class="row-inner f-oh" @click="QRcode()">
            <i class="icon iconfont icon-erweima f-fl fontSize-18"></i>
            <p class="f-fl fontSize-15">二维码</p>
          </dt>
        </li>
      </ul>
    </div>

    <div class="pro-infos f-oh">
      <div class="pro-main-pic b-white f-fl">
        <div class="pic-show-here f-pr">
          <!--<swiper :list="demo03_list" auto-->
                  <!--style="margin:0 auto;"-->
                  <!--height="46.875rem" dots-class="custom-bottom"-->
                  <!--dots-position="center">-->
          <!--</swiper>-->
          <swiper :list="lunboUrl" auto
                  style="margin:0 auto;"
                  height="45rem" dots-class="custom-bottom"
                  dots-position="center">
          </swiper>
        </div>
        <div class="pro-details p-lef-rig20 fontSize-13 f-oh">
          <p class="brand w-color f-fl m-right5">品牌</p>
          <span class="ellipsis pro-name m-top10 f-fl">{{productData.name}}</span>
          <!--<p class="m-top10 f-fl">双卡双待2年保修</p>-->
        </div>
      </div>
      <div class="fenqi-ways  m-top10 b-white fontSize-15 f-fl">
        <div class="fenqi-name p-lef-rig20">分期方式</div>
        <div class="pro-fenqi-detail p-lef-rig20 fontSize-11">
          <dt class="detail-main f-oh" v-for="(item,i) in productData.periodShowArray" :key="i">
            <i class="detail-num w-color f-fl fontSize-6">{{i+1}}</i>
            <p class="detail-word f-fl ">￥{{item}}</p>
          </dt>
        </div>
        <div class="price-main p-lef-rig20 f-oh">
          <dt class="new-price f-fl fontSize-15 m-right15">￥{{productData.mallPrice}}</dt>
          <s class="old-price f-fl fontSize-10">￥{{productData.marketPrice}}</s>
          <dt class="f-fr fontSize-12">已售{{productData.sale}}</dt>
        </div>
      </div>
    </div>
    <div class="check-bounty-content p-lef-rig20 f-oh b-white" @click="jinglijin()">
      <img class="img-pic f-fl" :src=jianglijinIcon alt="">
      <p class="word f-fl fontSize-14">查看可赚取奖励金</p>
    </div>
    <div v-if="isShowJianglijin" class="jianglijin">
      <span class="fontSize-15 p-lef-rig24">提示</span>
      <span class="p-lef-rig24 fontSize-14" style="color: #666;">您自己购买可获得{{productData.shareMoney}}元(仅供参考)</span>
      <span class="fontSize-15 know" @click="blockClick">知道了</span>
    </div>
    <div class="brand-store-name b-white p-lef-rig20 f-oh">
      <dt class="img-main m-right10 f-fl">
        <img class="img-pic" :src=brandData.logo alt="">
      </dt>
      <dt class="store-word fontSize-16 b-white f-fl">{{brandData.storeName}}</dt>
    </div>

    <div class="collect-pro-comm b-white">
      <ul class="collect-pro-comm-main f-oh">
        <li class="collect-pro-comm-row f-fl">
          <dt class="fontSize-14">{{brandData.enshrineCount}}</dt>
          <!---->
          <dt class="fontSize-12 collect">收藏</dt>
        </li>
        <li class="collect-pro-comm-row f-fl">
          <dt class="fontSize-14">{{brandData.count}}</dt>
          <!---->
          <dt class="fontSize-12 collect">全部商品</dt>
        </li>
        <li class="collect-pro-comm-row f-fl">
          <dt class="fontSize-14">{{brandData.commentCount}}</dt>
          <dt class="fontSize-12 collect">评论</dt>
        </li>
      </ul>
    </div>

    <div class="collect-store-btn b-white">
      <ul class="collect-main fontSize-15 f-oh">
        <li class="collect-btn-row f-fl" @click="clickNavBtns()">
          <dt class="row-inner" :class="{collectedStore:isCollectStore}" v-text=collectStore></dt>
        </li>
        <li class="collect-btn-row f-fl" @click="toStore()">
          <dt class="row-inner">进入店铺</dt>
        </li>
        <li class="collect-btn-row f-fl">
          <a class="router" href="http://www.yxtccb.com:8080/chat/wab/index">
            <dt class="row-inner">联系客服</dt>
          </a>
        </li>



      </ul>
    </div>

    <!--不同选项内容切换插件-->
    <div class="details-all b-white m-top10 fontSize-15">
      <mt-navbar class="page-part" v-model="selecteda">
        <mt-tab-item id="1">详细</mt-tab-item>
        <mt-tab-item id="2">规格</mt-tab-item>
        <mt-tab-item id="3">售后保障</mt-tab-item>
        <mt-tab-item id="4">评价({{comNum}})</mt-tab-item>
      </mt-navbar>
      <!--切换内容显示区-->
      <mt-tab-container v-model="selecteda">
        <mt-tab-container-item id="1">
          <div class="xiangxi" v-html="content"></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="xiangxi" v-html="guigeContent"></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="xiangxi" v-html="shouHouSevice.description"></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div class="comment-content xiangxi">
            <ul class="comment-main">
              <li class="comment-row fontSize-13" v-for="(comMain,i) in comContent" :key="i">
                <div class="comment-top f-oh">
                  <img class="head-profile f-fl" :src=comMain.userHeadLogo alt="">
                  <!---->
                  <p class="name f-fl fontSize-11">{{ comMain.userName }}</p>
                  <span class="time f-fr fontSize-9">{{ comMain.time }}</span>
                </div>
                <p class="comment-text ellipsis-rows">{{ comMain.context }}</p>
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <!--底部导航-->
    <div class="buy-btn-content b-white f-oh">
      <ul class="feature-btn f-fl f-oh fontSize-10">
        <li class="feature-btn-row f-fl" @click='featureBtnCLick(item,index)'
            v-for="(item,index) in featureBtnLists " :key="index">
            <img class="inner-img f-db" :src=item.iconPic v-if="isCollectPro">
            <img class="inner-img f-db" :src=item.cancelIcon v-else>
            <p class="li-inner btn-name m-top5 f-db">{{ item.word }}</p>
        </li>
        <!--<li class="feature-btn-row f-fl">-->
          <!--<img class="inner-img f-db" :src=item.iconPic>-->
          <!--<p class="li-inner btn-name m-top5 f-db">{{ item.word }}</p>-->
        <!--</li>-->
      </ul>
      <div class="buy-btn f-fr fontSize-15">
        <span class="buy" @click="showBuyNow">买</span>
        <span class="sale" @click="maijianglijin()">卖</span>
      </div>
      <div v-if="isShowShare" class="share-popup"></div>
      <div class="show-buynow-popup" v-if="isShowBuyNowPop">
        <div class="popup-main">
          <div class="pro-img-infos f-oh">
            <img class="buy-now-headprofile f-fl" :src=productData.logo alt="">
            <div class="pro-word f-fl">
              <p class="pro-name fontSize-13">{{productData.name}}</p>
              <p class="pro-price fontSize-15" v-text=skuPrice>￥{{skuProObj.marketPrice}}</p>
            </div>
          </div>

          <!--产品规格选择-->
          <div class="choose-spec">
            <ul class="spec-main fontSize-14">
              <li class="spec-main-row" v-for="(spec,i) in shaixuanData" :key="i">
                <p class="choose-title f-fl">{{spec.attrName}}</p>
                <div class="choose-detail f-fl f-oh">
                  <span class="choose-option f-fl"
                        v-for="(item,j) in spec.attrValue" :key="j"
                        :class="{'activeColor' : item.checked}"
                        @click = 'chooseItem(spec,item,i)'
                  >{{item.attrValueName}}</span>
                </div>
              </li>
              <li class="spec-main-row">
                <p class="choose-title f-fl">分期选择</p>
                <div class="choose-detail f-fl f-oh">
                  <span class="choose-option f-fl"
                        v-for="(item,i) in fenqiShu" :key="i"
                        @click="chooseFenqi(item,i)"
                        :class="{activeColor : item.checked}"
                  >{{item.description}}</span>
                </div>
              </li>
              <li class="spec-main-row f-oh">
                <p class="choose-title f-fl">数量</p>
                <div class="choose-detail add-reduce-main f-fl f-oh">
                  <p class="add-reduce-btns f-fl" @click="reduceBtn">-</p>
                  <span class="buy-total-num f-fl">{{buyCount}}</span>
                  <p class="add-reduce-btns f-fl" @click="addBtn">+</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="addCart-confirm-btns fontSize-16 f-oh">
            <dt class="addCart addCart-confirm-btn f-fl" @click="addBuyCart()">加入购物车</dt>
            <!--<router-link class="router" to="/home/confirmOrderRouter">-->
            <dt class="confirm addCart-confirm-btn f-fl" @click="confirmOrder()">确定</dt>
            <!--</router-link>-->
          </div>
        </div>
      </div>
      <!--弹出二维码-->
      <div v-if="isShowQRCode" class="QRCode-main p-lef-rig24">
        <div class="img-outside">
          <img class="QRcode-pro-img" :src=productData.logo alt="">
        </div>
        <span class="fontSize-14 name">{{productData.name}}</span>
        <span class="price">￥{{productData.mallPrice}}</span>
        <div class="QRCode-img"></div>
        <i class="icon iconfont icon-close close-QRcode" @click="blockClick"></i>
      </div>
      <div v-if="isCall" class="call-popup f-pr">
        <p class="warn fontSize-18">提示</p>
        <p class="confirm-call fontSize-15">确认拨打电话： {{ phoneNumber }}吗？</p>
        <dt class="btn-main fontSize-14 f-oh">
          <div class="cancel-btn btns" @click="cancelCall">取消</div>
          <div class="confirm-btn btns">确定</div>
        </dt>
      </div>
      <div v-if="isBlackCoverShow" class="blackCoverShow" @click="blockClick"></div>
      <!--点击 客服 弹出联系方式-->
      <div v-if="isContactWaysShow" class="contact-service f-pr">
        <i class="icon iconfont icon-close f-abs" @click="hidePop"></i>
        <dt class="contact-ways wechat f-abs">
          <img :src=chatIcon.weChat alt="">
        </dt>
        <dt class="contact-ways phone f-abs" @click = "makeCall">
          <img :src=chatIcon.phone alt="">
        </dt>
        <dt class="contact-ways chatnow f-abs" @click="toChatNow">
          <a href="http://yxtccb.com:8080/chat/wab/index">
            <img :src=chatIcon.message alt="">
            <span style="color: black;">聊天</span>
          </a>
        </dt>
      </div>
    </div>

    <!--显示可获得奖励金弹窗-->
    <div v-if="isShowMaiJianglijin" class="maiJiangli">
      <span class="fontSize-15 money">赚{{productData.shareMoney}}元</span>
      <span class="fontSize-12 warn p-lef-rig24">只要你的好友通过你的链接购买此商品，你就能得到至少{{productData.shareMoney}}元的奖励金</span>
      <div class="btns">
        <span class="share fontSize-15" @click="sharePopup()"><i class="icon iconfont icon-fenxiang m-right5"></i>分享</span>
        <span class="QRcode fontSize-15"  @click="QRcode"><i class="icon iconfont icon-erweima m-right5"></i>二维码</span>
      </div>
    </div>
    <div class="tishi-fenxiang-pop f-oh" v-if="isShowFenxiang">
      <div class="jiantou">
        <img :src=jiantouImg alt="">
      </div>
      <div class="word">
        <span class="f-fl">点击右上角的</span>
        <img class="f-fl" :src=menuImg alt="">
        <span class="f-fl">去分享</span>
      </div>
      <span>不要让利润跑掉哦</span>
    </div>
  </div>
</template>
<style>
  .details-all img{
    width: 100%;
  }
</style>
<script>
  import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
  import lunpicComponent from "./../../../subcomponents/lunpic-component.vue";
  import { Navbar, TabItem ,Indicator, Toast, Popup, DatetimePicker,MessageBox } from "mint-ui";
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
//import '../../../common/jq.min';
//import '../../../common/jquery.qrcode.min';

  // const imgList = [
  //   '@/../static/img/home/brand_store/pro_detail.png',
  //   '@/../static/img/home/brand_store/pro_detail.png',
  //   '@/../static/img/home/brand_store/pro_detail.png'
  // ]
  // const demoList = imgList.map((one, index) => ({
  //   url: 'javascript:',
  //   img: one
  // }))
  export default{
    data () {
      return {
        selecteda: '1',
        isShowMaiJianglijin : false,
        isShowJianglijin : false,
        isBlackCoverShow : false ,
        isContactWaysShow : false,
        isShowBuyNowPop : false,
        isShowQRCode : false,
        isShowFenxiang : false,
        isCall : false ,
        isShowShare : false,
        buyNum : null,
        activeNum : 0,
        buyInfosLists : null,
        phoneNumber : 40008000 ,
        comNum: 0,
        // selected : '1',
        productId : null,
        phoneName : '',
        // demo03_list: demoList,
        picSrc : '@/../static/img/home/brand_store/pro_detail.png',
        jianglijinIcon : '@/../static/image/home/brand_store/jianglijin_01.png',
        btnLists : [
          {
            name : '收藏店铺',
            index : 0,
            routerPath : ''
          },
          {
            name : '进入店铺',
            index : 1,
            routerPath : ''
          },
          {
            name : '联系客服',
            index : 2,
            routerPath : ''
          }
        ],
        commDetailLists : [
          {
            userName : '刘德华',
            headProfileSrc : '',
            time : '2018-02-27',
            commentTextArea : '用了一个礼拜了，之前一直听说有斜纹，用了一个礼拜了，\n' +
            '                  之前一直听说有斜纹，用了一个礼拜了，之前一直听说有斜纹，' +
            '但是拿到手后觉得自己斜纹还好，没那么严重'
          },
          {
            userName : '张国荣',
            headProfileSrc : '',
            time : '2018-02-27',
            commentTextArea : '用了一个礼拜了，之前一直听说有斜纹，用了一个礼拜了'
          },
          {
            userName : '张学友',
            headProfileSrc : '',
            time : '2018-02-27',
            commentTextArea : '用了一个礼拜了，之前一直听说有斜纹，用了一个礼拜了，\n' +
            '                  之前一直听说有斜纹，用了一个礼拜了，之前一直听说有斜纹，' +
            '但是拿到手后觉得自己斜纹还好，没那么严重'
          },
        ],
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
          {
            iconPic : '@/../static/image/home/brand_store/buycart_01.png',
            cancelIcon : '@/../static/image/home/brand_store/buycart_01.png',
            word : '购物车',
          },
        ],//底部导航
        proDetailData : {},//产品细节全部资料
        productData : {},//产品细节--Product
        brandData : {},//店铺信息
        shaixuanData : [],//筛选规格选择
        skuShowLists : [],//sku展示列表
        buyCount : 1,//购买数
        fenqiShu : [],//分期数
        fenqiXuanzhongNum : null,//选中分期数
        skuProObj : '',//选中的sku对象选取不规格 显示不同价格
        skuPrice : null,
        selected : {
          chooseI : 0,
          chooseJ : 0,
         },
        chatIcon:{
          phone : '@/../static/image/home/phone_01.png',
          weChat : '@/../static/image/home/weChat_01.png',
          message : '@/../static/image/home/duanxin_01.png',
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
        shouHouSevice : {},
        isCollectPro : false,//是否收藏了商品
        isCollectStore : false,//是否收藏了店铺
        collectStore : '收藏店铺',
      }
    },
    methods : {
      //
      clickNavBtns(){
        this.collectStoreAxios();
        if(this.isCollectStore){

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
      //收藏店铺
      collectStoreAxios(){
        var vm = this;
        let brandId = vm.brandData.id
        // var params = new URLSearchParams();
        // params.append('id',proId);
        $.ajax({
          url:comLink.yxtHost + '/brand/enshrineBrand',
          data:{
            'brandId' : brandId,
            'openid':sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              if(data.data === true){
                vm.isCollectStore = true;
                vm.collectStore = '已收藏'
              }else{
                MessageBox.confirm('确定取消收藏店铺吗?').then(action => {
                  vm.isCollectStore = false;
                  vm.collectStore = '收藏店铺'
                });
              }
              Toast({
                message: data.msg,
                duration: 2000
              });
            }

          },
          error:function (data) {

          }
        })
      },
      //获取商品详情
      proDetailAxios:function(){
        var _vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let proId = hash[1];//传递过来的id
        _vm.productId = proId;
        $.ajax({
          url:comLink.yxtHost + '/product/productDetails',
          data:{
            id : proId,
            openid:sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              _vm.proDetailData = data.data;//获取店铺数据 --对象
              console.log(_vm.proDetailData.isEnshrine)
              // //判断商品是否收藏了
              if(_vm.proDetailData.isEnshrine[0] === 0){
                _vm.isCollectPro = false;
              }else if (_vm.proDetailData.isEnshrine[0] === 1){
                _vm.isCollectPro = true;
              }
              // //判断店铺是否收藏了
              if(_vm.proDetailData.isEnshrine[1] === 0){
                _vm.isCollectStore = false;
                _vm.collectStore = '收藏店铺'
              }else if(_vm.proDetailData.isEnshrine[1] === 1){
                _vm.isCollectStore = true;
                _vm.collectStore = '已收藏'
              }
              _vm.productData = _vm.proDetailData.product;
              _vm.productData.logo = comLink.yxtImgHost + _vm.productData.logo;
              _vm.skuPrice = _vm.productData.mallPrice;
              _vm.content = _vm.productData.introduction;
              _vm.guigeContent = _vm.productData.specification
              for(var i = 0,l = _vm.productData.mulImgArray.length;i<l;i++){
                var obj = {
                  url : _vm.productData.url,
                  img : comLink.yxtImgHost + _vm.productData.mulImgArray[i]
                }
                _vm.lunboUrl.push(obj)
              }
              _vm.brandData = _vm.proDetailData.brand;
              _vm.brandData.logo = comLink.yxtImgHost + _vm.brandData.logo;
              _vm.shaixuanData = _vm.proDetailData.attrAndAttrValueList;//获取筛选规格
              _vm.skuShowLists = _vm.proDetailData.productSkuList;
              for(var i = 0,l = _vm.skuShowLists.length;i < l;i++){
                _vm.skuShowLists[i].imgPath = comLink.yxtImgHost + _vm.skuShowLists[i].imgPath;
              }
              for(var i = 0 ,l = _vm.proDetailData.attrAndAttrValueList.length;i<l;i++){
                for(var j = 0,il = _vm.proDetailData.attrAndAttrValueList[i].attrValue.length;j<il;j++){
                  _vm.proDetailData.attrAndAttrValueList[i].attrValue[j].checked = false;
                }
              }
            }
          },
          error:function (data) {

          }
        })
      },
      //获取分期数
      getPeriodAxios: function(){
        var _vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let proId = hash[1];//传递过来的id
        var params = new URLSearchParams();
        params.append('openid',sessionStorage.openid);

        this.$axios({
          method: 'post',
          url:comLink.yxtHost + '/product/period',
          data: params
        }).then((res)=>{
          if(res.data.code == 1){
            _vm.fenqiShu = res.data.data;
            for( var i = 0, l = _vm.fenqiShu.length;i < l;i ++ ){
              _vm.fenqiShu[i].checked = false;
            }
            //
            // Toast({
            //   message: res.data.msg,
            //   duration: 2000
            // });
          }
        });
      },
      //收藏商品
      collectProAxios: function(){
        var _vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let proId = hash[1];//传递过来的id
        var params = new URLSearchParams();
        params.append('productId',proId);
        params.append('openid',sessionStorage.openid);
        this.$axios({
          method: 'post',
          url:comLink.yxtHost + '/product/enshrineProduct',
          data: params
        }).then((res)=>{
          if(res.data.code == 1){
              if(res.data.data === true){
                _vm.isCollectPro = true;
              }else{
                MessageBox.confirm('确定取消收藏?').then(action => {
                  _vm.isCollectPro = false;
                });
              }
            Toast({
              //mintui提示效果
              message: res.data.msg,
              duration: 2000
            });
          }
        });
      },

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
                message: data.msg,
                duration: 2000
              });
            }
          },
          error:function (data) {

          }
        })
      },
      //获取二维码地址
      getQRCodeAxios: function(){
        var _vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let proId = hash[1];//传递过来的id
        var params = new URLSearchParams();
        params.append('id',proId);params.append('openid',sessionStorage.openid);
        this.$axios({
          method: 'post',
          url:comLink.yxtHost + '/product/processQrCode',
          data: params
        }).then((res)=>{
          if(res.data.code == 1){
            // Toast({
            //   //mintui提示效果
            //   message: res.data.msg,
            //   duration: 2000
            // });
            _vm.qrcodeUrl = res.data.data;
          }
        });
      },

      //查询默认地址
      // getDefaultAddress:function(){
      //   var vm = this;
      //   $.ajax({
      //     url:comLink.yxtHost + '/user/getDefaultAddress',
      //     data:{
      //       openid:sessionStorage.openid
      //     },
      //     dataType:'json',
      //     type:'post',
      //     success:function (data) {
      //       if(data.code == 1){
      //         vm.confirmOrderAxios();
      //       }else{
      //         Toast({
      //           message: '请设置默认地址',
      //           duration: 2000
      //         });
      //       }
      //     },
      //     error:function (data) {
      //
      //     }
      //   })
      // },

      // //提交订单
      confirmOrderAxios: function(){
        var _vm = this;
        if(!_vm.fenqiXuanzhongNum || !_vm.skuId){
          Toast({
            //mintui提示效果
            message: "还未选中商品",
            duration: 2000,
          });
          return
        }
        if(this.isShowBuyNowPop = true){
          this.isShowBuyNowPop = false;
          this.isBlackCoverShow = false
        }
        $.ajax({
          url:comLink.yxtHost + '/car/postOrder',
          data:{
            numbers : _vm.buyCount,//购买数量
            period : _vm.fenqiXuanzhongNum,//选择分期
            skuIds : _vm.skuId,//sku数字
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
              console.log(data,'data')
              _vm.$router.push({
                path : "/home/confirmOrderRouter",
                query:{orderId:data.data}
              });
            }

          },
          error:function (data) {

          }
        })
      },
      //添加购物车按钮
      addBuyCart(){
        // this.isShowBuyNowPop = false;
        // this.isBlackCoverShow = false;
        this.getSkuItems();
        if(!this.skuProObj){
          Toast({
            message: '请选中商品规格',
            duration: 2000
          });
        }else{
          this.addCartAxios();
        }
      },
      getSkuItems(){
        var specParamsIDStr = this.specParamsIDArr.join(',');
        for(var i = 0,l = this.skuShowLists.length;i < l;i++){
          if(this.skuShowLists[i].attrValId === specParamsIDStr){
            this.skuId = this.skuShowLists[i].id;
            this.skuProObj = this.skuShowLists[i];
            this.skuPrice = this.skuShowLists[i].marketPrice;
            break
            this.skuObject = this.skuShowLists[i]
          }
        }

      },
      //跳转我的中心
      toMyCenter(){
        this.$router.push({
          path: '/mine'
        })
      },
      //获取商品详情 评价
      proJieshaoAxios: function(){
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let proId = hash[1];//传递过来的id
        $.ajax({
          url:comLink.yxtHost + '/product/commentList',
          data:{
            pageNum : vm.pageNum,
            pageSize : vm.pageSize,//选择分期
            productId : proId,
            openid:sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            console.log(data,'评价data')
            if(data.code == 1){
              vm.comContent = data.data;
              for( var i = 0,l = vm.comContent.length;i < l;i ++){
                var date = new Date(vm.comContent[i].createTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
                vm.comContent[i].time = Y + M + D
                console.log(vm.comContent[i].time)
              }
              vm.comNum = vm.comContent.length;
              // Toast({
              //   //mintui提示效果
              //   message: data.msg,
              //   duration: 2000
              // });
            }
          },
          error:function (data) {

          }
        })
      },
      //售后服务内容
      shouHouSeviceAxios: function(){
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/product/guarantee',
          data:{
            openid:sessionStorage.openid,
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){
              vm.shouHouSevice = data.data;

            }
          },
          error:function (data) {

          }
        })
      },
      //点击选择分期
      chooseFenqi(item,i){
        var isTrue = item.checked;
        for(var i=0, l = this.fenqiShu.length;i < l;i++ ){
          this.fenqiShu[i].checked = false;
        }
        item.checked = !isTrue;
        this.fenqiShu.splice(100,1);
        if(item.checked){
          this.fenqiXuanzhongNum = item.label;
        }else{
          this.fenqiXuanzhongNum = null
        }
      },
      //QRCode
      QRcode(){
        this.isShowQRCode = true;
        this.isBlackCoverShow = true;
        this.isShowMaiJianglijin = false;
        var vm = this;
        setTimeout(function(){
          var qWidth = $('.QRCode-img').width();
          var qHeight = $('.QRCode-img').height();
          jQuery('.QRCode-img').qrcode({
            render: "canvas", //也可以替换为table
            width: qWidth,
            height: qHeight,
            text: vm.qrcodeUrl
          });
        })
      },
      featureBtnCLick : function(item,index){
        if( index === 0 ){
          this.isBlackCoverShow = true;
          this.isContactWaysShow = true
        }
        if(item.word ==="首页"){
          this.$router.push({
            path : '/'
          })
        }
        if(item.word ==="收藏"){
          this.collectProAxios();
          // if(this.isCollectPro){
          //   item.word = '已收藏'
          // }
          // if(this.isShouCang === false){
          //   Toast({
          //     //mintui提示效果
          //     message: '收藏成功',
          //     duration: 2000
          //   });
          // }else{
          //   Toast({
          //     //mintui提示效果
          //     message: '取消收藏',
          //     duration: 2000
          //   });
          // }
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
      makeCall : function(){
        this.isContactWaysShow = false;
        this.isCall = true
      },
      toChatNow(){//直接聊天
        // this.$router.push({
        //   path : '/home/contantKefu',
        // })
      },
      //取消拨打电话
      cancelCall : function(){
        if(this.isCall === true){
          this.isCall = false;
          this.isBlackCoverShow = false;
        }
      },
      //显示 立即购买 弹窗
      showBuyNow : function(){
        this.isShowBuyNowPop = true;
        this.isBlackCoverShow = true;
      },
      //隐藏 立即购买 弹窗
      confirmOrder : function(){
        this.confirmOrderAxios()
        // this.getDefaultAddress();
        // this.$router.push({
        //   path : "/home/confirmOrderRouter",
        //   // query:{idArr:this.cardIdStr,orderId:data.data}
        // })
      },
      //点击弹出 分享 提示
      sharePopup(){
        // alert('点击了');
        MessageBox.confirm('确定执行此操作?').then(action => {
          // alert('确认了')
        });
        this.isBlackCoverShow = true;
        this.isShowFenxiang = true;
        this.isShowMaiJianglijin = false;
      },
      //选择购买数量
      reduceBtn : function(){
        if(this.buyCount > 1){
          this.buyCount -= 1
        }else{
          this.buyCount = 1
        }
      },
      addBtn : function () {
        this.buyCount += 1;
      },
      // activeChooseSpec : function(index3,spe){
      //   spe.index = index3;
      // },
      //点击黑色遮罩层，隐藏弹窗
      blockClick : function(){
        if(this.isBlackCoverShow){
          this.isBlackCoverShow = false;
          this.isContactWaysShow = false;
          this.isShowBuyNowPop = false;
          this.isShowMaiJianglijin = false;
          this.isShowJianglijin = false;
          this.isShowQRCode = false;
          this.isShowFenxiang = false;
          this.isShowBuyNowPop = false;
          // this.isCall = false
        }
      },
    //  奖励金
      jinglijin(){
        this.isBlackCoverShow = true;
        this.isShowJianglijin = true;
      },
    //  卖 奖励金
      maijianglijin(){
        this.isBlackCoverShow = true;
        this.isShowMaiJianglijin = true;

        let aaa = this.jiaMi(this.picSrc);
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
      chooseItem:function(spec,item,index) {
        var isTrue = item.checked;
        for(var i=0, l = spec.attrValue.length;i < l;i++ ){
          spec.attrValue[i].checked = false;
        }
        item.checked = !isTrue;
        this.shaixuanData.splice(100,1);
        if(item.checked){
          this.specParamsIDArr[index] = item.id
        }else{
          this.specParamsIDArr[index] = null
        }

        // specParamsIDArr
        this.getSkuItems();
      }
    },
    mounted:function(){
      this.proDetailAxios();//获取产品信息详情
      this.getQRCodeAxios();//获取二维码地址
      this.getPeriodAxios();//获取分期数
      this.proJieshaoAxios();
      this.shouHouSeviceAxios();//售后服务信息
      // this.collectProAxios();//进入页面 判断是否已收藏 如果是 收藏图标为黄色
    },
    components : {
      lunpicComponent,
      Swiper,
      SwiperItem,
      GroupTitle,
      XButton,
      Divider
    }
  }
</script>
<style lang="scss">
  .blackCoverShow{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: black;
    opacity: 0.4;
  }

  .mint-tab-item .mint-tab-item-label{
    display: inline-block;
    height: 3.75rem;
    line-height: 3.75rem;font-size: 1.75rem;
  }
  .mint-navbar .mint-tab-item{
    border-bottom: 1px solid #ccc;
    padding: 0.1875rem 0;

  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 1px solid #ccc;
    margin-bottom: 0;
  }
  .mint-tab-item.is-selected .mint-tab-item-label{
    color: #307ff5;
    box-sizing: border-box;
    border-bottom: 0.3125rem solid #307ff5;

  }
</style>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .activeColor{
    color: $bgBlue;
  }
  .pro-detail-content{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: p(100);
    overflow-y: auto;

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
        }
        .QRcode{
          width: 49%;
          float: right;
          color: white;
          background: $bgBlue;
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
        padding: p(20);
        border-bottom: p(2) solid #ccc;

        .pic-main{
          width: 100%;
        }
      }
      .pro-details{

        .brand{
          display: inline-block;
          padding: p(3) p(10);
          border-radius: p(5);
          background: #ff251a;
          margin-top: p(17);
        }

        .pro-name{
          max-width: p(590);
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
            width: p(22);
            line-height: p(22);
            height: p(22);
            border-radius: 50%;
            text-align: center;
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
        border: p(1) solid #ccc;
        text-align: center;

        .img-pic{
          width: 98%;//100x100像素店铺头像
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
              margin-left: p(100);
              /*max-height: p(90);*/
              padding-bottom: p(20);
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
      padding: p(10) p(20);
      border-top: p(1) solid #999999;

      .feature-btn{
        width: 50%;
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
        }
      }
      .buy-btn{
        width: 45%;
        height: p(80);
        color: white;
        overflow: hidden;
        display: flex;
        justify-content: space-evenly;
        >span{
          display: inline-block;
          font-size: p(28);
          line-height: p(80);
          text-align: center;
          width: 45%;
          border-radius: p(10);
          float: left;
        }
        >span:nth-child(1){
          background: $qianhong;
          /*margin-right: p(20);*/
        }
        >span:nth-child(2){
          background: $bgBlue;
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
          >img{
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

      .call-popup{
        display: inline-block;
        height: p(290);
        border-radius: p(10);
        background: white;
        position: fixed;
        top: p(375);
        right: p(75);
        left: p(75);
        z-index: 99;
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
          .confirm-btn{
            background: #307ff5;
            color: white;
          }
        }
      }

      .share-popup{
        display: inline-block;
        position: fixed;

      }
      .show-buynow-popup{
        width: 100%;
        /*height: p(575);*/
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        background: white;
        z-index: 99;
        padding-bottom: p(120);

        .popup-main{
          width: 100%;

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
              margin-top: p(80);
              margin-left: p(15);

              .pro-price{
                color: #ff374c;
                margin-top: p(15);
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
              width: 50%;
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
        width: p(540);
        left: 50%;
        margin-left: p(-270);
        height: p(690);
        background: white;
        border-radius: p(10);
        z-index: 9;

        .img-outside{
          width: 100%;
          margin-top: p(30);
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
        }
        .price{
          font-size: p(26);
          color: #e26a86;
          display: block;
          margin-top: p(20);
        }
        .QRCode-img{
          width: p(120);
          height: p(120);
          position: absolute;
          bottom: p(24);
          right: p(24);
          background: grey;
        }
        .close-QRcode{
          font-size: p(60);
          font-weight: bold;
          color: white;
          position: absolute;
          bottom: p(-80);
          left: 50%;
          margin-left: p(-25);
        }
      }
    }
  }
</style>
