// pages/cart/cart.js
Page({
  data: {
    nums: [123, 321, 111, 222],
    count: 1323323232,
    duration: 100,
    username: "coderwhy",
    books: [
      { name: "算法导论", id: 111 },
      { name: "Vue3+TS", id: 112 },
    ],
    message: "Hello World",
    firstName: "kobe",
    lastName: "bryant",
    date: new Date().toLocaleDateString(),
    score: 10
  },
  getTotal() {
    return 100
  }
})