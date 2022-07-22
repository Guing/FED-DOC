<template>
    <div class="courseplay">
      <router-view></router-view>
      <coursePlayMain></coursePlayMain>
      <foot  
        :userServiceAgreement='userServiceAgreement'
        :privateAgreement='privateAgreement'
      ></foot>
    </div>
</template>


<script>
import indexHeader from '@/components/index/header.vue';
import coursePlayMain from '@/components/course/coursePlayMain.vue'
import foot from '@/components/foot/foot.vue';
export default {
  components: {
    indexHeader,
    coursePlayMain,
    foot
  },
  async asyncData( app ){
    //获取服务协议
    let resAgreementByCode = await app.$getAgreementByCode("6HG6326I");
    //获取隐私协议
    let resPrivateAgreement = await app.$getAgreementByCode('6GFL2QGQ');
    //返回数据
    return {
      userServiceAgreement:resAgreementByCode.data.data,
      privateAgreement:resPrivateAgreement.data.data,
    }
  }
};
</script>