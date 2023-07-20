

## **什么是模块化？**

- **到底什么是模块化、模块化开发呢？**
  - 事实上模块化开发最终的目的是将程序划分成 一个个小的结构；
  - 这个结构中编写属于自己的逻辑代码，有 自己的作用域，定义变量名词时不会影响到其他的结构；
  - 这个结构可以将自己希望暴露的 变量、函数、对象等导出给其结构使用；
  - 也可以通过某种方式，导入 另外结构中的变量、函数、对象 等；

- **上面说提到的结构，就是 模块；按照这种 结构划分开发程序的过程，就是 模块化开发的过程；**
  - 无论你多么喜欢JavaScript ，以及它现在发展的有多好，它都有很多的缺陷：
    - 比如var 定义的变量作用域问题；
    - 比如JavaScript 的面向对象并不能像常规面向对象语言一样使用 class；
    - 比如JavaScript 没有模块化的问题；

- **对于早期的JavaScript 没有模块化来说，确确实实带来了很多的问题；**

### **模块化的历史**

- **在网页开发的早期，** Brendan Eich**开发JavaScript 仅仅作为一种脚本语言，做一些简单的表单验证或动画实现等，那个时候代 码还是很少的：**
  - 这个时候我们只需要讲JavaScript 代码写到 <script>标签中即可；
  - 并没有必要放到多个文件中来编写；甚至流行：通常来说 JavaScript 程序的长度只有一行。

- **但是随着前端和JavaScript 的快速发展， JavaScript代码变得越来越复杂了：**
  - ajax的出现，前后端开发分离 ，意味着后端返回数据后，我们需要通过 JavaScript进行前端页面的渲染 ；
  - SPA的出现，前端页面变得更加复杂：包括 前端路由、状态管理 等等一系列复杂的需求需要通过JavaScript 来实现；
  - 包括Node 的实现，JavaScript 编写复杂的后端程序 ，没有模块化是致命的硬伤；

- **所以，模块化已经是JavaScript 一个非常迫切的需求：**
  - 但是JavaScript 本身，直到ES6 （2015 ） 才推出了自己的模块化方案 ；
  - 在此之前，为了让JavaScript 支持模块化，涌现出了很多不同的模块化规范： AMD、CMD 、CommonJS 等；
  - 在我们的课程中，我将详细讲解 JavaScript的模块化，尤其是CommonJS 和ES6 的模块化。


### **没有模块化带来的问题**

- **早期没有模块化带来了很多的问题：比如命名冲突的问题**
- **当然，我们有办法可以解决上面的问题：立即函数调用表达式（IIFE ）**
  - **IIFE**(Immediately Invoked Function Expression)
- **但是，我们其实带来了新的问题：**
  - 第一，我必须记得每一个模块中返回对象的命名，才能在其他模块使用过程中正确的使用；
  - 第二，代码写起来混乱不堪，每个文件中的代码都需要包裹在一个匿名函数中来编写；
  - 第三，在没有合适的规范 情况下，每个人、每个公司都可能会任意命名、甚至出现模块名称相同的情况；

- **所以，我们会发现，虽然实现了模块化，但是我们的实现过于简单，并且是没有规范的。**
  - 我们需要制定一定的规范来约束每个人都按照这个规范去编写模块化的代码；
  - 这个规范中应该包括核心功能： 模块本身可以导出暴露的属性，模块又可以导入自己需要的属性；
  - JavaScript社区为了解决上面的问题，涌现出一系列好用的规范 ，接下来我们就学习具有代表性的一些规范。


```js
const moduleA = (function() {
  let name = "why"
  let age = 18
  let height = 1.88
  console.log(name)

  return {
    name,
    age,
    height
  }
}())

// ECMAScript没有推出来自己的模块化方案: CommonJS/AMD/CMD
// ES6(ES2015)推出自己的模块化方案: ESModule

```



## CommonJS规范

### **CommonJS规范和Node 关系**

- **我们需要知道CommonJS 是 一个规范，最初提出来是在浏览器以外的地方使用，并且当时被命名为ServerJS ，后来为了体现它 的广泛性，修改为CommonJS ，平时我们也会简称为 CJS。**
  - Node是CommonJS 在服务器端一个具有代表性的实现；
  - Browserify是CommonJS 在浏览器中的一种实现；
  - webpack打包工具具备对CommonJS 的支持和转换；

