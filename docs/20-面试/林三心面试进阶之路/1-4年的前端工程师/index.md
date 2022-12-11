## 数据结构

### 几种常见的数据结构

逻辑结构  
  线性结构   线性表

  非线性结构  树，图
存储结构
  顺序存储结构
      顺序表
  链式存储结构
      链表
  索引存储结构

数据运算
  栈
     先进后出
  队列
     先进先出

## promise

### Promise中的then第二个参数和catch有什么区别？

- then的第二个参数是用来获取promise中reject或者throw new Error()的异常，
- catch其实就是一个语法糖，等于`.then(null,()=>{})`，
- 如果同时使用then的第二个参数和catch函数，则会使用就近原则，最先定义的会先触发，后面的不会触发。
- 建议总是使用catch方法，可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）

### async与await的原理

## vue与react

### vue与react的diff算法的区别

### 当技术管理，如何做技术选型

### vue3的响应式原理

### vue的defineProperty为什么不直接监听数组的下标，而是使用数组方法的劫持呢？

### vue如何不让数据做响应式处理

    vue2中不先在data中声明数据，后面直接通过this.xxx赋值。

## 渲染流程

### chrome的渲染流程

### 重绘和回流影响性能，那么如何避免呢？

### 使用raf可以优化重绘和回流吗？

### setTimeout与raf的区别？

## HTTP

### HTTP3比HTTP2优化了什么？

### HTTP2有什么了解？

### HTTP的缓存？

### HTTPS的了解？

### 对称加密和非对称加密的区别？

## 前端安全

### 在项目中的存在的安全漏洞解决过？

## 样式模块化

### react的样式模块化

## 规范

### 制定项目代码规范？

### 配置过eslint和prettier

## git

### git管理？

## code review

### pr审核时，以什么标准的审核

## 大文件上传

## requestIdleCallback

## react事件

### react事件与原生事件有什么区别？



## 总结
  不要说得太快，慢慢说。