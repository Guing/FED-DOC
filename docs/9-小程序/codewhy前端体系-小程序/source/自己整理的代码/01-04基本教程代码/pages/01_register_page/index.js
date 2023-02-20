// pages/01_初体验/index.js
Page({
  data: {
    banners: [],
    recommends: [],

    // 2.作用二: 定义本地固定的数据
    counter: 100,

    btns: ["red", "blue", "green", "orange"]
  },
  // 1.作用一: 发送网络请求, 请求数据
  onLoad() {
    console.log("onLoad");

    // 发送网络请求
    wx.request({
      url: "http://123.207.32.32:8000/home/multidata",
      success: (res) => {
        const data = res.data.data
        const banners = data.banner.list
        const recommends = data.recommend.list
        this.setData({ banners, recommends })
      }
    })
  },

  // 3.绑定wxml中产生事件后的回调函数
  onBtn1Click() {
    console.log("onBtn1Click");
  },
  onBtnClick(event) {
    console.log("btn click:", event.target.dataset.color);
  },

  // 4.绑定下拉刷新/达到底部/页面滚动
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
  },
  onReachBottom() {
    console.log("onReachBottom");
  },
  onPageScroll(event) {
    console.log("onPageScroll:", event);
  },

  // 生命周期函数: 
  onShow() {
    console.log("onShow");
  },
  onReady() {
    console.log("onReady");
  },
  onHide() {
    console.log("onHide");
  },
  onUnload() {
    console.log("onUnload");
  }
})