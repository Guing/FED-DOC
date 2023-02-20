// pages/cloud-function/index.js
Page({ 
  async onNumSumTap() {
    const res = await wx.cloud.callFunction({
      name: "sum",
      data: {
        num1: 20,
        num2: 30
      }
    })

    console.log(res.result);
  },

  async onLoginTap() {
    const res = await wx.cloud.callFunction({
      name: "login"
    })
    console.log(res);
  },

  async onRequestTap() {
    const res = await wx.cloud.callFunction({
      name: "getHomeData"
    })
    console.log(res);
  },

  async onHandleDBTap() {
    const res = await wx.cloud.callFunction({
      name: "handleDB"
    })
    console.log(res);
  },

  async onGenQRCodeTap() {
    const res = await wx.cloud.callFunction({
      name: "genQRCode"
    })
    console.log(res);
  }
})