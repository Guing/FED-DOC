interface IIndexType {
  // 返回值类型的目的是告知通过索引去获取到的值是什么类型
  // [index: number]: string
  [index: string]: any
  //[index: string]: string
}

// 索引签名: [index: number]: string
// const names: IIndexType = ["abc", "cba", "nba"]

// 索引签名: [index: string]: any: 没有报错
// 1.索引要求必须是字符串类型 names[0] => names["0"]
const names: IIndexType = ["abc", "cba", "nba"]

// 索引签名: [index: string]: string: 会报错
// 严格字面量赋值检测: ["abc", "cba", "nba"] => Array实例 => names[0] names.forEach
// const names: IIndexType = ["abc", "cba", "nba"]
// names["forEach"] => function
// names["map/filter"] => function

export {}

