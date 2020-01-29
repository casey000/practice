<template>
  <div class="nav-search-content">
    <mt-header :title=headTitle>
      <router-link to="/" slot="left">
        <i class="icon iconfont icon-back" @click="returnBtn()"></i>
        <!--<mt-button icon="back">back</mt-button>-->

        <mt-button @click="handleClose">close</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>
<script>
  import { Header } from 'mint-ui';
  export default {
    props : {
      headTitle : String
    },
    data() {
      return {

      }
    },
    methods: {
      getHeadTitle : function () {
        this.headTitle = this.$route.meta.title; //设置头部标题
      },
      handleClose : function () {
//      console.log('this.$route.fullPath',this.$route.fullPath)
      },
      returnBtn() {
        var path = this.$route.fullPath;
        if (!path === '/'||!path === '/home') {
          this.$router.back(-1); //返回上一页面
        }

      }
    },
    created(){
      this.getHeadTitle()
    }
  };
</script>
<style>
  .nav-search-content .mintui{
    font-size: 2rem;
    line-height: 2rem;
  }
</style>

<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件

</style>
