# 业务组件库打包、发布、添加CI/CD

## JavaScript模块发展史

### 模块(modules)是什么?

模块通常是指编程语言所提供的代码组织机制，利用次机制可将程序拆解为独立且同样的代码单元。所谓模块化主要是解决代码分割、作用域隔离、模块之间的依赖管理以及发布到生成环境时的自动大包与处理等多个方面。

### 模块化的优点

- 可维护性。因为模块时独立的，一个设计良好的模块会让外面的代码对自己的依赖越少越好，这样自己就可以独立去更新和改进。
- 命名空间。在js里面，如果一个变量在最顶级的函数之外声明，它就直接变成全局可用。因此，常常不小心出现命名冲突的情况。使用模块化来开发封装变量，可以避免武软全局环境。
- 重用代码。我们有时候会喜欢之前写过的项目种拷贝代码到新的项目，这没有问题，但是更好的办法是，通过模块引用的方式，来避免重复的代码库。

### ES6之前没有模块的年代

```js
	// 使用 backbone.js 的方法
  <script src="spec/support/jquery.js"></script>
  <script src="spec/support/underscore.js"></script>
  <script src="spec/support/backbone.js"></script>
  <script src="backbone.localStorage.js"></script>
  <script src="todos.js"></script></script>  

```

### 全局变量 + 命名空间(namespace)

```js
// IIFE 自执行函数，创建一个封闭的作用域，赋值给一个全局变量
var namesCollection = (function() {
    // private members
    var objects = [];
  
    // Public Method
    function addObject(object) {
        objects.push(object);
        printMessage(object);
    }
  
    // Private Method
    function printMessage(object) {
        console.log("Object successfully added:", object);
    }
    // public members, exposed with return statement
    return {
        addName: addObject,
    };
})();
namesCollection.addName('roy')
```

**缺点**

- 依赖全局变量，污染全局作用域，不安全
- 依赖约定命名空间来避免冲突，可靠性不高
- 需要手动管理依赖并控制执行顺序，容易出错
- 需要在最终上线前手动合并所有用到的模块

### Common.js

```js
const bar = require('./bar')
module.exports = function() {

}
```

- 没法在浏览器理直接运行

### AMD - (Asnychronous module definition)

- 采用异步方式加载模块
- 仅仅需要在全局环境定义require和define，不需要其他的全局变量
- 通过文件路径或模块自己声明的模块名定位模块
- 提供了打包工具自动分析依赖并合并
- 配合特定的AMD加载器使用，RequireJS
- 同时还诞生了很多类似的模块标准CMD

```js
define(function(require) {
	// 通过相对路径获取依赖模块
	const bar = require('./bar')
	// 模块产出
	return function () {

	}
})

```

### ES6 modules

```js
// 通过相对路径获取依赖模块
import bar from './bar'
// 模块产出
export default function () {

}

```

- 引入和暴露的方式更加多样
- 支持复杂的静态分析
