<template>
	<div class="custom-back">
		<el-input
		  type="textarea"
		  :rows="7"
      resize = "none"
		  placeholder="请输入意见或建议"
		  v-model="textarea">
		</el-input>
		<p class="tips">{{feedbackMsg}}</p>
		<div class="btn tc">
			<span @click="addFeedback" v-if="isSub && textarea">提交</span>
      <span style="background-color: gray;color: white" v-else>提交</span>
		</div>
	</div>
</template>


<script>
  import comLink from "@/common/common_link"; //导入总线
  import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      textarea: '',
      isSub: true,
      feedbackMsg: '' //反馈提示语
    }
  },
  mounted() {
    this.getFeedbackMsg();
  },
  methods: {
    //查询反馈提示语
    getFeedbackMsg(){
      var vm = this;
      $.ajax({
        url:comLink.yxtHost + '/system/feedbackMsg',
        data:{
          'openid':sessionStorage.openid
          },
        dataType:'json',
        type:'post',
        success:function (resp) {
          if(resp.code == 1){
            vm.feedbackMsg = resp.data.feedbackMsg;
          } else {
            Toast({
              message: resp.msg,
              duration: 2000
            });
          }
        }
      })
    },
    //添加用户反馈
    addFeedback(){
      this.isSub = false;
      var orderId = window.location.hash.split('=')[1];
      var vm = this;
      $.ajax({
        url:comLink.yxtHost + '/feedback/addFeedback',
        data:{
          'openid': sessionStorage.openid,
          'insideId': sessionStorage.insideId,
          'orderId': orderId,
          'content': vm.textarea
        },
        dataType:'json',
        type:'post',
        success:function (resp) {
          if(resp.code == 1){
            var insideId = resp.data.insideId;
            if(insideId !== null && insideId != undefined) {
              Toast({
                message: '感谢您的宝贵意见',
                duration: 2000
              });
              vm.$router.push({
                path: '/indusBuyhome',
                query : {'id' : insideId}
              });
            } else {
              vm.$router.push({
                path: '/newhome'
              });
            }
          } else {
            Toast({
              message: resp.msg,
              duration: 2000
            });
            vm.isSub = true;
          }
        }
      })
    },
  }
}
</script>

<style type="text/css">
textarea{
	resize:none
}
</style>
<style lang="scss" scoped="scoped">
@import "@/../src/sass/public.scss"; //导入scss初始文件
.custom-back{
	background-color: #fff;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width:100%;
	text-align:center;
	box-sizing:border-box;
	.el-textarea{
		margin:p(30) 0;
		/*margin:p(20) p(25);*/
		display:inline-block;
		width:95%;
		box-sizing:border-box;
	}
	.tips{
		font-size: p(26);
		color: #999;
		line-height: p(45);
		padding: 0 p(25);
	}
	.btn{
		margin-top:p(50) ;
		text-align: center;
		span{
			display: inline-block;
			background-color: #307feb;
			color: #fff;
			font-size: p(30);
			border-radius: p(15);
			text-align: center;
			width: p(300);
			height: p(70);
			line-height: p(70);
		}
	}
}
</style>
