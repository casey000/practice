// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import  { LoadingPlugin } from 'vux'
import 'babel-polyfill'
//import store from './store' //默认导入文件夹下index.js
Vue.use(LoadingPlugin)
Vue.directive('title', {
  inserted: function (el, binding) {

    			document.title = el.dataset.title;

  }
})
Vue.directive('focus', {
        // 当绑定元素插入到 DOM 中。

        inserted: function (el) {
            // 聚焦元素
            el.focus()
        },
        //也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
        //有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
        //update: function (el) {
            //el.focus()
        //}
});
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
// import Vue from 'vue';

Vue.config.productionTip = false;
Vue.use(ElementUI);
// import App from './App.vue';


//const FastClick = require('fastclick')
//FastClick.attach(document.body)
//import VueRouter from 'vue-router'
//Vue.use(VueRouter)
function Encrypt(word){
            var strInfo = "0102030405060708";
            var key = CryptoJS.enc.Utf8.parse(strInfo);
            var iv  = CryptoJS.enc.Utf8.parse(strInfo);
            var srcs = CryptoJS.enc.Utf8.parse(word);
            var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
            return encrypted.toString().replace(/\+/g, "_").replace(/\//g, "__");
    };
function GetQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
};

//router.beforeEach((to, from, next) => {
//	var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
//	if(is_weixin){
//	  if(sessionStorage.openid == null || sessionStorage.openid == 'null' || sessionStorage.openid == undefined || sessionStorage.openid == 'undefined' || sessionStorage.openid == '') {
//    let url = window.location.href;
//    let openid = GetQueryString('openid');
//    let nickName = GetQueryString('nickName');
//    let State = '';
//    if(openid == null || openid == 'null' || openid == undefined || openid == 'undefined' || openid == '') {
//      let redirectUrl = "https://yxtccb.com/user/getWxUserInfo";
//
//      State = url.substring(url.lastIndexOf('#') + 1, url.length);
//      window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa0c2a3eae5b0c4d&redirect_uri="+encodeURIComponent(redirectUrl)+"&response_type=code&scope=snsapi_userinfo&state="+Encrypt(State)+"#wechat_redirect"
//    }else{
//      sessionStorage.setItem('openid',openid);
//      sessionStorage.setItem('nickName',nickName);
//      let link = url.substring(url.indexOf('?'), url.indexOf('#'));
//      window.location.href = url.replace(link, '');
//      next();
//    }
//  } else {
//    next();
//  }
//	}else{
// next()
//	}
//
//})

new Vue({
    el: '#app',
    router,
//  store,
    template: '<App/>',
    components: { App },
    render: h => h(App)//添加的06-06
});
