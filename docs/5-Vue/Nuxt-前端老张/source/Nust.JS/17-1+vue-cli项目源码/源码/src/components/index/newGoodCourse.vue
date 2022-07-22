<template>
<div class="layout">
    <div class="course-list-container">
        <!-- 新上好课标题开始 -->
        <h1 class="contentTitle">
            <div class="contentTitle-left">
                <div class="hot">
                    <div class="hot-left">HOT</div>
                    <div class="hot-right"></div>
                </div>
                <div class="txt">
                    <div class="txt-top">新上好课</div>
                    <div class="txt-bottom"></div>
                </div>
            </div>
            <div class="more"  @click="goCourse()">更 多</div>
        </h1>
        <!-- 新上好课标题结束 -->
        <!-- 新上好课内容开始 -->
        <div class="newCourseContent">
            <ul class="courseUl">
                <li class="courseItem" v-for="(item,index) in newCourses" :key="index" >
                    <div class="courseInfo">
                        <div class="memberlogo" v-if="item.isMember == 1 && item.discountPrice != 0">
                            <img src="../../assets/image/member/vipLogo.png" alt="">
                        </div>
                        <router-link :to="{path:'/course-info/' + item.id}">
                            <div class="courseBg">
                                <img class="courseImg" :src="item.courseCover" alt="">
                            </div>
                        </router-link>
                        <div class="courseName">{{item.courseName}}</div>
                        <div class="courseDegree">{{item.courseLevel}} · {{item.purchaseCounter + item.purchaseCnt}}人报名</div>

                        <div class="coursePriceZero" v-if="item.discountPrice == 0">
                            <div class="pricefree">免费学习</div>
                            <img src="../../assets/image/about/free.png" alt="">
                        </div>

                        <div class="coursePrice" v-else-if="item.isMember == 1">
                            <div class="courseMemberbg"><span class="courseMember">会员免费</span></div>
                            <div class="price">¥ {{item.discountPrice}}</div>
                        </div>
                        <div class="coursePricePri" v-else>
                            <div class="pricePri">¥ {{item.discountPrice}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 新上好课内容结束 -->
    </div>

    <div class="course-list-container">
        <!-- 推荐好课标题开始 -->
        <h1 class="contentTitle">
            <div class="contentTitle-left">
                <div class="hot">
                    <div class="hot-left">HOT</div>
                    <div class="hot-right"></div>
                </div>
                <div class="txt">
                    <div class="txt-top">推荐好课</div>
                    <div class="txt-bottom"></div>
                </div>
            </div>
            <div class="more" @click="goCourse()">更 多</div>

        </h1>
        <!-- 推荐好课标题结束 -->
        <div class="commendCourseContent">
            <div class="commendLeft">
                <img class="commendLeftimg" :src="imgUrl" alt="">
            </div>
            <ul class="courseUl">
                <li class="courseItem" v-for="(item,index) in hotCourse" :key="index">
                    <div class="courseInfo">
                        <div class="memberlogo" v-if="item.isMember == 1 && item.discountPrice != 0">
                            <img src="../../assets/image/member/vipLogo.png" alt="">
                        </div>
                        <router-link :to="{path:'/course-info/' + item.id}">
                            <div class="courseBg">
                                <img class="courseImg" :src="item.courseCover" alt="">
                            </div>
                        </router-link>
                        <div class="courseName">{{item.courseName}}</div>
                        <div class="courseDegree">{{item.courseLevel}} · {{item.purchaseCounter + item.purchaseCnt}}人报名</div>

                        <div class="coursePriceZero" v-if="item.discountPrice == 0">
                            <div class="pricefree">免费学习</div>
                            <img src="../../assets/image/about/free.png" alt="">
                        </div>

                        <div class="coursePrice" v-else-if="item.isMember == 1">
                            <div class="courseMemberbg"><span class="courseMember">会员免费</span></div>
                            <div class="price">¥ {{item.discountPrice}}</div>
                        </div>
                        <div class="coursePricePri" v-else>
                            <div class="pricePri">¥ {{item.discountPrice}}</div>
                        </div>
                    </div>

                </li>
            </ul>
        </div>
    </div>
    <div class="course-list-container">
        <!-- 都在看好书标题开始 -->
         <h1 class="contentTitle">
            <div class="txt">
                <div class="txt-top">都在看好书</div>
                <div class="txt-bottom"></div>
            </div>
        </h1>
        <!-- 都在看好书标题结束 -->
         <div class="book">
            <ul class="courseUl">
                <li class="goodBook" v-for="i in 4" :key="i">
                    <div class="goodBookInfo">
                        <div class="courseBg">
                            <img class="courseImg" :src="goodBook[i]" alt="">
                        </div>
                        <div class="courseName">
                            小鹿线，WEB前端开发书籍待上线...
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import {getHotCourse, getNewCourse} from '@/common/api/courseManage.js'
import {getImageByCode} from '@/common/api/picture.js'
import imgCode from '@/common/globalImages.js'
import {mapActions, mapMutations, mapState} from "vuex";

export default {
	data() {
		return {
            newCourses:[],//新上好课
            hotCourse:[],//推荐好课
            courseLevel:'',
            querynew:{
                pageNum: 1,
                pageSize: 8,
                entity: {}
            },
            queryhot:{
                pageNum: 1,
                pageSize: 6,
                entity: {}
            },
            token:'',
            imgUrl:'',
            tokens:'',
            goodBook:['/image/book1.png','/image/book2.png','/image/book3.png','/image/book4.png','/image/book5.png']

        }
	},
    created(){
        this.tokens = localStorage.getItem('token')
        this.getNewCourse()
        this.getHotCourse()
        this.getImageByCode()
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.user.userInfo,
            isLogin: (state) => state.user.isLogin,
        }),
    },
    methods:{
        ...mapActions(["saveCartNumAction"]),
        ...mapMutations(["saveLoginDialog"]),
        getImageByCode(){
            getImageByCode({imageCode:imgCode.global_commendcourse}).then(res => {
                //
                this.imgUrl = res.data.data.imageUrl;
            })
        },
        //获取最新课程
        getNewCourse(){
            getNewCourse(this.querynew).then(res => {
                if(res.meta.code = '200'){
                    this.newCourses = res.data.pageInfo.list
                    this.newCourses.forEach(item => {
                        switch(item.courseLevel){
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
                            item.courseLevel = ''
                        }
                    })
                }
            })
        },
        //获取推荐好课
        getHotCourse(){
            getHotCourse(this.queryhot).then(res => {
                if(res.meta.code = '200'){
                    this.hotCourse = res.data.pageInfo.list
                    this.hotCourse.forEach(item => {
                        switch(item.courseLevel){
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
                            item.courseLevel = ''
                        }
                    })
                }
            })
        },
        //跳转到课程页面
        goCourse(){
            this.$router.push('/course')
        },


    }
}
</script>

