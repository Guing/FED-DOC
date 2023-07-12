## HTML5新增元素

一直使用有div这样做有一个弊端:

- 我们往往过多的使用div, 通过id或class来区分元素;  
- 对于浏览器来说这些元素不够语义化; 
- 对于搜索引擎来说, 不利于SEO的优化;

HTML5新增了语义化的元素:
- `<header>`:头部元素
- `<nav>`:导航元素
- `<section>`:定义文档某个区域的元素
- `<article>`:内容元素
- `<aside>`:侧边栏元素  
- `<footer>`:尾部元素

HTML5其他新增元素：

- 音频:`<audio>`
- 视频:`<video>`

## input元素的扩展内容

HTML5对input元素也进行了扩展，在之前我们已经学习过的其中几个属性也是HTML5的特性:  
- placeholder:输入框的占位文字
- multiple:多个值
- autofocus:最多输入的内容

另外对于input的type值也有很多扩展:  
- date
- time
- number  
- tel
- color
- email
- 等等...

查看MDN文档:
  https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input

## 新增全局属性 data-\*

在HTML5中, 新增一种全局属性的格式 data-\*, 用于自定义数据属性:

- data设置的属性可以在JavaScript的DOM操作中通过dataset轻松获取到;  
- 通常用于HTML和JavaScript数据之间的传递;

![截屏2023-06-26 14.07.27](image/04-HTML5%E4%B8%8ECSS3/%E6%88%AA%E5%B1%8F2023-06-26%2014.07.27-7759654.png)

## CSS中的函数

在前面我们有使用过很多个CSS函数:

- 比如rgb/rgba/translate/rotate/scale等;
- CSS函数通常可以帮助我们更加灵活的来编写样式的值;

 下面我们再学习几个非常好用的CSS函数:

- var: 使用CSS定义的变量;
- calc: 计算CSS值, 通常用于计算元素的大小或位置; 
- blur: 毛玻璃(高斯模糊)效果;
- gradient:颜色渐变函数;

### CSS函数 - var

 CSS中可以自定义属性

- 属性名需要以两个减号(--)开始;  
- 属性值则可以是任何有效的CSS值;

![截屏2023-06-26 15.27.28](image/04-HTML5%E4%B8%8ECSS3/%E6%88%AA%E5%B1%8F2023-06-26%2015.27.28-7764452.png)

 我们可以通过var函数来使用:

![截屏2023-06-26 15.27.39](image/04-HTML5%E4%B8%8ECSS3/%E6%88%AA%E5%B1%8F2023-06-26%2015.27.39.png) 

- 规则集定义的选择器, 是自定义属性的可见作用域(只在选择器内部有效) 

- 所以推荐将自定义属性定义在html中，也可以使用 :root 选择器;

### CSS函数 -calc

 calc() 函数允许在声明 CSS 属性值时执行一些计算。  

- 计算支持加减乘除的运算;
-  +和 - 运算符的两边必须要有空白字符。 
- 通常用来设置一些元素的尺寸或者位置;
### ![截屏2023-06-26 15.28.52](image/04-HTML5%E4%B8%8ECSS3/%E6%88%AA%E5%B1%8F2023-06-26%2015.28.52-7764539.png)

### CSS函数 - blur

 blur() 函数将高斯模糊应用于输出图片或者元素;

- blur(radius)
- radius, 模糊的半径, 用于定义高斯函数的偏差值, 偏差值越大, 图片越模糊;

 通常会和两个属性一起使用:

- filter: 将模糊或颜色偏移等图形效果应用于元素; 
- backdrop-filter: 为元素后面的区域添加模糊或者其他效果;

![截屏2023-06-26 15.29.42](image/04-HTML5%E4%B8%8ECSS3/%E6%88%AA%E5%B1%8F2023-06-26%2015.29.42-7764587.png)

### CSS函数 – gradient

 `<gradient>` 是一种`<image>`CSS数据类型的子类型，用于表现两种或多种颜色的过渡转变。  

- CSS的`<image>`数据类型描述的是2D图形;
- 比如background-image、list-style-image、border-image、content等;
- `<image>`常见的方式是通过url来引入一个图片资源;
- 它也可以通过CSS的`<gradient>` 函数来设置颜色的渐变;

 `<gradient>`常见的函数实现有下面几种:

