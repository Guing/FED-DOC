<template>
  <div class="courseContainer">
    <div class="courseInfoTop">
      <div class="info-container">
        <ul class="route">
          <li class="route-item" style="cursor: pointer">
            <router-link to="/course" style="color: #FFF">课程</router-link>
          </li>
          <li class="route-item"><i class="el-icon-arrow-right"></i></li>
          <li class="route-item" style="cursor: pointer" @click="goCourseSearch(courseInfoArr.discountPrice === 0 ? 1 : 2)">{{courseInfoArr.discountPrice === 0 ? '免费课' : '会员课程'}}</li>
          <li class="route-item"><i class="el-icon-arrow-right"></i></li>
          <li class="route-item">{{courseInfoArr.courseName}}</li>
        </ul>
        <div class="name">{{courseInfoArr.courseName}}</div>
        <div class="info">
          <div class="Avat">
            <img :src=" courseTeacher !== null ? courseTeacher.teacherAvatar :'/image/Avat62.png'" alt="">
          </div>
          <ul class="teacherName">
            <li class="name-item">
                {{ courseTeacher !== null ? courseTeacher.teacherName : ''}}
                <img src="/image/teacherStart.png" alt="">
            </li>
            <li class="name-item">金牌讲师</li>
          </ul>
          <ul class="access">
            <li class="access-item">难度</li>
            <li class="access-item">{{courseInfoArr.courseLevel}}</li>
            <li class="access-item">·</li>
            <li class="access-item">时长</li>
            <li class="access-item">{{courseInfoArr.totalHour}}个小时</li>
            <li class="access-item">·</li>
            <li class="access-item">学习人数</li>
            <li class="access-item">{{courseInfoArr.purchaseCounter + courseInfoArr.purchaseCnt}}人</li>
            <li class="access-item">·</li>
            <li class="access-item">综合评分</li>
            <li class="access-item">10.00</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="info-nav">
        <div class="nav-container">
            <div class="chapter-item" @click="change1">
                <div :class="activeChange === 1 ? 'active1':''">章节</div>
                <div class="line"  :class="activeChange === 1 ? 'active2':''"></div>
            </div>
            <div class="chapter-item" @click="change2" :id="'downloadAttachment_' + downloadIndex">
                <div :class="activeChange === 2 ? 'active1':''">下载资料</div>
                <div class="line" :class="activeChange === 2 ? 'active2':''"></div>
            </div>
        </div>
    </div>
    <div class="course"  v-if="activeChange === 1">
        <div class="main">
            <div class="introduction">
                <div class="desc">
                    {{courseDetail.description ? courseDetail.description : "该课程暂无介绍  "}}
                </div>
                <div class="btn">
                    <button class="btn-item active" @click="goOrder(courseInfoArr)">立即购买</button>
                    <button class="btn-item"  @click="addCart()">加入购物车</button>
                </div>
            </div>
            <div class="video" v-for="(item,index) in courseChapters" :key="index">
                <div class="chapterName">{{item.chapterName}}</div>
                <div class="chapterDesc">{{item.description}}</div>
                <ul class="videos">
                    <li
                    class="video-item"
                    v-for="(j,k) in item.children"
                    :key="k"
                    @mouseenter="mourseHover(j)"
                    @mouseleave="mourseOut(j)">
                        <div class="video-itemIcon">
                            <i class="el-icon-video-camera"></i>
                        </div>

                        <div class="item-name">
                            <span class="shipin">视频：</span>
                            <span class="chapterName">{{j.chapterName}}</span>
                            <span class="free" v-if="j.publicType === 2">试看</span>
                        </div>
                        <button class="btn-learn" v-if="j.isShow" @click="goPlay(courseInfoArr.id,j.id,j.publicType)">
                        开始学习
                        </button>
                        <div class="clearfloat"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-else>
      <div v-if="downsource && downsource.length > 0" style="min-height: 500px">
        <div class="down" v-for="(x,y) in downsource" :key="y">
            <div class="source"  >
              <span class="downloadCourse">{{x.attachmentName}}</span>
              <button class="downloadbtn" @click="downloadSource(x)">下载资料</button>
            </div>
        </div>
      </div>
      <div v-else>
        <el-empty
            image="/image/about/course-empt.png"
            description="该课程暂无资料"
        ></el-empty>
      </div>
    </div>
    <div class="download-icon" v-if="downloadMap && downloadMap.size > 0" @click="downloadDialog = true"></div>

    <el-dialog title="下载详情" :visible.sync="downloadDialog" width="500px">
        <div class="download">
            <el-table :data="Array.from(downloadMap.values())" style="width: 100%" border stripe>
                <el-table-column prop="attachmentName" label="资料名称">
                    <template slot-scope="scope">
                        <div class="">{{scope.row.attachmentName}}</div>
                        <div class="progress"><el-progress :width="30" :stroke-width="3" :show-text="false" :percentage="scope.row.progress"></el-progress></div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="downloadDialog = false">确定</el-button>
        </span>
    </el-dialog>
    
  </div>
