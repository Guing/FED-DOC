interface IKun<Type = string> {
  name: Type
  age: number
  slogan: Type
}


const kunkun: IKun<string> = {
  name: "why",
  age: 18,
  slogan: "哈哈哈"
}

const ikun2: IKun<number> = {
  name: 123,
  age: 20,
  slogan: 666
}

const ikun3: IKun = {
  name: "kobe",
  age: 30,
  slogan: "坤坤加油!"
}


export {}
