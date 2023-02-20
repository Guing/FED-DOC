// app.js
App({
  // 作用二: 共享数据
  // 数据不是响应式, 这里共享的数据通常是一些固定的数据
  globalData: {
    token: "",
    userInfo: {}
  },
  onLaunch(options) {
    // 0.从本地获取token/userInfo
    const token = wx.getStorageSync("token")
    const userInfo = wx.getStorageSync("userInfo")

    // 1.进行登录操作(判断逻辑)
    if (!token || !userInfo) {
      // 将登录成功的数据, 保存到storage
      console.log("登录操作");
      wx.setStorageSync("token", "kobetoken")
      wx.setStorageSync("userInfo", { nickname: "kobe", level: 100 })
    }

    // 2.将获取到数据保存到globalData中
    this.globalData.token = token
    this.globalData.userInfo = userInfo


    // 3.发送网络请求, 优先请求一些必要的数据
    // wx.request({ url: 'url'})
  },
  onShow(options) {
    // 作用一: 判断小程序的进入场景
    console.log("onShow:", options);
  },
  onHide() {
    console.log("onHide");
  }
})

// 页面中
// 1.初体验: favor
// 2.页面配置/下拉刷新/上拉加载: profile
// 3.在页面中, 使用app中的数据: order
