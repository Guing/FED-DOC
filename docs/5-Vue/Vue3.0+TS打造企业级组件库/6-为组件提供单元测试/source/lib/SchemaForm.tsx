import { defineComponent, PropType, provide } from 'vue'
import { FiledPropsDefine, SchemaTypes, Schema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props, { slots, emit, attrs }) {
    let handleChange = (v: any) => {
      props.onChange(v)
    }
    const context: any = {
      SchemaItem,
    }

    provide(SchemaFormContextKey, context)
    return () => {
      let { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          value={value}
          rootSchema={schema}
          onChange={handleChange}
        ></SchemaItem>
      )
    }
  },
})
