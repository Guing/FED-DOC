<template>
    <div class="courseplay">
        <router-view></router-view>
       <!--  <indexHeader></indexHeader> -->
        <coursePlayMain></coursePlayMain>
        <Foot :webconfig='webconfig'></Foot>

    </div>
</template>


<script>
import indexHeader from '@/components/index/header.vue';
import Foot from '@/components/foot/foot.vue';
import coursePlayMain from '@/components/course/coursePlayMain.vue'
import {webConfig} from '@/common/api/webConfig.js'

export default {
    data(){
        return{
            webconfig:{}
        }
    },
    beforeCreate(){
        document.documentElement.scrollTop = 0;
    },
  metaInfo: {
    title: '鹿线课堂',
    meta: [
      {
        name: 'keyWords',
        content: 'My Example App',
      },
    ],
  },
  created() {
    this.__init()
  },
  methods: {
    async __init(){
      let res = await webConfig()
      this.webconfig = res.data.data
    }
  },
  components: {
    indexHeader,
    coursePlayMain,
    Foot
  },
};
</script>