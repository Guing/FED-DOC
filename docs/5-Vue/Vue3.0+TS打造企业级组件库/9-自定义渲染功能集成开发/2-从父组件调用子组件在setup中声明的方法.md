## 第一种方法

* 在父组件中声明一个`Ref`对象，然后通过`props`传到子组件中去
* 在子组件对`Ref`对象的value重新赋值，把子组件的`setup`里面的方法赋值给它。
* 这样在父组件就可以通过, `Ref.value.xxxx`调用子组件的方法
* 实际上：就是传一个对象给子组件，在子组件修改这个对象的值，父组件通过调用对象的值来获取子组件的方法

```tsx
//父组件
export default defineComponent({
  name: 'App',
  setup() {
    const contextRef = ref() //声明一个Ref对象
    return () => {
      return (
          <div class={classes.form}>
            <ThemeProvider >
              <SchemaForm
                contextRef={contextRef} //传入一个Ref对象
              />
            </ThemeProvider>       
            <button onClick={()=>{ 
                //调用被赋值过的Ref对象的方法
                 contextRef.value.doValidate()
                }} >检验</button>
          </div>
      )
    }
  },
})

```

```tsx
//子组件

interface ContextRef{ //声明通过props传过来的Ref对象的类型
   doValidate:()=>{
     errors:any[],
     valid:boolean
   }
}
export default defineComponent({
  name: 'SchemaForm',
  props: {
    contextRef:{
      type:Object as PropType<Ref<ContextRef>>
    }
  },
  setup(props, { slots, emit, attrs }) {

    //若传过来的Ref对象有值，则赋值给它子组件的方法
    watch(()=>props.contextRef,()=>{
       if(props.contextRef){
        props.contextRef.value = {
          doValidate(){
            return {
              valid:true,
              errors:[]
            }
          }
        };
       }
    },{
      immediate:true  //这里需要立即执行一次。
    })
    return () => {
   
      return (
        <SchemaItem ></SchemaItem>
      )
    }
  },
})

```
