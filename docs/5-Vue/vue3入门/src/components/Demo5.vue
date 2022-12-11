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
import { reactive, toRefs, watch } from "vue";

interface Data {
  list: string[];
  currentMan: string;
  selectMethods(index: number): void;
}

export default {
  name: "HelloWorld",
  setup() {
    const data: Data = reactive({
      list: ["小红", "小白", "小黑"],
      currentMan: "",
      selectMethods: (index: number) => {
        data.currentMan = data.list[index];
      },
    });
    const refData = toRefs(data);
    //export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);
    //ref对象
    //计算属性ref对象
    //返回一个函数
    watch(()=>data.currentMan, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });

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
