// interface IPerson {
//   name: string
//   age: number
//   height: number
// }

// const p: IPerson = {
//   name: "why",
//   age: 18,
//   height: 1.88
// }

// console.log(p.address)

// 1.索引签名的理解
// interface InfoType {
//   // 索引签名: 可以通过字符串索引, 去获取到一个值, 也是字符串
//   [key: string]: string
// }
// function getInfo(): InfoType {
//   const abc: any = "hahah"
//   return abc
// }


// const info = getInfo()
// const name = info["name"]
// console.log(name, info.age, info.address)


// 2.索引签名的案例
interface ICollection {
  [index: number]: string
  length: number
}

function printCollection(collection: ICollection) {
  for (let i = 0; i < collection.length; i++) {
    const item = collection[i]
    console.log(item.length)
  }
}

const array = ["abc", "cba", "nba"]
const tuple: [string, string] = ["why", "广州"]
printCollection(array)
printCollection(tuple)

export {}

