<template>
  <div @click="$emit('my-click',{flag:true})">检验</div>
</template>

<script lang="ts">
export default {
  name: "HelloWorld",
  //vue3移除了.native 修饰符,为了指示组件更好地识别自定义事件，使用emits
  //emits的字符串数组
  // emits:['my-click']
  //emits的对象形式，可以用检验参数,验证函数应返回布尔值，以表示事件参数是否有效。
  emits: {
    "my-click": (payload: any) => {
      if (payload.flag) {
        return true;
      } else {
        return false;
      }
    },
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
