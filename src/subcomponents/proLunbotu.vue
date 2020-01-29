<template>
  <div>
    <figure id="full_feature" class="swipslider">
      <ul class="sw-slides">
        <li class="sw-slide">
          <video width="200" height="200" controls>
            <source :src=videoSrc type="video/mp4">
          </video>
        </li>
        <li class="sw-slide"  v-for="(item,i) in urlList" :key="i">
          <img style="width: 100%;" :src=item.img>
        </li>
      </ul>
    </figure>
  </div>
</template>
<script>
  // import $ from "jquery"; //导入jquery
  // import {$} from './../common/jQuerySwipeslider/jquery-2.1.1.min';
  // import './../common/jQuerySwipeslider/swipeslider.js'
  export default {
    props : {
      videoSrc: String,
      urlList : Array
    },
    data(){
      return {

      }
    },
    mounted(){
      $('#full_feature').swipeslider();
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  /*@import "./../common/jQuerySwipeslider/swipeslider.css";*/
</style>
