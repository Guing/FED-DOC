;(function(window, $) {

  
  // 1.在jquery的原型上添加了一个 showlinklocation
  // $.fn.showlinklocation = function() {
  //   console.log(this) // jQuery对象
  //   this.append('(http://www.liujun.com)')
  // }

  // 2.需要过滤出a元素
  // $.fn.showlinklocation = function() {
  //   console.log(this) // jQuery对象
  //   this.filter('a').append('(http://www.liujun.com)')
  // }

  // 3.需要遍历a元素
  $.fn.showlinklocation = function() {
    console.log(this) // jQuery对象
    this.filter('a').each(function() {
      var $a = $(this) // DOM Element
      var link = $a.attr('href')
      $a.append(`(${link})`)
    })
    return this
  }

  // 
})(window, jQuery)