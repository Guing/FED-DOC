## JavaScript基础

### 2.1. 编写JavaScript的位置

* html属性当中
* script元素内容
* 外部引入独立js文件

```html
 <!-- 1.编写位置一: 编写在html内部(了解) -->
  <a href="#" onclick="alert('百度一下')">百度一下</a>
  <a href="javascript: alert('百度一下')">百度一下</a>


  <!-- 2.编写位置二: 编写在script元素之内 -->
  <a class="google" href="#">Google一下</a>

  <script>
    var googleAEl = document.querySelector(".google")
    googleAEl.onclick = function() {
      alert("Google一下")
    }
  </script>

  <!-- 3.编写位置三: 独立的js文件 -->
  <a class="bing" href="#">bing一下</a>
  <script src="./js/bing.js"></script>

```

### 2.2. noscript

```html
<noscript>
    <h1>您的浏览器不支持JavaScript, 请打开或者更换浏览器~</h1>
  </noscript>
```

### 2.3. 编写JavaScript注意事项

* script必须是双标签元素
  * 引入, 不要在里面写内容
* type属性, 省略
* 加载顺序
* 严格区分大小写
* defer/async后续讲解

### 2.4. 浏览器交互方式

* alert
* console.log
* document.write
* prompt

```javascript
 // 1.交互方式一: alert函数
    alert("Hello World");

    // 2.交互方式二: console.log函数, 将内容输出到控制台中(console)
    // 使用最多的交互方式
    console.log("Hello Coderwhy");

    // 编写的JavaScript代码出错了
    // message.length

    // 3.交互方式三: document.write()
    document.write("Hello Kobe");

    // 4.交互方式四: prompt函数, 作用获取用户输入的内容
    var result = prompt("请输入你的名字: ");
    alert("您刚才输入的内容是:" + result);
```

### 2.5. chrome调试工具补充

### 2.6. JavaScript注释的写法

* 单行注释
* 多行注释
* 文档注释

```javascript
// 1.单行注释

    // 2.多行注释
    /* 
     我是一行注释
     我是另外一行注释
    */

    // 3.文档注释
    /
     * 和某人打招呼
     * @param {string} name 姓名
     * @param {number} age 年龄
     */
    function sayHello(name, age) {

    }

    sayHello()
```

### 2.7. 插件和配置

* react
* 配置{}

## 变量和数据类型

### 3.1. 变量的理解

* 程序中数据不断变量
* 盒子, 存储某一个东西

### 3.2. 变量的定义

* 变量命名规则:必须遵守
  * 1.第一个字符必须是一个字母、下划线( _ )或一个美元符号( $ )

* 2.其他字符可以是字母、下划线、美元符号或数字
* 3.不能使用关键字和保留字命名:<https://developer.mozilla.org/zh-CN/docs/web/javascript/reference/lexical_grammar>
* 4.变量严格区分大小写

* 变量命名规范:建议遵守

  * 多个单词使用驼峰标识;
  * 赋值 = 两边都加上一个空格;
  * 一条语句结束后加上分号;
    * 也有很多人的习惯是不加;

  * 变量应该做到见名知意;

```javascript
 // 定义一个变量
    // 第一步： 变量的声明（高级js引擎接下来我要定义一个变量）
    // var关键字
    // 第二步: 变量的赋值(使用=赋值即可)
    // var currentTime = "16:00"

    // 其他的写法一:
    // var currentTime;
    // currentTime = "16:02";
    // currentTime = "17:00";

    // 其他的写法二: 同时声明多个变量(不推荐, 阅读性比较差)
    // var name, age, height
    // name = "why"
    // age = 18
    // height = 1.88
    var name = "why", age = 18, height = 1.88;

    // 补充:
    // 1.当我们打印变量时, 实际上是在打印变量中保存的值
    // 2.console.log(参数1, 参数2, 参数3...........)
    console.log(name, age, height);
```

### 3.3. 变量的练习

定义两个变量保存两个数字, 对两个变量中的数字进行交换,不借助于第三个变量完成交换

```javascript
var num1 = 10
var num2 = 20

// 方法二: 不借助于第三个变量完成交换(了解, 笔试面试题)
console.log("交换前, num1, num2:", num1, num2)
num1 = num1 + num2 // num1: 30, num2: 20
num2 = num1 - num2 // num1: 30, num2: 10
num1 = num1 - num2 // num1: 20, num2: 10
console.log("交换后, num1, num2:", num1, num2)
```

