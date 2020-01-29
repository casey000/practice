<template>
  <div class="chat-content p-lef-rig24">
    <div class="chat-kuang fontSize-14">
      <ul>
        <li>
          <img src="" alt="">
          <span>我又一只小毛驴我从来也不骑</span>
        </li>
        <li>
          <img src="" alt="">
          <span>有一天我心里高兴骑他去赶集</span>
        </li>
        <li>
          <img src="" alt="">
          <span>我又一只小毛驴我从来也不骑</span>
        </li>
        <li>
          <img src="" alt="">
          <span>有一天我心里高兴骑他去赶集</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data (){
      return{

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
.chat-content{
  width: 100%;

  .chat-kuang{
    width: 100%;

    >ul{
      width: 100%;
      margin-top: p(50);
      font-size: p(28);
      overflow: hidden;
      >li{
        width: 100%;
        margin-bottom: p(35);
        float: left;
        height: p(85);
        line-height: p(85);
        span{
          border-radius: p(10);
          padding: 0 p(5);
        }

        img{
          display: inline-block;
          width: p(85);
          height: p(85);
          background: white;
          border-radius: p(10);
        }
      }
      >li:nth-of-type(odd){
        text-align: left;

        img{
          float: left;
        }
        span{
          float: left;
          margin-left: p(20);
          display: inline-block;
          background: $bgBlue;
          color: white;
        }
      }
      >li:nth-of-type(even){
        text-align: right;
        img{
          float: right;
        }
        span{
          float: right;
          margin-right: p(20);
          background: white;
        }
      }
    }
  }
}
</style>
