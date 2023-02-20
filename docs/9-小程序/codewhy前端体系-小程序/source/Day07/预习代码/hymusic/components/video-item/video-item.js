// components/video-item/video-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onItemTap() {
      const item = this.properties.itemData
      wx.navigateTo({
        url: `/pages/detail-video/detail-video?id=${item.id}`,
      })
    }
  }
})
