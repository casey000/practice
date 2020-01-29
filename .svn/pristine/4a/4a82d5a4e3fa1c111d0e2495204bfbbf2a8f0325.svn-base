<template>
	<div class="pingjia-content" v-title data-title="评价">
    <div v-for="(product, index) in productList" style="margin-bottom: 1rem">
      <div class="pingjia-level clearfix">
        <div class="f-fl">
          <img :src=product.logo >
        </div>
        <div class="f-fl pingjia-smile">
          <ul class="clearfix"  v-if="!hasComment">
            <li class="f-fl" @click="changeHp(product)">
              <img :src=hpImgblue v-if="!product.greyHp">
              <img :src=hpImggrey v-else>
              <span class="fontSize-14">好评</span>
            </li>
            <li class="f-fl" @click="changeZp(product)">
              <img :src=zpImgblue v-if="!product.greyZp">
              <img :src=zpImggrey v-else>
              <span class="fontSize-14">中评</span>
            </li>
            <li class="f-fl" @click="changeCp(product)">
              <img :src=cpImgblue v-if="!product.greyCp">
              <img :src=cpImggrey v-else>
              <span class="fontSize-14">差评</span>
            </li>
          </ul>
          <ul class="clearfix"  v-else>
            <li class="f-fl">
              <img :src=hpImgblue v-if="!product.greyHp">
              <img :src=hpImggrey v-else>
              <span class="fontSize-14">好评</span>
            </li>
            <li class="f-fl">
              <img :src=zpImgblue v-if="!product.greyZp">
              <img :src=zpImggrey v-else>
              <span class="fontSize-14">中评</span>
            </li>
            <li class="f-fl">
              <img :src=cpImgblue v-if="!product.greyCp">
              <img :src=cpImggrey v-else>
              <span class="fontSize-14">差评</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="pingjia-text">
        <p class="fontSize-16">评论:</p>
        <el-input
          type="textarea"
          :readonly=hasComment
          :autosize="{ minRows:5, maxRows: 8}"
          placeholder="请填写您的问题 最多125字"
          v-model="product.textarea3">
        </el-input>
        <div class="viewPhoto clearfix" :id="portrait(index)" v-if="!hasComment"></div>
        <div class="viewPhoto clearfix" :id="portrait(index)" v-else>
          <img :src="img" alt="" style="width: 10rem;height: 10rem;margin: 0 1.5rem" v-for="img in product.imgArr"/>
        
        </div>
      </div>
      <div class="pingjia-img">
        <div class="add-img" v-if="!hasComment">
          <span>+</span>
          <a href="">
            <input id="saveImage" name="imgFile" type="file" accept="image/*" @change="uploadImg($event, product, index)"/>
          </a>
        </div>
        <p>最多可上传3张图片</p>
      </div>
    </div>
    <div class="hide-name">
      <span class="fontSize-16 f-fl">匿名评价</span>
      <span class="f-fr">
          <el-switch
            :disabled=hasComment
            v-model="hidevalue"
            active-color="#307ff5"
            inactive-color="#ccc">
        </el-switch>
        </span>
    </div>
    <div  class="bottom-button">
      <span  class="login-word" @click="imageSubmit()" v-if="flag && !hasComment">提交评价</span>
      <span  class="login-word" @click="closeReturn()" v-else-if="hasComment">关闭</span>
      <span  class="login-word"v-else style="background-color: gray">提交评价</span>
    </div>
    <div v-if="isBlackCoverShow" class="blackCoverShow" @click="blockClick"></div>
      <div class="detail-img" v-if="isBlackCoverShow">
          <img :src=detailImg>	
      </div>
	</div>

</template>

