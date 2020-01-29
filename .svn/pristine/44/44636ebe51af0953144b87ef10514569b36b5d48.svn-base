<template>
  <div class="bottom-show-item">
    <div class="show-item-content">
      <ul class="show-main w-color">
        <li class="show-row icon-main" v-if="!showAll" @click="changeShow">
          <i class="icon iconfont icon-less"></i>
        </li>
        <li class=" icon-main" v-if="showAll" @click="changeHide">
          <i class="icon iconfont icon-moreunfold"></i>
        </li>

        <li class="m-top5 icon-main" v-for="(item,i) in classes" :key="i" v-if="showAll">
          <router-link class="router w-color" :to = item.routerPath>
            <i :class=item.class></i>
          </router-link>
          <!--<i :class=item.class></i>-->
        </li>
      </ul>
    </div>
    <div class="cover" v-if='isShowCover' @click="hide"></div>
  </div>
</template>
<script>
  export default {
    // props : {
    //   classes : Array,
    //
    // },
    data () {
      return {
        showAll : false,
        classes : [
          {
            class : 'icon iconfont icon-comments',
            routerPath : '/'
          },
          {
            class : 'icon iconfont icon-wode',
            routerPath : '/'
          },
          {
            class : 'icon iconfont icon-set',
            routerPath : '/mine/mytrackRouter'
          },
          {
            class : 'icon iconfont icon-xihuan',
            routerPath : '/'
          },
          {
            class : 'icon iconfont icon-comments',
            routerPath : '/'
          },
        ],
        isShowCover : false,
      }
    },
    methods : {
      changeShow : function () {
        this.showAll = true;
        this.isShowCover = true;
      },
      changeHide : function () {
        this.showAll = false;
        this.isShowCover = false;
      },
      hide(){
        this.showAll = false;
        this.isShowCover = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件

  .bottom-show-item{
    /*position: fixed;*/
    /*bottom: p(445);*/
    /*right: p(20);*/
    /*!*z-index: 99;*!*/
    /*background: black;*/
    /*opacity: 0.9;*/

    .show-item-content{

      .show-main{
        display: inline-block;
        z-index: 99;
        position: fixed;
        bottom: p(445);
        right: p(20);
        /*z-index: 99;*/
        background: black;
        opacity: 0.6;
      }
    }
  }
  .icon-main{
    padding: p(10);
  }
  .icon{
    font-size: p(40);
    /*width: 100%;*/
    /*height: 100%;*/
    /*line-height:p(50) ;*/
    /*display: inline-block;*/
  }
  .show-row{
    /*width : p(50);*/
    /*height: p(50);*/
    /*line-height: p(50);*/
  }
  .router{
    width: 100%;
    height: 100%;
    display: inline-block;

  }
  .cover{
    position: fixed;
    top: 0 ;
    right: 0;
    left: 0;
    bottom: 0;
    /*background: transparent;*/
    z-index: 9;
    background: transparent;
    /*opacity: 0.4;*/
  }
</style>
