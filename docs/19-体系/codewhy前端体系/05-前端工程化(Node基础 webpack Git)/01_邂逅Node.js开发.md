

## **Node.js是什么**

- **官方对Node.js 的定义：**
  - Node.js是一个基于V8 JavaScript 引擎的JavaScript 运行时环境。


![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.012.png)

- **也就是说Node.js 基于V8引擎来执行JavaScript 的代码，但是不仅仅只有V8引擎：**
  - 前面我们知道V8可以嵌入到任何 C ++应用程序中，无论是 Chrome还是Node.js ，事实上都是 嵌入了 V8引擎来执行 JavaScript代码；
  - 但是在Chrome 浏览器中，还需要解析、渲染HTML 、CSS等相关渲染引擎，另外还需要提供支持浏览器操作的 API、浏览器 自己的事件循环等；
  - 另外，在Node.js 中我们也需要进行一些额外的操作，比如 文件系统读/写、网络IO 、加密、压缩解压文件 等操作；


## **浏览器和Node.js 架构区别**

- **我们可以简单理解规划出 Node.js和浏览器的差异：**

![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.013.png)

## **Node.js架构**

- **我们来看一个单独的Node.js 的架构图：**
  - 我们编写的JavaScript 代码会经过V8 引擎，再通过Node.js 的Bindings ，将任务放到Libuv 的事件循环中；

- **libuv**（Unicorn Velociraptor— 独角伶盗龙）是使用 C语言编写的库；
  - libuv提供了事件循环、文件系统读写、网络IO 、线程池等等内；


![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.014.png)

### **Node.js的应用场景**

- **Node.js的快速发展也让企业对Node.js技术越来越重视，在前端招聘中通常会对Node.js有一定的要求，特别对于高级前端开发工程师， Node.js更是必不可少的技能：**

![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.015.png)

- 应用一：目前前端开发的库都是以node 包的形式进行管理；
- 应用二：npm 、yarn 、pnpm 工具成为前端开发使用最多的工具；
- 应用三：越来越多的公司使用Node.js 作为web 服务器开发、中间件、代理服务器；
- 应用四：大量项目需要借助Node.js 完成前后端渲染的同构应用；
- 应用五：资深前端工程师需要为项目编写脚本工具（前端工程师编写脚本通常会使用JavaScript，而不是Python或者shell ）；
- 应用六：很多企业在使用Electron 来开发桌面应用程序；

## **Node的安装**

- **Node.js是在2009年诞生的，目前最新的版本是分别是LTS 16.15.1以及Current 18.4.0：**

  - LTS版本：（Long- term support, 长期支持）相对稳定一些，推荐线上环境使用该版本；

  - Current版本：最新的Node 版本，包含很多新特性；

     ![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.016.png)

- **这些我们选择什么版本呢？** 

  - 如果你是学习使用，可以选择current 版本； 
  - 如果你是公司开发，建议选择LTS 版本（面向工作，选择LTS 版本）；

- **Node的安装方式有很多：**

  - 可以借助于一些操作系统上的软件管理工具，比如Mac上的homebrew ，Linux 上的yum、dnf 等；
  - 也可以直接下载对应的安装包下载安装；

- **我们选择下载安装，下载自己操作系统的安装包直接安装就可以了：**

  - window选择. msi安装包，Mac选择.pkg 安装包，Linux 会在后续部署中讲解；
  - 安装过程中会配置环境变量（让我们可以在命令行使用）；
  - 并且会安装npm （ Node Package Manager）工具；


## **Node的版本工具**

- **在实际开发学习中，我们只需要使用一个Node版本来开发或者学习即可。**
- **但是，如果你希望通过可以快速更新或切换多个版本时，可以借助于一些工具：**
  - nvm：Node Version Manager；
  - n：Interactively Manage Your Node.js Versions （交互式管理你的Node.js 版本）

- **问题：这两个工具都不支持window**
  - n：n is not supported natively on Windows.
  - nvm：nvm does not support Windows

- **Window的同学怎么办？**
  - 针对nvm，在GitHub 上有提供对应的window 版本： <https://github.com/coreybutler/nvm-windows>
  - 通过 nvm install latest 安装最新的node 版本
  - 通过 nvm list 展示目前安装的所有版本
  - 通过 nvm use 切换版本


### **版本管理工具：n**

- **安装n：直接使用npm 安装即可**

![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.017.png)

