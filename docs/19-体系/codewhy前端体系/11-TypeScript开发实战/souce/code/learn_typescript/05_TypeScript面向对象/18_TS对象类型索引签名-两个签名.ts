interface IIndexType {
  // 两个索引类型的写法
  [index: number]: string
  [key: string]: any

  // 要求一:下面的写法不允许: 数字类型索引的类型, 必须是字符串类型索引的类型的 子类型
  // 结论: 数字类型必须是比如字符串类型更加确定的类型(需要是字符串类型的子类型)
  // 原因: 所有的数字类型都是会转成字符串类型去对象中获取内容
  // 数字0: number|string, 当我们是一个数字的时候, 既要满足通过number去拿到的内容, 不会和string拿到的结果矛盾
  // 数字"0": string

  // 数字0: string
  // 数字"0": number|string
  // [index: number]: number|string
  // [key: string]: string

  // 要求二: 如果索引签名中有定义其他属性, 其他属性返回的类型, 必须符合string类型返回的属性
  // [index: number]: string
  // [key: string]: number|string

  // aaa: string
  // bbb: boolean 错误的类型
}

const names: IIndexType = ["abc", "cba", "nba"]
const item1 = names[0]
const forEachFn = names["forEach"]

names["aaa"]

export {}

