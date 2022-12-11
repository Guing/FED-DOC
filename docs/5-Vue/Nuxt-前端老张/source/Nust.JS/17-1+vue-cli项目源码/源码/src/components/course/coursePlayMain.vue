<template>
  <div class="main">
    <div class="top">
      <span class="goBack el-icon-back" @click="goBack"> </span>
      <span class="name">{{ courseInfo.courseName }}    {{ chapterInfo.chapterName }}</span>
      <span class="collect" @click="collecte">
                <i :class="isCollect===true ? 'el-icon-star-on':'el-icon-star-off'"></i>
                收藏
            </span>
    </div>
    <div class="play">
      <div class="play-left" @contextmenu.prevent>
        <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true" id="abc"
                      :options="playerOptions"
                      v-if="playerOptions.sources[0].src"
                      @ready="playerReadied($event)"
                      @timeupdate="onPlayerTimeupdate($event)"
                      @ended="onPlayerEnded($event)"
        ></video-player>
        <div class="loading" v-if="!playerOptions.sources[0].src">
          <img src="/image/loading.gif" alt="">
          加载中...
        </div>
        <div class="over" v-if="isEnded">
          <div class="finished" v-if="isEnded && !isCourseEnded">
            <p>恭喜您学完该小节</p>
            <p class="nextCourse">下一小节：{{ nextChapter.chapterName }}</p>
            <button class="over-btn resetLearn" @click="resetLearn">重学一遍</button>
            <button class="over-btn" @click="nextCourse">下一小节</button>
          </div>
          <div class="finished" v-if="isEnded && isCourseEnded">
            <p>恭喜您学完本课程全部内容</p>
            <button class="over-btn goHome" @click="goHome">返回首页</button>
            <button class="over-btn goCourse" @click="goCourse">返回课程</button>
          </div>
        </div>
      </div>
      <div class="play-right" ref="wrapper">
        <el-tabs tab-position="right">
          <el-tab-pane>
            <div slot="label" class="tabpanel-title">
              <div class="icon"><i class="el-icon-reading"></i></div>
              <p class="text">课程</p>
            </div>

            <div class="course-container">
              <div class="courseName" :title="courseInfo.courseName">{{ courseInfo.courseName }}</div>
              <div class="courseDesc">{{ courseDetail.description }}</div>
              <div class="courseImg">
                <img :src="courseDetail.courseCover" alt="">
              </div>
              <div class="teacherRecommend" v-if="courseTeacher !== null">讲师介绍</div>
              <div class="teacher" v-if="courseTeacher !== null">
                <div class="teacherAvt">
                  <img :src="courseTeacher.teacherAvatar" alt="">
                </div>
                <div class="teacherInfo">
                  <div class="teacherName">{{ courseTeacher.teacherName }}</div>
                  <div class="teacherTag">{{ courseTeacher.tags }}</div>
                </div>
              </div>
              <div class="teacherReacher" v-if="courseTeacher !== null">{{ courseTeacher.research }}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div slot="label" class="tabpanel-title">
              <div class="icon"><i class="el-icon-data-analysis"></i></div>
              <p class="text">章节</p>
            </div>
            <div class="chapter-container">
              <dl class="list" v-for="(item,index) in chapters" :key="index">
                <dt :title="item.chapterName">{{ item.chapterName }}</dt>
                <dd :class="chapterInfo.id === child.id ? 'active' : ''" v-for="child in item.children" :key="child.id"
                    @click="play(child)">
                  <div class="video-itemIcon" :ref="renderMaps(child)">
                    <i class="el-icon-video-camera"></i>
                  </div>
                  <div class="item-name" :title="child.chapterName">
                    视频：{{ child.chapterName }}
                  </div>
                </dd>
              </dl>
            </div>
          </el-tab-pane>
          <el-tab-pane class="note">
            <div slot="label" class="tabpanel-title">
              <div class="icon"><i class="el-icon-notebook-1"></i></div>
              <p class="text">笔记</p>
            </div>
            <el-empty image="/image/about/course-empt.png"></el-empty>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {playCourse, updateStudyHour} from '@/common/api/courseManage.js'
import {mapState} from "vuex";
import {recordHistory, getLastHistoryByChapterId} from '@/common/api/history.js'
import {createToken} from '@/common/api/token.js'
import {addFavorite, deleteFavorite} from '@/common/api/favorite.js'
// require("@/utils/loaded.js")

