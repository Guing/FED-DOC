<template>

  <Demo v-model="msg" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Demo from './components/Demo13-todolist.vue';

export default defineComponent({
  name: 'App',
  data(){
    return {
      msg:'hello'
    }
  },
  components: {
    Demo
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
