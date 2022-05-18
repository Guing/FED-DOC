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
import { reactive, toRefs, onRenderTracked,onRenderTriggered } from "vue";

interface Data {
  list: string[];
  currentMan: string;
  selectMethods(index: number): void;
}

//onRenderTracked：
//状态跟踪，它会跟踪页面上所有响应式变量和方法的状态，也就是我们用return返回去的值，他都会跟踪。
//只要页面有update的情况，他就会跟踪，然后生成一个event对象，我们通过event对象来查找程序的问题所在。

//onRenderTriggered：
//状态触发，它不会跟踪每一个值，而是给你变化值的信息，并且新值和旧值都会给你明确的展示出来。
export default {
  name: "HelloWorld",
  setup() {
    console.log("setup");
    const data: Data = reactive({
      list: ["小红", "小白", "小黑"],
      currentMan: "",
      selectMethods: (index: number) => {
        data.currentMan = data.list[index];
      },
    });
    // onRenderTracked((event) => {
    //   console.log("状态跟踪组件----------->");
    //   console.log(event);
    // });
     onRenderTriggered((event) => {
      console.log("状态触发组件----------->");
      console.log(event);
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
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
