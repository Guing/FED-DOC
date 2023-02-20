// pages/category/category.js
Page({
  data: {
    chooseImage: ""
  },

  getUserInfo(data) {
    console.log("userInfo:", data);
  },

  getPhoneNumber(data) {
    console.log("phoneNumber:", data);
  },

  chooseLocalImage() {
    wx.chooseMedia({
      mediaType: "image",
      count: 1
    }).then(res => {
      console.log(res);
      this.setData({
        chooseImage: res.tempFiles[0].tempFilePath
      })
    })
  }
})