import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'
export default defineComponent({
  name: 'StringFiled',
  props: FiledPropsDefine,
  setup(props) {
    let handleChange = (e: any) => {
      const value = e.target.value

      props.onChange(value)
    }
    return () => {
      let { value } = props
      return <input value={value as any} onInput={handleChange}></input>
    }
  },
})
