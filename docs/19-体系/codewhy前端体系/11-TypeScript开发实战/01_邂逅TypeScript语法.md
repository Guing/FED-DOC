## 总结

### 一. 邂逅TypeScript

#### 1.1. JavaScript的缺陷

* 类型缺失: 对于标识符是没有任何的类型校验, 有安全隐患.

* ECMAScript自己推出类型校验 => TS淘汰 => 类型思维肯定都是一致的

#### 1.2. TypeScript类型校验

* flow
* TypeScript

#### 1.3. TypeScript的特点

* 始于JavaScript, 归于JavaScript
* 类型校验, 适合开发大型项目
* 拥有JavaScript最新的特性

### 二. TypeScript的语法

### 2.1. 定义变量的方式

* 类型注解
* 类型推导

### 2.2. JavaScript中的数据类型

* number/Number
* string/String
* boolean
* 数组类型
  * any[]
  * `Array<any>`
* 对象类型
  * object
  * { name: string, age: number }

* symbol
* null/undefined

### 2.3. JavaScript中类型练习

* 函数的参数类型
* 函数的返回值类型
* 解析歌词的工具函数: 添加类型
* 对象类型
  * 可选属性 ?

### 2.4. TypeScript特有的类型

* any
* unknown
* void
  * 定义函数的类型时, 会使用
* never类型
  * 自动推导
  * 封装框架/工具: 校验
  * 类型工具: never(了解)
* tuple类型
  * 介于数组和对象之间类型
  * useState封装



## JavaScript类型缺失

### **JavaScript一门优秀的语言**

- 我始终相信：任何新技术的出现都是为了解决原有技术的某个痛点。
- JavaScript是一门优秀的编程语言吗？
  - 每个人可能观点并不完全一致，但是从很多角度来看，JavaScript是一门非常优秀的编程语言；
  - 而且，可以说在很长一段时间内这个语言不会被代替，并且会在更多的领域被大家广泛使用；

- 著名的Atwood定律：
  - Stack Overflow的创立者之一的 Jeff Atwood 在2007年提出了著名的 ****Atwood**定律**。
  - any application that can be written in JavaScript, will eventually be written in JavaScript.
  - 任何可以使用JavaScript来实现的应用都最终都会使用JavaScript实现。

- 其实我们已经看到了，这句话正在一步步被应验：
  - Web端的开发我们一直都是使用JavaScript；
  - 移动端开发可以借助于ReactNative、Weex、Uniapp等框架实现跨平台开发；
  - 小程序端的开发也是离不开JavaScript；
  - 桌面端应用程序我们可以借助于Electron来开发；
  - 服务器端开发可以借助于Node环境使用JavaScript来开发。


### **JavaScript的痛点**

- 并且随着近几年前端领域的快速发展，让JavaScript迅速被普及和受广大开发者的喜爱，借助于JavaScript本身的强大，也让使用JavaScript开发的人员越来越多。
- 优秀的JavaScript没有缺点吗？
  - 其实上由于各种历史因素，JavaScript语言本身存在很多的缺点；
  - 比如ES5以及之前的使用的var关键字关于作用域的问题；
  - 比如最初JavaScript设计的数组类型并不是连续的内存空间；
  - 比如直到今天JavaScript也没有加入类型检测这一机制；


- JavaScript正在慢慢变好
  - 不可否认的是，JavaScript正在慢慢变得越来越好，无论是从底层设计还是应用层面。
  - ES6、7、8等的推出，每次都会让这门语言更加现代、更加安全、更加方便。
  - 但是知道今天，JavaScript在类型检测上依然是毫无进展（为什么类型检测如此重要，我后面会聊到）。


### **类型带来的问题**

