
## 对象的基本使用

### 4.1. 认识对象类型

```js
 // key: 字符串类型, 但是在定义对象的属性名时, 大部分情况下引号都是可以省略的
    var person = {
      // key: value
      name: "why",
      age: 18,
      height: 1.88,
      "my friend": {
        name: "kobe",
        age: 30
      },
      run: function() {
        console.log("running")
      },
      eat: function() {
        console.log("eat foods")
      },
      study: function() {
        console.log("studying")
      }
    }
```

### 4.2. 对象的创建方式

* 对象字面量(Object Literal):
* 通过new Object+动态添加属性;
* new 其他类;

```js
  // 1.对象字面量
    var obj1 = {
      name: "why"
    }

    // 2.new Object()
    // // Object构造函数
     var obj2 = new Object()
     obj2.name = "kobe"

    // // 3.new 其他类()
     function Person() {}
     var obj3 = new Person()
```

### 4.3. 对象的操作过程

* 获取属性
* 修改属性
* 新增属性
* 删除属性
  * delete

```js
    // 1.定义了一个对象
    var info = {
      name: "why",
      age: 18,
      friend: {
        name: "kobe",
        age: 30
      },
      running: function() {
        console.log("running~")
      }
    }

    // 2.访问对象中的属性
    // console.log(info.name)
    // console.log(info.friend.name)
    // info.running()

    // 3.修改对象中的属性
    // info.age = 25
    // info.running = function() {
    //   alert("I am running~")
    // }
    // console.log(info.age)
    // info.running()

    // 4.添加对象中的属性
    info.height = 1.88
    info.studying = function() {
      console.log("I am studying~")
    }
    console.log(info)

    // 5.删除对象中的属性
    // delete关键字(操作符)
    delete info.age
    delete info.height
    console.log(info)
```

### 4.4. 方括号的用法

* 为什么需要使用方括号呢?
  * 这是因为点符号要求 key 是有效的变量标识符
  * 不包含空格，不以数字开头，也不包含特殊字符(允许使用 $ 和 _);

```js
 var obj = {
      name: "why",
      "my friend": "kobe",
      "eating something": function() {
        console.log("eating~")
      }
    }

    console.log(obj["my friend"])
    console.log(obj.name)
    console.log(obj["name"])

    // obj["eating something"]()
    var eatKey = "eating something"
    obj[eatKey]()
```

### 4.5. 对象的遍历方式

* 普通的for循环
* Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组;
* for...in...
* for...of...(不支持):默认是不能遍历对象

```js
  var info = {
      name: "why",
      age: 18,
      height: 1.88
    }

    // console.log(Object.keys(info))

    // 对对象进行遍历
    // 1.普通for循环
    var infoKeys = Object.keys(info)
    for (var i = 0; i < infoKeys.length; i++) {
      var key = infoKeys[i]
      var value = info[key]
      console.log(`key: ${key}, value: ${value}`)
    }

    // 2.for..in..: 遍历对象
    for (var key in info) {
      var value = info[key]
      console.log(`key: ${key}, value: ${value}`)
    }

    // 对象不支持:  for..of..: 默认是不能遍历对象
    // for (var foo of info) {
    // }
```

## 内存分配

### 5.1. 内存概念理解

* 栈内存
  * 原始类型占据的空间是在栈内存中分配的;

* 堆内存
  * 对象类型占据的空间是在堆内存中分配的;

![截屏2023-06-29 14.45.54](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-29%2014.45.54.png)

* 原始类型的保存方式:

  * 在变量中保存的是值本身
  * 所以原始类型也被称之为值类型;

![截屏2023-06-29 14.46.58](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-29%2014.46.58.png)

* 对象类型的保存方式:
  * 在变量中保存的是对象的“引用”
  * 所以对象类型也被称之为引用类型;

![截屏2023-06-29 14.47.25](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-29%2014.47.25.png)

### 5.2. 现象的内存表示

```js
 // var num1 = 123
    // var num2 = 123
    // console.log(num1 === num2)

    // 1.现象一: 两个对象的比较
    // var obj1 = {}
    // var obj2 = {}
    // console.log(obj1 === obj2)
    

    // // 2.现象二: 引用的赋值
    // var info = {
    //   name: "why",
    //   friend: {
    //     name: "kobe"
    //   }
    // }

    // var friend = info.friend
    // friend.name = "james"
    // console.log(info.friend.name) // james


    // 3.现象三: 值传递
    // function foo(a) {
    //   a = 200
    // }
    // var num = 100
    // foo(num)
    // console.log(num) // 100


    // 4.现象四: 引用传递, 但是在函数中创建了一个新对象, 没有对传入对象进行修改
    // function foo(a) {
    //   a = {
    //     name: "why"
    //   }
    
    // }
    var obj = {
      name: "obj" 
    }
    foo(obj)
    console.log(obj)

    // 5.现象五: 引用传递, 但是对传入的对象进行修改
    function foo(a) {
      a.name = "why"
    }

    var obj = {
      name: "obj"
    }
    foo(obj)
    console.log(obj)
```

