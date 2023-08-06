import { price, date } from "./utils/format";
import { sum } from "./utils/math";

// 导入的是类型, 推荐在类型的前面加上type关键
// import type { IDType, IPerson } from "./utils/type"

console.log(sum(20, 30))

// type IDType = number | string

const id1: IDType = 111
const p: IPerson = { name: "why", age: 18 }
// tsconfig => includes

// 使用命名空间中的内容
price.format("1111")
date.format("22222")

// let doc: Document;
// let promise = new Promise()

// document.querySelector()

document

