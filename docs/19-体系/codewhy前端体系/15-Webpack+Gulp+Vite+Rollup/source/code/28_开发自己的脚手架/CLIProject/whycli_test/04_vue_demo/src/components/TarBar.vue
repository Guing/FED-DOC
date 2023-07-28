<template>
  <div class="tarbar">
    <h2>TarBar: {{ message }}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref("哈哈哈")
</script>

<style>
.tarbar {
  color: red;
}
</style>
