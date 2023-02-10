// index.js
Page({
  data: {
    pages: [
      { name: "01_初体验", path: "/pages/01test/index" },
      { name: "02_页面配置", path: "pages/02_页面配置/index" }
    ]
  },
  onBtnClick(event) {
    // 1.获取item
    const item = event.target.dataset.item

    // 2.跳转路径
    wx.navigateTo({
      url: item.path,
    })
  }
})
