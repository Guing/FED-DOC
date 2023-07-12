## 对象和函数的原型

### **认识对象的原型**

- **JavaScript当中每个对象都有一个特殊的内置属性[[prototype]]**，这个特殊的对象可以指向另外一个对象。


- **对象的原型获取的方式有两种：**
  - 方式一：通过对象的 **\_\_proto\_\_** 属性可以获取到（但是这个是早期浏览器自己添加的，存在一定的**兼容性问题**）；
  - 方式二：通过 **Object.getPrototypeOf** 方法可以获取到；
- **对象的原型的作用**
  - 当我们通过引用对象的属性key来获取一个value时，它会触发 [[Get]]的操作；
  - 这个操作会首先检查该对象是否有对应的属性，如果有的话就使用它；
  - 如果对象中没有属性，那么会访问对象[[prototype]]内置属性指向的对象上的属性；

```js

var obj = {
  name: "why",
  age: 18
}
console.log(obj)

// 疑问: 这个原型有什么用呢?
// 当我们通过[[get]]方式获取一个属性对应的value时
// 1> 它会优先在自己的对象中查找, 如果找到直接返回
// 2> 如果没有找到, 那么会在原型对象中查找
console.log(obj.name) //why

obj.__proto__.message = "Hello World"
console.log(obj.message) //Hello World

```



### **函数的原型 prototype**

- **这里我们又要引入一个新的概念：所有的函数都有一个prototype的属性（注意：不是\_\_proto\_\_）**
  - 箭头函数没有自己的prototype的属性

![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.014.png)

- 你可能会问题，老师是不是因为函数是一个对象，所以它有prototype的属性呢？
  - 不是的，因为它是一个函数，才有了这个特殊的属性；
  - 而不是它是一个对象，所以有这个特殊的属性；


![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.015.png)

- 对象原型与函数原型的区别
  - 对象原型只有`__proto__`原型。函数也是对象，所以也有`__proto__`原型。又称为**隐式原型**
  - 函数除了有`__proto__`隐式原型，还有`prototype`原型。又称为**显式原型**

```js
//对象的原型
var obj = {};console.log(obj.__proto__);
//{constructor: ƒ, __defineGetter__: ƒ,...}
var obj = {};console.log(obj.prototype);
//undefined

//函数的原型
function test(){ }; console.log(test.prototype);
// {constructor: ƒ}
function test(){ }; console.log(test.__proto__);
// ƒ () { [native code] }
```

* **函数的原型的作用**
  * 在通过new操作创建对象时, 将这个显式原型赋值给创建出来对象的隐式原型

- **我们前面讲过new关键字的步骤如下：**
  - 1.在内存中创建一个新的对象（空对象）；
  - 2.这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性；
  - 那么也就意味着我们通过Person构造函数创建出来的所有对象的[[prototype]]属性都指向Person.prototype：


```js
 function Student(name, age, sno) {
  this.name = name
  this.age = age
  this.sno = sno

  // 1.方式一: 编写函数, 会创建很多个函数对象
  // this.running = function() {
  //   console.log(this.name + " running")
  // }
  // this.eating = function() {
  //   console.log(this.name + " eating")
  // }
  // this.studying = function() {
  //   console.log(this.name + " studying")
  // }
}

// 当我们多个对象拥有共同的值时, 我们可以将它放到构造函数对象的显式原型
// 由构造函数创建出来的所有对象, 都会共享这些属性
Student.prototype.running = function() {
  console.log(this.name + " running")
}
Student.prototype.eating = function() {
  console.log(this.name + " eating")
}
```

#### **constructor属性**


- 事实上原型对象上面是有一个属性的：constructor
- 默认情况下原型上都会添加一个属性叫做constructor，这个constructor指向当前的函数对象；

```js
// 非常重要的属性: constructor, 指向Person函数对象
function Person() {

}

// 1.对constructor在prototype上的验证
var PersonPrototype = Person.prototype
console.log(PersonPrototype) //{constructor: ƒ}
console.log(PersonPrototype.constructor)//ƒ Person() {}
console.log(PersonPrototype.constructor === Person)//true

console.log(Person.name) //Person
console.log(PersonPrototype.constructor.name)//Person

// 2.实例对象p
var p = new Person()
console.log(p.__proto__.constructor) //)//ƒ Person() {}
console.log(p.__proto__.constructor.name)//Person
```

