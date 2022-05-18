# 基础篇

## 安装与使用

### webpack安装

* 安装本地的webpack 
  + npm install webpack webpack-cli -D
  + 加一个-D表示开发依赖 上线的时候不需要这两个包
  + 使用 webpack v4+ 版本，并且想要在命令行中调用 webpack，还需要安装webpack-cli。webpack v5版本则不需要。

```javascript
npm install webpack wabpack - cli - D
```

### webpack运行

* 使用npx指令运行
  + npx指令会查找node_modules的bin目录里面的webpack.cmd文件并执行。webpack.cmd文件会查找到webpack包里面的bin\webpack.js执行。

```javascript
npx webpack
```

* 使用npm script指令运行
  + 在package.json中配置script字段，比如build，然后执行npm run build

```javascript
"scripts": {
    "build": "webpack --config webpack.config.js",
},
```

### webpack使用

* 不需配置也可以使用
  + 默认支持打包js模块，并会读取src目录下的index.js，并打包成dist目录下的main.js
* 手动配置webpack
  + 默认配置文件的名字 webpack.config.js
  + 运行webpack时，使用--config参数配置自定义的配置文件名字

```javascript
webpack--config webpack.config.js
```

## 基础使用

### 入口与出口

* mode: 模式, 默认两种production和development, production会压缩代码
* entry: 入口，如果多入口可以使用数组
* output: 出口
  + filename： 打包后的文件名
  + path：打包目录地址，是一个绝对路径
* 使用[name]可动态生成文件名
* 使用[hash:8]可生成文件哈希值，后面的数字代表长度
  

```javascript
{
    mode: 'production', // 模式 默认两种 production development
    entry: './src/index.js', // 入口
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名
        path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径
    },
}
```

### 分析生成的js文件

* webpack会生成一个自执行的匿名函数，匿名函数传入一个对象，对象的key就是模块路径，value就是模块的代码
* 匿名函数会定义一个installedModules对象，缓存已经执行过的模块
* 接着定义一个__webpack_require__函数，并执行这个__webpack_require__并传给入口模块的路径。
* 入口模块执行之后，如果入模块也使用require或import导入其他模块，则会替换成__webpack_require__函数，这样就会递归执行，并形成一个模块依赖树

```javascript
(function(modules) {

    var installedModules = {};

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({

    "./src/index.js": (function(module, exports, __webpack_require__) {
        eval("let test = __webpack_require__(/*! ./other.js */ \"./src/other.js\");\r\nconsole.log('hei');\n\n//# sourceURL=webpack:///./src/index.js?");
    }),

    "./src/other.js": (function(module, exports) {
        eval("console.log('xiao');\n\n//# sourceURL=webpack:///./src/other.js?");
    })
});
```

### webpack-dev-server

webpack-dev-server是webpack内置的开发服务器，它会将文件打包到内存中。

* 在webpack.config.js中配置devServer.

```javascript
 devServer: { //开发服务器设置
     port: 3000, //端口
     progress: true, //是否显示进度
     contentBase: './dist', //打包文件的目录
     compress: true //启用gzip压缩
 },
```

* 使用webpack-dev-server指令运行
  + 使用npx webpack-dev-server
  + 使用npm run dev，然后在package.json中配置相关的script

#### 处理跨域问题

* 可以通过重写的方式 把请求代理到webpack-dev-server内置的express服务器上。
  + 当访问localhost/api时，会代理到http://api.com/api域名, 并通过pathRewrite，把/api覆盖掉 

```javascript
  devServer: {
      proxy: { //  配置了一个代理，重写的方式 把请求代理到express服务器上
          '/api': {
              target: 'http://api.com',
              pathRewrite: {
                  '/api': ''
              }
          }
      }
  },
```

* 如果后端的服务是express框架的，则可以通过引入webpack编译，让前端和后端处于同一个服务下面，这样就不会出现跨域问题了。
  

```javascript
let express = require('express');
let app = express();
let webpack = require('webpack');

// 中间件
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');

let compiler = webpack(config);

app.use(middle(compiler));

app.get('/user', (req, res) => {
    res.json({
        name: 'haha'
    })
})

app.listen(3000);
```

  

