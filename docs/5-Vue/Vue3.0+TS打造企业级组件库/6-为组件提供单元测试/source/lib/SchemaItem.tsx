import { defineComponent, computed } from 'vue'
import { FiledPropsDefine, SchemaTypes } from './types'
import NumberFiled from './fileds/NumberFiled'
import StringFiled from './fileds/StringFiled'
import ObjectFiled from './fileds/ObjectFiled'
import ArrayFiled from './fileds/ArrayFiled'
import { retrieveSchema } from './utils'
export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
  setup(props, { emit, attrs, slots }) {
    const retrieveSchemaRef = computed(() => {
      return retrieveSchema(props.schema, props.rootSchema, props.value)
    })
    return () => {
      let Component: any
      const retrieveSchema = retrieveSchemaRef.value
      switch (props.schema.type) {
        case SchemaTypes.STRING: {
          Component = StringFiled
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberFiled
          break
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectFiled
          break
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayFiled
          break
        }
        default: {
          console.warn(`${props.schema.type} is error`)
          break
        }
      }
      return <Component {...props} schema={retrieveSchema}></Component>
    }
  },
})