## 六. this的使用

### 6.1. this到底指向什么

* 在全局环境下面，this指向window;
* 通过对象调用，this指向调用的对象;

```js
    // 情况一: 如果普通的函数被默认调用, 那么this指向的就是window
    function foo(name, age) {
      console.log(arguments)
      console.log(this)
    }

    // 情况二: 如果函数它是被某一个对象来引用并且调用它, 那么this会指向这个对象(调用的那个调用)
    var obj = {
      name: "why",
      running: function() {
        console.log(this)
        // console.log(obj)
        // console.log(this === obj)
      }
    }
    obj.running()
```

* 测试题

```js
// 考验题目
    // 1.题目一:
    // var fn = obj.running
    // fn() // window

    // 2.题目二:
    function bar() {
      console.log(this) // obj对象
    }
    var obj = {
      name: "why",
      bar: bar
    }
    obj.bar()
```

### 6.2. this的作用

* 方便在一个方法中, 拿到当前对象的一些属性

```js
var info = {
      name: "why",
      age: 18,
      running: function() {
        console.log("running~", this.name)
      },
      eating: function() {
        console.log("eating~", this.name)
      },
      studying: function() {
        console.log("studying~", this.name)
      }
    }

    info.running()
    info.eating()
    info.studying()
```

## 对象的方式

### 1.1. 对象字面量

* 弊端: 重复代码

```js
// 一系列的学生对象
    // 重复代码的复用: for/函数
    var stu1 = {
      name: "why",
      age: 18,
      height: 1.88,
      running: function() {
        console.log("running~")
      }
    }
    var stu2 = {
      name: "kobe",
      age: 30,
      height: 1.98,
      running: function() {
        console.log("running~")
      }
    }
    var stu3 = {
      name: "james",
      age: 25,
      height: 2.05,
      running: function() {
        console.log("running~")
      }
    }
```

### 1.2. 工厂函数

* 一种创建对象的方式:工厂函数
* 我们可以封装一个函数，这个函数用于帮助我们创建一个对象，我们只需要重复调用这个函数即可;
* 工厂模式其实是一种常见的设计模式;

```js
// 工厂函数(工厂生产student对象) -> 一种设计模式
    // 通过工厂设计模式, 自己来定义了一个这样的函数
    function createStudent(name, age, height) {
      var stu = {}
      stu.name = name
      stu.age = age
      stu.height = height
      stu.running = function() {
        console.log("running~")
      }
      return stu
    }

    var stu1 = createStudent("why", 18, 1.88)
    var stu2 = createStudent("kobe", 30, 1.98)
    var stu3 = createStudent("james", 25, 2.05)
    console.log(stu1)
    console.log(stu2)
    console.log(stu3)
```

工厂方法创建对象有一个比较大的问题:

* 我们在打印对象时，对象的类型都是Object类型

* 但是从某些角度来说，这些对象应该有一个他们共同的类型;

下面我们来看一下另外一种模式:构造函数的方式;

### 1.3. 构造函数

 在ES5之前，我们都是通过function来声明一个构造函数(类)的，之后通过new关键字来对其进行调用;

```js

    // 在函数调用的前面加 new 关键字(操作符)
    var stu1 = new coder("why", 18, 1.88)
    var stu2 = new coder("kobe", 30, 1.98)
    console.log(stu1, stu2)

    alert("Hello")
```

* 构造函数也是一个普通的函数，从表现形式来说，和千千万万个普通的函数没有任何区别;
* 那么如果这么一个普通的函数被使用new操作符来调用了，那么这个函数就称之为是一个构造函数;

### 1.4.new操作符做了什么事情

* 如果一个函数被使用new操作符调用了，那么它会执行如下操作:
  * 在内存中创建一个新的对象(空对象);
  * 这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性;(后面详细讲);
  * 构造函数内部的this，会指向创建出来的新对象;
  * 执行函数的内部代码(函数体代码);
  * 如果构造函数没有返回非空对象，则返回创建出来的新对象;

### 1.5. 构造函数的使用

* 构造函数的使用大驼峰(首字母会大写)

## 对象的补充

### 2.1. 全局对象window

* 作用一: 查找变量时, 最终会window头上
* 作用二: JavaScript/浏览器默认提供一些变量/函数/类, 提供到window中

```js
alert()
```

* 作用三: var定义变量会被添加到window上

### 2.2. 函数也是一个对象类型

```js
function foo() {}

var bar = foo // 地址
bar()

bar.message = "Hello World"
```