- **所以，Node中对CommonJS 进行了支持和实现，让我们在开发node的过程中可以方便的进行模块化开发：**
  - 在Node 中每一个js 文件都是一个单独的模块；
  - 这个模块中包括CommonJS 规范的核心变量：exports、module.exports 、require ；
  - 我们可以使用这些变量来方便的进行模块化开发 ；




- **前面我们提到过模块化的核心是导出和导入， Node中对其进行了实现：**
  - exports和module.exports 可以负责对模块中的内容进行导出 ；
  - require函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；


### **exports导出**

- **注意：exports 是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出；**

```js
const UTIL_NAME = "util_name"

function formatCount() {
  return "200万"
}

function formatDate() {
  return "2022-10-10"
}

console.log(exports) // {}

exports.UTIL_NAME = UTIL_NAME
exports.formatCount = formatCount
exports.formatDate = formatDate
```



- **另外一个文件中可以导入：**

```js
const { 
  UTIL_NAME,
  formatCount, 
  formatDate 
} = require("./util.js")

console.log(UTIL_NAME)
console.log(formatCount())
console.log(formatDate())
```

#### **exports和require返回对象之间的关系**

- require函数的返回对象本质是对exports对象的引用
  - 如果直接修改require返回的对象，会影响到原来的值

```js
//bar.js
let name = "bar"
exports.name = name
// 2.4s之后获取
setTimeout(() => {
  console.log(exports.name)  //值被main.js修改，变成koke
}, 4000)


//main.js
const bar = require("./bar.js")
console.log(bar.name) // bar
setTimeout(() => {
  bar.name = "kobe"
}, 2000)

```

![image-20230720194802829](C:\Users\Black\AppData\Roaming\Typora\typora-user-images\image-20230720194802829.png)

### **module.exports导出**

- 但是Node中我们经常导出东西的时候，又是通过module.exports 导出的：

  - module.exports和exports 有什么关系或者区别呢？

- 我们追根溯源，通过维基百科中对CommonJS 规范的解析：
  - CommonJS中是没有 module.exports的概念的；
  - 但是为了实现模块的导出，Node 中使用的是Module 的类，每一个模块都是Module 的一个实例，也就是 module；

  - Node为了符合CommonJS规范，加了一个exports对象
  - **exports对象是对module 对象的exports 属性的一个引用** ；
  - 也就是说 module.exports = exports = main中的require返回的bar ；

- 所以**在Node 中真正用于导出的其实根本不是exports ，而是 module.exports**；

  - **因为module 才是导出的真正实现者**；
  - **require函数查找的也是module.exports**

- 所以当使用以下代码时，**module.exports指向一个新的对象。这时与exports不是同一个引用，所以修改exports是无效的。**

```js
const name = "foo"
const age = 18
function sayHello() {
  console.log("sayHello")
}
module.exports = {
  name,
  age,
  sayHello
}

exports.name = "哈哈哈哈" //这样的写法是无效的。
```




### **require查找文件细节**

- **我们现在已经知道，require 是一个函数，可以帮助我们引入一个文件（模块）中导出的对象。**
- **那么，require 的查找规则是怎么样的呢？**
  - 这里我总结比较常见的查找规则 **：**
  - 导入格式如下：require(X)

- **情况一：X是一个Node核心模块，比如path 、http**
  - 直接返回核心模块，并且停止查找


- **情况二：X是以 ./ 或 ../ 或 /（根目录）开头的**

  - 第一步：将X 当做一个文件在对应的目录下查找；
    - 1.如果有后缀名，按照后缀名的格式查找对应的文件
    - 2.如果没有后缀名，会按照如下顺序：
      - 1> 直接查找文件X
      - 2> 查找X.js 文件
      - 3> 查找X.json 文件
      - 4> 查找X.node 文件


  - 第二步：没有找到对应的文件，将X作为一个目录

    - 查找目录下面的index 文件

      - 1> 查找X/ index.js文件

      - 2> 查找X/ index.json文件

      - 3> 查找X/ index.node文件

  - 如果没有找到，那么报错：not found


- **情况三：直接是一个X（没有路径），并且X不是一个核心模块**
  - `/Users/coderwhy/Desktop/Node/TestCode/04\_learn\_node/05\_javascript-module/02\_commonjs/main.js`中编写` require('why’)`
  - 如果下面的路径中都没有找到，那么报错：not found

![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.015.png)

