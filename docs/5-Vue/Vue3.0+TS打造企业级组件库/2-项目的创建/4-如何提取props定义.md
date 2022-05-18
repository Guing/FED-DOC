* 可以将组件的props定义抽离出来
* 但是抽离出来的props定义, 即使加上`required:true`，访问`props.age`也会显示`number|undefined`
* 要加上`as const`

```ts
import { defineComponent, PropType } from "vue"

const myProps = {
  form: {
    type: Object as PropType<{ name: string; value: number }>,
  },
  age: {
    type: Number,
    required: true,
  },
} as const

export default defineComponent({
  name: "App",
  props: myProps,
  setup(props) {
    props.age
  },
})
```
