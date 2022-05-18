import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

import {
  SelectionWidget,
  NumberFiled,
  StringFiled,
  ArrayFiled,
} from '../../lib'
import TestComponent from './utils/TestComponent'
describe('ArrayFiled', () => {
  it('should render multi type', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        value: [],
        onChange: () => {},
      },
    })

    const arr = wrapper.findComponent(ArrayFiled)
    const str = arr.findComponent(StringFiled)
    const num = arr.findComponent(NumberFiled)

    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })

  it('should render single type', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['1', '2'],
        onChange: () => {},
      },
    })

    const arr = wrapper.findComponent(ArrayFiled)
    const strs = arr.findAllComponents(StringFiled)
    // const num = arr.findComponent(NumberFiled)

    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe('1')
    // expect(num.exists()).toBeTruthy()
  })

  it('should render single type', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['1', '2', '3'],
          },
        },
        value: [],
        onChange: () => {}, // elsint-disable-line
      },
    })

    const arr = wrapper.findComponent(ArrayFiled)
    const select = arr.findComponent(SelectionWidget)
    // const num = arr.findComponent(NumberFiled)

    expect(select.exists()).toBeTruthy()
    // expect(num.exists()).toBeTruthy()
  })
})
