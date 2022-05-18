<template>
     <renderTest>

     </renderTest>
</template>

<script lang="ts">
import { defineComponent,h } from "vue";
export default defineComponent({
 //render函数里面的属性拍平了，不用通过on:{ click:function(){} }。
 //
  name: "HelloWorld",
  components:{
    renderTest:{
      render(){
        return h('div',{ onClick:()=>{ alert('click'); } },'test')
      }
    }
  }
});
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
