type MapPerson<Type> = {
  readonly [Property in keyof Type]?: Type[Property]
}

interface IPerson {
  name: string
  age: number
  height: number
  address: string
}

type IPersonOptional = MapPerson<IPerson>

const p: IPersonOptional = {

}

export {}

