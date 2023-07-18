$(function() {

  var currentImg = 'none' // none  big  small
  // 1.准备数据
  var banners = [
    {
      id:0,
      bigUrl: './img/banner0.png',
      smUrl: './img/banner0_sm.png'
    },
    {
      id:0,
      bigUrl: './img/banner1.png',
      smUrl: './img/banner1_sm.png'
    },
    {
      id:0,
      bigUrl: './img/banner2.png',
      smUrl: './img/banner2_sm.png'
    }
  ]

  // renderBanner(banners)

  $(window).on('resize',throttle( function() {
    // console.log( $(this).outerWidth() )  // border + paddig + content 
    var winWidth =  $(this).outerWidth()
    var isBigScreen = winWidth >= 768

    // if(currentImg === 'big' && isBigScreen) {
    //   return
    // }
    // if(currentImg === 'small' && !isBigScreen) {
    //   return
    // }

    if(currentImg === 'none'){
      // 掉这个函数来渲染界面
      renderBanner(banners, isBigScreen)
    } 
    
    if(currentImg === 'big' && !isBigScreen) {
      renderBanner(banners, isBigScreen)
    }

    if(currentImg === 'small' && isBigScreen) {
      // 掉这个函数来渲染界面
      renderBanner(banners, isBigScreen)
    }
    
  }))
  $(window).trigger('resize')



  function renderBanner(banners = [], isBigScreen) {

    currentImg = isBigScreen ? 'big' : 'small' 
    // 先把之前的定时器停掉
    $('.carousel').carousel('dispose')

    var banneHtmlString = ''
    // 2.将数据渲染到页面上
    banners.forEach(function(item, index) {
      var active = index === 0 ? 'active' :''
      var imgUrl = isBigScreen ? item.bigUrl: item.smUrl
      banneHtmlString +=`
         <div class="carousel-item ${active}" data-interval="3000">
          <img src="${imgUrl}" class="d-block w-100" alt="...">
        </div>
      `
    })
    $('.carousel-inner').empty().append(banneHtmlString)

    // 自动录播( 开始一个定时器 )
    $('.carousel').carousel('cycle')
  }


})