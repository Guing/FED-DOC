// pages/main/main.js
Page({
  pushDetail() {
    const name = "why"
    const age = 18

    wx.navigateTo({
      url: `/pages/detail/detail?name=${name}&age=${age}`,
    })
  }
})