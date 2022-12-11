<template>
    <div class="courseinfo"> 
        <indexHeader></indexHeader>
        <courseInfoContainer></courseInfoContainer>
        <Foot></Foot>
    </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import Foot from '@/components/foot/foot.vue';
import courseInfoContainer from '@/components/course/courseInfoContainer.vue'
import {webConfig} from '@/common/api/webConfig.js'
export default {
  data(){
   return{}
  },
  created() {
    this.__init()
  },
  methods: {
    async __init(){
    }
  },
  components: {
    indexHeader,
    courseInfoContainer,
    Foot
  },
};
</script>
