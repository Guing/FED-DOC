// 一. 实际开发中只有进行类型推导时, 可能会自动推导出来是never类型, 但是很少使用它
// 1.一个函数是死循环
// function foo(): never {
//   // while(true) {
//   //   console.log("-----")
//   // }
//   throw new Error("1233")
// }
// foo()

// 2.解析歌词的工具
function parseLyric() {
  return []
}


// 二. 封装框架/工具库的时候可以使用一下never
// 其他时候在扩展工具的时候, 对于一些没有处理的case, 可以直接报错
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case "string":
      console.log(message.length)
      break
    case "number":
      console.log(message)
      break
    case "boolean":
      console.log(Number(message))
      break
    default:
      const check: never = message
  }
}

handleMessage("aaaa")
handleMessage(1234)

// 另外同事调用这个函数
handleMessage(true)

export {}

