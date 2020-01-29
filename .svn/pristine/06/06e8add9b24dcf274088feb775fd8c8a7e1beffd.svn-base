<template>
  <div class="timebuy-point">
  	<!--<scroller height="-0.01" lock-x @on-scroll-bottom="scrollerRequire"  ref="myScroller">-->
      <div class="">
    <div class="timer">
      <ul>
        <li :class="{active : timeindex == ind}" v-for="(data, ind) in list" @click="getSecondTime(data.id, ind, data)">
          <p class="time">{{data.title}}</p>
          <p class="soon"><span v-if="data.type == 1">明日开始</span><span v-else-if="data.type == 2">即将开始</span><span v-else-if="data.type == 3">抢购中</span></p>
        </li>
      </ul>
    </div>
    <div class="endtime m-top20">
      <p class="top">
        <span class="tit" v-if="type == 1 || type == 2">即将开始 先下单先得哦</span><span class="tit" v-if="type == 3">即将结束 抓紧机会下单吧</span>
        <span class="time f-fr"><i>{{hour}}</i> : <i>{{minutes}}</i> : <i>{{seconds}}</i></span>
        <span class="name f-fr"><span v-if="type == 1 || type == 2">距开始</span><span v-if="type == 3">距结束</span></span>
      </p>
    </div>

        <div class="banner">
          <img :src="secondTime.img"/>
        </div>
        <div class="list">
          <ul>
            <li class="f-oh" v-for="data in productList">
              <div class="img f-fl">
                <img :src="data.productLogo" :alt="data.productName" @click="toProduct(data)"/>
              </div>
              <div class="text f-fl">
                <p class="name" @click="toProduct(data)">{{data.productName}}</p>
                <p class="other">
                  <span class="point">¥{{data.money}}</span>
                  <span class="price">¥{{data.marketPrice}}</span><br />
                  <span class="fenqi">¥{{data.period}}</span>
                  <span class="btn f-fr" v-if="data.status == 4" style="background-color: grey;color: white">已售罄</span>
                  <span class="btn f-fr" v-if="data.status == 3" @click="toProduct(data)">立即抢购</span>
                  <span class="btn f-fr" v-if="data.status == 2" @click="toProduct(data)">即将开始</span>
                  <span class="btn f-fr" v-if="data.status == 1 && data.noticeStatus == null" @click="addNotice(data)">提醒我</span>
                  <span class="btn f-fr" v-if="data.status == 1 && data.noticeStatus == -1" style="background-color: grey;color: white">已设置提醒</span>
                  <span class="btn f-fr" v-if="data.status == 1 && data.noticeStatus == 1" style="background-color: grey;color: white">已提醒</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    <!--</scroller>-->
  </div>
</template>

