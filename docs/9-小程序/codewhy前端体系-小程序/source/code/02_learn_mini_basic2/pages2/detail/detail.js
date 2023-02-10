// pages2/detail/detail.js
Page({
  data: {
    name: "",
    age: 0
  },

  onLoad(options) {
    console.log(options);
    const name = options.name
    const age = options.age
    this.setData({ name, age })

    // const eventChannel = this.getOpenerEventChannel()
  },

  onBackTap() {
    // 1.返回导航
    wx.navigateBack()

    // 2.方式一: 给上一级的页面传递数据
    // 2.1. 获取到上一个页面的实例
    // const pages = getCurrentPages()
    // const prePage = pages[pages.length-2]

    // // 2.2.通过setData给上一个页面设置数据
    // prePage.setData({ message: "呵呵呵" })

    // 3.方式二: 回调events的函数
    // 3.1. 拿到eventChannel
    const eventChannel = this.getOpenerEventChannel()

    // 3.2. 通过eventChannel回调函数
    eventChannel.emit("backEvent", { name: "back", age: 111 })
    eventChannel.emit("coderwhy", { name: "why", age: 10 })
  },
  onUnload() {
    // // 2.1. 获取到上一个页面的实例
    // const pages = getCurrentPages()
    // const prePage = pages[pages.length-2]

    // // 2.2.通过setData给上一个页面设置数据
    // prePage.setData({ message: "呵呵呵" })
  }
})