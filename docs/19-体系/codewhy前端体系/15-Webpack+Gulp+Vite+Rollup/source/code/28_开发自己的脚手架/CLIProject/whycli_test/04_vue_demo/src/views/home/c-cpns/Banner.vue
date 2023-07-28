<template>
  <div class="banner">
    <h2>Banner: {{ message }}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref("哈哈哈")
</script>

<style>
.banner {
  color: red;
}
</style>
