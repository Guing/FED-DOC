### Vue组件的三种形式

- SFC单文件组件(混合三种标签，返回vue的template)

```html
<template>
   <h1>{{title}}</h1>
</template>
```

- 函数组件Function Component(函数形式，使用JSX或者h函数)

```jsx
function Title(props){
   return <h1>{{props.title}}</h1>
}
```

- render function(对象形式，使用对象上的render方法返回，使用JSX或者h函数)

```jsx
return defineComponent({

  render() {
    return  <h1>{{this.title}}</h1>
  }
})

return defineComponent({
  setup(props) {
    return  () => {
      <h1>{{props.title}}</h1>
    }
  }
})
```

#### template语法

**优点**

- 有非常多的指令，可以快速完成某些任务
- 基于DOM结构，更容易理解
- 基于template分析做了很多优化

**缺点**

- 不够灵活

#### JSX或者h函数

**优点**

- 灵活，可以利用js来表达各种逻辑

**缺点**

- 可读性差
- 编辑优化

结论: **优先选择template，当template写起来费劲时用jsx**

> Vue推荐在绝大多数情况下使用模板来创建你的HTML。然而在一些场景种，你真的需要JavaScript的完全编程的能力。