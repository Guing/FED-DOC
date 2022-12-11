<template>
  <div class="hello">
    <!-- 传送门组件，可以指定在挂载哪个元素下 -->
     <teleport to="body">
          <div>
            我在body里面，不在hello里面
          </div>
     </teleport>
  </div>
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
