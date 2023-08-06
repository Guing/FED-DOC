interface IKun {
  name: string
  age: number
  slogan?: string
}

// 类型体操
type HYReadonly<T> = {
  readonly [P in keyof T]: T[P] 
}


// IKun都变成可选的
type IKun2 = HYReadonly<IKun>

export {}