<script>
  import axios from 'axios'
  import comLink from "./../../../../common/common_link"; //导入总线
  import $ from "jquery"; //导入jquery
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  import { Scroller } from 'vux';
  export default{
  	data(){
  		return{
  			detailImg:'',
  			isBlackCoverShow:false,
        hasComment : false,
        flag :true,
        commentList : {},
        productList : {
          product : {
            greyHp:true,
            greyZp:true,
            greyCp:true,
            pjvalue:'', //评价value
            textarea3:'',
            imgStr : '',//图片base64路径
            imgArr : [],
            hasComment : false,
          }
        },
  			hidevalue: true,  //是否匿名
  			hpImggrey:'@/../static/img/haoping1.png',
  			hpImgblue:'@/../static/img/haoping2.png',
  			zpImggrey:'@/../static/img/zhongping1.png',
  			zpImgblue:'@/../static/img/zhongping2.png',
  			cpImggrey:'@/../static/img/chaping1.png',
  			cpImgblue:'@/../static/img/chaping2.png',

  			goodsImg:'@/../static/img/home/brand_store/pro_detail.png',
  			nowIndex:0,
			show:false,
			options: [
					{
			          value: '0',
			          label: '质量原因'
			        },
			        {
			          value: '1',
			          label: '商品信息描述不好'
			        },
			        {
			          value: '2',
			          label: '功能/效果不好'
			        },
			        {
			          value: '3',
			          label: '少件/漏件'
			        },
			        {
			          value: '4',
			          label: '包装商品破损'
			        },
			         {
			          value: '5',
			          label: '发票问题'
			        },
			        {
			          value: '6',
			          label: '其他'
			        }
		        ],
		    value: '',
		    uploadImgpath:'',
		    first:true,
  		}
  	},
  	methods:{
  		blockClick(){
  			if(this.isBlackCoverShow){
  				this.isBlackCoverShow=false
  			}
  		},
      closeReturn() {
        this.$router.go(-1);
      },
  		changeHp:function(product){
        product.greyHp=!product.greyHp;
        product.greyZp=true;
        product.greyCp=true;
  			if(!product.greyHp){
          product.pjvalue=1;
  			}else{
          product.pjvalue='';
  			}
        this.productList.splice(100,1);
  			console.log(product.pjvalue)
  		},
  		changeZp:function(product){
        product.greyZp=!product.greyZp;
        product.greyCp=true;
        product.greyHp=true;
  			if(!product.greyZp){
          product.pjvalue=2;
  			}else{
          product.pjvalue='';
  			}
        this.productList.splice(100,1);
  			console.log(product.pjvalue);
  		},
  		changeCp:function(product){
        product.greyCp=!product.greyCp;
        product.greyZp=true;
        product.greyHp=true;
  			if(!product.greyCp){
          product.pjvalue=3;
  			}else{
          product.pjvalue='';
  			}
        this.productList.splice(100,1);
        console.log(product.pjvalue);
  		},
      portrait(index) {
  		  return "portrait_" + index;
      },
      compress(path , obj ,index) {
    	var vm = this;
      	
	    var img = new Image();
	    img.src = path;
	   	img.onload = function(){
			   var that = this;
			   // 默认按比例压缩
			   var w = that.width,
			   h = that.height,
			   scale = w / h;
			   w = obj.width * 2 || w * 2;
			   h = obj.height * 2 || (w / scale) * 2;
			   var quality = 0.6; // 默认图片质量为0.7
			   //生成canvas
			   var canvas = document.createElement('canvas');
			   var ctx = canvas.getContext('2d');
			   // 创建属性节点
			   var anw = document.createAttribute("width");
			   anw.nodeValue = w;
			   var anh = document.createAttribute("height");
			   anh.nodeValue = h;
			   canvas.setAttributeNode(anw);
			   canvas.setAttributeNode(anh);
			   ctx.drawImage(that, 0, 0, w, h);
			   // 图像质量
			   if(obj.quality && obj.quality <= 1 && obj.quality > 0){
			   quality = obj.quality;
			   }
			   // quality值越小，所绘制出的图像越模糊
			   var base64 = canvas.toDataURL('image/jpeg', quality );
			   vm.uploadImgpath=base64.split(',')[1];
			   if(vm.first){
				   	vm.first=false
				   	$.post(comLink.yxtHost +'/order/uploadImg', {
			//          'base64File' : fr.result.split(',')[1]
			            'base64File' : vm.uploadImgpath
			          }, function(resp) {
			            if(resp.code == 1) {
			              for(var i = 0; i < vm.productList.length; i ++){
			                if(index == i) {
			                  if(vm.productList[i].imgStr == undefined) {
			                    vm.productList[i].imgStr = resp.data;
			                  } else {
			                    vm.productList[i].imgStr += ',' + resp.data;
			                  }
			                }
			               
			              }
			
			            } else {
			              Toast({
			                message: resp.msg,
			                duration: 2000
			              });
			            }
			          });
		           
			   }
			    
	    }

    },
      uploadImg(event, product, index) {
  		var vm = this;
  		var t = event.currentTarget;
  		var imgFile = t.files[0];
  		var imgSize = imgFile.size;
        var fr = new FileReader();
        fr.readAsDataURL(imgFile);
        if(imgSize>4*1024*1024){
//		        alert('上传的图片的大于2M,请重新选择');
		        Toast({
	              message: "上传的图片的大于4M,请重新选择",
	              duration: 3000
	            });
//		        $(this).val('')
		        return false;
		    }

        var num=$(t).parents('.pingjia-img').siblings('.pingjia-text').find('.viewPhoto').find('img').length;
        if(num > 2){
          Toast({
            message: "不能超过三张",
            duration: 2000
          });
          return false;
        }
        fr.onload = function () {
          var bigImg = document.createElement("img");     //创建一个img元素
          bigImg.src = fr.result;   //给img元素的src属性赋值
          vm.compress(fr.result,bigImg,index)
          bigImg.style.width="12rem";
          bigImg.style.height="12rem";
          bigImg.style.margin="0 0.3rem 0 2rem";
          bigImg.style.float="left";
          bigImg.addEventListener('click' , function(){
          	vm.isBlackCoverShow=true;
          	vm.detailImg=$(this).attr('src')
          })
//        	删除功能
//					var closeSp= document.createElement("span");
//					closeSp.innerHTML='×'
//					closeSp.style.color='#333';
//					closeSp.style.display='inline-block';
//					closeSp.style.height="3rem"
//					closeSp.style.width="3rem"
//					closeSp.style.marginTop="-0.5rem"
//					
//        closeSp.style.float="left";
//					closeSp.addEventListener('click' ,function(){
//						$(this).prev('img').remove();
//						$(this).remove()
//					})
//        console.log($(t).parents('.pingjia-img').siblings('.pingjia-text').find('.viewPhoto'));
//        $(t).parents('.pingjia-img').siblings('.pingjia-text').find('.viewPhoto').append(closeSp);
			
         $(t).parents('.pingjia-img').siblings('.pingjia-text').find('.viewPhoto').append(bigImg);
			


          if(num == 2) {
            $(t).parents('.add-img').remove();
          }
          //上传图片
          if(!vm.first){
          	$.post(comLink.yxtHost +'/order/uploadImg', {
//          'base64File' : fr.result.split(',')[1]
            'base64File' : vm.uploadImgpath
          }, function(resp) {
            if(resp.code == 1) {
              for(var i = 0; i < vm.productList.length; i ++){
                if(index == i) {
                  if(vm.productList[i].imgStr == undefined) {
                    vm.productList[i].imgStr = resp.data;
                  } else {
                    vm.productList[i].imgStr += ',' + resp.data;
                  }
                }
              }

            } else {
            	$(t).parents('.pingjia-img').siblings('.pingjia-text').find('.viewPhoto').find('img').last().remove()
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          });
          }
        };

      },
      imageSubmit() {
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];

        for(var i = 0; i < vm.productList.length; i ++){
          let product = vm.productList[i];

          if(product.pjvalue == undefined) {
            Toast({
              message: '请选择评价',
              duration: 2000
            });
            return;
          }
          if(product.textarea3 == undefined) {
            Toast({
              message: '请点评内容',
              duration: 2000
            });
            return;
          }

          vm.flag = false;
          $.post(comLink.yxtHost + '/order/commentProduct', {
            'anonymous' : vm.hidevalue ? 1 : 0,
            'commentImgs' : product.imgStr,
            'context' : product.textarea3,
            'level' : product.pjvalue,
            'orderId' : orderId,
            'skuId' : product.skuId,
            'productId' : product.id,
            'openid' : sessionStorage.openid
          }, function(resp) {
            if(i == vm.productList.length) {
              if(resp.code == 1) {
                Toast({
                  message: resp.msg,
                  duration: 2000
                });
                vm.$router.push({
                  path : '/mine/myAsset/orderRouter?index=4',
                });
              }
            }
            if(resp.code == 0) {
              vm.flag = true;
            }
          });
        }
      },
      getOrderProductList(){
  		  var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];

        $.post(comLink.yxtHost + '/order/getProductList', {
          'orderId' : orderId
        }, function(resp) {
          if(resp.code == 1){
            vm.productList = resp.data;
            for(var j = 0,jl = vm.productList.length;j < jl;j ++){
              vm.productList[j].logo=comLink.yxtImgHost+vm.productList[j].logo
              vm.productList[j].greyHp = true;
              vm.productList[j].greyZp = true;
              vm.productList[j].greyCp = true;
            }

            vm.getPingjia();
          }else if(resp.code == 0){
            Toast({
              message: data.msg,
              duration: 2000
            });
          }
        });
      },
      //查询评价列表
      getPingjia() {
        var vm = this;
        let hash = window.location.hash;
        hash = hash.split('=');
        let orderId = hash[1];

        $.post(comLink.yxtHost + '/order/commentProductList', {
          'orderId' : orderId
        }, function (resp) {
          if(resp.code == 1) {
            if(resp.data != '') {
              vm.commentList = resp.data;
              for (var i = 0; i < vm.productList.length; i++) {
                for (var j = 0; j < vm.commentList.length; j++) {
                  if(vm.productList[i].skuId == vm.commentList[j].skuId) {
                    vm.productList[i].imgStr = vm.commentList[j].commentImgs;
                    vm.productList[i].textarea3 = vm.commentList[j].context;
                    vm.productList[i].level = vm.commentList[j].level;
                    if(vm.productList[i].level == 1) {
                      vm.productList[i].greyHp = false;
                      vm.productList[i].greyZp = true;
                      vm.productList[i].greyCp = true;
                    }if(vm.productList[i].level == 2) {
                      vm.productList[i].greyHp = true;
                      vm.productList[i].greyZp = false;
                      vm.productList[i].greyCp = true;
                    }if(vm.productList[i].level == 3) {
                      vm.productList[i].greyHp = true;
                      vm.productList[i].greyZp = true;
                      vm.productList[i].greyCp = false;
                    }
                    vm.productList[i].imgArr = vm.productList[i].imgStr.split(',');
                  }
                }
              }
              vm.hasComment = true;
            }
          }
        });
      },
  	},
  	created(){

  	},
  	mounted(){
      this.getOrderProductList();
  		// this.great();
  	}
  }
