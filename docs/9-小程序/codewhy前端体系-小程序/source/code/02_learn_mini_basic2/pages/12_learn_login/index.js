import { getCode } from "../../service/login";
import { hyLoginReqInstance } from "../../service/index"

// pages/12_learn_login/index.js
Page({
  // onLoad登录的流程
  async onLoad() {
    // 1.获取token, 判断token是否有值
    const token = wx.getStorageSync('token') || ""

    // 2.判断token是否过期
    const res = await hyLoginReqInstance.post({
      url: "/auth",
      header: {
        token: token
      }
    })
    // console.log(res);

    // 2.如果token有值
    if (token && res.message === "已登录") {
      console.log("请求其他的数据");
    } else {
      this.handleLogin()
    }
  },

  async handleLogin() {
    // 1.获取code
    const code = await getCode()

    // 2.使用code换取token
    const res = await hyLoginReqInstance.post({
      url: "/login",
      data: { code }
    })

    // 3.保存token
    wx.setStorageSync('token', res.token)
  }

  // handleLogin() {
  //   // 1.获取code
  //   wx.login({
  //     success: (res) => {
  //       const code = res.code

  //       // 2.将这个code发送自己的服务器(后端)
  //       wx.request({
  //         url: "http://123.207.32.32:3000/login",
  //         data: {
  //           code
  //         },
  //         method: "post",
  //         success: (res) => {
  //           const token = res.data.token
  //           wx.setStorageSync('token', token)
  //         }
  //       })
  //     }
  //   })
  // }
})