### 3.4. 变量的注意

* 如果一个变量未声明就使用的话, 那么会报错
* 如果一个变量有声明, 但是没有赋值, 那么值undefined
* 不使用var也可以声明变量(不推荐)

### 3.5. 认识数据类型-动态类型-常见的数据类型

* 在 JavaScript 中有 8 种基本的数据类型(7 种原始类型和 1 种复杂类型)

* 7 种原始类型

  * number 用于任何类型的数字:整数或浮点数。
  * string 用于字符串:一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。
  * boolean 用于 true 和 false。
  * undefined 用于未定义的值 —— 只有一个 undefined 值的独立类型。
  * null 用于未知的值 —— 只有一个 null 值的独立类型。
  * symbol 用于唯一的标识符。
  * bigint 用于任意长度的整数。

* 1 种复杂类型

  * object 用于更复杂的数据结构。

### 3.6. typeof操作符

* 对一个值使用 typeof 操作符会返回下列字符串之一:
  * "undefined"表示值未定义;
  * "boolean"表示值为布尔值;
  * "string"表示值为字符串;
  * "number"表示值为数值;
  * "object"表示值为对象(而不是函数)或 null;
  * "function"表示值为函数;
  * “symbol”表示值为符号;

* typeof是操作符, 不是一个函数

## 数据类型

### 1.1. Number

* 除了常规的数字，还包括所谓的“特殊数值(“special numeric values”)”也属于Number类型(了解)
  * Infinity:代表数学概念中的 无穷大 ∞，也可以表示-Infinity;
  * 比如 1/0 得到的就是无穷大;
* NaN:NaN 代表一个计算错误，它是一个错误的操作所得到的结果;
  * 比如 字符串和一个数字相乘;
* 数字表示的范围:
  * 最小正数值:Number.MIN_VALUE，这个值为: 5e-324，小于这个的数字会被转化为0
  * 最大正数值:Number.MAX_VALUE，这个值为: 1.7976931348623157e+308

```javascript
   // 1.Number类型的基本使用
    var age = 18
    var height = 1.88

    // 2.特殊的数值
    // Infinity
    var num1 = Infinity
    var num2 = 1 / 0
    console.log(num1, num2)

    // NaN: not a number(不是一个数字)
    var result = 3 * "abc"
    console.log(result)
    console.log(isNaN(result))

    // 3.进制表示
    var num3 = 100 // 十进制
    // 了解
    var num4 = 0x100 // 十六进制
    var num5 = 0o100 // 八进制
    var num6 = 0b100 // 二进制
    console.log(num4, num5, num6)

    // 5.数字可以表示的范围
    var max = Number.MAX_VALUE
    var min = Number.MIN_VALUE
    console.log(max, min)
```

### 1.2. String

* 单引号

* 双引号

* 反引号

  * ${}

* 转义字符

  ![截屏2023-06-28 16.46.26](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-28%2016.46.26.png)

* 字符串补充

  * +连接
  * 长度: length

```javascript
    // 1.String基本使用
    var name = "coderwhy"
    var address = "广州市"
    var intro = "认真是一种可怕的力量!"

    // 2.别的引号的使用
    // 单引号
    var message1 = 'Hello World'
    // 双引号
    var message2 = "Hello World"
    // 反引号(ES6新增语法)
    // ${变量/表达式}
    var message3 = `Hello World, ${name}, ${2 + 3}`

    // 3.转义字符: 字符串本身中包含引号
    var message4 = 'my name is "coderwhy"'
    console.log(message4)

    var message5 = 'my name \\ \'\' is "coderwhy"'
    console.log(message5)

    // 4.<字符串>本身有的方法和属性
    var message = "Hello World"
    console.log(message.length)

    // 字符串操作
    var nickname = "coderwhy"
    var info = "my name is "
    var infoStr = `my name is ${nickname}` // 推荐(babel)
    var infoStr2 = info + nickname
    console.log(infoStr, infoStr2)
```

### 1.3. Boolean

* true/false

### 1.4. Undefined

* undefined
* 注意:
  * 如果一个变量声明但是没有初始化(赋值), 那么默认是undefined(不推荐)
  * 不用显示的为一个变量赋值为undefined

### 1.6. Object类型

* 复杂类型/引用类型

```js
var book = {
name: "JavaScript高级程序设置",
price: 98
}
```

