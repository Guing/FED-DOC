// 封装成类 -> 实例
import { baseURL } from "./config"

class HYRequest {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  request(options) {
    const { url } = options
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        url: this.baseURL + url,
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          console.log("err:", err);
        }
      })
    })
  }
  get(options) {
    return this.request({ ...options, method: "get" })
  }
  post(options) {
    return this.request({ ...options, method: "post" })
  }
}

export const hyRequest = new HYRequest(baseURL)
