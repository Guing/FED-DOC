## **函数对象的属性**

- **我们知道JavaScript中函数也是一个对象，那么对象中就可以有属性和方法。**
  - 属性name：一个函数的名词我们可以通过name来访问；
  - 属性length：属性length用于返回函数参数的个数；
    - 是形参的个数
    - rest参数不包含
    - 有默认值的也不包含；


```js
// 定义函数
function foo(a, b, c,d=1) {}
var bar = function(m, n, ...others) {}
// 默认函数对象中已经有自己的属性
// 1.name属性
console.log(foo.name) //foo
console.log(bar.name) //bar

// 2.length属性: 参数的个数
function test() {}
test(111, 222, 333)
//length是形参的个数，不是指实参的个数
console.log(test.length) //0
//length不包含有默认值的参数
console.log(foo.length) //3
//length不包含reset参数个数
console.log(bar.length) //2

```

## **认识arguments**

- **arguments** 是一个 对应于 **传递给函数的参数** 的 **类数组(array-like)对象**。
  - arguments获取是的实参，和形参没有关系。
  - array-like意味着它不是一个数组类型，而是一个对象类型：
  - 但是它却拥有数组的一些特性，比如说length，比如可以通过index索引来访问；
  - 但是它却没有数组的一些方法，比如filter、map等；


```js
function foo(m, n) {
  // arguments 类似数组对象
  console.log(arguments);//Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  // 1.默认用法:
  // 通过索引获取内容
  console.log(arguments[0]);
  console.log(arguments[1]);

  // 可以遍历
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  for (var arg of arguments) {
    console.log(arg);
  }

  // 不能使用数组方法，比如filter
  var evenNums = arguments.filter((item) => item % 2 === 0);
  console.log(eventNums);//Uncaught TypeError: arguments.filter is not a function
}
foo(1,2)
```

### **arguments转Array**

- **在开发中，我们经常需要将arguments转成Array，以便使用数组的一些特性。**
- 常见的转化方式如下 
- **转化方式一：** 
  - 遍历arguments，添加到一个新数组中； 

- **转化方式二：
  - 调用数组slice函数的call方法； 

- **转化方式三：ES6中的两个方法** 
  - `Array.from `
  - `[…arguments] `


```js
// 2.1.将arguments转成数组方式一:
var newArguments = []
for (var arg of arguments) {
  newArguments.push(arg)
}
console.log(newArguments)

// 2.2.将arguments转成数组方式三: ES6中方式
var newArgs1 = Array.from(arguments)
console.log(newArgs1)
var newArgs2 = [...arguments]
console.log(newArgs2)

// 2.3.将arguments转成数组方式二: 调用slice方法
var newArgs = [].slice.apply(arguments);
// var newArgs = Array.prototype.slice.apply(arguments)
console.log(newArgs);
```



### **箭头函数不绑定arguments**

- **箭头函数是不绑定arguments的，所以我们在箭头函数中使用arguments会去上层作用域查找：**

```js
function foo() {
  var bar = () => {
    console.log(arguments)//Arguments(2) [111, 222, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  }
  bar()
}

foo(111, 222)
```



## **函数的剩余（rest）参数**

- **ES6中引用了rest parameter，可以将不定数量的参数放入到一个数组中：**
  - 如果最后一个参数是 ... 为前缀的，那么它会将剩余的参数放到该参数中，并且作为一个数组；


- **那么剩余参数和arguments有什么区别呢？**
  - 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参；
  - arguments对象不是一个真正的数组，而rest参数是一个真正的数组，可以进行数组的所有操作；
  - arguments是早期的ECMAScript中为了方便去获取所有的参数提供的一个数据结构，而rest参数是ES6中提供并且希望以此 来替代arguments的；

- **剩余参数必须放到最后一个位置，否则会报错。**

