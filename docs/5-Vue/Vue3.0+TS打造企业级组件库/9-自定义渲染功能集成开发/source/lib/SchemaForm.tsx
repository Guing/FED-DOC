import { defineComponent, PropType, provide,Ref,watch,shallowRef,watchEffect,ref } from 'vue'
import { FiledPropsDefine, SchemaTypes, Schema, Theme } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import Ajv, { Options } from 'ajv'
import { validateFormData, ErrorSchema } from './validator'
interface ContextRef{
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true,
  // jsonPointers: true,
}

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
    contextRef:{
      type:Object as PropType<Ref<ContextRef>>
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
  },
  setup(props, { slots, emit, attrs }) {
    let handleChange = (v: any) => {
      props.onChange(v)
    }
    const context: any = {
      SchemaItem,
    }
    
    const validatorRef:Ref<Ajv.Ajv> = shallowRef() as any;
    const validateResolveRef = ref()
    const validateIndex = ref(0)
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})
    watchEffect(()=>{
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })
    async function doValidate() {
      console.log('start validate -------->')
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )

      if (index !== validateIndex.value) return
      console.log('end validate -------->')

      errorSchemaRef.value = result.errorSchema

      validateResolveRef.value(result)
      validateResolveRef.value = undefined

      // return result
    }

    provide(SchemaFormContextKey, context)
    watch(()=>props.contextRef,()=>{
       if(props.contextRef){
        props.contextRef.value = {
          doValidate(){
            return new Promise((resolve) => {
              validateResolveRef.value = resolve
              doValidate()
            })
          }
        };
       }
    },{
      immediate:true
    })
    return () => {
      let { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          value={value}
          rootSchema={schema}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
        ></SchemaItem>
      )
    }
  },
})
