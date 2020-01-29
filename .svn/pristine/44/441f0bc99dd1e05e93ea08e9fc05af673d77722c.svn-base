<template>
  <div class="intercalate" v-title data-title="设置">
      <router-link to="/mine/personalInformation" class="commonList clearfix">
          <div class="left fl">
              <img src="@/../static/image/mine/geren.png" alt="">
              <span>个人信息</span>
          </div>
          <div class="right fr">
              <span>进入</span>
              <i class="iconfont icon-more"></i>
          </div>
      </router-link>
      <router-link to="/mine/AccountSecurity" class="commonList clearfix">
          <div class="left fl">
              <img src="@/../static/image/mine/anquan.png" alt="">
              <span>账户安全</span>
          </div>
          <div class="right fr">
              <span></span>
              <i class="iconfont icon-more"></i>
          </div>
      </router-link>
      <div class="bottom-button" @click="submit()" v-if="isWeixin">
        <span class="login-word" @click="quitLogin()">退出登录</span>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    	isWeixin:true,
    };
  },
  created() {
		var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
  		if(is_weixin){
  			this.isWeixin = false;
  		}
  },
  methods: {
    submit() {

    },
    quitLogin() {
    	
      sessionStorage.clear();
      this.$router.push({
        path : '/mine/denglu',
      })
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
.intercalate {
  padding-top: 1.25rem;
  height: 100%;

  .commonList {
    width: 100%;
    display: inline-block;
    background: white;
    height: 6rem;
    line-height: 6rem;
    font-size: 1.6875rem;
    padding: 0 1.875rem;
    margin-bottom: 1.25rem;
    box-sizing: border-box;
    .left {
      color: #333;
      position: relative;
      padding-left: 3rem;
      img {
        position: absolute;
        width: 2.25rem;
        height: 2.25rem;
        left: 0rem;
        top: 2rem;
      }
    }
    .right {
      color: #989898;
    }
  }
  .bottom-button{
    width: 100%;
    height: p(90);
    text-align: center;
    position: fixed;
    bottom: p(30);
    .login-word{
      display: inline-block;
      width: 80%;
      height: 100%;
      background: $bgBlue;
      text-align: center;
      line-height: p(90);
      font-size: p(30);
      color: white;
      border-radius: p(10);
    }
  }
}
</style>


