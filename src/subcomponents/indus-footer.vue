<template>
	<div class="app-tabber">
        <ul>
          <li>
            <router-link class="router" to="/indusBuyhome">
              <img src="../../static/img/home_02.png" v-if="patht=='/indusBuyhome'">
              <img src="../../static/img/home_01.png" v-else>
              <div :class="patht=='/indusBuyhome' ? 'active-tabber' : '' ">首页</div>
            </router-link >
          </li>
          <li>
            <router-link class="" to="/indusCart">
              <img src="../../static/img/cart_02.png" v-if="patht=='/indusCart'">
              <img src="../../static/img/cart_01.png" v-else>
              <div :class="patht=='/indusCart' ? 'active-tabber' : '' ">购物车</div>
            </router-link >
          </li>
          <li>
            <router-link class="" to="/indus/personcenter">
              <img src="../../static/img/mine_02.png" v-if="patht=='/indus/personcenter'">
              <img src="../../static/img/mine_01.png" v-else>
              <div :class="patht=='/indus/personcenter' ? 'active-tabber' : '' ">个人中心</div>
            </router-link >
          </li>
        </ul>
    </div>
</template>

<script>
	export default{
		data(){
			return{
				patht:''
			}
		},
		methods:{
			pathChanget(newValue) {
      			this.patht = newValue
				if(newValue.indexOf("indusBuyhome") != -1){
      				this.patht = "/indusBuyhome"
				};
				if(newValue.indexOf("indus/personcenter") != -1){
      				this.patht = "/indus/personcenter"
				};

		    },
		},
		created(){
    		this.pathChanget(this.$route.fullPath);
		},
		watch:{
			$route: function(newValue) {
      			this.pathChanget(newValue.path);
		    },
		}
		
	}
</script>

<style lang="scss" scoped>
.app-tabber {
  border-top: 1px solid #ededed;
  display: inline-block;
  width: 100%;
  background: white;
  /* position: absolute;*/
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  > ul {
    display: flex;
    justify-content: space-between;
    > li {
      box-sizing: border-box;
      padding-top: 0.375rem*2;
      width: 100%;
      text-align: center;
      height: 3.125rem*2;

      > a {
        display: inline-block;
        width: 100%;
        height: 100%;
        img {
          width: 1.375rem*2;
          height: 1.375rem*2;
        }
        div {
          font-size: 0.625rem*2;
          padding-left: 0.2rem;
          line-height: 1.3rem*2;
        }
        .active-tabber {
          color: #307feb;
        }
      }
    }
  }
}
</style>