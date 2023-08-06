type IKun = "sing" | "dance" | "rap"

// 确实keys一定是可以作为key的联合类型
type HYExclude<T, E> = T extends E? never: T

// IKun都变成可选的
type IKuns = HYExclude<IKun, "rap">


export {}
