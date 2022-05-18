import { Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { GlobalDataProps } from ".";
import { TextComponentProps } from "@/defaultProps";

export interface EditorProps {
  components: ComponentData[]; // 供中间编辑器渲染的数组
  currentElement: string; // 当前编辑的是哪个元素，uuid
}
export interface ComponentData {
  props: { [key: string]: string };
  id: string;
  name: string;
}

export const testComponent: ComponentData[] = [

];

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponent,
    currentElement: "",
  },
  mutations: {
    ADD_COMPONENT: function (state, component: ComponentData) {
      state.components.push({
        id: uuidv4(),
        name: component.name ,
        props:component.props,
      });
    },
    DEL_COMPONENT: function (state, id: string) {
      state.components = state.components.filter((item) => item.id != id);
    },
    SET_CURRENT: function (state, id: string) {
      state.currentElement = id;
    },
    UPDATE_CURRENT: function (state, { key, value }) {
      const component = state.components.find(
        (item) => item.id == state.currentElement
      );
      if (component) {
        component.props[key] = value;
      }
    },
  },
  getters: {
    getCurrentElement(state) {
      return state.components.find((item) => item.id == state.currentElement);
    },
  },
};
export default editor;
