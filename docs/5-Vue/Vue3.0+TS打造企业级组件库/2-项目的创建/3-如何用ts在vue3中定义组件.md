## 使用defineComponent定义组件

* 使用`defineComponent()`，用来给ts提供定义组件时的类型，如果不使用ts也可以不用这个方法。
* 返回的是一个是`DefineComponent<>类型`
* 可以自定义组件类型`type MyComponentDefine = DefineComponent<{a:string}>`
* `defineComponent`本身没有什么功能，其实就是将传入的参数再返回出来。如果是参数是一个函数，则将参数传给setup方法。

```ts
// implementation, close to no-op
export function defineComponent(options: unknown) {
  return isFunction(options) ? { setup: options, name: options.name } : options
}

```

## 在props使用Ts类型

* 声明的props类时，可以使用PropType转换为Ts的更为具体的类型
* 加上 required:true，访问`props.age`不会显示`number|undefined`

```ts
import { defineComponent,PropType } from "vue"

export default defineComponent({
  name: "App",
   props: {
    form:{
      type:Object as PropType<{ name:string,value:number }>
    },
    age:{
      type:Number,
      required:true
    }
  },
 setup(props){
      props.age
  }
})
```
