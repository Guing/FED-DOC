<template>
    <div class="agreement">
        <indexHeader></indexHeader>
        <coursemain></coursemain>
        <foot  
          :userServiceAgreement='userServiceAgreement'
          :privateAgreement='privateAgreement'
      ></foot>
    </div>

</template>

<script>
import indexHeader from '@/components/index/header.vue';
import coursemain from '@/components/course/coursemain.vue';
import foot from '@/components/foot/foot.vue';

export default {
  head(){
    return {
      title:'前端课程分类-小鹿线'
    }
  },
  data(){
    return{
      webconfig:{}
    }
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
  },
  components: {
    indexHeader,
    coursemain,
    foot
  },
};
</script>

<style scoped>

</style>
