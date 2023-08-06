// y就是一个可选参数
// 可选参数类型是什么? number | undefined 联合类型
function foo(x: number, y?: number) {
  if (y !== undefined) {
    console.log(y + 10)
  }
}

foo(10)
foo(10, 20)

export {}

