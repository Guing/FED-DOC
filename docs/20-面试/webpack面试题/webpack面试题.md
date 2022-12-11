## 有哪些常见的Loader？你用过哪些Loader？

* 处理css:
  + css-loader  解析css模块import等语法
  + style-loader  将css模块插入到style标签中
  + mini-css-extract-plugin.loader 将css提取成一个文件
  + postcss-loader autoprefixer 自动为css添加浏览器前缀
  + less-loader  处理less模块
  + sass-loader  处理sass模块

* 处理js
  + bable-loader  
转化ES6语法，必须得先安装@babel/core核心模块，@bael/preset-env一组预设插件。
一些实例方法的转化，需要额外安装core-js。
安装@babel/plugin-tranform-runtime, 提供每个文件的辅助方法为公共方法，加快速度。

* 处理图片等资源
  + file-loader 将图片输出到输出目录下，并返回一个路径
  + url-loader 可以设置一个限制，小于这个限制则将图片转成base64位，否则使用file-loader

* 编译优化
  + cache-loader 缓存loader，会在node_module目录的.cache目录下生成缓存。

* 其他
  + vue-loader 处理vue组件
  + eslint-loader 通过 ESLint 检查 JavaScript 代码

## 有哪些常见的Plugin？你用过哪些Plugin？

* 处理html
  + html-webpack-plugin 引用一个html模块，将生成的bundle等资源插入.

* 处理css
  + min-css-extract-plugin 提取css代码到单独的文件
  + css-minimizer-webpack-plugin  压缩css代码

* 处理js
  + uglifyjs-webpack-plugin 不支持ES6语法，压缩js
  + terser-webpack-plugin  支持ES6语法，压缩js

* 处理资源
  + copy-webpack-plugin  复制资源到输出目录

* 优化
  + preload-webpack-plugin 异步加载资源时，使用预加载资源

* webpack自带的插件
  + webpack. DefinePlugin 定义环境变量
  + webpack. ProvidePlugin  将变量注到每个模块
  + webpack. BannerPlugin 写入版本信息
  + webpack. DllPlugin 动态链接库
  + webpack.optimize. ModuleConcatenationPlugin  作用域提升, 分析出模块之间的依赖关系，尽可能将打散的模块合并到一个函数中，前提是不能造成代码冗余。

* 其他插件
  + vue-loader-plugin 处理vue相关
  + friendly-errors-webpack-plugin  相好提示错误
  + webpack-bundle-analyzer 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)
  + clean-webpack-plugin 删除输出目录（webpack5可以直接在output里面配置clean属性）

## Loader和Plugin的区别？

loader本质上是一个函数，传入一个源码参数，将源码进行相关处理，比如babel-loader就是将源码转化为ES5的语法，然后输出。
Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。
Plugin 在 plugins 中单独配置，类型为数组。

## Webpack构建流程

* 初始化参数
  + 解析 Webpack 配置参数，合并 Shell 传入和 webpack.config.js 文件配置的参数，形成最后的配置结果。
* 开始编译
  + 上一步得到的参数初始化 compiler 对象，注册所有配置的插件，插件监听 Webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
* 确定入口
  + 从配置文件（ webpack.config.js ）中指定的 entry 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去。
* 编译模块
  + 递归中根据文件类型和 loader 配置，调用所有配置的 loader 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
* 完成模块编译并输出
  + 递归完后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据 entry 配置生成代码块 chunk 。
* 输出完成
  + 输出所有的 chunk 到文件系统。

## 使用webpack开发时，你用过哪些可以提高效率的插件？

* webpack-merge：提取公共配置，减少重复配置代码
* speed-measure-webpack-plugin：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。
* autodll-webpack-plugin 提取动态链接库
* cache-loader 缓存loader

## source map是什么？开发环境，生产环境怎么用？

* source map 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。
* 开发环境, 使用的eval-source-map, 它的构建速度中，不支持生产环境，是官方构建高质量开发环境source-map的推荐。
* 生产环境，不暴露原码，只需要报错的行号和堆栈，使用nosource-source-map。也可以使用source-map，然后将.map的原码文件通过ngix设置, 只对内网生效，提高安全性。

## 模块打包原理知道吗？

* Webpack 实际上为每个模块创造了一个可以导出和导入的环境，本质上并没有修改 代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致。

## 文件监听原理

* 在发现源码发生变化时，自动重新构建出新的输出文件。
* 缺点是要刷新页面
* 原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。