- **安装最新的lts版本：**
  - 前面添加的sudo 是权限问题；
  - 可以两个版本都安装，之后我们可以通过n 快速在两个版本间切换；


![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.018.png) ![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.019.png)

## **JavaScript代码执行**

- **如果我们编写一个js文件，里面存放JavaScript**
- **目前我们知道有两种方式可以执行：**
  - 将代码交给浏览器执行；
  - 将代码载入到node 环境中执行；


**代码，如何来执行它呢？**

- **如果我们希望把代码交给浏览器执行：**
  - 需要通过让浏览器加载、解析html 代码，所以我们需要创建一个html 文件；
  -  ![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.020.png)
  - 在html 中通过script 标签，引入js文件； 
  - 当浏览器遇到script 标签时，就会根据src 加载、执行 JavaScript代码； 

- **如果我们希望把js文件交给node 执行：**
  - 首先电脑上需要安装Node.js 环境，安装过程中会自动配置环境变量； 
  - ![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.021.png)
  - 可以通过终端命令node  js文件的方式来载入和执行对应的js文件； 


## **Node的REPL**

- **什么是REPL 呢？感觉挺高大上**
- **REPL**是**Read -Eval-Print Loop**的简称，翻译为**“读取 -求值- 输出”循环**；
  - REPL是一个简单的、交互式的编程环境；

- **事实上，我们浏览器的console就可以看成一个 REPL。**
- **Node也给我们提供了一个REPL环境，我们可以在其中演练简单的代码**

![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.022.png)![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.023.png)

## **Node程序传递参数**

- **正常情况下执行一个node程序，直接跟上我们对应的文件即可：**
  - `node index.js`


- **但是，在某些情况下执行 node程序的过程中，我们可能希望给node传递一些参数：**
  - `node index.js env=development coderwhy`


- **如果我们这样来使用程序，就意味着我们需要在程序中获取到传递的参数：**
  - 获取参数其实是在process 的内置对象 中的；
  - 如果我们直接打印这个内置对象 ，它里面包含特别的信息：
  - 其他的一些信息，比如版本、操作系统 等大家可以自行查看，后面用到一些其他的我们还会提到；

- **现在，我们先找到其中的 argv属性：**
  - 我们发现它是一个数组，里面包含了我们需要的参数；


![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.024.png)

### **为什么叫argv 呢？**

- **你可能有个疑问，为什么叫argv 呢？**
- **在C/C++程序中的main 函数中，实际上可以获取到两个参数：**
  - argc：argument counter 的缩写，传递参数的个数；
  - argv：argument vector （向量、矢量）的缩写，传入的具体参数。
  - vector翻译过来是矢量的意思，在程序中表示的是一种数据结构。
  - 在C++、Java 中都有这种数据结构，是一种数组结构；
  - 在JavaScript 中也是一个数组，里面存储一些参数信息；

- **我们可以在代码中，将这些参数信息遍历出来，使用：**

![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.025.png)

## **Node的输出**

- **console.log**
  - 最常用的输入内容的方式：console.log

- **console.clear**
  - 清空控制台：console.clear

- **console.trace**
  - 打印函数的调用栈：console.trace

- **还有一些其他的方法，其他的一些console方法，可以自己在下面学习研究一下。**
- <https://nodejs.org/dist/latest-v16.x/docs/api/console.html>

```js
// 1.输出的内容
console.log("Hello World")

const num1 = 100
const num2 = 200

console.log(num1 + num2)


// 2.给程序输入内容
// node ./webpack.config.js env=development
const arg1 = process.argv[2]
const arg2 = process.argv[3]

console.log(arg1, arg2)

setTimeout(() => {
  // console.clear()
  console.trace()
}, 3000);


```



**常见的全局对象**

- **Node中给我们提供了一些全局对象，方便我们进行一些操作：**
-  ![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.026.png)
- 这些全局对象，我们并不需要从一开始全部一个个学习； 
  - 某些全局对象并不常用； 
  - 某些全局对象我们会在后续学习中讲到 ； 
  - 比如module 、exports 、require() 会在模块化中讲到； 
  - 比如Buffer 后续会专门讲到； 


## **特殊的全局对象**

- **为什么我称之为特殊的全局对象呢？**
  - 这些全局对象实际上是模块中的变量，只是 每个模块都有，看来 像是全局变量；
  - 在命令行交互中是不可以使用的；
  - 包括：\_\_dirname 、\_\_filename 、exports 、module 、require()

