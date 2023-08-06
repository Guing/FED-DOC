class Person {
  // 语法糖
  constructor(public name: string, private _age: number, readonly height: number) {
  }

  running() {
    console.log(this._age, "eating")
  }
}

const p = new Person("why", 18, 1.88)
console.log(p.name, p.height)

// p.height = 1.98

export {}
