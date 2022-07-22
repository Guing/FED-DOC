<template>
  <!-- 首页导航和轮播组件 -->
  <div class="navSwiper">
    <div class="navSwiperContent">
      <div class="navigation">
        <ul>
          <li v-for="(item, index) in categorys" :key="item.id" @mouseenter="mourseHover(item,index)"
              @mouseleave="mourseOut(index)">
            <router-link to="/" :title="item.categoryName"> {{ item.categoryName }} <i class="el-icon-arrow-right"></i>
            </router-link>
            <div class="category-detail" v-if="categorysDetail[index]">
              <div class="detail-main">
                <div class="detail-desc">基础知识</div>
                <div class="detail-list">
                  <div class="list-know" v-if="tagarr.length > 0">知识点:</div>
                  <div class="list-ul">
                    <a href="javascript:;" @click="goDetail(item.tagName)" class="list-item"
                       v-for="(item,index) in tagarr" :key="index">{{ item.tagName }}</a>
                  </div>
                </div>
                <div class="detail-class">
                  <div class="course-card" v-for="(item,index) in arrcourse" :key="index">
                    <div class="course-image" @click="goCourseInfo(item)">
                      <img :src="item.courseCover" alt="">
                    </div>
                    <div class="right">
                      <div class="courseName">{{ item.courseName }}</div>
                      <div class="courseDegree">{{ item.courseLevel }} ·
                        {{ item.purchaseCounter + item.purchaseCnt }}人购买
                      </div>
                      <div class="buy">
                        <div class="buy-free">
                          <div class="coursePriceZero" v-if="item.discountPrice == 0">
                            <div class="learn">免费学习</div>
                            <img src="../../assets/image/about/free.png" alt="">
                          </div>
                          <div class="coursePrice" v-else-if="item.isMember == 1">
                            <div class="courseMemberbg"><span class="courseMember">会员专享</span></div>
                            <div class="price">¥{{ item.discountPrice }}</div>
                          </div>
                          <div class="coursePricePri" v-else>
                            <div class="pricePri">¥{{ item.discountPrice }}</div>
                          </div>
                        </div>
                        <div class="car" @click="addCart(item)">
                          <div class="cart-image">
                            <img src="/image/cart16.png" alt="">
                          </div>
                          <span class="addcart">加入购物车</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- <li>
            <router-link to="/course" title="全部课程" > 全部课程 </router-link>
          </li> -->
        </ul>
      </div>
      <div class="sliders">
        <el-carousel height="460px">
          <el-carousel-item v-for="item in sliders" :key="item.id">
            <router-link :to="item.pcHref">
              <img :src="item.imageUrl" :title="item.imageName" class="sliders-item-image"/>
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 课程分类开始 -->
    <courseType></courseType>
    <!-- 课程分类结束 -->
  </div>
</template>

<script>
import { queryCourse } from '@/common/api/courseManage.js';
import { queryCourseTag } from '@/common/api/courseTag.js';
import courseType from './courseType.vue';
import request from '../../common/api/requests';
import { addShopCar } from '@/common/api/shopcar.js';
import { createToken } from '@/common/api/token.js';
import { getShopCarCounter } from '@/common/api/auth';
import { mapState, mapActions, mapMutations } from 'vuex';
import { Encrypt } from '@/utils/aes';

export default {
  data() {
    return {
      msg: '首页导航和轮播组件',
      categorys: [],
      categorysDetail: [],
      sliders: [],
      arrcourse: [],//课程信息
      tagarr: [],//标签数组
      querycourse: {
        pageNum: 1,
        pageSize: 4,
        entity: {
          firstCategory: ''
        }
      },
      token: '',
      tokens: ''


    };
  },
  created() {
    this.tokens = localStorage.getItem('token');
    this.getFirstCategory();
    this.getSliders();
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
    goCourseInfo(item) {
      this.$router.push('/course-info/' + item.id);
    },
    goDetail(tagName) {
      let tag = encodeURI(tagName);
      this.$router.push('/course?tagName=' + tag);
    },
    //加入购物车
    addCart(item) {
      if (!this.tokens) {
        this.$message({
          message: '请先登录才能加入购物车哦',
          type: 'error'
        });
        this.$store.commit('saveLoginDialog', true);
        return;
      }
      createToken()
          .then(res => {
            this.token = res.data.token;
            this.memberId = this.userInfo.id;
            addShopCar({
              courseId: item.id,
              memberId: this.memberId,
              token: this.token
            })
                .then(res => {
                  if (res.meta.code === '200') {
                    getShopCarCounter()
                        .then((res) => {
                          if (res.meta.code == '200') {
                            this.saveCartNumAction(res.data.counter);
                          } else {
                            this.$message({
                              message: res.meta.msg,
                              type: 'error',
                            });
                          }
                        });
                    this.$message({
                      message: '恭喜你，加入购物车成功',
                      type: 'success'
                    });
                  } else if (res.meta.code === '20003') {
                    this.$message({
                      message: '该商品已在购物车，请勿重复添加',
                      type: 'error'
                    });
                  }
                });
          });

    },
    // 课程分类，鼠标进入移出事件
    mourseHover(item, index) {
      this.$set(this.categorysDetail, index, true);
      this.querycourse.entity.firstCategory = item.id;
      this.queryCourseTag();
      this.queryCourse();
    },
    mourseOut(index) {
      this.$set(this.categorysDetail, index, false);
    },
    // 获取课程一级分类
    async getFirstCategory() {
      let res = await request({
        url: '/api/course/category/getFirstCategorys',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          // "Content-Type":"application/x-www-form-urlencoded"
        },
      });
      this.categorys = res.data.list;
      this.categorysDetail = new Array(this.categorys.length);
      for (let i = 0; i < this.categorysDetail.length; i++) {
        this.categorysDetail[i] = false;
      }
    },
    // 获取轮播图
    async getSliders() {
      let res = await request({
        url: '/api/slider/getSliders',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          // "Content-Type":"application/x-www-form-urlencoded"
        },
      });
      this.sliders = res.data.list;
    },
    //查询课程
    queryCourse() {
      queryCourse(this.querycourse)
          .then(res => {
            this.arrcourse = res.data.pageInfo.list;
            this.arrcourse.forEach(item => {
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
          });
    },
    //获取课程标签
    queryCourseTag() {
      queryCourseTag(this.querycourse)
          .then(res => {
            this.tagarr = res.data.pageInfo.list;
          });
    }

  },
  components: {
    courseType,
  },
};
</script>

