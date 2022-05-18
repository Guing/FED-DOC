## Plugin 的作用

可以通过插件，扩展 webpack，加入自定义的构建行为，使 webpack 可以执行更广泛的任务，拥有更强的构建能力。

## Plugin 工作原理

webpack 在编译过代码程中，会触发一系列 Tapable 钩子事件，插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件，这样，当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行了。

## webpack 内部执行流程

一次完整的 webpack 打包大致是这样的过程：

* 将命令行参数与 webpack 配置文件 合并、解析得到参数对象。
* 参数对象传给 webpack 执行得到 Compiler 对象。
* 执行 Compiler 的 run方法开始编译。每次执行 run 编译都会生成一个 Compilation 对象。
* 触发 Compiler 的 make方法分析入口文件，调用 compilation 的 buildModule 方法创建主模块对象。
* 生成入口文件 AST(抽象语法树)，通过 AST 分析和递归加载依赖模块。
* 所有模块分析完成后，执行 compilation 的 seal 方法对每个 chunk 进行整理、优化、封装。
* 最后执行 Compiler 的 emitAssets 方法把生成的文件输出到 output 的目录中。

webpack 底层基本流程图

![webpack](https://gitee.com/littleblack520/markdown-assets/raw/master/img/20210708180912.png)

## 构建流程的各种勾子

### Compiler Hooks

Compiler 编译器模块是创建编译实例的主引擎。大多数面向用户的插件都首先在 Compiler 上注册。
compiler上暴露的一些常用的钩子：

![compiler](https://gitee.com/littleblack520/markdown-assets/raw/master/img/20210708181208.png)

### Compilation Hooks

Compilation 是 Compiler 用来创建一次新的编译过程的模块。一个 Compilation 实例可以访问所有模块和它们的依赖。在一次编译阶段，模块被加载、封装、优化、分块、散列和还原。
Compilation 上暴露的一些常用的钩子：

![Compilation](https://gitee.com/littleblack520/markdown-assets/raw/master/img/20210708181302.png)

### JavascriptParser Hooks

Parser 解析器实例在 Compiler 编译器中产生，用于解析 webpack 正在处理的每个模块。我们可以用它提供的 Tapable 钩子自定义解析过程。

JavascriptParser 上暴露的一些常用的钩子：

![JavascriptParser](https://gitee.com/littleblack520/markdown-assets/raw/master/img/20210708181351.png)

## 如何开发一个webpack plugin

* 一个命名的 Javascript 方法或者 JavaScript 类。
* 它的原型上需要定义一个叫做 apply 的方法。
* 注册一个事件钩子。
* 操作webpack内部实例特定数据。
* 功能完成后，调用webpack提供的回调。

一个基本的 plugin 代码结构大致长这个样子：

```javascript
// plugins/MyPlugin.js

class MyPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('My Plugin', (stats) => {
            console.log('Bravo!');
        });
    }
}

module.exports = MyPlugin;
```
