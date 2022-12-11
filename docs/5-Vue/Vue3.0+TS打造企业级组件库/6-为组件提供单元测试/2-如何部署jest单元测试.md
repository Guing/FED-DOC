## 如何查看vue-cli的jtest单元测试配置

* 在根目录下有`jest.config.js`文件，根据`preset`查找

```ts
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
}
```

* 在github的vue-cli项目里，找到插件目录，找到插件`cli-plugin-unit-jest`，里面有一个`presets`目录
* 在`presets`目录里有几个预设的配置，这里使用的是`typescript-and-babel`的预设
* 可以在`jest.config.js`文件, 填写自定义的规则，替换掉默认的规则，比如替换掉默认的文件查找顺序`moduleFileExtensions`

```ts
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'ts',
    'tsx',
    // tell Jest to handle *.vue files
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
}

```
