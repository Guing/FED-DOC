// pages/show/show.js
Page({
  onShowToast() {
    wx.showToast({
      title: '哈哈哈',
      icon: "error",
      duration: 2000,
      mask: true,
      success: (res) => {
        console.log("展示成功:", res);
      },
      fail: (err) => {
        console.log("展示失败:", err);
      }
    })

    wx.showModal({
      title: "呵呵呵",
      cancelText: "要不起",
      cancelColor: '#f00',
      confirmText: "要",
      confirmColor: "#0f0",
      success: (res) => {
        console.log("展示成功:", res);
      },
      fail: (err) => {
        console.log("展示失败:", err);
      }
    })

    wx.showActionSheet({
      itemList: ["MacBook", "iPad", "iPhone"],
      itemColor: "#f00",
      success: (res) => {
        console.log("成功:", res);
      },
      fail: (err) => {
        console.log("失败:", err);
      }
    })
  },
  onShareAppMessage() {
    return {
      title: "一张图片",
      path: "/pages/cart/cart",
      imageUrl: "/assets/nhlt.jpg"
    }
  },

  onGetSystemInfo() {
    wx.getSystemInfo({
      success: (result) => {
        console.log(result);
      }
    })

    const info = wx.getSystemSetting()
    console.log(info, info.deviceOrientation);
  },

  onGetLocationInfo() {
    wx.getLocation({
      success: (res) => {
        console.log(res);
      }
    })
  }
})