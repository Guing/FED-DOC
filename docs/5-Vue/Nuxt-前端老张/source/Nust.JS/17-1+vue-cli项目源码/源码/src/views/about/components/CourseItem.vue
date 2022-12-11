<template>
  <div class="my-course-content">
      <div v-if="courseList && courseList.length > 0" style="width:980px;">
          <div class="course-main" style="width:980px;" v-if="courseList && courseList.length > 0">
            <div class="course-item" v-for="item in courseList" :key="item.id">
              <div class="item-left"  @click="goStu(item.id)">
                <img :src="item.courseCover" :alt="item.courseName" />
                <!-- <p>晋级TS高手搞定复杂项目</p> -->
              </div>
              <div class="item-right">
                <div class="i-r-left">
                  <div class="i-r-l-title">
                    <p class="tip" v-if="item.discountPrice === 0">免费课</p>
                    <p class="tip vip" v-if="item.discountPrice !== 0 && item.isMember === 1">会员课程</p>
                    <p class="title" @click="goStu(item.id)">{{item.courseName}}</p>
                  </div>
                  <div class="i-r-l-center">
                    <p class="study-time">总时长: {{item.totalHour}}</p>
                    <p>讲师：{{item.lecturerName}}</p>
                    <p>课程级别： {{item.courseLevel}}</p>
                  </div>
                  <div class="i-r-l-note">笔记 0</div>
                </div>
                <div class="i-r-right">
                  <div class="i-r-bottom">
                    <button :disabled="true">我的项目</button>
                    <button class="student" @click="goStu(item.id)">继续学习</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div v-else class="course-empty">
        <div class="empty">
          <img src="/image/about/course-empt.png" alt="" />
          <p>没有任何课程，可以先<span @click="goCourse">去找找课程</span></p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    courseList: {
      type: Array,
      default: []
    }
  },
  methods:{
    goStu(id){
      this.$router.push({
        path: '/course-info/'+id
      })
    },
    goCourse(){
      this.$router.push({
        path: '/course'
      })
    }
  }
}
</script>

<style  scoped>
  .my-course-content {
  width: 100%;
  margin-bottom: 50px;
  /* height: 800px; */
}
.course-empty {
  height: 500px;
  width: 100%;
  position: relative;
}
.empty {
  width: 220px;
  height: 220px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.empty img {
  width: 180px;
  height: 180px;
  margin: 10px;
}
.empty p {
  width: 220px;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(181, 185, 188, 1);
}
.empty span {
  color: rgba(255, 61, 61, 1);
  cursor: pointer;
}
.course-item {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
}
.item-left {
  width: 250px;
  height: 150px;
  position: relative;
  cursor: pointer;
}
.item-left img {
  width: 220px;
  height: 125px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  /* border: 1px solid red; */
}
.item-left p {
  width: 150px;
  height: 60px;
  white-space: wrap;
  font-size: 24px;
  font-family: MicrosoftYaHei-Bold;
  color: #ffffff;
  text-shadow: 2px 4px 4px rgba(27, 39, 94, 0.75);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.item-right {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;
}
.i-r-left {
  width: 450px;
  height: 150px;
  display: flex;
  flex-direction: column;
}
.i-r-l-title {
  display: flex;
}
.tip {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
  background-color: rgba(147, 153, 159, 0.2);
  padding: 2px 8px;
  margin-right: 20px;
  height: 20px;
  line-height: 20px;
}
.vip {
  background: linear-gradient(
    to right,
    rgba(255, 61, 61, 1) 0%,
    rgba(255, 122, 21, 1) 100%
  );
  color: #fff;
}
.title {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
  cursor: pointer;
}
.i-r-l-center {
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #4d555d;
  padding: 0 20px;
  box-sizing: border-box;
}
.study-time {
  color: red;
}
.i-r-l-note {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #4d555d;
}
.i-r-right {
  flex: 1;
  width: 100%;
  height: 150px;
  position: relative;
}
.i-r-bottom {
  width: 100%;
  height: 40px;
  position: absolute;
  left: 0;
  bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.i-r-bottom button {
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #eee;
  border-radius: 20px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;

border: none;
outline: none
}
.i-r-bottom  .student {
    cursor: pointer;
  background: linear-gradient(
    to right,
    rgba(125, 177, 255, 1) 0%,
    rgba(39, 132, 255, 1) 100%
  );
}
</style>