- **首先你需要知道，编程开发中我们有一个共识：错误出现的越早越好**
  - 能在**写代码的时候**发现错误，就不要在**代码编译时**再发现（IDE的优势就是在代码编写过程中帮助我们发现错误）。
  - 能在**代码编译期间**发现错误，就不要在**代码运行期间**再发现（类型检测就可以很好的帮助我们做到这一点）。
  - 能在开发阶段发现错误，就不要在测试期间发现错误，能在测试期间发现错误，就不要在上线后发现错误。

- 现在我们想探究的就是如何在 代码编译期间 发现代码的错误：
  - JavaScript可以做到吗？不可以，我们来看下面这段经常可能出现的代码问题。


![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.012.png) ![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.013.png)

### **类型错误**

- 这是我们一个非常常见的错误：
  - 这个错误很大的原因就是因为JavaScript没有对我们传入的参数进行任何的限制，只能等到运行期间才发现这个错误；
  - 并且当这个错误产生时，会影响后续代码的继续执行，也就是整个项目都因为一个小小的错误而深入崩溃；

- 当然，你可能会想：我怎么可能犯这样低级的错误呢？
  - 当我们写像我们上面这样的简单的demo时，这样的错误很容易避免，并且当出现错误时，也很容易检查出来；
  - 但是当我们开发一个大型项目时呢？你能保证自己一定不会出现这样的问题吗？而且如果我们是调用别人的类库，又如何知 道让我们传入的到底是什么样的参数呢？

- 但是，如果我们可以给JavaScript加上很多限制，在开发中就可以很好的避免这样的问题了：
  - 比如我们的getLength函数中str是一个必传的类型，没有调用者没有传编译期间就会报错；
  - 比如我们要求它的必须是一个String类型，传入其他类型就直接报错；
  - 那么就可以知道很多的错误问题在编译期间就被发现，而不是等到运行时再去发现和修改；


### **类型思维的缺失**

- 我们已经简单体会到没有类型检查带来的一些问题，JavaScript因为从设计之初就没有考虑类型的约束问题，所以造成了前端开 发人员关于类型思维的缺失：
  - **前端开发人员**通常不关心变量或者参数是什么类型的，如果在必须确定类型时，我们往往需要使用各种判断验证；
  - 从其他方向转到前端的人员，也会因为没有类型约束，而总是担心自己的代码不安全，不够健壮；

- 所以我们经常会说JavaScript不适合开发大型项目，因为当项目一旦庞大起来，这种宽松的类型约束会带来非常多的安全隐患， 多人员开发它们之间也没有良好的类型契约。
  - 比如当我们去实现一个核心类库时，如果没有类型约束，那么需要对别人传入的参数进行各种验证来保证我们代码的健壮性；
  - 比如我们去调用别人的函数，对方没有对函数进行任何的注释，我们只能去看里面的逻辑来理解这个函数需要传入什么参数， 返回值是什么类型；


### **JavaScript添加类型约束**

- 为了弥补JavaScript类型约束上的缺陷，增加类型约束，很多公司推出了自己的方案：
  - 2014年，Facebook推出了flow来对JavaScript进行类型检查；
  - 同年，Microsoft微软也推出了TypeScript1.0版本；

- 他们都致力于为JavaScript提供类型检查；
- 而现在，无疑TypeScript已经完全胜出：
  - Vue2.x的时候采用的就是flow来做类型检查；
  - Vue3.x已经全线转向TypeScript，98.3%使用TypeScript进行了重构；
  - 而Angular在很早期就使用TypeScript进行了项目重构并且需要使用TypeScript来进行开发；
  - 而甚至Facebook公司一些自己的产品也在使用TypeScript；
- 学习TypeScript不仅仅可以为我们的代码增加类型约束，而且可以培养我们前端程序员具备类型思维。
  - 如果之后想要学习其他语言，比如Java、Dart等也会是驾轻就熟；


## **认识TypeScript**

