## **什么是响应式？**

- 我们先来看一下响应式意味着什么？我们来看一段代码： 
  - num有一个初始化的值，有一段代码使用了这个值； 
  - 那么在num有一个新的值时，这段代码可以自动重新执行；


```js
let num = 100

/*修改了num之后，这两行代码会自动执行*/
console.log(num * 2)
console.log(num * num)

num = 200 //修改num的值
```

- 上面的这样一种可以自动响应数据变量的代码机制，我们就称之为是响应式的。 
  - 上面是基础类型的响应式，我们再来看一下对象的响应式：


![](./image/Aspose.Words.c31648da-9493-4911-8001-50b1c9918263.009.png)

```js
let obj = {name:"why" }

/*修改了obj之后，这两行代码会自动执行*/
let newName = obj.name;
console.log(obj.name);

obj.name = "my" //修改obj的值
```



### **响应式函数设计**

- 首先，执行的代码中可能不止一行代码，所以我们可以将这些代码放到一个函数中： 
  - 那么我们的问题就变成了，当数据发生变化时，自动去执行某一个函数；


![](./image/Aspose.Words.c31648da-9493-4911-8001-50b1c9918263.010.png)

- 但是有一个问题：在开发中我们是有很多的函数的，我们如何**区分一个函数需要响应式，还是不需要响应式呢**？ 
  - 很明显，下面的函数中 foo 需要在obj的name发生变化时，重新执行
  - bar函数是一个完全独立于obj的函数，它不需要执行任何响应式的操作；


```js
// 对象的响应式
const obj = {
  name: "why"
}

function foo() {
  console.log(obj.name)
}

function bar() {
  console.log(100)
}

obj.name = 'my'
```

### **响应式函数的实现watchFn**

- 但是我们怎么区分呢？ 
  - 这个时候我们封装一个新的函数watchFn； 
  - 凡是传入到watchFn的函数，就是需要响应式的； 
  - 其他默认定义的函数都是不需要响应式的；


```js
const obj = {
  name: "why",
  age: 18
}


// 设置一个数组来保存响应式函数
const reactiveFns = []
// 设置一个专门执行响应式函数的一个函数
function watchFn(fn) {
  reactiveFns.push(fn)
  fn()
}

watchFn(function foo() {
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
  console.log("foo function")
})

// 修改obj的属性
console.log("name发生变化-----------------------")
obj.name = "kobe"
//触发响应式函数
reactiveFns.forEach(fn => {
  fn()
})

```

### **响应式依赖的收集**

- 目前我们收集的依赖是放到一个数组中来保存的，但是这里会存在数据管理的问题：
  - 我们在实际开发中需要监听很多对象的响应式；
  - 这些对象需要监听的不只是一个属性，它们很多属性的变化，都会有对应的响应式函数；
  - 我们不可能在全局维护一大堆的数组来保存这些响应函数，在数组中我们也区分不出来，哪个一函数是哪一个对象属性的。
- 所以我们要设计一个类，这个类用于管理某一个对象的所有响应式函数：
  - 相当于替代了原来的简单 reactiveFns 的数组；


```js
class Depend {
  constructor() {
    this.reactiveFns = []
  }
  //添加依赖
  addDepend(fn) {
    if (fn) {
      this.reactiveFns.push(fn)
    }
  }
 //触发所有的依赖
  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}
const obj = {
  name: "why",
  age: 18
}
// 设置一个专门执行响应式函数的一个函数
const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
  fn()
}

watchFn(function foo() {
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
  console.log("foo function")
})


watchFn(function bar() {
  console.log("bar:", obj.name + " hello")
  console.log("bar:", obj.age + 10)
  console.log("bar function")
})

// 修改obj的属性
console.log("name发生变化-----------------------")
obj.name = "kobe"
dep.notify()

console.log("age发生变化-----------------------")
dep.notify()

console.log("name发生变化-----------------------")
obj.name = "james"

```



### **监听对象的变化**

- 那么我们接下来就可以监听对象的属性的变化，一旦变化，就自动触发依赖的函数： 
- 方式一：通过 Object.defineProperty的方式（vue2采用的方式）； 

