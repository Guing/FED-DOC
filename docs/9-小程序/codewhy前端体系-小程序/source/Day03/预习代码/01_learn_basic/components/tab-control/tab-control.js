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
      const index = event.mark.index
      this.setData({ currentIndex: index })

      this.triggerEvent("tabchange", index)
    },
    innerTest() {
      console.log("inner Test");
    }
  }
})
