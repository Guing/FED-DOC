**库打包工具rollup使用 ![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.001.png)![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.002.png)![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.003.png)**

王红元 coderwhy![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.004.png)

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.005.png) ![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.006.png)

|**目录 content**|**1![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.007.png)**|**rollup的基本使用**|
| :- | - | - |
||**2![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.008.png)**|**rollup的常见插件**|
||**3![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.009.png)**|**rollup的css打包**|
||**4![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.010.png)**|**rollup的vue打包**|
||**5![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.011.png)**|**rollup本地服务器**|
||**6![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.012.png)**|**rollup环境的区分**|

**认识rollup![ref1]**

- **我们来看一下官方对rollup的定义：**
- Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. 
- Rollup是一个JavaScript的模块化打包工具，可以帮助我们编译小的代码到一个大的、复杂的代码中，比如一个库或者一个应用程序；
- **我们会发现Rollup的定义、定位和webpack非常的相似：**
- Rollup也是一个模块化的打包工具，但是Rollup主要是针对ES Module进行打包的；
- 另外webpack通常可以通过各种loader处理各种各样的文件，以及处理它们的依赖关系；
- rollup更多时候是专注于处理JavaScript代码的（当然也可以处理css、font、vue等文件）；
- 另外rollup的配置和理念相对于webpack来说，更加的简洁和容易理解；
- 在早期webpack不支持tree shaking时，rollup具备更强的优势；
- **目前webpack和rollup分别应用在什么场景呢？**
- 通常在实际项目开发过程中，我们都会使用webpack（比如react、angular项目都是基于webpack的）；
- 在对库文件进行打包时，我们通常会使用rollup（比如vue、react、dayjs源码本身都是基于rollup的，Vite底层使用Rollup）；

**Rollup基本使用![ref1]**

- **我们可以先安装rollup：**
- 全局安装![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.014.png)

npm install rollup -g

- 局部安装

npm install rollup -D

- **创建main.js文件，打包到bundle.js文件中：**
- 打包浏览器的库![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.015.png)

npx rollup ./src/main.js -f iife -o dist/bundle.js

- 打包AMD的库

npx rollup ./src/main.js -f amd -o dist/bundle.js

- 打包CommonJS的库

npx rollup ./src/main.js -f cjs -o dist/bundle.js

- 打包通用的库（必须跟上name）

npx rollup ./src/main.js -f umd --name mathUtil -o dist/bundle.js

**Rollup的配置文件![ref1]**

- **我们可以将配置信息写到配置文件中rollup.config.js文件：**

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.016.png)

- **我们可以对文件进行分别打包，打包出更多的库文件（用户可以根据不同的需求来引入）：**

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.017.png)

**解决commonjs和第三方库问题![ref1]**

- **安装解决commonjs的库：**

npm install @rollup/plugin-commonjs -D![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.018.png)

- **安装解决node\_modules的库：**

npm install @rollup/plugin-node-resolve -D![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.019.png)

- **打包和排除lodash**

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.020.png)

**Babel转换代码![ref1]**

- **如果我们希望将ES6转成ES5的代码，可以在rollup中使用babel。**
- **安装rollup对应的babel插件：**

npm install @rollup/plugin-babel -D![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.021.png)

- **修改配置文件：**
- 需要配置babel.config.js文件；
- babelHelpers:

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.022.png) ![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.023.png)

**Teser代码压缩![ref1]**

- **如果我们希望对代码进行压缩，可以使用@rollup/plugin-terser：**

npm install @rollup/plugin-terser -D![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.024.png)

- **配置terser：**

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.025.png)

**处理css文件![ref1]**

- **如果我们项目中需要处理css文件，可以使用postcss：** npm install rollup-plugin-postcss postcss -D![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.026.png)
- **配置postcss的插件：**

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.027.png)

**处理vue文件![ref1]**

- **处理vue文件我们需要使用rollup-plugin-vue插件：**
- **但是注意：默认情况下我们安装的是vue2.x的版本，所以我这里指定了一下rollup-plugin-vue的版本；** npm install rollup-plugin-vue @vue/compiler-sfc -D![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.028.png)
- **使用vue的插件：**

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.029.png)

**打包vue报错![ref1]**

- **在我们打包vue项目后，运行会报如下的错误：**

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.030.png)

- **这是因为在我们打包的vue代码中，用到 process.env.NODE\_ENV，所以我们可以使用一个插件 rollup-plugin-replace 设置 它对应的值：**

npm install @rollup/plugin-replace -D![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.031.png)

- **配置插件信息：**

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.032.png)


**搭建本地服务器![ref1]**

- **第一步：使用rollup-plugin-serve搭建服务** npm install rollup-plugin-serve -D![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.033.png)

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.034.png)

- **第二步：当文件发生变化时，自动刷新浏览器** npm install rollup-plugin-livereload -D![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.035.png)

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.036.png)

- **第三步：启动时，开启文件监听** npx rollup -c -w![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.037.png)

**区分开发环境![ref1]**

- **我们可以在package.json中创建一个开发和构建的脚本：**

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.038.png)

![](./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.039.png)

[ref1]: ./image/Aspose.Words.97259466-d2ce-4c94-81b4-b7679efebe06.013.png