- 虽然我们已经知道TypeScript是干什么的，也知道它解决了什么样的问题，但是我们还是需要全面的来认识一下TypeScript到底是什么？
- 我们来看一下TypeScript在GitHub和官方上对自己的定义：
  - GitHub说法：TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
  - TypeScript官网：TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
  - 翻译一下：TypeScript是拥有类型的JavaScript超集，它可以编译成普通、干净、完整的JavaScript代码。

- ****怎么理解上面的话呢**？**
  - 我们可以将TypeScript理解成加强版的JavaScript。
  - JavaScript所拥有的特性，TypeScript全部都是支持的，并且它紧随ECMAScript的标准，所以ES6、ES7、ES8等新语法标准，它都是 支持的；
  - TypeScript在实现新特性的同时，总是保持和ES标准的同步甚至是领先；
  - 并且在语言层面上，不仅仅增加了类型约束，而且包括一些语法的扩展，比如枚举类型（Enum）、元组类型（Tuple）等；
  - 并且TypeScript最终会被编译成JavaScript代码，所以你并不需要担心它的兼容性问题，在编译时也可以不借助于Babel这样的工具；

- 所以，我们可以把TypeScript理解成更加强大的JavaScript，不仅让JavaScript更加安全，而且给它带来了诸多好用的好用特性；

### **TypeScript的特点**

- 官方对TypeScript有几段特点的描述，我觉得非常到位（虽然有些官方，了解一下），我们一起来分享一下：
- 始于JavaScript，归于JavaScript
  - TypeScript从今天数以百万计的JavaScript开发者所熟悉的语法和语义开始；
  - 使用现有的JavaScript代码，包括流行的JavaScript库，并从JavaScript代码中调用TypeScript代码；
  - TypeScript可以编译出纯净、 简洁的JavaScript代码，并且可以运行在任何浏览器上、Node.js环境中和任何支持ECMAScript 3（或 更高版本）的JavaScript引擎中；

- TypeScript是一个强大的工具，用于构建大型项目
  - 类型允许JavaScript开发者在开发JavaScript应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构；
  - 类型是可选的，类型推断让一些类型的注释使你的代码的静态验证有很大的不同。类型让你定义软件组件之间的接口和洞察现有 JavaScript库的行为；

- **拥有先进的 JavaScript**
  - TypeScript提供最新的和不断发展的JavaScript特性，包括那些来自2015年的ECMAScript和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件；
  - 这些特性为高可信应用程序开发时是可用的，但是会被编译成简洁的ECMAScript3（或更新版本）的JavaScript；


### **众多项目采用TypeScript**

- ****正是因为有这些特性**，TypeScript目前已经在很多地方被应用：**
  - Angular源码在很早就使用TypeScript来进行了重写，并且开发Angular也需要掌握TypeScript；
  - Vue3源码也采用了TypeScript进行重写，在阅读源码时你会看到大量TypeScript的语法；
  - 包括目前已经变成最流行的编辑器VSCode也是使用TypeScript来完成的；
  - 包括在React中已经使用的ant-design的UI库，也大量使用TypeScript来编写；
  - 目前公司非常流行Vue3+TypeScript、React+TypeScript的开发模式；
  - 包括小程序开发，也是支持TypeScript的；


### **大前端的发展趋势**

- 大前端是一群最能或者说最需要折腾的开发者：
  - 客户端开发者：从Android到iOS，或者从iOS到Android，到RN，甚至现在越来越多的客户端开发者接触前端相关知识
  - Vue、React、Angular、小程序）；
  - 前端开发者：从jQuery到AngularJS，到三大框架并行：Vue、React、Angular，还有小程序，甚至现在也要接触客户端开 发（比如RN、Flutter）；
  - 目前又面临着不仅仅学习ES的特性，还要学习TypeScript；
  - 新框架的出现，我们又需要学习新框架的特性，比如vue3.x、react18等等；
  - 新的工具也是层出不穷，比如vite（版本更新也很快）；

