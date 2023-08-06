type IDType = number | string

// 判断number是否是extendsIDType
// const res = 2 > 3? true: false
type ResType = boolean extends IDType? true: false

// 举个栗子: 函数的重载
// function sum(num1: number, num2: number): number
// function sum(num1: string, num2: string): string

// 错误的做法: 类型扩大化
// function sum(num1: string|number, num2: string|number): string

function sum<T extends number | string>(num1: T, num2: T): T extends number? number:string
function sum(num1, num2) {
  return num1 + num2
}

const res = sum(20, 30)
const res2 = sum("abc", "cba")
// const res3 = sum(123, "cba")

export {}

