<template>
  <div class="appheader">
    <h2>AppHeader: {{ message }}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref("哈哈哈")
</script>

<style>
.appheader {
  color: red;
}
</style>
