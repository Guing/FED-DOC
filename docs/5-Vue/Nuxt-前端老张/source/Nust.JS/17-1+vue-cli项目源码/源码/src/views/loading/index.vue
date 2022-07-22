<template>
  <div class="loading">
    <index-header></index-header>
    <div class="loading-container">
      <div class="loading-main">
        <img src="/image/loading.gif">
      </div>
    </div>
    <foot :webconfig="webconfig"></foot>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import foot from '@/components/foot/foot.vue';
import {
  getAccessToken
} from "@/common/api/auth";
import  {Encrypt,Decrypt} from '@/utils/aes.js';
export default {
  name: "index.vue",
  data(){
    return {
      webconfig:{}
    }
  },

  components:{
    indexHeader,
    foot
  },
  created() {
    // 解析地址后面路径
    this.goWeiLogin()
  },
  methods:{
    goWeiLogin(){
        if(this.$route.query.code && this.$route.query.logintype && this.$route.query.t){
          try{
            const code = Decrypt(this.$route.query.code)
            getAccessToken({
              code
            }).then(res=>{
              if(res.meta.code === '200'){

                this.$store.commit("saveLoginDialog", false);
                let accessToken = res.data.accessToken;
                // 存储到access中
                //
                localStorage.setItem("token", Encrypt(accessToken));
                localStorage.setItem("isLogin", JSON.stringify(true));
                 window.location.href = '/home'
                this.$message({
                  message: "登录成功，赶紧去学习吧！",
                  type: "success",
                });
              }else {

                this.$message({
                  message: res.meta.msg,
                  type: "warning",
                });
              }
            })
          }catch (e) {

          }
        }else{

        }
    },
  }
}
</script>

<style scoped>
.loading-container {
  min-height: 700px;
  position: relative;
}
.loading-main {
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
</style>