### 1.7. Null类型

* null类型通常用来表示一个对象为空，所以通常我们在给一个对象进行初始化时，会赋值为null;

* null和undefined的区别
  * undefined变量声明但是没有初始化(赋值), 那么默认是undefined
  * 当一个变量准备保存一个对象，但是这个对象不确定时，我们可以先赋值为null;
  * null在对象初始化时会经常使用

### 1.8. String类型转换

* 隐式转换:
  * +操作, 只要有一个是字符串类型, 另外一个就会自动转成字符串类型

```js
var num = 123
var numStr = num + ""
```

* 显示转换:
  * String()
  * 调用toString()方法

```javascript
   var num1 = 123
    var age = 18
    var isAdmin = true

    // 1.转换方式一: 隐式转换(用的非常多)
    var num1Str = num1 + ""
    var ageStr = age + ""
    var isAdminStr = isAdmin + ""
    console.log(typeof num1Str, typeof ageStr, typeof isAdminStr)

    // 2.转换方式一: 显示转换
    var num1Str2 = String(num1)
    console.log(typeof num1Str2)
```

### 1.9. Number类型转换

* 隐式转换:
  * 在算数运算中，通常会将其他类型转换成数字类型来进行运算;
    * 比如 "6" / "2"; "6" * "2";
    * 但是如果是+运算，并且其中一边有字符串，那么还是按照字符串来连接的;
* 显示转换:
  * Number()
* 其他类型转换数字的规则:

![截屏2023-06-28 16.53.00](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-28%2016.53.00.png)

```javascript
 // 方式一: 隐式转换(用的很少)
    var num1 = "8"
    var num2 = "4"
    var result1 = num1 + num2 // 84
    console.log(typeof result1)

    var result2 = num1 * num2
    console.log(result2)

    // 方式二: 显示转换(Number())
    var result3 = Number(num1)
    console.log(typeof result3)

    // 其他类型转成数字类型的规则:
    console.log(Number(undefined)) // NaN
    console.log(Number(true)) // 1
    console.log(Number(false)) // 0
    console.log(Number(null)) // 0
    console.log(Number("abc123")) // NaN
    console.log(Number("         123       ")) // 123
    console.log(Number("")) // 0
```

### 1.10. Boolean类型转换

* 隐式转换:
  * 直观上为空的内容, 转成Boolean类型就是false
    * 0/""/undefined/null/NaN
  * 其他的值是true
    * 123
* 显示转换:
  * Boolean()
* 注意:包含 0 的字符串 "0" 是 true
* 一些编程语言(比如 PHP)视 "0" 为 false。但在 JavaScript 中，非空的字符串总是 true。

```javascript
 // 方式一: 隐式转换
    // 分支语句
    var isAdmin = true
    var num1 = 123 // true

    // 方式二: 显示转换
    console.log(Boolean(num1), Boolean(undefined))

    // 转换有如下的规则: 
    // 直观上为空的值, 转成Boolean类型都是false
    // 直观上为空的值: 0/""/undefined/null/NaN -> false

    // 注意事项
    console.log(Boolean("")) // false
    console.log(Boolean("0")) // true
```

## 常见运算符

### 2.1. 运算符/运算元

### 2.2. 算术运算符

* % 取余
* ES7新增

![截屏2023-06-28 16.57.04](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-28%2016.57.04.png)

### 2.3. 赋值运算符

