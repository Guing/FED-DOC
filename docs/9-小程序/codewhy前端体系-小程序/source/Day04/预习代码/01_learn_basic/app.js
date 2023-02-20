// app.js
App({
  onLaunch() {
    // 1.读取本地数据
    // const token = wx.getStorageSync('token')
    // const user = wx.getStorageSync('user')
    // this.globalData.token = token
    // this.globalData.user = user

    // 2.登录逻辑
    const token = wx.getStorageSync('token')

    // 3.判断token是否过期
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      header: {
        token
      },
      method: "POST",
      success: (res) => {
        console.log(res);
      }
    })

    if (token) {
      this.globalData.token = token
    } else {
      this.handleLogin()
    }

    // 3.请求数据
    // wx.request({ url: 'url' })

    // 4.发送网络请求
  },

  async handleLogin() {
    // 1.获取code
    const res = await wx.login({})
    const code = res.code

    // 2.换取token
    wx.request({
      url: 'http://123.207.32.32:3000/login',
      data: {
        code
      },
      method: "post",
      success: (res) => {
        const token = res.data.token
        wx.setStorageSync('token', token)
      }
    })
  },

  globalData: {
    token: "",
    userInfo: {}
  }
})
