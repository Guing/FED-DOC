<template>
  <div class="about">
    <Header></Header>
    <div class="about-containe">
      <div class="about-banner">
        <div class="banner-main">
          <div class="banner-content">
            <div class="banner-left">
              <img
                  class="banner-avator"
                  :src="userInfo.avatar"
                  alt=""
                  v-if="userInfo.avatar"
              />
              <img
                  class="banner-avator"
                  :src="avatar"
                  alt=""
                  v-else
              />
              <div class="banner-my">
                <div class="banner-name">{{ userInfo.nickName ? userInfo.nickName : '小鹿线-默认' }}</div>
                <div class="banner-introduce">
                  <p>{{ userInfo && userInfo.gender == 1 ? "男" : "女" }}</p>
                  <p>
                    {{ userInfo && userInfo.city ? userInfo.city : "北京" }}
                  </p>
                  <p>web前端工程师</p>
                </div>
                <div class="banner-autograph">
                  这位同学很神秘，没有留下个性签名
                </div>
              </div>
            </div>
            <div class="banner-right">
              <div class="banner-study">学习时长
                <span>{{ userInfo.totalHour ? parseFloat(userInfo.totalHour / 360).toFixed(2) + 'h' : '0h' }}</span>
              </div>
              <div class="banner-setting" @click="goMine">
                <img src="/image/about/setting.png" alt=""/>
                <p>个人设置</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-container">
        <div class="about-left">
          <div class="about-list">
            <div
                v-for="(item, index) in aboutList"
                :key="item.id"
                @click="geDetail(index)"
            >
              <router-link :to="item.link">
                <div
                    class="about-list-item"
                    :class="current === index ? 'active' : ''"
                >
                  <img
                      :src="current === index ? item.selectImg : item.imgUrl"
                      alt=""
                  />
                  <p class="list-title">{{ item.title }}</p>
                </div>
              </router-link>

            </div>
            <div class="code-container" @click="dialogVisible = true">
              <i class="fa fa-gift code" aria-hidden="true"></i>
              <span >兑换码</span>
            </div>

          </div>
        </div>
        <div class="about-right">
          <router-view></router-view>
        </div>

        <!--兑换码弹出框-->
        <div :visible="dialogVisible" v-if="dialogVisible === true" >
          {{ dialogVisible }}
          <div class="mask" v-if="dialogVisible === true">
            <div class="mask-container" >
                <div class="cancel" @click="dialogVisible = false">
                  <img src="/image/cancel.png">
                </div>
                <div class="title">
                  <div>输入兑换码</div>
                  <div>获得超多福利</div>
                </div>
                <div class="alert">在下列输入兑换码</div>
                <div class="bg">
                  <img src="/image/duihuanma.png" alt="">
                </div>
                <div class="inputs">
                  <input ref="inputCode" class="input" type="text" placeholder="请输入正确兑换码"></input>
                </div>
                <div class="confirm">
                  <img src="/image/confirm.png">
                  <div class="noConfirm" @click="confirmExchange">立即确认</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import Header from "@/components/index/header.vue";
import {mapState} from "vuex";
import foot from '@/components/foot/foot.vue';
import {webConfig} from '@/common/api/webConfig.js'
import {doExchange} from '@/common/api/vip.js'
import {createToken} from '@/common/api/token.js'

export default {
  name: "About",
  data() {
    return {
      tokens:'',
      dialogVisible:false,
      clientHeight: 0,
      avatar: '/image/common/avator.png',
      webconfig: {},
      aboutList: [
        {
          id: 1,
          imgUrl: "/image/about/my-course.png",
          selectImg: "/image/about/my-course-select.png",
          title: "我的课程",
          link: "/about/my-course",
        },
        {
          id: 2,
          imgUrl: "/image/about/collean.png",
          selectImg: "/image/about/collean-select.png",
          title: "收藏",
          link: "/about/collean",
        },
        {
          id: 3,
          imgUrl: "/image/about/order.png",
          selectImg: "/image/about/order-select.png",
          title: "订单",
          link: "/about/order",
        },
        {
          id: 4,
          imgUrl: "/image/about/mess.png",
          selectImg: "/image/about/mess-select.png",
          title: "消息",
          link: "/about/message",
        },
      ],
      current: 0,
      avatorImg: "/image/common/avator.png",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  mounted() {
  },
  components: {
    Header,
    foot,
  },
  created() {
    // 获取当前路由信息 判断当前路由 是否 等于 选中路由
    this.__init()
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        let curpath = to.path
        let curIndex = this.aboutList.findIndex(item => {
          return item.link === curpath
        })
        this.current = curIndex
      },
    },
  },

  methods: {
    //调用兑换码
    confirmExchange(){
      createToken().then(res => {
        this.tokens = res.data.token
        doExchange({exchangeCode:this.$refs.inputCode.value,token:this.tokens}).then(res => {
          if(res.meta.code === '200'){
            this.$message({
              type:'success',
              message:'恭喜您，兑换成功'
            })
          }else if(res.meta.code === '500'){
            this.$message({
              type:'error',
              message:res.meta.msg
            })
          }
          this.$router.go(0)
          this.dialogVisible = false
        })
      })
    },
    //兑换码状态
    changeDialog(){
      this.dialogVisible = true
    },
    async __init() {
      let res = await webConfig()
      this.webconfig = res.data.data
    },
    geDetail(index) {
      this.current = index;
      // sessionStorage.setItem('current',JSON.stringify(index))
    },
    goMine() {
      this.$router.push("/user");
    },
  },
};
</script>

