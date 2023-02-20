// pages/profile/profile.js
Page({
  data: {
    avatarURL: "",
    listCount: 30
  },

  // 监听下拉刷新
  onPullDownRefresh() {
    console.log("用户进行下拉刷新~");

    // 模拟网络请求: 定时器
    setTimeout(() => {
      this.setData({ listCount: 30 })

      // API: 停止下拉刷新
      wx.stopPullDownRefresh({
        success: (res) => {
          console.log("成功停止了下拉刷新", res);
        },
        fail: (err) => {
          console.log("失败停止了下拉刷新", err);
        }
      })
    }, 1000)
  },

  // 监听页面滚动到底部
  onReachBottom() {
    console.log("onReachBottom");
    this.setData({
      listCount: this.data.listCount + 30
    })
  }
})