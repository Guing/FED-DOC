<template>
  <div class="app">
    <!-- store中的counter -->
    <h2>App当前计数: {{ $store.state.counter }}</h2>

    <!-- home页面 -->
    <hr />
    <home />
  </div>
</template>

<script setup>
//   import Home from './views/Home.vue'
import Home from "./views/11_核心五Modules-默认模块化.vue";
</script>

<style></style>
