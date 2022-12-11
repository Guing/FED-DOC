<template>
 
</template>

<script lang="ts">
//在 Vue 3 中，全局和内部 API 都经过了重构，并考虑到了 tree-shaking 的支持。 
//比如nextTick
import { nextTick } from 'vue'
export default {
  name: "HelloWorld",
  created(){
     nextTick(()=>{
        console.log('div');
     })
  }

};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
