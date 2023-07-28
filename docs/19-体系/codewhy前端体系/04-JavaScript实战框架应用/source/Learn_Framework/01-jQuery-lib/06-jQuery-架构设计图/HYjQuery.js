
// 立即执行函数（避免与全局变量冲突）
;(function(global, factory) {
  factory(global)
})(window, function(window) {

  function HYjQuery(selector) {
    return new HYjQuery.fn.init(selector)
  }

  // 原型方法
  HYjQuery.prototype = {
    constructor: HYjQuery,
    extend: function() {},
    text: function() {},
    ready: function() {}
    // 学习这里的的方法
  
  }
  // 类方法
  HYjQuery.noConflict = function() {}
  HYjQuery.isArray = function() {}
  HYjQuery.map = function() {}
  // 学习这里的类方法

  HYjQuery.fn = HYjQuery.prototype

  // 构造函数（创建jQuery对象）
  HYjQuery.fn.init = function(selector) { // css selector
    
    if(!selector){
      return this
    }
    // 拿到DOM Element源码
    var el = document.querySelector(selector)
    this[0] = el
    this.length = 1
    return this
  }

  HYjQuery.fn.init.prototype = HYjQuery.fn

  window.HYjQuery = window.$ = HYjQuery

})