<style scoped>
.layout{
    width: 1200px;
    margin: 0 auto;
}
/* 新上好课开始 */
.course-list-container {
	margin-top: 15px;
}
.contentTitle{
    display: flex;
    justify-content: space-between;
}
.contentTitle-left{
    display: flex;
}
.course-list-container h1 {
	display: flex;
}

.course-list-container h1 .hot {
	display: flex;
	height: 38px;
}
.more{
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: #808080;
}
.course-list-container h1 .hot .hot-left {
	height: 38px;
	font-size: 20px;
    padding: 0 10px;
	text-align: center;
	line-height: 37px;
	color: #ffffff;
	border-radius: 8px 0 8px 8px;
	background: linear-gradient(90deg, #ff727f 0%, #fc685c 100%);
}
.course-list-container h1 .hot .hot-right {
	width: 0;
	height: 0;
	border: 6px solid #fc685c;
	border-right-color: transparent;
	border-bottom-color: transparent;
}
.course-list-container h1 .txt {
	position: relative;
	height: 38px;
	margin-left: 10px;
}
.course-list-container h1 .txt .txt-top {
	font-size: 24px;
    padding: 0 5px;
    color: #222222;
	line-height: 31px;
}
.course-list-container h1 .txt .txt-bottom {
	position: absolute;
	top: 25px;
	left: 0px;
	width: 100%;
	height: 13px;
	background: linear-gradient(90deg, #fbf84f 0%, #fea935 100%);
	border-radius: 7px;
	z-index: -1;
}
.newCourseContent {
	width: 1200px;
	margin: 15px auto 0px auto;
}
.newCourseContent .courseUl {
	display: flex;
	flex-wrap: wrap;
}
.newCourseContent .courseUl .courseItem {
	width: 285px;
	height: 280px;
	margin: 0 20px 20px 0;
    transition:margin-top 0.2s;
    -webkit-transition: margin-top 0.2s;
}
.newCourseContent .courseUl .courseItem:hover{
    margin-top: -10px;
    cursor: pointer;
}
.newCourseContent .courseUl .courseItem:nth-child(4n+0){
    margin-right: 0 !important;
}
/* 新上好课结束 */
/* 推荐好课开始 */
.commendCourseContent {
	width: 1200px;
	margin: 15px auto 0px auto;
    display: flex;
}
.commendCourseContent .commendLeft{
    width: 285px;
    height: 580px;
	  margin: 0 20px 20px 0;
    cursor: not-allowed;
}
.commendCourseContent .commendLeft img{
    width: 100%;
    height: 100%;
}
.commendCourseContent .courseUl {
    width: calc(100% - 285px);
	display: flex;
	flex-wrap: wrap;
}
.commendCourseContent .courseUl .courseItem {
	width: 285px;
	height: 280px;
	margin: 0 20px 20px 0;
    transition:margin-top 0.2s;
    -webkit-transition: margin-top 0.2s;
}
.commendCourseContent .courseUl .courseItem:hover{
    margin-top: -10px;
    cursor: pointer;
}
.commendCourseContent .courseUl .courseItem:nth-child(3n+0){
    margin-right: 0 !important;
}
/* 新上好课结束 */
.courseCard {
	width: 1200px;
	height: 600px;
	margin: 20px 0 0 0;
}
.courseInfo {
    position: relative;
	width: 100%;
	height: 270px;
	background: #ffffff;
	box-shadow: 1px 1px 10px rgba(27, 39, 94, 0.4);
	opacity: 1;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    overflow: hidden;
}
.memberlogo{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    margin: 5px 5px 0 0;
}
.memberlogo img{
    width: 40px;
    height: 20px;
}
.courseBg {
	position: relative;
	width: 100%;
	height: 160px;
}
.courseImg {
	width: 100%;
	height: 100%;
}
.courseDesc {
	position: absolute;
	top: 45px;
	left: 15px;
	font-size: 24px;
	color: #ffffff;
}
.courseName {
	margin: 10px;
	font-weight: bold;
	font-size: 14px;
	color: #333333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.courseDegree {
	margin-left: 10px;
	font-size: 12px;
	color: #808080;
}
.coursePrice {
	display: flex;
    justify-content: space-around;
    align-items: center;
    width: 130px;
	font-size: 14px;
	margin-top: 15px;
    padding: 0 5px;
}
.coursePricePri{
    width: 75px;
	font-size: 14px;
	margin-top: 18px;
    padding: 0 13px;
    color: rgba(255, 114, 127, 1);
    font-weight: 700;
}
.coursePriceZero{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75px;
	font-size: 14px;
	margin-top: 15px;
    padding: 0 10px;
    color: rgba(53, 134, 255, 1);
}
.courseMemberbg {
	position: relative;
	width: 80px;
	height: 20px;
	color: #ffffff;
	background: linear-gradient(90deg, #ff928e 0%, #fe7062 99%);
	border-radius: 24px 0px 24px 0px;
}
.courseMember {
	position: absolute;
	line-height: 20px;
	left: 13px;
    font-weight: 700;
}
.price {
	line-height: 25px;
	left: 100px;
	color: #ff727f;
    font-weight: 700;
}

/* 推荐好课结束 */

.book{
	margin: 20px 0;
}
.book .courseUl {
	display: flex;
	flex-wrap: wrap;
}
.book .courseUl .goodBook {
	width: 285px;
	height: 220px;
	margin: 0 20px 20px 0;
}
.book .courseUl .goodBook:nth-child(4n+0){
    margin-right: 0 !important;
}
.book .courseUl .goodBook:hover{
    cursor: pointer;
}
.goodBookInfo{
    width: 100%;
	height: 220px;
	background: #ffffff;
	box-shadow: 2px 4px 4px rgba(27, 39, 94, 0.1);
	opacity: 1;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}

/* 都在看好书结束 */

</style>