#### 模拟后端返回数据

* webpack-dev-server内置的express服务器，可以用来模拟后端数据
  + 提供了一个before钩子的，可以获取到app对象

```javascript
  devServer: {
      before(app) { // 提供的方法钩子
          //当访问http://localhost/user时，返回模拟数据
          app.get('/user', (req, res) => {
              res.json({
                  name: '珠峰架构-before'
              })
          })
      }
  },
```

### loader的使用

基本使用：
* module参数对象下添加rules数组，里面添加相应的loader
* test正则匹配文件后缀，use使用字符串, 多个loader需要 [], 还可以写成对象方式
* loader的特点 希望单一
* **loader的顺序默认是：从右向左执行, 从下到上执行**

loader的类型：
* 在loader可以配置执行loader的类型
  + pre: 前面执行的loader
  + normal: 普通的loader
  + inline: 内联的loader
  + post: 后置的loader

```javascript
module.exports = {
    module: { // 模块
        rules: [ // 规则
            {
                // 可以写相应的正则，匹配js,css,png等文件
                test: /\.css$/,
                use: [{
                        loader: 'style-loader',
                        options: {}
                    },
                    'css-loader'
                ]
            },
        ]
    }
}
```

暴露全局的loader，有两种使用方式
  + 一种是，在代码引入中使用:expose-loader? 暴露的变量! 包名
  + 另一种是安装expose-loader, 然后配置相应的loader
第一种：

```javascript
import $ from 'expose-loader?$!jquery'
console.log($);
console.log(window.$);
```

第二种：

```javascript
module.exports = {
    module: { // 模块
        rules: [ // 规则
            {
                test: require.resolve('jquery'), //解析包的路径
                use: 'expose-loader?$' //expose-loader?暴露的变量名
            },
        ]
    }
}
```

### html配置

使用html-webpack-plugin包进行html配置，根据已有的html模板，生成最终引用模块的html文件。
* 引入html-webpack-plugin模块

```javascript
let HtmlWebpackPlugin = require('html-webpack-plugin');
```

* 在webpack.config.js里的plugins参数添加配置

```javascript
 plugins: [ //里面放所有的插件数组

     new HtmlWebpackPlugin({
         template: './src/index.html',
         filename: 'index.html'
     })
 ]
```

### css配置

#### css-loader

* css-loader
  + 解析css文件中@import这种语法的
* style-loader
  + 把css插入到head的标签中
* less-loader或sass-loder
  + 处理less文件或者sass文件
* post-loader
  + 为css样式添加相应的浏览器前缀
  + 需要安装autoprefixer模块
  + 在项目根目录下添加postcss.config.js文件
  
postcss.config.js

```javascript
module.exports = {
    plugins: [require('autoprefixer')]
}
```

webpack.config.js

```javascript
  module: {
      rules: [{
          test: /\.less$/,
          use: [
              'style-loader'
              'css-loader',
              'postcss-loader',
              'less-loader'
          ]
      }]
  }
```

* MiniCssExtractPlugin.loader
  + 将css做为link标签插入

#### css-plugins

* mini-css-extract-plugin
  + 将css做为link标签插入

```javascript
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
            ]
        }]
    }
}
```

* optimize-css-assets-webpack-plugin
  + 对css代码进行压缩
  + 在配置optimization的minimizer之后，webpack自带的js代码压缩会消失
可以使用uglifyjs-webpack-plugin插件进行对js代码压缩

```javascript
module.exports = {
    optimization: { //webpack的优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCss()
        ]
    },
}
```

### js配置

#### ES6代码转ES5代码

