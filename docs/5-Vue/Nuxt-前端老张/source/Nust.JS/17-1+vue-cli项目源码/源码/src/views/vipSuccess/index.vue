<template>
  <div class="vipSuccess">
    <indexHeader></indexHeader>
    <div class="container">
      <div class="vipImg">
        <img src="/image/bigVip.png">
      </div>
      <p class="alert">恭喜您！您已经成为<span class="vipDegree">初级VIP</span>会员</p>
      <div class="btns">
        <div class="home" @click="goHome">去首页学习</div>
        <div class="member" @click="goMember">返回会员中心</div>
      </div>
      <p class="footAlert">温馨提示：若充值成功无法观看对应VIP教学视频，请退出账号重新登录。</p>
    </div>
    <div class="footer">
      <img src="/image/memberFooter.png">
    </div>
  </div>

</template>

<script>
import indexHeader from '@/components/index/header.vue';


export default {
  data(){
    return{

    }
  },
  methods: {
    goHome(){
      this.$router.push('/home')
    },
    goMember(){
      this.$router.push('/member')
    }
  },
  components: {
    indexHeader,

  }
}
</script>

<style scoped>
.vipSuccess{
  background: #F6F6F6;
}
.container{
  width: 1200px;
  height: 470px;
  margin: 100px auto;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
}
.vipImg{
  width: 155px;
  height: 70px;
  margin: 0 auto;
  padding-top: 50px;
}
.vipImg img{
  width: 100%;
  height: 100%;
}
.alert{
  margin: 50px 0;
  font-size: 20px;
  color: #716866;
  text-align: center;
}
.vipDegree{
  font-size: 20px;
  color: #FF4E2C;
}
.btns{
  display: flex;
  justify-content: center;
}
.home{
  width: 151px;
  height: 51px;
  background: linear-gradient(90deg, #3BD2FF 0%, #3585FF 100%);
  border-radius: 4px;
  color: #FFF;
  line-height: 51px;
  text-align: center;
  cursor: pointer;
}
.member{
  margin-left: 50px;
  width: 149px;
  height: 51px;
  background: rgba(54,137,255,.22);
  color: #3692FF;
  line-height: 51px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
}
.footAlert{
  text-align: center;
  margin-top: 50px;
  font-size: 14px;
  color: #9B9B9B;
}
.footer{
  width: 100%;
  height: 100px;
}
.footer img{
  width: 100%;
  height: 100%;
}
</style>
