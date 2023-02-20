// components/song-list-item/index.js
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
    songItemClick(event) {
      const id = this.properties.itemInfo.id
      wx.navigateTo({
        url: '/pages/detail-song/index?type=menu&id=' + id
      })
    },
  }
})
