

## **JavaScript代码的引擎**

- **JavaScript代码下载好之后，是如何一步步被执行的呢？**
- **我们知道，浏览器内核是由两部分组成的，以webkit为例：**
- WebCore**：**负责HTML解析、布局、渲染等等相关的工作；
- JavaScriptCore**：**解析、执行JavaScript代码；

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.014.png)

- **另外一个强大的JavaScript引擎就是V8引擎。**

## **V8引擎的执行原理**

- **我们来看一下官方对V8引擎的定义：**
  - V8是用C ++编写的Google开源高性能JavaScript和WebAssembly引擎，它用于Chrome和Node.js等。
  - 它实现[ECMAScript](https://tc39.es/ecma262/)和[WebAssembly](https://webassembly.github.io/spec/core/)，并在Windows 7或更高版本，macOS 10.12+和使用x64，IA-32，ARM或MIPS处理 器的Linux系统上运行。
  - V8可以独立运行，也可以嵌入到任何C ++应用程序中。
  

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.015.jpeg)

### **V8引擎的架构**

- V8引擎本身的源码**非常复杂**，大概有超过**100w行C++代码**
- 通过了解它的架构，我们可以知道它是如何对JavaScript执行的：
- Parse模块
  - Parse模块会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码；
  - 如果函数没有被调用，那么是不会被转换成AST的；
  - Parse的V8官方文档：http[s://v8.dev/blog/scanner](https://v8.dev/blog/scanner)

- Ignition解释器
  - 会将AST转换成ByteCode（字节码）
  - 同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）；
  - 如果函数只调用一次，Ignition会解释执行ByteCode；
  - Ignition的V8官方文档：https[://v8.dev/blog/ignition-interpreter](https://v8.dev/blog/ignition-interpreter)

- TurboFan编译器
  - 可以将字节码编译为CPU可以直接执行的机器码；
  - 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过TurboFan转换成优化的机器码，提高代码的执行性能；
  - 但是，机器码实际上也会被还原为ByteCode
    - 这是因为如果后续执行函数的过程中，类型发生了变化（比如sum函数原来执 行的是number类型，后来执行变成了string类型），之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码；

  - TurboFan的V8官方文档：https[://v8.dev/blog/turbofan-jit](https://v8.dev/blog/turbofan-jit)


**所以在了解TurboFan编译器时，我们写函数时，尽量使用同一个类型的参数或者使用typescript时，就可以加快代码的执行效率**

### **V8引擎的解析图（官方）**

![](image/03-%E6%B7%B1%E5%85%A5JavaScript%E7%9A%84%E8%BF%90%E8%A1%8C%E5%8E%9F%E7%90%86/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.016.jpeg)

- **词法分析（英文lexical analysis）**

  - 将字符序列转换成token序列 的过程。
  - token是**记号化**（tokenization）的缩写

  - **词法分析器**（lexical analyzer，简称lexer），也 叫**扫描器**（scanner）


- **语法分析（英语：syntactic analysis，也叫 parsing）**
  - **语法分析器也可以称之为** parser。

- 一行代码，比如`var num = 10`
  - 先通过词法分析，也就是将`var`,`num`,`=`,`10`这些分组
  - 然后再通过语法分析，也就是分析其中的语法含义，比如找到`var`，那就这一行代码就是声明变量。


### **V8引擎的解析图**

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.017.jpeg)



## **JavaScript的执行原理**

### **JavaScript代码执行原理 - 版本说明**

- **在ECMA早期的版本中（ECMAScript3），代码的执行流程的术语和ECMAScript5以及之后的术语会有所区别：**

  - 目前网上大多数流行的说法都是基于ECMAScript3版本的解析 ，并且在面试时问到的大多数都是ECMAScript3的版本内容。
  - 但是ECMAScript3终将过去， ECMAScript5必然会成为主流 ，所以最好也理解ECMAScript5甚至包括ECMAScript6以及更好版本的内容；

  - 事实上在TC39（ ECMAScript5 ）的最新描述中，和ECMAScript5之后的版本又出现了一定的差异；


- **那么我们课程按照如下顺序学习：**
  - 通过ECMAScript3中的概念学习JavaScript执行原理、作用域、作用域链、闭包等概念；
  - 通过ECMAScript5中的概念学习块级作用域、let、const等概念；

- **事实上，它们只是在对某些概念上的描述不太一样，在整体思路上都是一致的。**

### **JavaScript的执行过程**

- 假如我们有下面一段代码，它在JavaScript中是如何被执行的呢？

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.018.png)

### **初始化全局对象**

- js引擎会在执行代码之前，会在堆内存中创建一个全局对象：Global Object（GO）
- 该对象 所有的作用域（scope）都可以访问；
- 里面会包含Date、Array、String、Number、setTimeout、setInterval等等；
- 其中还有一个window属性指向自己；

` `![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.019.png)![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.020.png)

### **执行上下文（ Execution Contexts ）**

- js引擎内部有一个**执行上下文栈（Execution Context Stack，简称ECS）**，它是用于执行代码的调用栈。
- 那么现在它要执行谁呢？执行的是**全局的代码块**：
  - 全局的代码块为了执行会构建一个**Global Execution Context（GEC）**；
  - GEC会 被放入到ECS中 执行；


- **GEC被放入到ECS中里面包含两部分内容：**

  - **第一部分：**在代码执行前，在parser转成AST的过程中，会将全局定义的变量、函数等加入到GlobalObject中，但是并不会 赋值；
    - 这个过程也称之为变量的**作用域提升（hoisting）**


  - **第二部分：**在代码执行中，对变量赋值，或者执行其他的函数；


![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.021.png)

### **认识VO对象（Variable Object）**

- **每一个执行上下文会关联一个VO（Variable Object，变量对象），变量和函数声明会被添加到这个VO对象中。**

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.022.png)