#### **重写原型对象**

- 如果我们需要在原型上添加过多的属性，通常我们会重写整个原型对象：
- 但是新对象需要添加constructor，并且指向构造函数。并且由于constructor不可枚举，需要通过definedProperty配置

```js

    function Person() {

    }

    console.log(Person.prototype)
    
    // 在原有的原型对象上添加新的属性
    // Person.prototype.message = "Hello Person"
    // Person.prototype.info = { name: "哈哈哈", age: 30 }
    // Person.prototype.running = function() {}
    // Person.prototype.eating = function() {}

    // console.log(Person.prototype)
    // console.log(Object.keys(Person.prototype))

    // 直接赋值一个新的原型对象
    Person.prototype = {
      message: "Hello Person",
      info: { name: "哈哈哈", age: 30 },
      running: function() {},
      eating: function() {},
      // constructor: Person
    }
    Object.defineProperty(Person.prototype, "constructor", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: Person
    })

    console.log(Object.keys(Person.prototype))

    // 新建实例对象
    var p1 = new Person()
    console.log(p1.message)
```

## ES5中的继承

### **面向对象的特性 – 继承**

- 面向对象有三大特性：封装、继承、多态
  - 封装：我们前面将属性和方法封装到一个类中，可以称之为封装的过程；
  - 继承：继承是面向对象中非常重要的，不仅仅可以减少重复代码的数量，也是多态前提（纯面向对象中）；
  - 多态：不同的对象在执行时表现出不同的形态；
- **那么这里我们核心讲继承。**
- **那么继承是做什么呢？**
  - 继承可以帮助我们将重复的代码和逻辑抽取到父类中，子类只需要直接继承过来使用即可；
  - 在很多编程语言中，继承也是多态的前提；

- **那么JavaScript当中如何实现继承呢？**
  - 不着急，我们先来看一下JavaScript原型链的机制；
  - 再利用原型链的机制实现一下继承；


### **JavaScript原型链**

- **在真正实现继承之前，我们先来理解一个非常重要的概念：原型链。**
- 我们知道，从一个对象上获取属性，如果在当前对象中没有获取到就会去它的原型上面获取：
  - 原型对象和原型对象之间形成一个链条，就叫做原型链


![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.026.jpeg) ![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.027.jpeg)

#### **Object的原型**

- 那么什么地方是原型链的尽头呢？比如第三个对象是否也是有原型\_\_proto\_\_属性呢？

![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.028.png)

- **我们会发现它打印的是 [Object: null prototype] {}**
  - 事实上这个原型就是我们最顶层的原型了
  - 从Object直接创建出来的对象的原型都是 [Object: null prototype] {}。

- **那么我们可能会问题： [Object: null prototype] {} 原型有什么特殊吗？**
  - 特殊一：该对象有原型属性，但是它的原型属性已经指向的是null，也就是已经是顶层原型了；
  - 特殊二：该对象上有很多默认的属性和方法；


**创建Object对象的内存图**

![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.029.jpeg)

**原型链关系的内存图**

![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.030.jpeg)

**Object是所有类的父类**

- **从我们上面的Object原型我们可以得出一个结论：原型链最顶层的原型对象就是Object的原型对象**

![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.031.png) ![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.032.jpeg)

### **通过原型链实现继承**

- **如果我们现在需要实现继承，那么就可以利用原型链来实现了：**
- 方法一：
  - 父类的原型直接赋值给子类的原型
  - 缺点：
    - 父类和子类共享通一个原型对象, 修改了任意一个, 另外一个也被修改

- 方法二：
  - 创建一个父类的实例对象(new Person()), 用这个实例对象来作为子类的原型对象


