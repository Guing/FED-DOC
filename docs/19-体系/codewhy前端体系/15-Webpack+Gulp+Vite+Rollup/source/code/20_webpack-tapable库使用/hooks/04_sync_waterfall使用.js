const { SyncWaterfallHook } = require('tapable')

class HYCompiler {
  constructor() {
    this.hooks = {
      // 1.创建hooks
      // bail的特点: 如果有返回值, 那么可以阻断后续事件继续执行
      waterfallHook: new SyncWaterfallHook(["name", "age"])
    }


    // 2.用hooks监听事件(自定义plugin)
    this.hooks.waterfallHook.tap("event1", (name, age) => {
      console.log("event1事件监听执行了:", name, age)
      
      return {xx: "xx", yy: "yy"}
    })
    
    this.hooks.waterfallHook.tap("event2", (name, age) => {
      console.log("event1事件监听执行了:", name, age)
    })
  }
}

const compiler = new HYCompiler()
// 3.发出去事件
setTimeout(() => {
  compiler.hooks.waterfallHook.call("why", 18)
}, 2000);
