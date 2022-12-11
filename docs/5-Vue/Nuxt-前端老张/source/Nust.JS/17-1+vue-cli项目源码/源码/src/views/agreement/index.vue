<template>
  <div class="course">
    <indexHeader></indexHeader>
    <div class="container">
      <h1>{{datas.title}}</h1>
      <div class="content" v-html="datas.content">
      </div>
    </div>
    <foot :webconfig="webconfig"></foot>
  </div>

</template>

<script>
import indexHeader from '@/components/index/header.vue';
import foot from '@/components/foot/foot.vue';
import {webConfig} from '@/common/api/webConfig.js'
import {getAgreementByCode} from '@/common/api/agreement'
export default {
  data(){
    return{
      webconfig:{},
      code:this.$route.query.code,
      datas:{}
    }
  },
  metaInfo() {
    return {
      title: this.webconfig.title, // set a title
      meta: [{ // set meta
        name: this.webconfig.keywords,
        content: this.webconfig.description
      }],
    }
  },
  created() {
    this.__init()
    this.token = localStorage.getItem('token')
    this.$store.commit('saveLoginDialog', false);
    this.getAgreementByCode()
  },
  methods: {
    async __init(){
      let res = await webConfig()
      this.webconfig = res.data.data
    },
    getAgreementByCode(){
      getAgreementByCode(this.code).then(res => {
        if(res.meta.code === '200'){
          this.datas = res.data.data
        }
      })
    }
  },
  components: {
    indexHeader,
    foot
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        let query = to.query;
        this.code = query.code;
        this.getAgreementByCode();
      },
    }
  }
};
</script>

<style scoped>
.container{
  width: 1200px;
  margin: 50px auto;
  min-height: 400px;
}
.container h1{
  color: #333;
  font-size: 24px;
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
}
.container .content{
  font-size: 14px;
  letter-spacing: 2px;
  border: #f2f2f2 solid 1px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #cccccc;
  padding: 10px;
  line-height: 25px;
}
</style>