<script>
  import { Scroller } from 'vux'
  import { Toast, MessageBox} from "mint-ui";
  import $ from "jquery"; //导入jquery
  import axios from 'axios'
  import comLink from "../common/common_link"; //导入总线
  export default{
  	name:'timeBuy',
    inject: ['reload'],
    data(){
      return{
        timeindex:'1',
        productList : [],//秒杀商品列表
        list : [],//秒杀列表
        secondTime : {},//秒杀对象
        hour : '',//倒计时
        minutes : '',//倒计时
        seconds : '',//倒计时
        type : '',
        leftTime:'',	//剩余时间
        timer:''		//定时器
      }
    },
    mounted() {
      	this.getHours();
      	$(window).scrollTop()
    	this.sendWxtoOther();
    },
    methods:{
      scrollerRequire(){

      },
      toProduct(data) {
        this.$router.push({
          path: '/newpages/proDetailRouter',
          query: {
            'productId': data.productId,
            'scId': data.id
          }
        })
      },
      //秒杀列表
      getHours:function(){
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/secondTime/hours',
          data: {
            'openid': sessionStorage.openid,
          },
          dataType: 'json',
          type: 'post',
          success: function (resp) {
            if (resp.code == 1) {
              vm.list = resp.data;
              vm.getSecondTime(vm.list[0].id, 0, null);
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //添加提醒
      addNotice:function(data){
        var index = this.timeindex;
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/secondTime/addNotice',
          data: {
            'openid': sessionStorage.openid,
            'secondTimeId': data.secondId,
            'secondProductId': data.id,
            'productId': data.productId
          },
          dataType: 'json',
          type: 'post',
          success: function (resp) {
            if (resp.code == 1) {
              Toast({
                message: resp.msg,
                duration: 2000
              });
              vm.timeindex = index;
              data.noticeStatus = -1;
              // MessageBox.confirm(resp.msg, '温馨提示', {confirmButtonText: '确定'}).then(({ value, action }) => {
              //   vm.reload();
              //
              // })
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //24小时倒计时
      daojishi(){
        this.leftTime=parseInt(this.leftTime)
        var hours =  Math.floor(this.leftTime / 1000 / 60 / 60 % 24); //计算剩余的小时
        var minutes =  Math.floor(this.leftTime / 1000 / 60 % 60);//计算剩余的分钟
        var seconds =  Math.floor(this.leftTime / 1000 % 60);//计算剩余的秒数
        this.hour = hours < 10? '0'+hours:hours;
        this.minutes = minutes < 10 ? '0'+minutes : minutes;
        this.seconds = seconds < 10 ? '0'+seconds:seconds;
      },
      //当前秒杀
      getSecondTime:function(timeId, ind, data){

        if(data !== null) {
          this.type = data.type;
        } else {
          this.type = 3;
        }
        clearInterval(this.timer);
        this.timeindex = ind;
        var vm = this;
        $.ajax({
          url: comLink.yxtHost + '/secondTime/index',
          data: {
            'openid': sessionStorage.openid,
            'timeId': timeId
          },
          dataType: 'json',
          type: 'post',
          success: function (resp) {
            if (resp.code == 1) {
              vm.secondTime = resp.data.secondTime;
              vm.secondTime.img =  comLink.yxtImgHost + vm.secondTime.img;
              vm.productList = resp.data.productList;
              for( var i = 0,l = vm.productList.length; i < l; i ++){
                vm.productList[i].productLogo =  comLink.yxtImgHost + vm.productList[i].productLogo;
              }
              console.log(vm.productList);

              if(vm.secondTime.countDown > 0) {
                vm.leftTime = vm.secondTime.countDown;
              } else {
                vm.leftTime = vm.secondTime.countDown*(-1);
              }
              if(vm.leftTime >= 0){
                vm.timer = setInterval(function(){
                  vm.leftTime -= 1000;
                  vm.daojishi();
                },1000);
              }else{
                vm.resttime=true;
                clearInterval(vm.timer);
              }
            } else {
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
       //分享签名
		sendWxtoOther(){
			var vm=this;
	    	$.ajax({
		        url: comLink.yxtHost + '/user/sign',
		        data: {
		          'url': window.location.href,
		        },
		        dataType: 'json',
		        type: 'post',
		        success: function (data) {
		          	console.log(data)
			        if(data.code==1){
			          	wx.config({
				            debug: false,
				            appId: data.data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
				            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
				            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
				            signature: data.data.signature, // 必填，签名
				            jsApiList: [
				              'onMenuShareAppMessage',
				              'onMenuShareTimeline',
				            ]
				        });
				        wx.ready(function() {

				        	wx.onMenuShareAppMessage({ //朋友
						        title: '邮讯通商城龙卡专区',
						        desc: '邮讯通商城龙卡专区首页',
						        link: 'https://yxtccb.com/yxt/#/timeBuy',
			              // link: data.data.link,
						        imgUrl: "https://www.yxtccb.com/yxt/static/img/share.png",
						        success: function() {

						        },
						        cancel: function() {

						        }
						   		 });
									//分享朋友圈
					        wx.onMenuShareTimeline({
					            title: '邮讯通商城龙卡专区', // 分享标题
						        	desc: '邮讯通商城龙卡专区首页',
					            link: 'https://yxtccb.com/yxt/#/timeBuy', // 分享链接
					            imgUrl: "https://www.yxtccb.com/yxt/static/img/share.png", // 分享图标
					            success: function () {
					                // 用户确认分享后执行的回调函数
					            },
					            cancel: function () {
					                // 用户取消分享后执行的回调函数
					            }
					        });
			//			   		 	wx.hideMenuItems({
			//              menuList: ['menuItem:copyUrl'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			//              success:function(res){
			//              }
			//          	});
				        })
			        }

			    },
		        error: function (data) {

		        }
		    })
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
  .timebuy-point{
    .timer{
      width:100%;
      box-sizing:border-box;
      height:p(118);
      background: #fff;
      ul{
        display: flex;
        height:p(118);
        width: 100%;
    		overflow: hidden;
        li{

          text-align: center;
          flex:1;
          color: #757575;
          .time{
            font-size: p(36);
            line-height:p(69);
          }
          .soon{
            line-height:p(25);
            font-size: p(28);
          }
        }
        li.active{
          color: #f66800;
        }

      }
    }
    .endtime{
      background: #fff;

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
          margin-top: p(5);
          display: inline-block;
          margin-right: p(20);

        }
        .time{
          font-size: p(28);
          color: #333333;
          line-height: p(30);
          margin-top: p(5);
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
    }
    .banner{
      width: 100%;
      /*height: p(220);*/
      img{
        width: 100%;
      }
    }
    .list{
      background: #fff;

      ul{
        li{
          padding: 0 p(15);
          height: p(252);
          width: 100%;
          box-sizing: border-box;
          border-bottom: p(1) solid #dfdfdf;
          .img{
            width: 24%;
            height:p(252) ;
            img{
              width: 100%;
              display: inline-block;
              margin-top:p(25) ;
              height: p(192);
            }
          }
          .text{
            width: 76%;
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
              margin-top: p(30);
              .point{
                font-size: p(28);
                line-height: p(30);
                color: #f66800;
              }
              .price{
                font-size: p(22);
                line-height: p(30);
                color: #b1b1b1;
                text-decoration: line-through;
              }
              .fenqi{
								font-size: p(24);
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
                margin-right:p(15) ;
              }
            }
          }
        }
      }
    }
  }
</style>
