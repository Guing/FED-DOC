// any类型就表示不限制标识符的任意类型, 并且可以在该标识符上面进行任意的操作(在TypeScript中回到JavaScript中)
let id: any = "aaaa"

id = "bbbb"
id = 123
console.log(id.length)

id = { name: "why", level: 99 }


// 定义数组
const infos: any[] = ["abc", 123, {}, []]

