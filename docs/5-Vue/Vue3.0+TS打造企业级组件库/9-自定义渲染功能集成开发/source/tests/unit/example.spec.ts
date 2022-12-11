import { mount, shallowMount } from '@vue/test-utils'

import { NumberFiled } from '../../lib'
import TestComponent from './utils/TestComponent'
describe('JsonSchemaForm', () => {
  it('should render correct number filed', async () => {
    let value: any
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'number',
        },
        value: 1,
        onChange: (v: any) => {
          value = v
        },
      },
    })
    //测试子组件是否渲染成功
    const numberFiled = wrapper.findComponent(NumberFiled)
    expect(numberFiled.exists()).toBeTruthy()
    //测试表单输入之后，onChange是否触发成功。
    const input = numberFiled.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe(123)
  })
})