```js
  // 剩余参数: rest parameters
  function foo(num1, num2, ...otherNums) {
    // otherNums数组
    console.log(otherNums)
  }

  foo(20, 30, 111, 222, 333)//[111, 222, 333]
```

## **理解JavaScript纯函数**

- **函数式编程**中有一个非常重要的概念叫**纯函数**，JavaScript符合**函数式编程的范式**，所以也**有纯函数的概念**；
  - 在**react开发中纯函数是被多次提及**的；
  - 比如**react中组件就被要求像是一个纯函数**（为什么是像，因为还有class组件），**redux中有一个reducer的概念**，也是要求 必须是一个纯函数；
  - 所以**掌握纯函数对于理解很多框架的设计**是非常有帮助的；

- **纯函数的维基百科定义：**
  - 在程序设计中，若一个函数符合以下条件，那么这个函数被称为纯函数：
  - 此函数在相同的输入值时，需产生相同的输出。
  - 函数的输出和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关。
  - 该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等。

- **当然上面的定义会过于的晦涩，所以我简单总结一下：**
  - 确定的输入，一定会产生确定的输出；
  - 函数在执行过程中，不能产生副作用；


### **副作用概念的理解**

- **那么这里又有一个概念，叫做副作用**，什么又是**副作用**呢？
  - **副作用（side effect）**其实本身是医学的一个概念，比如我们经常说吃什么药本来是为了治病，可能会产生一些其他的副作 用；

  - 在计算机科学中，也引用了副作用的概念，表示在执行一个函数时，除了返回函数值之外，还对调用函数产生了附加的影响， 比如修改了全局变量，修改参数或者改变外部的存储


- **纯函数在执行的过程中就是不能产生这样的副作用：**
  - 副作用往往是产生bug的 “温床”。


### **纯函数的案例**

- **我们来看一个对数组操作的两个函数：**
  - slice：slice截取数组时不会对原数组进行任何操作,而是生成一个新的数组；
  - splice：splice截取数组, 会返回一个新的数组, 也会对原数组进行修改；

- **slice就是一个纯函数，不会修改数组本身，而splice函数不是一个纯函数；**

```js
var names = ["abc", "cba", "nba", "mba"]

// 1.slice: 纯函数
var newNames = [].slice.apply(names, [1, 3])
console.log(names)

// 2.splice: 操作数组的利器(不是纯函数)
names.splice(2, 2)
console.log(names)
```

### **判断下面函数是否是纯函数？**

- 不是纯函数，引用了外部变量，foo

![](image/Aspose.Words.237f9eab-156b-4f57-9de7-a92a98b05b8e.023.png) 

- 不是纯函数，修改了外部变量的值。

![](image/05-JavaScript%E5%87%BD%E6%95%B0%E7%9A%84%E5%A2%9E%E5%BC%BA%E7%9F%A5%E8%AF%86/Aspose.Words.237f9eab-156b-4f57-9de7-a92a98b05b8e.025.png)

- 是纯函数

![](image/Aspose.Words.237f9eab-156b-4f57-9de7-a92a98b05b8e.024.png)

### **纯函数的作用和优势**

- **为什么纯函数在函数式编程中非常重要呢？**
  - 因为你可以安心的编写和安心的使用；
  - 你在**写的时候**保证了函数的纯度，只是单纯实现自己的业务逻辑即可，不需要关心传入的内容是如何获得的或者依赖其他的 外部变量是否已经发生了修改；
  - 你在**用的时候**，你确定你的输入内容不会被任意篡改，并且自己确定的输入，一定会有确定的输出；

- React中就要求我们无论是**函数还是class声明一个组件**，这个组件都必须**像纯函数一样**，**保护它们的props不被修改：**

![](image/Aspose.Words.237f9eab-156b-4f57-9de7-a92a98b05b8e.026.png)

## **柯里化概念的理解**

- **柯里化**也是属于**函数式编程**里面一个非常重要的概念。
  - 是一种关于函数的高阶技术；
  - 它不仅被用于 JavaScript，还被用于其他编程语言；
