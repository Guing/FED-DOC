// pages/favor/favor.js
// 实例化: 页面实例
Page({
  data: {
    // 1.案例一: 数据绑定 mustache语法
    message: "Hello World",

    // 2.案例二: 列表数据
    movies: ["少年派", "大话西游", "星际穿越", "独行月球"],

    // 3.案例三: 计数器
    counter: 0
  },

  // 监听的事件方法
  increment() {
    console.log("+1");
    // 修改data中的数据, 但是你的修改并不会引起页面的刷新(自动检测你的新数据重新渲染页面, 在小程序中不会, 在react中也不会)
    // this.data.counter += 1
    // console.log(this.data.counter);

    // 修改data, 并且希望页面重新渲染, 这里必须使用this.setData()
    this.setData({
      counter: this.data.counter + 1
    })
  },
  decrement() {
    console.log("-1");
    this.setData({
      counter: this.data.counter - 1
    })
  }
})