</template>

<script>
import {
	getcourseInfo,
	downloadAttachment,
	checkAuth,
	checkAuthWithChapterId,
	playCourse,
} from '@/common/api/courseManage.js'
import { createToken } from '@/common/api/token.js'
import { addShopCar } from '@/common/api/shopcar.js'
import { getShopCarCounter } from '@/common/api/auth'
import { mapState, mapActions, mapMutations } from 'vuex'
import request from '@/common/api/requests.js'
import {Decrypt} from '@/utils/aes'

export default {
	data() {
		return {
			BASE_URL: process.env.VUE_APP_BASE_API,
			courseId: this.$route.params.courseId,
			courseInfoArr: {},
			courseDetail: {},
			courseChapters: {},
			downsource: [],
			token: '',
			memberId: '',
			tokens: '', //登录的token
			activeName: 'first',
			activeChange: 1,
			courseTeacher: {},
            downloadIndex: 0,
            downloadMap: new Map(),
            downloadDialog: false
		}
	},
	created() {
		this.tokens = localStorage.getItem('token')
		this.getcourseInfo()
		window.scroll(0, 0)
	},
	computed: {
		...mapState({
			userInfo: (state) => state.user.userInfo,
			isLogin: (state) => state.user.isLogin,
		}),
	},
	methods: {
		...mapActions(['saveCartNumAction']),
		...mapMutations(['saveLoginDialog']),
		//点击免费课或者会员课程进行搜索
		goCourseSearch(type) {
			localStorage.setItem('serarch:course:type', type)
			this.$router.push('/course')
		},
		//改变章节和资料的状态
		change1() {
			this.activeChange = 1
		},
		change2() {
			this.activeChange = 2
		},
		//跳转到订单页面
		goOrder(item) {
			if (!this.tokens) {
				this.$message({
					message: '请先登录才能购买哦',
					type: 'error',
				})
				this.$store.commit('saveLoginDialog', true)
			} else {
				let arr = new Array()
				arr.push({ number: 1, id: item.id })
				localStorage.setItem('selectedArr', JSON.stringify(arr))
				this.$router.push('/confirmOrder')
			}
		},
		//下载资料
		downloadSource(item) {
			if (!this.tokens) {
				this.$message({
					message: '请先登录才能才能下载资料哦',
					type: 'error',
				})
				this.$store.commit('saveLoginDialog', true)
				return
			} else {
				checkAuth(item.courseId).then((res) => {
					let hasAuth = res.data.data.hasAuth
					if (!hasAuth) {
						this.$message({
							message: '购买该课程后才能下载资料哦',
							type: 'error',
						})
						return
					} else {
                        this.$message({
							message: '正在下载，请稍后...',
							type: 'success',
						})
                        let that = this;
                        let courseId = item.courseId, attachmentId = item.id;
						request({
							url: '/api/course/downloadAttachment',
							method: 'GET',
							params: { courseId, attachmentId },
							responseType: 'blob',
							headers: {
								Authorization: Decrypt(
									localStorage.getItem('token')
								)
							},
							onDownloadProgress(progress) {
								let downProgress = Math.round((100 * progress.loaded) / progress.total) // progress对象中的loaded表示已经下载的数量，total表示总数量，这里计算出百分比
                                that.$nextTick(() => {
                                    that.downloadMap.set(item.id, {index: that.downloadIndex, id: item.id, attachmentName: item.attachmentName, progress: downProgress});
                                    console.log(that.downloadMap);
                                    that.downloadIndex += 1;
                                })
                            }
						}).then((res) => {
                            const blob = new Blob([res])
                            let fileName = item.attachmentName
                            let fileUrl = item.attachmentUrl
                            const extName = fileUrl.substring(
                                fileUrl.lastIndexOf('.')
                            )
                            fileName = fileName + extName
                            const link = document.createElement('a')
                            link.download = fileName
                            link.target = '_blank'
                            link.style.display = 'none'
                            link.href = URL.createObjectURL(blob)
                            document.body.appendChild(link)
                            link.click()
                            URL.revokeObjectURL(link.href)
                            document.body.removeChild(link)
						}).catch((e) => {
                            this.$message.error('该文件无法下载')
                        })
					}
				})
			}
		},
		//加入购物车
		addCart() {
			if (!this.tokens) {
				this.$message({
					message: '请先登录才能加入购物车哦',
					type: 'error',
				})
				this.$store.commit('saveLoginDialog', true)
				return
			}
			createToken().then((res) => {
				this.token = res.data.token
				this.memberId = this.userInfo.id
				addShopCar({
					courseId: this.courseId,
					memberId: this.memberId,
					token: this.token,
				}).then((res) => {
					if (res.meta.code === '200') {
						getShopCarCounter().then((res) => {
							if (res.meta.code == '200') {
								this.saveCartNumAction(res.data.counter)
							} else {
								this.$message({
									message: res.meta.msg,
									type: 'error',
								})
							}
						})
						this.$message({
							message: '恭喜你，加入购物车成功',
							type: 'success',
						})
					}
				})
			})
		},
		//获取课程详情
		getcourseInfo() {
			getcourseInfo(this.courseId).then((res) => {
				if (res.meta.code === '200') {
					this.courseInfoArr = res.data.data
					this.courseDetail = res.data.data.bizCourseDetail
					this.courseChapters = res.data.data.bizCourseChapters
					this.downsource = res.data.data.bizCourseAttachments
					this.courseTeacher = res.data.data.bizCourseTeacher
					switch (this.courseInfoArr.courseLevel) {
						case 1:
							this.courseInfoArr.courseLevel = '初级'
							break
						case 2:
							this.courseInfoArr.courseLevel = '中级'
							break
						case 3:
							this.courseInfoArr.courseLevel = '高级'
							break
						default:
							this.courseInfoArr.courseLevel = '零基础'
					}
				}
			})
		},
		// 课程分类，鼠标进入移出事件
		mourseHover(j) {
			j.isShow = true
		},
		mourseOut(j) {
			j.isShow = false
		},
		goPlay(courseId, chapterId, publicType) {
			if (!this.tokens) {
				this.$message({
					message: '请先登录才能学习该课程哦',
					type: 'error',
				})
				this.$store.commit('saveLoginDialog', true)
				return
			} else {
				checkAuthWithChapterId(courseId, chapterId).then((res) => {
					let hasAuth = res.data.data.hasAuth
					if (hasAuth === false && publicType === 1) {
						this.$message({
							message: '购买该课程后才能开始学习哦',
							type: 'error',
						})

						return
					} else {
						this.$router.push({
							path: '/course-play/' + courseId + '/' + chapterId,
						})
					}
				})
			}
		},
	},
}
</script>

