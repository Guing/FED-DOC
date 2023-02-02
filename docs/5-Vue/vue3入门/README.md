# 第1章

```html
<template>
  <div class="hello">
    <span
      style="margin-right:10px;"
      v-for="(item,index) in list"
      :key="index"
      @click="selectMethods(index)"
    >{{item}}</span>
    <div>当前：{{currentMan}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
//使用setup方法
//使用ref方法
//使用ref在方法内部使用时，需要用.value
export default defineComponent({
  name: "HelloWorld",
  setup() {
    let list = ref(["小红", "小白", "小黑"]);
    let currentMan = ref("");
    let selectMethods = (index: number) => {
      currentMan.value = list.value[index];
    };
    return {
      list,
      selectMethods,
      currentMan
    };
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第2章

```html
<template>
  <div class="hello">
    <span
      style="margin-right:10px;"
      v-for="(item,index) in list"
      :key="index"
      @click="selectMethods(index)"
    >{{item}}</span>
    <div>当前：{{currentMan}}</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

interface Data {
  list: string[];
  currentMan: string;
  selectMethods(index: number): void;
}

//使用reactive方法
//使用...扩展运算符之后,因为结构后就变成了普通变量，不再具有响应式的能力
//引入toRefs就可以对data进行包装，把 data 变成refData,这样就可以使用扩展运算符的方式了。
export default {
  name: "HelloWorld",
  setup() {
    const data: Data = reactive({
      list: ["小红", "小白", "小黑"],
      currentMan: "",
      selectMethods: (index: number) => {
        data.currentMan = data.list[index];
      },
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第3章

```html
<template>
  <div class="hello">
    <span
      style="margin-right:10px;"
      v-for="(item,index) in list"
      :key="index"
      @click="selectMethods(index)"
    >{{item}}</span>
    <div>当前：{{currentMan}}</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs ,onBeforeMount } from "vue";

interface Data {
  list: string[];
  currentMan: string;
  selectMethods(index: number): void;
}

// setup() :开始创建组件之前，在beforeCreate和created之前执行。创建的是data和method
// onBeforeMount() : 组件挂载到节点上之前执行的函数。
// onMounted() : 组件挂载完成后执行的函数。
// onBeforeUpdate(): 组件更新之前执行的函数。
// onUpdated(): 组件更新完成之后执行的函数。
// onBeforeUnmount(): 组件卸载之前执行的函数。
// onUnmounted(): 组件卸载完成后执行的函数
// onActivated(): 被包含在<keep-alive>中的组件，会多出两个生命周期钩子函数。被激活时执行。
// onDeactivated(): 比如从 A 组件，切换到 B 组件，A 组件消失时执行。
// onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数（以后用到再讲，不好展现）。
export default {
  name: "HelloWorld",
  setup() {
    console.log('setup');
    const data: Data = reactive({
      list: ["小红", "小白", "小黑"],
      currentMan: "",
      selectMethods: (index: number) => {
        data.currentMan = data.list[index];
      },
    });
    onBeforeMount(()=>{
       console.log('onBeforeMount');
    })
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第4章

```html
<template>
  <div class="hello">
    <span
      style="margin-right:10px;"
      v-for="(item,index) in list"
      :key="index"
      @click="selectMethods(index)"
    >{{item}}</span>
    <div>当前：{{currentMan}}</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onRenderTracked,onRenderTriggered } from "vue";

interface Data {
  list: string[];
  currentMan: string;
  selectMethods(index: number): void;
}

//onRenderTracked：
//状态跟踪，它会跟踪页面上所有响应式变量和方法的状态，也就是我们用return返回去的值，他都会跟踪。
//只要页面有update的情况，他就会跟踪，然后生成一个event对象，我们通过event对象来查找程序的问题所在。

//onRenderTriggered：
//状态触发，它不会跟踪每一个值，而是给你变化值的信息，并且新值和旧值都会给你明确的展示出来。
export default {
  name: "HelloWorld",
  setup() {
    console.log("setup");
    const data: Data = reactive({
      list: ["小红", "小白", "小黑"],
      currentMan: "",
      selectMethods: (index: number) => {
        data.currentMan = data.list[index];
      },
    });
    // onRenderTracked((event) => {
    //   console.log("状态跟踪组件----------->");
    //   console.log(event);
    // });
     onRenderTriggered((event) => {
      console.log("状态触发组件----------->");
      console.log(event);
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第5章

```html
<template>
  <div class="hello">
    <span
      style="margin-right:10px;"
      v-for="(item,index) in list"
      :key="index"
      @click="selectMethods(index)"
    >{{item}}</span>
    <div>当前：{{currentMan}}</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch } from "vue";

interface Data {
  list: string[];
  currentMan: string;
  selectMethods(index: number): void;
}

export default {
  name: "HelloWorld",
  setup() {
    const data: Data = reactive({
      list: ["小红", "小白", "小黑"],
      currentMan: "",
      selectMethods: (index: number) => {
        data.currentMan = data.list[index];
      },
    });
    const refData = toRefs(data);
    //export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);
    //ref对象
    //计算属性ref对象
    //返回一个函数
    watch(()=>data.currentMan, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });

    return {
      ...refData,
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第6章

```html
<template>
  <div class="hello">
    <!-- 传送门组件，可以指定在挂载哪个元素下 -->
     <teleport to="body">
          <div>
            我在body里面，不在hello里面
          </div>
     </teleport>
  </div>
</template>

<script lang="ts">


export default {
  name: "HelloWorld",

};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第7章

```html
<template>
  <!-- 可以有多个根对象 -->
  <div class="hello">一个根</div>
  <div class="hello">二个根</div>
</template>

<script lang="ts">
export default {
  name: "HelloWorld",
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第8章

```html
<template>
  <div @click="$emit('my-click',{flag:true})">检验</div>
</template>

<script lang="ts">
export default {
  name: "HelloWorld",
  //vue3移除了.native 修饰符,为了指示组件更好地识别自定义事件，使用emits
  //emits的字符串数组
  // emits:['my-click']
  //emits的对象形式，可以用检验参数,验证函数应返回布尔值，以表示事件参数是否有效。
  emits: {
    "my-click": (payload: any) => {
      if (payload.flag) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第9章

```html
<template>
 
</template>

<script lang="ts">
//vue2中没有app的概念，使用Vue.config等全局API时，会影响所有new Vue()的实例
//vue3中通过createApp()返回app实例，将全局API移除掉，或者将移到实例app下面，这样就不会影响其他app实例了。
// Vue.config => app.config
// Vue.config.productionTip => 移除 
// Vue.config.ignoredElements => app.config.compilerOptions.isCustomElement 
// Vue.component  => app.component
// Vue.directive  => app.directive
// Vue.mixin  => app.mixin
// Vue.use  => app.use 
// Vue.prototype  => app.config.globalProperties
// Vue.extend  => 移除 
export default {
  name: "HelloWorld",
  

};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第10章

```html
<template>
 
</template>

<script lang="ts">
//在 Vue 3 中，全局和内部 API 都经过了重构，并考虑到了 tree-shaking 的支持。 
//比如nextTick
import { nextTick } from 'vue'
export default {
  name: "HelloWorld",
  created(){
     nextTick(()=>{
        console.log('div');
     })
  }

};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第11章

```html
<template>
  <div @click="updateData">{{modelValue}}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  //在 Vue 2 中,v-model和.sync功能差不多，但是语法上不一样，很容易混淆
  //在 Vue3 中，v-model的prop和事件默认名称更改为.sync形式的，并且子组件的model选项移除。
  //prop：value -> modelValue；
  //事件：input -> update:modelValue
  //可以在同一个组件上使用多个 v-model 绑定
  //比如想改变prop名，可以通过在父组件上，通过v-model:newName，并把子组件上的所有modelValue改成newName实例。
  name: "HelloWorld",
  props: ["modelValue"],
  methods: {
    updateData() {
      this.$emit("update:modelValue", "world");
    },
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第12章

```html
<template>
     <renderTest>

     </renderTest>
</template>

<script lang="ts">
import { defineComponent,h } from "vue";
export default defineComponent({
 //render函数里面的属性拍平了，不用通过on:{ click:function(){} }。
 //
  name: "HelloWorld",
  components:{
    renderTest:{
      render(){
        return h('div',{ onClick:()=>{ alert('click'); } },'test')
      }
    }
  }
});
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```




# 第13章

```html
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
```




