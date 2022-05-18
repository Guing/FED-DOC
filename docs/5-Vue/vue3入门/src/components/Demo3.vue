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
import { reactive, toRefs ,onBeforeMount } from "vue";

interface Data {
  list: string[];
  currentMan: string;
  selectMethods(index: number): void;
}

// setup() :开始创建组件之前，在beforeCreate和created之前执行。创建的是data和method
// onBeforeMount() : 组件挂载到节点上之前执行的函数。
// onMounted() : 组件挂载完成后执行的函数。
// onBeforeUpdate(): 组件更新之前执行的函数。
// onUpdated(): 组件更新完成之后执行的函数。
// onBeforeUnmount(): 组件卸载之前执行的函数。
// onUnmounted(): 组件卸载完成后执行的函数
// onActivated(): 被包含在<keep-alive>中的组件，会多出两个生命周期钩子函数。被激活时执行。
// onDeactivated(): 比如从 A 组件，切换到 B 组件，A 组件消失时执行。
// onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数（以后用到再讲，不好展现）。
export default {
  name: "HelloWorld",
  setup() {
    console.log('setup');
    const data: Data = reactive({
      list: ["小红", "小白", "小黑"],
      currentMan: "",
      selectMethods: (index: number) => {
        data.currentMan = data.list[index];
      },
    });
    onBeforeMount(()=>{
       console.log('onBeforeMount');
    })
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
