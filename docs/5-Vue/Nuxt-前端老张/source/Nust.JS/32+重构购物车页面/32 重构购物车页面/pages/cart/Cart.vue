<template>
    <div class="course">
        <indexHeader></indexHeader>
        <Layout></Layout>
        <foot 
          :userServiceAgreement='userServiceAgreement'
          :privateAgreement='privateAgreement'
        ></foot>
    </div>
</template>


<script>
import indexHeader from '@/components/index/header.vue';
import Layout from '@/components/cart/layout.vue';
import foot from '@/components/foot/foot.vue';
export default {
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
    Layout,
    foot
  },
};
</script>

