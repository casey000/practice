<template>
  <div class="cart" v-title data-title="购物车">
    <div class="search-main f-oh">
      <div class="search-inp-main f-oh f-fl">
        <i class="icon iconfont icon-search f-fl"></i>
        <input class="head-search f-fl fontSize-15" type="text" @click="searchBtn" placeholder="邮讯通免息购物平台">
      </div>
      <!--<div class="search-btn f-fl" @click="toMine()">
        <i class="search-righticon iconfont icon-wode1"style="font-size: 3rem; color: #666;line-height: 0;"></i>
        <i class="mine fontSize-12" style="width: 100%;color: #666;line-height: 0;">我的</i>
      </div>-->
    </div>
   <!-- <scroller height="-40" lock-x  ref="myScroller">-->
      <div class="lists">
        <!--这里是购物车 品牌列表 一级目录-->
        <div class="list" v-for="(data,i) in buyCartDataLists" :key="i" v-if="">
          <div class="tit">
            <div class="top">
              <div class="left" @click="fenqiItem(data)">
                <i v-if="data.periodChecked" class="iconfont icon-chenggong"></i>
                <i v-else  class="iconfont icon-not_Selected-copy"></i>
                <span>分期结算（{{data.period}}期）</span>
              </div>
              <div class="right" @click="showDelete(data)" v-if="!showDeletebtn">管理</div>
              <div class="right" @click="showDelete(data)" v-if="showDeletebtn">完成</div>
            </div>
          </div>
          <div class="lists2">
            <ul>
              <!--品牌-->
              <li v-for="(braItem,k) in data.brandList" :key="k">
                <div class="bottom">
                  <div class="left" @click="storeItem(data,braItem)">
                    <i v-if="braItem.brandChecked" class="iconfont icon-chenggong"></i>
                    <i v-else  class="iconfont icon-not_Selected-copy"></i>
                    <span>{{braItem.name}}</span>
                    <i class="iconfont  icon-more"></i>
                  </div>
                  <!--<div class="right" @click="showDelete(this)">管理</div>-->
                </div>
                <div class="content">
                  <ul class="goodsSonList">
                    <!--这里是品牌下的 产品列表-->
                    <li v-for="(proItem,j) in braItem.productList" :key="j" v-if="proItem.stock != 0">
                      <div class="quanquan" @click="danxuanClick(proItem,braItem,data)">
                        <i v-if="proItem.productChecked" class="iconfont icon-chenggong"></i>
                        <i v-else  class="iconfont icon-not_Selected-copy"></i>
                      </div>
                      <div class="imgBox" @click="toProDetail(proItem)">
                        <img :src="proItem.logo" alt="">
                      </div>
                      <div class="content">
                        <div class="ellipsis">{{proItem.name}}</div>
                        <div class="ellipsis-rows" v-if="!showDeletebtn">{{proItem.skuName}}</div>

                        <!--编辑的时候可以修改sku-->
                        <div class="ellipsis-rows" v-else>
                          <!--<p v-for="(sku, k) in proItem.skuList" >{{sku.productSkuName}}</p>-->

													 <!--<select class="" v-model="selected" @change="updateSku(selected, proItem.carId)">
											        <option v-for="(sku, k) in proItem.skuList" :value="sku.id">{{sku.productSkuName}}</option>
													 </select>-->
													 <div class="selection-component">
														<div class="selection-show" @click=showHide(proItem,$event)>
															<span class="skuname">{{proItem.skuName}}</span>
															<div class="arrow"></div>
														</div>
														<div class="selection-list" >
															<ul>
																<li @click="updateSku(sku.id, proItem.carId,sku.productSkuName,$event)" v-for="(sku, k) in proItem.skuList">{{ sku.productSkuName }}</li>
															</ul>
														</div>
													</div>

                        </div>

                        <div class="ellipsis">分期情况：{{data.period}}期</div>
                        <div class="ellipsis">￥{{proItem.price}}</div>
                        <div>
                          <span @click="minBtn(proItem)">-</span>
                          <span>{{proItem.number}}</span>
                          <span class="addBtn" @click="addBtn(proItem)">+</span>
                        </div>
                      </div>
                    </li>
                    <li v-for="(proItem,j) in braItem.productList" :key="j" v-if="proItem.stock <= 0" style="background-color: #ccc;opacity: 0.4;">
                     <!-- <div style="opacity: 1;position: absolute;">该商品无货</div>-->
                      <div class="quanquan">
                        <i v-if="proItem.productChecked" class="iconfont icon-chenggong"></i>
                        <i v-else  class="iconfont icon-not_Selected-copy" style="background-color: #ccc"></i>
                      </div>
                      <div class="imgBox">
                        <img :src="proItem.logo" alt="">
                      </div>
                      <div class="content">
                        <div class="ellipsis">{{proItem.name}}</div>
                        <div class="ellipsis-rows">{{proItem.skuName}}</div>
                        <div class="ellipsis">分期情况：{{data.period}}期</div>
                        <div class="ellipsis">￥{{proItem.price}}</div>
                        <div>
                          <span>-</span>
                          <span>{{proItem.number}}</span>
                          <span class="addBtn">+</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="zhicheng" style="height:29rem;"></div>
      </div>
    <!--</scroller>-->
 		<div class="beian">
      	 ©粤ICP备14033764号-2
    </div>
    <div class="settleAccounts">
      <div class="price-shipping">
        <div class="top">￥{{selectData.allPrice}}</div>
        <div class="word">不含运费</div>
      </div>
      <mt-button size="normal" v-if="showDeletebtn" @click="shanchuBtn()">删除</mt-button>
      <mt-button size="normal" v-if="!showDeletebtn"  @click="jiesuanBtn()">结算</mt-button>
    </div>
   

    
  </div>
