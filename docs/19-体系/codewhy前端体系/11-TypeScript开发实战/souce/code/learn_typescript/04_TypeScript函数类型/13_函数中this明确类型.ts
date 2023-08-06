// 在设置配置选项(编译选项compilerOptions, noImplicitThis设置为true, 不允许模糊的this存在)

// 1.对象中的函数中的this
const obj = {
  name: "why",
  studying: function(this: {}) {
    // 默认情况下, this是any类型
    console.log(this, "studying")
  }
}

// obj.studying()
obj.studying.call({})


// 2.普通的函数
function foo(this: { name: string }, info: {name: string}) {
  console.log(this, info)
}

foo.call({ name: "why" }, { name: "kobe" })

export {}
