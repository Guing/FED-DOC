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
      title:this.title
    }
  },
  data(){
    return{
      webconfig:{}
    }
  },
  async asyncData( app ){
    let type = app.route.query.type;
    let id = app.route.params.id;
    let arrcourse = [];
    let title = '';
    let resSecondArr = {};
    let arr = [];
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
    if( type=='fcategory'){
      arr = resFirstArr.data.list.filter(item=>item.id == id);
      title = arr[0].categoryName;
      queryParams.entity.firstCategory = id;
      app.$cookies.set('firstCategory',id);
      //获取二级分类
      resSecondArr = await app.$getSecondCategorys(id);
    }
    if( type=='scategory'){
      let firstCategoryId = app.$cookies.get('firstCategory');
      queryParams.entity.firstCategory = firstCategoryId;
      queryParams.entity.secondCategory = id;
      app.$cookies.set('scategory',id);
      //获取二级分类
      resSecondArr = await app.$getSecondCategorys(firstCategoryId);
      arr = resSecondArr.data.list.filter(item=>item.id == id);
      title = arr[0].categoryName;
    }
    //点击初中高
    if( type =='clevel'){

      let firstCategoryId = app.$cookies.get('firstCategory');
      let scategory = app.$cookies.get('scategory');
      resSecondArr = await app.$getSecondCategorys(firstCategoryId || -1);

      queryParams.entity.firstCategory = firstCategoryId || '';
      queryParams.entity.secondCategory = scategory || '';
      queryParams.entity.courseLevel = id;

    }
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
      title,
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
