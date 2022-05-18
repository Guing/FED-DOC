<template>
  <div class="content-container">
    <template-list :list="testData"></template-list>
  </div>
</template>

<script lang="ts">
  import TemplateList from '@/components/TemplateList.vue';
  import { computed, defineComponent } from 'vue';
  import { GlobalDataProps } from '@/store/index';
  import { useStore } from 'vuex';
  export default defineComponent({
    components: {
      TemplateList
    },
    setup() {
      const store = useStore<GlobalDataProps>();
      const testData = computed(() => store.state.templates.data);
      console.log('testData: ', testData);
      return {
        testData
      };
    }
  });
</script>

<style lang="less" scoped>
  .page-title {
    color: #fff;
  }
  .content-container {
    background: #fff;
    padding: 0 24px 24px 30px;
    min-height: 85vh;
    max-width: 1200px;
    margin: 50px auto;
    width: 100%;
  }
</style>