export default {
  data() {
    return {
      playerOptions: {
        id: "vue-video-player",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: "" //url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      },
      courseId: this.$route.params.courseId,
      chapterId: this.$route.params.chapterId,
      chapterInfo: {},
      chapters: [],
      currentTime: '',//播放时间
      memberid: '',//会员id
      count: 0,
      courseInfo: {},
      duration: '',
      token: '',
      currentPlay: false,
      indexMap: new Map(),
      maps: new Map(),
      isEnded: false,
      isCourseEnded: false,
      currentChapter: {},
      nextChapter: {},
      courseDetail: {},
      isCollect: false,
      tokens: '',
      courseTeacher: '',
      getLastTime: ''//获取最后一次播放记录
    }
  },
  created() {
    let width = document.body.clientWidth;
    this.playerOptions.aspectRatio = (width - 450) + ":600";
    let token = localStorage.getItem("token");
    if (!token) {
      this.$message.error('无法播放视频，请先登录');
      this.$router.go(-1)
    }
    this.playCourse(this.courseId,this.chapterId)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLogin: (state) => state.user.isLogin,
    }),
  },
  methods: {
    //收藏
    collecte() {
      this.isCollect = !this.isCollect
      createToken().then(res => {
        this.tokens = res.data.token
        if (this.isCollect === true) {
          ByteLengthQueuingStrategy
          addFavorite({courseId: this.courseId, token: this.tokens}).then(res => {
            if (res.meta.code === '200') {
              this.$message({
                message: '成功收藏该课程',
                type: 'success',
              })
            }
          })
        } else {
          deleteFavorite({memberId: this.memberid, courseId: this.courseId, token: this.tokens}).then(res => {
            if (res.meta.code === '200') {
              this.$message({
                message: '取消收藏该课程',
                type: 'error',
              })
            }
          })
        }
      })
    },
    //重学该小节
    resetLearn() {
      this.playCourse(this.currentChapter.courseId, this.currentChapter.id)
      this.isEnded = false
    },
    //学习下一小节
    nextCourse() {
      this.$router.replace({path: '/course-play/' + this.nextChapter.courseId + '/' + this.nextChapter.id})
      this.$router.go(0)
      /* this.playCourse(this.nextChapter.courseId,this.nextChapter.id) */
      this.isEnded = false
    },
    //点击按钮返回首页
    goHome() {
      this.$router.push('/home')
    },
    //点击按钮返回课程页
    goCourse() {
      window.history.go(-1)
    },
    //返回上一页
    goBack() {
      window.history.go(-1)
    },
    // 播放列表课程
    play(item) {
      this.$router.replace({path: '/course-play/' + item.courseId + '/' + item.id})
      this.playCourse(item.courseId, item.id)
    },
    //已进入页面播放课程
    playCourse(courseId, chapterId) {
      this.memberid = this.userInfo.id
      playCourse(courseId, chapterId).then(res => {
        if (res.meta.code === '200') {
          let playInfoList = res.data.playInfo.playInfoList;
          for (let i = 0; i < playInfoList.length; i++) {
            let playInfo = playInfoList[i];
            if (playInfo.format === "mp4") {
              this.playerOptions.sources[0].src = playInfo.playURL
              break
            }
          }
          this.chapterInfo = res.data.chapterInfo
          this.playerOptions.poster = res.data.chapterInfo.chapterLitpic
          this.chapters = res.data.courseInfo.bizCourseChapters
          this.courseInfo = res.data.courseInfo
          this.courseDetail = res.data.courseInfo.bizCourseDetail
          this.courseTeacher = res.data.courseInfo.bizCourseTeacher
          this.duration = res.data.playInfo.playInfoList[0].duration
        } else if (res.meta.code === '70001') {
          this.$message({
            message: res.meta.msg,
            type: 'error'
          });
          this.$router.go(-1)
        }
      })

    },
    /* 获取视频播放进度 */
    onPlayerTimeupdate(player) {
      this.count++
      this.currentTime = player.cache_.currentTime
      if (this.count == 25) {
        recordHistory(
            {
              chapterId: this.chapterId,
              courseId: this.courseId,
              memberId: this.memberid,
              lastTime: this.currentTime
            }
        )
        this.count = 0
      }
    },
    //设置视频进度
    playerReadied(player) {
      //获取播放历史记录
      getLastHistoryByChapterId({
        memberId: this.memberid,
        courseId: this.courseId,
        chapterId: this.chapterId
      }).then(res => {
        if (res.data.data !== null) {
          this.getLastTime = res.data.data.lastTime
          player.currentTime(this.getLastTime)
        }
      })
    },
    //视频播放结束
    onPlayerEnded(player) {
      recordHistory(
          {
            chapterId: this.chapterId,
            courseId: this.courseId,
            memberId: this.memberid,
            lastTime: player.cache_.currentTime
          }
      )
      createToken().then(res => {
        updateStudyHour({id: this.userInfo.id, duration: this.duration}, res.data.token)
      })
      // 获取下一节
      let index = this.indexMap.get(this.chapterId);
      this.currentChapter = this.maps.get("chapter_" + (index))
      this.nextChapter = this.maps.get("chapter_" + (index + 1))
      if (this.nextChapter) {//学完本节

      } else {//学完全部
        this.isCourseEnded = true;
      }
      this.isEnded = true;
    },
    renderMaps(item) {
      let index = (this.maps.size + 1);
      this.indexMap.set(item.id, index)
      this.maps.set("chapter_" + index, item)
    }
  }
}
</script>

<style scoped>
>>> .el-tabs__item {
  padding: unset !important;
  width: 80px !important;
  height: 100px !important;
}

>>> .el-tabs__nav-wrap::after {
  background: unset !important;
}

>>> .el-tabs__active-bar.is-right {
  width: 0 !important;
}

