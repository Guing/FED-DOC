<template>
 
</template>

<script lang="ts">
//vue2中没有app的概念，使用Vue.config等全局API时，会影响所有new Vue()的实例
//vue3中通过createApp()返回app实例，将全局API移除掉，或者将移到实例app下面，这样就不会影响其他app实例了。
// Vue.config => app.config
// Vue.config.productionTip => 移除 
// Vue.config.ignoredElements => app.config.compilerOptions.isCustomElement 
// Vue.component  => app.component
// Vue.directive  => app.directive
// Vue.mixin  => app.mixin
// Vue.use  => app.use 
// Vue.prototype  => app.config.globalProperties
// Vue.extend  => 移除 
export default {
  name: "HelloWorld",
  

};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
