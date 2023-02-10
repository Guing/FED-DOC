// pages/home/home.js


Page({
  data: {
    message: "Hello World",
    listCount: 30,
    movies: [
      "少年派",
      "星际穿越",
      "太空漫游",
      "盗梦空间"
    ],
    counter: 0
  },
  onPullDownRefresh() {
    console.log("监听到下拉刷新");
    setTimeout(() => {
      console.log('----');
      wx.stopPullDownRefresh({
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        }
      })
    }, 1000);
  },
  onReachBottom() {
    console.log("onReachBottom");
    this.setData({
      listCount: this.data.listCount + 30
    })
  },
  onLoad() {
    const app = getApp()
    console.log(app.globalData.token);
    console.log(app.globalData.user);
    
    console.log(this.router);
    console.log(this.pageRouter);
  },
  increment() {
    this.setData({
      counter: this.data.counter + 1
    })
  },
  decrement() {
    this.setData({
      counter: this.data.counter - 1
    })
  }
})