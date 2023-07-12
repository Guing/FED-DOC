## **this到底指向什么呢？**

- 定义一个函数，我们采用三种不同的方式对它进行调用，它产生了三种不同的结果

```js
      // 定义函数
      function foo(name) {
        console.log("foo函数:", this);
      }

      // 1.方式一: 直接调用
      foo(); //Window

      // 2.方式二: 通过对象调起
      var obj = { name: "why" };
      obj.aaa = foo;
      obj.aaa(); //obj

      // 2.方式二: 通过call/apply调起
      foo.call("abc"); //String('abc')
```

- **这个的案例可以给我们什么样的启示呢？**
  - 1.函数在调用时，JavaScript会默认给this绑定一个值；
  - 2.this的绑定和定义的位置（编写的位置）没有关系； 
  - 3.this的绑定和调用方式以及调用的位置有关系； 
  - 4.this是在运行时被绑定的； 
- **那么this到底是怎么样的绑定规则呢？一起来学习一下吧** 
  - 绑定一：默认绑定； 
  - 绑定二：隐式绑定； 
  - 绑定三：显式绑定； 
  - 绑定四：new绑定； 


## **规则一：默认绑定**

- **什么情况下使用默认绑定呢？独立函数调用。**
  - 独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用；


```js
      // 定义函数
      // 1.普通的函数被独立的调用
      function foo() {
        console.log("foo:", this);
      }
      foo(); //window

      // 2.函数定义在对象中, 但是独立调用
      var obj = {
        name: "why",
        bar: function () {
          console.log("bar:", this);
        },
      };

      var baz = obj.bar;
      baz(); //window

      // 3.高阶函数
      function test(fn) {
        fn();
      }

      test(obj.bar); //window

      // 4.严格模式下, 独立调用的函数中的this指向的是undefined
      //"use strict"
```

## **规则二：隐式绑定**

- **另外一种比较常见的调用方式是通过某个对象进行调用的：** 
  - 也就是它的调用位置中，是通过某个对象发起的函数调用。


```js
      // 1.简单的隐式绑定
      function foo() {
        console.log("foo函数:", this);
      }

      var obj = {
        bar: foo,
      };

      obj.bar(); //obj

      //2.嵌套的隐式绑定
      var obj2 = {
        obj: obj,
      };
      obj2.obj.bar(); //obj
```

## **规则三：new绑定**

- **JavaScript中的函数可以当做一个类的构造函数来使用，也就是使用new关键字。**
- **使用new关键字来调用函数是，会执行如下的操作：**
  - 1.创建一个全新的对象；
  - 2.这个新对象会被执行prototype连接；
  - 3.这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）；
  - 4.如果函数没有返回其他对象，表达式会返回这个新对象；

```js

    function foo() {
      this.name = "why"
      console.log("foo函数:", this)//foo对象
    }

    new foo()
```



## **规则四：显式绑定**

- **隐式绑定有一个前提条件：**
  - 必须在调用的对象内部有一个对函数的引用，比如函数是对象的属性`obj.fn()`；
  - 正是通过这个引用，间接的将this绑定到了这个对象上；



- **如果我们不希望在 对象内部 包含这个函数的引用，同时又希望在这个对象上**

- **JavaScript所有的函数都可以使用call和apply方法。**


  - ```
    function.call(thisArg, arg1, arg2, ...)
    ```

  - ```
    function.apply(thisArg, argsArray)
    ```

- 第一个参数是相同的，要求传入一个对象；
  - 在调用这个函数时，会将this绑定到这个传入的对象上。

- 后面的参数，apply为数组，call为参数列表；

- 因为上面的过程，我们明确的绑定了this指向的对象，所以称之为 **显式绑定**。

### **call、apply、bind**

- **通过call或者apply绑定this对象**
  - 显示绑定后，this就会明确的指向绑定的对象


```js
      // call/apply
      function foo(name, age, height) {
        console.log("foo函数被调用:", this);
        console.log("打印参数:", name, age, height);
      }

      // apply
      // 第一个参数: 绑定this
      // 第二个参数: 传入额外的实参, 以数组的形式
      foo.apply("apply", ["kobe", 30, 1.98]);

      // call
      // 第一个参数: 绑定this
      // 参数列表: 后续的参数以多参数的形式传递, 会作为实参
      foo.call("call", "james", 25, 2.05);
```

- **如果我们希望一个函数总是显示的绑定到一个对象上，可以使用bind方法**

  - ```
    function.bind(thisArg[, arg1[, arg2[, ...]]])
    ```

  - bind() 方法创建一个新的绑定函数（bound function，BF）；
  - 绑定函数是一个 exotic function object（怪异函数对象，ECMAScript 2015 中的术语）

    - this 被指定为 bind() 的第一个参数，
    - 而其余参数将作为新函数的参数，供调用时使用。
    - 如果新函数还有传入参数，而会继续放在上面的参数的后面


