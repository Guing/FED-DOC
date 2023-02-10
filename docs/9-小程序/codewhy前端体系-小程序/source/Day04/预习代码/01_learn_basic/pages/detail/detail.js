// pages/detail/detail.js
Page({
  onLoad(options) {
    // 1.获取传递的数据
    const name = options.name
    const age = options.age
    console.log(name, age);

    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on("coderwhy", data => {
      console.log("detail:", data);
    })
  },
  onPassBackTap() {
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    prevPage.setData({
      title: "呵呵呵"
    })
  },
  onPassBack2Tap() {
    // 1.拿到eventChannel
    const eventChannel = this.getOpenerEventChannel()

    // 2.传递数据给上一个页面
    eventChannel.emit("acceptSomeData", { 
      name: "detail", 
      count: 1000 
    })
  }
})