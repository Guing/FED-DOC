## 高阶组件

- HOC: Higher Order Component: 高阶组件
- 通过一个包装函数，包装一个子组件，然后再返回
- 不关心包装的子组件是什么，只是为包装的子组件增加一个能力。
- 这样如果以后增加能力修改了，也不影响包装的子组件，形成解耦
- 这个和组合API的逻辑抽离有些差别，组合API只能抽离非渲染部分的逻辑，而高阶组件可以抽离渲染部分的逻辑
- 有些问题：
  - 问题：包装函数的props，要应用于所有的子组件，但是有些子组件的`props`声明可能会不一样。
  - 解决：可以在子组件上使用使用`attrs`，这样未声明的`props`会被当做`attrs`传入。
  - 问题：如果包装函数的组件有`slots`也需要传递给子组件
  - 解决：通过`<Component :slots="slots">`解决
  - 问题：ref的问题，通过ref获取到的只是包装函数的组件，无法获取到子组件的实例
  - 解决：没有办法解决


```tsx
//包装组件


const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const classesRef = useStyles()
    return () => {

      const classes = classesRef.value
      return (
        <div class={classes.container}>
        
        </div>
      )
    }
  },
})
// HOC: Higher Order Component: 高阶组件
export function withFormItem(Widget: any){
   return defineComponent({
    name: `Wrapped${Widget.name}`,
      props:CommonWidgetPropsDefine,
      setup(props,{slots,attrs}){
         return ()=>{
            return <FormItem {...props}>
                <Widget {...props} slots={slots} {...attrs} ></Widget>
            </FormItem>
         }
      }
   }) as any
}
```

```tsx
//子组件
import { withFormItem } from './FormItem'
const TextWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      return () => {
        return (
          <input
            type="text"
            value={props.value as any}
            onInput={handleChange}
            style={styleRef.value}
          />
        )
      }
    },
  }),
)
```