<template>
	<div v-title :data-title = 'title' class="err-page">
		<img :src="background" class="bgimg">
		<span class="myorder" @click="enterInsidePageByOrder">我的订单</span>
		<div class="input-block">
			<p>请输入您的企业代码</p>
			<div class="input">
				<input type="text" v-model="code" placeholder="输入企业代码">
			</div>
			<span @click="enterInsidePage">立即参与</span>
		</div>
	</div>
</template>

<script>
  import comLink from "../../common/common_link"; //导入总线
  import { Toast} from "mint-ui";
	export default{
		data(){
			return{
        insideId: '', // 内购id
        background: '', // 背景图
        code: '', // 内购码
        title:'',
			}
		},
    mounted() {
      this.insideId = window.location.hash.split('=')[1];
      this.getInsideDetail();
    },
    methods: {
      //获取内购详情
      getInsideDetail(insideId) {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/getInsideDetail',
          data: {
            'openid': sessionStorage.openid,
            'insideId': vm.insideId
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              vm.background = resp.data.background;
              vm.title = resp.data.title
              document.title = resp.data.title
            }else{
              /*Toast({
                message: resp.msg,
                duration: 2000
              });*/
              if(resp.msg === '请先登录') {
                vm.$router.push({
                  path: '/indus/denglu',
                  query: {
                    insideId: vm.insideId
                  }
                })
              }
            }
          }
        })
      },
      //进入内购页面
      enterInsidePage() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/enterInsidePage',
          data: {
            'openid': sessionStorage.openid,
            'insideId': vm.insideId,
            'code': vm.code
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              sessionStorage.setItem('insideId', vm.insideId);
              vm.$router.push({
                path: '/indusBuyhome',
                query: {
                  'id': vm.insideId
                }
              })
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
      //点击我的订单进入内购页面
      enterInsidePageByOrder() {
        var vm = this;
        $.ajax({
          url:comLink.yxtHost + '/inside/enterInsidePageByOrder',
          data: {
            'openid': sessionStorage.openid,
            'insideId': vm.insideId
          },
          dataType:'json',
          type:'post',
          success:function (resp) {
            if(resp.code == 1){
              sessionStorage.setItem('insideId', vm.insideId);
              vm.$router.push({
                path: '/indus/personcenter',
                query: {
                  'id': vm.insideId
                }
              })
            }else{
              Toast({
                message: resp.msg,
                duration: 2000
              });
            }
          }
        })
      },
    }
	}
</script>

<style scoped="scoped" lang="scss">
	.err-page{
		.bgimg{
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			width: 100%;
			height: 100%;
			position: absolute;
		}
		/*background: url(../../../static/img/indus/indusInput.png) no-repeat;
		background-size:100% 100%;*/
		.myorder{
			position: absolute;
			font-size:2rem;
			display: inline-block;
			top: 1rem;
			left: 1rem;
			/*margin:1rem 0 0  1rem;*/
			z-index: 5;
			color: #333333;
			padding-bottom:.5rem ;
			border-bottom: 1px solid #666;
		}
		.input-block{
			position: absolute;
			top: 29rem;
			left: 50%;
			transform:translateX(-50%) ;
			z-index: 5;
			width: 30rem;
			text-align: center;
			p{
				font-size: 2.1rem;
				color: #333333;
				font-weight: 500;
			}
			.input{
				margin: 1.9rem 0 3rem;
				input{
					text-align: center;
					width: 22rem;
					padding: 1.5rem 0.9rem;
					background-color: #ffffff;
					border-radius: 0.625rem;
					font-size: 2rem;
					border: solid 1px #e96d47;
				}
			}
			>span{
				width: 25rem;
				height: 6rem;
				line-height: 6rem;
				display: inline-block;
				color: #FFf;
				background-color: #ff1f44;
				border-radius: 0.5rem;
			}
		}
	}
</style>
