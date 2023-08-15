## 

## editorconfig配置

- 一般项目中会存在`.editorconfig`文件，可以有助为为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。
  - EditorConfig 官方网址为[https://editorconfig.org/](https://editorconfig.org/)

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

- VSCode需要安装一个插件：EditorConfig for VS Code

![image-20230811185729214](image/%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA%E5%92%8C%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/image-20230811185729214.png)



## 使用prettier工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1.安装prettier

```shell
npm install prettier -D
```

2.配置.prettierrc文件：

```json
{
  "useTabs": false,//使用tab缩进还是空格缩进，选择false；
  "tabWidth": 2, //tab是空格的情况下，是几个空格，选择2个；
  "printWidth": 80, //当行字符的长度，超过就会换行。推荐80，也有人喜欢100或者120；
  "singleQuote": true, //使用单引号还是双引号，选择true，使用单引号；
  "trailingComma": "none",//在多行输入的尾逗号是否添加，设置为 `none`，比如对象类型的最后一个属性后面是否加一个，；
  "semi": false //语句末尾是否要加分号，默认值true，选择false表示不加；
}
```

3.创建.prettierignore忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4.VSCode需要安装prettier的插件

![image-20230811190903700](image/%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA%E5%92%8C%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/image-20230811190903700.png)

5.VSCode中的配置

- settings =>format on save => 勾选上
- settings => editor default format => 选择 prettier

![image-20230811191003850](image/%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA%E5%92%8C%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/image-20230811191003850.png)

6.使用prettier

* 使用方式一：在代码中保存代码；
  - 通过以上配置，直接在vscode中保存代码，就可以直接自动格式化文件

* 使用方式二：配置一次性修改的命令，直接格式化所有的文件。
  * 在package.json中配置一个scripts：`  "prettier": "prettier --write ."`
  * 运行这个命令就可以格式化所有的文件。  

##  使用ESLint检测

1.在前面创建项目的时候，我们就选择了ESLint，所以Vue会默认帮助我们配置需要的ESLint环境。

2.VSCode需要安装ESLint插件：

![image-20230811192523491](image/%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA%E5%92%8C%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/image-20230811192523491.png)

3.如果不想启用某个规则，则可以在.eslintrc.cjs文件中，直接设置为off。

比如以下：声明变量不使用会报错的规则设置为off

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": 'off' //声明变量不使用会报错的规则设置为off
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}

```



3.解决eslint和prettier冲突的问题：

- 安装插件：（vue在创建项目时，如果选择prettier，那么这两个插件会自动安装）

```shell
npm install eslint-plugin-prettier eslint-config-prettier -D
```

添加prettier插件：

```json
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended' //添加这个插件。
  ],
```

4.VSCode中eslint的配置

```json
  "eslint.lintTask.enable": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
```

