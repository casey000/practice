<template>
  <div class="laba-adv m-top5 ">
    <ul class="scroll-content f-pr" :style= top >
      <li v-for="(item,i) in prizeList" :key="i">{{item.name}}</li >
      <!--<li class="juzDuiqi">这是一段广告哦，这真的是一段广告</li>-->
    </ul>
  </div>
</template>
<script>
  export default {
    data (){
      return {
        prizeList: [
          {name: '【雪特】这是第一段广告，呵呵呵'},
          {name: '【法克】这是第二段广告，哈哈哈'},
          {name: '【碧池】这是第三段广告，卧槽曹'},
          {name: '【三诶】这是第四段广告，MMP'},
          {name: '【傻逼】我特么是最后一条广告，R啊'}
        ],
        activeIndex: 0
      }
    },
    counted : {
      top() {
        return  -this.activeIndex * 20 + 'px';
      }
    },
    mounted () {//启动定时器
      this.play()
      setInterval( ()=> {
//      console.log('定时器开启')
        if(this.activeIndex < this.prizeList.length-1) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 2000);
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .laba-adv{
    width: 100%;
    height: p(65);
    box-sizing: border-box;
    border-top: p(1) solid #eeeeee;
    background: pink;
    overflow: hidden;
    line-height: p(65);

  .scroll-content{
    transition: top 0.5s;
  }
  }
</style>
