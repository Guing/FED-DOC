## **错误处理⽅案**

- **开发中我们会封装⼀些⼯具函数，封装之后给别⼈使⽤：**
  - 在其他⼈使⽤的过程中， 可能会传递⼀些参数 ；
  - 对于函数来说，需要 对这些参数进⾏验证 ，否则可能得到的是我们不想要的结果；

- **很多时候我们可能验证到不是希望得到的参数时，就会直接 return：**
  - 但是 return存在很⼤的弊端： 调⽤者不知道是因为函数内部没有正常执⾏ ，还是执⾏结果就是⼀个 undefined；  
  - 事实上，正确的做法应该是 如果没有通过某些验证，那么应该让外界知道函数内部报错 了；

- **如何可以让⼀个函数告知外界⾃⼰内部出现了错误呢？**  
  - 通过 throw关键字 ，抛出⼀个异常；
- **throw语句：**
  - throw语句⽤于抛出⼀个⽤户⾃定义的异常 ；
  - 当 遇到 throw语句 时， 当前的函数执⾏会被停⽌ （ throw后⾯的语句不会执⾏）；

- **如果我们执⾏代码，就会报错，拿到错误信息的时候我们可以及时的去修正代码。**

```js
// 1.遇到一个错误, 造成后续的代码全部不能执行
  // function foo() {
  //   "abc".filter()

  //   console.log("第15行代码")
  //   console.log("-------")
  // }

  // foo()
  // console.log("+++++++++")

  // const btn = document.querySelector("button")
  // btn.onclick = function() {
  //   console.log("监听btn的点击")
  // }

  // 2.自己封装一些工具
  function sum(num1, num2) {
    if (typeof num1 !== "number") {
      throw "type error: num1传入的类型有问题, 必须是number类型"
    }

    if (typeof num2 !== "number") {
      throw "type error: num2传入的类型有问题, 必须是number类型"
    }

    return num1 + num2
  }

  // 李四调用
  const result = sum(123, 321)
```



## **throw关键字**

- **throw表达式就是在 throw后⾯可以跟上⼀个表达式来表示具体的异常信息：**

![](image/18-Error-%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86%E6%96%B9%E6%A1%88/Aspose.Words.707f12fa-c407-4cfc-9196-ae768917788d.025.png)

- **throw关键字可以跟上哪些类型呢？**
  - 基本数据类型 ：⽐如 number、 string、 Boolean  对象类型 ：

  - 对象类型：对象类型可以包含更多的信息

- **但是每次写这么⻓的对象⼜有点麻烦，所以我们可以创建⼀个类：**

```js
class HYError {
  constructor(message, code) {
    this.errMessage = message
    this.errCode = code
  }
}

// throw抛出一个异常
// 1.函数中的代码遇到throw之后, 后续的代码都不会执行
// 2.throw抛出一个具体的错误信息
function foo() {
  console.log("foo function1")
  // 1.number/string/boolean
  // throw "反正就是一个错误"

  // 2.抛出一个对象
  // throw { errMessage: "我是错误信息", errCode: -1001 }
  // throw new HYError("错误信息", -1001)

  // 3.Error类: 错误函数的调用栈以及位置信息
  throw new Error("我是错误信息")

  console.log("foo function2")
  console.log("foo function3")
  console.log("foo function4")
}

function bar() {
  foo()
}

bar()
```

## **Error类型**

- **事实上， JavaScript已经给我们提供了⼀个 Error类，我们可以直接创建这个类的对象：**

![](image/18-Error-%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86%E6%96%B9%E6%A1%88/Aspose.Words.707f12fa-c407-4cfc-9196-ae768917788d.027.png)

- **Error包含三个属性：**
  - messsage：创建 Error对象时传⼊的 message；

  - name： Error的名称，通常和类的名称⼀致；

  - stack：整个 Error的错误信息，包括函数的调⽤栈，当我们直接打印 Error对象时，打印的就是 stack；

- **Error有⼀些⾃⼰的⼦类：**  
  - RangeError：下标值越界时使⽤的错误类型； 
  -  SyntaxError：解析语法错误时使⽤的错误类型；  
  - TypeError：出现类型错误时，使⽤的错误类型；


## **异常的处理**

- **我们会发现在之前的代码中，⼀个函数抛出了异常，调⽤它的时候程序会被强制终⽌：**
  - 这是因为如果我们在调⽤⼀个函数时，这个函数 抛出了异常 ，但是我们 并没有对这个异常进⾏处理 ，那么这个 异常会继续传递到上⼀个函数调⽤ 中；
  - ⽽如果 到了最顶层（全局）的代码中依然没有对这个异常的处理代码 ，这个时候就会报错并且终⽌程序的运⾏；


- **我们先来看⼀下这段代码的异常传递过程：**
  - foo函数在被执⾏时会抛出异常，也就是我们的 bar函数会拿到这个异常；

  - 但是 bar函数并没有对这个异常进⾏处理，那么这个异常就会被继续传递到调⽤ bar函数的函数，也就是 test函数；

  - 但是 test函数依然没有处理，就会继续传递到我们的全局代码逻辑中；

  - 依然没有被处理，这个时候程序会终⽌执⾏，后续代码都不会再执⾏了；

```js
function foo() {
  console.log("foo function1")
   throw new Error("我是错误信息")
  console.log("foo function2")
  console.log("foo function3")
  console.log("foo function4")
}

function bar() {
  
    foo()
  
}

function test() {
  bar()
}

test() //后面的不会执行了

console.log("--------")
```



## **异常的捕获**

- **但是很多情况下当出现异常时，我们并不希望程序直接推出，⽽是希望可以正确的处理异常：** 
  -  这个时候我们就 可以使⽤ try catch

- 在 ES10（ ES2019）中， catch后⾯绑定的 error可以省略。
- **当然，如果有⼀些必须要执⾏的代码，我们可以使⽤ finally来执⾏：**  
  - finally表示最终⼀定会被执⾏的代码结构；
- **注意：如果 try和 finally中都有返回值，那么会使⽤ finally当中的返回值；**

```js
function foo() {
  console.log("foo function1")
  // throw new Error("我是错误信息")
  console.log("foo function2")
  console.log("foo function3")
  console.log("foo function4")
}

function test() {
  // 自己捕获了异常的话, 那么异常就不会传递给浏览器, 那么后续的代码可以正常执行
  try {
    foo()
    console.log("try后续的代码")
  } catch(error) {
    console.log("catch中的代码")
    // console.log(error)
  } finally {
    console.log("finally代码")
  }
}

function bar() {
  test()
}

bar()

console.log("--------")

```

