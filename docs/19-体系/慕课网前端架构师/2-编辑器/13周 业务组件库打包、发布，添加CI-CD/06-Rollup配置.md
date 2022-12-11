## Rollup Typescript处理插件

[Typescript处理](https://github.com/ezolenko/rollup-plugin-typescript2)

[TSconfig文档地址](https://www.typescriptlang.org/zh/tsconfig)

## Rollup 处理npm packages模块

Rollup 不会处理 `node_modules` 文件夹中的软件包。比如：

```javascript
import answer from 'the-answer';

export default function () {
  console.log('the answer is ' + answer);
}
```

打包后，我们将会看到下面这些警告：

```javascript
(!) Unresolved dependencies
https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency
the-answer (imported by main.js)
```

这个 [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) 插件可以告诉 Rollup 如何查找外部模块。 安装它...

```
npm install --save-dev rollup-plugin-node-resolve
```

...将它加入到你的配置文件中:

```
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ resolve() ]
};
```

这次，当你运行 `npm run build` , 再没有警告输出 - 打包文件 bundle 包含了引用的模块

### Rollup 使用external

#### npm依赖的分类

- dependencies

  - 运行项目业务逻辑需要依赖的第三方库
  - npm install '模块名'的时候都会呗解析，下载
- devDependencies

  - 开发模式工作流下依赖的第三方库
  - 单元测试，语法转换，lint工具，程序构建，本地开发 等等
- peerDependencies

  - 需要核心依赖库，不能脱离依赖库单独使用

#### Rollup使用external字段

可以将一些核心依赖放在dependencies和peerDependencies中，并在打包的时候将这些核心依赖以排除掉。这样子打包出来的组件库就只有自身的代码，比较精简，而其他核心依赖会在使用者安装组件库时，自动安装在node_modules.

```js
//rollup.config.js 
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { name } from '../package.json'
const file = type => `dist/${name}.${type}.js`
const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["tests/**/*.ts", "tests/**/*.tsx"]
}
export { name, file }
export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    vue(),
    css({ output: 'bundle.css' })
  ],
  //告诉rollup不要将此打包，而作为外部依赖
  external: ['vue', 'lodash-es']
}
```

## Rollup打包umd格式

- 使用globals声明外部依赖的全局变量名
- 使用export:'named'声明，本项目的umd的全局变量名

```javascript
export default {
  ...basicConfig,
  output: {
    name:'legoComponents',
    file: file('umd'),
    format: 'umd',
    globals: {
      'vue': 'Vue',
      'lodash-es': '_'
    },
    export:'named'
  }
}
```
