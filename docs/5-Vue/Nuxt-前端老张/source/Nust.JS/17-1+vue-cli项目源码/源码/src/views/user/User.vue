<template>
  <div class="mine">
    <Header></Header>
    <div class="mine-container">
      <div class="mine-left">
        <div class="m-l-top">
          <div class="top-main">
            <img :src=" userInfo.avatar" alt="" v-if="userInfo.avatar" />
            <img :src="avatorImg" alt="" v-else>
            <p class="avator-name">{{userInfo.nickName ? userInfo.nickName : '小鹿线-默认'}}</p>
            <p class="avator-id">ID: {{userInfo.sysCode }}</p>
          </div>
        </div>
        <div class="m-l-t-center">
          <div class="center-main">
            <div class="m-l-t-c-title">账号管理</div>
          </div>
        </div>
        <div class="m-l-t-bottom">
          <div class="bottom-main">
            <div v-for="(item, index) in navList" :key="item.id" style="width: 100%;" @click="goChange(index)">
              <router-link :to="item.linkUrl">
                <div
                  class="user-list-item"
                  :class="navCurrent === index ? 'active' : ''"
                >
                  <p>{{ item.title }} <i class="el-icon-arrow-right"></i></p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mine-right">
        <router-view ></router-view>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Header from "@/components/index/header.vue";
import {Decrypt , Encrypt} from '@/utils/aes.js'
import {mapState} from 'vuex'
import Foot from '@/components/foot/foot.vue'
export default {
  data() {
    return {
      avatorImg: '/image/common/avator.png',
      nickName: '小鹿线-测试',
      id: 1,
      navList: [
        {
          id: 1,
          title: "账号信息",
          linkUrl: "/user/setbindsns",
        },
        {
          id: 2,
          title: "个人信息",
          linkUrl: "/user/setprofile",
        },
        {
          id: 3,
          title: "修改头像",
          linkUrl: "/user/setavator",
        },
      ],
      navCurrent: 0,
    };
  },
  computed:{
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  components: {
    Header,
    Foot
  },
  created() {
    // 获取当前路由信息 判断当前路由 是否 等于 选中路由
    let curpath = this.$route.path
    let curIndex = this.navList.findIndex(item=>{
      return item.linkUrl === curpath
    })
    this.navCurrent = curIndex


  },
  methods: {
    goChange(index){
      this.navCurrent = index
    }
  }
};
</script>

<style scoped>
.mine-container {
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  display: flex;
  /* background-color: red; */
}
.mine-left {
  width: 200px;
  height: 600px;
  background: rgba(249, 250, 252, 1);
  margin: 20px 0;
}
.m-l-top {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-main {
  width: 150px;
  height: 200px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #838383;
}
.top-main img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(249, 250, 252, 1);
  box-sizing: border-box;
}
.avator-name {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1c1f21;
  margin: 8px 0;
}
.m-l-t-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-main {
  width: 150px;
  height: 40px;
  display: flex;
  flex-direction: column;
}
.m-l-t-c-title {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #1c1f21;
  border-bottom: 1px solid rgba(112, 112, 112, 0.5);
}
.m-l-t-bottom {
  margin-top: 10px;
}
.bottom-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom-main .user-list-item {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #707070;
}
.el-icon-arrow-right {
  margin-left: 60px;
}
.bottom-main .active {
  background: rgba(101, 142, 255, 1);
  color: #fff;
}
.mine-right {
  flex: 1;
  height: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}
</style>