- **我们先来看一下维基百科的解释：**
  - 在计算机科学中，**柯里化**（英语：Currying），又译为**卡瑞化**或**加里化**；
  - 是把**接收多个参数的函数**，变成**接受一个单一参数**（最初函数的第一个参数）的函数，并且**返回接受余下的参数和返回结果**的新函数的技术；

  - 柯里化声称 “如果你固定某些参数，你将得到接受余下参数的一个函数”

- **维基百科的结束非常的抽象，我们这里做一个总结：**
  - 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩余的参数
  - 这个过程就称之为柯里化；

- 柯里化是一种函数的转换，将一个函数从可调用的 f(a, b, c) 转换为可调用的f(a)(b)(c)。
  - 柯里化不会调用函数。它只是对函数进行转换。


### **柯里化的代码转换**

- **那么柯里化到底是怎么样的表现呢？**

```js
// 普通的函数
function foo1(x, y, z) {
  console.log(x + y + z)
}

foo1(10, 20, 30)

// 柯里化函数
function foo2(x) {
  return function(y) {
    return function(z) {
      console.log(x + y + z)
    }
  }
}

foo2(10)(20)(30)


// 另外一种写法: 箭头函数的写法
var foo3 = x => y => z => {
  console.log(x + y + z)
}

foo3(10)(20)(30)
```



### **柯里化优势一 - 函数的职责单一**

- **那么为什么需要有柯里化呢？**
  - 在函数式编程中，我们其实往往希望一个函数处理的问题尽可能的单一，而不是将一大堆的处理过程交给一个函数来处理；
  - 那么我们是否就可以将每次传入的参数在单一的函数中进行处理，处理完后在下一个函数中再使用处理后的结果；

- 比如上面的案例我们进行一个修改：
  - 第一个参数 + 2
  - 第二个参数 \* 2
  - 第三个参数 \*\* 2


**传入的函数需要分别被进行如下处理**

![](image/Aspose.Words.237f9eab-156b-4f57-9de7-a92a98b05b8e.029.png)

### **柯里化优势二 - 函数的参数复用**

- 另外一个使用柯里化的场景是可以帮助我们可以**复用参数逻辑**：
  - makeAdder函数要求我们传入一个num（并且如果我们需要的话，可以在这里对num进行一些修改）；
  - 在之后使用返回的函数时，我们不需要再继续传入num了；


```js
 // makeAdder函数就是对sum的柯里化
function makeAdder(count) {
  function add(num) {
    return count + num
  }
  return add
}

// 1.数字和5相加
var adder5 = makeAdder(5)
adder5(10)
adder5(15)
adder5(18)

// 2.数组和10相加
var adder10 = makeAdder(10)
adder10(10)
adder10(16)
adder10(19)
```

### **柯里化案例练习**

- **这里我们在演示一个案例，需求是打印一些日志：**
- 日志包括时间、类型、信息；
  -  案例一: 打印一些日志
    - 信息一: 日志的时间
    - 信息二: 日志的类型: info/debug/feature
    - 信息三: 具体的信息

- 普通函数的实现方案如下：

```js
 // 1.没有柯里化的时候做法
function logInfo(date, type, message) {
  console.log(`时间:${date} 类型:${type} 内容:${message}`)
}

// 打印日志
logInfo("2022-06-01", "DEBUG", "修复界面搜索按钮点击的bug")

// 又修复了一个bug
logInfo("2022-06-01", "DEBUG", "修复了从服务器请求数据后展示的bug")
logInfo("2022-06-01", "DEBUG", "修复了从服务器请求数据后展示的bug")
logInfo("2022-06-01", "DEBUG", "修复了从服务器请求数据后展示的bug")

logInfo("2022-06-01", "FEATURE", "增加了商品的过滤功能")
```

- 实现了柯里化的方案：