* =赋值运算符
* 原地修改
  * +=/*=

![截屏2023-06-28 16.59.30](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-28%2016.59.30.png)

### 2.4. 自增/自减

* ++/--
* 自增/自减只能应用于变量。
  * 将其应用于数值(比如 5++)则会报错。

* 位置

```javascript
 var currentIndex = 5
    // 自己自增或者自减是没有区别
    // ++currentIndex
    // console.log(currentIndex)
    // --currentIndex
    // console.log(currentIndex)

    // 自增和自减表达式本身又在其他的表达式中, 那就有区别
    // var result1 = 100 + currentIndex++
    // console.log(currentIndex)
    // console.log("result1:" + result1)
    
    var result2 = 100 + ++currentIndex
    console.log(currentIndex)
    console.log("result2:" + result2)
```

### 2.5. 比较运算符

* `>`

```js
<><=>= == !=
```

==和===的区别

* ==: 在类型不相同的情况, 会对运算元进行隐式的转换
  * 大部分情况下, 都是转成数字类型 toNumber()
  * 对象类型相对比较特殊, 一般返回false
  * <https://262.ecma-international.org/5.1/#sec-11.9.3>
* ===: 先比较类型, 类型不一致, 直接返回false
  * 严格相等

```javascript
 var foo1 = 0
    var foo2 = ""

    // ==运算符, 在类型不相同的情况下, 会将运算元先转成Number的值, 再进行比较(隐式转换)
    // null比较特殊: null在进行比较的时候, 应该是会被当成一个对象和原生类型进行比较的
    console.log(Number(foo1))
    console.log(Number(foo2))
    console.log(foo1 == foo2)

    // ===运算符, 在类型不相同的情况, 直接返回false
    console.log(foo1 === foo2)
```

### 2.6. 运算符的优先级

运算符放到一起使用时会有一定的优先级:

 在MDN上给出了所有运算符的优先级(不用去记)
<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence>

## 分支语句

### 1.1. if..else

* 如果if语句对应的代码块, 只有一行代码, 那么{}可以省略

```javascript
    if (weight > 5) totalPrice -= 8
```

### 1.2. if..else if..else

### 1.3. 三元运算符

```js
condition ? value1: value2;
```

### 1.4. 逻辑运算符

#### 1.4.1. 逻辑运算符的基本使用

#### 1.4.2. 逻辑或的本质

* ||(或)两个竖线符号表示“或”运算符(也称为短路或):
  * 从左到右依次计算操作数。
  * 处理每一个操作数时，都将其转化为布尔值(Boolean);
  * x如果结果是 true，就停止计算，返回这个操作数的初始值。
  * 如果所有的操作数都被计算过(也就是，转换结果都是 false)，则返回最后一个操作数。

* 注意:返回的值是操作数的初始形式，不会转换为Boolean类型。
* 换句话说，一个或运算 || 的链，将返回第一个真值，如果不存在真值，就返回该链的最后一个值。

```js
var result = name || info || "默认值"
```

```javascript
  /*
      1.先将运算元转成Boolean类型
      2.对转成的boolean类型进行判断
        * 如果为true, 直接将结果(原始值)返回
        * 如果为false, 进行第二个运算元的判断
        * 以此类推
      3.如果找到最后, 也没有找到, 那么返回最后一个运算元
    */
    // var name = "why"
    // name || 运算元2 || 运算元3


    // 本质推导一: 之前的多条件是如何进行判断的
    var chineseScore = 95
    var mathScore = 99
    // chineseScore > 90为true, 那么后续的条件都不会进行判断
    if (chineseScore > 90 || mathScore > 90) {}

    // 本质推导二: 获取第一个有值的结果
    var info = "abc"
    var obj = {name: "why"}
    var message = info || obj || "我是默认值"
    console.log(message.length)
```

#### 1.4.3. 逻辑与的本质

* &&(或)两个竖线符号表示“与”运算符(也称为短路与):
  * 从左到右依次计算操作数。
  * 在处理每一个操作数时，都将其转化为布尔值(Boolean);
  * 如果结果是 false，就停止计算，并返回这个操作数的初始值(一般不需要获取到初始值);
  * 如果所有的操作数都被计算过(例如都是真值)，则返回最后一个操作数。

* 换句话说，与运算 返回第一个假值，如果没有假值就返回最后一个值。

```javascript
info && info.friend && info.friend.eating && info.friend.eating()
```

```javascript
 /*
      也可以脱离条件判断来使用
      逻辑与的本质
       1.拿到第一个运算元, 将运算元转成Boolean类型
       2.对运算元的Boolean类型进行判断
         * 如果false, 返回运算元(原始值)
         * 如果true, 查找下一个继续来运算
         * 以此类推
       3.如果查找了所有的都为true, 那么返回最后一个运算元(原始值)
    */

    // 本质推导一: 逻辑与, 称之为短路与
    var chineseScore = 80
    var mathScore = 99
    if (chineseScore > 90 && mathScore > 90) {}

    // 本质推导二: 对一些对象中的方法进行有值判断
    var obj = {
      name: "why",
      friend: {
        name: "kobe",
        eating: function() {
          console.log("eat something")
        }
      }
    }

    // 调用eating函数
    // obj.friend.eating()
    obj && obj.friend && obj.friend.eating && obj.friend.eating()
