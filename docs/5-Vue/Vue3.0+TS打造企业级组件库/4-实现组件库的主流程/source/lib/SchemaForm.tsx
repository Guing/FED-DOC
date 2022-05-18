import { defineComponent } from 'vue'
import { FiledPropsDefine, SchemaTypes } from './types'
import SchemaItem from './SchemaItem'
export default defineComponent({
  name: 'SchemaForm',
  props: FiledPropsDefine,
  setup(props, { slots, emit, attrs }) {
    let handleChange = (v: any) => {
      props.onChange(v)
    }
    return () => {
      let { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          value={value}
          onChange={handleChange}
        ></SchemaItem>
      )
    }
  },
})
