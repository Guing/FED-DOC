<template>
    <div class="agreement">
        <indexHeader></indexHeader>

        <coursemain
          :firstArr='firstArr'
          :arrcourse='arrcourse'
          :secondArr='secondArr'
        ></coursemain>

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

    app.$cookies.remove('firstCategory');
    app.$cookies.remove('scategory');

    let arrcourse = [];
    //参数列表
    let queryParams = {
      pageNum: 1,
      pageSize: 12,
      total: 0,
      entity: {
        courseName: '',
        status: '',
        firstCategory: '',
        courseLevel: '',
        secondCategory: '',
        sortBy: '',
        isMember: '',
        isFree: '',
        tags: ''
      }
    };
    //获取一级分类
    let resFirstArr = await app.$getFirstCategorys();
    //获取二级分类
    let resSecondArr = await app.$getSecondCategorys('-1');
    //获取课程信息
    let resArrcourse = await app.$queryCourse(queryParams);
    if (resArrcourse.meta.code = '200') {
        queryParams.total = resArrcourse.data.pageInfo.total;
        arrcourse = resArrcourse.data.pageInfo.list;
        arrcourse.forEach(item => {
        switch (item.courseLevel) {
          case 1:
            item.courseLevel = '初级';
            break;
          case 2:
            item.courseLevel = '中级';
            break;
          case 3:
            item.courseLevel = '高级';
            break;
          default:
            item.courseLevel = '';
        }
      });
    }
    //获取服务协议
    let resAgreementByCode = await app.$getAgreementByCode("6HG6326I");
    //获取隐私协议
    let resPrivateAgreement = await app.$getAgreementByCode('6GFL2QGQ');
    //返回数据
    return {
      firstArr:resFirstArr.data.list,//一级
      secondArr:resSecondArr.data.list,//二级
      arrcourse,//查询课程
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
