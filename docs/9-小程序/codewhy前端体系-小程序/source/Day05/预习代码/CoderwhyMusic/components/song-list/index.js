// components/song-list/song-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      default: "默认标题"
    },
    songList: {
      type: Array,
      default: []
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
    songItemClick(event) {
      const id = event.target.dataset.item.id
      wx.navigateTo({
        url: '/pages/detail-song/index?type=menu&id=' + id
      })
    },
    hotSongsHeaderClick() {
      wx.navigateTo({
        url: '/pages/detail-menu/index',
      })
    }
  }
})
