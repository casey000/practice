<template>
	<div v-title data-title="错误页面" class="err-page">
		<!--<img src="../../../static/image/404.jpg"/>-->
		<a href="https://yxtccb.com/yxt/index.html">
			<span>返回首页</span>
		</a>

	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped="scoped">
	.err-page{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background: url(../../../static/image/404.png);
		background-size:100% ;
	}
	span{
		display: inline-block;
		width: 10rem;
		text-align: center;
		height: 5rem;
		position: absolute;
		bottom: 5rem;
		left: 18.5rem;
		font-size: 2rem;
		border: 1px solid #fff;
		border-radius: 1rem;
		color: #fff;
		line-height: 5rem;
	}
</style>