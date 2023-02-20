// index.js
Page({
  data: {
    pages: [
      { name: "01_注册页面", path: "/pages/01_register_page/index" },
      { name: "02_常见组件", path: "/pages/02_common_cpns/index" },
      { name: "03_学习WXSS", path: "/pages/03_learn_wxss/index" },
      { name: "04_学习WXML", path: "/pages/04_learn_wxml/index" },
      { name: "05_学习WXS", path: "/pages/05_learn_wxs/index" },
      { name: "06_学习event", path: "/pages/06_learn_event/index" },
      { name: "07_学习组件化", path: "/pages/07_learn_cpns/index" },
      { name: "08_学习组件化2", path: "/pages/08_learn_slot/index" },
      { name: "09_学习网络请求", path: "/pages/09_learn_network/index" },
      { name: "10_学习系统API", path: "/pages/10_learn_api/index" },
      { name: "11_学习页面导航", path: "/pages/11_learn_nav/index" },
      { name: "12_学习登录流程", path: "/pages/12_learn_login/index" }
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
