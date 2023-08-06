// TypeScript对于传入的函数类型的多余的参数会被忽略掉(the extra arguments are simply ignored.)
type CalcType = (num1: number, num2: number) => number
function calc(calcFn: CalcType) {
  calcFn(10, 20)
}

calc(function(num) {
  return 123
})

// forEach栗子:
const names = ["abc", "cba", "nba"]
names.forEach(function(item) {
  console.log(item.length)
})

// TS对于很多类型的检测报不报错, 取决于它的内部规则
// TS版本在不断更新: 在进行合理的类型检测的情况, 让ts同时更好用(好用和类型检测之间找到一个平衡)
// 举一个栗子:
interface IPerson {
  name: string
  age: number
}

// typescript github issue, 成员
const p = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}

const info: IPerson = p

export {}

