

## 函数的基本使用

### 2.1. 函数的定义

* 函数的声明
* 函数的调用

### 2.2. 函数的参数

* 形参和实参
* 形参(参数 parameter):定义 函数时，小括号中的参数，是用来接收参数用的，在函数内部 作为变量使用
* 实参(参数 argument):调用 函数时，小括号中的参数，是用来把数据传递到 函数内部 用的

### 2.3. 函数的返回值

* 如果函数中没有使用 return语句 ，那么函数有默认的返回值:undefined;
* 如果函数使用 return语句，但是return后面没有任何值，那么函数的返回值也是:undefined;

### 2.4. 函数的练习

## 二. arguments参数的使用

* 默认情况下，函数中有一个arguments变量
  * arguments对象是所有(非箭头)函数中都可用的局部变量;
  * 该对象中存放着所有的调用者传入的参数，从0位置开始，依次存放;
  * arguments变量的类型是一个object类型( array-like )，不是一个数组，但是和数组的用法看起来很相似;
  * 如果调用者传入的参数多余函数接收的参数，可以通过arguments去获取所有的参数;

```javascript
 // 1.arguments的认识
    function foo(name, age) {
      console.log("传入的参数", name, age)

      // 在函数中都存在一个变量, 叫arguments
      console.log(arguments)
      // arguments是一个对象
      console.log(typeof arguments)
      // 对象内部包含了所有传入的参数
      // console.log(arguments[0])
      // console.log(arguments[1])
      // console.log(arguments[2])
      // console.log(arguments[3])

      // 对arguments来进行遍历
      for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i])
      }
    }

    foo("why", 18, 1.88, "广州市")
```

## 三. 递归的使用

### 3.1. 函数调用函数

### 3.2. 递归的思想

* 递归必须有结束条件
* 案例: pow
  * for循环
  * 递归实现

```javascript
// 二. 递归实现方式(必须有一个结束条件)
    // 缺点: 性能是比较低(占用过多的栈内存)
    // 优点: 写出来的代码非常简洁
    function pow(x, n) {
      return x * pow(x, n-1)
    }

    console.log(pow(2, 3))
    console.log(pow(3, 3))
```

### 3.3. 斐波那契

* 介绍斐波那契数列
* 递归实现
* for循环

```javascript
 // 什么是斐波那契数列
    // 数列: 1 1 2 3 5 8 13 21 34 55  ... x
    // 位置: 1 2 3 4 5 6 7  8  9  10  ... n

    // 1.斐波那契的递归实现
    function fibonacci(n) {
      if (n === 1 || n === 2) return 1
      return fibonacci(n-1) + fibonacci(n-2)
    }


    // 2.斐波那契的for循环实现
    function fibonacci(n) {
      // 特殊的情况(前两个数字)
      if (n === 1 || n === 2) return 1

      // for循环的实现
      var n1 = 1
      var n2 = 1
      var result = 0
      for (var i = 3; i <= n; i++) {
        result = n1 + n2
        n1 = n2
        n2 = result
      }
      return result
    }

    console.log(fibonacci(5))
    console.log(fibonacci(10))
    console.log(fibonacci(20))
```

## 四. 变量作用域

### 4.1. 什么叫做作用域

* ES5之前是没有块级作用域(var定义变量)
* 函数的作用域

```javascript
 // 1.作用域的理解:message在哪一个范围内可以被使用, 称之为message的作用域(scope)
    // 全局变量: 全局作用域
    var message = "Hello World"
    if (true) {
      console.log(message)
    }
    function foo() {
      console.log("在foo中访问", message)
    }
    foo()

    // 2.ES5之前是没有块级作用域(var定义的变量是没有块级作用域)
    {
      var count = 100
      console.log("在代码块中访问count:", count)
    }
    console.log("在代码块外面访问count:", count)
    // for循环的代码块也是没有自己的作用域
    for (var i = 0; i < 3; i++) {
      var foo = "foo"
    }
    console.log("for循环外面访问foo:", foo)
    console.log("for循环外面访问i:", i) // 3

    // 3.ES5之前函数代码块是会形成自己的作用域
    // 意味着在函数内部定义的变量外面是访问不到的
    function test() {
      var bar = "bar"
    }

    test()
    // console.log("test函数外面访问bar:", bar)

    // 函数有自己的作用域: 函数内部定义的变量只有函数内部能访问到
    function sayHello() {
      var nickname = "kobe"
      console.log("sayHello函数的内部:", nickname)
      
      function hi() {
        console.log("hi function~")
        console.log("在hi函数中访问nickname:", nickname)
      }
      hi()
    }
    sayHello()
    // console.log("sayHello外面访问nickname:", nickname)

```

