<template>
    <div class="course">
        <indexHeader></indexHeader>
        <Layout></Layout>
        <foot :webconfig="webconfig"></foot>
    </div>
</template>


<script>
import indexHeader from '@/components/index/header.vue';
import Layout from '@/components/cart/layout.vue';
 import foot from '@/components/foot/foot.vue';
// import {webConfig} from '@/common/api/webConfig.js'

export default {
  data(){
    return{
      webconfig:{}
    }
  },
  metaInfo() {
    return {
      title: this.webconfig.title, // set a title
      meta: [{ // set meta
        name: this.webconfig.keywords,
        content: this.webconfig.description
      }]
    }
  },
  created() {
    // this.__init()
    this.token = localStorage.getItem('token')
  },
  methods: {
    // async __init(){
    //   let res = await webConfig()
    //   this.webconfig = res.data.data
    // }
  },
  components: {
    indexHeader,
    Layout,
     foot
  },
};
</script>
<style scoped>

</style>
