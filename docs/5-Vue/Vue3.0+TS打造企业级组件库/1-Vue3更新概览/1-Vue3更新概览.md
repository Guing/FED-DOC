## Vue3更新概览

* `vuejs/rfcs`是对vue以后要更新的东西，为什么要更新，这样更新有什么好处进行描述，也可以在Issues进行讨论。
[https://github.com/vuejs/rfcs](https://github.com/vuejs/rfcs)

* 主要包括以下的变化
  + Slot API的变化
  + 全局API使用规范变化
  + Teleport
  + Composition API
  + v-model的变化
  + 提令API的变化

## Composition API

* 使功能划分更加颗粒化，更加细节化，可以通过组件合的方式再拼凑在一起
* 不仅可以从组件上去抽象逻辑，更可以把组件抽象成更细节的函数，然后通过这些函数的组合，形成新的组件
* 与vue2的混合不一样，vue2的混合的命名空间是在声明的时候固定的，而组合API可以在调用时自定义变量名等。
* vue2的混合时，代码不直观，多个混合使用时，会增加代码阅读性的难度。而组合API可以更加直观
