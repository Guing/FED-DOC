// app.js
App({
  onLaunch() {
    // 1.读取本地数据
    const token = wx.getStorageSync('token')
    const user = wx.getStorageSync('user')
    this.globalData.token = token
    this.globalData.user = user

    // 2.登录逻辑
    wx.login({ success: res => {} })

    // 3.请求数据
    wx.request({ url: 'url' })
  },
  globalData: {
    token: "",
    userInfo: {}
  }
})
