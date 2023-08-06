const names = ["abc", "cba", "nba"]

// 了解即可: 基于上下文类型推导的函数中的返回值如果是void类型, 并且不强制要求不能返回任何的东西
names.forEach((item: string, index: number, arr: string[]) => {
  console.log(item)
  return 123
})
