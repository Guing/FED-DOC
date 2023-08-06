// 回顾: 联合类型
type ID = number | string
const id1: ID = "abc"
const id2: ID = 123

// 交叉类型: 两种(多种)类型要同时满足
type NewType = number & string // 没有意义

interface IKun {
  name: string
  age: number
}

interface ICoder {
  name: string
  coding: () => void
}

type InfoType = IKun & ICoder

const info: InfoType = {
  name: "why",
  age: 18,
  coding: function() {
    console.log("coding")
  }
}
