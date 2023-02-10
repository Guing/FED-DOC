# Day06 作业布置

## 一. 完成课堂所有的代码







## 二. 目前小程序中的状态（数据）是如何管理的？

小程序的全局数据使用 hy-event-store 库来管理,  hy-event-store 是一个基于事件的全局状态管理工具，可以在Vue、React、小程序等任何地方使用。

具体的使用步骤,  如下:

1、npm安装依赖

```
npm install hy-event-store
```

2、事件总线（event-bus）

```js
const { HYEventBus } = require('hy-event-store')

const eventBus = new HYEventBus()

const whyCallback1 = (...payload) => {
  console.log("whyCallback1:", payload)
}

const whyCallback2 = (...payload) => {
  console.log("whyCallback1:", payload)
}

const lileiCallback1 = (...payload) => {
  console.log("lileiCallback1:", payload)
}

eventBus.on("why", whyCallback1)
eventBus.on("why", whyCallback2)
eventBus.on('lilei', lileiCallback1)
eventBus.once("why", (...payload) => {
  console.log("why once:", payload)
})

setTimeout(() => {
  eventBus.emit("why", "abc", "cba", "nba")
  eventBus.emit("lilei", "abc", "cba", "nba")
}, 1000);

setTimeout(() => {
  eventBus.off("why", whyCallback1)
  eventBus.off("lilei", lileiCallback1)
}, 2000);

setTimeout(() => {
  eventBus.emit("why")
  eventBus.emit("lilei")
}, 3000);
```

3、数据共享（event-store）

```js
const { HYEventStore } = require("hy-event-store")
const axios = require('axios')

const eventStore = new HYEventStore({
  state: {
    name: "why",
    friends: ["abc", "cba", "nba"],
    banners: [],
    recommends: []
  },
  actions: {
    getHomeMultidata(ctx) {
      console.log(ctx)
      axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
        const banner = res.data.data.banner
        const recommend = res.data.data.recommend
        // 赋值
        ctx.banners = banner
        ctx.recommends = recommend
      })
    }
  }
})

// 数据监听
eventStore.onState("name", (value) => {
  console.log("监听name:", value)
})

eventStore.onState("friends", (value) => {
  console.log("监听friends:", value)
})

eventStore.onState("banners", (value) => {
  console.log("监听banners:", value)
})

eventStore.onState("recommends", (value) => {
  console.log("监听recommends", value)
})

// 数据变化
setTimeout(() => {
  eventStore.setState("name", "lilei")
  eventStore.setState("friends", ["kobe", "james"])
}, 1000);

eventStore.dispatch("getHomeMultidata")
```



## 三. 完成歌曲列表详情页的Header布局

























































