### 4.2. 全局/局部/外部变量

```javascript
 // 1.全局变量(global variable): 在全局(script元素中)定义一个变量, 那么这个变量是可以在定义之后的任何范围内被访问到的, 那么这个变量就称之为是一个全局变量.
    var message = "Hello World"
    
    // 在函数中访问message
    function sayHello() {
      // 外部变量(outer variable): 在函数内部去访问函数之外的变量, 访问的变量称之为外部变量
      console.log("sayHello中访问message:", message)

      // 2.局部变量(local variable): 在函数内部定义的变量, 只有在函数内部才能进行访问, 称之为局部变量
      var nickname = "coderwhy"

      function hi() {
        console.log("hi function~")
        // message也是一个外部变量
        console.log("hi中访问message:", message)
        // nickname也是一个外部变量
        console.log("hi中访问nickname:", nickname)
      }
      hi()
    }


    

    sayHello()
```

### 4.3. 变量的访问顺序

## 函数表达式的写法

* 函数表达式一般使用匿名函数

```javascript
 // 函数的声明(声明语句)
    foo()
    function foo() {
      console.log("foo函数被执行了~")
    }

    // 函数的表达式
    // console.log(message) // undefined
    // var message = "why"

    // console.log(bar)
    bar()
    var bar = function() {
      console.log("bar函数被执行了~")
    }
```

* 如果使用具名函数，则不可以直接访问具名函数的名称。

![截屏2023-06-29 13.26.16](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-29%2013.26.16.png)

### 函数声明 vs 函数表达式

函数的声明和函数表达式有什么区别

* 首先，语法不同:
  * 函数声明:在主代码流中声明为单独的语句的函数。
  * 函数表达式:在一个表达式中或另一个语法结构中创建的函数。
* 其次，JavaScript创建函数的时机是不同的:
  * 函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用。
  * 在函数声明被定义之前，它就可以被调用。
  * 这是内部算法的原故;
  * 当 JavaScript 准备 运行脚本时，首先会在脚本中寻找全局函数声明，并创建这些函数;
* 开发中如何选择呢?
  * 当我们需要声明一个函数时，首先考虑函数声明语法。
  * 它能够为组织代码提供更多的灵活性，因为我们可以在声明这些函数之前调用这些函数。

## 函数式编程中概念

### 概念一：函数作为一等公民

* 头等函数(first-class function;第一级函数)
* 是指在程序设计语言中，函数被当作头等公民。
* 这意味着，函数可以作为别的函数的参数、函数的返回值，赋值给变量或存储在数据结构中;
* 有人主张也应包括支持匿名函数(待会儿会讲到);

```javascript
 // 函数作为一等(头等)公民
    // 1.函数可以被赋值给变量(函数表达式写法)
    var foo1 = function() {
      console.log("foo1函数被执行~")
    }
    // foo1()

    // 2.让函数在变量之间来回传递
    // var foo2 = foo1
    // foo2()


    // 3.函数可以另外一个函数的参数
    // function bar(fn) {
    //   console.log("fn:", fn)
    //   fn()
    // }
    // bar(foo1)


    // 4.函数作为另外一个函数的返回值
    // function sayHello() {
    //   function hi() {
    //     console.log("hi kobe")
    //   }
    //   return hi
    // }

    // var fn = sayHello()
    // fn()


    // 5.将函数存储在另外一个数据结构中
    var obj = {
      name: "why",
      eating: function() {
        console.log("eating")
      }
    }
    obj.eating()
```

### 概念二：函数式编程

* 通常我们对作为头等公民的编程方式，称之为函数式编程
* JavaScript就是符合函数式编程的语言，这个也是JavaScript的一大特点;

### 概念三：函数的回调

* 将一个作为另外一个函数的参数传入到另外一个函数中；
* 在另外一个函数中，对于传入的函数进行调用的过程，就叫做函数的回调

