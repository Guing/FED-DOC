<template>
  <div @click="updateData">{{modelValue}}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  //在 Vue 2 中,v-model和.sync功能差不多，但是语法上不一样，很容易混淆
  //在 Vue3 中，v-model的prop和事件默认名称更改为.sync形式的，并且子组件的model选项移除。
  //prop：value -> modelValue；
  //事件：input -> update:modelValue
  //可以在同一个组件上使用多个 v-model 绑定
  //比如想改变prop名，可以通过在父组件上，通过v-model:newName，并把子组件上的所有modelValue改成newName实例。
  name: "HelloWorld",
  props: ["modelValue"],
  methods: {
    updateData() {
      this.$emit("update:modelValue", "world");
    },
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
