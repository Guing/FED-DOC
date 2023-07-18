;(function(window, $) {
 
  // 这个是公共的请求  HYReq.request -> $.ajax
  function request(config = {}) {
    return $.ajax({
      ...config,
      url: config.url || '',  // 跨越处理: node cors  / nginx 反向代理
      method: config.method || "GET",
      timeout: config.timeout || 5000,
      data: config.data || {},
      headers: config.headers || {}
    })
  }

  // HYReq.get -> $.get
  function get(url, data) {
    return request({
      url,
      method: 'GET',
      data
    })
  }

  // HYReq.post -> $.post
  function post(url, data) {
    return request({
      url,
      method: 'POST',
      data
    })
  }

  window.HYReq = {
    request,
    get,
    post
  }

})(window, jQuery)