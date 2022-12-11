<template>
  <div class="home">
    <!-- <h2>Home Page</h2> -->
    <indexHeader></indexHeader>
    <navSwiper></navSwiper>
    <newGoodCourse></newGoodCourse>
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import navSwiper from '@/components/index/navSwiper.vue';
import newGoodCourse from '@/components/index/newGoodCourse.vue';
import foot from '@/components/foot/foot.vue';

export default {
  metaInfo() {
    return {
      title: 'WEB前端_前端课程_小鹿线', // set a title
      meta: [{ // set meta
        name: '前端,前端课程,免费课程,WEB前端,前端工具,前端框架,html,css,javascript,js,html5,css3,nodejs,vuejs,reactjs,typescript,webpack,git,小鹿线',
        content: '小鹿线注重于web前端开发，专注前端开发，关注用户体验，提供全面详细的前沿前端教程及前端课程，精心雕琢每一门前端课程，是将要从事前端和正在致力于前端的开发者好的选择。小鹿线注重于web前端开发，专注前端开发，关注用户体验，提供全面详细的前沿前端教程及前端课程，精心雕琢每一门前端课程，是将要从事前端和正在致力于前端的开发者好的选择。'
      }]
    }
  },
  components: {
    indexHeader,
    navSwiper,
    newGoodCourse,
    foot
  },
};
</script>

<style scoped>
</style>
