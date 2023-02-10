// pages/category/category.js
Page({
  data: {
    chooseImage: "",
    colors: ["red", "blue", "orange", "purple", "green", "pink"]
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
  },

  onScrollHanlder(event) {
    // console.log(event);
    console.log(event.detail.deltaX);
  },
  onScrolltolower(event) {
    console.log("滚动到最右边");
  },
  onScrolltoupper() {
    console.log("滚动到最左边");
  }
})