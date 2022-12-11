### 学习资源
- [HTML 介绍](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML)

### 元素分类

HTML5重新定义了元素的类别：见 [元素内容分类](https://html.spec.whatwg.org/multipage/indices.html#element-content-categories)([译文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories))。尽管这些新的定义更精确，但却比上述的 “块级元素” 和 “内联元素” 更难理解，因此在之后的讨论中仍使用旧的定义。

你可以查阅包含了块级元素和内联元素列表的参考页面—see [Block-level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) and [Inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements).

### 空元素

不是所有元素都拥有开始标签，内容，结束标签。一些元素只有一个标签，通常用来在此元素所在位置插入/嵌入一些东西。例如：元素[` `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)是用来在元素[` `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)所在位置插入一张指定的图片。例子如下：

### HTML中的空白

在上面的例子中，你可能已经注意到了在代码中包含了很多的空格——这是没有必要的；下面的两个代码片段是等价的：

```
<p>狗 狗 很 呆 萌。</p>

<p>狗 狗        很
         呆 萌。</p>
```

无论你在HTML元素的内容中使用多少空格(包括空白字符，包括换行)，当渲染这些代码的时候，HTML解释器会将连续出现的空白字符减少为一个单独的空格符。

### 指定你的文档中字符的编码

在上面的例子中，这行是被包含的：

```
<meta charset="utf-8">
```

这个元素简单的指定了文档的字符编码 —— 在这个文档中被允许使用的字符集。 `utf-8` 是一个通用的字符集，它包含了任何人类语言中的大部分的字符。 意味着该 web 页面可以显示任意的语言；所以对于你的每一个页面都使用这个设置会是一个好主意！比如说，你的页面可以很好的处理中文和藏文：

![img](https://image.cubox.pro/article/2022021401195126966/21854.jpg)

比如说，如果你将你的字符集设置为 `GBK` （中国大陆国标字符集），那么页面将出现乱码：

![img](https://image.cubox.pro/article/2022021401195245044/21706.jpg)

**注**: 一些浏览器（比如Chrome）会自动修正错误的编码，所以取决于你所使用的浏览器，你或许不会看到这个问题。无论如何，你仍然应该为你的页面手动设置编码为 `utf-8` ，来避免在其他浏览器中可能出现的潜在问题。

### 元数据的搜索优化

**Note**: 在谷歌搜索里，在主页面链接下面，你将看到一些相关子页面 — 这些是站点链接, 可以在 [Google&#39; s webmaster tools](https://www.google.com/webmasters/tools/) 配置— 一种可以使你的站点对搜索引擎更友好的方式。

**Note**: 许多 `<meta>` 特性已经不再使用。 例如，keyword `<meta>` 元素（ `<meta name="keywords" content="fill, in, your, keywords, here">` ）— 提供关键词给搜索引擎，根据不同的搜索词，查找到相关的网站 — 已经被搜索引擎忽略了， 因为作弊者填充了大量关键词到keyword， 错误地引导搜索结果。

### 其他类型的元数据

当你在网站上查看源码时，你也会发现其他类型的元数据。你在网站上看到的许多功能都是专有创作，旨在向某些网站(如社交网站)提供可使用的特定信息。

例如，Facebook 编写的元数据协议 [Open Graph Data](https://ogp.me/) 为网站提供了更丰富的元数据。在 MDN 源代码中，你会发现：

```
<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

上面代码展现的一个效果就是，当你在 Facebook 上链接到 MDN 时，该链接将显示一个图像和描述：这为用户提供更丰富的体验。

![img](image/37769.jpg)

Twitter 还拥有自己的类型的专有元数据协议，当网站的 URL 显示在 twitter.com 上时，它具有相似的效果。例如下面：

```
<meta name="twitter:title" content="Mozilla Developer Network">
```

## 在你的站点增加自定义图标

为了进一步丰富你的网站设计，你可以在元数据中添加对自定义图标的引用，这些将在特定的场合中显示。

这个不起眼的图标已经存在很多很多年了，16 x 16 像素是这种图标的第一种类型。你可以看见这些图标出现在浏览器每一个打开的页面中的标签页中中以及在书签面板中的书签页面中。

页面添加图标的方式有：

1. 将其保存在与网站的索引页面相同的目录中，以.ico格式保存（大多数浏览器将支持更通用的格式，如.gif或.png，但使用ICO格式将确保它能在如Internet Explorer 6一样久远的浏览器显示）
2. 将以下行添加到HTML `<head>`中以引用它：

   

```
   <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
   ```

  

现代浏览器在各种场合使用favicons，如打开的页面标签页和书签面板中的书签页面。下面是一个favicon 出现在书签面板中的例子：

![img](image/64036.jpg)

如今还有很多其他的图标类型可以考虑。 例如，你可以在 MDN 主页的源代码中找到它：

```
<!-- third-generation iPad with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://developer.mozilla.org/static/img/favicon144.png">
<!-- iPhone with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://developer.mozilla.org/static/img/favicon114.png">
<!-- first- and second-generation iPad: -->
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://developer.mozilla.org/static/img/favicon72.png">
<!-- non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
<link rel="apple-touch-icon-precomposed" href="https://developer.mozilla.org/static/img/favicon57.png">
<!-- basic favicon -->
<link rel="shortcut icon" href="https://developer.mozilla.org/static/img/favicon32.png">
```

这些注释解释了每个图标的用途 - 这些元素涵盖的东西提供一个高分辨率图标，这些高分辨率图标当网站保存到iPad的主屏幕时使用。

不用担心现在实现所有这些类型的图标 - 这是一个相当先进的功能，你将不会被要求在这个课堂上学习这个知识点。 这里的主要目的是让你提前了解有这一样东西以防当你浏览其他网站的源代码时不理解源代码的含义。

**注**：如果你的网站使用了内容安全策略（Content Security Policy, CSP）来增加安全性，这个策略会应用在图标上。如果你遇到了图标没有被加载的问题，你需要确认认 [ `Content-Security-Policy` ](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) header的 [ `img-src` directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src) 没有禁止访问图标。

## 为文档设定主语言

最后，值得一提的是可以（而且有必要）为站点设定语言， 这个可以通过添加 `lang` 属性到HTML开始标签中来实现 (参考 [meta-example.html](https://github.com/roy-tian/learning-area/blob/master/html/introduction-to-html/the-html-head/meta-example.html))，如下所示：

```
<html lang="zh-CN">
```

这在很多方面都很有用。如果你的HTML文档的语言设置好了，那么你的HTML文档就会被搜索引擎更有效地索引 (例如，允许它在特定于语言的结果中正确显示)，对于那些使用屏幕阅读器的视障人士也很有用(比如， 法语和英语中都有“six”这个单词，但是发音却完全不同)。

你还可以将文档的分段设置为不同的语言。例如，我们可以把日语部分设置为日语，如下所示：

```
<p>日语实例: <span lang="jp">ご飯が熱い。</span>.</p>
```

这些codes是根据 [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) 标准定义的。你可以在[Language tags in HTML and XML](https://www.w3.org/International/articles/language-tags/)找到更多相关的。

### 语义化结构层次

这里举一个例子。在一个故事中， `<h1>` 表示故事的名字， `<h2>` 表示每个章节的标题， `<h3>` 表示每个章节下的子标题，以此类推。

```
<h1>三国演义</h1>

<p>罗贯中</p>

<h2>第一回 宴桃园豪杰三结义 斩黄巾英雄首立功</h2>

<p>话说天下大势，分久必合，合久必分。周末七国分争，并入于秦。及秦灭之后，楚、汉分争，又并入于汉……</p>

<h2>第二回 张翼德怒鞭督邮 何国舅谋诛宦竖</h2>

<p>且说董卓字仲颖，陇西临洮人也，官拜河东太守，自来骄傲。当日怠慢了玄德，张飞性发，便欲杀之……</p>

<h3>却说张飞</h3>

<p>却说张飞饮了数杯闷酒，乘马从馆驿前过，见五六十个老人，皆在门前痛哭。飞问其故，众老人答曰：“督邮逼勒县吏，欲害刘公；我等皆来苦告，不得放入，反遭把门人赶打！”……</p>
```

所涉及的元素具体代表什么，完全取决于作者编辑的内容，只要层次结构是合理的。在创建此类结构时，您只需要记住一些最佳实践：

* 您应该最好只对每个页面使用一次 `<h1>` — 这是顶级标题，所有其他标题位于层次结构中的下方。
* 请确保在层次结构中以正确的顺序使用标题。不要使用 `<h3>`来表示副标题，后面跟 `<h2>`来表示副副标题 - 这是没有意义的，会导致奇怪的结果。
* 在可用的六个标题级别中，您应该只在每页使用不超过三个，除非您认为有必要使用更多。具有许多级别的文档（即，较深的标题层次结构）变得难以操作并且难以导航。在这种情况下，如果可能，建议将内容分散在多个页面上。

为了实现语义化标记，HTML 提供了明确这些区段的专用标签，例如：

* [header](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header)：页眉。
* [nav](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav)：导航栏。
* [main](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main)：主内容。主内容中还可以有各种子内容区段，可用article，section，div 等元素表示。
* [aside](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside)：侧边栏，经常嵌套在 [main](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main) 中。
* [footer](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer)：页脚。

## HTML 布局元素细节

理解所有 HTML 区段元素具体含义是很有益处的，这一点将随着个人 web 开发经验的逐渐丰富日趋显现。更多细节请查阅 [HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)。现在，你只需要理解以下主要元素的意义：

* [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main) 存放每个页面独有的内容。每个页面上只能用一次 `<main>`，且直接位于 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 中。最好不要把它嵌套进其它元素。
* [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) 包围的内容即一篇文章，与页面其它部分无关（比如一篇博文）。
* [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) 与 `<article>` 类似，但 `<section>` 更适用于组织页面使其按功能（比如迷你地图、一组文章标题和摘要）分块。一般的最佳用法是：以 [标题](https://developer.mozilla.org/en-US/Learn/HTML/Howto/Set_up_a_proper_title_hierarchy) 作为开头；也可以把一篇 `<article>` 分成若干部分并分别置于不同的 `<section>` 中，也可以把一个区段 `<section>` 分成若干部分并分别置于不同的 `<article>` 中，取决于上下文。
* [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside) 包含一些间接信息（术语条目、作者简介、相关链接，等等）。
* [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header) 是简介形式的内容。如果它是 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 的子元素，那么就是网站的全局页眉。如果它是 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) 或[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) 的子元素，那么它是这些部分特有的页眉（此 `<header>` 非彼 [标题](https://developer.mozilla.org/zh-CN/docs/learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML%23%E5%A2%9E%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%A0%87%E9%A2%98)）。
* [`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav) 包含页面主导航功能。其中不应包含二级链接等内容。
* [`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer) 包含了页面的页脚部分。

### 换行与水平分割线

有时会用到 [ `<br>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br) 和 [ `<hr>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/hr) 两个元素，需要介绍一下。

`<br>` 可在段落中进行换行； `<br>` 是唯一能够生成多个短行结构（例如邮寄地址或诗歌）的元素。比如：

```
<p>从前有个人叫小高<br>
他说写 HTML 感觉最好<br>
但他写的代码结构语义一团糟<br>
他写的标签谁也懂不了。</p>
```

没有 `<br>` 元素，这段会直接显示在长长的一行中（如前文所讲，[HTML会忽略大部分空格](https://developer.mozilla.org/zh-CN/docs/learn/HTML/Introduction_to_HTML/Getting_started%23html%E4%B8%AD%E7%9A%84%E7%A9%BA%E7%99%BD)）；使用 `<br>` 元素，才使得诗看上去像诗：

从前有个人叫小高
他说写 HTML 感觉最好
但他写的代码结构语义一团糟
他写的标签谁也懂不了。

`<hr>` 元素在文档中生成一条水平分割线，表示文本中主题的变化（例如话题或场景的改变）。一般就是一条水平的直线。

### HTML 验证

阅读以上示例后，你发现保持良好 HTML 格式的重要性。那么应该如何做呢？以上示例规模较小，查找错误还不难，但是一个非常庞大、复杂的 HTML 文档呢？

最好的方法就是让你的HTML页面通过 [Markup Validation Service](https://validator.w3.org/)。由 W3C（制定 HTML、CSS 和其他网络技术标准的组织） 创立并维护的标记验证服务。把一个 HTML 文档加载至本网页并运行 ，网页会返回一个错误报告。

![](https://cubox.pro/c/filters:no_upscale()?imageUrl=https%3A%2F%2Fmdn.mozillademos.org%2Ffiles%2F12441%2Fvalidator.png)

网页可以接受网址、上传一个 HTML 文档，或者直接输入一些 HTML 代码。

### 尽可能使用相对链接

从上面的描述中，您可能认为始终使用绝对链接是一个好主意；毕竟，当页面像相对链接那样移动时，它们不会中断。但是，当链接到同一网站的其他位置时，你应该使用相对链接（当链接到另一个网站时，你需要使用绝对链接）：

* 首先，检查代码要容易得多——相对URL通常比绝对URL短得多，这使得阅读代码更容易。
* 其次，在可能的情况下使用相对URL更有效。当使用绝对URL时，浏览器首先通过[DNS](https://developer.mozilla.org/zh-CN/docs/Glossary/DNS)（见[万维网是如何工作的](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/How_the_Web_works)）查找服务器的真实位置，然后再转到该服务器并查找所请求的文件。另一方面，相对URL，浏览器只在同一服务器上查找被请求的文件。因此，如果你使用绝对URL而不是相对URL，你就会不断地让你的浏览器做额外的工作，这意味着它的效率会降低。

### 在下载链接时使用 download 属性

当您链接到要下载的资源而不是在浏览器中打开时，您可以使用 download 属性来提供一个默认的保存文件名（译注：此属性仅适用于[同源URL](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)）。下面是一个下载链接到Firefox 的 Windows最新版本的示例：

```
<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=zh-CN"
   download="firefox-latest-64bit-installer.exe">
  下载最新的 Firefox 中文版 - Windows（64位）
</a>
```

## 缩略语

另一个你在web上看到的相当常见的元素是[` `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/abbr)——它常被用来包裹一个缩略语或缩写，并且提供缩写的解释（包含在[` title`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes%23attr-title)属性中）。让我们看看下面两个例子：

```
<p>我们使用 <abbr title="超文本标记语言（Hyper text Markup Language）">HTML</abbr> 来组织网页文档。</p>

<p>第 33 届 <abbr title="夏季奥林匹克运动会">奥运会</abbr> 将于 2024 年 8 月在法国巴黎举行。</p>
```

这些代码的显示效果如下（当光标移动到项目上时会出现提示）：

我们使用 HTML 来组织网页文档。

第 33 届 奥运会 将于 2024 年 8 月在法国巴黎举行。

**Note**: 还有另一个元素 `<acronym>` ，它基本上与 `<abbr>` 相同，专门用于首字母缩略词而不是缩略语。 然而，这已经被废弃了 - 它在浏览器的支持中不如 `<abbr>` ，并且具有类似的功能，所以没有意义。 只需使用 `<abbr>` 。

## 展示计算机代码

有大量的HTML元素可以来标记计算机代码：

* [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/code): 用于标记计算机通用代码。
* [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre): 用于保留空白字符（通常用于代码块）——如果您在文本中使用缩进或多余的空白，浏览器将忽略它，您将不会在呈现的页面上看到它。但是，如果您将文本包含在 `<pre></pre>`标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。
* [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/var): 用于标记具体变量名。
* [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/kbd): 用于标记输入电脑的键盘（或其他类型）输入。
* [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/samp): 用于标记计算机程序的输出。

## 上标和下标

当你使用日期、化学方程式、和数学方程式时会偶尔使用上标和下标。 [` `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/sup) 和[` `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/sub)元素可以解决这样的问题。例如：

```
<p>咖啡因的化学方程式是 C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>。</p>
<p>如果 x<sup>2</sup> 的值为 9，那么 x 的值必为 3 或 -3。</p>
```

这些代码输出的结果是：

咖啡因的化学方程式是 C8H10N4O2。

如果 x2 的值为 9，那么 x 的值必为 3 或 -3。

## 标记时间和日期

HTML 还支持将时间和日期标记为可供机器识别的格式的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time) 元素。例如：

```
<time datetime="2016-01-20">2016年1月20日</time>
```

为什么需要这样做？因为世界上有许多种书写日期的格式，上边的日期可能被写成：

* 20 January 2016
* 20th January 2016
* Jan 20 2016
* 20/06/16
* 06/20/16
* The 20th of next month
* 20e Janvier 2016
* 2016年1月20日
* And so on

但是这些不同的格式不容易被电脑识别 — 假如你想自动抓取页面上所有事件的日期并将它们插入到日历中，[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time) 元素允许你附上清晰的、可被机器识别的 时间/日期来实现这种需求。

### 备选文本

下一个我们讨论的属性是 `alt` ，它的值应该是对图片的文字描述，用于在图片无法显示或不能被看到的情况。例如，上面的例子可以做如下改进：

```
<img src="images/dinosaur.jpg"
     alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth">
```

测试 `alt` 属性最简单的方式就是故意拼错图片文件名，这样浏览器就无法找到该图片从而显示备选的文本。如果我们将上例的图片文件名改为 `dinosooooor.jpg` ，浏览器就不能显示图片，而显示：

![](https://cubox.pro/c/filters:no_upscale()?imageUrl=https%3A%2F%2Fmdn.mozillademos.org%2Ffiles%2F12702%2Falt-text.png)

### Image titles 图片标题

类似于[超链接](https://cubox.pro/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#%E4%BD%BF%E7%94%A8%3Ctitle%3E%E6%B7%BB%E5%8A%A0%E6%94%AF%E6%8C%81%E4%BF%A1%E6%81%AF)，你可以给图片增加 `title` 属性来提供需要更进一步的支持信息。在我们的例子中，可以这样做：

```
<img src="images/dinosaur.jpg"
     alt="一只恐龙头部和躯干的骨架，它有一个巨大的头，长着锋利的牙齿。"
     width="400"
     height="341"
     title="A T-Rex on display in the Manchester University Museum">
```

这会给我们一个鼠标悬停提示，看起来就像链接标题：

![](https://cubox.pro/c/filters:no_upscale()?imageUrl=https%3A%2F%2Fmdn.mozillademos.org%2Ffiles%2F12708%2Fimage-with-title.png)

图片标题并不必须要包含有意义的信息，通常来说，将这样的支持信息放到主要文本中而不是附着于图片会更好。不过，在有些环境中这样做更有用，比如当没有空间显示提示时，也就是在图片栏中。

### HTML5 的 [ `<figure>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure)

HTML5 的 [ `<figure>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) 和 [ `<figcaption>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption) 元素，它正是为此而被创造出来的：为图片提供一个语义容器，在标题和图片之间建立清晰的关联。我们之前的例子可以重写为:

```
<figure>
  <img src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg"
     alt="一只恐龙头部和躯干的骨架，它有一个巨大的头，长着锋利的牙齿。"
     width="400"
     height="341">
  <figcaption>曼彻斯特大学博物馆展出的一只霸王龙的化石</figcaption>
</figure>
```

这个 [ `<figcaption>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption) 元素 告诉浏览器和其他辅助的技术工具这段说明文字描述了 [ `<figure>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) 元素的内容.

 **注意：** 从无障碍的角度来说，说明文字和 [ `alt` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img%23attr-alt) 文本扮演着不同的角色。看得见图片的人们同样可以受益于说明文字，而 [ `alt` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img%23attr-alt) 文字只有在图片无法显示时才这样。 所以，说明文字和 `alt` 的内容不应该一样，因为当图片无法显示时，它们会同时出现。尝试让你的图片不显示，看看效果如何。

注意 [ `<figure>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) 里不一定要是一张图片，只要是一个这样的独立内容单元：

* 用简洁、易懂的方式表达意图。
* 可以置于页面线性流的某处。
* 为主要内容提供重要的补充说明。

[ `<figure>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) 可以是几张图片、一段代码、音视频、方程、表格或别的。

### `<video>` 元素

[ `<video>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 允许你轻松地嵌入一段视频。一个简单的例子如下：

```
<video src="rabbit320.webm" controls>
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

当中的一些属性如下:

[ `src` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video%23attr-src)同 [ `<img>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 标签使用方式相同， `src` 属性指向你想要嵌入网页当中的视频资源，他们的使用方式完全相同。[ `controls` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video%23attr-controls)用户必须能够控制视频和音频的回放功能。你可以使用 `controls` 来包含浏览器提供的控件界面，同时你也可以使用合适的 [JavaScript API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) 创建自己的界面。界面中至少要包含开始、停止以及调整音量的功能。 `<video>` 标签内的内容这个叫做**后备内容** — 当浏览器不支持 `<video>` 标签的时候，就会显示这段内容，这使得我们能够对旧的浏览器提供回退内容。你可以添加任何后备内容，在这个例子中我们提供了一个指向这个视频文件的链接，从而使用户至少可以访问到这个文件，而不会局限于浏览器的支持。

## SVG是什么？

[SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) 是用于描述矢量图像的[XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML)语言。 它基本上是像HTML一样的标记，只是你有许多不同的元素来定义要显示在图像中的形状，以及要应用于这些形状的效果。 SVG用于标记图形，而不是内容。 非常简单，你有一些元素来创建简单图形，如[ `<circle>` ](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/circle) 和[ `<rect>` ](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/rect)。更高级的SVG功能包括 [ `<feColorMatrix>` ](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feColorMatrix)（使用变换矩阵转换颜色）[ `<animate>` ](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/animate) （矢量图形的动画部分）和 [ `<mask>` ](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/mask)（在图像顶部应用模板）

作为一个简单的例子，以下代码创建一个圆和一个矩形：

```
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```

这将创建以下输出：

<iframe class="hide-codepen-jsfiddle" title="SVG是什么？" id="frame_what_is_svg" width="300" height="200" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web/_sample_.what_is_svg.html" loading="lazy"></iframe>

SVG除了迄今为止所描述的以外还有其他优点：

* 矢量图像中的文本仍然可访问（这也有利于 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO))）。
* SVG 可以很好地适应样式/脚本，因为图像的每个组件都是可以通过CSS或通过JavaScript编写的样式的元素。

那么为什么会有人想使用光栅图形而不是SVG？ 其实 SVG 确实有一些缺点：

* SVG非常容易变得复杂，这意味着文件大小会增加; 复杂的SVG也会在浏览器中占用很长的处理时间。
* SVG可能比栅格图像更难创建，具体取决于您尝试创建哪种图像。
* 旧版浏览器不支持SVG，因此如果您需要在网站上支持旧版本的 IE，则可能不适合（SVG从IE9开始得到支持）。

由于上述原因，光栅图形更适合照片那样复杂精密的图像。

 **注意：** 在Inkscape中，将文件保存为纯SVG以节省空间。 另请参阅[如何为Web准备SVG](http://tavmjong.free.fr/INKSCAPE/MANUAL/html/Web-Inkscape.html)。

## 将SVG添加到页面

在本节中，我们将介绍将SVG矢量图形添加到网页的不同方式。

### 快捷方式：[ `<img>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)

要通过 [ `<img>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)元素嵌入SVG，你只需要按照预期的方式在 src 属性中引用它。你将需要一个 `height` 或 `width` 属性（或者如果您的SVG没有固有的宽高比）。如果您还没使用过 `<img>` 元素，请阅读[HTML中的图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)教程 。

```
<img
    src="equilateral.svg"
    alt="triangle with all three sides equal"
    height="87px"
    width="100px" />
```

#### 优点

* 快速，熟悉的图像语法与 `alt`属性中提供的内置文本等效。
* 可以通过在[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)元素嵌套 `<img>`，使图像轻松地成为超链接。

#### 缺点

* 无法使用JavaScript操作图像。
* 如果要使用CSS控制SVG内容，则必须在SVG代码中包含内联CSS样式。 （从SVG文件调用的外部样式表不起作用）
* 不能用CSS伪类来重设图像样式（如 `:focus`）。

### 疑难解答和跨浏览器支持

对于不支持SVG（IE 8及更低版本，Android 2.3及更低版本）的浏览器，您可以从 `src` 属性引用PNG或JPG，并使用[ `srcset` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img%23attr-srcset)属性 只有最近的浏览器才能识别）来引用SVG。 在这种情况下，仅支持浏览器将加载SVG - 较旧的浏览器将加载PNG：

```
<img src="equilateral.png" alt="triangle with equal sides" srcset="equilateral.svg">
```

您还可以使用SVG作为CSS背景图像，如下所示。 在下面的代码中，旧版浏览器会坚持他们理解的PNG，而较新的浏览器将加载SVG：

```
background: url("fallback.png") no-repeat center;
background-image: url("image.svg");
background-size: contain;
```

像上面描述的 `<img>` 方法一样，使用 CSS 背景图像插入SVG 意味着它不能被 JavaScript 操作，并且也受到相同的 CSS 限制。

如果 SVG 根本没有显示，可能是因为你的服务器设置不正确。 如果是这个问题，[这篇文章](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Getting_Started%23a_word_on_webservers)将告诉你正确方向。

### 如何在HTML中引入SVG代码

你还可以在文本编辑器中打开SVG文件，复制SVG代码，并将其粘贴到HTML文档中 - 这有时称为将**SVG内联**或 **内联SVG** 。确保您的SVG代码在 `<a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg" target="_blank">&lt; svg&gt; &lt; /svg&gt; </a>` 标签中（不要在外面添加任何内容）。这是一个非常简单的示例，您可以粘贴到文档中：

```
<svg width="300" height="200">
    <rect width="100%" height="100%" fill="green" />
</svg>
```

#### 优点

* 将 SVG 内联减少 HTTP 请求，可以减少加载时间。
* 您可以为 SVG 元素分配 `class`和 `id`，并使用 CSS 修改样式，无论是在SVG中，还是 HTML 文档中的 CSS 样式规则。 实际上，您可以使用任何 [SVG外观属性](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute%23presentation_attributes) 作为CSS属性。
* 内联SVG是唯一可以让您在SVG图像上使用CSS交互（如 `:focus`）和CSS动画的方法（即使在常规样式表中）。
* 您可以通过将 SVG 标记包在[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)元素中，使其成为超链接。

#### 缺点

* 这种方法只适用于在一个地方使用的SVG。多次使用会导致资源密集型维护（resource-intensive maintenance）。
* 额外的 SVG 代码会增加HTML文件的大小。
* 浏览器不能像缓存普通图片一样缓存内联SVG。
* 您可能会在[`<foreignObject>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/foreignObject) 元素中包含回退，但支持 SVG 的浏览器仍然会下载任何后备图像。你需要考虑仅仅为支持过时的浏览器，而增加额外开销是否真的值得。

### 如何使用[ `<iframe>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 嵌入SVG

您可以在浏览器中打开 SVG 图像，就像网页一样。 因此，使用 `<iframe>` 嵌入 SVG 文档就像我们在 [从对象到iframe - 其他嵌入技术](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies) 中进行研究一样。

这是一个快速回顾：

```
<iframe src="triangle.svg" width="500" height="500" sandbox>
    <img src="triangle.png" alt="Triangle with three unequal sides" />
</iframe>
```

这绝对不是最好的方法：

#### 缺点

* 如你所知， `iframe`有一个回退机制，如果浏览器不支持 `iframe`，则只会显示回退。
* 此外，除非 SVG 和您当前的网页具有相同的 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)，否则你不能在主页面上使用 JavaScript 来操纵 SVG。

## 为表格中的列提供共同的样式

在我们继续介绍之前，我们将介绍本文中的最后一个功能。HTML有一种方法可以定义整列数据的样式信息：就是 **`<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col" target="_blank">&lt; col&gt; </a>`** 和 **`<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup" target="_blank">&lt; colgroup&gt; </a>`** 元素。 它们存在是因为如果你想让一列中的每个数据的样式都一样，那么你就要为每个数据都添加一个样式，这样的做法是令人厌烦和低效的。你通常需要在列中的每个 `<td>` 或 `<th>` 上定义样式，或者使用一个复杂的选择器，比如 [ `:nth-child()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child "Currently only available in English (US)")。

下面是一个简单的示例:

```
<table>
  <tr>
    <th>Data 1</th>
    <th style="background-color: yellow">Data 2</th>
  </tr>
  <tr>
    <td>Calcutta</td>
    <td style="background-color: yellow">Orange</td>
  </tr>
  <tr>
    <td>Robots</td>
    <td style="background-color: yellow">Jazz</td>
  </tr>
</table>
```

下面就是上述代码的结果:

| Data 1   | Data 2 |
| -------- | ------ |
| Calcutta | Orange |
| Robots   | Jazz   |

这样不太理想，因为我们不得不在列中的每个单元格中重复那些样式信息 (在真实的项目中，我们或许会设置一个 `class` 包含那三个单元格 ，然后在一个单独的样式表中定义样式). 为了舍弃这种做法，我们可以只定义一次，在 `<col>` 元素中。 `<col>` 元素被规定包含在 `<colgroup>` 容器中，而 `<colgroup>` 就在 `<table>` 标签的下方。我们可以通过如下的做法来创建与上面相同的效果:

```
<table>
  <colgroup>
    <col>
    <col style="background-color: yellow">
  </colgroup>
  <tr>
    <th>Data 1</th>
    <th>Data 2</th>
  </tr>
  <tr>
    <td>Calcutta</td>
    <td>Orange</td>
  </tr>
  <tr>
    <td>Robots</td>
    <td>Jazz</td>
  </tr>
</table>
```

我们使用了两个 `<col>` 来定义“列的样式”，每一个 `<col>` 都会制定每列的样式，对于第一列，我们没有采取任何样式，但是我们仍然需要添加一个空的 `<col>` 元素，如果不这样做，那么我们的样式就会应用到第一列上，这和我们预想的不一样。

如果你想把这种样式信息应用到每一列，我们可以只使用一个 `<col>` 元素，不过需要包含 span 属性，像这样：

```
<colgroup>
  <col style="background-color: yellow" span="2">
</colgroup>
```

就像 `colspan` 和 `rowspan` , `span` 需要一个无单位的数字值，用来制定你想要让这个样式应用到表格中多少列

## 使用 `<caption>` 为你的表格增加一个标题

你可以为你的表格增加一个标题，通过 [ `<caption>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/caption) 元素，再把 [ `<caption>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/caption) 元素放入 [ `<table>` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table) 元素中. 你应该把它放在 `<table>` 标签的下面。

```
<table>
  <caption>Dinosaurs in the Jurassic period</caption>

  ...
</table>
```

从上面简单的例子可以推断，标题意味着包含对于表格内容的描述，这对那些希望可以快速浏览网页中的表格对他们是否有帮助的读者们来说，是非常好的功能。特别是盲人用户，不需要让屏幕阅读设备读出很多单元格的内容，来让用户了解这张表格讲的是什么，而是可以依靠标题的内容，来决定是否需要了解更详细的内容。

标题就放在 `<table>` 标签的下面。

 **注意** : 这个 [ `summary` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table%23attr-summary) 属性也可以在 `<table>` 元素中使用，用来提供一段描述，同样可以被屏幕阅读设备阅读。我们推荐使用 `<caption>` 元素来代替使用，因为 `summary` 被 HTML5 规范， [deprecated]( "此页面仍未被本地化, 期待您的翻译!") (废除了)，也不能被视力正常的用户阅读。 (它不会出现在页面上)

* `<thead>` 需要嵌套在 table 元素中，放置在头部的位置，因为它通常代表第一行，第一行中往往都是每列的标题，但是不是每种情况都是这样的。如果你使用了 [`<col>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/col)/[`<colgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/colgroup) 元素，那么 `<thead>`元素就需要放在它们的下面。
* `<tfoot>` 需要嵌套在 table 元素中，放置在底部 (页脚)的位置，一般是最后一行，往往是对前面所有行的总结，比如，你可以按照预想的方式将 `<tfoot>`放在表格的底部，或者就放在 `<thead>` 的下面。(浏览器仍将它呈现在表格的底部)
* `<tbody>` 需要嵌套在 table 元素中，放置在 `<thead>`的下面或者是 `<tfoot>` 的下面，这取决于你如何设计你的结构。(`<tfoot>`放在 `<thead>`下面也可以生效.)

 **注意** : `<tbody>` 总是包含在每个表中，如果你没有在代码中指定它，那就是隐式的。

## 嵌套表格

在一个表格中嵌套另外一个表格是可能的，只要你包含完整的结构，包括 `<table>` 元素。这样通常是不建议的，因为这种做法会使标记看上去很难理解，对使用屏幕阅读的用户来说，可访问性也降低了。以及在很多情况下，也许你只需要插入额外的 单元格/行/列 到已有的表格中。然而有时候是必要的，比如你想要从其他资源中更简单地导入内容。

下面的代码演示了一个简单的嵌套表格:

```
<table id="table1">
  <tr>
    <th>title1</th>
    <th>title2</th>
    <th>title3</th>
  </tr>
  <tr>
    <td id="nested">
      <table id="table2">
        <tr>
          <td>cell1</td>
          <td>cell2</td>
          <td>cell3</td>
        </tr>
      </table>
    </td>
    <td>cell2</td>
    <td>cell3</td>
  </tr>
  <tr>
    <td>cell4</td>
    <td>cell5</td>
    <td>cell6</td>
  </tr>
</table>
```
