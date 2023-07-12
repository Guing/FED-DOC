## CSS编写的痛点

CSS作为一种样式语言, 本身用来给HTML元素添加样式是没有问题的.

但是目前前端项目已经越来越复杂, 不再是简简单单的几行CSS就可以搞定的, 我们需要几千行甚至上万行的CSS来完成页面的美化工作.

随着代码量的增加, 必然会造成很多的编写不便:

- 比如大量的重复代码, 虽然可以用类来勉强管理和抽取, 但是使用起来依然不方便;
- 比如无法定义变量(当然目前已经支持), 如果一个值被修改, 那么需要修改大量代码, 可维护性很差; (比如主题颜色)  
- 比如没有专门的作用域和嵌套, 需要定义大量的id/class来保证选择器的准确性, 避免样式混淆;
- 等等一系列的问题;

 所以有一种对CSS称呼是 “面向命名编程”;

 社区为了解决CSS面临的大量问题, 出现了一系列的CSS预处理器(CSS_preprocessor)

- CSS 预处理器是一个能让你通过预处理器自己独有的语法来生成CSS的程序;
- 市面上有很多CSS预处理器可供选择，且绝大多数CSS预处理器会增加一些原生CSS不具备的特性;  
- 代码最终会转化为CSS来运行, 因为对于浏览器来说只识别CSS;

## 常见的CSS预处理器

 常见的预处理器有哪些呢? 目前使用较多的是三种预处理器:

- Sass/Scss:
  - 2007年诞生，最早也是最成熟的CSS预处理器，拥有ruby社区的支持，是属于Haml(一种模板系统)的一部分;  
  - 目前受LESS影响，已经进化到了全面兼容CSS的SCSS;

- Less:
  - 2009年出现，受SASS的影响较大，但又使用CSS的语法，让大部分开发者更容易上手;
  - 比起SASS来，可编程功能不够，不过优点是使用方式简单、便捷，兼容CSS，并且已经足够使用;  
  - 另外反过来也影响了SASS演变到了SCSS的时代;
  - 著名的Twitter Bootstrap就是采用LESS做底层语言的，也包括React的UI框架AntDesign。

- Stylus:
- 2010年产生，来自Node.js社区，主要用来给Node项目进行CSS预处理支持; 
- 语法偏向于Python, 使用率相对于Sass/Less少很多

## 认识Less

 什么是Less呢? 我们来看一下官方的介绍:

> It's CSS, with just a little more.
>

- Less (Leaner Style Sheets 的缩写) 是一门CSS 扩展语言, 并且兼容CSS。 
- Less增加了很多相比于CSS更好用的特性;
- 比如定义变量、混入、嵌套、计算等等;
- Less最终需要被编译成CSS运行于浏览器中(包括部署到服务器中);

## less代码的编译 

- 方式一:下载Node环境，通过npm包管理下载less工具，使用less工具对代码进行编译;  

- 方法二:通过VSCode插件来编译成CSS或者在线编译  https://lesscss.org/less-preview/

- 方式三:引入CDN的less编译代码，对less进行实时的处理;
  - `<script src="https://cdn.jsdelivr.net/npm/less@4" ></script>`

- 方式四:将less编译的js代码下载到本地，执行js代码对less进行编译; 

## Less语法

### Less语法一：Less是兼容CSS的

  所以我们可以在Less文件中编写所有的CSS代码;  只是将css的扩展名改成了.less结尾而已;

```less
// 1.兼容CSS代码
.box {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 20px;
  color: #fff;
}
```

### Less语法二 – 变量(Variables)

在一个大型的网页项目中，我们CSS使用到的某几种属性值往往是特定的。比如我们使用到的主题颜色值，那么每次编写类似于#f3c258格式的语法;  一方面是记忆不太方便，需要重新编写或者拷贝样式;另一方面如果有一天主题颜色改变，我们需要修改大量的代码;所以，我们可以将常见的颜色或者字体等定义为变量来使用;

在Less中使用如下的格式来定义变量; @变量名: 变量值;

```less
// 2.定义变量
@mainColor: #a40011;
@smallFontSize: 12px;
@normalFontSize: 14px;
@bigFontSize: 18px;

.box .pel {
  color: @mainColor;
  font-size: @normalFontSize;
}
```

### Less语法三 – 嵌套(Nesting) 

 在之前的项目中，当我们需要找到一个内层的元素时，往往需要嵌套很多层的选择器。

Less提供了选择器的嵌套

```less
/ 3.选择器的嵌套
.box {
  .pel {
    color: @mainColor;
    font-size: @normalFontSize;
  }
}
```

 特殊符号:& 表示当前选择器的父级

