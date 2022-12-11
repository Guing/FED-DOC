<template>
    <div class="agreement">
        <indexHeader></indexHeader>
        <!-- <courseDirection></courseDirection> -->
        <coursemain></coursemain>
        <foot :webconfig="webconfig"></foot>
    </div>

</template>

<script>
import indexHeader from '@/components/index/header.vue';
import coursemain from '@/components/course/coursemain.vue';
import foot from '@/components/foot/foot.vue';
import {webConfig} from '@/common/api/webConfig.js'

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
    this.__init()
    this.token = localStorage.getItem('token')
  },
  methods: {
    async __init(){
      let res = await webConfig()
      this.webconfig = res.data.data
    }
  },
  components: {
    indexHeader,
    coursemain,
    foot
  },
};
</script>

<style scoped>

</style>
