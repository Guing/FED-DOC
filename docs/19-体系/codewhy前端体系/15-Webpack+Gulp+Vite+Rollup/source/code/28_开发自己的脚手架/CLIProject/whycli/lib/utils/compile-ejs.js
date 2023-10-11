const path = require('path')
const ejs = require('ejs')

function compileEjs(tempName, data) {
  return new Promise((resolve, reject) => {
    // 1.获取当前模板的路径
    const tempPath = `../template/${tempName}`
    const absolutePath = path.resolve(__dirname, tempPath)

    // 2.使用ejs引擎编译模板
    ejs.renderFile(absolutePath, data, (err, result) => {
      if (err) {
        console.log("编译模板失败:", err)
        reject(err)
        return
      }

      resolve(result)
    })
  })
}

module.exports = compileEjs
