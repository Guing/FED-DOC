import Vue from 'vue';
import MetaInfo from 'vue-meta-info';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/iconfont.css';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { HappyScroll } from 'vue-happy-scroll'
import VideoPlayer from 'vue-video-player'
window.videojs = VideoPlayer.videojs
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
require('video.js/dist/lang/zh-CN.js')
import Pagination from "@/components/Pagination";

Vue.use(VideoPlayer)
Vue.use(MetaInfo);
Vue.use(ElementUI);


//自定义组件名
Vue.component('happy-scroll', HappyScroll)
Vue.component('Pagination', Pagination)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
