// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667
  },
  onLaunch() {
    // 1.获取设备的信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
      },
    })
  }
})
