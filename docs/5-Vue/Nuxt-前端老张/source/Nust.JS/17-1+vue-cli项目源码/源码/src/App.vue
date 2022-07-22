<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {isMobile} from '@/utils/common.js'
export default {
  name: 'app',
  data() {
    return {
      isPhone:false
      // msg: 'Welcome to your prerender-spa-plugin vue-cli 3 demo app!',
    };
  },
  created() {
    this.isPhone = isMobile()
    if(this.isPhone){
      window.location.href = 'http://m.xuexiluxian.cn/'
    }
  },
  watch: {
    '$route':'getPath'
  },
  methods: {

    getPath(){
    //
    }
  }
};
</script>

<style>
@import './common/css/global.css';
@import './common/css/font-awsome/css/font-awesome.min.css';
body{
  margin: 0;
  padding: 0;
}
</style>