* babel-loader
  + @babel/core
    - 进行ES6的语法解析核心依赖包, 运行方式总共可以分为三个阶段：解析（parsing）、转换（transforming）和生成（generating）
    - 负责解析阶段的插件是@babel/parser,其作用就是将源码解析成AST
    - 负责生成阶段的插件是@babel/generator
    - 而@babel/core本身不具备转换处理的功能，它把转换的功能拆分到一个个插件（plugins）中,所以我们需要安装另外的插件
  + @babel/preset-env，
    - 预设的一组插件，可以根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5。
    - 一些ES6原型链上的函数（比如数组实例上的的filter、fill、find等函数）以及新增的内置对象（比如Promise、Proxy等对象），是低版本浏览器本身内核就不支持，因此@babel/preset-env面对他们时也无能为力。
  + @babel/plugin-proposal-decorators
    - 使代码支持使用装饰器。
  + @babel/plugin-transform-runtime
    - 提取公共的辅助函数
  + 在loader中添加include字段和exclude字段，排除对node_modules目录的编译

```javascript
module.exports = {
        module: {
            rules: [{
                    test: /\.js$/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ["@babel/plugin-proposal-decorators", {
                                    "legacy": true
                                }],
                                ["@babel/plugin-proposal-class-properties", {
                                    "loose": true
                                }],
                                "@babel/plugin-transform-runtime"
                            ]
                        },
                        include: path.resolve(__dirname, 'src'),
                        exclude: /node_modules/
                    }]
                }
            }
        }
```

#### 代码校验

* eslint-loader
  + 使用eslint对代码进行规范和校验
  + 添加eslint包，在项目根目录下添加.eslintrc.json配置文件
  + 可以在官网https://eslint.org/demo下载相应的配置文件。
  + loader默认是从右边向左，从下到上执行， 可配置enforce:'pre', 强制先执行

```javascript
module.exports = {
        module: {
            rules: [{
                    test: /\.js$/,
                    use: [{
                        {
                            test: /\.js$/,
                            use: {
                                loader: 'eslint-loader',
                                options: {
                                    enforce: 'pre'
                                }
                            }
                        },
                    }]
                }
            }
        }
```

#### 全局变量注入

* 使用expose-loader将全局变量暴露
* 使用webpack. ProvidePlugin将变量注到每个模块
  + 引入webpack包，在plugins里添加webpack. ProvidePlugin
  + 配置相应参数，key为注入的变量名，value为注入的包名
  + 这种方式无法使用window.$去访问变量

```javascript
//webpack.config.js文件
let webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}
//index.js文件
console.log($);
```

* 使用externals, 忽视代码中引入的包。通过外部链接引入的包，即使在代码中引入了，也不需要打包进代码里。
  + key为包名，value为引入包的变量名。

```javascript
//webpack.config.js文件
let webpack = require('webpack');
module.exports = {
    externals: {
        jquery: '$'
    },
}
//index.js文件
import $ from 'jquery'
console.log($);
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://code.jquery.com/jquery-3.6.0.slim.js"></script>
</head>

</html>
```

总结：对于第三方模块，有三种方式引入
* expose-loader 暴漏到window上
* providePlugin 给每个人提供一个$
* externals 引入不打包

### 图片配置

引入图片的方式有4种
* import logo from './logo.png'; 这种方式其实就是把图片引入，返回的结果是一个新的图片地址
* new Image().src="./logo.png"  普通的字符串
* <img src="./logo.png" alt=""/> 在html引入
* background('./logo.png') 在css引入 

使用loader对图片进行处理
* file-loader
  + 默认会在内部生成一张图片 到build目录下, 把生成的图片的名字返回回来

```javascript
{
    test: /\.(png|gif|jpg)/,
    use: ['file-loader']
},
```

* html-withimg-loader
  + 在html的img图片处理，file-loader无法处理，可以使用这个插件进行处理

```javascript
{
    test: /\.html$/,
    use: 'html-withimg-loader'
},
```

* url-loader
  + 做一个限制 当我们的图片 小于多少k的时候 用base64 来转化
  + 否则用file-loader产生真实的图片

```javascript
 {
     test: /\.(png|jpg|gif)$/,
     use: {
         loader: 'url-loader',
         options: {
             limit: 1, //当小于1K则使用base64
             outputPath: '/img/', //输出的目录
             publicPath: 'http://www.zhufengpeixun.cn' //图片链接的CDN域名
         }
     }
 },
```

# 配置篇

## 多页应用配置

