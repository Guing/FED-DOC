// custom-tab-bar/tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    list: [{
      pagePath: "/pages/music/music",
      iconPath: "/assets/images/tabbar/music_normal.png",
      selectedIconPath: "/assets/images/tabbar/music_active.png",
      text: "音乐"
    }, {
      pagePath: "/pages/video/video",
      iconPath: "/assets/images/tabbar/video_normal.png",
      selectedIconPath: "/assets/images/tabbar/video_active.png",
      text: "视频"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const currentIndex = e.currentTarget.dataset.index;
      const path = e.currentTarget.dataset.path
      wx.switchTab({
        url: path
      })
      this.setData({ currentIndex: 1 }, () => {
        console.log(this.data.currentIndex)
      })
    }
  }
})