```less
p {
    a.link {
      color: @mainColor;
      font-size: @smallFontSize;
      background-color: #0f0;
      &:hover {
        color: #00f;
      }
    }
  }
```

### Less语法四 – 运算(Operations)

在Less中，算术运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算。

算术运算符在加、减或比较之前会进行单位换算，计算的结果以最左侧操作数的单位类型为准;  

如果单位换算无效或失去意义，则忽略单位;

```less
.box {
  font-size: 20px;
  width: 10% + 50px;
  height: 100px;
  background-color: #ff0000 + #00ff00;
}
```

转化后：

```css
.box {
  font-size: 20px;
  width: 60%;
  height: 100px;
  background-color: #ffff00;
}

```

### Less语法五 – 混合(Mixins)

 在原来的CSS编写过程中，多个选择器中可能会有大量相同的代码。我们希望可以将这些代码进行抽取到一个独立的地方，任何选择器都可以进行复用;  在less中提供了混入(Mixins)来帮助我们完成这样的操作;

混合(Mixin)是一种将一组属性从一个规则集(或混入)到另一个规则集的方法。

```less
// 2.1. 混入的基本使用
.nowrap_ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.box1 {
  background-color: #f00;
  .nowrap_ellipsis();
}
```

注意:混入在没有参数的情况下，小括号可以省略，但是不建议这样使用;

混入也可以传入变量

```less
// 2.2.混入是可以传递参数(定义变量)的
.box_border(@borderWidth: 5px, @borderColor: purple) {
  border: @borderWidth solid @borderColor;
}
.box2 {
  background-color: #0f0;
  .box_border(10px, orange);
}

```

###  Less语法六-映射(Maps)

通过将命名空间与查找`[]`语法相结合，您可以将规则集/混合转换为映射。

```less
// 映射
.box_size {
  width: 100px;
  height: 100px;
}
.box1 {
  width: .box_size()[width];
}

```

混入可以与映射结合，弥补less中不能自定义函数的缺陷

```less
@htmlFontSize: 16px;

.pxToRem(@px){
  result: (@px / @htmlFontSize) * 1rem
}
.box{
  width:.pxToRem(100px)[result]
}
```



### Less语法七-extend继承

 和mixins作用类似，用于复用代码;
 和mixins相比，继承代码最终会转化成并集选择器;

继承生成的代码：

```less
.box_border {
  border: 5px solid #f00;
}
.box {
  width: 100px;
  background-color: orange;
  &:extend(.box_border);
}
```

```less
.box_border,
.box {
  border: 5px solid #f00;
}
.box {
  width: 100px;
  background-color: orange;
}

```

混入生成的代码：

```less
.box_border {
  border: 5px solid #f00;
}
.box {
  width: 100px;
  background-color: orange;
  .box_border();
}
```

```less
.box_border {
  border: 5px solid #f00;
}
.box {
  width: 100px;
  background-color: orange;
  border: 5px solid #f00;
}

```

- 混入生成的代码更容易阅读
- 混入代码使用的比较方便
- 推荐使用混入

### Less语法八-Less内置函数

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。  

内置函数手册:https://less.bootcss.com/functions/

### Less语法九-作用域(Scope)

  在查找一个变量时，首先在本地查找变量和混合(mixins);  如果找不到，则从“父”级作用域继承;

```less
@mainColor: #f00;

.box_mixin {
  @mainColor: orange;
}

.box {
 @mainColor: #0f0;

  .item {
    span {
      color: @mainColor;

      .box_mixin();
      @mainColor: #00f;
    }
  }
}
```

### Less语法十-注释(Comments)

  在Less中，块注释和行注释都可以使用;

```less
// 4.注释(comment)
// 单行注释
/* 多行注释 */ 
```

###  Less语法十一-导入(Importing)

  导入的方式和CSS的用法是一致的;

- 导入一个 .less 文件，此文件中的所有变量就可以全部使用了;  
- 在标准 CSS 中，`@import`规则必须位于所有其他类型的规则之前。但 Less 并不关心你把`@import`语句放在哪里

```less
.foo {
  background: #900;
}
@import "this-is-valid.less";
```
- @import根据文件扩展名，Less 可能会以不同方式处理语句：
  - 如果文件有.css扩展名，它将被视为 CSS，并且@import语句保持原样（请参阅下面的内联选项）。
  - 如果它有任何其他扩展名，它将被视为 Less 并导入。
  - 如果它没有扩展名，.less将被附加，并将作为导入的 Less 文件包含在内。

```less
@import "foo";      // foo.less is imported
@import "foo.less"; // foo.less is imported
@import "foo.php";  // foo.php imported as a Less file
@import "foo.css";  // statement left in place, as-is
```