```js
// 1.根据路径导入自己编写模块
const utils = require("./utils")
console.log(utils.formatDate())

const foo = require("./foo")


// 2.导入node提供给内置模块
const path = require("path")
const http = require("http")
console.log(path, http)


// 3.情况三: 名称不是路径, 也不是一个内置模块
const why = require("why")
console.log(why)

const axios = require("axios")
console.log(axios)
```

### **模块的加载过程**

- **结论一：模块在被第一次引入时，模块中的js 代码会被运行一次**

```js
/*aaa.js文件*/
console.log('aaa');

// 1.结论一: 当一个模块被引入(导入), 模块中的代码会被执行一次
const foo = require("./aaa") //打印aaa
```

- **结论二：模块被多次引入时，会缓存，最终只加载（运行）一次**

  - 为什么只会加载运行一次呢？ 
    - **这是因为每个模块对象module 都有一个属性： loaded。** 
    - 为false 表示还没有加载，为true表示已经加载； 

  ```js
  /*aaa.js文件*/
  console.log('aaa');
  
  
  
  // 2.结论二: 当一个模块被多次引入时, 模块中的代码只会执行一次
  console.log("--------")
  
  const foo = require("./foo")
  
  console.log("++++++++")
  
  
  const foo2 = require("./foo") //不会执行
  const foo3 = require("./foo") //不会执行
  const foo4 = require("./foo") //不会执行
  
  
  
  /*
  
  --------
  aaa
  ++++++++
  
  */
  ```

  

- **结论三：如果有循环引入，那么加载顺序是什么？** 

  - 如果出现右图模块的引用关系，那么加载顺序是什么呢？ 
  - 这个其实是一种数据结构：图结构；
  - 图结构在遍历的过程中，有深度优先搜索（DFS, depth first search ）和广度优先搜索（BFS, breadth first search ）；
  - Node采用的是深度优先算法：
    - main  -> aaa -> ccc -> ddd -> eee 
    - bbb->ccc(已被加载)->eee(已被加载)

  ![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.016.png)

- **结论四：如果未执行完，发生了循环引用。**
  - **Node.js不会再执行引用的模块，而是将已经被解析的模块对象部分导出，从而避免了循环依赖造成的死锁问题。**

```js
//aaa.js
console.log("aaa")
module.exports.name = 'aaa哈哈'
console.log( require("./bbb"))
module.exports.name = 'aaa嘿嘿' //导出的对象写在后面，则bbb.js不会获取到。
console.log("aaa2222")

//bbb.js
console.log("bbb")
console.log(require("./aaa")) //由于aaa.js未执行完，这里不会再执行aaa.js，而是返回aaa.js中已经导出的对象。
console.log("bbb222")

module.exports.name = 'bbb哈哈'

/*
aaa
bbb
{ name: 'aaa哈哈' }
bbb222
{ name: 'bbb哈哈' }
aaa2222

*/

```




### **CommonJS规范缺点**

- **CommonJS加载模块是同步的：**
  - 同步的意味着只有等到对应的模块加载完毕， 当前模块中的内容才能被运行；
  - 这个在服务器不会有什么问题，因为服务器加载的 js文件都是本地文件，加载速度非常快；
  
- **如果将它应用于浏览器呢？**

  - 浏览器加载js 文件需要先从服务器将文件下载下来，之后 再加载运行 ；
  - 那么采用同步的就意味着后续的 js代码都无法正常运行，即使是一些简单的 DOM操作；

- **所以在浏览器中，我们通常不使用CommonJS 规范：**

  - 当然在webpack 中使用CommonJS 是另外一回事；
  - 因为它会将我们的代码转成浏览器可以直接执行的代码；

- 在早期为了可以**在浏览器中使用模块化，通常会采用AMD或 CMD**：

  - 但是目前一方面现代的浏览器已经支持 ES Modules，另一方面借助于 webpack等工具可以实现对 CommonJS或者ES Module 代码的转换；

  - AMD和CMD 已经使用非常少了；


## **AMD规范**

- **AMD主要是应用于浏览器的一种模块化规范：**
  - AMD是Asynchronous Module Definition （异步模块定义）的缩写；
  - 它采用的是异步加载模块 ；
  - 事实上AMD 的规范还要早于CommonJS ，但是 CommonJS目前依然在被使用，而AMD 使用的较少了；

- 我们提到过，**规范只是定义代码的应该如何去编写**，只有有了具体的实现才能被应用：
  - AMD实现的比较常用的库是require.js 和curl.js ；


### **require.js的使用**