</template>
<script>
  import axios from 'axios'
  import { Scroller } from 'vux'
import comLink from "./../../common/common_link"; //导入总线
import { Indicator, Toast, Popup, DatetimePicker, MessageBox } from "mint-ui";
import $ from "jquery"; //导入jquery
//import beian from "@/subcomponents/beian.vue";

export default {
  inject: ['reload'],
  data() {
    return {
    	choosesku:'请选择',
    	showDeletebtn:false,
      buyCartDataLists : [],//购物车列表数据
      selectData: {
        allPrice: 0,
        allChecked: false, //全选判断值
        fenqiNum : false,
        brandNum :false,
      },
			toastnum:0,
      buyNumber : 0,
      cardIdAttr : [],//购物车id数组
      cardIdStr : '',//购物车id字符串
      pageNum : 0,
      user : {},
      userWx : {},
      vipHeadProfile: '',//头像
      userId : null,//用户id userId
      userName : null,//用户姓名
      openId : null,
      isRequest:true,
      fenqishuNum : null,
      deleteId:[],
      skuArr:[],
      selected:'',
      show:false,
    };
  },
  created() {},
  methods: {
    toMine() {
      this.$router.push({
        path : '/mine',
      });
    },
		showHide(proitem,e){
			var e=e.srcElement || e.target
			$(e).siblings('.selection-list').toggleClass('showlist');
			$(e).parents('.selection-show').siblings('.selection-list').toggleClass('showlist')

				this.show=!this.show;

		},
  	showDelete(data){
  		this.showDeletebtn=!this.showDeletebtn;

			if(this.toastnum%2 ==0){


			}
			this.toastnum=this.toastnum+1;
			if(!this.showDeletebtn) {
			  this.reload();
        // window.location.reload();
      }
  	},
    //点击商品 跳转详情页
    toProDetail(proItem){
      this.$router.push({
        path : '/home/proDetailRouter',
        query : { id : proItem.id}
      })
    },
    //结算按钮
    jiesuanBtn(){
      this.jiesuanFun();
    },
    searchBtn(){
      $('input').blur();
      this.$router.push({
        path : '/home/homeSearchRouter',
      })
    },
    shanchuBtn(){
  	  var vm = this;
    	this.cardIdAttr = [];
      for( var i = 0,l = this.buyCartDataLists.length;i < l;i ++){
        for( var j = 0,il = this.buyCartDataLists[i].brandList.length;j < il; j ++){
          let brand = this.buyCartDataLists[i].brandList;
          for(var k = 0,kl = brand[j].productList.length;k < kl;k ++){
            let pro = brand[j].productList;
            if(pro[k].productChecked){
              let id = pro[k].carId;
              if(this.cardIdAttr.indexOf(id) < 0){
                this.cardIdAttr.push(id);
              }
            }
          }
        }
      }
      for(var i = 0,l = this.buyCartDataLists.length;i < l;i ++){
        if(this.buyCartDataLists[i].periodChecked){
          this.fenqishuNum = this.buyCartDataLists[i].period;
        }
      }
      this.cardIdStr = this.cardIdAttr.join(',');
      // console.log(this.cardIdStr);
      // alert(this.cardIdStr);
      if(this.cardIdStr == '') {
        Toast({
          message: '请选择要删除的商品',
          duration: 2000
        });
        return;
      }
      MessageBox.confirm('确定删除吗?').then(action => {
        $.ajax({
          url:comLink.yxtHost + '/car/del',
          data:{
            openid : sessionStorage.openid,
            ids: this.cardIdStr,
            // period : _vm.fenqishuNum
          },
          dataType:'json',
          type:'post',
          success:function (data) {
//          console.log(data)
            if(data.code == 1){
              Toast({
                message: data.msg,
                duration: 2000
              });
              vm.reload();
            }else {
              Toast({
                message: data.msg,
                duration: 2000
              });
            }
          },
        })
      });
    },
    //更改sku
    updateSku(skuId, carId,productSkuName,e) {
    	var e=e.srcElement || e.target
			$(e).parents('.selection-list').toggleClass('showlist')
			$(e).parents('.selection-list').siblings('.selection-show').children('.skuname').text(productSkuName);

    	this.show=false;
    	this.choosesku=productSkuName;
      $.post(comLink.yxtHost + '/car/updateSku', {
        'skuId' : skuId,
        'carId' : carId
      }, function(resp) {
        //不用刷新页面
       // location.reload();
       // this.selected="已选择"
      });

    },
    //结算方法
    jiesuanFun(){
      this.cardIdAttr = [];
      for( var i = 0,l = this.buyCartDataLists.length;i < l;i ++){
        for( var j = 0,il = this.buyCartDataLists[i].brandList.length;j < il; j ++){
          let brand = this.buyCartDataLists[i].brandList;
          for(var k = 0,kl = brand[j].productList.length;k < kl;k ++){
            let pro = brand[j].productList;
            if(pro[k].productChecked){
              let id = pro[k].carId;
              if(this.cardIdAttr.indexOf(id) < 0){
                this.cardIdAttr.push(id);
              }
            }
          }
        }
      }
      for(var i = 0,l = this.buyCartDataLists.length;i < l;i ++){
        if(this.buyCartDataLists[i].periodChecked){
          this.fenqishuNum = this.buyCartDataLists[i].period;
        }
      }
      this.cardIdStr = this.cardIdAttr.join(',');
//    console.log(this.cardIdStr)
      if(this.cardIdStr && this.cardIdStr!==''){
        this.clickJiesuanAxios();
        this.$router.push({
          path : "/home/carConfirmOrder",
          query:{ idArr:this.cardIdStr }
        });
      }else{
        Toast({
          message: '请选中商品',
          duration: 2000
        });
      }
    },
    //点击结算
    clickJiesuanAxios: function(){
      var _vm = this;
        $.ajax({
          url:comLink.yxtHost + '/car/settlement',
          data:{
            openid : sessionStorage.openid,
            carIds : _vm.cardIdStr,
            // period : _vm.fenqishuNum
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            if(data.code == 1){

            }else {

            }
          },
          error:function (data) {

          }
        })
    },
    //获取购物车列表
    getCollectListsAxios: function(){
      var _vm = this;
      if(this.isRequest){//todo
        // _vm.pageNum ++;//todo
        this.isRequest = false;
        $.ajax({
          url:comLink.yxtHost + '/car/getPage',
          data:{
            // 'pageNum' : _vm.pageNum,
            'openid' : sessionStorage.openid
          },
          dataType:'json',
          type:'post',
          success:function (data) {
            setTimeout(function(){//todo
              _vm.isRequest = true;
            },2000);
            if(data.code == 1){
              if(data.data && data.data.length > 0){
                let newData = data.data;
                for(var i = 0; i < newData.length;i ++){
                  newData[i].periodChecked = false;
                  let brandList = newData[i].brandList;
//									console.log(brandList)
                  for(var j = 0;j < brandList.length;j ++){
                    brandList[j].brandChecked = false;
                    brandList[j].logo = comLink.yxtImgHost + brandList[j].logo;
                    let proList = brandList[j].productList;
                    for(var k = 0;k < proList.length;k ++){
                      proList[k].product = false
                      proList[k].logo = comLink.yxtImgHost + proList[k].logo;
                      let skulist=proList[k].skuList
                      _vm.skuArr=proList[k].skuList

                    }
                  }
                }
                _vm.buyCartDataLists = _vm.buyCartDataLists.concat(newData);//todo
//              console.log(_vm.skuArr)
              }else{
                // _vm.pageNum --;//todo
              }
            }else {
              // _vm.pageNum --;//todo
            }
          },
          error:function (data) {
            setTimeout(function(){//todo
              _vm.isRequest = true;
            },2000);
            // _vm.pageNum --;//todo
          }
        })
      }
    },
    //点击减少按钮
    reduceBtn(proItem){
      if(proItem.number > 1){
        proItem.number -= 1;
        if(proItem.productChecked){
          this.selectData.allPrice = this.selectData.allPrice*1 - proItem.price*1;
          this.selectData.allPrice = Math.abs((this.selectData.allPrice*1).toFixed(2));
        }
      }
      $.post(comLink.yxtHost + '/car/updateNumber', {
        'carId' : proItem.carId,
        'number' : proItem.number
      }, function(resp) {
        //TODO
      });
    },
    //点击增加按钮
    addBtn(proItem){
      proItem.number+=1;
      if(proItem.productChecked){
        this.selectData.allPrice = this.selectData.allPrice*1 + proItem.price*1;
        this.selectData.allPrice = Math.abs((this.selectData.allPrice*1).toFixed(2));
      }

      $.post(comLink.yxtHost + '/car/updateNumber', {
      	openid : sessionStorage.openid,
        'carId' : proItem.carId,
        'number' : proItem.number
      }, function(resp) {
        //TODO
      });
    },
    minBtn(proItem){
    	if(proItem.number==1){
    			proItem.number=1;
    	}else{
    		proItem.number-=1;
      if(proItem.productChecked){
        this.selectData.allPrice = this.selectData.allPrice*1 - proItem.price*1;
        this.selectData.allPrice = Math.abs((this.selectData.allPrice*1).toFixed(2));
      }

      $.post(comLink.yxtHost + '/car/updateNumber', {
      	openid : sessionStorage.openid,
        'carId' : proItem.carId,
        'number' : proItem.number
      }, function(resp) {
        //TODO
      });
    	}

    },
    //点击分期
    fenqiItem(data){
      sessionStorage.setItem("carPeriod", data.period);
      // data.periodChecked =!data.periodChecked;
      var isTrue = data.periodChecked;//转化为true;
      data.periodChecked = !isTrue;
      this.selectData.allPrice = 0;
      this.buyCartDataLists.splice(100,1);
      if(data.periodChecked){
        for(var i = 0; i  < data.brandList.length;i ++){
          data.brandList[i].brandChecked = true;

          let n = 0;
          for(var j = 0,jl = data.brandList[i].productList.length;j < jl;j ++){
            if(data.brandList[i].productList[j].stock >= data.brandList[i].productList[j].number) {
              data.brandList[i].productList[j].productChecked = true;
              this.selectData.allPrice = this.selectData.allPrice*1 + data.brandList[i].productList[j].price * data.brandList[i].productList[j].number*1;
              n ++;
            }
          }
          if(n == 0) {
            data.brandList[i].brandChecked = false;
          }
        }

        //其他分期不选中
        for(var k = 0,l = this.buyCartDataLists.length;k < l;k ++) {
          if(this.buyCartDataLists[k].period != data.period) {
            this.buyCartDataLists[k].periodChecked = false;
            for(var i = 0; i  < this.buyCartDataLists[k].brandList.length;i ++){
              this.buyCartDataLists[k].brandList[i].brandChecked = false;

              for(var j = 0,jl = this.buyCartDataLists[k].brandList[i].productList.length;j < jl;j ++){
                this.buyCartDataLists[k].brandList[i].productList[j].productChecked = false;
              }
            }
          }
        }
      }else{
        for(var i = 0; i  < data.brandList.length;i ++){
          data.brandList[i].brandChecked = false;

          for(var j = 0,jl = data.brandList[i].productList.length;j < jl;j ++){
            data.brandList[i].productList[j].productChecked = false;
            //    this.selectData.allPrice -= data.brandList[i].productList[j].price * data.brandList[i].productList[j].number;
          }
        }
      }

      /*data.periodChecked && this.fenqiCheckList(data);
      !data.periodChecked && this.fenqiFalse(data);
      if( data.periodChecked ){
        for(var i = 0,l = this.buyCartDataLists.length;i < l;i ++) {
          if(this.buyCartDataLists[i].period === 12){
            if (data.period === 6  ) {
              this.buyCartDataLists[i].periodChecked = false;
              for(var j = 0,jl = this.buyCartDataLists[i].brandList.length;j < jl;j ++){
                this.buyCartDataLists[i].brandList[j].brandChecked = false;

                for(var k = 0,kl = this.buyCartDataLists[i].brandList[j].productList.length;k< kl;k++){
                  let pro = this.buyCartDataLists[i].brandList[j].productList
                  if(pro[k].productChecked){
                    this.selectData.allPrice = this.selectData.allPrice*1 - pro[k].price * pro[k].number*1;
                  }
                  this.buyCartDataLists[i].brandList[j].productList[k].productChecked = false;
                }
              }
            }
          }else if(this.buyCartDataLists[i].period === 6){
            if (data.period === 12  ) {
              this.buyCartDataLists[i].periodChecked = false;
              for(var j = 0,jl = this.buyCartDataLists[i].brandList.length;j < jl;j ++){
                this.buyCartDataLists[i].brandList[j].brandChecked = false;

                for(var k = 0,kl = this.buyCartDataLists[i].brandList[j].productList.length;k< kl;k++){
                  let pro = this.buyCartDataLists[i].brandList[j].productList
                  if(pro[k].productChecked){
                    this.selectData.allPrice = this.selectData.allPrice*1 - item.pricpro[k].price * pro[k].number*1;
                  }
                  this.buyCartDataLists[i].brandList[j].productList[k].productChecked = false;
                }
              }
            }
          }
        }
      }*/
      this.selectData.allPrice = Math.abs((this.selectData.allPrice*1).toFixed(2));
    },
    //
    fenqiFalse(data){
      // data.brandChecked = false;
      // for(var i = 0,l = data.shopCartList.length; i< l;i++){
      //   data.shopCartList[i].productChecked = false;
      // }
    },
    fenqiCheckList(data){
      // data.brandChecked = true;
      // for(var i = 0,l = data.shopCartList.length; i< l;i++){
      //   data.shopCartList[i].productChecked = true;
      // }
    },

    //商铺点击
    storeItem(data,braItem){
      sessionStorage.setItem("carPeriod", data.period);
      var isTrue = braItem.brandChecked;
      braItem.brandChecked = !isTrue;
      this.buyCartDataLists.splice(100,1);
      let n = 0;

//    console.log(braItem.productList, 'productList');
      if(braItem.brandChecked){
        for(var i = 0,l = braItem.productList.length;i < l;i ++){
          if(!braItem.productList[i].productChecked){
            if(braItem.productList[i].stock >= braItem.productList[i].number) {
              this.selectData.allPrice = this.selectData.allPrice*1 + braItem.productList[i].price * braItem.productList[i].number*1;
              n++;
            }
          }
        }
        if(n == 0) {
          braItem.brandChecked = false;
        }
      }else{
        for(var i = 0,l = braItem.productList.length;i < l;i ++){
          if(braItem.productList[i].stock >= braItem.productList[i].number) {
            this.selectData.allPrice = this.selectData.allPrice*1 - braItem.productList[i].price * braItem.productList[i].number*1;
          }
        }
      }

      this.peridoCheckBrand(data);
      this.panduanCheckProduct(braItem);
      if( braItem.brandChecked ){
        for(var i = 0,l = this.buyCartDataLists.length;i < l;i ++) {
          if(this.buyCartDataLists[i].period === 12){
            if (data.period === 6  || data.period === 3 ) {
              this.buyCartDataLists[i].periodChecked = false;
              for(var j = 0,jl = this.buyCartDataLists[i].brandList.length;j < jl;j ++){
                this.buyCartDataLists[i].brandList[j].brandChecked = false;

                for(var k = 0,kl = this.buyCartDataLists[i].brandList[j].productList.length;k< kl;k++){
                  let pro = this.buyCartDataLists[i].brandList[j].productList
                  if(pro[k].productChecked){
                    this.selectData.allPrice = this.selectData.allPrice*1 - pro[k].price * pro[k].number*1;
                  }
                  this.buyCartDataLists[i].brandList[j].productList[k].productChecked = false;
                }
              }
            }
          }else if(this.buyCartDataLists[i].period === 6){
            if (data.period === 12 || data.period === 3) {
              this.buyCartDataLists[i].periodChecked = false;
              for(var j = 0,jl = this.buyCartDataLists[i].brandList.length;j < jl;j ++){
                this.buyCartDataLists[i].brandList[j].brandChecked = false;

                for(var k = 0,kl = this.buyCartDataLists[i].brandList[j].productList.length;k< kl;k++){
                  let pro = this.buyCartDataLists[i].brandList[j].productList
                  if(pro[k].productChecked){
                    this.selectData.allPrice = this.selectData.allPrice*1 - pro[k].price * pro[k].number*1;
                  }
                  this.buyCartDataLists[i].brandList[j].productList[k].productChecked = false;
                }
              }
            }
          }else if(this.buyCartDataLists[i].period === 3){
          	if (data.period === 12 || data.period === 6) {
              this.buyCartDataLists[i].periodChecked = false;
              for(var j = 0,jl = this.buyCartDataLists[i].brandList.length;j < jl;j ++){
                this.buyCartDataLists[i].brandList[j].brandChecked = false;

                for(var k = 0,kl = this.buyCartDataLists[i].brandList[j].productList.length;k< kl;k++){
                  let pro = this.buyCartDataLists[i].brandList[j].productList
                  if(pro[k].productChecked){
                    this.selectData.allPrice = this.selectData.allPrice*1 - pro[k].price * pro[k].number*1;
                  }
                  this.buyCartDataLists[i].brandList[j].productList[k].productChecked = false;
                }
              }
            }
          }
        }
      }
      this.selectData.allPrice = Math.abs((this.selectData.allPrice*1).toFixed(2));
    },
    //判断商铺是否点击 如果是 该分期选中
    peridoCheckBrand(period){
//	  console.log(period);
  	  var count = 0;
      for(var i = 0,l = period.brandList.length;i < l;i++){
        if(period.brandList[i].brandChecked) {
          count ++;
        }
      }
      if(count == period.brandList.length) {
        period.periodChecked = true;
      } else {
        period.periodChecked = false;
      }
  },
    //判断商铺是否点击 如果是 该商铺下的商品为全选
    panduanCheckProduct(braItem){
      if(braItem.brandChecked){
        for(var i = 0,l = braItem.productList.length;i < l;i++){
          if(braItem.productList[i].stock >= braItem.productList[i].number) {
            braItem.productList[i].productChecked = true;
          }
        }
      }else{
        for(var i = 0,l = braItem.productList.length;i < l;i++){
          braItem.productList[i].productChecked = false;
        }
      }
    },

    //单选
    danxuanClick(item,pItem,data){
      item.productChecked = !item.productChecked;
      this.panduanCheckStore(pItem,data);//单击商品 判断是否全选中 如果是 商店全选
      // this.panduanCheckPeriod(pItem,data);
      if(item.productChecked){
        sessionStorage.setItem('carPeriod',item.period);
        this.selectData.allPrice = this.selectData.allPrice*1 + item.price*item.number*1;
      }else{
        this.selectData.allPrice = this.selectData.allPrice*1 - item.price*item.number*1;
      }
      this.selectData.allPrice = Math.abs((this.selectData.allPrice*1).toFixed(2));
      this.onlyChooseOne(item,pItem,data);
      this.peridoCheckBrand(data);
    },
    //判断选择分期数 如果选择其中一种分期 另外一种分期下的所有选项取消选择
    onlyChooseOne(item,pItem,data){
//	  console.log(data.period,'data.period');
  	  if( item.productChecked || pItem.brandChecked || data.periodChecked){
        for(var i = 0,l = this.buyCartDataLists.length;i < l;i ++) {
          if(this.buyCartDataLists[i].period === 12){
            if (data.period === 6 || data.period === 3 ) {
              this.buyCartDataLists[i].periodChecked = false;
              for(var j = 0,jl = this.buyCartDataLists[i].brandList.length;j < jl;j ++){
                this.buyCartDataLists[i].brandList[j].brandChecked = false;

                for(var k = 0,kl = this.buyCartDataLists[i].brandList[j].productList.length;k< kl;k++){
                  let pro = this.buyCartDataLists[i].brandList[j].productList;
                  if(pro[k].productChecked){
                    this.selectData.allPrice = this.selectData.allPrice*1 - pro[k].price * pro[k].number*1;
                  }
                  this.buyCartDataLists[i].brandList[j].productList[k].productChecked = false;
                }
              }
            }
          }else if(this.buyCartDataLists[i].period === 6){
            if (data.period === 12 || data.period === 3 ) {
              this.buyCartDataLists[i].periodChecked = false;
              for(var j = 0,jl = this.buyCartDataLists[i].brandList.length;j < jl;j ++){
                this.buyCartDataLists[i].brandList[j].brandChecked = false;

                for(var k = 0,kl = this.buyCartDataLists[i].brandList[j].productList.length;k< kl;k++){
                  let pro = this.buyCartDataLists[i].brandList[j].productList
                  if(pro[k].productChecked){
                    this.selectData.allPrice = this.selectData.allPrice*1 - pro[k].price * pro[k].number*1;
                  }
                  this.buyCartDataLists[i].brandList[j].productList[k].productChecked = false;
                }
              }
            }
          }else if(this.buyCartDataLists[i].period === 3){
          	if (data.period === 12 || data.period === 6) {
              this.buyCartDataLists[i].periodChecked = false;
              for(var j = 0,jl = this.buyCartDataLists[i].brandList.length;j < jl;j ++){
                this.buyCartDataLists[i].brandList[j].brandChecked = false;

                for(var k = 0,kl = this.buyCartDataLists[i].brandList[j].productList.length;k< kl;k++){
                  let pro = this.buyCartDataLists[i].brandList[j].productList
                  if(pro[k].productChecked){
                    this.selectData.allPrice = this.selectData.allPrice*1 - pro[k].price * pro[k].number*1;
                  }
                  this.buyCartDataLists[i].brandList[j].productList[k].productChecked = false;
                }
              }
            }
          }
        }
      }
      this.selectData.allPrice = Math.abs((this.selectData.allPrice*1).toFixed(2));
    },
    //判断是否全部选中商品 选中分期
    panduanFenqi(){
      for(var i = 0,l = this.buyCartDataLists.length;i < l;i ++){
        for(var j = 0,jl = this.buyCartDataLists[i].brandList.length;j < jl; j ++){
          if(this.buyCartDataLists[i].brandList[j].brandChecked){
            this.buyCartDataLists[i].periodChecked = true;
          }else{
            this.buyCartDataLists[i].periodChecked = false;
          }
        }
      }
    },
    //判断商品是否全部选中
    panduanCheckStore(pItem,data){//点击商品 判断商店全选函数
      let l = pItem.productList.length;
      for(var i = 0; i < pItem.productList.length; i++ ){
        if(pItem.productList[i].stock >= pItem.productList[i].number) {
        } else {
          l --;
        }
      }
      let n = 0;
      for(var i = 0; i < pItem.productList.length; i++ ){
        if(pItem.productList[i].productChecked){
          n ++;
        }
      }

      if(l == n) {
        pItem.brandChecked = true;
      } else {
        pItem.brandChecked = false;
      }
    },
  },
  watch: {
    '$route'(to,from) {
      if(from.name !== 'proDetailRouter' && to.name == 'cart'){
        this.$nextTick(() => {
          this.$refs.myScroller.reset({top:0})
        })
        let hash = window.location.hash;
        hash = hash.split('?');
        let hashFirst = hash[1].slice(0,1);
        if(hashFirst === 'm'){
          this.moreProAxios();
        }else {
          this.proDetailAxios();
        }
        this.moreFenleiAxios();//一级分类
      }
    }
  },
  mounted(){
    this.getCollectListsAxios();
    $.ajax({
        url: comLink.yxtHost + '/user/sign',
        data: {
          'url': window.location.href,
        },

        dataType: 'json',
        type: 'post',
        success: function (data) {
          if(data.code==1){
          	 wx.config({
	            debug: false,
	            appId: data.data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
	            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
	            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
	            signature: data.data.signature, // 必填，签名
	            jsApiList: [
	              'hideMenuItems',
	            ]
		        });
		        wx.ready(function() {
		        	  wx.hideMenuItems({
                menuList: ['menuItem:copyUrl'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                success:function(res){
                    //alert("隐藏");
                }
            	});
		        })
          }

        },
        error: function (data) {

        }
      })
//  this.getCarList();
  },
  components: {
    Scroller,
//  beian
  }
};
</script>
<style lang="scss" scoped>
@import "@/../src/sass/public.scss";
.cart .lists .list:last-child{
  	padding-bottom:20.5rem ;
}
.selection-component {
  display: inline-block;
}
.selection-show {
  border: 0.1rem solid #e3e3e3;
  padding: 0 2.2rem 0 1.2rem;
  display: inline-block;
  cursor: pointer;
  width: 12rem;
  height: 3.2rem;
  line-height: 3.2rem;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 0.4rem;
  background: #fff;
}
.selection-show .arrow {
  display: inline-block;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-top: 0.6rem solid #e3e3e3;
  width: 0;
  height: 0;
  margin-top: -0.1rem;
  margin-left: 1rem;
  margin-right: -2rem;
  vertical-align: middle;
}
.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  display: none;
  top: 5.2rem;
  width: 50%;
  background: #fff;
  border-top: 0.1rem solid #e3e3e3;
  border-bottom: 0.1rem solid #e3e3e3;
  z-index: 5;
}
.showlist{
	display: block;
}
.selection-list li {
	text-align: center;
  padding: 0.55rem 2rem 0.55rem 1.2rem;
  border-left: 0.15rem solid #e3e3e3;
  border-right: 0.15rem solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}
