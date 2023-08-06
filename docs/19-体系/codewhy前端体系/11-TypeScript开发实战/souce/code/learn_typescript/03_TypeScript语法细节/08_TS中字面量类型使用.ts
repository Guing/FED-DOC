// 1.字面量类型的基本上
const name: "why" = "why"
let age: 18 = 18

// 2.将多个字面量类型联合起来 |
type Direction = "left" | "right" | "up" | "down"
const d1: Direction = "left"

// 栗子: 封装请求方法
type MethodType = "get" | "post"
function request(url: string, method: MethodType) {
}

request("http://codercba.com/api/aaa", "post")

// TS细节
// const info = {
//   url: "xxxx",
//   method: "post"
// }
// 下面的做法是错误: info.method获取的是string类型
// request(info.url, info.method)

// 解决方案一: info.method进行类型断言
// request(info.url, info.method as "post")

// 解决方案二: 直接让info对象类型是一个字面量类型
// const info2: { url: string, method: "post" } = {
//   url: "xxxx",
//   method: "post"
// }
const info2 = {
  url: "xxxx",
  method: "post"
} as const
// xxx 本身就是一个string
request(info2.url, info2.method)

export {}

