# Day03 作业布置

## 一. 完成课堂所有的代码

已完成





## 二. wx:if和hidden属性有什么区别？开发中如何选择？

wx:if和hidden属性的区别 :

* wx:if需要根据条件判断组件是否渲染，条件为true，对应的组件才会渲染出来；条件为false时，对应组件不仅不会渲染，也不会出现在虚拟DOM中

  

* hidden属性本质是通过添加hidden这个属性来控制组件的隐藏或显示，即使条件为true，对应组件也会渲染，只不过不会显示在页面中



开发中的选择 :

如果操作频繁，建议使用hidden属性

如果操作不频繁，则建议使用wx:if



## 三. wx:for为什么需要绑定key？绑定key的方式有哪些？

为什么要绑定key :

- 当我们希望处于同一层的VNode 进行插入 删除 新增 节点时 可以更好的进行节点的复用 就需要key属性来判断

绑定key的方式有哪些 :

- 字符串: 表示 for循环array中item的某个属性(property) 该property是列表中的唯一的字符串或数字
- 保留关键字 *this 表示item本身 此时item本身是唯一的字符串或数字





## 四. WXS的作用是什么？如何使用？

WXS的作用 :

实现使用函数来处理WXML中的数据(类似于Vue中的过滤器)



如何使用WXS :

方式一 :写在<wxs>标签中,  <wxs> xxxx </wxs>

方式二 : 独立文件，通过src引入, <wxs src="xxx路径" />



## 五. 事件传递参数的方法有哪些？如何传递参数？

事件传递参数  :

小程序中常用传递参数的方式是通过 data- 属性来实现，可以在逻辑代码中通过 "el.currentTarget.dataset.属性名称" 获取



## 六. target和currentTarget的区别？

target和currentTarget的区别 :

` ·` target指触发事件的元素

` ·` currentTarget指的是处理事件的元素，两者作用在同一个元素上无差别，小程序中常用currentTarget



## 七. 页面和组件如何进行数据传递？都包括哪些传递方式？

页面和组件如何进行数据传递 :

` ·` 向组件传递数据可以通过 properties 属性，支持String、Number、Boolean、Object、Array、null等类型

` ·` 向组件传递样式可以通过定义externalClasses属性来实现

` ·` 组件向外传递事件可以在组件内部通过this.triggerEvent将事件派发，页面可以通过bind绑定

## 八.Tab-Control案例

已完成































































