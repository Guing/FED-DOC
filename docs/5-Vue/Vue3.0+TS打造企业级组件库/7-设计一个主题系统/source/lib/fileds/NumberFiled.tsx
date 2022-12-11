import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { defineComponent } from 'vue'

import { getWidget } from '../theme'
export default defineComponent({
  name: 'NumberFiled',
  props: FiledPropsDefine,
  setup(props) {
    let handleChange = (value: any) => {
      let num = Number(value)
      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)
    return () => {
      const NumberWidget = NumberWidgetRef.value
      const { rootSchema, ...rest } = props
      // return <input value={value as any} type="number" onInput={handleChange} />
      return <NumberWidget {...rest} onChange={handleChange} />
    }
  },
})
