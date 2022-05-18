<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sider-container">
          组件列表
          <components-list :list="defaultTextTemplates" @onItemClick="addItem"></components-list>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div id="canvas-area" class="preview-list">
            <edit-wrapper
              v-for="component in components"
              :id="component.id"
              :key="component.id"
              :active="component.id === currentElement?.id"
              @setActive="setActive"
            >
              <component :is="component.name" v-bind="component.props"></component>
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        组件属性
        <props-table
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
        ></props-table>
        <pre>
          {{ currentElement }}
          {{ currentElement?.props }}
        </pre>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
  import { GlobalDataProps } from '@/store';
  import { computed, defineComponent } from 'vue';
  import { useStore } from 'vuex';
  import EditWrapper from '@/components/EditWrapper.vue';
  import ComponentsList from '@/components/ComponentsList.vue';
  import LText from '@/components/LText.vue';
  import { defaultTextTemplates } from '@/defaultTemplates';
  import PropsTable from '@/components/PropsTable.vue';
  import { ComponentData } from '@/store/editor';

  export default defineComponent({
    components: { LText, EditWrapper, ComponentsList, PropsTable },
    setup() {
      const store = useStore<GlobalDataProps>();
      const components = computed(() => store.state.editor.components);
      const addItem = (props: any) => {
        store.commit('addComponent', props);
      };
      const setActive = (id: string) => {
        store.commit('setActive', id);
        console.log('id: ', id);
      };
      const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement);
      return { components, defaultTextTemplates, addItem, setActive, currentElement };
    }
  });
</script>

<style scoped lang="less">
  .editor-container {
    .preview-container {
      padding: 24px;
      margin: 0;
      min-height: 85vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .preview-list {
      padding: 0;
      margin: 0;
      min-width: 375px;
      min-height: 200px;
      border: 1px solid #efefef;
      background: #fff;
      overflow-x: hidden;
      overflow-y: auto;
      position: fixed;
      margin-top: 50px;
      max-height: 80vh;
    }
  }
</style>
