## prettier的使用

* vscode搜索安装prettier
* 在项目根目录下新建.prettierrc文件，真写相应的书写规则
* 在vscode的设置里面搜索format，勾上`Editor: Format On Save`
  + 保存在User中的配置，是全局启用的。
  + 保存在Workspace中的配置，是会在当前项目下新建.vscode文件，只对当前项目使用。
* 配置完成之后，当保存代码时，就会自动格式化。
* prettierrc官方网址：[https://prettier.io/](https://prettier.io/)

## 配置vscode自动保存

* vscode的设置里面搜索`Files: Auto Save`
* 选择`onWindowChange`，当切换到其他应用程序时，vscode会自动保存编辑的文件
