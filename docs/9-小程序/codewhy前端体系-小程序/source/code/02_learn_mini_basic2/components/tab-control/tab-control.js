// components/tab-control/tab-control.js
Component({
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  data: {
    currentIndex: 0
  },

  methods: {
    onItemTap(event) {
      const currentIndex = event.currentTarget.dataset.index
      this.setData({ currentIndex })

      // 自定义事件
      this.triggerEvent("indexchange", currentIndex)
    },
    test(index) {
      console.log("tab control test function exec");
      this.setData({
        currentIndex: index
      })
    }
  }
})