- 但是每一样技术的出现都会让惊喜，因为他必然是解决了之前技术的某一个痛点的，而TypeScript真是解决了JavaScript存在的很多设计缺陷，尤其是关于类型检测的。
- 并且从开发者长远的角度来看，学习TypeScript有助于我们前端程序员培养类型思维， 这种思维方式对于完成大型项目尤为重*要。

## TypeScript编译运行环境

### **TypeScript的编译环境**

- 在前面我们提到过，TypeScript最终会被编译成JavaScript来运行，所以我们需要搭建对应的环境：
  - 我们需要在电脑上安装TypeScript，这样就可以通过TypeScript的Compiler将其编译成JavaScript；


![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.015.png)

- **所以，我们需要先可以先进行全局的安装：**
- 安装命令
  - `npm install typescript -g`


- 查看版本
  - `tsc --version`


### **TypeScript的运行环境**

- 如果我们每次为了查看TypeScript代码的运行效果，都通过经过两个步骤的话就太繁琐了：
  - 第一步：通过tsc编译TypeScript到JavaScript代码；
  - 第二步：在浏览器或者Node环境下运行JavaScript代码；

- 是否可以简化这样的步骤呢？
  - 比如编写了TypeScript之后可以直接运行在浏览器上？
  - 比如编写了TypeScript之后，直接通过node的命令来执行？

- 上面我提到的两种方式，可以通过两个解决方案来完成：
  - 方式一：通过webpack，配置本地的TypeScript编译环境和开启一个本地服务，可以直接运行在浏览器上；
  - 方式二：通过ts-node库，为TypeScript的运行提供执行环境；

- 方式一：webpack配置
  - 方式一在之前的TypeScript文章中我已经有写过，如果需要可以自行查看对应的文章；
  - [https://mp.weixin.qq.com/s/wnL1l-ERjTDykWM76l4Ajw；](https://mp.weixin.qq.com/s/wnL1l-ERjTDykWM76l4Ajw)


- 方式二：安装ts-node

  - `npm install ts-node -g`

  - 另外ts-node需要依赖 tslib 和 @types/node 两个包：
    - `npm install tslib @types/node -g`


  - 现在，我们可以直接通过 ts-node 来运行TypeScript的代码：
    - `ts-node math.ts`


## TypeScript变量声明

### **变量的声明**

- **我们已经强调过很多次，在TypeScript中定义变量需要指定 标识符 的类型。**
- **所以完整的声明格式如下：**
  - **声明了类型后TypeScript就会进行类型检测，声明的类型可以称之为类型注解（Type Annotation）；**
  - `var/let/const 标识符: 数据类型 = 赋值;`


- 比如**我们声明一个message，完整的写法如下：**
  - 注意：这里的string是小写的，和String是有区别的6
  - **string是TypeScript中定义的字符串类型，String是ECMAScript中定义的一个类**


![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.021.png)

- **如果我们给message赋值其他类型的值，那么就会报错：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.022.png)

### **声明变量的关键字**

- **在TypeScript定义变量（标识符）和ES6之后一致，可以使用var、let、const来定义。**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.023.png)

- **当然，在tslint中并不推荐使用var来声明变量：**
- 可见，在TypeScript中并不建议再使用var关键字了，主要原因和ES6升级后let和var的区别是一样的，var是没有块级作用域 的，会引起很多的问题，这里不再展开探讨。

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.024.png)

### **变量的类型推导（推断）**

- **在开发中，有时候为了方便起见我们并不会在声明每一个变量时都写上对应的数据类型，我们更希望可以通过TypeScript本身的 特性帮助我们推断出对应的变量类型：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.025.png)

- **如果我们给message赋值123：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.026.png)

- **这是因为在一个变量第一次赋值时，会根据后面的赋值内容的类型，来推断出变量的类型：**
  - 上面的message就是因为后面赋值的是一个string类型，所以message虽然没有明确的说明，但是依然是一个string类型；


