## less

 less是一种动态样式语言，属于css预处理器的范畴，它扩展了 CSS 语言，
 增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展
 LESS 既可以在 客户端 上运行 ，也可以借助Node.js在服务端运行。

 less的中文官网：[http://lesscss.cn/](http://lesscss.cn/)
 bootstrap中less教程：[http://www.bootcss.com/p/lesscss/](http://www.bootcss.com/p/lesscss/)

## Less编译工具

 koala 官网:www.koala-app.com

## less中的注释

    以//开头的注释，不会被编译到css文件中
    以/**/包裹的注释会被编译到css文件中  

## less中的变量

 使用@来申明一个变量：@pink：pink;
 1.作为普通属性值只来使用：直接使用@pink
 2.作为选择器和属性名：#@{selector的值}的形式
 3.作为URL：@{url}
 4.变量的延迟加载

## less中的嵌套规则

 1.基本嵌套规则
 2.&的使用

## less中的混合

 混合就是将一系列属性从一个规则集引入到另一个规则集的方式
 1.普通混合
 2.不带输出的混合
 3.带参数的混合
 4.带参数并且有默认值的混合
 5.带多个参数的混合
 6.命名参数
 7.匹配模式
 8.arguments变量

## less运算

 在less中可以进行加减乘除的运算

## less避免编译

`~`"不会被编译的内容"  变量在less中属于块级作用域，延迟加载

## less继承

 性能比混合高
 灵活度比混合低
