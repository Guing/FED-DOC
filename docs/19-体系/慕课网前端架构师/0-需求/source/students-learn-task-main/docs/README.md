# Web 前端架构师课 - 学习笔记

> 浅层学习看输入，深入学习看输出！

慕课网《[Web 前端架构师](https://class.imooc.com/sale/fearchitect)》课程学习笔记汇总，课程要求每位同学每周都要及时产出学习笔记。

## 精选学习笔记

- [【郭二蛋】第一周笔记和作业](./pages/郭二蛋/01-第一周笔记和作业.md)
- [【点点】需求分析和架构设计](./pages/点点/01-需求分析和架构设计.md)
- [【彩笔】架构方案设计文档](./pages/彩笔/作业-01-架构方案设计文档.md)
- [【yhtx1997】第一周作业](./pages/yhtx1997/01-第一周作业.md)
- [【郭二蛋】第二周笔记和作业](./pages/郭二蛋/02-第二周笔记和作业.md)
- [【六玥】第二周笔记和作业](./pages/六玥/02-第二周笔记和作业.md)
- [【彩笔】脚手架架构设计和框架搭建](./pages/彩笔/作业-02-脚手架架构设计和框架搭建.md)
- [【Berners】第二周笔记和作业](./pages/Berners/02-第二周笔记和作业.md)
- [【い狂奔的蜗牛】01.Node.js中经典算法（一）](./pages/い狂奔的蜗牛/01.Node.js中经典算法（一）.md)
- [【yhtx1997】02-第二周作业](./pages/yhtx1997/02-第二周作业.md)
- [【郭二蛋】03-第三周学习笔记](./pages/郭二蛋/03-第三周学习笔记.md)
- [【い狂奔的蜗牛】02.Node.js中使用ES Module的两种方式](./pages/い狂奔的蜗牛/02.Node.js中使用ES%20Module的两种方式.md)
- [【彩笔】作业-03-脚手架核心流程开发](./pages/彩笔/作业-03-脚手架核心流程开发.md)
- [【Berners】03-第三周笔记和作业](./pages/Berners/03-第三周笔记和作业.md)
- [【clqyfe】07-Week03-脚手架核心流程开发](./pages/clqyfe/07-Week03-脚手架核心流程开发.md)
- [【彩笔】作业-04-脚手架命令注册和执行过程开发](./pages/彩笔/作业-04-脚手架命令注册和执行过程开发.md)
- [【い狂奔的蜗牛】03.sim-cli核心图集](./pages/い狂奔的蜗牛/03.sim-cli核心图集.md)
- [【い狂奔的蜗牛】04.Node.js多进程源码分析](./pages/い狂奔的蜗牛/04.Node.js多进程源码分析.md)
- [【郭二蛋】04-第四周笔记](./pages/郭二蛋/04-第四周笔记.md)
- [【い狂奔的蜗牛】07.第五周-readline源码阅读及实现简易版readline](./pages/い狂奔的蜗牛/07.第五周-readline源码阅读及实现简易版readline.md)
- [【い狂奔的蜗牛】08.第五周-类似inquirer列表类型交互实现](./pages/い狂奔的蜗牛/08.第五周-类似inquirer列表类型交互实现.md)
- [【Sunshine】第五周笔记和作业](./pages/Sunshine/03-第五周笔记和作业.md)
- [【彩笔】作业-05-脚手架创建项目流程设计和开发](./pages/彩笔/作业-05-脚手架创建项目流程设计和开发.md)
- [【い狂奔的蜗牛】09.第六周-ejs源码分析](./pages/い狂奔的蜗牛/09.第六周-ejs源码分析.md)
- [【jolly_chen】第六周 ejs使用和源码解析](./pages/jolly_chen/第六周 ejs使用和源码解析.md)
- [【jolly_chen】第六周 node require 加载模块.md](./pages/jolly_chen/第六周 node require 加载模块.md)
- [【い狂奔的蜗牛】10.第六周-require源码分析](./pages/い狂奔的蜗牛/10.第六周-require源码分析.md)
- [【彩笔】作业-06-脚手架项目和组件初始化开发](./pages/彩笔/作业-06-脚手架项目和组件初始化开发.md)

## 提交你的学习笔记

注意，以下操作需要你了解 github 的 fork 和 pull request 机制。这也是多人协作开发所必备的技能。

### fork 源码

进入 https://github.com/imooc-lego/students-learn-task ，fork 项目到自己的 github 空间。

然后下载项目到本地，安装并启动。

```shell
cd students-learn-task
npm i
npm run dev # 访问 localhost:4000
```

### 写学习笔记

即写博客文章。注意，**全程使用 markdown 语法**，不懂的自己去查。

- 新建 `docs/pages/<yourName>/` 目录 ，`<yourName>` 即你在慕课网的用户名（或昵称、网名，都可以）
- 新建 `docs/pages/<yourName>/README.md` ，内容参考现有的 `docs/pages/双越老师/README.md`
- 在 `docs/pages/<yourName>/` 下新建博客文件，命名格式按照 `01-xxx.md` `02-yyy.md` `03-zzz.md` ... 一定以序号 `01-` `02-` 开头！！ 
- 如果需要图片，可把图片文件放在 `docs/pages/<yourName>/images/` 中，然后在博客中引入

### 删掉 `docs/SUMMARY.md`

你在本地执行 `npm run dev` 或 `npm run build` 都会自动生成 `docs/SUMMARY.md` 。

检查一下，**如果你的代码中有 `docs/SUMMARY.md` 这个文件，请删除掉它**。\
否则，可能会和别人产生冲突，请一定注意检查！！！

最后，提交代码到 github 。

### 提交 pull request

- 从你 fork 的仓库，提交 pull request 到 https://github.com/imooc-lego/students-learn-task ，**请求合并到 `main` 分支**
- 确定 https://github.com/imooc-lego/students-learn-task 有你提交的 pull request
- 等待讲师处理（一般会在 24h 之内处理：合并或者回复），注意看 github 的通知

### 自动发布

pull request 被合并之后，会触发 [github actions](https://github.com/imooc-lego/students-learn-task/actions) ，自动打包、发布到 http://homework.imooc-lego.com/ 。

过程大概 3-5 分钟。

### 重点提醒

- 第一次，记得新建 `docs/pages/<yourName>/README.md` 文件
- 图片文件都放在 `docs/pages/<yourName>/images/` 目录中
- 提交时记得删掉 `docs/SUMMARY.md` 文件，否则容易产生冲突
- Pull request 提交成功之后，自己再检查一下：看是否有冲突？看 Files changed 是否符合预期？
