## vue2,vue3与React区别
- 国内外对半
- 相似
  - 组件化开发
  - vue2 option api
  - vue3 composition api
  - 生命周期
  - react 16 hook
  - vdom 树
  - vue3动态对比
  - 虚拟dom跨平台
  - taro,uniapp
  - 数据驱动

## vue，React的SEO方案
- 服务端渲染（同构）
- 爬取静态
- next.js
- nuxt.js
- tdk

## 自定义的SEO优化
- tdk
- 标签语义化
- site-map
- 微数据结构化

## Nuxt.js用不了的生命周期


## axios如何做node，浏览器？
- node:http
- 浏览器：xhr

## 大文件下载暂停,断点续传
- Blob
- range

## 优化的指标
- 性能优化功能：输入URL，平台检测
- 无障碍


## 如何计算首屏时间
- performance
- fcp
- 白屏 首屏
  - 白屏：第一个字符出现的时间
  - 首屏：DOM加载完成稳定。
    - MutationObserver
    - body
    - 稳定：层级稳定

## webWorker
- JS是单线程，node不适合CPU密集性计算
- webworker不能操作dom
- 场景
  - 大数据计算
  - postmessage
- 不会影响主线程
  - onerror


## 前端工程化
- 减少复用性工作
-依赖nodejs: 文件，网络
- npm
- 热更新
- 图片：webp

## webpack

## 二叉树种类
- 平衡
- 完全
- 搜索二叉树

## 二叉树遍历
- 前序
- 后序
- 中序

## 网络
- 抓包


## HTTP2对于HTTP1.1
- 域名分片
- 多路复用
- HPACK算法
- 服务端推送


## TCP与UDP的区别
- 都是传输层的协议
- TCP连接，UDP报文
- 重传

## web安全防御
- xss
  - 存储型
- csrf
  - cookie
- apche log2j
  - 过滤


## babel插件
- AST
- type

## babel和polyfill

## 前端错误监控
- sentry

## 设计前端监控
- 采集
  - promise错误拦截
  - onerror
  - 框架自带错误回调
- 上报
  - source-map
  - sendBeacon
- 入库，分析
  - mysql
  - 展示


## 前端项目规范
- husky
  - .git
  - hooks:pre-commit


## 换肤
- 主题色
  - 计算近似色
- 定制布局
  - resolve.extension


## 微前端
- 模块太多
- webpack5
- 拆分，多模块独立上线
- 项目大到一定程度，多模块拆分一种解决方案
- 跨团队开发

## 项目部署
- 开发
- 测试
- 预生产
- jenkins
- master分支

## 组件单元测试
- Jest