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

    // 4.发送网络请求
    // wx.request({
    //   url: "http://www.codercba.com:1888/api/city/all",
    //   success: (res) => {
    //     console.log(res.data);
    //   },
    //   fail: (err) => {
    //     console.log(err);
    //   }
    // })

    // wx.request({
    //   url: 'http://www.codercba.com:1888/api/home/houselist',
    //   data: {
    //     page: 1
    //   },
    //   success: (res) => {
    //     console.log(res.data);
    //   },
    //   fail: (err) => {
    //     console.log(err);
    //   }
    // })
  },
  globalData: {
    token: "",
    userInfo: {}
  }
})
