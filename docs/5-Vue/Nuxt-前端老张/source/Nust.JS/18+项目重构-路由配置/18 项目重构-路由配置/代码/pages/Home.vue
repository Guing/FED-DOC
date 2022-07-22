<template>
  <div class="home">
    <indexHeader></indexHeader>
    <navSwiper></navSwiper>
    <!-- <newGoodCourse></newGoodCourse>
    <foot></foot> -->
  </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import navSwiper from '@/components/index/navSwiper.vue';
// import newGoodCourse from '@/components/index/newGoodCourse.vue';
// import foot from '@/components/foot/foot.vue';

export default {
  components: {
    indexHeader,
    navSwiper,
    // newGoodCourse,
    // foot
  },
};
</script>