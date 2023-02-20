// pages/08_learn_slot/index.js
Page({
  data: {
    isShowLiftTime: true
  },
  onChangeTap() {
    this.setData({ isShowLiftTime: !this.data.isShowLiftTime })
  }
})