- **当全局代码被执行的时候，VO就是GO对象了**

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.023.png)

### **全局代码执行过程（执行前）**

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.024.jpeg)

### **全局代码执行过程（执行后）**

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.025.jpeg)

### **函数如何被执行呢？**


- 在执行的过程中**执行到一个函数时**，就会根据**函数体**创建一个**函数执行上下文（Functional Execution Context，简称FEC）**，并且压入到**EC Stack**中。


- **因为每个执行上下文都会关联一个VO，那么函数执行上下文关联的VO是什么呢？**

  - 当进入一个函数执行上下文时，会创建一个AO对象（Activation Object）；
  - 这个AO对象会使用arguments作为初始化，并且初始值是传入的参数；
  - 这个AO对象会作为执行上下文的VO来存放变量的初始化；


![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.026.png)

### **函数的执行过程（执行前）**

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.027.jpeg)

### **函数的执行过程（执行后）**

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.028.jpeg)

## **作用域和作用域链（Scope Chain）**

- **当进入到一个执行上下文时，执行上下文也会关联一个作用域链（Scope Chain）**
  - 作用域链是一个对象列表，用于变量标识符的求值；
  - 当进入一个执行上下文时，这个作用域链被创建，并且根据代码类型，添加一系列的对象；

- **注意：作用域链的创建，是在函数声明的时候确定的，而不是在函数调用的时候。**

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.029.png)

![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.030.png) ![](image/Aspose.Words.77779478-4789-41fd-95da-692768ae6395.031.png)

## 自己的总结

- js引擎在执行代码之前，会将代码进行转化成字节码再执行，在转化的这个阶段，会先提取变量声明，函数声明，但是并不会赋值
	- 这就是变量声明提升和函数声明提升，所以函数能在函数声明之前执行
	- 函数声明先于变量声明，所以如果两个同名的话，变量声明会覆盖掉函数声明。
- js引擎在代码执行之前，会先创建一个global object，这个全局对象包括内置对象，函数等，比如Math,String,setTimeout等，也包括全局声明的变量与函数
- 接着，JS会创建一个堆空间，和一个执行上下文栈（Execution context stack）
- 全局代码开始执行时，会创建一个全局的执行上下文（global Execution context）,并压入到执行上下文栈中
- 每一个执行上下文都会关联一个变量对象（Variable Object），这个VO对象，会保存变量声明和函数声明。
  - 全局执行上下文关联的VO对象，其实就是全局对象。
- 接着代码继续执行，如果变量赋值等，会修改VO对象保存的变量值。如果遇到函数执行，则会创建一个函数执行的上下文（Functional Execution context）,并压入到执行上下文栈中
- 函数执行上下文创建的时候，也会创建一个新的VO对象，这个VO对象也叫做（Activation Object），这个AO对象也是会保存变量声明和函数声明
- 当函数执行完时，函数执行上下文就会出栈，对应的VO对象如果没有特殊情况下则会被垃圾回收销毁。
- 当函数声明时，还会创建一个作用域链对象数组，保存了函数在声明时，对应的上级作用域
  - 在chrome浏览器下，可以通过watch一个函数，查看函数的[[scope]]属性，会有相应的作用域对象。如果没有找到，可以使用闭包，因为chrome内核做了一些优化。如果没有引用变量，则移除上层作用域对象。
  - 作用域链是在函数声明的时候就已经确定了，和函数调用是没有关系的。
- 当函数里的变量开始查找时，会先查找本身的VO对象，如果查找不到，再通过作用域链一层层往上查找

- 其他一些特殊情况
  - 多层函数嵌套声明时，只有当函数执行时，内部嵌套的函数声明才会被提取。因为根本就没有执行，不知道函数内部是什么。
  - 使用`message = 123`,`var a = b = 123`时，`message`,'b'会隐式地变为全局变量，就算在函数内部也是。
  - 在函数内部renturn语句后，添加变量声明，这个变量声明也是会提升。因为在代码解析时，这个return根本不起作用，所以不管。return是在执行代码时才有用。

## **作用域提升面试题**

```js
      // 1.面试题一:
      var n = 100;
      function foo() {
        n = 200;
      }
      foo();

      console.log(n); //200

      // 2.面试题二:
      var n = 100;
      function foo() {
        console.log(n); //undefined
        var n = 200;
        console.log(n); //200
      }

      foo();

      // 3.面试题三:
      var n = 100;

      function foo1() {
        console.log(n); //100
      }
      function foo2() {
        var n = 200;
        console.log(n); //200
        foo1();
      }
      foo2();

      //在函数内部renturn语句后，添加变量声明，这个变量声明也是会提升。因为在代码解析时，这个return根本不起作用，所以不管。return是在执行代码时才有用。
      // 4.面试题四:
      var n = 100;
      function foo() {
        console.log(n); //undefined
        return;
        var n = 200;
      }
      foo();


//使用`message = 123`,`var a = b = 123`时，`message`,'b'会隐式地变为全局变量，就算在函数内部也是
      // 5.在开发中可能会出现这样错误的写法
      function foo() {
        message = "Hello World";
      }
      foo();
      console.log(message); //'Hello World'

      // 6.面试题五:
      function foo() {
        var a = (b = 100);
      }
      foo();
      console.log(b); //100
```

## 作业



###### 三. 说出浏览器输入一个URL到页面显示的过程



###### 四. 说说async和defer的使用以及区别



###### 五. 写出v8引擎执行代码的大致流程