- **\_\_dirname：**获取当前文件所在的路径：
  - 注意：不包括后面的文件名
- **\_\_filename：**获取当前文件所在的路径和文件名称：
  - 注意：包括后面的文件名称


![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.027.png)

### **常见的全局对象**

- **process对象：**process提供了 Node进程中相关的信息 ：
  - 比如Node 的运行环境、参数信息等；
  - 后面在项目中，我也会讲解，如何将一些环境变量读取到 process 的 env 中；
- **console对象：**提供了简单的调试控制台，在前面讲解输入内容时已经学习过了。
  - 更加详细的查看官网文档：https:/[/nodejs.org/api/console.html](https://nodejs.org/api/console.html)
- **定时器函数：**在Node 中使用定时器有好几种方式：

  - setTimeout(callback, delay[, ...args])：callback 在delay 毫秒后执行一次；
  - setInterval(callback, delay[, ...args])：callback 每delay 毫秒重复执行一次；
  - setImmediate(callback[, ...args])：callbackI / O事件后的回调的“立即”执行；
    - 这里先不展开讨论它和setTimeout(callback, 0) 之间的区别；
    - 因为它涉及到事件循环的阶段问题，我会在后续详细讲解事件循环相关的知识；

  - process.nextTick(callback[, ...args])：添加到下一次tick 队列中；
    - 具体的讲解，也放到事件循环中说明；


  ```js
  // console.log(window)
  
  // 1.类似于window的全局对象
  // console.log(global)
  
  
  // 2.特殊的全局对象
  // __dirname当前的文件所在的目录结构(重要)
  // console.log(__dirname)
  // __filename当前目录+文件名称
  // console.log(__filename)
  
  
  // 3.模块化时具体学习(重要)
  // console.log(module)
  // console.log(exports)
  // console.log(require)
  
  
  // 4.常见的全局对象(了解)
  // console.log(process)
  // console.log(process.argv)
  
  
  // 5.定时器方法
  // setTimeout(() => {
  //   console.log("setTimeout")
  // }, 2000);
  // setInterval(() => {
  //   console.log("setInterval")
  // }, 3000)
  
  // 额外补充: Immediate: 立即/立刻
  setImmediate(() => {
    console.log("setImmediate")
  })
  
  // 额外执行函数
  process.nextTick(() => {
    console.log("nextTick")
  })
  
  
  // 6.全局对象
  console.log(global)
  console.log(globalThis)
  console.log(global === globalThis)
  
  
  ```

  

## **global对象**


- **global是一个全局对象，事实上前端我们提到的process 、console 、setTimeout等都有被放到global 中：**

  - 我们之前讲过：在新的标准中还有一个 globalThis，也是指向全局对象的；

- 类似于浏览器中的window ；

![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.028.png)

### **global和window 的区别**


- **在浏览器中，全局变量都是在window上的，比如有document 、setInterval 、setTimeout、alert 、console 等等**
- **在Node中，我们也有一个global 属性，并且看起来它里面有很多其他对象。**


- **但是在浏览器中执行的JavaScript 代码，如果我们在顶级范围内通过var 定义的一个属性，默认会被添加到window对象上：**

![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.029.png)

- **但是在node中，我们通过var 定义一个变量，它只是在当前模块中有一个变量，不会放到全局中：**

![](./image/Aspose.Words.54a48122-6172-45ef-a60d-9f66042d2935.030.png)

## 课堂笔记

```markdown
# 内容回顾

## 一. 邂逅Node.js

### 1.1. 对Node的认识

#### 1.1.1. Node的概念理解

#### 1.1.2. Node和浏览器区别

#### 1.1.3. Node的架构图




### 1.2. Node的应用场景(自己总结)





### 1.3. Node的安装

#### 1.3.1. 安装Node的LTS版本





#### 1.3.2. Node的版本管理工具nvm(了解)





### 1.4. Node的输入和输出

* 输出: console.log
* 输入: node aaa.js 参数
  * process.argv



### 1.5. Node的全局对象

#### 1.5.1. 特殊的全局对象

* __dirname
* __filename
* exports/require/module.exports





#### 1.5.2. 其他的全局对象

* process
* console
* 定时器
  * setTimeout
  * setInterval
  * setImmediate
  * process.next
* global
  * 和window的区别
  * globalThis

```



