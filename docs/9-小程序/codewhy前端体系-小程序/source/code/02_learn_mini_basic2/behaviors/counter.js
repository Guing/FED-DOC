export const counterBehavior = Behavior({
  data: {
    counter: 100
  },
  methods: {
    increment() {
      this.setData({ counter: this.data.counter + 1 })
    },
    decrement() {
      this.setData({ counter: this.data.counter - 1 })
    }
  }
})
