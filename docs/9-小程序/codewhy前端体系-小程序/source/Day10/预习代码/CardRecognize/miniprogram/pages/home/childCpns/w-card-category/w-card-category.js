// pages/home/childCpns/w-card-category/w-card-category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
      value: []
    }
  },
  data: {

  },

  methods: {
    itemClick: function(event) {
      // 1.获取点击index
      const index = event.currentTarget.dataset.index;

      // 2.界面的跳转, 并且传入index
      wx.navigateTo({
        url: '/pages/cardlist/cardlist?type=' + index,
      })
    }
  }
})
