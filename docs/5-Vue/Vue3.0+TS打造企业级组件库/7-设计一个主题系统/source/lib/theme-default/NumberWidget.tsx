import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { computed, defineComponent } from 'vue'

const NumberWidget: CommonWidgetDefine = defineComponent({
  name: 'NumberWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    }
    return () => {
      return (
        <input
          type="number"
          value={props.value as any}
          onInput={handleChange}
        />
      )
    }
  },
})

export default NumberWidget
