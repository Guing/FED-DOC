import { defineComponent, PropType } from 'vue'
import {
  FiledPropsDefine,
  CommonFieldType,
  Schema,
  SelectionWidgetNames,
} from '../types'
import { useVJSFContext } from '../context'
import { getWidget } from '../theme'

export const ArrayFiledWrapped = defineComponent({
  name: 'ArrayFiledWrapped',
  props: {
    index: {
      type: Number as PropType<number>,
      required: true,
    },
    onAdd: {
      type: Function,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
    onUp: {
      type: Function,
      required: true,
    },
    onDown: {
      type: Function,
      required: true,
    },
  },
  setup(props, { slots }) {
    let handleAdd = () => {
      props.onAdd(props.index)
    }
    let handleDelete = () => {
      props.onDelete(props.index)
    }
    let handleUp = () => {
      props.onUp(props.index)
    }
    let handleDown = () => {
      props.onDown(props.index)
    }
    return () => {
      return (
        <div>
          <div onClick={handleAdd}>新增</div>
          <div onClick={handleDelete}>删除</div>
          <div onClick={handleUp}>上移</div>
          <div onClick={handleDown}>下移</div>
          <div>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

export default defineComponent({
  name: 'ArrayFiled',
  props: FiledPropsDefine,
  setup(props) {
    let context = useVJSFContext()
    let SchemaItem: CommonFieldType = context.SchemaItem
    let SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget)
    const handleArrayItemChange = (v: any, key: number) => {
      const { schema, value } = props
      let currentValue = Array.isArray(value) ? value : []
      currentValue[key] = v
      props.onChange(currentValue)
    }
    const handleAdd = (index: number) => {
      const { value } = props
      let currentValue = Array.isArray(value) ? value : []
      currentValue.splice(index + 1, 0, undefined)
      props.onChange(currentValue)
    }
    const handleDelete = (index: number) => {
      const { value } = props
      let currentValue = Array.isArray(value) ? value : []
      currentValue.splice(index, 1)
      props.onChange(currentValue)
    }
    const handleUp = (index: number) => {
      if (index === 0) return
      const { value } = props
      const currentValue = Array.isArray(value) ? value : []

      const item = currentValue.splice(index, 1)
      currentValue.splice(index - 1, 0, item[0])

      props.onChange(currentValue)
    }
    const handleDown = (index: number) => {
      const { value } = props
      const currentValue = Array.isArray(value) ? value : []

      if (index === currentValue.length - 1) return

      const item = currentValue.splice(index, 1)
      currentValue.splice(index + 1, 0, item[0])

      props.onChange(currentValue)
    }

    return () => {
      const { schema, value,errorSchema } = props
      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum
      if (isMultiType) {
        let currentValue = Array.isArray(value) ? value : []
        return (schema.items as Schema[]).map((value: any, key: number) => {
          return (
            <SchemaItem
              {...props}
              schema={value}
              value={currentValue[key]}
              errorSchema={errorSchema[key] || {}}
              onChange={(v: any) => handleArrayItemChange(v, key)}
            ></SchemaItem>
          )
        })
      } else if (!isSelect) {
        let currentValue = Array.isArray(value) ? value : []
        return currentValue.map((value: any, key: number) => {
          return (
            <ArrayFiledWrapped
              index={key}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                key={key}
                {...props}
                schema={schema.items as Schema}
                errorSchema={errorSchema[key] || {}}
                onChange={(v: any) => handleArrayItemChange(v, key)}
                value={value}
              ></SchemaItem>
            </ArrayFiledWrapped>
          )
        })
      } else {
        let enumOptions = (schema.items as any).enum
        let options = enumOptions.map((v: any, k: number) => {
          return {
            key: v,
            value: v,
          }
        })
        let SelectionWidget = SelectionWidgetRef.value
        return (
          <SelectionWidget
          schema={schema}
            onChange={props.onChange}
            value={props.value}
            errors={errorSchema.__errors}
            options={options}
          />
        )
      }
    }
  },
})