```javascript
 // 1.函数回调的概念理解
    // function foo(fn) {
    //   // 通过fn去调用bar函数的过程, 称之为函数的回调
    //   fn()
    // }
    // function bar() {
    //   console.log("bar函数被执行了~")
    // }
    // foo(bar)


    // 2.函数回调的案例
    // function request(url, callback) {
    //   console.log("根据URL向服务器发送网络请求")
    //   console.log("需要花费比较长的时间拿到对应的结果")
    //   var list = ["javascript", "javascript学习", "JavaScript高级编程"]
    //   callback(list)
    // }

    // function handleResult(res) {
    //   console.log("在handleResult中拿到结果:", res)
    // }
    // request("url", handleResult)


    // 3.函数回调的案例重构
    function request(url, callback) {
      console.log("根据URL向服务器发送网络请求")
      console.log("需要花费比较长的时间拿到对应的结果")
      var list = ["javascript", "javascript学习", "JavaScript高级编程"]
      callback(list)
    }

    // 传入的函数是没有名字, 匿名函数
    request("url", function(res) {
      console.log("在handleResult中拿到结果:", res)
    })
```

### 概念四：匿名函数

* 传入一个函数时，如果没有给函数名，也没有定义对应的变量的函数，就叫做匿名函数

### 概念五：高阶函数

* foo可以接受另外一个函数参数，那么foo就称之为是一个高阶函数；
* 如果一个函数有返回另外一个函数，那么这个函数也叫做高阶函数；

```js
function foo(fn) {
fn()
}

foo(function() {

})
```

## 立即执行函数

* 什么是立即执行函数?
  * 专业名字:Immediately-Invoked Function Expression(IIFE 立即调用函数表达式)
  * 表达的含义是一个函数定义完后被立即执行;
* 立即执行函数示例
  * 第一部分是定义了一个匿名函数，这个函数有自己独立的作用域。
  * 第二部分是后面的()，表示这个函数被执行了

```javascript
 // 立即执行函数(常用的写法)
    (function() { 
      console.log("立即执行函数被调用~")
    })()
```

* 立即执行函数必须是一个表达式(整体)，不能是函数声明(了解即可):
  * 下面的这种写法会报错，因为是一个函数声明，不是一个函数表达式;
  * 当圆括号出现在匿名函数的末尾想要调用函数时，它会默认将函数当成是函数声明。

```javascript
   function foo() {
      console.log("foo函数被执行~")
    }()
```

* 当圆括号包裹函数时，它会默认将函数作为表达式去解析，而不是函数声明。
  * 下面是一个函数表达式，所以可以执行

```javascript
 var result = (function(name) {
      console.log("函数立刻被执行~", name)
      return "Hello World"
    })("why")
    console.log(result)
```

* 其他立即执行函数的写法

```javascript
    // 1.常见的写法
    // (function() {
    //   console.log("立即执行函数被调用~")
    // })()


    // 2.错误的写法
    // () -> 优先级的()
    // function foo() {
    // }()

    // 3.其他写法
    // 匿名函数
    (function(fn) {
      console.log("立即执行函数被调用")
    }());

    // +(正号)-(符号)!(取反) - 了解
    +function foo() {}()
```

### 立即执行函数的作用

* 会创建一个独立的执行上下文环境，
  * 可以避免外界访问或修改内部的变量，
  * 也避免了对内部变量的修改
  * 防止全局变量的命名冲突

```javascript
// 应用场景一: 防止全局变量的命名冲突
    
    // 立即执行函数和普通的代码有什么区别?
    // 在立即执行函数中定义的变量是有自己的作用域的
    (function() {
      var message = "Hello World"
      // console.log(message)
    })()
    // console.log(message)
    // var message = "Hello World"
    // console.log(message)
```

* 通过闭包与立即执行函数作为：一组dom元素点击事件的监听函数。创建一个作用域保存i的值

```javascript
    // 使用立即执行函数
    var btnEls = document.querySelectorAll(".btn")
    for (var i = 0; i < btnEls.length; i++) {
      var btn = btnEls[i];
      (function(m) {
        btn.onclick = function() {
          console.log(`按钮${m+1}发生了点击`)
        }
      })(i)
    }

    console.log(i)
```

## 代码规范

## debug调试技巧(总结)
