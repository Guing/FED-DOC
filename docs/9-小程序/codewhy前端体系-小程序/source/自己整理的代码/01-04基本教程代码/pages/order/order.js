// pages/order/order.js
Page({
  data: {
    userInfo: {}
  },

  onLoad() {
    // 获取共享的数据: App实例中数据
    // 1.获取app实例对象
    const app = getApp()

    // 2.从app实例对象获取数据
    const token = app.globalData.token
    const userInfo = app.globalData.userInfo
    console.log(token, userInfo);

    // 3.拿到token目的发送网络请求
    
    // 4.将数据展示到界面上面
    // this.data.userInfo = userInfo
    this.setData({ userInfo })
    console.log(this.data.userInfo);
  }
})