```js
 function foo(name, age, height, address) {
        console.log("foo:", this);
        console.log("参数:", name, age, height, address);
      }

var obj = { name: "why" };

// 需求: 调用foo时, 总是绑定到obj对象身上(不希望obj对象身上有函数)
// 1.bind函数的基本使用
// var bar = foo.bind(obj)
// bar() // this -> obj

// 2.bind函数的其他参数(了解)
var bar = foo.bind(obj, "kobe", 18, 1.88);
bar("james"); //"kobe", 18, 1.88, "james"
```



## **内置函数的绑定思考**

- **有些时候，我们会调用一些JavaScript的内置函数，或者一些第三方库中的内置函数。**
  - 这些内置函数会要求我们传入另外一个函数；
  - 我们自己并不会显示的调用这些函数，而且JavaScript内部或者第三方库内部会帮助我们执行；
    - 比如setTimeout、数组的forEach、div的点击

  - 这些函数中的this又是如何绑定的呢？
  - 这时候就需要文档，或者靠经验来判断


```html
 <body>
    <button>按钮</button>

    <script>
      // 1.定时器
      //绑定window,就是算是严格模式也是绑定window
      setTimeout(function () {
        console.log("定时器函数:", this);
      }, 1000);

      // 2.按钮的点击监听
      //绑定的是element对象
      var btnEl = document.querySelector("button");
      btnEl.onclick = function () {
        console.log("btn的点击:", this);
      };

      btnEl.addEventListener("click", function () {
        console.log("btn的点击:", this);
      });

      // 3.forEach
      ////通过第二个参数，绑定this
      var names = ["abc", "cba", "nba"];
      names.forEach(function (item) {
        console.log("forEach:", this);
      }, "aaaa");
    </script>
  </body>
```



## **规则优先级**

- **如果一个函数调用位置应用了多 条规则，优先级谁更高呢？以下是优先级的排序**
  - new
  - bind（显式绑定）
  - apply/call（显式绑定）
  - obj.fn()（隐式绑定)
  - 默认绑定

* new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高 
* new绑定可以和bind一起使用，new绑定优先级更高

```js
function foo() {
  console.log("foo:", this);
}

// 比较优先级:

// 1.显式绑定绑定的优先级高于隐式绑定
// 1.1.测试一:apply高于隐式绑定
var obj = { foo: foo };
obj.foo.apply("abc"); //String("abc")
obj.foo.call("abc"); //String("abc")

// 1.2.测试二:bind高于隐式绑定
var bar = foo.bind("aaa");
var obj2 = {
  name: "why",
  baz: bar,
};
obj2.baz(); //String("aaa")

// 2.new绑定优先级高于隐式绑定
var obj3 = {
  name: "why",
  foo: function () {
    console.log("foo:", this); //foo
    console.log("foo:", this === obj); //false
  },
};
new obj3.foo();

// 3.new/显式
// 3.1. new不可以和apply/call一起使用

// 3.2. new优先级高于bind
function foo2() {
  console.log("foo:", this); //foo2
}
var bindFn = foo2.bind("aaa");
new bindFn();

// 4.bind/apply优先级
// bind优先级高于apply/call
function foo3() {
  console.log("foo:", this); //String("aaa")
}
var bindFn = foo3.bind("aaa");
bindFn.call("bbb");
```

## 其他特殊this规则

### **this规则之外 – 忽略显式绑定**

- **情况一：如果在显示绑定中，我们传入一个null或者undefined，那么这个显式绑定会被忽略，使用默认规则：**
  - 如果使用严格模式，则会将原始值赋值给this

```js
  // 1.情况一: 显式绑定null/undefined, 那么使用的规则是默认绑定
      function foo() {
        console.log("foo:", this);
      }

      foo.apply("abc"); //String("abc")
      foo.apply(null);//window
      foo.apply(undefined);//window
```

```js
 "use strict";
      // 如果使用严格模式，则会将原始值赋值给this
      function foo() {
        console.log("foo:", this);
      }

      foo.apply("abc");//"abc"
      foo.apply(null);//null
      foo.apply(undefined);//undefined
```



### **this规则之外 - 间接函数引用**

- **情况二：创建一个函数的 间接引用，这种情况使用默认绑定规则。**
  - 赋值(obj2.foo = obj1.foo)的结果是foo函数；
  - foo函数被直接调用，那么是默认绑定；


```js
 var obj = {
    name: "obj",
    foo: function () {
      console.log("foo:", this);
    },
  };
  var form = {
    name: "form",
  };
  //(form.foo = obj.foo)会返回foo函数
  (form.foo = obj.foo)(); //window，相当于默认绑定
```



