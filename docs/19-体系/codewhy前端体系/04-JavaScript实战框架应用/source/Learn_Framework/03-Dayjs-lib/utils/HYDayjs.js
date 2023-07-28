;(function (g){
  
  // browser -> window 全局对象
  // node -> global 全局对象

  // globalThis -> ES11
  g = typeof globalThis !== 'undefined' ? globalThis : g || self

  // 构造函数
  function Dayjs() {
    var date = new Date()
    this.$Y = date.getFullYear()
    this.$M = date.getMonth()
    this.$D = date.getDate()
  }

  // 原型上的方法
  Dayjs.prototype.format = function() {
    return `${this.$Y}-${ (this.$M + 1) }-${this.$D}`
  }

  // 学习原型的上的方法
  // ......原型的方法
  // ......原型的方法
  // ......原型的方法
  // ......原型的方法
  // ......原型的方法
  // ......原型的方法
  // ......原型的方法
  
  // 工厂函数
  function dayjs() {
    return new Dayjs()
  }

  dayjs.prototype = Dayjs.prototype

  // 统一导出
  g.dayjs = dayjs
})(this)

