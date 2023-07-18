## **异步处理方案**

- **学完了我们前面的Promise、生成器等，我们目前来看一下异步代码的最终处理方案。**
- **案例需求：**
  - 我们需要向服务器发送网络请求获取数据，一共需要发送三次请求；
  - 第二次的请求url依赖于第一次的结果；
  - 第三次的请求url依赖于第二次的结果；
  - 依次类推；

- 方案一：
  - 通过回调，但是层层嵌套，造成回调地狱 (callback hell)

- 方案二：
  - 通过Promise，实现链式调用，但是代码不够直观，阅读性比较差的


```js
// 封装请求的方法: url -> promise(result)
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 2000)
  })
}



/*
  需求: 
    1.发送一次网络请求, 等到这次网络请求的结果
    2.发送第二次网络请求, 等待这次网络请求的结果
    3.发送第三次网络请求, 等待这次网络请求的结果
*/
// 方式一: 层层嵌套(回调地狱 callback hell)
function getData() {
  // 1.第一次请求
  requestData("why").then(res1 => {
    console.log("第一次结果:", res1)

    // 2.第二次请求
    requestData(res1 + "kobe").then(res2 => {
      console.log("第二次结果:", res2)

      // 3.第三次请求
      requestData(res2 + "james").then(res3 => {
        console.log("第三次结果:", res3)
      })
    })
  })
}

// 方式二: 使用Promise进行重构(解决回调地狱)
// 链式调用
function getData() {
  requestData("why").then(res1 => {
    console.log("第一次结果:", res1)
    return requestData(res1 + "kobe")
  }).then(res2 => {
    console.log("第二次结果:", res2)
    return requestData(res2 + "james")
  }).then(res3 => {
    console.log("第三次结果:", res3)
  })
}
```

### **Generator方案解决异步问题**

- 但是上面的代码其实看起来也是阅读性比较差的，有没有办法可以继续来对上面的代码进行优化呢？

```js
function requestData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
        }, 2000)
    })
}

function* getData() {
    const res1 = yield requestData("why")
    console.log(res1);
    const res2 = yield requestData(res1 + "kobe")
    console.log(res2);
    const res3 = yield requestData(res2 + "kobe")
    console.log(res3);
}

//通过next控制函数的执行，等到requestData有结果之后，再继续执行。
let generator = getData();
generator.next().value.then((res1) => {
    generator.next(res1).value.then(res2 => {
        generator.next(res2).value.then(res3 => {
            generator.next(res3)
        })
    })
})
```

### **自动执行generator函数**

- **目前我们的写法有两个问题：**
  - 第一，我们不能确定到底需要调用几层的Promise关系；
  - 第二，如果还有其他需要这样执行的函数，我们应该如何操作呢？

- **所以，我们可以封装一个工具函数execGenerator自动执行生成器函数：**

```js
// 自动化执行生成器函数(了解)
function execGenFn(genFn) {
  // 1.获取对应函数的generator
  const generator = genFn()
  // 2.定义一个递归函数
  function exec(res) {
    // result -> { done: true/false, value: 值/undefined }
    const result = generator.next(res)
    if (result.done) return
    result.value.then(res => {
      exec(res)
    })
  }
  // 3.执行递归函数
  exec()
}

execGenFn(getData)
```

### async/await的解决方案

- Async/await本质上是对generator方案的语法糖。

```js
 async function getData() {
      const res1 = await requestData("why")
      console.log("res1:", res1)

      const res2 = await requestData(res1 + "kobe")
      console.log("res2:", res2)

      const res3 = await requestData(res2 + "james")
      console.log("res3:", res3)
    }

    const generator = getData()
```

## async与await

### **异步函数 async function**

- **async关键字⽤于声明⼀个异步函数：**
  - async是 asynchronous单词的缩写，异步、⾮同步； 

- **async异步函数可以有很多中写法：**

```js
const bar = async function() {}
const baz = async () => {}
class Person {
  async running() {}
}
```



### **异步函数的返回值**

- 异步函数的内部代码执⾏过程和普通的函数是⼀致的，默认情况下也是会被同步执⾏。
- 异步函数有返回值时，和普通函数会有区别：
  - 情况⼀： 异步函数也可以有返回值，但是**异步函数的返回值相当于被包裹到 Promise.resolve中**；
  - 情况⼆： 如果我们的异步函数的**返回值是 Promise，状态由会由 Promise决定**；
  - 情况三： 如果我们的异步函数的**返回值是⼀个对象并且实现了 thenable，那么会由对象的 then⽅法来决定**；


```js
 // 2.异步函数
    async function foo2() {
      // 1.返回一个普通的值
      // -> Promise.resolve(321)
      return ["abc", "cba", "nba"]

      // 2.返回一个Promise
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve("aaa")
      //   }, 3000)
      // })

      // 3.返回一个thenable对象
      // return {
      //   then: function(resolve, reject) {
      //     resolve("bbb")
      //   }
      // }
    }

    foo2().then(res => {
      console.log("res:", res)
    })
```

### 异步函数的异常

- **如果我们在 async中抛出了异常，那么程序它并不会像普通函数⼀样报错，⽽是会作为 Promise的 reject来传递；**
- 此时，如果没有在调用之后使用catch函数或者使用`try...catch`时，浏览器会报错。

```js
// 如果异步函数中有抛出异常(产生了错误), 这个异常不会被立即浏览器处理
// 进行如下处理: Promise.reject(error)
async function foo() {
  console.log("---------1")
  console.log("---------2")
  // "abc".filter()
  throw new Error("coderwhy async function error")
  console.log("---------3")

  // return new Promise((resolve, reject) => {
  //   reject("err rejected")
  // })

  return 123
}

// promise -> pending -> fulfilled/rejected
foo().then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("coderwhy err:", err)
  console.log("继续执行其他的逻辑代码")
})
```



### **await关键字**

- async函数另外⼀个特殊之处 就是可以在它内部 使⽤ await关键字 ，⽽ 普通函数中是不可以 的。
- await关键字有什么特点呢？
  - 通常使⽤ await是后⾯会 跟上⼀个表达式 ，这个 **表达式会返回⼀个 Promise**；
  - 那么 await会 等到 **Promise的状态变成 fulfilled状态 ，之后 继续执⾏异步函数** ；

- **如果 await后⾯是⼀个 普通的值 ，那么会 直接返回这个值** ；
- **如果 await后⾯是⼀个 thenable的对象 ，那么会根据对象的 then⽅法调⽤来决定后续的值 ；**
- **如果 await后⾯的表达式，返回的 Promise是 reject的状态 ，那么会将这个 reject结果直接作为函数的 Promise的 reject值 ；**
- await的使用条件:
  -  在异步函数中使用
  - 在顶层的es模块中使用。


```js
// 2.await关键字
// await条件: 必须在异步函数中使用
function bar() {
  console.log("bar function")
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(123)
    }, 100000)
  })
}

async function foo() {
  console.log("-------")
  // await后续返回一个Promise, 那么会等待Promise有结果之后, 才会继续执行后续的代码
  const res1 = await bar()
  console.log("await后面的代码:", res1)
  const res2 = await bar()
  console.log("await后面的代码:", res2)

  console.log("+++++++")
}

foo()
```

