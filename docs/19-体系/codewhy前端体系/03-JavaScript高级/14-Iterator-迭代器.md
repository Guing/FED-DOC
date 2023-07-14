

## **什么是迭代器？**

- **迭代器**（iterator），使用户**在容器对象（container，例如链表或数组）上遍访的对象** ，使用该接口无需关心对象的内部实现细节。
  - 其行为像数据库中的游标，迭代器最早出现在1974年设计的CLU编程语言中；

- 在各种编程语言的实现中，迭代器的实现方式各不相同，但是基本都有迭代器，比如Java、Python等；

- **从迭代器的定义我们可以看出来，迭代器是帮助我们对某个数据结构进行遍历的对象。**
- **在JavaScript中，迭代器也是一个具体的对象，这个对象需要符合迭代器协议（iterator protocol）：**
  - 迭代器协议定义了产生一系列值（无论是有限还是无限个）的标准方式；
  - 在JavaScript中这个标准就是一个特定的next方法；

- **next方法有如下的要求：**
- 一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象：
- done（boolean）
  - 如果迭代器可以产生序列中的下一个值，则为 false。（这等价于没有指定 done 这个属性。）
  - 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
- value
  - 迭代器返回的任何 JavaScript 值。done 为 true 时可省略。


```js
const names = ["abc", "cba", "nba"]
// 给数组names创建一个迭代器(迭代器: names的迭代器)
let index = 0
const namesIterator = {
  next: function() {
    // done: Boolean
    // value: 具体值/undefined
    if (index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true }
    }
  }
}

console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

// 数组nums
const nums = [100, 24, 55, 66, 86]

let indexNum = 0
const numsIterator = {
  next: function() {
    // done: Boolean
    // value: 具体值/undefined
    if (indexNum < nums.length) {
      return { done: false, value: nums[indexNum++] }
    } else {
      return { done: true }
    }
  }
}
```

## **可迭代对象**

- **但是上面的代码整体来说看起来是有点奇怪的：**
  - 我们获取一个数组的时候，需要自己创建一个index变量，再创建一个所谓的迭代器对象；
  - 事实上我们可以对上面的代码进行进一步的封装，让其变成一个可迭代对象；

- **什么又是可迭代对象呢？**
  - 它和迭代器是不同的概念；
  - 当一个对象实现了iterable protocol协议时，它就是一个可迭代对象；
  - 这个对象的要求是必须实现` @@iterator` 方法，在代码中我们使用` Symbol.iterator `访问该属性；

- **当然我们要问一个问题，我们转成这样的一个东西有什么好处呢？**
  - 当一个对象变成一个可迭代对象的时候，就可以进行某些迭代操作；
  - 比如 `for...of `操作时，其实就会调用它的 `@@iterator `方法；


```js
// 将infos变成一个可迭代对象
/*
  1.必须实现一个特定的函数: [Symbol.iterator]
  2.这个函数需要返回一个迭代器(这个迭代器用于迭代当前的对象)
*/
const infos = {
  friends: ["kobe", "james", "curry"],
  [Symbol.iterator]: function() {
    let index = 0
    const infosIterator = {
      next: function() {
        // done: Boolean
        // value: 具体值/undefined
        if (index < infos.friends.length) {
          return { done: false, value: infos.friends[index++] }
        } else {
          return { done: true }
        }
      }
    }
    return infosIterator
  }
}
// 可迭对象可以进行for of操作
for (const item of infos) {
  console.log(item)
}

// 可迭代对象必然有一个[Symbol.iterator]函数
// 比如数组是一个可迭代对象
const students = ["张三", "李四", "王五"]
console.log(students[Symbol.iterator])
const studentIterator = students[Symbol.iterator]()
console.log(studentIterator.next())


```



## **原生迭代器对象**

- **事实上我们平时创建的很多原生对象已经实现了可迭代协议，会生成一个迭代器对象的：**
  - String、Array、Map、Set、arguments对象、NodeList集合；


