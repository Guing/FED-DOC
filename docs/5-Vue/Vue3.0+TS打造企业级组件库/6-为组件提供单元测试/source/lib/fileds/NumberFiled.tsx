import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'
export default defineComponent({
  name: 'NumberFiled',
  props: FiledPropsDefine,
  setup(props) {
    let handleChange = (e: any) => {
      const value = e.target.value
      let num = Number(value)
      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    return () => {
      let { value } = props
      return (
        <input
          value={value as any}
          type="number"
          onInput={handleChange}
        ></input>
      )
    }
  },
})
