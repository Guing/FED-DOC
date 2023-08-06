// 1.理解形参和实例参数化, 但是参数的类型是固定的
// function foo(name: string, age: number) {

// }
// foo("why", 19)
// foo("kobe", 30)


// 2.定义函数: 将传入的内容返回
// number/string/{name: string}
function bar<Type>(arg: Type): Type {
  return arg
}

// 2.1. 完整的写法
const res1 = bar<number>(123)
const res2 = bar<string>("abc")
const res3 = bar<{name: string}>({ name: "why" })

// 2.2. 省略的写法
const res4 = bar("aaaaaaaaa")
const res5 = bar(11111111)

// let message = "Hello World"