```js
// 2.对函数进行柯里化: 柯里化函数的做法
// var logInfo = date => type => message => {
//   console.log(`时间:${date} 类型:${type} 内容:${message}`)
// }
function logInfo(date) {
  return function(type) {
    return function(message) {
      console.log(`时间:${date} 类型:${type} 内容:${message}`)
    }
  }
}

var logToday = logInfo("2022-06-01")
var logTodayDebug = logToday("DEBUG")
var logTodayFeature = logToday("FEATURE")

// 打印debug日志
logTodayDebug("修复了从服务器请求数据后展示的bug")
logTodayDebug("修复界面搜索按钮点击的bug")
logTodayDebug("修复界面搜索按钮点击的bug")
logTodayDebug("修复界面搜索按钮点击的bug")
logTodayDebug("修复界面搜索按钮点击的bug")

logTodayFeature("新建过滤功能")
logTodayFeature("新建搜索功能")
```

### **柯里化高级 - 自动柯里化函数**

- 目前我们有将多个普通的函数，转成柯里化函数：

```js

    function foo(x, y, z) {
      console.log(x + y + z)
    }

    function sum(num1, num2) {
      return num1 + num2
    }

    function logInfo(date, type, message) {
      console.log(`时间:${date} 类型:${type} 内容:${message}`)
    }

    // 手动转化

    // 封装函数: 自动转化柯里化过程(有一点难度)
    function hyCurrying(fn) {
      function curryFn(...args) {
        // 两类操作:
        // 第一类操作: 继续返回一个新的函数, 继续接受参数
        // 第二类操作: 直接执行fn的函数
        if (args.length >= fn.length) { // 执行第二类
          // return fn(...args)
          return fn.apply(this, args)
        } else { // 执行第一类
          return function(...newArgs) {
            // return curryFn(...args.concat(newArgs))
            return curryFn.apply(this, args.concat(newArgs))
          }
        }
      }

      return curryFn
    }

    // 对其他的函数进行柯里化
    var fooCurry = hyCurrying(foo)
    fooCurry(10)(20)(30)
    fooCurry(55, 12, 56)

    var sumCurry = hyCurrying(sum)
    var sum5 = sumCurry(5)
    console.log(sum5(10))
    console.log(sum5(15))
    console.log(sum5(18))

    var logInfoCurry = hyCurrying(logInfo)
    logInfoCurry("2022-06-01")("DEBUG")("我发现一个bug, 哈哈哈哈")
```

## **组合函数概念的理解**

- **组合（Compose）函数**是在JavaScript开发过程中一种对**函数的使用技巧、模式**：
  - 比如我们现在需要对某一个数据进行函数的调用，执行两个函数fn1和fn2，这两个函数是依次执行的；
  - 那么如果每次我们都需要进行两个函数的调用，操作上就会显得重复；
  - 那么是否可以将这两个函数组合起来，自动依次调用呢？

- 这个过程就是对函数的组合，我们称之为 组合函数（Compose Function）；

```js
  var num = 100

    // 第一步对数字*2
    function double(num) {
      return num * 2
    }

    // 第二步对数字**2
    function pow(num) {
      return num ** 2
    }

    console.log(pow(double(num)))
    console.log(pow(double(55)))
    console.log(pow(double(22)))

    // 将上面的两个函数组合在一起, 生成一个新的函数
    function composeFn(num) {
      return pow(double(num))
    }

    console.log(composeFn(100))
    console.log(composeFn(55))
    console.log(composeFn(22))
```

### **实现组合函数**

- **刚才我们实现的compose函数比较简单**
- **我们需要考虑更加复杂的情况：比如传入了更多的函数，在调用compose函数时，传入了更多的参数：**