```

#### 1.4.4. 逻辑非的补充

* 两个非运算 !! 有时候用来将某个值转化为布尔类型:
* 也就是，第一个非运算将该值转化为布尔类型并取反，第二个非运算再次取反。
* 最后我们就得到了一个任意值到布尔值的转化。

```js
    var message = "Hello World"
    console.log(Boolean(message))
    console.log(!!message)
```

### 1.5. switch语句

* 基本使用

  与if语句不同的是，switch语句只能做值的相等判断(使用全等运算符 ===)，而if语句可以做值的范围判断;

* case穿透

  * 一条case语句结束后，会自动执行下一个case的语句;这种现象被称之为case穿透;
  * 通过在每个case的代码块后添加break关键字来解决这个问题;

* 注意事项:这里的相等是严格相等。被比较的值必须是相同的类型才能进行匹配。

## 循环语句

### 2.1. 认识循环结构

### 2.2. while循环

```javascript
练习二: 打印0~99的数字
    var count = 0
    while (count < 100) {
      console.log(count)
      count++
    }
```

### 2.3. do..while循环

```javascript
 // do..while语法结构
    // do {

    // } while (条件)

    // 练习一: 打印10次Hello World
    var count = 0
    do {
      console.log("Hello World")
      count++
    } while (count < 10)

    // 练习二: 计算0~99的数字和
    var count = 0
    var totalCount = 0
    do {
      totalCount += count
      count++
    } while (count < 100)
    console.log("totalCount:", totalCount)
```

### 2.4. for循环

```javascript
  /*
      1.首先, 会先执行var count = 0;
      2.根据条件执行代码
        * count < 3
        * alert(count) // 0 1 2
        * count++
    */
    for (var count = 0; count < 3; count++) {
      alert(count)
    }
```

### 2.5. for循环的嵌套

```javascript
 // 在屏幕上显示一个❤
    // document.write("❤")

    // 案例一: 
    for (var i = 0; i < 9; i++) {
      document.write("<div>")
      
      for (var m = 0; m < 10; m++) {
        document.write("❤ ")
      }

      document.write("</div>")
    }
```

### 2.6. 循环的控制

* break: 直接跳出循环, 循环结束
  * 如果多层循环嵌套，则只会跳出本层循环

* continue: 跳过本次循环次, 执行下一次循环体

```javascript
 var names = ["abc", "cba", "nba", "mba", "bba", "aaa", "bbb"]
    
    // 循环遍历数组
    // break关键字的使用
    // 需求: 遇到nba时, 不再执行后续的迭代
    for (var i = 0; i < 4; i++) {
      console.log(names[i],":")
      for (let j = names.length-1; j >=0; j--) {
        if (names[j] === "nba") {
          break
        }
        console.log(names[j])
      }
      
    }

    // continue关键字的使用: 立刻结束本次循环, 执行下一次循环(step)
    // 需求: 不打印nba
    // for (var i = 0; i < 7; i++) {
    //   if (names[i] === "nba" || names[i] === "cba") {
    //     continue
    //   }
    //   console.log(names[i])
    // }
```

### 2.7. 猜数字游戏

```javascript
 // 1.随机生成一个0~99的数字
    var randomNum = Math.floor(Math.random() * 100)
    alert(randomNum)

    // 2.玩家有7次机会猜测数字
    var isSuccess = false
    var count = 3
    for (var i = 0; i < count; i++) {
      // 获取用户的输入
      var inputNum = Number(prompt("请输入您猜测的数字:"))

      // 和randomNum进行比较
      if (inputNum === randomNum) {
        alert("恭喜您, 猜对了")
        isSuccess = true
        break
      } else if (inputNum > randomNum) {
        alert("您猜大了")
      } else {
        alert("您猜小了")
      }

      if (i === count - 1) {
        alert("您的次数已经用完了")
      }
    }
```

## foo/bar/baz术语

* 在学习编程的过程中，你可能会经常看到foo、bar、baz这些名词:
  * 它们通常被用来作为函数、变量、文件的名词;
  * 目前已经编程了计算机编程的术语一部分;
  * 但是它们本身并没有特别的用途和意义;

* 常被称之为 “伪变量”(metasyntactic variable)
* 总之，foo、bar、baz已经是编程领域非常常用的名词。我个人也比较习惯在写一些变量、函数名词时使用这些词汇，大家做一个了解;

```javascript
 var foo = "xxxxxx"
    function bar() {

    }
    var baz = {

    }
```
