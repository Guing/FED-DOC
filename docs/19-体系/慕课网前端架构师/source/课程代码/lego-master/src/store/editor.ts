import { Module } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import { GlobalDataProps } from '.';
import { TextComponentProps } from '@/defaultProps';
export interface EditorProps {
  components: ComponentData[]; // 供中间编辑器渲染的数组
  currentElement: string; // 当前编辑的是哪个元素，uuid
}
export interface ComponentData {
  props: Partial<TextComponentProps>;
  id: string;
  name: string;
}

export const testComponent: ComponentData[] = [
  {
    id: uuidv4() || '1',
    name: 'l-text',
    props: {
      text: 'hello1',
      fontSize: '20px',
      color: 'red',
      lineHeight: '1',
      textAlign: 'left',
      fontFamily: ''
    }
  },
  {
    id: uuidv4() || '2',
    name: 'l-text',
    props: {
      text: 'hello2',
      fontSize: '10px',
      fontWeight: 'blod',
      lineHeight: '2',
      textAlign: 'left',
      fontFamily: ''
    }
  },
  {
    id: uuidv4() || '3',
    name: 'l-text',
    props: {
      text: 'hello3',
      fontSize: '15px',
      actionType: 'url',
      url: 'https://www.baidu.com',
      textAlign: 'left',
      fontFamily: ''
    }
  }
];
const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponent,
    currentElement: ''
  },
  mutations: {
    addComponent(state, props: Partial<TextComponentProps>) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props
      };
      state.components.push(newComponent);
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    }
  },
  getters: {
    getCurrentElement(state) {
      return state.components.find((component) => component.id === state.currentElement);
    }
  }
};
export default editor;