<style scoped>
/*蒙层*/
.mask{
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: (0,0,0,.5);
  z-index: 999;
}
.mask-container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 500px;
  margin: 0 auto ;
}
.bg{
  position: relative;
  margin: 0 auto;
  width: 400px;
  height: 400px;
}
.bg img{
  width: 100%;
  height: 100%;
}
.inputs{
  position: absolute;
  top: 181px;
  left: 85px;
  width: 310px;
  height: 109px;
}
.input{
  width: 100%;
  height: 100%;
  line-height: 103px;
  font-size: 16px;
  outline:none;
  color: #000;
  letter-spacing: 1px;
  border:none;
}
input:focus{
  border:none;
}
.title{
  position: absolute;
  top: 22px;
  left: 86px;
  width: 234px;
  height: 200px;
  font-size: 30px;
  line-height: 42px;
  color: #FF7D00;
  text-shadow:#FFF 3px 2px 1px;
  z-index: 5;
}
.cancel{
  width: 35px;
  height: 35px;
  position: absolute;
  top: -8px;
  left: 395px;
  z-index: 5;
  cursor: pointer;
}
.cancel img{
  width: 100%;
  height: 100%;
}
.confirm{
  position: absolute;
  top: 310px;
  left: 66px;
  margin: 0 auto;
  width: 349px;
  height: 65px;
  z-index: 5;
  cursor: pointer;

}
.confirm img{
  width: 100%;
  height: 100%;
}
.noConfirm{
  height: 65px;
  width: 100%;
  position: absolute;
  top: -3px;
  text-align: center;
  font-size: 24px;
  color: #FFEDD6;
  letter-spacing: 10px;
  line-height: 65px;
  z-index: 10;
}
.alert{
  position: absolute;
  top: 122px;
  left: 86px;
  color: #FFE5C3;
  font-size: 17px;
  z-index: 5;
}
.code-container{
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 40px;
  cursor: pointer;
}
/*邀请码*/
.code{
  margin-right: 30px;
  color: #93999F;
  font-size: 24px;
}
.about-containe {
  display: flex;
  flex-direction: column;
}
.about-banner {
  background: url("/image/about/about-banner.png") no-repeat 0 0;
  box-sizing: border-box;
  height: 200px;
  margin-bottom: 30px;
}

.banner-main {
  position: relative;
  width: 100%;
  height: 185px;
}

.banner-content {
  width: 1200px;
  height: 170px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.banner-left {
  width: 600px;
  height: 170px;
  display: flex;
  align-items: center;
}

.banner-avator {
  width: 177px;
  height: 177px;
  border: 5px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 20px;
}

.banner-my {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  left: 220px;
  bottom: 0;
  color: #ffffff;
  font-size: 16px;
  font-family: Microsoft YaHei;
}

.banner-name {
  font-size: 32px;
  font-weight: bold;
}

.banner-introduce {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.banner-autograph {
  font-size: 14px;
}

.banner-right {
  width: 400px;
  height: 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #ffffff;
}

.banner-study span {
  font-size: 32px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  margin-left: 5px;
}

.banner-setting {
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.banner-setting img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}


.about-container {
  width: 1200px;
  flex:1;
  display: flex;
  overflow: hidden;
  margin:0 auto;
}

.about-left {
  width: 200px;
}
.about-list{
  width: 200px;
}
.about-list .about-list-item {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 60px;
  border-radius: 5px;
  cursor: pointer;
}

.about-list .active {
  background: rgba(52, 131, 255, 0.3);
  color: #3483ff;
}

.about-list .about-list-item img {
  width: 18px;
  height: 20px;
}

.list-title {
  width: 100px;
  text-align: center;
}

.about-right {
  flex: 1;
}

</style>