```js


// 封装的函数: 你传入多个函数, 我自动的将多个函数组合在一起挨个调用
function composeFn(...fns) {
  // 1.边界判断(edge case)
  var length = fns.length
  if (length <= 0) return
  for (var i = 0; i < length; i++) {
    var fn = fns[i]
    if (typeof fn !== "function") {
      throw new Error(`index position ${i} must be function`)
    }
  }

  // 2.返回的新函数
  return function(...args) {
    var result = fns[0].apply(this, args)
    for (var i = 1; i < length; i++) {
      var fn = fns[i]
      result = fn.apply(this, [result])
    }
    return result
  }
}
// 第一步对数字*2
function double(num) {
  return num * 2
}

// 第二步对数字**2
function pow(num) {
  return num ** 2
}
var newFn = composeFn(double, pow, console.log)
newFn(100)
newFn(55)
newFn(22)
```

## **with语句的使用**

- **with语句** 扩展一个语句的作用域链。
- 不建议使用with语句，因为它可能是混淆错误和兼容性问题的根源。

```js
  var obj = {
      message: "Hello World"
    }

    with (obj) {
      console.log(message)
    }
```

## **eval函数**

- **内建函数 eval 允许执行一个代码字符串。**
  - eval是一个特殊的函数，它可以将传入的字符串当做JavaScript代码来运行；
  - eval会将最后一句执行语句的结果，作为返回值；


- **不建议在开发中使用eval：**
  - eval代码的可读性非常的差（代码的可读性是高质量代码的重要原则）；
  - eval是一个字符串，那么有可能在执行的过程中被刻意篡改，那么可能会造成被攻击的风险；
  - eval的执行必须经过JavaScript解释器，不能被JavaScript引擎优化；


```js
var message = "Hello World"
var codeString = `var name = "why"; console.log(name); console.log(message); "abc";`
var result = eval(codeString)
console.log(result)
```



## **认识严格模式**

- **JavaScript历史的局限性：**
  - 长久以来，JavaScript 不断向前发展且并未带来任何兼容性问题；
  - 新的特性被加入，旧的功能也没有改变，这么做有利于兼容旧代码；
  - 但缺点是 JavaScript 创造者的任何错误或不完善的决定也将永远被保留在 JavaScript 语言中；

- 在ECMAScript5标准中，JavaScript提出了**严格模式的概念（Strict Mode）**：
  - 严格模式很好理解，是一种具有限制性的JavaScript模式，从而使代码隐式的脱离了 ”懒散（sloppy）模式“；
  - 支持严格模式的浏览器在检测到代码中有严格模式时，会以更加严格的方式对代码进行检测和执行；
  - 严格模式对正常的JavaScript语义进行了一些限制：
  - 严格模式通过 抛出错误 来消除一些原有的 静默（silent）错误；
  - 严格模式让JS引擎在执行代码时可以进行更多的优化（不需要对一些特殊的语法进行处理）；
  - 严格模式禁用了在ECMAScript未来版本中可能会定义的一些语法；

### **开启严格模式**

- **那么如何开启严格模式呢？严格模式支持粒度话的迁移：**
  - 可以支持在js文件中开启严格模式；
  - 也支持对某一个函数开启严格模式；

- **严格模式通过在文件或者函数开头使用 use strict 来开启。**

- **没有类似于 "no use strict" 这样的指令可以使程序返回默认模式。**
- 现代 JavaScript 支持 “class” 和 “module” ，它们会自动启用 use strict；

```html
<script>
  // 给整个script开启严格模式
  "use strict"

  // 给一个函数开启严格模式
  function foo() {
    "use strict"
  }


  class Person {

  }


</script>
```

**严格模式限制**

- **这里我们来说几个严格模式下的严格语法限制：**
  - JavaScript被设计为新手开发者更容易上手，所以有时候本来错误语法，被认为也是可以正常被解析的；
  - 但是这种方式可能给带来留下来安全隐患；
  - 在严格模式下，这种失误就会被当做错误，以便可以快速的发现和修正；

- **1. 无法意外的创建全局变量**

```js
      "use strict";
      // 1.不会意外创建全局变量
      function foo() {
        message = "Hello World";
      }

      foo();
      console.log(message);
```



