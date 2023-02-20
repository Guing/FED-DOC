// components/song-item-v1/index.js
Component({
  /**
    * 组件的属性列表
    */
  properties: {
    itemInfo: {
      type: Object
    }
  },

  /**
    * 组件的初始数据
    */
  data: {

  },

  /**
    * 组件的方法列表
    */
  methods: {
    handleItemClick(event) {
      // 1899989255
      const id = event.currentTarget.dataset.id

      // 告知外面歌曲被点击
      this.triggerEvent("click")

      // 跳到播放页
      wx.navigateTo({
        url: '/pages/music-player/index?id=' + id,
      })
    }
  }
})