多页面配置使用流程:
* entry配置一个对象, key为代码块名，value为入口文件地址
* 输出的filename需要配置成[name]
* 有多少个入口，就要配置多少个HtmlWebpackPlugin，并在chunks参数中引入代码块名，表示引用相关的入口

```javascript
let path = require('path');
module.exports = {
    mode: 'development',
    //entry配置一个对象,key为代码块名，value为入口文件地址
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    //输出的filename需要配置成[name]
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        //有多少个入口，就要配置多少个HtmlWebpackPlugin，并在chunks参数中引入代码块名，表示引用相关的入口
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['home'] //引用./src/index.js入口
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            chunks: ['other', 'home'] ////引用./src/index.js入口和./src/other.js入口
        })
    ]
}
```

## source-map

### source-map文件解析

浏览器加载source-map是通过js文件中的sourceMappingRUL来加载的，而且sourceMapping支持两种形式：文件路径或base64格式。
加载source-map之后，在浏览器dev tool中的Sources tab就能看到对应的信息了。
map文件中的sources字段和sourcesContent字段
sources字段对应的是文件信息，会在浏览器的Sources中生成对应目录结构。之后再将sourcesContent中的内容对应填入上述生成的文件中。我们在调试时为啥能看到文件信息和源码内容，就是sources和sourcesContent共同作用的结果。

### devtool配置