</script>
<style>
.pingjia-content .el-input {

    font-size: 1.8rem;

}
.pingjia-content .el-input__inner{
	border: 0;
}
.pingjia-content .el-input--suffix .el-input__inner {
    padding-right: 4rem;
    text-align: right;
}

.pingjia-content .el-popper .popper__arrow{
	display: none;
}
.pingjia-content .el-select-dropdown__item {
    font-size: 1.8rem;
    padding: 0 2.2rem;
   text-align: center;
    color: #606266;
    height:4.6rem;
    line-height: 4.6rem;

}
.pingjia-content .el-textarea__inner{
	border: none;
}
</style>
<style lang="scss" scoped>
	@import "@/../src/sass/public.scss"; //导入scss初始文件
	.detail-img{
		position: fixed;
	    top: 6.25rem;
	    left: 6.25rem;
	    right: 6.25rem;
	    width: 35rem;
	    height:38rem;
	    background: white;
	    border-radius: 0.625rem;
	    z-index: 9;
	    img{
	    	width:100%;
	    	height: 100%;
	    }
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
  .bottom-button {
    width: 100%;
    height: 5.625rem;
    text-align: center;
    position: fixed;
    bottom: 1.875rem;

    .login-word {
      display: inline-block;
      width: 80%;
      height: 100%;
      background: #307ff5;
      text-align: center;
      line-height: 5.625rem;
      font-size: 1.875rem;
      color: white;
      border-radius: 0.625rem;
    }
  }
	.hide-name{
		width: 100%;
		height: 5rem;
		line-height: 5rem;
		margin-top: 1rem;
		background-color: #fff;
		padding: 0 1.5rem;
	}
	.pingjia-content{
		width: 100%;
		height: auto;
    padding-bottom: 10rem;

		.pingjia-level{
			padding-top:p(15);
			padding-left:p(50);
			font-size:p(35);
			height:p(155);
			line-height:p(70);
			width:100%;
			background:#fff;
			border-bottom:p(4) solid #eee;
			img{
				width: p(100);
				height: p(100);
			}
		}
		.pingjia-smile{
			/*margin-left: 10rem;*/
      float: right;
			ul{

				li{
					margin-right: 4rem;
					height: p(100);
					img{
						width: p(70);
						height: p(70);
						display: block;
					}
					span{
						width: p(70);
						display: block;
						text-align: center;
					}
				}
			}

		}
		.pingjia-reason{
			width:100%;
			background:#fff;

			height: auto;
			line-height: p(60);
			>span{
				font-size:p(35);
				margin-left: p(40);
				padding-top: p(13);
				margin-right: p(100);
			}
			.selection-component{

				.selection-show{
					span{
						font-size: p(25);
						color: #666;
					}
				}
			}

		}
		.pingjia-text{
			background:#fff;
			margin-top: p(0);
			p{
				padding-top: p(30);
				margin-bottom: p(30);
				padding-left: p(20);
			}
		}
		.pingjia-img{
			background-color: #fff;
			width: 100%;
			padding: p(20);
			.add-img{
				width: p(130);
				height: p(130);
				display:table;
				border:p(2) solid #999;
				span{
					/*width: 100%;
					height: 100%;*/
					display:table-cell;
					vertical-align:middle;
					width: 100%;
					text-align: center;
					font-size: p(100);
					color: #ccc;
				}
				a{
					opacity: 0;


					input{
						position: absolute;
						left: p(20);
						width: p(130);
						height: p(130);
						display: inline-block;

					}
				}
			}
			>p{
				font-size: p(28);
				color: #999;
				margin-top: p(10);
			}
		}
		.pingjia-money{
			background: #fff;
			margin-top: p(20);
			p{
				height: p(70);
				padding: p(20) p(30);
				font-size: p(30);
				margin-bottom: p(10);
				span{
					padding-top: p(5);
				}
				.num-money{
					padding: p(5) p(35);
					border: p(2) solid #999;
				}
			}
			p:nth-child(1){
				padding-bottom: p(60);
				border-bottom: p(5) solid #eee;
			}
		}
		.sub-btn{
			margin-top: p(300);
			width: 100%;
			text-align: center;
			span{
				border-radius: p(10);
				/*border: p(2) solid #999;*/
				font-size: p(35);
				height: p(70);
				line-height: p(50);
				display: inline-block;
				background-color: #fff;
				text-align: center;
				color: #fff;
				background-color: #307ff5;
				width: 90%;
				margin: 0 auto;
				padding: p(10) p(20);
			}
		}
	}
</style>
