// pages/main/main.js
Page({
  data: {
    title: "哈哈哈"
  },

  onLoad() {
    // wx.setStorageSync('name', "why")
    // wx.setStorageSync('age', 18)
    // const name = wx.getStorageSync('name')
    // const age = wx.getStorageSync('age')
    // console.log(name, age);
    // wx.removeStorageSync('name')
    // wx.clearStorageSync()

    wx.setStorage({
      key: "name",
      data: "coderwhy",
      encrypt: true,
      success: (res) => {
        console.log(res);
      }
    })

    wx.getStorage({
      key: "name",
      success: (res) => {
        console.log(res);
      }
    })
  },

  pushDetail() {
    const name = "why"
    const age = 18

    wx.navigateTo({
      url: `/pages/detail/detail?name=${name}&age=${age}`,
      events: {
        acceptSomeData(data) {
          console.log("main中接受参数:", data);
        }
      },
      success: (res) => {
        const eventChannel = res.eventChannel
        eventChannel.emit("coderwhy", {message: "Hello World"})
      }
    })
  }
})