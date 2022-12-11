<template>
  <input v-model="value" @keyup.enter="addData" />
  <ul>
    <li v-for="(item,index) in filterList" :key="item.id" @dblclick="item.isEdit=true">
      <template v-if="item.isEdit">
        <input
          v-auto-focus="true"
          type="text"
          v-model="eidtValue"
          @keyup.enter="updateData(index)"
          @keyup.esc="cancelData(index)"
        />
      </template>
      <template v-else>
        {{item.value}}
        <input type="checkbox" v-model="item.isCompelment" />
        <span @click="removeData(index)">x</span>
      </template>
    </li>
  </ul>
  <div class="action-box">
    <span @click="filterValue = 'all'">All</span>
    <span @click="filterValue = 'active'">active</span>
    <span @click="filterValue = 'compelment'">Compelment</span>
  </div>
</template>

<script lang="ts" >
import {
  reactive,
  toRefs,
  defineComponent,
  computed,
  ComputedRef,
  watchEffect,
} from "vue";
interface IToDoItem {
  id: number;
  value: string;
  isEdit: boolean;
  isCompelment: boolean;
}
interface State {
  list: IToDoItem[];
  filterList: ComputedRef<IToDoItem[]>;
  value: string;
  eidtValue: string;

  filterValue: string;
  addData: (...args: any[]) => void;
  updateData: (index: number) => void;
  removeData: (index: number) => void;
  cancelData: (index: number) => void;
  [key: string]: any;
}

let StorageData = {
  getData(): IToDoItem[] {
    return JSON.parse(localStorage.getItem("todolist") || "[]") || [];
  },
  setData(value: IToDoItem[]) {
    localStorage.setItem("todolist", JSON.stringify(value));
  },
};

let id = 1;
export default defineComponent({
  setup() {
    let state = reactive<State>({
      list: StorageData.getData(),
      filterList: computed<IToDoItem[]>(() => {
        let arr: IToDoItem[] = state.list.filter((item: IToDoItem) => {
          if (state.filterValue === "all") {
            return true;
          } else if (state.filterValue === "active") {
            return !item.isCompelment;
          } else if (state.filterValue === "compelment") {
            return item.isCompelment;
          }
          return true;
        });
        return arr;
      }),
      value: "",
      eidtValue: "",
      filterValue: "",
      addData: () => {
        state.list.push({
          id: id++,
          isEdit: false,
          value: state.value,
          isCompelment: false,
        });
        state.value = "";
      },
      updateData: (index: number) => {
        state.list[index].value = state.eidtValue;
        state.list[index].isEdit = false;
        return false;
      },
      removeData: (index: number) => {
        state.list.splice(index, 1);
      },
      cancelData: (index: number) => {
        state.list[index].isEdit = false;
        state.eidtValue = "";
      },
    });
    watchEffect(function () {
      StorageData.setData(state.list);
    });
    return {
      ...toRefs(state),
    };
  },
  directives: {
    "auto-focus": (el: HTMLElement, binding) => {
      if (binding.value) {
        el.focus();
      }
    },
  },
});
</script>


<style>
.action-box span {
  display: inline-block;
  margin-right: 5px;
}
</style>