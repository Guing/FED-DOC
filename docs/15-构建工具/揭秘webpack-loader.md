## Loader 工作原理

webpack 只能直接处理 javascript 格式的代码。任何非 js 文件都必须被预先处理转换为 js 代码，才可以参与打包。loader（加载器）就是这样一个代码转换器。
它由 webpack 的 `loader runner` 执行调用，接收原始资源数据作为参数（当多个加载器联合使用时，上一个loader的结果会传入下一个loader），最终输出 javascript 代码（和可选的 source map）给 webpack 做进一步编译。

## Loader 执行顺序

### 分类

pre： 前置loader
normal： 普通loader
inline： 内联loader
post： 后置loader

### 执行优先级

4类 loader 的执行优级为： `pre > normal > inline > post` 。
相同优先级的 loader 执行顺序为： `从右到左，从下到上` 。

### 前缀的作用

内联 loader 可以通过添加不同前缀，跳过其他类型 loader。
`!` 跳过 normal loader。
`-!` 跳过 pre 和 normal loader。
`!!` 跳过 pre、 normal 和 post loader。

## 如何开发一个loader

### 简单的 loader

当只有一个 loader 应用于资源文件时，它接收源码作为参数，输出转换后的 js 代码。

```javascript
// loaders/simple-loader.js
module.exports = function loader(source) {
    console.log('simple-loader is working');
    return source;
}
```

```javascript
// webpack.config.js
const path = require('path');
module.exports = {
    entry: {
        ...
    },
    output: {
        ...
    },
    module: {
        rules: [{
            test: /\.js$/,
            // 直接指明 loader 的绝对路径
            use: path.resolve(__dirname, 'loaders/simple-loader')
        }]
    }
}
```

### 异步 loader

异步 loader 的开发（例如里面有一些需要读取文件的操作的时候），需要通过 this.async() 获取异步回调，然后手动调用它。

```javascript
// loaders/simple-async-loader.js
module.exports = function(source) {
    console.log('async loader');
    let cb = this.async();
    setTimeout(() => {
        console.log('ok');
        // 在异步回调中手动调用 cb 返回处理结果
        cb(null, source);
    }, 3000);
}
```

注： 异步回调 cb() 的第一个参数是 `error` ，要返回的结果放在第二个参数。

### raw loader

如果是处理图片、字体等资源的 loader，需要将 loader 上的 raw 属性设置为 true，让 loader 支持二进制格式资源（webpack默认是以 `utf-8` 的格式读取文件内容给 loader）。

```javascript
// loaders/simple-raw-loader.js
module.exports = function(source) {
    // 将输出 buffer 类型的二进制数据
    console.log(source);
    // todo handle source
    let result = 'results of processing source'
    return `
    module.exports = '${result}'
  `;
}
// 告诉 wepack 这个 loader 需要接收的是二进制格式的数据
module.exports.raw = true;
```

注：通常 raw 属性会在有文件输出需求的 loader 中使用。

### 输出文件的loader

在开发一些处理资源文件（比如图片、字体等）的 loader 中，需要拷贝或者生成新的文件，可以使用内部的 `this.emitFile()` 方法.

```javascript
// loaders/simple-file-loader.js
const loaderUtils = require('loader-utils');
module.exports = function(source) {
    // 获取 loader 的配置项
    let options = loaderUtils.getOptions(this) || {};
    // 获取用户设置的文件名或者制作新的文件名
    // 注意第三个参数，是计算 contenthash 的依据
    let url = loaderUtils.interpolateName(this, options.filename || '[contenthash].[ext]', {
        content: source
    });
    // 输出文件
    this.emitFile(url, source);
    // 返回导出文件地址的模块脚本
    return `module.exports = '${JSON.stringify(url)}'`;
}
module.exports.raw = true;
```
在这个例子中，loader 读取图片内容（buffer），将其重命名，然后调用 `this.emitFile()` 输出到指定目录，最后返回一个模块，这个模块导出重命名后的图片地址。于是当 `require` 图片的时候，就相当于 require 了一个模块，从而得到最终的图片路径。（这就是 file-loader 的基本原理）

