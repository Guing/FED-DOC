// 1.在TS中如果一个函数没有任何的返回值, 那么返回值的类型就是void类型
// 2.如果返回值是void类型, 那么我们也可以返回undefined(TS编译器允许这样做而已)
function sum(num1: number, num2: number): void {
  console.log(num1 + num2)

  // return 123 错误的做法
}


// 应用场景: 用来指定函数类型的返回值是void
type LyricInfoType = { time: number, text: string }
// parseLyric函数的数据类型: (lyric: string) => LyricInfoType[]
function parseLyric(lyric: string): LyricInfoType[] {
  const lyricInfos: LyricInfoType[] = []
  // 解析
  return lyricInfos
}

// parseLyric => 函数/对象
type FooType = () => void
const foo: FooType = () => {}


// 举个例子:(涉及函数的类型问题, 后续还会详细讲解)
// 1.定义要求传入的函数的类型
type ExecFnType = (...args: any[]) => void

// 2.定义一个函数, 并且接收的参数也是一个函数, 而且这个函数的类型必须是ExecFnType
function delayExecFn(fn: ExecFnType) {
  setTimeout(() => {
    fn("why", 18)
  }, 1000);
}

// 3.执行上面函数, 并且传入一个匿名函数
delayExecFn((name, age) => {
  console.log(name, age)
})

export {}