- **2. 严格模式会使引起静默失败(silently fail,注:不报错也没有任何效果)的赋值操作抛出异常**

- **3. 严格模式下试图删除不可删除的属性**

```js
"use strict";
var obj = {
  name: "why",
};

Object.defineProperty(obj, "name", {
  writable: false,
  configurable: false,
});

obj.name = "kobe"   // 2.发现静默错误
console.log(obj.name);
delete obj.name //删除不可删除的属性
console.log(obj);
```



- **4.严格模式不允许函数参数有相同的名称**

```js
"use strict";      
// 3.参数名称不能相同
      function foo(num, num) {

      }
```



- **5. 不允许0的八进制语法**

```js
"use strict";     
// 4.不能以0开头
      console.log(0o123)
```



- **6. 在严格模式下，不允许使用with**

- **7. 在严格模式下，eval不再为上层引用变量**

```js
"use strict";    
eval(`var message = "Hello World"`)
console.log(message)
```



- **8. 严格模式下，this绑定基础类型不会默认转成包装对象，this不会默认绑定window，this可以绑定null,undefined**

```js
"use strict";  
function foo() {
  console.log(this);
}
foo()//undefined
foo.apply("abc");//abc
foo.apply(123);//123
foo.apply(undefined);//undefined
foo.apply(null);//null
```



## **手写apply、call、bind函数实现**

- **接下来我们来实现一下apply、call、bind函数：**
- 注意：我们的实现是练习函数、this、调用关系，不会过度考虑一些边界情况

```js
// 1.给函数对象添加方法: hyapply
Function.prototype.hyapply = function(thisArg, otherArgs) {
  // this -> 调用的函数对象
  // thisArg -> 传入的第一个参数, 要绑定的this
  // console.log(this) // -> 当前调用的函数对象
  // this.apply(thisArg)

  thisArg.fn = this

  // 1.获取thisArg, 并且确保是一个对象类型
  thisArg = (thisArg === null || thisArg === undefined)? window: Object(thisArg)

  // thisArg.fn = this
  Object.defineProperty(thisArg, "fn", {
    enumerable: false,
    configurable: true,
    value: this
  })
  thisArg.fn(...otherArgs)

  delete thisArg.fn
}
foo.hyapply({ name: "why" }, ["james", 25])
foo.hyapply(123, ["why", 18])
foo.hyapply(null, ["kobe", 30])
```

```js
// 2.给函数对象添加方法: hycall
Function.prototype.hycall = function(thisArg, ...otherArgs) {
  // 1.获取thisArg, 并且确保是一个对象类型
  thisArg = (thisArg === null || thisArg === undefined)? window: Object(thisArg)

  // thisArg.fn = this
  Object.defineProperty(thisArg, "fn", {
    enumerable: false,
    configurable: true,
    value: this
  })
  thisArg.fn(...otherArgs)

  delete thisArg.fn
}

foo.hycall({ name: "why", fn: "abc" }, "james", 25)
foo.hycall(123, "why", 18)
foo.hycall(null, "kobe", 30)
```

```js
// 实现hybind函数
function foo(name, age, height, address) {
  console.log(this, name, age, height, address)
}


Function.prototype.hybind = function(thisArg, ...otherArgs) {
  // console.log(this) // -> foo函数对象
  thisArg = thisArg === null || thisArg === undefined ? window: Object(thisArg)
  Object.defineProperty(thisArg, "fn", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: this
  })

  return (...newArgs) => {
    // var allArgs = otherArgs.concat(newArgs)
    var allArgs = [...otherArgs, ...newArgs]
    thisArg.fn(...allArgs)
  }
}

var newFoo = foo.hybind("abc", "kobe", 30)
newFoo(1.88, "广州市")
newFoo(1.88, "广州市")
newFoo(1.88, "广州市")
newFoo(1.88, "广州市")
```

