## **什么是生成器？**

- **生成器是ES6中新增的一种函数控制、使用的方案，它可以让我们更加灵活的控制函数什么时候继续执行、暂停执行等。**

  - 平时我们会编写很多的函数，这些函数终止的条件通常是返回值或者发生了异常。

- **生成器函数也是一个函数，但是和普通的函数有一些区别：**

  - 首先，生成器函数需要在**function的后面加一个符号：\***

  - 其次，生成器函数可以通过**yield关键字**来控制函数的执行流程：

  - 最后，生成器函数的返回值是一个**Generator（生成器）**：

    - **生成器事实上是一种特殊的迭代器；**

    - > MDN：Instead, they return a special type of iterator, called a **Generator**.


## **生成器函数执行**

- **我们发现下面的生成器函数foo的执行体压根没有执行，它只是返回了一个生成器对象。**
  - 那么我们如何可以让它执行函数中的东西呢？调用next即可；
    - **next执行控制函数执行到yield的左边**。

  - 我们之前学习迭代器时，知道迭代器的next是会有返回值的；
  - 但是我们很多时候不希望next返回的是一个undefined，这个时候我们可以通过yield来返回结果；


```js
/*
  生成器函数: 
    1.function后面会跟上符号: *
    2.代码的执行可以被yield控制
    3.生成器函数默认在执行时, 返回一个生成器对象
      * 要想执行函数内部的代码, 需要生成器对象, 调用它的next操作
      * 当遇到yield时, 就会中断执行
*/

// 1.定义了一个生成器函数
function *foo(){
  console.log('aaaa');
  yield "1111"
  console.log('bbbb');
  yield "2222"
  console.log('cccc');
}

// 2.调用生成器函数, 返回一个 生成器对象
const generator = foo();
// 调用next方法
console.log(generator.next()) ;//遇到第一个yield执行暂停，{value: '1111', done: false}
console.log(generator.next());//遇到第二个yield执行暂停，{value: '2222', done: false}
console.log(generator.next());//执行剩余代码，{value: undefined, done: true}
```

## **生成器传递参数 – next函数**

- **函数既然可以暂停来分段执行，那么函数应该是可以传递参数的**
  - 我们在调用next函数的时候，可以给它传递参数，那么这个参数会作为**上一个yield语句的返回值**； 
  - 注意：也就是说我们是为本次的函数代码块执行提供了一个值；


```js
function *foo(arg1){
  console.log(arg1);
  const arg2 = yield "1111"
  console.log(arg2);//cccc
  const arg3 = yield "2222"
  console.log(arg3);//dddd
}

const generator = foo('aaaa');

console.log(generator.next()) ; //没有上一个yield，第一次执行，不可以传入参数，可以通过函数本身进行传参。
console.log(generator.next('cccc'));//arg2为cccc
console.log(generator.next('dddd'));//arg3为dddd
```



## **生成器提前结束 – return函数**

- **还有一个可以给生成器函数传递参数的方法是通过return函数：**
  - return传值后这个生成器函数就会结束，之后调用next不会继续生成值了；


```js
function *gen(arg1){
  console.log(arg1);
  const arg2 = yield "1111"
  console.log(arg2);
  const arg3 = yield "2222"
  console.log(arg3);
  const arg4 = yield "3333"
  console.log(arg4);
}

const generator = gen('aaaa');

console.log(generator.next()) ;//{value: '1111', done: false}
console.log(generator.return('cccc'));//返回{value: 'cccc', done: true}，生成器函数后面的代码都不会执行
console.log(generator.next('dddd'));//{value: undefined, done: true}
console.log(generator.next('eeee'));//{value: undefined, done: true}
```

## **生成器抛出异常 – throw函数**

- **除了给生成器函数内部传递参数之外，也可以给生成器函数内部抛出异常：**
  - 抛出异常后我们可以在生成器函数中捕获异常；
  - 但是在catch语句中不能继续yield新的值了，但是可以在catch语句外使用yield继续中断函数的执行；


```js

function *foo(){
  console.log('函数开始执行');

  try{
    yield "1111"
  }catch(err){
      console.log('错误：',err);//错误： error
  }
  yield "2222"
  console.log("函数执行结束");

}

let generator = foo();

console.log( generator.next());//{value: '1111', done: false}
console.log( generator.throw('error')) //{value: '2222', done: false} ，继续执行到下一个yield
console.log(generator.next());//{value: undefined, done: true}
```

## **生成器替代迭代器**

- **我们发现生成器是一种特殊的迭代器，那么在某些情况下我们可以使用生成器来替代迭代器：**

 ```js
 // 1.对之前的代码进行重构(用生成器函数)
 const names = ["abc", "cba", "nba"]
 
 //1.以前自己创建迭代器的做法
 // let index = 0
 // const namesIterator = {
 //   next: function() {
 //     // done: Boolean
 //     // value: 具体值/undefined
 //     if (index < names.length) {
 //       return { done: false, value: names[index++] }
 //     } else {
 //       return { done: true }
 //     }
 //   }
 // }
 //  console.log(namesIterator.next())
 
 //2.使用生成器替换迭代器
 function* createArrayIterator(arr) {
   for (let i = 0; i < arr.length; i++) {
     yield arr[i]
   }
   // yield arr[0]
   // yield arr[1]
   // yield arr[2]
   // return undefined
 }
 const namesIterator = createArrayIterator(names)
 console.log(namesIterator.next())
 
 ```

## yield\*语法糖

- 事实上我们还可以使用yield*来遍历可迭代对象
  - yield* 后面必须是一个可迭代对象
  - 这个时候相当于是一种yield的语法糖，只不过会依次迭代这个可迭代对象，每次迭代其中的一个值；

```js
const names = ["abc", "cba", "nba"]


function* createArrayIterator(arr) {
    yield* arr
    //相当于
    // for(let item of arr){
    //     yield item
    // }
}

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
```



## **自定义类迭代 – 生成器实现**

- **在之前的自定义类迭代中，我们也可以换成生成器：**

```js
// 2.yield替换类中的实现
class Person {
  constructor(name, age, height, friends) {
    this.name = name
    this.age = age
    this.height = height
    this.friends = friends
  }

  // 实例方法
  *[Symbol.iterator]() {
    yield* Object.entries(this)
  }
}

const p = new Person("why", 18, 1.88, ["kobe", "james", "curry"])
for (const item of p) {
  console.log(item)
}

//['name', 'why']
//['age', 18]
//['height', 1.88]
//['friends', Array(3)]
```

