interface IIndexType {
  [bbb: string]: any
}

const nums: IIndexType = ["abc", "cba", "nba"]
// 通过数字类型访问索引时, 最终都是转化成string类型访问
const num1 = nums[0]
console.log(num1)

const info: IIndexType = { name: "why", age: 18 }
const name = info["name"]
console.log(name)

export {}
