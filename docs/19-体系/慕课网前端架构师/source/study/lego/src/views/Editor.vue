<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sider-container">
          组件列表
          <components-list @on-item-click="componentsItemClick">
          </components-list>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div id="canvas-area" class="preview-list">
            <EditWrapper
              :active="store.state.editor.currentElement == item.id"
              @on-active="setActive"
              @on-del="setDel"
              v-for="item in components"
              :key="item.id"
              :id="item.id"
            >
              <component :is="item.name" v-bind="item.props"> </component>
            </EditWrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: #fff"
        class="settings-panel"
      >
        <PropsTable
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
          @change="handleChange"
        ></PropsTable>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from "@/store";
import { ComponentData } from "@/store/editor";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import LText from "@/components/LText.vue";
import LImage from '@/components/LImage.vue'
import ComponentsList from "@/components/ComponentsList.vue";
import EditWrapper from "@/components/EditWrapper.vue";
import PropsTable from "@/components/PropsTable.vue";
export default defineComponent({
  components: {
    LText,
    LImage,
    ComponentsList,
    EditWrapper,
    PropsTable,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const components = computed<ComponentData[]>(
      () => store.state.editor.components
    );
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    );
    const componentsItemClick = (component: ComponentData) => {
      store.commit("ADD_COMPONENT",  { name: component.name, props: { ...component.props } });
    };
    const setDel = (id: string) => {
      store.commit("DEL_COMPONENT", id);
    };
    const setActive = (id: string) => {
      store.commit("SET_CURRENT", id);
    };
    const handleChange = (e: any) => {
      console.log(e);
      store.commit("UPDATE_CURRENT", e);
    };
    return {
      store,
      components,
      componentsItemClick,
      setDel,
      setActive,
      currentElement,
      handleChange,
    };
  },
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
