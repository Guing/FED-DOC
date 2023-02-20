// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      { title: "身份证", icon: "/assets/zhengjian.png" },
      { title: "银行卡", icon: "/assets/yhk.png" }
    ],
    goods: [
      { name: "iPhone", price: 6998.666 },
      { name: "iPhone", price: 6998.666 },
      { name: "iPhone", price: 6998.666 },
      { name: "iPhone", price: 6998.666 },
      { name: "iPhone", price: 6998.666 },
    ],
    price: 23.5666
  },

  onLoad: function() {
    this.data.price.toFixed(2)
  },

  pickValueChange: function(event) {
    // 1.获取选中的类型
    const type = event.detail.value;

    // 2.跳转到下一个页面，进行识别
    wx.navigateTo({
      url: `/pages/recognize/recognize?type=${type}`,
    })
  }
})