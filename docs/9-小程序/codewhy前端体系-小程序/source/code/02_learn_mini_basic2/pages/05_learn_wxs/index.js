// pages/05_learn_wxs/index.js
Page({
  data: {
    books: [
      { id: 111, name: "代码大全", price: 98, coverURL: "" },
      { id: 112, name: "你不知道JS", price: 87, coverURL: "" },
      { id: 113, name: "JS高级设计", price: 76, coverURL: "" },
    ],
    playCount: 2232,
    duration: 255,
    currentTime: 65
  },
  formatPrice(price) {
    return "¥" + price
  },
})