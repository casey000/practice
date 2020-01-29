<template>
  <div class="more-pinpai-content" v-title :data-title=title>
    <div class="search-main f-oh">
      <div class="search-inp-main f-oh f-fl">
        <i class="icon iconfont icon-search f-fl"></i>
        <input class="head-search f-fl" v-model="name" type="text" placeholder="搜索">
      </div>
      <p class="search-btn f-fl fontSize-14 w-color" @click="search">搜索</p>
    </div>

    <!--推荐品牌-->
    <div class="tuijian-pinpai fontSize-13 b-white" v-if="tuijianPinpaiList">
      <span class="tuijian-title">--推荐品牌--</span>
      <ul>
        <li v-for="(item,i) in tuijianPinpaiList" :key="i" @click="brandProStore(item.id)">
          <img :src=item.logo alt="">
        </li>
      </ul>
    </div>

    <div class="brand-lists fontSize-13" v-for="(item,i) in moreProLists" :key="i">
      <span class="tuijian-title ">--{{item.name}}--</span>
      <ul>
        <li v-for="(detailItem,j) in item.brandList" :key="j"
            @click="brandProStore(detailItem.id)"
        >
          <div class="img-wai">
            <img :src=detailItem.logo alt="">
          </div>
          <span>{{detailItem.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comLink from "./../../../common/common_link"; //导入总线
  import { Indicator, Toast, Popup, DatetimePicker } from "mint-ui";
  export default {
    data (){
      return{
        name : '',
        title : '邮讯通专区',
        img:'@/../static/image/home/xiaomi_2.png',
      //  /category/brandList
        moreProLists : [],//更多品牌数据
        tuijianPinpaiList : [],//推荐品牌列表
        storeId : 0,
        proId : 0,
      }
    },
    methods : {
      brandProStore(id){
        this.$router.push({
          path : '/home/brandStoreRouter',
          query : {
            brandId : id,
          }
        });
        console.log(this.moreProLists[i].id,this.moreProLists[this.storeId].brandList[this.proId].id)
      },
      search() {
        this.morePinpaiAxios();
        this.tuijianPinpaiList = '';
      },
      //更过品牌数据 /index/brand
      morePinpaiAxios: function(){
        var _vm = this;
        console.log(111111);
        axios.get(comLink.yxtHost + '/category/brandList', {
          params:{
            name : _vm.name,
          }
        }).then(function(response) {
          if (response.data.code = "200") {
            _vm.moreProLists = response.data.data;//获取11项品牌店铺列表
            console.log(_vm.moreProLists,'更多品牌');
            for( var i = 0,l = _vm.moreProLists.length;i < l;i ++){
              _vm.moreProLists[i].logo = comLink.yxtImgHost + _vm.moreProLists[i].logo;
              for( var j = 0, il = _vm.moreProLists[i].brandList.length; j < il; j ++){
                _vm.moreProLists[i].brandList[j].logo = comLink.yxtImgHost + _vm.moreProLists[i].brandList[j].logo
              }
            }

          }else{
            // alert('失败')
          }
        })
          .catch(function(res) {
            Toast({
              //mintui提示效果
              message: "数据请求失败",
              duration: 2000
            });
          });
      },
      //推荐品牌
      tuijianPinpaiAxios: function(){
        var _vm = this;
        console.log(111111);
        axios.get(comLink.yxtHost + '/index/brand', {
          // params:{
          //   type : newId
          // }
        }).then(function(response) {
          if (response.data.code = "200") {
            _vm.tuijianPinpaiList = response.data.data.slice(0,6);//获取11项品牌店铺列表

            console.log(_vm.tuijianPinpaiList,'推荐');
            for( var i = 0,l = _vm.tuijianPinpaiList.length;i < l;i ++){
              _vm.tuijianPinpaiList[i].logo = comLink.yxtImgHost + _vm.tuijianPinpaiList[i].logo;
              // for( var j = 0, il = _vm.moreProLists[i].brandList.length; j < il; j ++){
              //   _vm.moreProLists[i].brandList[j].logo = comLink.yxtImgHost + _vm.moreProLists[i].brandList[j].logo
              // }
            }

          }else{
            // alert('失败')
          }
        })
          .catch(function(res) {
            Toast({
              //mintui提示效果
              message: "数据请求失败",
              duration: 2000
            });
          });
      },
    },
    mounted (){
      this.morePinpaiAxios();//更多品牌数据
      this.tuijianPinpaiAxios();//推荐品牌
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/../src/sass/public.scss"; //导入scss初始文件
  .more-pinpai-content{
    width: 100%;
    .search-main{
      height: p(90);
      width: 100%;
      background: #307ff5;
      padding: 0 p(20);
      line-height: p(90);

      .search-inp-main{
        margin: p(10) 0;
        width: 85%;
        height: p(70);
        border-radius: p(40);
        background: white;
        line-height: p(70);

        .icon-search{
          width: 15%;
          font-size: p(40);
          padding-left: p(35);
        }
        .head-search{
          width: 85%;
          height: 100%;
        }
      }
      .search-btn{
        display: inline-block;
        width: 15%;
        text-align: center;
      }
    }
    .tuijian-pinpai{
      width: 100%;
      padding: p(30) p(90) 0 p(90);

      .tuijian-title{
        display: block;
        text-align: center;

      }
      >ul{
        overflow: hidden;
        margin-top: p(30);
        >li{
          float: left;
          width: 11rem;
          height: 12rem;
          margin-bottom: p(10);
          text-align: center;
          padding-bottom: p(60);

          img{
            width: 90%;
            height: 100%;
          }
        }
      }
    }
    .brand-lists{
      width: 100%;
      background: white;
      margin-top: p(20);
      padding: p(30) 0 0 0;
      >ul{
        width: 100%;
        overflow: hidden;
        padding: p(30) 0 p(40) 0;
         >li{
           float: left;
           width: 33.3333%;
           text-align: center;
           /*height: p(140);*/

           .img-wai{
             width: 100%;
             /*height: p(70);*/
             overflow: hidden;
             img{
               width: 100%;
               /*display: block;*/
               padding: 0 p(50);
             }
           }

           span{
             display: block;
             text-align: center;
             margin-top: p(10);
             color: #9a9a9a;
             font-size: p(30);
           }
         }
      }
      .tuijian-title{
        display: block;
        text-align: center;
      }
    }
  }
</style>
