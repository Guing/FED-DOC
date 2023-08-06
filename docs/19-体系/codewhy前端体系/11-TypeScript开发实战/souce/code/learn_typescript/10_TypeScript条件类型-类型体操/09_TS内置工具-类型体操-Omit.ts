interface IKun {
  name: string
  age: number
  slogan?: string
}

// 确实keys一定是可以作为key的联合类型
type HYOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never: P]: T[P]
}

// IKun都变成可选的
type IKuns = HYOmit<IKun, "slogan"|"name">


export {}