```js
  // 1.数组
  const names = ["abc", "cba", "nba"];
  for (const name of names) {
    console.log(name);
  }
  console.log(names[Symbol.iterator]());

  // 2.Set
  const set = new Set(["abc", "cba", "nba"]);
  for (const item of set) {
    console.log(item);
  }
  const setIterator = set[Symbol.iterator]();
  console.log(setIterator.next());

  // 3.arguments
  function foo() {
    for (const arg of arguments) {
      console.log(arg);
    }
  }
  foo(123, 321, 111, 222);

  //string
  for (const str of "strings") {
    console.log(str); //s  t  r  i  n  g  s
  }
```

## 迭代器的应用

- **那么这些东西可以被用在哪里呢？**
  - **JavaScript中语法**：
    - `for ...of、展开语法（spread syntax）、yield\*（后面讲）、解构赋值（Destructuring\_assignment）`；

  - **创建一些对象时**：
    - `new Map([Iterable])、new WeakMap([iterable])、new Set([iterable])、new WeakSet([iterable]);`

  - **一些方法的调用**：
    - `Promise.all(iterable)、Promise.race(iterable)、Array.from(iterable);`


```js
// 1.用在特定的语法上
const names = ["abc", "cba", "nba"]
const info = {
  name: "why",
  age: 18,
  height: 1.88,
  [Symbol.iterator]: function() {
    const values = Object.values(this)
    let index = 0
    const iterator = {
      next: function() {
        if (index < values.length) {
          return { done: false, value: values[index++] }
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}

function foo(arg1, arg2, arg3) {
  console.log(arg1, arg2, arg3)
}

foo(...info)

// 2.一些类的构造方法中, 也是传入的可迭代对象
const set = new Set(["aaa", "bbb", "ccc"])
const set2 = new Set("abc")
console.log(set2)
const set3 = new Set(info)
console.log(set3)


// 3.一些常用的方法
const p1 = Promise.resolve("aaaa")
const p2 = Promise.resolve("aaaa")
const p3 = Promise.resolve("aaaa")
const pSet = new Set()
pSet.add(p1)
pSet.add(p2)
pSet.add(p3)
Promise.all(pSet).then(res => {
  console.log("res:", res)
})

function bar() {
  // console.log(arguments)
  // 将arguments转成Array类型
  const arr = Array.from(arguments)
  console.log(arr)
}

bar(111, 222, 333)
```



## **自定义类的迭代**

- **在前面我们看到Array、Set、String、Map等类创建出来的对象都是可迭代对象：**
  - 在面向对象开发中，我们可以通过class定义一个自己的类，这个类可以创建很多的对象：
  - 如果我们也希望自己的类创建出来的对象默认是可迭代的，那么在设计类的时候我们就可以添加上 @@iterator 方法；


```js

class Person {
  constructor(name, age, height, friends) {
    this.name = name
    this.age = age
    this.height = height
    this.friends = friends
  }

  // 实例方法
  running() {}
  [Symbol.iterator]() {
    let index = 0
    const iterator = {
      next: () => {
        if (index < this.friends.length) {
          return { done: false, value: this.friends[index++] }
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}

const p1 = new Person("why", 18, 1.88, ["curry", "kobe", "james", "tatumu"])
const p2 = new Person("kobe", 30, 1.98, ["curry", "james", "aonier", "weide"])

for (const item of p2) {
  console.log(item)
}
```



## **迭代器的中断**

- **迭代器在某些情况下会在没有完全迭代的情况下中断：**
  - 比如遍历的过程中通过break、return、throw中断了循环操作；
  - 比如在解构的时候，没有解构所有的值；

- **那么这个时候我们想要监听中断的话，可以添加return方法：**

```js
class Person {
  constructor(name, age, height, friends) {
    this.name = name
    this.age = age
    this.height = height
    this.friends = friends
  }

  // 实例方法
  running() {}
  [Symbol.iterator]() {
    let index = 0
    const iterator = {
      next: () => {
        if (index < this.friends.length) {
          return { done: false, value: this.friends[index++] }
        } else {
          return { done: true }
        }
      },
      return: () => {
        console.log("监听到迭代器中断了")
        return { done: true }
      }
    }
    return iterator
  }
}


const p1 = new Person("why", 18, 1.88, ["curry", "kobe", "james", "tatumu"])

for (const item of p1) {
  console.log(item)
  if (item === "kobe") {
    break
  }
}
```