![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.027.png)

```typescript
// 声明一个标识符时, 如果有直接进行赋值, 会根据赋值的类型推导出标识符的类型注解
// 这个过程称之为类型推导
// let进行类型推导, 推导出来的通用类型
// const进行类型推导, 推导出来的字面量类型(后续专门讲解)
let name = "why"
let age = 18
const height = 1.88
```



## JavaScript数据类型

### **JavaScript和TypeScript的数据类型**

- **我们经常说TypeScript是JavaScript的一个超级：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.028.jpeg)

### **JavaScript类型 – number类型**

- **数字类型是我们开发中经常使用的类型，TypeScript和JavaScript一样，不区分整数类型（int）和浮点型（double），统一为 number类型。**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.029.png)

- **学习过ES6应该知道，ES6新增了二进制和八进制的表示方法，而TypeScript也是支持二进制、八进制、十六进制的表示：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.030.png)

### **JavaScript类型 – boolean类型**

- **boolean类型只有两个取值：true和false，非常简单**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.031.png)

### **JavaScript类型 – string类型**

- **string类型是字符串类型，可以使用单引号或者双引号表示：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.032.png)

- **同时也支持ES6的模板字符串来拼接变量和字符串：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.033.png)

### **JavaScript类型 – Array类型**

- **数组类型的定义也非常简单，有两种方式：**
  - `Array<string>`事实上是一种泛型的写法，我们会在后续中学习它的用法；


```typescript
// 明确的指定<数组>的类型注解: 两种写法
// 1. string[]: 数组类型, 并且数组中存放的字符串类型
// 2. Array<string>: 数组类型, 并且数组中存放的是字符串类型

// 注意事项: 在真实的开发中, 数组一般存放相同的类型, 不要存放不同的类型
let names: string[] = ["abc", "cba", "nba"]
names.push("aaa")
// names.push(123)

let nums: Array<number> = [123, 321, 111]
```

- **如果添加其他类型到数组中，那么会报错：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.035.png)

### **JavaScript类型 – Object类型**

- **object对象类型可以用于描述一个对象：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.036.png)

- **但是从myinfo中我们不能获取数据，也不能设置数据：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.037.png)

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.038.jpeg)

### **JavaScript类型 – Symbol类型**

- **在ES5中，如果我们是不可以在对象中添加相同的属性名称的，比如下面的做法：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.039.png)

- **通常我们的做法是定义两个不同的属性名字：比如identity1和identity2。**
- **但是我们也可以通过symbol来定义相同的名称，因为Symbol函数返回的是不同的值：**

****

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.040.png)

### **JavaScript类型 – null和undefined类型**

- **在 JavaScript 中，undefined 和 null 是两个基本数据类型。**
- **在TypeScript中，它们各自的类型也是undefined和null，也就意味着它们既是实际的值，也是自己的类型：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.041.png)

### **函数的参数类型**

- **函数是JavaScript非常重要的组成部分，TypeScript允许我们指定函数的参数和返回值的类型。**
- **参数的类型注解**
  - 声明函数时，可以在每个参数后添加类型注解，以声明函数接受的参数类型：


![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.042.jpeg)

### **函数的返回值类型**

- **我们也可以添加返回值的类型注解，这个注解出现在函数列表的后面：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.043.png)

- **和变量的类型注解一样，我们通常情况下不需要返回类型注解，因为TypeScript会根据 return 返回值推断函数的返回类型：**
  - 某些第三方库处于方便理解，会明确指定返回类型，看个人喜好；


**匿名函数的参数**

- **匿名函数与函数声明会有一些不同：**
  - 当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时；
  - 该函数的参数会自动指定类型；


```typescript
const names: string[] = ["abc", "cba", "nba"]

// 匿名函数是否需要添加类型注解呢? 最好不要添加类型注解
names.forEach(function(item, index, arr) {
  console.log(item, index, arr)
})

```

