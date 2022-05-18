# 通过webpack完成ES Module资源构建

**模块化**

- CMD/AMD/require.js
- CommonJS: 加载：require(), 输出：module.exports() || exports.x
- ES Module: 加载： import, 输出 export.default || export function || export const

**实现**

- npm i -D webpack webpack-cli
- touch webpack-config.js

```javascript
//webpack-config.js
const path = require('path')
module.exports = {
  entry: './bin/core.js',
  output:{
    path:path.join(__dirname,'/dist'),
    filename:'core.js'
  },
  mode:'development'
}

// index.js
#! /usr/bin/env node

require('./core')


// core.js
import utils from './utils'

utils()

// utils
module.exports = function(){
  console.log('kskaksk')
}
```

- 在package.json中添加两个script，分别为 "build":"webpack"和"dev":"webpack -w"
- 上面代码通过 npm run build 打包后，将上面index.js中的require修改为 require("../dist/core.js")
- 执行 liugezhou-test 看到构建成功。

# 通过webpack target属性支持Node内置库

- webpack的target使用

```javascript
// npm i -S path-exists
// bin/utils.js
import pathExists from 'path-exists'
export function exists(p){
  return pathExists.sync(p)
}

// bin/core.js
import path from 'path'
import {exists} from './utils'

console.log(path.resolve('.'))
console.log(exists(path.resolve('.')))

// webpack.config.js
...
    target:"node"
```

- core.js代码添加

```javascript
(async function(){
    await new Promise(resolve => setTimeout( resolve,1000));
    console.log('ok')
})()
```

# webpack loader配置babel-loader支持低版本node

配置一个最简单babel-loader,需要安装的库 npm i -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/runtime-corejs3

```javascript
const path = require('path')
module.exports = {
  entry:'./bin/core.js',
  output:{
    path: path.join(__dirname,'/dist'),
    filename:'core.js'
  },
  mode:'development', //开发模式
  // target: 'web'//默认
  target:'node', // 识别内置库
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs:3,
                  regenerator:true,
                  useESModules:true,
                  helpers: true
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
```

# 通过Node原生支持ES Module

将node版本升级到14.x，代码中将引用的文件，改写后缀名为 .mjs即可