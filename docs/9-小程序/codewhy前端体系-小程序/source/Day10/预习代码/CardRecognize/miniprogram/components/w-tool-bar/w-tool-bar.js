// components/w-tool-bar/w-tool-bar.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ["my-class"],
  properties: {
    icon: {
      type: String,
      value: ""
    },
    title: {
      type: String,
      value: ""
    },
    bgColor: {
      type: String,
      value: '#36ab60'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    test: function() {
      this.triggerEvent("")
    }
  }
})