- linear-gradient():创建一个表示两种或多种颜色线性渐变的图片;
- radial-gradient():创建了一个图像，该图像是由从原点发出的两种或者多种颜色之间的逐步过渡组成;  
- repeating-linear-gradient():创建一个由重复线性渐变组成的`<image>`;
- repeating-radial-gradient():创建一个重复的原点触发渐变组成的`<image>`;
   等等;

linear-gradient的使用:![截屏2023-06-26 15.31.31](image/04-HTML5%E4%B8%8ECSS3/%E6%88%AA%E5%B1%8F2023-06-26%2015.31.31.png)

## 媒体查询

媒体查询是一种提供给开发者针对不同设备需求进行定制化开发的一个接口。

你可以根据设备的类型(比如屏幕设备、打印机设备)或者特定的特性(比如屏幕的宽度)来修改你的页面。  

媒体查询的使用方式主要有三种:

- 方式一:通过@media和@import使用不同的CSS规则(常用);

```html
<style>
    /* @import是可以和媒体查询结合来使用 */
    @import url(./css/body_bgc.css) (max-width: 800px);
  </style>
```

```html
<style>
    @media (max-width: 800px) {
      body {
        background-color: orange;
      }
    }
  </style>
```

- 方式二:使用media属性为`<style>, <link>, <source>`和其他HTML元素指定特定的媒体类型;

```html
  <link rel="stylesheet" media="screen and (max-width: 800px)" href="./css/body_bgc.css">
```

- 方式三:使用Window.matchMedia() 和MediaQueryList.addListener() 方法来测试和监控媒体状态;

 比较常用的是通过@media来使用不同的CSS规则，目前掌握这个即可;

### 媒体类型(Media types) 

在使用媒体查询时，你必须指定要使用的媒体类型。

媒体类型是可选的，并且会(隐式地)应用 all 类型。

常见的媒体类型值如下:

- all:适用于所有设备。
- print:适用于在打印预览模式下在屏幕上查看的分页材料和文档。  
- screen(掌握):主要用于屏幕。
- speech:主要用于语音合成器。

 被废弃的媒体类型:

- CSS2.1 和 Media Queries 3 定义了一些额外的媒体类型(tty, tv, projection, handheld, braille, embossed, 以及 aural)
- 但是他们在Media Queries 4 中已经被废弃，并且不应该被使用;
- aural类型被替换为具有相似效果的speech。

### 媒体特性(Media features)

 媒体特性(Media features)描述了 浏览器、输出设备，或是预览环境的具体特征;  

- 通常会将媒体特性描述为一个表达式;
- 每条媒体特性表达式都必须用括号括起来;

![截屏2023-06-26 17.54.24](image/04-HTML5%E4%B8%8ECSS3/%E6%88%AA%E5%B1%8F2023-06-26%2017.54.24.png)

### 逻辑操作符(logical operators)

 媒体查询的表达式最终会获得一个Boolean值，也就是真(true)或者假(false)。  

- 如果结果为真(true)，那么就会生效;
- 如果结果为假(false)，那么就不会生效;

 如果有多个条件，我们可以通过逻辑操作符联合复杂的媒体查询:

- and:and 操作符用于将多个媒体查询规则组合成单条媒体查询
- not:not运算符用于否定媒体查询，如果不满足这个条件则返回true，否则返回false。  
- only:only运算符仅在整个查询匹配时才用于应用样式。
- , (逗号):逗号用于将多个媒体查询合并为一个规则。

 比如下面的媒体查询，表示:屏幕宽度大于500，小于800的时候，body背景颜色为红色;

```html
<style>

    @media (min-width: 500px) and (max-width: 800px) {
      body {
        background-color: red;
      }
    }
    
  </style>
```

### 常见的移动端设备

这里我们以iPhone为例:

![截屏2023-06-26 17.55.22](image/04-HTML5%E4%B8%8ECSS3/%E6%88%AA%E5%B1%8F2023-06-26%2017.55.22.png)

![截屏2023-06-26 17.55.35](image/04-HTML5%E4%B8%8ECSS3/%E6%88%AA%E5%B1%8F2023-06-26%2017.55.35.png)