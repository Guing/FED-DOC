# Day15 作业布置

## 一. 完成课堂所有的代码







## 二. 什么是render函数、jsx语法是什么？

render函数:

- vue在大部分场景中都使用模板来编写HTML 但是一些特殊的场景需要 使用js的完全编程能力 这个时候就需要使用渲染函数 因为它比模板更加接近编译器
- h函数用来创建一个vnode函数 底层调用的是createVNode函数
- 最终模板会被vue编译为render函数进行调用
- 如果setup函数返回一个一个函数 则该函数会被当成是render函数
- render函数中可以通过this访问定义的变量 this所指向的ctx也会通过参数传入render函数中


jsx语法

- 是javascript的语法扩展
- 可能会使人联想到模板语言 但是它具有javascript的全部功能



## 三. Vue中实现动画的组件有哪些？实现动画的本质是什么？

实现动画的组件:

- transition
  - 针对单个节点
  - 或者是同一时间渲染多个节点的一个
  - 可以给任何元素和组件添加进入/离开的过度
  - 过渡动画
    - 默认是v-enter-from v-enter-active v-enter-to
    - v-leave-from v-leave-active v-leave-to
    - 可以添加一个name属性那么 类名则以name属性的值开头
  - 如果同时设置过渡和动画 则需要设置`type`属性为transition或者animation告诉vue监听的类型
  - 可以指定过渡的时间 通过`duration`属性
- transition-group
  - 设计用于呈现一个列表中的元素或组件的插入、移除和顺序改变的动画效果
  - 和transition区别
    - 默认情况下 不会渲染一个元素的包裹器 但是可以指定一个tag attribute进行渲染
    - 过渡模式不可用 因为不再是互斥的元素进行切换
    - 其中的元素必须有一个独一无二的key

本质:

- 不同的时期给需要进行动画的元素添加对应的类或者删除对应的类名





## 四. 实现响应式原理代码，Vue2和Vue3响应式原理有什么区别？

区别:

- vue2用的是Object.defineProperty来进行set和get的操作
- vue3用的是ES6提供的proxy代理对象进行对象增删改的监听 进而进行依赖的收集和触发相关的操作





## 五. 完成项目的部署（云服务器选做）

- [项目部署](http://wangmm.top/trip)





## 六. 继续完成《弘源旅途》的项目代码（自己完成、多写几遍）



























































