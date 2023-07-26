const { AsyncParallelHook } = require('tapable')

class HYCompiler {
  constructor() {
    this.hooks = {
      // 1.创建hooks
      // bail的特点: 如果有返回值, 那么可以阻断后续事件继续执行
      parallelHook: new AsyncParallelHook(["name", "age"])
    }


    // 2.用hooks监听事件(自定义plugin)
    this.hooks.parallelHook.tapAsync("event1", (name, age) => {
      setTimeout(() => {
        console.log("event1事件监听执行了:", name, age)
      }, 3000);
    })

    this.hooks.parallelHook.tapAsync("event2", (name, age) => {
      setTimeout(() => {
        console.log("event2事件监听执行了:", name, age)
      }, 3000);
    })
  }
}

const compiler = new HYCompiler()
// 3.发出去事件
setTimeout(() => {
  compiler.hooks.parallelHook.callAsync("why", 18)
}, 0);
