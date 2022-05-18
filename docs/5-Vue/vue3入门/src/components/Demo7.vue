<template>
  <!-- 可以有多个根对象 -->
  <div class="hello">一个根</div>
  <div class="hello">二个根</div>
</template>

<script lang="ts">
export default {
  name: "HelloWorld",
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
