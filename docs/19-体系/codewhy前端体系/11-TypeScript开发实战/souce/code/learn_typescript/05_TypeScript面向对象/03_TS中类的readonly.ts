class Person {
  readonly name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

// 类和实例之间的关系(重要)
const p = new Person("why", 18)
console.log(p.name, p.age)

// p.name = "kobe" 只读属性不能进行写入操作
p.age = 20

export {}
