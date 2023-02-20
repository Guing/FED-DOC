
export function getCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res.code)
      }
    })
  })
}
