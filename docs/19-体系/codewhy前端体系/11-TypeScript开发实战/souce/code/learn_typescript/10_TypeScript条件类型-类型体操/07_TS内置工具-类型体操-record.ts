interface IKun {
  name: string
  age: number
  slogan?: string
}

// 类型体操
// name | age | slogan
type keys = keyof IKun
type Res = keyof any // => number|string|symbol

// 确实keys一定是可以作为key的联合类型
type HYRecord<Keys extends keyof any, T> = {
  [P in Keys]: T
}


// IKun都变成可选的
type t1 = "上海" | "北京" | "洛杉矶"
type IKuns = HYRecord<t1, IKun>

const ikuns: IKuns = {
  "上海": {
    name: "xxx",
    age: 10
  },
  "北京": {
    name: "yyy",
    age: 5
  },
  "洛杉矶": {
    name: "zzz",
    age: 3
  }
}

export {}