>>> .el-tabs__item.is-active .tabpanel-title {
  background: #25282A !important;
}

>>> .el-tabs__item.is-active .tabpanel-title .icon, .el-tabs__item.is-active .tabpanel-title .text {
  color: #ffffff;
}

>>> .el-tabs__nav.is-right {
  padding: 20px 0;
  background: #1C1F21 !important;
}

>>> .el-tabs--right, >>> .el-tabs__content, >>> .el-tab-pane {
  height: 100%;
}

>>> .vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  position: absolute;
  bottom: 60px;
  left: 20px;
  font-size: 3.5em;
  line-height: 2em !important;
  margin-left: unset;
  top: unset;
}

.main {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 80px;
}

.top {
  padding: 0 20px;
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #25282A;
  opacity: 1;
}

.top .goBack {
  font-weight: bold;
  color: #545C63;
  cursor: pointer;
}

.top .name {
  padding: 0 10px;
}

.top .collect {
  cursor: pointer;
  font-size: 16px;
  color: #A8A9AB;
}

.play {
  display: flex;
  background: #25282A;
  padding: 20px;
  height: 600px;
  overflow: hidden;
}

/* 视频播放开始 */
.play-left {
  width: calc(100% - 400px);
  height: 100%;
  background: #000;
  position: relative;
  overflow: hidden;
}

.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}

/* 视频播放结束 */
/* 播放列表开始 */
.play-right {
  color: #ffffff;
  width: 400px;
  height: 100%;
  /* overflow: scroll;*/
}

.play-right .active {
  background: rgba(255, 255, 255, .3);
}

.tabpanel-title {
  padding: 17px 0 18px 0;
  width: 100%;
  text-align: center;
}

.tabpanel-title .icon {
  height: 40px;
  font-size: 30px;
  line-height: 40px;
  color: #A4A5A6;
}

.tabpanel-title .text {
  height: 25px;
  line-height: 25px;
  color: #A4A5A6;
}

.chapter-container {
  height: 100%;
  overflow-y: scroll;
  padding-left: 10px;
}

.chapter-container .list {
  width: 100%;
  margin-bottom: 20px;
}

.list dt {
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  color: #ffffff;
  opacity: 1;
  padding-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.list dd {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 2px 5px;
  margin: 0 0 5px 0;
  color: #a8a9ab;
  cursor: pointer;
}

.list dd:hover {
  color: #ffffff;
}

.list dd .video-itemIcon {
  height: 30px;
  margin-right: 10px;
  font-size: 18px;
  float: left;
}

.list dd .item-name {
  float: left;
  width: calc(100% - 35px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}

/* 播放列表结束 */
.video-player {
  height: 100%;
}

.loading {
  color: #ffffff;
  font-size: 20px;
  margin: 200px auto;
  width: 100px;
  text-align: center;
}

.loading img {
  width: 100%;
}

.finished {
  margin-top: 250px
}

.over {
  color: #ffffff;
  font-size: 20px;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  background: rgba(0, 0, 0, .8);
}

.over .nextCourse {
  font-size: 24px;
  padding: 10px 0;
  border: none;
}

.over .resetLearn {
  background: rgba(200, 200, 200, .3) !important;
}

.goHome, .goCourse {
  background: rgba(200, 200, 200, .3) !important;
}

.over .over-btn {
  width: 120px;
  height: 30px;
  margin: 20px;
  line-height: 30px;
  border-radius: 8px;
  border: 0px;
  outline: none;
  color: #FFFFFF;
  background: #3585FF;
}

.over .over-btn:hover {
  border: 1px solid #FFF;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(240, 240, 240, 1);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 10px;
  background-color: rgba(240, 240, 240, .5);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  background-color: rgba(240, 240, 240, .5);
}

/* 课程开始 */
.course-container {
  height: 100%;
  overflow-y: scroll;
  margin-left: 10px;
  color: #a8a9ab;
}

.course-container .courseName {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  font-weight: bold;
}

.course-container .courseDesc {
  line-height: 25px;
  font-size: 13px;
  margin: 20px 0;
  letter-spacing: 1px;
  text-align: justify;
}

.course-container .courseImg {
  width: 100%;
  height: 150px;
  border-radius: 8px;
}

.course-container .courseImg img {
  width: 100%;
  height: 100%;
  border-radius: 8px;

}

.course-container .teacher {
  display: flex;
  text-align: center;
  justify-content: flex-start
}

.course-container .teacher .teacherAvt {
  margin: 10px 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.course-container .teacher .teacherAvt img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.course-container .teacherRecommend {
  margin: 15px 0;
  font-size: 16px;
  font-weight: bold;
}

.course-container .teacher .teacherInfo {
  display: flex;
  flex-direction: column;
  margin: 15px 10px;
  text-align: left;
}

.course-container .teacher .teacherName {
  font-weight: bold;
  font-size: 16px;
}

.course-container .teacherTag {
  text-align: left;
  font-size: 13px;
}

.course-container .teacherReacher {
  width: 100%;
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 25px;
  text-align: justify;
}

/* 课程结束 */

.note {
  margin-top: 150px;
}
</style>