- 我们并没有指定item的类型，但是item是一个string类型：
  - 这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型；
  - 这个过程称之为**上下文类型（contextual typing）**，因为函数执行的上下文可以帮助确定参数和返回值的类型；
  - **使用匿名函数，最好不要添加类型注解，让它自己根据上下文推断出来。自己写，有可能会写错。**


### **对象类型**

- **如果我们希望限定一个函数接受的参数是一个对象，这个时候要如何限定呢？**
  - 我们可以使用对象类型；


![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.045.png)

- **在这里我们使用了一个对象来作为类型：**
  - 在对象我们可以添加属性，并且告知TypeScript该属性需要是什么类型；
  - **属性之间可以使用 , 或者 ; 来分割**，最后一个分隔符是可选的；
  - 每个属性的类型部分也是可选的，如果不指定，那么就是any类型；
  
  ```typescript
  // 可以使用逗号
  type PointType = {
    x: number,y: number
  }
  //可以使用分号
  type PointType1 = {
    x:number;y:number
  }
  //使用换行，会自动添加分号
  type PointType2 = {
    x:number
    y:number
  }
  ```
  
  


### **可选类型**

- **对象类型也可以指定哪些属性是可选的，可以在属性的后面添加一个?：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.046.jpeg)

## TypeScript数据类型

**TypeScript类型 - any类型**

- **在某些情况下，我们确实无法确定一个变量的类型，并且可能它会发生一些变化，这个时候我们可以使用any类型（类似于Dart 语言中的dynamic类型）。**
  - **any类型有点像一种讨巧的TypeScript手段：**
    - 我们可以对any类型的变量进行任何的操作，包括获取不存在的属性、方法；
    - 我们给一个any类型的变量赋值任何的值，比如数字、字符串的值；


![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.047.png)

- **如果对于某些情况的处理过于繁琐不希望添加规定的类型注解，或者在引入一些第三方库时，缺失了类型注解，这个时候我们可 以使用any：**
  - 包括在Vue源码中，也会使用到any来进行某些类型的适配；


### **TypeScript类型 - unknown类型**

- **unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量。**

  - 和any类型有点类似，但是unknown类型的值上做任何事情都是不合法的；

- 什么意思呢？我们来看下面的场景：

  ```typescript
  let foo: unknown = "aaa"
  foo = 123
  
  // unknown类型默认情况下在上面进行任意的操作都是非法的
  // 要求必须进行类型的校验(缩小)或者类型断言, 才能根据缩小之后的类型, 进行对应的操作
  if (typeof foo === "string") { // 类型缩小
    console.log(foo.length, foo.split(" "))
  }
  ```

- **unknown类型与any类型的区别**

  - `any`: 当你将一个值声明为 `any` 类型时，它表示 TypeScript 不会对该值进行类型检查，允许你在编码过程中使用任何操作，但同时也失去了类型安全性。使用 `any` 可能会导致隐藏的类型错误，使得代码难以维护和调试。
  - `unknown`: `unknown` 类型也用于表示不确定类型的值，但与 `any` 不同的是，使用 `unknown` 时 TypeScript 会强制你进行类型检查和类型断言，以确保类型安全。你需要在使用 `unknown` 值之前进行类型检查或者使用类型断言将其转换为具体类型。

### **TypeScript类型 - void类型**

- **void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.050.png)

- **这个函数我们没有写任何类型，那么它默认返回值的类型就是void的，我们也可以显示的来指定返回值是void：**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.051.png)

- **这里还有一个注意事项：**
  - 我们可以将undefined赋值给void类型，也就是函数可以返回undefined


```typescript
// 1.在TS中如果一个函数没有任何的返回值, 那么返回值的类型就是void类型
// 2.如果返回值是void类型, 那么我们也可以返回undefined(TS编译器允许这样做而已)
function sum(num1: number, num2: number): void {
  console.log(num1 + num2)

  // return 123 错误的做法
}
```

