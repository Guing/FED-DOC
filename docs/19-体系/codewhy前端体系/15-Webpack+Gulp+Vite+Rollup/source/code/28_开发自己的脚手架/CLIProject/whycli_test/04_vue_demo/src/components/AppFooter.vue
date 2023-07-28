<template>
  <div class="appfooter">
    <h2>AppFooter: {{ message }}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref("哈哈哈")
</script>

<style>
.appfooter {
  color: red;
}
</style>