### 带 pitch 的 loader

`pitch` 是 loader 上的一个方法，它的作用是阻断 loader 链。

```javascript
// loaders/simple-loader-with-pitch.js
module.exports = function(source) {
    console.log('normal excution');
    return source;
}

// loader上的pitch方法，非必须
module.exports.pitch = function() {
    console.log('pitching graph');
    // todo
}
```

pitch 方法不是必须的。如果有 pitch，loader 的执行则会分为两个阶段：
* `pitch` 阶段:webpack 会先从左到右执行 loader 链中的每个 loader 上的 pitch 方法（如果有）
* `normal execution` 阶段: 然后再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法。
假如配置了如下 loader 链：

use: ['loader1', 'loader2', 'loader3']

![loader-png](https://gitee.com/littleblack520/markdown-assets/raw/master/img/v2-2c9ccd95160f8d6ad46b46e8a4f98b23_720w.jpg)

* 在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。
* webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader 的 `normal execution`阶段。

![loader-png](https://gitee.com/littleblack520/markdown-assets/raw/master/img/20210708113552.png)

### 写一个简版的 style-loader

* style-loader 最终需返回一个 `js` 脚本：在脚本中创建一个 `style` 标签，将 `css` 代码赋给 `style` 标签，再将这个 `style` 标签插入 `html` 的 `head` 中。
* 难点是获取 `css` 代码，因为 css-loader 的返回值只能在浏览器运行时的上下文中执行，而执行 loader 是webpack打包编译的阶段。换句话说，css-loader 的返回值在 style-loader 里派不上用场。
* 曲线救国方案：使用获取 `css` 代码的表达式，在运行时再获取 css (类似 `require('css-loader!index.css')`）。
* 在处理 css 的 loader 中又去调用 `inline loader` require `css` 文件，会产生循环执行 loader 的问题，所以我们需要利用 `pitch` 方法，让 style-loader 在 `pitch` 阶段返回脚本，跳过剩下的 loader，同时还需要内联前缀 `!!` 的加持。

```javascript
// loaders/simple-style-loader.js

const loaderUtils = require('loader-utils');
module.exports = function(source) {
    // do nothing
}

module.exports.pitch = function(remainingRequest) {
    console.log('simple-style-loader is working');
    // 在 pitch 阶段返回脚本
    return (
        `
      // 创建 style 标签
      let style = document.createElement('style');

      /**
      * 利用 remainingRequest 参数获取 loader 链的剩余部分
      * 利用 ‘!!’ 前缀跳过其他 loader 
      * 利用 loaderUtils 的 stringifyRequest 方法将模块的绝对路径转为相对路径
      * 将获取 css 的 require 表达式赋给 style 标签
      */
      style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
      
      // 将 style 标签插入 head
      document.head.appendChild(style);
      `
    )
}
```

## 一些 tips

### 开发 loader 必备工具包

#### loader-utils

这个模块中常用的几个方法：

* getOptions 获取 loader 的配置项。
* interpolateName 处理生成文件的名字。
* stringifyRequest 把绝对路径处理成相对根目录的相对路径。

#### schema-utils

这个模块可以帮你验证 loader option 配置的合法性。

```javascript
// loaders/simple-loader-with-validate.js
const loaderUtils = require('loader-utils');
const validate = require('schema-utils');
module.exports = function(source) {
    // 获取 loader 配置项
    let options = loaderUtils.getOptions(this) || {};
    // 定义配置项结构和类型
    let schema = {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            }
        }
    }
    // 验证配置项是否符合要求
    validate(schema, options);
    return source;
}
```
### 开发约定
在 webpack 社区，有一份 loader 开发准则，我们可以去参考它来指导我们的 loader 设计：
- 保持简单。
- 利用多个loader链。
- 模块化输出。
- 确保loader是无状态的。
- 使用 loader-utils 包。
- 标记加载程序依赖项。
- 解析模块依赖关系。
- 提取公共代码。
- 避免绝对路径。
- 使用 peerDependency 对等依赖项。