```typescript
// 1.定义要求传入的函数的类型
type ExecFnType = (...args: any[]) => void

// 2.定义一个函数, 并且接收的参数也是一个函数, 而且这个函数的类型必须是ExecFnType
function delayExecFn(fn: ExecFnType) {
  setTimeout(() => {
    fn("why", 18)
  }, 1000);
}

// 3.执行上面函数, 并且传入一个匿名函数
delayExecFn((name, age) => {
  console.log(name, age)
})
```

- **当基于上下文的类型推导（Contextual Typing）推导出返回类型为 void 的时候，并不会强制函数一定不能返回内容。**

```typescript
const names = ["abc", "cba", "nba"]

// 了解即可: 基于上下文类型推导的函数中的返回值如果是void类型, 并且不强制要求不能返回任何的东西
names.forEach((item: string, index: number, arr: string[]) => {
  console.log(item)
  return 123
})

```

### **TypeScript类型 - never类型**

- **never 表示永远不会发生值的类型，比如一个函数：**
  - 如果一个函数中是一个死循环或者抛出一个异常，那么这个函数会返回东西吗？
  - 不会，那么写void类型或者其他类型作为返回值类型都不合适，我们就可以使用never类型；


` `!![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.055.png)

- **never有什么样的应用场景呢？**
  - 当 `message` 的类型为 `string`、`number` 或 `boolean` 时，分别对应的分支会被执行，因此 `check` 不会被赋值，也不会触发类型错误。
  - 但是，如果 `message` 的类型不是这三种之一（例如，当 `message` 的类型为其他类型，比如 `symbol`），那么 `default` 分支会被执行，并尝试将 `message` 赋值给类型为 `never` 的变量 `check`，这会触发类型错误，因为这是不可能发生的情况。
  - 通过将 `check` 的类型设置为 `never`，你在代码中显式地标记了一种不可能出现的情况，从而帮助 TypeScript 在编译时检测到潜在的错误。这种方式有助于提高代码的可维护性和安全性。


```typescript
// 二. 封装框架/工具库的时候可以使用一下never
// 其他时候在扩展工具的时候, 对于一些没有处理的case, 可以直接报错
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case "string":
      console.log(message.length)
      break
    case "number":
      console.log(message)
      break
    case "boolean":
      console.log(Number(message))
      break
    default:
      const check: never = message
  }
}

handleMessage("aaaa")
handleMessage(1234)

// 另外同事调用这个函数
handleMessage(true)
```

### **TypeScript类型 - tuple类型**

- **tuple是元组类型，很多语言中也有这种数据类型，比如Python、Swift等。**

![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.056.png)

- **那么tuple和数组有什么区别呢？**
  - 首先，数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。（可以放在对象或者元组中）
  - 其次，元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型；


![](./image/Aspose.Words.e590d212-e831-4f16-b6cb-d33018be410d.057.png)

- **那么tuple在什么地方使用的是最多的呢？**
  - tuple通常可以作为返回的值，在使用的时候会非常的方便；


```typescript
// 在函数中使用元组类型是最多的(函数的返回值)
function useState(initialState: number): [number, (newValue: number) => void] {
  let stateValue = initialState
  function setValue(newValue: number) {
    stateValue = newValue
  }

  return [stateValue, setValue]
}

const [count, setCount] = useState(10)
console.log(count)
setCount(100)
```

## 作业

### 二. JavaScript有什么缺点？TypeScript弥补了JavaScript的什么缺点？

### 三. TypeScript有什么特点？哪些框架或者项目在使用TypeScript？

### 四. TypeScript的运行环境如何搭建？如何运行TypeScript代码？

### 五. 如何定义TypeScript的变量，定义变量支持哪些JavaScript类型？

### 六. 常见的TypeScript特有类型有哪些？这些类型有什么作用？
