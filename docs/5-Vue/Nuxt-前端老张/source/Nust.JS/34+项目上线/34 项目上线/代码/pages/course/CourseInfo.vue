<template>
    <div class="courseinfo"> 
        <indexHeader></indexHeader>
        <courseInfoContainer
          :courseInfoArr = 'courseInfoArr'
          :courseDetail = 'courseDetail'
          :courseChapters = 'courseChapters'
          :downsource = 'downsource'
          :courseTeacher = 'courseTeacher'
        ></courseInfoContainer>

        <foot  
          :userServiceAgreement='userServiceAgreement'
          :privateAgreement='privateAgreement'
        ></foot>
    </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import courseInfoContainer from '@/components/course/courseInfoContainer.vue'
import foot from '@/components/foot/foot.vue';
export default {
  components: {
    indexHeader,
    courseInfoContainer,
    foot,
  },
  async asyncData( app ){
    //获取课程详情
    let res = await app.$getcourseInfo(app.route.params.courseId);
    console.log( res );
    let courseInfoArr = res.data.data;
    let courseDetail = res.data.data.bizCourseDetail;
    let courseChapters = res.data.data.bizCourseChapters;
    let downsource = res.data.data.bizCourseAttachments;
    let courseTeacher = res.data.data.bizCourseTeacher;
    switch (courseInfoArr.courseLevel) {
      case 1:
        courseInfoArr.courseLevel = '初级'
        break
      case 2:
        courseInfoArr.courseLevel = '中级'
        break
      case 3:
        courseInfoArr.courseLevel = '高级'
        break
      default:
        courseInfoArr.courseLevel = '零基础'
    }
    //获取服务协议
    let resAgreementByCode = await app.$getAgreementByCode("6HG6326I");
    //获取隐私协议
    let resPrivateAgreement = await app.$getAgreementByCode('6GFL2QGQ');
    //返回数据
    return {
      userServiceAgreement:resAgreementByCode.data.data,
      privateAgreement:resPrivateAgreement.data.data,
      courseInfoArr,
      courseDetail,
      courseChapters,
      downsource,
      courseTeacher
    }
  }
};
</script>
