// pages/profile/profile.js
Page({
  data: {
    titles: ["衣服", "鞋子", "裤子"],
    currentIndex: 0
  },
  onOuterTap(event) {
    console.log("outer:", event);
  },
  onInnerTap(event) {
    console.log("inner:", event);
  },
  onTouchStart(event) {
    console.log("start:", event);
  },
  onTouchEnd(event) {
    console.log("end:", event);
  },

  onArgumentTap(event) {
    console.log(event);
  },

  onTabItemTap(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ currentIndex: index })
  },

  onCpnClick(event) {
    console.log("onCpnClick:", event);
  },

  onTabChange(event) {
    console.log(event.detail);
  },

  onChangeBtnTap() {
    const tabControl = this.selectComponent(".tabs")
    tabControl.innerTest()
  }
})