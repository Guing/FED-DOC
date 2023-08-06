function foo<T, E>(arg1: T, arg2: E) {

}

foo(10, 20)
foo(10, "abc")
foo<string, { name: string }>("abc", { name: "why" })

export {}