```js
  // 定义Person构造函数(类)
      function Person(name, age, height, address) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.address = address;
      }

      Person.prototype.running = function () {
        console.log("running~");
      };
      Person.prototype.eating = function () {
        console.log("eating~");
      };

      // 定义学生类
      function Student(name, age, height, address, sno, score) {
       // this.name = name;
       // this.age = age;
       // this.height = height;
       // this.address = address;

        this.sno = sno;
        this.score = score;
      }

      // 方式一: 父类的原型直接赋值给子类的原型
      // 缺点: 父类和子类共享通一个原型对象, 修改了任意一个, 另外一个也被修改
      // Student.prototype = Person.prototype

      // 方式二: 创建一个父类的实例对象(new Person()), 用这个实例对象来作为子类的原型对象
      var p = new Person("why", 18);
      Student.prototype = p;

      Student.prototype.studying = function () {
        console.log("studying~");
      };

      // 创建学生
      var stu1 = new Student("kobe", 30, 111, 100);
      var stu2 = new Student("james", 25, 111, 100);
      stu1.running();
      stu1.studying();

      console.log(stu1.name, stu1.age);
      console.log(stu1);
      console.log(stu2.name, stu2.age);
```

### **原型链继承的弊端**

- **但是目前有一个很大的弊端：某些属性其实是保存在p对象上的；**
  - 第一，我们通过直接打印对象是看不到这个属性的；
  - 第二，这个属性会被多个对象共享，如果这个对象是一个引用类型，那么就会造成问题；
  - 第三，不能给Person传递参数（让每个stu有自己的属性），因为这个对象是一次性创建的（没办法定制化）；

- **原型链能实现方法的继承，但是不能实现属性的继承。属性的继承，我们可以使用构建函数借用**

### **借用构造函数继承**

- 为了解决原型链继承中存在的问题，开发人员提供了一种新的技术: constructor stealing(有很多名称: 借用构造函数或者称之
  为经典继承或者称之为伪造对象)：
  - steal是偷窃、剽窃的意思，但是这里可以翻译成借用；

- **借用继承的做法非常简单：在子类型构造函数的内部调用父类型构造函数**
  - 因为函数可以在任意的时刻被调用；
  - 因此通过apply()和call()方法也可以在新创建的对象上执行构造函数；


```js
// 定义Person构造函数(类)
      function Person(name, age, height, address) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.address = address;
      }

      Person.prototype.running = function () {
        console.log("running~");
      };
      Person.prototype.eating = function () {
        console.log("eating~");
      };

      // 定义学生类
      function Student(name, age, height, address, sno, score) {
       // 重点: 借用构造函数
       Person.call(this, name, age, height, address)

        this.sno = sno;
        this.score = score;
      }


      var p = new Person("why", 18);
      Student.prototype = p;

      Student.prototype.studying = function () {
        console.log("studying~");
      };

      // 创建学生
      var stu1 = new Student("kobe", 30, 111, 100);
      var stu2 = new Student("james", 25, 111, 100);
      stu1.running();
      stu1.studying();

      console.log(stu1.name, stu1.age);
      console.log(stu1);
      console.log(stu2.name, stu2.age);
```



### **组合借用继承的问题**

- **组合继承是JavaScript最常用的继承模式之一：**
  - 如果你理解到这里, 点到为止, 那么组合来实现继承只能说问题不大；
  - 但是它依然不是很完美，但是基本已经没有问题了；

- **组合继承存在什么问题呢?**
  - 组合继承最大的问题就是无论在什么情况下，都会调用两次父类构造函数。
  - 一次在创建子类原型的时候；
  - 另一次在子类构造函数内部(也就是每次创建子类实例的时候)；
  - 另外，如果你仔细按照我的流程走了上面的每一个步骤，你会发现：所有的子类实例事实上会拥有两份父类的属性
    - 一份在当前的实例自己里面(也就是person本身的)，另一份在子类对应的原型对象中(也就是person.\_\_proto\_\_里面)；
    - 当然，这两份属性我们无需担心访问出现问题，因为默认一定是访问实例本身这一部分的；


###  原型式/寄生式思想

#### 原型式继承函数