```js
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.push(fn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


const obj = {
  name: "why",
  age: 18
}



// 设置一个专门执行响应式函数的一个函数
const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
  fn()
}

// 方案一: Object.defineProperty() -> Vue2
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    set: function(newValue) {
      value = newValue
      dep.notify() //触发属性的依赖函数
    },
    get: function() {
      return value
    }
  })
})



watchFn(function foo() {
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
  console.log("foo function")
})


watchFn(function bar() {
  console.log("bar:", obj.name + " hello")
  console.log("bar:", obj.age + 10)
  console.log("bar function")
})

// 修改obj的属性
console.log("name发生变化-----------------------")
obj.name = "kobe"

console.log("age发生变化-----------------------")
obj.age = 20

console.log("name发生变化-----------------------")
obj.name = "james"
```

- 方式二：通过new Proxy的方式（vue3采用的方式）；

  

### **自动依赖收集与对象的依赖管理**

- 自动依赖收集

  - 我们之前收集依赖的地方是在 watchFn 中： 
    - 但是这种收集依赖的方式我们根本不知道是哪一个key的哪一个depend需要收集依赖； 

    - 你只能针对一个单独的depend对象来添加你的依赖对象；


  - 那么正确的应该是在哪里收集呢？**应该在使用get捕获器时**
    - 因为如果一个函数中使用了某个对象的 key，那么它应该被收集依赖； 

- 对象依赖管理

  - 我们目前是创建了一个Depend对象，用来管理对于name变化需要监听的响应函数： 

    - 但是实际开发中我们会有很多不同的对象，一个对象又有很多不同的属性需要管理； 
    - 我们如何可以使用一种数据结构来管理不同对象的不同依赖关系呢？

    - 一个map对象管理所有的对象，比如以下的objMap。
      - 可以是weakMap对象，当我们使用obj1=null时，会自动清除掉对象，防止内存泄露。


    - objMap对象中，obj对象作为key，obj对象的所有属性创建一个新的map对象。
      - 这样就可以通过objMap.get(obj1)，获取到obj1的依赖对象。


  - obj的map对象，以属性为key，根据属性创建一个新的dep对象。

    - 这样就可以通过objMap.get(obj1).name，获取到属性的dep对象。然后将属性所有的依赖函数添加到这个dep对象中。

    

    ![](./image/Aspose.Words.c31648da-9493-4911-8001-50b1c9918263.018.jpeg)


- 我们可以写一个getDepend函数专门来管理这种依赖关系：
- 并且使用get自动收集依赖

```js
/**
  * 1.dep对象数据结构的管理(最难理解)
    * 每一个对象的每一个属性都会对应一个dep对象
    * 同一个对象的多个属性的dep对象是存放一个map对象中
    * 多个对象的map对象, 会被存放到一个objMap的对象中
  * 2.依赖收集: 当执行get函数, 自动的添加fn函数
 */

class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.push(fn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


const obj = {
  name: "why",
  age: 18
}



// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null //这里保存即将要添加的依赖函数。
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null //执行完之后，要清空掉
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) { //如果找不到obj的map对象，则新建一个。
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) { //如果找不到属性的dep对象，则新建一个。
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}


// 方案一: Object.defineProperty() -> Vue2
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    set: function(newValue) {
      value = newValue
      const dep = getDepend(obj, key)
      dep.notify()
    },
    get: function() {
      // 拿到obj -> key
      // console.log("get函数中:", obj, key)
      // 找到对应的obj对象的key对应的dep对象
      const dep = getDepend(obj, key)
      dep.addDepend(reactiveFn) //获取到dep之后，将依赖函数添加进去。

      return value
    }
  })
})


watchFn(function foo() {
  console.log("foo function")
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
})


watchFn(function bar() {
  console.log("bar function")
  console.log("bar:", obj.age + 10)
})

// 修改obj的属性
// console.log("name发生变化-----------------------")
// obj.name = "kobe"
console.log("age发生变化-----------------------")
obj.age = 20
```

### **对Depend重构**

- 但是这里有两个问题：
  - 问题一：如果函数中有用到两次key，比如name，那么这个函数会被收集两次；
  - 问题二：我们并不希望将添加reactiveFn放到get中，以为它是属于Dep的行为；
- 所以我们需要对Depend类进行重构：
  - 解决问题一的方法：不使用数组，而是使用Set；
  - 解决问题二的方法：添加一个新的方法，用于收集依赖；


