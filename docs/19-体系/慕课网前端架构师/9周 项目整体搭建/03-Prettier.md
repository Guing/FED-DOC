## Prettier

Prettier顾名思义，将代码变漂亮

### ESlint的功能

eslint可以解决两个问题

- 代码质量问题
- 代码风格问题

其中代码风格问题，会涉及到大量配置，配置比较麻烦。所以出现Prettier，无需要太多配置，就可以让代码变得漂亮

### Prettier在VSCODE的使用

可以参考文档[https://github.com/prettier/prettier-vscode](https://github.com/prettier/prettier-vscode)

### Prettier与Eslnt一起使用

prettier与Eslint一起使用的话，可能会导致与eslint的规则冲突，可以使用 `eslint-plugin-prettier`解决冲突，它会禁止一些冲突的eslint规则，并将自己的规则导入eslint中。

文档：[https://github.com/prettier/eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