- **原型式继承的渊源**
  - 这种模式要从道格拉斯·克罗克福德（Douglas Crockford，著名的前端大师，JSON的创立者）在2006年写的一篇文章说起: Prototypal Inheritance in JavaScript(在JavaScript中使用原型式继承)
    - 在这篇文章中，它介绍了一种继承方法，而且这种继承方法不是通过构造函数来实现的.
    - 为了理解这种方式，我们先再次回顾一下JavaScript想实现继承的目的：重复利用另外一个对象的属性和方法.

  - **最终的目的：info对象的原型指向了obj对象；**


```js
// 对象之间的继承
// 默认的对象
var obj = {
  name: "why",
  age: 18
}

// 原型式继承
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 创建另外一个对象, 这个对象可以继承自obj
var info = createObject(obj)  
info1.height = 1.88
info1.address = "广州市"
```

- **原型式继承的几种方法**

```js
 /*
    原型式继承满足什么条件:
      1.必须创建出来一个对象
      2.这个对象的隐式原型必须指向父类的显式原型
      3.将这个对象赋值给子类的显式原型
    */
    function Person(name, age, height) {}
    function Student() {}

    inherit(Student, Person)
    
    // 1.之前的做法: 但是不想要这种做法
    // var p = new Person()
    // Student.prototype = p

    // 2.方案一:
    //因为早期__proto有兼容性问题，并且setPrototypeOf方法没有出现，所以这种方法只能现在使用
    var obj = {}
    // obj.__proto__ = Person.prototype //__proto有兼容性问题
    Object.setPrototypeOf(obj, Person.prototype)
    Student.prototype = Person.prototype

    // 3.方案二:
   //最早期的方案，没有兼容性问题
     function F() {}
    F.prototype = Person.prototype
    Student.prototype = new F()

    // 4.方案三:
    //现在最新的方法。
    var obj = Object.create(Person.prototype)
    console.log(obj.__proto__ === Person.prototype)
    Student.prototype = obj
```



#### 寄生式继承函数

- **寄生式(Parasitic)继承**
  - 寄生式(Parasitic)继承是与原型式继承紧密相关的一种思想, 并且同样由道格拉斯·克罗克福德(Douglas Crockford)提出和推 广的；
  - 寄生式继承的思路是结合原型式继承和工厂模式的一种方式；
  - 即创建一个封装继承过程的函数, 该函数在内部以某种方式来增强对象，最后再将这个对象返回；


```js
// 对象之间的继承
// 默认的对象
var obj = {
  name: "why",
  age: 18
}

// 原型式继承
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 寄生式函数
function createInfo(o, name, age, height, address) {
  var newObj = createObject(o)
  newObj.name = name
  newObj.age = age
  newObj.height = height
  newObj.address = address

  return newObj
}
  // 创建一系列对象
var info1 = createInfo(obj, "why", 18, 1.88, "广州市")
var info2 = createInfo(obj, "kobe", 30, 1.98, "洛杉矶市")
```

### **最终的方案-寄生组合式继承**

- **现在我们来回顾一下之前提出的比较理想的组合继承**
- 组合继承是比较理想的继承方式, 但是存在两个问题:
  - 问题一: 构造函数会被调用两次: 一次在创建子类型原型对象的时候, 一次在创建子类型实例的时候.
  - 问题二: 父类型中的属性会有两份: 一份在原型对象中, 一份在子类型实例中.

- **事实上, 我们现在可以利用寄生式继承将这两个问题给解决掉.**
  - 你需要先明确一点: 当我们在子类型的构造函数中调用父类型.call(this, 参数)这个函数的时候, 就会将父类型中的属性和方法复 制一份到了子类型中. 所以父类型本身里面的内容, 我们不再需要.
  - 这个时候, 我们还需要获取到一份父类型的原型对象中的属性和方法.
  - 能不能直接让子类型的原型对象 = 父类型的原型对象呢?
  - 不要这么做, 因为这么做意味着以后修改了子类型原型对象的某个引用类型的时候, 父类型原生对象的引用类型也会被修改.

- 我们使用前面的寄生式思想就可以了.