<style scoped>
.courseContainer {
	width: 100%;
	height: 100%;
	background: #f8fafc;
	overflow: hidden;
}
.main {
	margin: 40px auto;
	width: 1200px;
	height: 100%;
}
.courseInfoTop {
	width: 100%;
	height: 200px;
	background-image: url('/image/courseInfobg1920.png');
}
.nav-container {
	width: 1200px;
	margin: 0 auto;
	color: #333333;
	display: flex;
}
/* .chapter-item  .active{
    color: #388FFF;

} */
/* 背景部分开始 */
.courseInfoTop .info-container {
	margin: 0 auto;
	width: 1200px;
	height: 200px;
	color: #ffffff;
	z-index: 5;
}
.route {
	/*margin-left: 50px;*/
	padding-top: 20px;
	display: flex;
	font-size: 14px;
}
.route .route-item {
	margin-right: 10px;
}
.name {
	margin: 30px 0 10px 0px;
	font-size: 24px;
}
.info {
	display: flex;
	/*margin-left: 50px;*/
}
.info .Avat {
	width: 60px;
	height: 60px;
	border-radius: 50%;
}
.info .Avat img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.teacherName {
	margin: 8px 0 0 8px;
}
.name-item img {
	width: 14px;
	height: 14px;
}
.access {
	margin: 0 0 0 100px;
	display: flex;
}
.access .access-item {
	margin-right: 10px;
	line-height: 60px;
}
/* 背景部分结束 */

