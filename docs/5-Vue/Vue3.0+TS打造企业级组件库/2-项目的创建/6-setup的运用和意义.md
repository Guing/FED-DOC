## 使用setup函数

* setup可以返回一个数据对象
* 要实现数据的响应式更新，需要返回ref对象
* ref对象的有`ref`，`reactive`，`computed`
* setup只会执行一次

```ts
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  computed,
  watchEffect,
} from "vue"

export default defineComponent({
  name: "App",
  setup(props, { slots, attrs, emit }) {
    let nameRef = ref("xiaohei")
    let personRef = reactive({ sex: 1, hair: true })
    let goRef = computed(() => {
      return nameRef.value + " go"
    })
    //当函数中的ref变化时，执行这个函数
    watchEffect(() => {
      console.log(nameRef.value)
    })
    return {
      nameRef,
      personRef,
      goRef,
    }
  },
})
```

## 使用ref对象

* 在vue的setup以外的其他地方访问ref对象时，不用加.value

```html
<template>
    {{ nameRef }} //不用.value访问
</template>
```

```ts
  mounted() {
    this.nameRef //不用.value访问
  }
```
