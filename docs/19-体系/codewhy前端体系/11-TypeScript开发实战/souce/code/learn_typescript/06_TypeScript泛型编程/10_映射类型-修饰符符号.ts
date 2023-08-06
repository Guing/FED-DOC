type MapPerson<Type> = {
  -readonly [Property in keyof Type]-?: Type[Property]
}

interface IPerson {
  name: string
  age?: number
  readonly height: number
  address?: string
}

// 
type IPersonRequired = MapPerson<IPerson>

const p: IPersonRequired = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}


export {}

