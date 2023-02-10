const { HYEventStore } = require("hy-event-store")
const axios = require("axios")

const userStore = new HYEventStore({
  state: {
    name: "why",
    age: 18,

    banners: [],
    recommends: []
  },
  actions: {
    fetchHomeMultidataAction(ctx) {
      axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
        ctx.banners = res.data.data.banner.list
      })
    }
  }
})


// aaa.js中使用共享的数据
// userStore.onState("name", (value) => {
//   console.log("name:", value);
// })
// userStore.onState("banners", (value) => {
//   console.log("banners:", value)
// })

userStore.onStates(["name", "banners"], (value) => {
  console.log(value.name);
  console.log(value.banners);
})

// bbb.js改变数据
setTimeout(() => {
  userStore.setState("name", "kobe")
  // userStore.dispatch("fetchHomeMultidataAction")
}, 2000)

