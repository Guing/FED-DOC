type IKun = "sing" | "dance" | "rap"

// 确实keys一定是可以作为key的联合类型
type HYExtract<T, E> = T extends E? T: never

// IKun都变成可选的
type IKuns = HYExtract<IKun, "rap"|"dance">


export {}
