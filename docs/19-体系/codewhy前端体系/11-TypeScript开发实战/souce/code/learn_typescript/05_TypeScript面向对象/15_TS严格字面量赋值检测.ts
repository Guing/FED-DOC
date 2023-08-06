interface IPerson {
  name: string
  age: number
}


// 1.奇怪的现象一: 
// 定义info, 类型是IPerson类型
const obj = {
  name: "why",
  age: 18,

  // 多了一个height属性
  height: 1.88
}
const info: IPerson = obj


// 2.奇怪的现象二:
function printPerson(person: IPerson) {

}
const kobe = { name: "kobe", age: 30, height: 1.98 }
printPerson(kobe)


// 解释现象
// 第一次创建的对象字面量, 称之为fresh(新鲜的)
// 对于新鲜的字面量, 会进行严格的类型检测. 必须完全满足类型的要求(不能有多余的属性)
const obj2 = {
  name: "why",
  age: 18,

  height: 1.88
}

const p: IPerson = obj2

export {}
