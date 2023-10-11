<template>
  <div class="home">
    <h2>Home Page</h2>
    <!-- 1.使用state时, 是需要state.moduleName.xxx -->
    <h2>Counter模块的counter: {{ $store.state.counterModule.count }}</h2>
    <!-- 2.使用getters时, 使用getters['moduleName/xxxx'] -->
    <h2>Counter模块的doubleCounter: {{ $store.getters['counterModule/doubleCount'] }}</h2>

    <button @click="incrementCount">count模块+1</button>
  </div>
</template>

<script>
</script>

<script setup>

  import { useStore } from 'vuex'

  // 告诉Vuex发起网络请求
  const store = useStore()
  // 派发事件时, 需要跟模块名称,'moduleName/xxxx'
  // 提交mutation时, 需要跟模块名称,'moduleName/xxxx'
 
  function incrementCount() {
    store.dispatch("counterModule/incrementCountAction")
  }

  

</script>


<style scoped>
</style>