```js
class Depend {
  constructor() {
    this.reactiveFns = new Set() //解决问题一的方法：不使用数组，而是使用Set；
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() { //解决问题二的方法：添加一个新的方法，用于收集依赖；
    if (reactiveFn) { 
      this.reactiveFns.add(reactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}

const obj = {
  name: "why",
  age: 18,
  address: "广州市"
}

// 方案一: Object.defineProperty() -> Vue2
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    set: function(newValue) {
      value = newValue
      const dep = getDepend(obj, key)
      dep.notify()
    },
    get: function() {
      // 拿到obj -> key
      // console.log("get函数中:", obj, key)
      // 找到对应的obj对象的key对应的dep对象
      const dep = getDepend(obj, key)
      // dep.addDepend(reactiveFn)
      dep.depend() //使用depeed()

      return value
    }
  })
})


// ========================= 业务代码 ========================
watchFn(function() {
  console.log(obj.name)
  console.log(obj.age)
  console.log(obj.age)
})

// 修改name
console.log("--------------")
// obj.name = "kobe"
obj.age = 20
// obj.address = "上海市"

```



### **创建响应式对象**

- 我们目前的响应式是针对于obj一个对象的，我们可以创建出来一个函数，针对所有的对象都可以变成响应式对象：

```js
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() {
    if (reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}

// 方案一: Object.defineProperty() -> Vue2
function reactive(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
  
    Object.defineProperty(obj, key, {
      set: function(newValue) {
        value = newValue
        const dep = getDepend(obj, key)
        dep.notify()
      },
      get: function() {
        // 拿到obj -> key
        // console.log("get函数中:", obj, key)
        // 找到对应的obj对象的key对应的dep对象
        const dep = getDepend(obj, key)
        // dep.addDepend(reactiveFn)
        dep.depend()
  
        return value
      }
    })
  })  
  return obj
}

console.log("=============== user =================")
const user = reactive({
  nickname: "abc",
  level: 100
})

watchFn(function() {
  console.log("nickname:", user.nickname)
  console.log("level:", user.level)
})

user.nickname = "cba"
```



## **Vue3响应式原理**

- Vue2中通过我们前面学习过的Object.defineProerty 的方式来实现对象属性的监听； 

- Vue3主要是通过Proxy来监听数据的变化以及收集相关的依赖的；  

  

```js
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() {
    if (reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}

// 方案一: Object.defineProperty() -> Vue2
// function reactive(obj) {
//   Object.keys(obj).forEach(key => {
//     let value = obj[key]
  
//     Object.defineProperty(obj, key, {
//       set: function(newValue) {
//         value = newValue
//         const dep = getDepend(obj, key)
//         dep.notify()
//       },
//       get: function() {
//         // 拿到obj -> key
//         // console.log("get函数中:", obj, key)
//         // 找到对应的obj对象的key对应的dep对象
//         const dep = getDepend(obj, key)
//         // dep.addDepend(reactiveFn)
//         dep.depend()
  
//         return value
//       }
//     })
//   })  
//   return obj
// }

// 方式二: new Proxy() -> Vue3
function reactive(obj) {
  const objProxy = new Proxy(obj, {
    set: function(target, key, newValue, receiver) {
      // target[key] = newValue
      Reflect.set(target, key, newValue, receiver)
      const dep = getDepend(target, key)
      dep.notify()
    },
    get: function(target, key, receiver) {
      const dep = getDepend(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    }
  })
  return objProxy
}


// ========================= 业务代码 ========================
const obj = reactive({
  name: "why",
  age: 18,
  address: "广州市"
})

watchFn(function() {
  console.log(obj.name)
  console.log(obj.age)
  console.log(obj.age)
})

// 修改name
console.log("--------------")
// obj.name = "kobe"
obj.age = 20
// obj.address = "上海市"


console.log("=============== user =================")
const user = reactive({
  nickname: "abc",
  level: 100
})

watchFn(function() {
  console.log("nickname:", user.nickname)
  console.log("level:", user.level)
})

user.nickname = "cba"


```

## 作业

###  四. 实现响应式原理代码，Vue2和Vue3响应式原理有什么区别？