.selection-list li:hover {
  background: #e3e3e3;
}
.cart {
  height: 100%;
  .search-main{
     height: p(90);
      width: 100%;
      background: #fff;
      padding: 0 p(30) 0 p(30);
      line-height: p(90);
      border-bottom:1px solid #ddd;

    .search-inp-main{
      margin: p(12) 0;
	    width: 100%;
	    height: p(64);
	    border-radius: p(6);
	    background: #f5f5f5;
	    line-height: p(64);
				position: relative;
	    .icon-search {
	      position: absolute;
	      top: 0;
	      font-size:p(35);
	      left: 20%;
	    }
      .head-search {
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
      	vertical-align: middle;
      line-height: 1;
      padding-top: p(6);
			/*position: relative;*/
      .icon-wode1{
      	/*position: absolute;*/
      	/*top: p(25);*/
      	/*right: p(10);*/
      	vertical-align: middle;
        font-size: p(40);
      }
      .mine{
      	vertical-align: middle;
      	/*position: absolute;*/
      	/*top: p(55);*/
      	/*right: p(10);*/
      	
      }
    }
  }

  .lists {
    .list {
      background: white;
      /*margin-bottom: 16rem;*/
      .tit {
        margin-top: 1.25rem;
        > div {
          display: flex;
          justify-content: space-between;
          height: 4.25rem;
          line-height: 4.25rem;
          font-size: 1.5rem;
          background: white;
          font-size: 1.5rem;
          position: relative;
          padding: 0 1.5rem 0 4rem;
          > div {
            i:nth-child(1) {
              position: absolute;
              color: #538be8;
              left: 1rem;
              top: 0rem;
            }
            i:nth-child(3) {
              position: absolute;
              color: #538be8;
              left: 8.5rem;
              top: 0rem;
            }
          }
        }
      }
      .lists2 {
        > ul {
          > li {
            > .bottom {
              display: flex;
              justify-content: space-between;
              height: 4.25rem;
              line-height: 4.25rem;
              font-size: 1.5rem;
              background: white;
              font-size: 1.5rem;
              border-top: 1px solid $borderColor;
              border-bottom: 1px solid $borderColor;
              position: relative;
              padding: 0 1.5rem 0 4rem;
              > div {
                i:nth-child(1) {
                  position: absolute;
                  color: #538be8;
                  left: 1rem;
                  top: 0rem;
                }
                i:nth-child(3) {
                  position: absolute;
                  color: #538be8;
                  left: 8.5rem;
                  top: 0rem;
                }
              }
            }
            > .content {
              padding-top: 1.25rem;
              > ul {
                padding-bottom: 0.01rem; //这里一定要给一点下面li标签margin才会占位
                > li {
                  background: #e7f5ff;
                  height: 11.25rem;
                  padding: 0rem 1.5625rem;
                  padding-top: 1.3rem;
                  display: flex;
                  justify-content: space-around;
                  margin-bottom: 1.5rem;
                  .quanquan {
                    width: 8%;
                    padding-right: 2%;
                    position: relative;
                    i {
                      position: absolute;
                      @include jz();
                      top: 43%;
                    }
                  }
                  .imgBox {
                    width: 25%;
                    // width: 9rem;
                    height: 9rem;
                    margin-right: 5%;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .content {
                    width: 67%;
                    position: relative;
                    > div {
                      line-height: 2.1875rem;
                      font-size: 1.25rem;
                    }
                    > div:nth-child(1) {
                      width: 75%;
                      font-weight: 500;
                      font-size: 1.5625rem;
                    }
                    > div:nth-child(2) {
                      width: 75%;
                      color: $fontGray;
                      margin: 0.3rem 0;
                      height: 2.1875rem*2;
                      .ellipsis-sku {
                        width: 20rem;
                      }
                    }
                    > div:nth-child(3) {
                      width: 65%;
                      font-weight: 400;
                    }
                    > div:nth-child(4) {
                      position: absolute;
                      right: 0;
                      top: 0;
                      color: #f5746f;
                      font-weight: 500;
                    }
                    > div:nth-child(5) {
                      position: absolute;
                      right: 0;
                      bottom: 1rem;
                      > span {
                        display: inline-block;
                        height: 2rem;
                        line-height: 2rem;
                        text-align: center;
                      }
                      > span:nth-child(1) {
                        background: white;
                        width: 1.875rem;
                      }
                      > span:nth-child(2) {
                        min-width: 1.875rem;
                      }
                      > span:nth-child(3) {
                        width: 1.875rem;
                        background: white;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .beian{
    position: fixed;
    left: 0;
    bottom: 12.425rem;
    width: 100%;
  	background: #eee;
  	color: #333;
  	text-align: center;
  	height: 3rem;
  	line-height: 3rem;
  	font-size: p(24);
  }
  .settleAccounts {
    height: 6.125rem;
    width: 100%;
    background: white;
    position: fixed;
    left: 0;
    bottom: 6.3rem;
    display: flex;
    justify-content: space-around;
    > div {
      height: 100%;
      line-height: 100%;
    }
    > .quanquan {
      width: 8%;
      padding-right: 2%;
      position: relative;
      i {
        position: absolute;
        @include jz();
      }
    }
    > div:nth-child(2) {
      width: 10%;
      font-size: 2.0625rem;
      line-height: 6.125rem;
      font-weight: 500;
    }
    > div:nth-child(3) {
      width: 30%;
      > div:nth-child(1) {
        font-size: 1.625rem;
        color: #f06f5a;
        font-weight: 500;
      }
      > div:nth-child(2) {
        font-size: 1.5rem;
      }
    }
    > button {
      margin-top: 0.5rem;
      color: white;
      background: #ff675f;
      width: 40%;
      height: 4.75rem;
      line-height: 4.75rem;
      font-weight: 500;
    }
    .price-shipping{
      font-size: p(30);
      .top{
        color: #ff675f;
        line-height: p(48);
      }
    }
  }
  .icon-chenggong {
    color: #538be8 !important;
  }
}
</style>