/* 导航栏开始 */
.info-nav {
	width: 100%;

	background: #ffffff;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.course {
	margin: 0 auto;
	width: 1200px;
}
.chapter {
	display: flex;
	font-weight: 600;
	color: #333333;
	margin-left: 50px;
	font-size: 20px;
}
.chapter-item {
	padding-bottom: 8px;
	font-size: 20px;
	font-weight: bold;
	line-height: 80px;
	margin-right: 70px;
	cursor: pointer;
	position: relative;
}
.chapter-item .active1 {
	color: #388fff;
}
.chapter-item .active2 {
	position: absolute;
	width: 70%;
	top: 63px;
	left: calc(30% / 2);
	height: 4px;
	background: #388fff;
	border-radius: 2px;
}

/* 导航栏结束 */
/* 课程介绍开始 */
.introduction {
	/*margin-left: 50px;*/
	/*padding: 20px;*/
	width: 1210px;
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.desc {
	padding: 20px;
	color: #474747;
	line-height: 35px;
}
.btn {
	float: right;
	margin-top: 10px;
	padding: 0 20px 20px;
}
.btn-item {
	width: 120px;
	height: 40px;
	/*margin: 0 20px 0 0;*/
	padding: 0px;
	border: 0px;
	outline: none;
	color: #f11d1d;
	border-radius: 23px;
	cursor: pointer;
}
.btn .active {
	background: #f11d1d !important;
	color: #ffffff;
	margin-right: 10px;
}
/* 课程介绍结束 */

/* 视频目录开始 */
.video {
	margin: 20px 0;
	padding: 20px;
	width: 1170px;
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.video .chapterName {
	font-weight: bold;
	font-size: 20px;
	color: #333333;
}
.video .free {
	padding-left: 20px;
	font-size: 14px;
	color: #388fff;
}
.chapterDesc {
	margin: 10px 0;
	font-size: 13px;
	color: #5c5c5c;
}
.video-item {
	height: 40px;
	line-height: 40px;
	padding: 5px 0;
	/*margin: 0 0 10px 0;*/
	border-radius: 8px;
}
.video-item:hover {
	cursor: pointer;
	background: rgba(53, 133, 255, 0.2);
	border-radius: 8px;
	color: #388fff !important;
}
.video-item .shipin {
	color: #333333;
	font-weight: bold;
}
.video-item .chapterName {
	font-size: 16px;
	font-weight: 400;
	color: #333333;
}
.video-itemIcon,
.item-name {
	float: left;
	padding-left: 10px;
}
.btn-learn {
	margin: 5px 5px 0 0;
	float: right;
	right: -100px;
	width: 80px;
	height: 30px;
	line-height: 30px;
	border: 0px;
	outline: none;
	color: #fff;
	background: #388fff;
	border-radius: 12px;
	cursor: pointer;
}
.clearfloat {
	clear: both;
}
/* 视频目录结束 */
.source {
	margin: 2px 0;
	padding: 5px;
	display: flex;
	justify-content: space-between;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.down {
	margin: 10px auto !important;
	width: 1200px;
	height: 100%;
	padding: 5px;
	background: #ffffff;
	box-sizing: border-box;
	border-radius: 8px;
}
.down:first-child {
	margin: 40px 0 5px 0;
}
.downloadbtn {
	width: 100px;
	height: 30px;
	line-height: 30px;
	background: #388fff;
	border: none;
	border-radius: 8px;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}

.download-icon{
    width: 64px;
    height: 64px;
    position: fixed;
    right: 0;
    border: #b4ffae solid 1px;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
    bottom: 200px;
    background: url('/image/download_icon.gif') center center no-repeat #d0ffcc;
}
</style>
