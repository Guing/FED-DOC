type IKun = "sing" | "dance" | "rap" | null | undefined

// 确实keys一定是可以作为key的联合类型
type HYNonNullable<T> = T extends null|undefined ? never: T

// IKun都变成可选的
type IKuns = HYNonNullable<IKun>

export {}
