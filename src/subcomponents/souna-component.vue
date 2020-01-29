<template>
  <div class="suona clearfix">
    <div class="suona-left fl">
      <!--<img src="@/../static/image/home/laba.png">-->
      	<span class="fontSize-14">快讯</span>
    </div>
    <div class="suona-right fontSize-12 fr swiper-no-swiping">
      <swiper :options="swiperOption3"  ref="mySwiper">
        <swiper-slide class="ellipsis word " v-for="(item,i) in fastNews" :key="i">
          <!--<a :href="'http://yxtccb.com/yxt/index.html?openid='+openid+'#'+item.url">-->
          <router-link :to=item.url v-if="item.url != ''">
            <span  class="f-fl">{{item.title}}</span>
          </router-link>
          <a v-else  href="javascript:;">
            <span class="f-fl">{{item.title}}</span>
          </a>
            <!--<router-link class="f-oh" style="width: 100%;" :to="{path:'/home/myKuaixunDetail',query : {id : item.id}}">
            <span class="f-fr more">更多</span>
            </router-link>-->
           <!--<a href="javascript:;">
            <span class="f-fl">{{item.title}}</span>
          </a>-->
          <a href="javascript:;">
            <span class="f-fr more">更多</span>
          </a>

        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
  export default {
    props : {
      fastNews : Array
    },
    data() {
      return {
        // 轮播图配置
        swiperOption3: {
          autoplay: 5000,
          direction: "vertical", //方向垂直
          autoplayDisableOnInteraction: true,
          loop: true,
          labaIcon : '',
          openid : '',
        }
      }
    },
    methods: {
      // toCheckMore(item){
      //   this.$router.push({
      //     path : "/home/myJifen",
      //     query : {id : item.id}
      //   })
      // }
      getOpenid(){
        this.openid = sessionStorage.openid;
      },
    },
    mounted(){
      this.getOpenid();
      var vm = this;
      setTimeout(function(){
      },500)

    }
  };
</script>

<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  // 喇叭begin
  .suona {
    /*margin-top: p(10);*/
    /*border-top: p(1) solid #eeeeee;*/
    height: p(72);
    width: 100%;
    line-height: p(70);
    background: white;
    /*<!--margin: 0.625rem*2 0;-->*/
    .suona-left {
      width: 10%;
      text-align: center;
      position: relative;
      margin-top:p(8);
      height: 3.5rem;
      line-height:3.5rem;
      background-color:red;
      border-radius:p(10);
      margin-left:p(20);
      span{
      	color: #fff;
      }
      /*img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1rem*2;
        height: 0.875rem*2;
      }*/
    }
    .suona-right {

      width: 85%;
      height: 100%;
      overflow: hidden;
      .swiper-container {
        height: 100%;
        .swiper-wrapper {
          height: 100%;
        }
        .swiper-slide {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .more{
            margin-right: p(24);
            margin-top: p(2);
            line-height: p(70);
            &:before{
            	content: '';
					    display: inline-block;
					    border-left: p(2) solid #333;
					    height: 2.6rem;
					    float: left;
					    margin-right: 1.1rem;
					    margin-top: 0.6rem;
            }
          }
        }
      }
    }
  }
</style>
