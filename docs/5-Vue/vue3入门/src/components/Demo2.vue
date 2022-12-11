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
import { reactive, toRefs } from "vue";

interface Data {
  list: string[];
  currentMan: string;
  selectMethods(index: number): void;
}

//使用reactive方法
//使用...扩展运算符之后,因为结构后就变成了普通变量，不再具有响应式的能力
//引入toRefs就可以对data进行包装，把 data 变成refData,这样就可以使用扩展运算符的方式了。
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
