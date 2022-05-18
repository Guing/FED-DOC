<template>
  <div class="homepage-container">
    <a-layout>
    
      <a-layout-content class="home-layout">
        <template-list :list="testData"></template-list>
      </a-layout-content>
    
    </a-layout>
  </div>
</template>
<script lang="ts">

  import TemplateList from '../components/TemplateList.vue'
  import {computed, defineComponent} from 'vue'
import { useStore } from 'vuex';
import { GlobalDataProps } from '@/store';

  export default defineComponent({
    components: {

      TemplateList
    },
    setup() {
      const store = useStore<GlobalDataProps>();
      const testData = computed(()=> store.state.templates.data);
    return {
        testData
      };
    }
  });
</script>

<style lang="less" scoped>
  :deep(.ant-layout) {
    background: #fff;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-title {
    color: #fff;
  }
</style>