const gulp = require('gulp')

// 编写简单的任务
const foo = async (cb) => {
  console.log("第一个gulp任务")
  cb()
}

// 编写异步的gulp任务
// async的时候bar函数会返回一个Promise
const bar = (cb) => {
  setTimeout(() => {
    console.log("bar任务被执行~")
    cb()
  }, 2000);
}

// 早期编写任务的方式(gulp4.x之前)
// gulp.task('foo2', (cb) => {
//   console.log("第二个gulp任务")
//   cb()
// })

// 导出的任务
module.exports = {
  foo,
  bar
}

// 默认任务
module.exports.default = (cb) => {
  console.log("default task exec~")
  cb()
}
