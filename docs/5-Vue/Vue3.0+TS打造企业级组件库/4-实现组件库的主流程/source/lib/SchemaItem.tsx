import { defineComponent } from 'vue'
import { FiledPropsDefine, SchemaTypes } from './types'
import NumberFiled from './fileds/NumberFiled'
import StringFiled from './fileds/StringFiled'
export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
  setup(props, { emit, attrs, slots }) {
    return () => {
      let Component: any
      switch (props.schema.type) {
        case SchemaTypes.STRING: {
          Component = StringFiled
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberFiled
          break
        }
        default: {
          console.warn(`${props.schema.type} is error`)
        }
      }
      return <Component {...props}></Component>
    }
  },
})