- **第一步：下载require.js**
  - 下载地址：h[ttps://github.com/requirejs/requirejs](https://github.com/requirejs/requirejs)
  - 找到其中的require.js 文件；

- **第二步：定义HTML的script 标签引入require.js 和定义入口文件：**
  - data-main属性的作用是在加载完 src的文件后会加载执行该文件


<script src="./lib/require.js" data-main="./index.js"></script>

![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.017.png)  ![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.018.png)![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.019.png)

## CMD规范

- **CMD规范也是应用于浏览器的一种模块化规范：**
  - CMD 是Common Module Definition （通用模块定义） 的缩写；
  - 它也采用的也是异步加载模块，但是它将 CommonJS的优点吸收了过来；

- 但是目前CMD 使用也非常少了；
- **CMD也有自己比较优秀的实现方案：**
  - SeaJS


### **SeaJS的使用**

- **第一步：下载SeaJS**
  - 下载地址：htt[ps://github.com/seajs/seajs](https://github.com/seajs/seajs)
  - 找到dist文件夹下的sea.js

- **第二步：引入sea.js 和使用主入口文件**
  - seajs是指定主入口文件的


![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.020.png) ![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.021.png)

## **ES Module**

- **JavaScript没有模块化一直是 它的痛点，所以才会产生我们前面学习的社区规范：CommonJS 、AMD 、CMD 等，所以在 ECMA推出自己的模块化系统时，大家也是兴奋异常。**
- **ES Module和CommonJS 的模块化有一些不同之处：**
  - 一方面它使用了import 和export关键字；
  - 另一方面它采用编译期的静态分析，并且也加入了动态引用的方式 ；

- **ES Module模块采用export 和import 关键字来实现模块化：**
  - export负责将模块内的内容导出；
  - import负责从其他模块导入内；

- **采用ES Module将自动采用严格模式：use strict**

```js
/*foo.js*/
const name = "why"
const age = 18

function sayHello() {
  console.log("sayHello")
}

// 导出 export
export {
  name,
  age,
  sayHello
}


// 导入 import
// 注意事项一: 在浏览器中直接使用esmodule时, 必须在文件后加上后缀名.js
import { name, age, sayHello } from "./foo.js"

// const name = "main"

console.log(name)
console.log(age)
sayHello()


```

### 在浏览器使用ES Module

- **这里我在浏览器中演示ES6 的模块化开发：**

<script src="./modules/foo.js" type="module"></script> <script src="main.js" type="module"></script>

- **如果直接在浏览器中运行代码，会报如下错误：**

![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.022.png)

- **这个在MDN 上面有给出解释：**
  - <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules>
  - 你需要注意本地测试 — 如果你通过本地加载Html  文件 (比如一个 file:// 路径的文件), 你将会遇到 CORS 错误，因为 Javascript 模块安全性需要；
  - 你需要通过一个服务器来测试；

- **我这里使用的VSCode插件：Live Server**

### **exports关键字**

- **export关键字将一个模块中的变量、函数、类等导出；**
- **我们希望将其他中内容全部导出，它可以有如下的方式：**
  - 方式一：将所有需要导出的标识符，放到export后面的 {}中
    - 注意：这里的 {}里面不是ES6 的对象字面量的增强写法， {}也不是表示一个对象的；
    - 所以： export {name: name}，是错误的写法；
  
  - 方式二：导出时给标识符起一个别名
    - 通过as 关键字起别名
  - 方式三：在语句声明的前面直接加上export关键字

```js
// 1.导出方式一: 
 export {
   name,
   age,
   sayHello
 }

// 2.导出方式二: 导出时给标识符起一个别名
 export {
   name as fname,
   age,
   sayHello
}
 
// 3.导出方式三:
export const name = "why"
export const age = 18

export function sayHello() {
  console.log("sayHello")
}

export class Person {}

// console.log(name)

```




### **import关键字**

- **import关键字负责从另外一个模块中导入内容**
- **导入内容的方式也有多种：**
- 方式一：`import { 标识符列表} from '模块'` ；
  - 注意：这里的{}也不是一个对象，里面只是存放导入的标识符列表内容；
- 方式二：导入时给标识符起别名
  - 通过as 关键字起别名
- 方式三：通过 \* 将模块功能放到一个模块功能对象（a module object ）上

```js
// 1.导入方式一: 
import { name, age, sayHello } from "./foo.js"

// 2.导入方式二: 导入时给标识符起别名
 import { name as fname, age, sayHello } from "./foo.js"

// 3.导入时可以给整个模块起别名
import * as foo from "./foo.js"
```



### **export和import 结合使用**

- **export 和import 可以结合使用**

- **为什么要这样做呢？**
  - 在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到一个文件中，这样方便指定统一的接口规范，也方便阅读
  - 比如utils目录下，有很多JS工具函数文件，则可以通过index.js统一导出

```js
// import { formatCount, formatDate } from './format.js'
// import { parseLyric } from './parse.js'

// export {
//   formatCount,
//   formatDate,
//   parseLyric
// }

// 优化一: 将具体的标识符导出，这样有利于使用者直接查看index.js，知道有哪些可以使用的函数
export { formatCount, formatDate } from './format.js'
export { parseLyric } from './parse.js'

// 优化二: 直接使用*导出，这样非常方便，但是还要去具体的JS文件查看函数。
export * from './format.js'
export * from './parse.js'
```




### **default-默认用法**

- **前面我们学习的导出功能都是有名字的导出（ named exports）：**
  - 在导出export时指定了名字；
  - 在导入import 时需要知道具体的名字；

- **还有一种导出叫做默认导出（default export ）**
  - 默认导出export时可以不需要指定名字；
  - 在导入时不需要使用 {}，并且可以自己来指定名字；
  - 它也方便我们和现有的CommonJS 等规范相互操作；

- **注意：在一个模块中，只能有一个默认导出（ default export）；**

```js
// 方式一：
function parseLyric() {
  return ["歌词"]
}
export default parseLyric



// 方式二：定义标识符直接作为默认导出
export default function() {
  return ["新歌词"]
}

// 注意事项: 一个模块只能有一个默认导出
```

```js
import myUtils from "./parse_lyric.js"//导入的名字可以随便写，因为引用的是默认导出

console.log(myUtils())

```

- **默认导出和常规导出一起使用**

```js
export function formatDate(){
   console.log('formatDate');
}

const date = '2012-24-47';
export default  date;
```

```js
//方式一：
//import { default as myDate, formatDate } from "./parse_lyric.js"
//方式二：
import myDate ,{ formatDate } from "./parse_lyric.js"

console.log(formatDate())//formatDate
console.log(myDate);//2012-24-47

```

- **注意：`export *`语法只会导出目标模块的具名导出，不会导出默认导出**

```js

//a.js
export default function foo() {}


//b.js
export * from './a.js';  //这里不会导出default


//c.js
import foo from 'b.js'  //这里会报错。does not provide an export named 'default'
```

- 解决方式一：可以在b.js文件中，将a.js文件的default导出，作为b.js的default再默认导出。

```js
//a.js
export default function foo() {}


//b.js
export * from './a.js';  
import myFoo from 'a.js' //导出a.js的default
export { myFoo as default  } //导出a.js的default为b.js的default


//c.js
import foo from 'b.js'  //这里会报错。does not provide an export named 'default'
```

- **解决方式二：改为：`export * as utils  from './a.js'`，这种语法可以包含默认导出**
  - 可以使用`utils.default`访问默认导出

```js
//a.js
export default function foo() {}


//b.js
export * as utils  from './a.js';  


//c.js
import {utils} from 'b.js'  
 utils.default();  //这里需要使用default访问默认导出。
```

- 注意：`import * as utils from 'a.js'`是包含默认导出的，可以通过`utils.default`访问

```js
//a.js
export default function foo() {}

//b.js
import * as utils from 'b.js'  
utils.default() //这里访问foo()
```

### **import函数**

- **通过import 加载一个模块，是不可以在其放到逻辑代码中的，比如：**
- **为什么会出现这个情况呢？**
  - 这是因为ES Module 在被JS 引擎解析时，就 必须知道它的依赖关系 ；
  - 由于这个时候js 代码没有任何的运行，所以 无法在进行类似于if 判断中根据代码的执行情况；
  - 甚至拼接路径的写法也是错误的：因为我们必须到运行时能确定path 的值；
- **但是某些情况下，我们确确实实希望动态的来加载某一个模块：**
  - 如果根据不同的条件，动态来选择加载模块的路径；
  - 这个时候我们需要使用 import() 函数来动态加载； 
  - import函数返回一个Promise，可以通过then 获取结果； 


```js
import { name, age, sayHello } from "./foo.js"

console.log(name, age)


// 2.import函数的使用
let flag = true
if (flag) {
  // 不允许在逻辑代码中编写import导入声明语法, 只能写到js代码顶层
  // import { name, age, sayHello } from "./foo.js" 
  // console.log(name, age)

  // 如果确实是逻辑成立时, 才需要导入某个模块
  // import函数
  import("./foo.js").then(res => {
    console.log(res.name, res.age)
  })

  console.log("------")
}

```

### **import meta**

- **import.meta是一个给JavaScript 模块暴露特定上下文的元数据属性的对象。**
  - 它包含了这个模块的信息，比如说这个模块的 URL；
  - 在ES11 （ES2020）中新增的特性；

```js
//foo.js
export const name = "foo"
export const age = 18


console.log(import.meta) // {resolve:function(){}, url:'http://xxxx.com//foo.js'  } //返回这个模块的URL


```

## 在ES Module中修改值

- 在export修改的值会影响到import导入的值
  - 基础类型和引用类型都会修改。

```js
//foo.js
export let foo = 123
//export let foo = {bar:123}
setTimeout(()=>{
  foo = 456
 // foo = {bar:456}
},1000)



//main.js
import { foo } from './foo.js'
setTimeout(()=>{
  console.log(foo); //456
  //console.log(foo);{bar:456}
},2000)
```

- **ES Modules 有一个重要的特性是：所有导入的模块在当前模块作用域中都是只读的，不可以修改。**
  - 但是可以修改对象类型的属性，但影响到export导出的值。

```js
//foo.js
export let foo = 123

//main.js
import { foo } from './foo.js'
setTimeout(()=>{
  foo = 789 //main.js:4 Uncaught TypeError: Assignment to constant variable.
},2000)
```

```js
//foo.js
export let foo = {name:123}
setTimeout(()=>{
  console.log(foo.name); //被main.js修改，变成456
},2000)

//main.js
import { foo } from './foo.js'
setTimeout(()=>{
  foo.name = 456
},1000)

```



## ES Module的循环引用问题

- JavaScript 的 `import` 和 `export` 语句使用静态解析，这意味着在模块加载和解析阶段就确定了模块之间的依赖关系。
  - `import` 语句是在模块的解析阶段执行的，而不是在代码的执行阶段执行。
  - 这意味着 `import` 语句会在模块加载时被优先处理，而不会像普通的 JavaScript 代码一样按顺序逐行执行。
- `import` 语句可以写在**模块顶层**中的任意的位置，并且不会报错。
  - 因为 `import` 语句在解析阶段执行，它会首先被处理，而不管它在代码中的具体位置。
- 在解决循环引用时，ES Modules 的机制会保证被导入的模块先被执行，并且导入的变量会在导入模块的顶层可用。
  - 这样，即使有循环依赖，每个模块都能正确地获取到导入的变量。

```js
//foo.js
console.log('foo start');
import { bar} from './main.js'
console.log(bar);
const foo = 123
export default foo;
console.log('foo end');


//main.js
console.log('main start');
console.log(foo);
export var bar = 456;
import foo from './foo.js'
console.log('main end');

//首先加载main.js
//输出
//foo start
//undefined
//foo end
//main start
//123
//main end
```




## **ES Module的解析流程**

- **ES Module是如何被浏览器解析并且让模块之间可以相互引用的呢？**
  - https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/

- **ES Module的解析过程可以划分为三个阶段：**
  - 阶段一：构建（Construction），根据地址查找js 文件，并且下载，将其解析成模块记录（ Module Record）；
  - 阶段二：实例化（Instantiation），对模块记录进行实例化，并且分配内存空间，解析模块的导入和导出语句，把模块指向 对应的内存地址。
  - 阶段三：运行（Evaluation），运行代码，计算值，并且将值填充到内存地址中；


![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.026.png)

### **阶段一：构建阶段**

- 根据JS的地址查找JS文件，然后将其解析成模块记录，分析JS中是否有import，如果再继续下载解析。
- 然后会形成一个模块映射表，一个地址对象一个模块记录。如果下次再遇到有import相同模块，根据映射表查找，是否已经下载

![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.027.png)

### **阶段二和三：实例化阶段 – 求值阶段**

- 实例化这些模块记录，创建模块环境记录，它会记录模块中导出的变量，也会记录模块中导入的变量
- 到了运行阶段之后，会把运行得到的值，再赋值给模块环境记录里记录的变量。
- 这里还会限制导入的模块不能去修改导出的变量。

![](./image/Aspose.Words.674d9ac1-d18c-4a1d-a209-a02240b64ac7.028.png)
