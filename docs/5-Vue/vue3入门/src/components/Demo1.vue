<template>
  <div class="hello">
    <span
      style="margin-right:10px;"
      v-for="(item,index) in list"
      :key="index"
      @click="selectMethods(index)"
    >{{item}}</span>
    <div>当前：{{currentMan}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
//使用setup方法
//使用ref方法
//使用ref在方法内部使用时，需要用.value
export default defineComponent({
  name: "HelloWorld",
  setup() {
    let list = ref(["小红", "小白", "小黑"]);
    let currentMan = ref("");
    let selectMethods = (index: number) => {
      currentMan.value = list.value[index];
    };
    return {
      list,
      selectMethods,
      currentMan
    };
  },
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