```js
// 创建对象的过程
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 将Subtype和Supertype联系在一起
// 寄生式函数
function inherit(Subtype, Supertype) {
  // Subtype.prototype.__proto__ = Supertype.prototype
  // Object.setPrototypeOf(Subtype.prototype, Subtype.prototype)
  Subtype.prototype = createObject(Supertype.prototype)
  Object.defineProperty(Subtype.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: Subtype
  })
  Object.setPrototypeOf(Subtype, Supertype)
  // Subtype.__proto__ = Supertype
}



// 寄生组合式继承
// 原型链/借用/原型式(对象之间)/寄生式函数
function Person(name, age, height) {
  this.name = name
  this.age = age
  this.height = height
}

Person.prototype.running = function() {
  console.log("running~")
}
Person.prototype.eating = function() {
  console.log("eating~")
}


function Student(name, age, height, sno, score) {
  Person.call(this, name, age, height)
  this.sno = sno
  this.score = score
}

inherit(Student, Person)
Student.prototype.studying = function() {
  console.log("studying")
}

// 创建实例对象
var stu1 = new Student("why", 18, 1.88, 111, 100)
```

## **对象的方法补充**

- **hasOwnProperty**
  - 对象是否有某一个属于自己的属性（不是在原型上的属性）

- **in/for in 操作符**
  - 判断某个属性是否在某个对象或者对象的原型上

- **instanceof**
  - 用于检测构造函数（Person、Student类）的pototype，是否出现在某个实例对象的原型链上

- **isPrototypeOf**
  - 用于检测某个对象，是否出现在某个实例对象的原型链上


```js
var obj = {
  name: "why",
  age: 18
}

var info = createObject(obj)
info.address = "中国"
info.intro = "中国大好河山"

console.log(info.name, info.address)
console.log(info)

// 1.hasOwnProperty
// console.log(info.hasOwnProperty("name")) // false
// console.log(info.hasOwnProperty("address")) // true

// 2.in操作符
console.log("name" in info)
console.log("address" in info)
// 注意: for in遍历不仅仅是自己对象上的内容, 也包括原型对象上的内容
for (var key in info) {
  console.log(key)
}

// 3.instanceof
// instanceof用于判断对象和类(构造函数)之间的关系
function Person() {}
function Student() {}
inherit(Student, Person)

// stu实例(instance)对象
var stu = new Student()
console.log(stu instanceof Student)
console.log(stu instanceof Person)
console.log(stu instanceof Object)
console.log(stu instanceof Array)

// 4.isPrototypeOf
console.log(Student.prototype.isPrototypeOf(stu))
console.log(Person.prototype.isPrototypeOf(stu))

// 可以用于判断对象之间的继承
console.log(obj.isPrototypeOf(info))
```



## **原型继承关系**

![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.044.jpeg) 

![](image/Aspose.Words.7fd990df-5677-49e6-b388-3c388c3a6870.045.jpeg)\

- 任意对象，都是`new Object()`创建的，所以它们的`__proto__`隐式原型都是`Object.prototype`
- 任意的函数，都是通过`new Funtion()`创建的，所以它们的`__proto__`隐式原型都是`Function.prototype`
- 原型对象也是对象，所以`Function.prototype/Object.prototype`的`__proto__`隐式原型指向`Object.prototype`

```js
var obj = {} // 通过new Object()创建
obj.__proto__ // Object.prototype

function foo() {} // new Function()
console.log(foo.length, foo.name)
console.log(foo.__proto__) // Function.prototype

function Person() { // Person.__proto === Function.prototype

}

console.log(foo.__proto__ === Function.prototype)
console.log(Person.__proto__ === Function.prototype)
console.log(foo.__proto__ === Person.__proto__)
console.log(Object.__proto__ === Function.prototype)
console.log(Function.__proto__ === Function.prototype)

var p1 = new Person()
var p2 = new Person()

console.log(Object.prototype)
```

## 构造函数的类方法与类属性

```js
  function Person(name, age) {
      this.name = name
      this.age = age
    }

    Person.totalCounter = "70亿"

   
    // 添加Person对象本身的方法成为 类方法
    var names = ["abc", "cba", "nba", "mba"]
    Person.randomPerson = function() {
      var randomName = names[Math.floor(Math.random() * names.length)]
      return new Person(randomName, Math.floor(Math.random() * 100))
    }
```