### **箭头函数 arrow function**

- **箭头函数是ES6之后增加的一种编写函数的方法，并且它比函数表达式要更加简洁：**

  - 箭头函数不会绑定this、arguments属性；
  - 箭头函数不能作为构造函数来使用（不能和new一起来使用，会抛出错误）；

- **箭头函数如何编写呢？**

  ```js
  var foo3 = (name, age) => {
        console.log("箭头函数的函数体")
        console.log(name, age)
      }
  ```

  

### **箭头函数的编写优化**

- **优化一: 如果只有一个参数()可以省略**

- **优化二: 如果函数执行体中只有一行代码, 那么可以省略大括号**
  - 并且这行代码的返回值会作为整个函数的返回值


- **优化三: 如果函数执行体只有返回一个对象, 那么需要给这个对象加上()**

```js
  var names = ["abc", "cba", "nba"]
    var nums = [20, 30, 11, 15, 111]

    // 1.优化一: 如果箭头函数只有一个参数, 那么()可以省略
    names.forEach(item => {
      console.log(item)
    })
    var newNums = nums.filter(item => {
      return item % 2 === 0
    })

    // 2.优化二: 如果函数体中只有一行执行代码, 那么{}可以省略
    names.forEach(item => console.log(item))

    // 只有一行代码时, 这行代码的表达式结果会作为函数的返回值默认返回的
    var newNums = nums.filter(item => item % 2 === 0)
    var newNums = nums.filter(item => item % 2 === 0)


    // 4.优化三: 如果默认返回值是一个对象, 那么这个对象必须加()
    // 注意: 在react中我会经常使用 redux

    var arrFn = () => ["abc", "cba"]
    var arrFn = () => ({ name: "why" })
    console.log(arrFn())

    // 箭头函数实现nums的所有偶数平方的和
    var nums = [20, 30, 11, 15, 111]
    var result = nums.filter(item => item % 2 === 0)
                     .map(item => item * item)
                     .reduce((prevValue, item) => prevValue + item)
    console.log(result)

```

### **ES6箭头函数this**

- 箭头函数并不绑定this对象
  - 就算是使用apply/call也是没有this的
- this引用就会从上层作用域中找到对应的this，类似于变量的查找规则

```js
  // 1.箭头函数中, 压根没有this
      var bar = () => {
        console.log("bar:", this);
      };
      bar(); //window
      // 2.通过apply调用时, 也是没有this
      bar.apply("aaaa"); //window

      // 3.this的查找规则
      console.log("全局this:", this);

      var obj = {
        name: "obj",
        foo: () => {
          var bar = () => {
            console.log("bar:", this);
          };
          return bar;
        },
      };
      var fn = obj.foo();
      fn.apply("bbb"); //obj
```

## this面试题

```js
var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};
function sayName() {
  var sss = person.sayName;
  sss(); // 绑定: 默认绑定, window 

  person.sayName(); // 绑定: 隐式绑定, person 

  (person.sayName)(); // 绑定: 隐式绑定, person

  (b = person.sayName)(); // 术语: 间接函数引用, window ,当使用=时，返回的是一个独立函数，使用默认绑定
}
sayName();
```

```js
var name = 'window'
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }

person1.foo1(); // 隐式绑定: person1
person1.foo1.call(person2); // 显式绑定: person2

person1.foo2(); // 上层作用域: window
person1.foo2.call(person2); // 上层作用域: window

person1.foo3()(); // 默认绑定: window
person1.foo3.call(person2)(); // 默认绑定: window
person1.foo3().call(person2); // 显式绑定: person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1
```

```js
var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1() // 隐式绑定: person1
person1.foo1.call(person2) // 显式绑定: person2

person1.foo2() // 上层作用域查找: person1
person1.foo2.call(person2) // 上层作用域查找: person1

person1.foo3()() // 默认绑定: window
person1.foo3.call(person2)() // 默认绑定: window
person1.foo3().call(person2) // 显式绑定: person2

person1.foo4()() // 上层作用域查找: person1(隐式绑定)
person1.foo4.call(person2)() //  上层作用域查找: person2(显式绑定)
person1.foo4().call(person2) // 上层作用域查找: person1(隐式绑定)
```

```js
var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() // 默认绑定: window
person1.obj.foo1.call(person2)() // 默认绑定: window
person1.obj.foo1().call(person2) // 显式绑定: person2

person1.obj.foo2()() // 上层作用域查找: obj(隐式绑定)
person1.obj.foo2.call(person2)() // 上层作用域查找: person2(显式绑定)
person1.obj.foo2().call(person2) // 上层作用域查找: obj(隐式绑定)
```

## 作业

###### 二. 整理this的绑定规则



###### 三. 说出apply、call、bind函数的用法和区别



###### 四. 说出箭头函数的各种用法和简写