```javascript
module.export = {
    // 默认false,也就是不开启   
    watch: true,
    // 只有开启监听模式时，watchOptions才有意义   
    watchOptions: {
        // 默认为空，不监听的文件或者文件夹，支持正则匹配       
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行，默认300ms       
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次       
        poll: 1000
    }
}
```
##  Webpack的热更新原理
- webpack-dev-server内置一个express服务器，与浏览器之间维护了一个 Websocket
- 当本地资源发生变化时，服务器会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。
- 客户端对比出差异后会向服务器发起Ajax请求来获取更改内容(文件列表、hash)
- 客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。
- 增量更新，可以在我们的业务代码添加模块更新后的处理函数
```javascript
if(module.hot) {
    module.hot.accept('./hello.js', function() {
        div.innerHTML = hello()
    })
}
```

## 如何对bundle体积进行监控和分析？
使用 webpack-bundle-analyzer 生成 bundle 的模块组成图，显示所占体积。

## 文件指纹是什么？怎么用？
- 通过给文件加上hash后缀，做到当代码有修改时打包出来的文件后缀也会修改，从而可以把静态资源开启持久缓存
- webpack提供了三种hash类型
  - hash 和整个项目构建相关，只要一个文件有修改，整个项目的hash值就会改变。它的问题是当项目有多入口或者使用code spliting，只要有一个文件修改打包的生成的js代码hash都会改变。不利于缓存。
  - chunkhash 和webpack打包的chunk有关，不同的entry会申城不同的chunkhash值
  - Contenthash 根据文件内容来定义hash，文件内容不变，则contenthash不变
- JS的文件指纹设置
  - 设置 output 的 filename，用 chunkhash。
- CSS的文件指纹设置
  - 设置 MiniCssExtractPlugin 的 filename，使用 contenthash。
- 图片，字体文件的文件指纹设置,
  - 设置 file-loader（或url-loader） 的 name，使用 [hash]图片，字体文件的hash和css/js资源的hash概念不一样，图片，字体文件的hash是由内容决定的

## 如何保证各个loader按照预想方式工作？
- 可以使用 enforce 强制执行 loader 的作用顺序，pre 代表在所有正常 loader 之前执行，post 是所有 loader 之后执行。

## 如何优化 Webpack 的构建速度？
- 优化loaders
  - 使用 include 字段仅将 loader 模块应用在实际需要用其转换的位置中：
  - thread-loader 开启多线程缓存
  - 使用 cache-loader  启用持久化缓存。
  - noParse 对完全不需要解析的库进行忽略 
  - babel-loader 开启缓存
- plugins
  - 使用 DllPlugin 将更改不频繁的代码进行单独编译。
  - terser-webpack-plugin 开启缓存
- 开发环境
  - 使用 webpack 的监听模式。使用 watchOptions.poll 来增加轮询的间隔。
  - Devtool使用 eval-source-map 配置进行增量编译。
  - 开发环境下文件名等不添加hash。
  - 开发环境下不使用压缩代码的插件
  - 开发环境下不使用作用域提升，ModuleConcatenationPlugin插件
- 生产环境
  - 多进程并行压缩,terser-webpack-plugin 开启 parallel 参数


## 你刚才也提到了代码分割，那代码分割的本质是什么？有什么意义呢？

## 是否写过Loader？简单描述一下编写loader的思路？
- 写过一个简单的去除代码中的console.log，debugger的loader
- 在webpack中配置resolveLoader.modules，使用本地的loader的目录
- 使用loader-utils工具包，传入this，获取loader的options选项。
- 使用schema-utils工具包，对options选项进行检证
- 获取webpack传入的loader函数的source参数，对source进行转化。
- 如果要异步执行loader，可以使用this.async()返回callback函数，执行callback函数，传入结果。

## 是否写过Plugin？简单描述一下编写Plugin的思路？
- 写过一个webpack打包之后上传FTP的的插件
- webpack插件其实就一个类，这个类中有个apply方法.
- webpack实例complier对象之后，将调用注册插件的apply方法，然后传入complier
- 获取到complier对象之后，使用complier对象注册相应的生命周期的钩子函数。
- 比如上传FPT这个插件，会在afterEmit钩子之后执行，它获取到compilation对象。
- compilation对象是每一次构建的核心对象，可以获取当次编译模块，文件等对象
- 比如通过compilation.assets获取到输出的文件路径，然后能过ftp上传到服务器。
- 
## 聊一聊Babel原理吧
- babel主要分为三部分解析，转化，生成。
  - 解析主要是通过babylon，将代码转化成AST语法树
  - 转化主要是通过修改AST语法树来实现的，种Babel的转化插件就是主要处理这个过程。
  - 生成是将新的AST语法树生成新的代码
- 一般使用babel会使用@babel/core,@babel/preset-env,@babel/plugin-transform-runtime
  - @babel/core主babel的核心库，要提供解析转化生成的方法。
  - @babel/preset-env主要是提供babel的预设的一系列转化插件
  - @babel/plugin-transform-runtime主要是优化转化的代码，拾取公共的辅助代码。