* 使用`@vue/babel-plugin-jsx`插件时，编译器会默认开启一个` mergeProps: true`的属性
* 在一个组件上，如果传入多个同名的class / style / onXXX handlers，会合并成一个数组，比如

```tsx
export default defineComponent({
  name: 'StringFiled',
  props: FiledPropsDefine,
  setup(props) {
    let customerChange = (e: any) => {
      const value = e.target.value
      props.onChange(value)
    }
    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)
    return () => {
      const TextWidget = TextWidgetRef.value
      const { onChange } = props
      return <TextWidget onChange={props.onChange} onChange={customerChange} /> //这里两个onChange会合成一个数组，而不会覆盖掉
    }
  },
})
```

* 可以在`babel.config.js`文件中，通过设置`plugins: [['@vue/babel-plugin-jsx', { mergeProps: false }]], `关闭掉
