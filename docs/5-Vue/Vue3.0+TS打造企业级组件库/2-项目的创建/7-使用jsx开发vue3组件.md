## 可以在setup返回redner函数

```ts
 defineComponent({
    setup() {
      return () => {
        return h("div", "haha")
      }
    },
  })
```

* 在setup的返回render的函数引用ref对象时，需要加`.value`访问
* ref对象的更新，会触发redner函数的重新执行，但是不会触发setup的重新执行

```ts
defineComponent({
    setup() {
      const numRef = ref(1)
      setInterval(() => {
        numRef.value++
      }, 1000)
      //let num = numRef.value //这样写不会更新
      return () => {
        const num = numRef.value //这样写才会更新
        return h("div", "haha" + num)
      }
    },
  })
```

## 安装jsx支持

* vue3的jsx的github地址：[https://github.com/vuejs/jsx-next](https://github.com/vuejs/jsx-next)

```bash
npm install @vue/babel-plugin-jsx -D
```

```js
//babel config
{
    "plugins": ["@vue/babel-plugin-jsx"]
}
```

* 安装完成之后，新建tsx文件，在setup函数中返回jsx

```ts
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  setup() {
    return () => {
      return <div>JSX Hello World</div>
    }
  },
})

```

## 使用jsx开发vue3组件的好处

* 通过在setup函数中返回render函数，可以利用js闭包的特性，使得变量引用会非常明确，也可以获取js的变量引用的提示。
* .vue文件优势在于简单易读，jsx的优势在于更支持js的语言特性
* jsx结合Ts, 在jsx中引入组件，在编译的时候就能够获取组件的props提醒，而.vue文件不能获取组件的props类型提示。
* jsx更适合组件的动态加载，可以通过函数传参，返回不同的组件，而.vue文件需要通过指令的方式，更复杂
* jsx文件的样式问题，可以使用css-in-js，也可以使用css-module，而.vue文件则可以直接混合使用css样式
* .vue文件导出的组件类型，通过是根目录下的`shims-vue.d.ts`统一声明的。所以导出的自定义组件，其导出的类型都是一样的，无法获取自定义的组件类型
* jsx文件是ts语言支持的语法，所以能够识别自定义组件的类型。