<style scoped>
.navSwiper {
  padding-top: 1px;
  width: 100%;
  height: 640px;
  background: url(/image/transitionbg.png);
}

.navSwiperContent {
  width: 1200px;
  height: 460px;
  margin: 35px auto 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  display: flex;
}

.navigation {
  width: 240px;
  height: 460px;
  background: #2b283d;
  position: relative;
}

.navigation ul {
  margin: 20px 0;
}

.navigation ul li {
  height: 40px;
  list-style: none;
  margin-bottom: 5px;
}

.navigation ul li a i {
  line-height: 40px;
  float: right;
}

.navigation ul li a {
  color: #ffffff;
  text-decoration: none;
  height: 40px;
  padding: 0 20px;
  line-height: 40px;
  display: block;
  font-size: 16px;
  font-weight: bold;
}

.navigation ul li a:hover {
  background: linear-gradient(to right, #3fe5ff, transparent);
}

.category-detail {
  position: absolute;
  top: 0;
  left: 220px;
  background: rgba(255, 255, 255);
  z-index: 65535;
  min-width: 800px;
  height: 460px;
  /* height: 100%; */
  border-top-right-radius: 10px;
  /* border-bottom-right-radius: 10px; */
  box-sizing: border-box;
}

.sliders {
  width: 1060px;
  height: 460px;
}

.sliders-item-image {
  width: 100%;
  height: 100%;
}

/* 分类详情 */
.detail-main {
  cursor: pointer;
  height: 100%;
  /* margin: 0 10px; */
  position: relative;
}

.detail-list {
  width: 100%;
  display: flex;
  margin-top: 10px;
  padding-left: 20px;
  color: #333333;
  font-weight: 400;
  font-size: 14px;
}

.detail-desc {
  padding-top: 20px;
  padding-left: 20px;
  height: 26px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  opacity: 1;
}

.list-know {
  width: 70px;
  height: 30px;
  line-height: 30px;
}

.list-ul {
  width: calc(100% - 70px);
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  line-height: 30px !important;
  padding: 0 10px !important;
  color: #333333 !important;
  font-size: 14px !important;
  font-weight: unset !important;
}

.list-item:hover {
  background: unset !important;
  color: #00ffff;
}

/* 分类详情结束 */
/* 下侧课程开始 */
.detail-class {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* width: 700px; */
  width: 100%;
  /* height: 250px; */
  height: 270px;
  padding: 20px 20px;
  /* margin-top: 30px; */
  background-color: #F3F5F6;
  box-sizing: border-box;
}

.course-card {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  width: 370px;
  height: 110px;
  box-sizing: border-box;
  /*background: red;*/
  /* border-radius: 10px; */
}

.course-image {
  /*position: relative;*/
  width: 100%;
  height: 90px;
  cursor: pointer;
}

.course-image img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.right {
  /*margin-left:6px;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  padding: 5px;
  box-sizing: border-box;
}

.courseName {
  width: 100%;
  /*height: 100%;*/
  /*margin: 20px 0 0 5px;*/
  font-weight: bold;
  font-size: 12px;
  color: #333333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.courseDegree {
  /*margin: 30px 0 0 5px;*/
  font-size: 12px;
  color: #808080;
}

.coursePrice {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.coursePriceZero {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pricePri {
  font-size: 12px;
}

.price {
  margin-left: 5px;
  color: red;
}

.courseMember {
  /*color: red;*/
  color: #FFFFFF;
  padding: 2px;
  box-sizing: border-box;
  background: red;
  border-radius: 6px;
}

.coursePricePri {
  font-size: 12px;
}

.buy {
  width: 200px;
  display: flex;
  /*margin: 30px 0 0 5px;*/
  justify-content: space-between;
  box-sizing: border-box;
}

.buy-free {
  display: flex;
  align-items: center;
}

.buy-free img {
  width: 12px;
  height: 12px;
  margin-left: 10px;
}

.buy .learn {
  color: #3586FF;
  font-size: 12px;
}

.buy .car {
  display: flex;
  margin-right: 5px;
  font-size: 12px;
}

.buy .addcart {
  margin-left: 2px;
  color: #FF3D17;
  font-size: 12px;
  cursor: pointer;
}

/* 下侧课程结束 */
</style>
