import { defineComponent } from 'vue'
import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'
export default defineComponent({
  name: 'StringFiled',
  props: FiledPropsDefine,
  setup(props) {
    let handleChange = (v: any) => {
      props.onChange(v)
    }
    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)
    return () => {
      const TextWidget = TextWidgetRef.value
      const { rootSchema, schema, ...rest } = props
      return <TextWidget {...rest} onChange={handleChange} />
    }
  },
})
