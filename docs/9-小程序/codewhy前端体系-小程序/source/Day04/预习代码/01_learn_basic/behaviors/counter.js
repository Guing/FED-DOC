const counter = Behavior({
  data: {
    counter: 0
  },
  lifetimes: {
    created() {
      console.log("counter behavior created");
    }
  },
  methods: {
    increment() {
      this.setData({
        counter: this.data.counter + 1
      })
    }
  }
})

module.exports = {
  counter
}

export {
  counter
}