webapck的devtool文档配置地址:[地址](https://webpack.js.org/configuration/devtool/#root)

运行在浏览器中的代码是经过处理的，这就导致开发调试和线上排错变得困难。这时Source Map就登场了，有了它浏览器就可以从转换后的代码直接定位到转换前的代码。在webpack中，可以通过devtool选项来配置Source Map, 并且要配置mode使用
devtool有20+个可选值，但是归结为以下几个关键词
* inline、hidden、eval，这几个模式是互斥的，描述的是Source Map的引入方式。
  + inline：Source Map内容通过base64放在js文件中引入，比如inline-source-map
  + hidden：代码中没有sourceMappingURL，浏览器不自动引入Source Map，比如hidden-source-map
  + eval: 生成代码和Source Map内容混淆在一起，通过eval输出。
* nosources 使用这个关键字的Source Map不包含sourcesContent，调试时只能看到文件信息和行信息，无法看到源码。
* cheap 不包含列信息，并且源码是进过loader处理过的
* cheap-module 不包含列信息，源码是开发时的代码

### webpack推荐的配置

#### 开发环境配置

推荐使用：

* eval
* eval-source-map
* eval-cheap-source-map
* eval-cheap-module-source-map

|devtool|源码级别|构建速度|列信息|
|--- |--- |--- |--- |
|eval|webpack + loader处理后的代码|快|+|
|eval-source-map|源码|慢|+|
|eval-cheap-source-map|loader处理后的代码|中|-|
|eval-cheap-module-source-map|源码|中|-|

#### 生产环境配置

推荐使用：

* none
* source-map
* hidden-source-map
* nosources-source-map

|devtool|源码级别|安全性|列信息|
|--- |--- |--- |--- |
|none|-|-|-|
|source-map|源码|浏览器会加载source-map，调试时会暴露源码|+|
|hidden-source-map|源码|会生成map文件，但浏览器不会加载source-map。可以将map文件与错误上报工具结合使用|+|
|nosources-source-map|源码堆栈|没有sourcesContent，调试只能看到模块信息和行信息，不能看到源码|-|

#### 项目中的使用

开发环境：
eval-cheap-module-source-map：速度中，SourceMap内容混进代码里面，源码不经过处理 ，不用包括列信息，
生产环境：
大多数只需要知道报错的模块和行号就可以了，所以使用的是nosources-source-map

## 监听文件变动

添加watch参数，在文件变化时，重新执行打包

```javascript
 watch: true,
     watchOptions: { // 监控的选项
         poll: 1000, // 每秒 问我 1000次
         aggregateTimeout: 500, // 防抖 我一直输入代码 
         ignored: /node_modules/ // 不需要进行监控哪个文件
     },
```

## 常用插件应用

### webpack. DefinePlugin

定义环境变量, 在webpack.config定义好的变量，可以在代理中访问

```javascript
//webpack.config.js
let webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify('production'), //console.log('dev')
            FLAG: 'true',
            EXPORESSION: JSON.stringify('1+1')
        }),
    ]
}
//index.js
if (DEV == 'production') {
    console.log('正式环境');
}
```

### cleanWebpackPlugin 

清理生成目录

```javascript
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    plugins: [
        new CleanWebpackPlugin('./dist')
    ]
}
```

### copyWebpackPlugin

复制一些不需要编译的文件到生成目录下

```javascript
let CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    plugins: [
        new CopyWebpackPlugin([ // 拷贝插件
            {
                from: 'doc',
                to: './'
            }
        ]),
    ]
}
```

### webpack. BannerPlugin

写入版权信息等描述

```javascript
let webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.BannerPlugin('make 2019 by jw')
    ]
}
```

## webpack解析模块规则配置

webpack在启动后会从配置的入口模块触发找出所有依赖的模块，Resolve配置webpack如何寻找模块对应的文件。webpack内置JavaScript模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但可以根据resolve来配置

* extensions
  + 在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在。
  + resolve.extensions用于配置在尝试过程中用到的后缀列表，默认是：extensions:['.js', '.json']
  + 也就是说当遇到require('./data')这样的导入语句时，webpack会先去寻找./data.js文件，如果找不到则去找./data.json文件，如果还是找不到则会报错。

```javascript
module.exports = {
    resolve: {
        //导入vue组件时，可以不带.vue
        extensions: ['.js', '.json', '.vue']
    }
}
```

* modules
  + resolve.modules配置webpack去哪些目录下寻找第三方模块。
  + 默认是去node_modules目录下寻找。
  + 假如那些大量导入的模块都在components目录下, 可以利用modules配置项优化，优先查找components目录.

```javascript
module.exports = {
    resolve: {
        //优先查找components目录
        modules: ['./src/components', 'node_modules']
    }
}
```

* alias
  + resolve.alias配置项通过别名来把原来导入路径映射成一个新的导入路径。
  + 当你通过import Button from 'components/button'导入时，实际上被alias等价替换成import Button from './src/components/button'。实际上是把导入语句里的components关键字替换成./src/components。
  + 样做可能会命中太多的导入语句， alias还支持$符号来缩小范围只命中以关键字结尾的导入语句
  + 这样react$只会命中以react结尾的导入语句，即只会把import react关键字替换成import '/path/to/react.min.js'

```javascript
module.exports = {

    resolve: {
        alias: {
            componets: './src/components/',
            'react$': '/path/to/react.min.js',
            'vue$': 'vue/dist/vue.esm.js', //导入vue的时候，使用的是esm版本
        }
    }

}
```

* mainFields
  + 有一些第三方模块会针对不同环境提供几份代码。例如分别提供采用ES5 和 ES6的2份代码
  + webpack会根据mainFields的配置去决定有限采用哪份代码
  + webpack会按照数组里的顺序去package.json文件里面找，只会使用找到的第一个。

```javascript
//package.json
{
    "jsnext: main": "es/index.js", //采用ES6语法的代码入口文件
    "main": "lib/index.js" //采用ES5语法的代码入口文件
}
//webpack.config.js
module.exports = {
    resolve: {
        mainFields: ['jsnext:main', 'browser', 'main']
    }

}
```

## 区分不同环境

不同环境下，使用不同的webapck.config.js配置文件。
使用webpack-merge包，可以合并不同的环境的配置文件

```javascript
//webpack.base.js
module.exports = {
    entry: {
        home: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
}

//webpack.dev.js
let {
    smart
} = require('webpack-merge');
let base = require('./webpack.base.js');
module.exports = smart(base, {
    mode: 'development',
    devServer: {},
    devtool: 'source-map'
})

//webpack.pro.js
let {
    smart
} = require('webpack-merge');
let base = require('./webpack.base.js');
module.exports = smart(base, {
    mode: 'production',
    optimization: {
        minimizer: []
    },
})
```

## 优化

### 过滤不需要解析的包

noParse作用主要是过滤不需要解析的文件，比如打包的时候依赖了三方库（jquyer、lodash）等，而这些三方库里面没有其他依赖，可以通过配置noParse不去解析文件，提高打包的速度。

```javascript
module.exports = {
    module: {
        noParse: '/jquery|lodash/'
    }
}
```

### 忽略第三方包指定目录

IgnorePlugin插件忽略第三方包指定目录，让这些指定目录不要被打包进去。
比如我们要使用moment这个第三方依赖库，该库主要是对时间进行格式化，并且支持多个国家语言。虽然我设置了语言为中文，但是在打包的时候，是会将所有语言都打包进去的。这样就导致包很大，打包速度又慢。而moment的包含’./locale/‘该字段路径的文件目录就是各国语言的目录，比如’./locale/zh-cn’就是中文语言。

```javascript
//webpack.config.js
let webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/, /moment/), //moment这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去

    ]
}
//index.js
import moment from 'moment'
import 'moment/locale/zh-cn'; //忽略掉./locale/目录,手动引入所需要的语言包
moment.locale('zh-cn'); //设置语言
let r = moment().endOf('day').fromNow();
console.log(r);
```

### 动态链接库DLL

#### webpack. DllPlugin

事先把常用但又构建时间长的代码提前打包好（例如 react、react-dom），取个名字叫 dll。后面再打包的时候就跳过原来的未打包代码，直接用 dll。这样一来，构建时间就会缩短，提高 webpack 打包速度。

* 创建 dll 文件的打包脚本，目的是把 react，react-dom打包成 dll 文件：
* 添加输出变量的引入到html中
* 在原有的打配置引用dll文件
  

```javascript
//configs/webpack.dll.js
const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'production',
    entry: {
        react: ['react', 'react-dom'],
    },
    // 这个是输出 dll 文件
    output: {
        path: path.resolve(__dirname, '../dll'),
        filename: '_dll_[name].js',
        library: '_dll_[name]', //输出的变量
    },
    plugins: [
        // 这个是输出映射表
        new webpack.DllPlugin({
            name: '_dll_[name]', // name === output.library
            path: path.resolve(__dirname, '../dll/[name].manifest.json'),
        })
    ]
};
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <script type="text/javascript" src="../dll/_dll_react.js"></script>
    </body>
</head>

<body></body>

</html>
```

```javascript
//webpack.config.js
const path = require('path');
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.DllReferencePlugin({
            // 注意: DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
            context: path.resolve(__dirname, '../'),
            manifest: path.resolve(__dirname, '../dll/react.manifest.json'),
        })
    ]
}
```

#### autodll-webpack-plugin

上面的操作太过于复杂，使用autodll-webpack-plugin可以简化操作

```javascript
// webpack.config.js
const path = require('path');
const AutoDllPlugin = require('autodll-webpack-plugin'); // 第 1 步：引入 DLL 自动链接库插件
module.exports = {
    // ......
    plugins: [
        // 第 2 步：配置要打包为 dll 的文件
        new AutoDllPlugin({
            inject: true, // 设为 true 就把 DLL bundles 插到 index.html 里
            filename: '[name].dll.js',
            context: path.resolve(__dirname, '../'), // AutoDllPlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
            entry: {
                react: [
                    'react',
                    'react-dom'
                ]
            }
        })
    ]
}
```

#### HardSourceWebpackPlugin

dll 加速不明显了, Vue 和 React 官方 2018 都不再使用 dll 了, 在 AutoDllPlugin 的 README.md 里，给我们推荐了 HardSourceWebpackPlugin，初始配置更简单，只需要一行代码：

```javascript
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    // ......
    plugins: [
        new HardSourceWebpackPlugin() // <- 直接加入这行代码就行
    ]
}
```

**webpack5.0会把hard-source-webpack-plugin内置成一个配置。**

## webpack自带优化

### tree-shaking 

* tree-shaking 把没用到的代码自动删除掉
* 要使用import语法，在生产环境下会自动去除掉没用的代码，使用require语法不能去除掉。
* es6 模块会把结果放到defalut上

### scope hosting

* Scope Hoisting 的实现原理：分析出模块之间的依赖关系，尽可能将打散的模块合并到一个函数中，前提是不能造成代码冗余。 因此「只有那些被引用了一次的模块才能被合并」。
* 由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码「必须采用 ES6 模块化语句」，不然它将无法生效。
* 在 webpack 的 mode 设置为 production 时，会默认自动启用 Scope Hooting。
* 在 webpack 中已经内置 Scope Hoisting ，所以用起来很简单，只需要配置ModuleConcatenationPlugin 插件即可：

```javascript
// webpack.config.js
const webpack = require('webpack');
module.exports = {
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
};
```

## 抽取公共代码

webapck v4开始，移除了CommonsChunkPlugin，转而使用SplitChunksPlugin作为新的代码块分割插件。
SplitChunksPlugin主要是用来提取第三方库和公共模块，优化加载
SplitChunksPlugin是开箱即用的，这对大多数开发者来说非常友好。

```javascript
//webpack.config.js
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'async', // 打包的模块是异步、同步、还是全部，对应的值为async initial all，也可以写成函数形式，自定义打包
            minSize: 30000, // 抽离公共包的最小size
            maxSize: 0, // 最大size
            minChunks: 1, // 最少使用次数
            maxAsyncRequests: 5, // 最大异步请求数
            maxInitialRequests: 3, // 最大同步请求数
            automaticNameDelimiter: '~', // 默认情况下，webpack将使用块的名称和原始文件名称生成文件名（例如vendors~main.js）。此选项允许您指定用于生成的名称的分隔符
            automaticNameMaxLength: 30, // 允许设置由SplitChunksPlugin生成的块的名称字符的最大值

            name: true, // 生成块的名称，为true时，将根据块和缓存组密钥自动生成名称
            cacheGroups: { // 缓存组可以继承或者覆盖上面的选项，但是priority test reuseExistingChunk 只能在这里设置。如果不想使用缓存组，可以直接置为false
                vendors: {
                    test: /[\\/]node_modules[\\/]/, //缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
                    priority: -10 // 表示缓存的优先级；
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true //表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
                }
            }
        }
    }

}
```

## 懒加载

* 懒加载，其实就是按需加载（动态加载）。需要对webpack进行相关配置。
* 使用es6草案中的语法中import, 实际上是利用利用jsonp实现动态加载文件
* 直接使用import语法，会不支持，需要利用语法动态导入的插件@babel/plugin-syntax-dynamic-import
* vue的懒加载  react的懒加载都是这个原理，打包的时候会打包好resource.js文件，然后按需去动态加载
* 比如当我点击按钮的时候，需要动态去加载resource.js，并读取该文件导出的内容

```javascript
//index.js
let button = document.createElement('button');
button.innerHTML = "点击";
button.addEventListener('click', function() {
    console.log('click');
    import('./resource.js').then(data => {
        console.log(data.default); //数据是放在data的default属性里的
    })
});
document.body.appendChild(button);

//resource.js
export default 'yuhuaResource';
```

## 热更新

热更新，HMR即Hot Module Replacement是指当你对代码修改并保存后，webpack将会对代码进行重新打包，并将改动的模块发送到浏览器端，浏览器用新的模块替换掉旧的模块，去实现局部更新页面而非整体刷新页面。
原理其实就是
- DevServer内置一个express服务器
- webpack会建立起浏览器端和express服务器websocket链接，
- webpack会监听文件的化，让express发送更新到浏览器。
- 浏览器会接收服务器端推送的消息，如果需要热更新，浏览器发起 http 请求去服务器端获取打包好的资源解析并局部刷新页面。
```javascript
//webpack.config.js
module.exports = {
    devServer: {
        hot: true
    },
}
//hot.js
console.log('hello world'); //当hot.js更新时，index.js会再次加载hot.js

//index.js
import './hot.js'
if (module.hot) {
    module.hot.accept(['./hot.js'], () => {
        console.log('已经更新了');
    })
}
```
