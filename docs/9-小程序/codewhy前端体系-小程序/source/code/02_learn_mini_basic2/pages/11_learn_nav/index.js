// pages/11_learn_nav/index.js
Page({
  data: {
    name: "kobe",
    age: 30,
    message: "哈哈哈"
  },
  onNavTap() {
    const name = this.data.name
    const age = this.data.age

    // 页面导航操作
    wx.navigateTo({
      // 跳转的过程, 传递一些参数过去
      url: `/pages2/detail/detail?name=${name}&age=${age}`,
      events: {
        backEvent(data) {
          console.log("back:", data);
        },
        coderwhy(data) {
          console.log("why:", data);
        }
      }
    })
  }
})