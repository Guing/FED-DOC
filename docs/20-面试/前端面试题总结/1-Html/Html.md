## HTML 面试知识点总结

#### DOCTYPE 的作用是什么？

**回答**

* `<!DOCTYPE>`  声明一般位于文档的第一行，它的作用主要是告诉浏览器以什么样的模式来解析文档。

**扩展**

* 一般指定了之后会以标准模式来进行文档解析，否则就以兼容模式进行解析。
* 在 html5 之后不再需要指定 DTD 文档，因为 html5 以前的 html 文档都是基于 SGML 的，所以需要通过指定 DTD 来定义文档中允许的属性以及一些规则。而 html5 不再基于 SGML 了，所以不再需要使用 DTD。

#### 标准模式与兼容模式各有什么区别？

* 在标准模式下，浏览器的解析规则都是按照最新的标准进行解析的。
* 而在兼容模式下，浏览器会以向后兼容的方式来模拟老式浏览器的行为，以保证一些老的网站的正确访问。
* 不同浏览器在兼容模式下的处理也是不同的，所以一定要在html开头使用doctype。

#### HTML5 为什么只需要写 `<!DOCTYPE HTML>` ，而不需要引入 DTD？

* HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 DOCTYPE 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。
* 而 HTML4.01 基于 SGML ，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型。

#### SGML 、 HTML 、XML 和 XHTML 的区别？

* SGML 是标准通用标记语言，是一种定义电子文档结构和描述其内容的国际标准语言，是所有电子文档标记语言的起源。
* HTML 是超文本标记语言，主要是用于规定怎么显示网页。
* XML 是可扩展标记语言是未来网页语言的发展方向，XML 和 HTML 的最大区别就在于 XML 的标签是可以自己创建的，数量无限多，而 HTML 的标签都是固定的而且数量有限。
* XHTML他其实和 HTML 没什么本质的区别，标签都一样，用法也都一样，就是比 HTML 更严格，比如标签必须都用小写，标签都必须有闭合标签等。

![GML、SGML、HTML、XML、XHTML、HTML5 他们是什么意思，他们之间有什么关系？](image/822908546dd24b7ab1ec747053aed08btplv-k3u1fbpfcp-zoom-crop-mark130413041304734.awebp)

  **参考资料**
[GML、SGML、HTML、XML、XHTML、HTML5 之间有什么关系](https://juejin.cn/post/6879954409598664712)

#### DTD 介绍

* DTD（ Document Type Definition 文档类型定义）是一组机器可读的规则，它们定义 XML 或 HTML 的特定版本中所有允许元素及它们的属性和层次关系的定义。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。
* DTD 是对 HTML 文档的声明，还会影响浏览器的渲染模式（工作模式）。

#### HTML5 设计思想

* 兼容已有内容
* 避免不必要的复杂性
* 解决现实的问题
* 优雅降级
* 尊重事实标准
* 用户－>开发者－>浏览器厂商－>标准制定者－>理论完美

**语法**

* 标签不区分大小写，推荐小写
* 空标签可以不闭合，比如 `input / meta`
* 属性不必引号，推荐双引号
* 某些属性值可以省略，比如 `required,readonly`

#### 对 web 标准、可用性、可访问性的理解

* 可用性（Usability）：产品是否容易上手，用户能否完成任务，效率如何，以及这过程中用户的主观感受可好，是从用户的角度来看产品的质量。可用性好意味着产品质量高，是企业的核心竞争力
* 可访问性（Accessibility）：Web 内容对于残障用户的可阅读和可理解性
* 可维护性（Maintainability）：一般包含两个层次，一是当系统出现问题时，快速定位并解决问题的成本，成本低则可维护性好。二是代码是否容易被人理解，是否容易修改和增强功能。

#### HTML5 元素的分类

* 主要有：文档元数据元素，语义化元素，图片和多媒体元素，表格元素，表单元素
* 文档元数据元素：`<head><link><meta><style><title>`
* 语义化元素：`<footer><header><main><section>`
* 图片和多媒体元素：`<img><video><audio>`
* 表格元素：`<table><thead><tr><td>`
* 表单元素：`<form><input><select><button>`

**参考资料**
[HTML 元素参考(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

#### HTML5 有哪些新特性、移除了那些元素？

* HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。
* 新增的有：

  + 绘画 canvas; -
  + 用于媒介回放的 video 和 audio 元素;
  + 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失; sessionStorage 的数据在浏览器关闭后自动删除;
  + 语意化更好的内容元素，比如 article、footer、header、nav、section;
  + 表单控件，calendar、date、time、email、url、search;
  + 新的技术 webworker, websocket;
  + 新的文档属性 document.visibilityState
* 移除的元素有：

  + 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
  + 对可用性产生负面影响的元素：frame，frameset，noframes；

#### HTML5 新增的表单元素有？

* datalist 规定输入域的选项列表，通过 option 创建！
* keygen 提供一种验证用户的可靠方法，密钥对生成器，私钥存于客户端，公钥发到服务器，用于之后验证客户端证书！
* output 元素用于不同类型的输出！

**参考资料**
[HTML5 新元素与废弃元素](https://www.runoob.com/html/html5-new-element.html)

#### 如何处理 HTML5 新标签的浏览器兼容问题？

* IE8/IE7/IE6 支持通过 `document.createElement`方法产生的标签，可以利用这一特性让这些浏览器支持 HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式。
* 当然也可以直接使用成熟的框架，比如 html5shiv ;

```html
  <!--[if lt IE 9]>
    <script> src="https://cdn.jsdelivr.net/npm/html5shiv/dist/html5shiv.min.js</script>
   <![endif]-->
```

`[if lte IE 9]……[endif] ` 判断 IE 的版本，限定只有 IE9 以下浏览器版本需要执行的语句。

#### 简述一下你对 HTML 语义化的理解？

* 用正确的标签做正确的事情。
* html 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
* 即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的;
* 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO ;
* 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

  **参考资源：**
  [《语义化的 HTML 结构到底有什么好处？》](https://www.html.cn/archives/1668)
  [《如何理解 Web 语义化？》](https://www.zhihu.com/question/20455165)
  [《我的 HTML 会说话——从实用出发，谈谈 HTML 的语义化》](https://juejin.im/post/5a9c8866f265da23741072bf#heading-5)

#### b 与 strong 的区别和 i 与 em 的区别？

* 页面显示效果来看，

  + 被 `<b>` 和 `<strong>`包围的文字将会被加粗，而被 `<i>` 和 `<em>` 包围的文字将以斜体的形式呈现。
* 从语义来看：

  + `<b>` `<i>` 是自然样式标签，分别表示无意义的加粗，无意义的斜体，仅仅表示「这里应该用粗体显示」或者「这里应该用斜体显示」，此两个标签在 HTML4.01 中并不被推荐使用。
  + 而 `<em>` 和 `<strong>` 是语义样式标签。 `<em>` 表示一般的强调文本，而 `<strong>` 表示比 `<em>` 语义更强的强调文本。
* 使用阅读设备阅读网页时：

  + `<strong>` 会重读，而 `<b>` 是展示强调内容。

  **参考资源**
  [《HTML5 中的 b/strong，i/em 有什么区别？》](https://www.zhihu.com/question/19551271)

#### title 与 h1 的区别？

* title 属性没有明确意义只表示是个标题
* h1 则表示层次明确的标题，对页面信息的抓取也有很大的影响。

#### `<img>` 的 title 和 alt 有什么区别？

* title 通常当鼠标滑动到元素上的时候显示
* alt 是 `<img>` 的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。可提图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。

#### 行内元素定义

* 一个行内元素只占据它对应标签的边框所包含的空间。
* 常见的行内元素有 a b span img strong sub sup button input label select textarea

#### 块级元素定义

* 块级元素占据其父元素（容器）的整个宽度，因此创建了一个“块”。
* 常见的块级元素有  div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p

#### 行内元素与块级元素的区别？

* 元素被分成两大类：inline （内联元素）与 block （块级元素）。
* 格式上：默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
* 内容上：默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
* 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。

#### 空元素定义

* 标签内没有内容的 HTML 标签被称为空元素。空元素是在开始标签中关闭的。
* 常见的空元素有：`br hr img input link meta`

#### link 标签定义

**回答**

* link即HTML 外部资源链接元素，规定了当前文档与外部资源的关系。
* 它是空元素，仅包含属性，一般存在于 head 部分
* 元素最常用于链接[样式表](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS)，此外也可以被用来创建站点图标

**扩展**

* `rel` 表示 “关系 (relationship) ”，属性值表示 `<link>`项的链接方式与包含它的文档之间的关系。[链接类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)
* `media`，属性表示这种资源将只在满足媒体条件的情况下才被加载进来。例如：`<link href="mobile.css" rel="stylesheet" media="screen and (max-width: 600px)">`
* 将 `rel`设定为 `preload`，表示浏览器应该预加载该资源 `<link rel="preload" href="myFont.woff2" >`

**参考资源**

[link（MDN）](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link)

#### link标签的prefetch和preload的区别

**回答**

* preload主要用于预加载当前页面需要的资源；而prefetch主要用于加载将来页面肯能需要的资源；
* preload 是浏览器一定会加载这些资源，而 prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch。
* 比如在使用vue-cli打包生成的页面中，主要的入口文件的使用了 `preload`，懒加载的组件使用了 `prefetch`

**扩展**

* 相同点：

> Chrome有四种缓存：http cache、memory cache、Service Worker cache和Push cache。在preload或prefetch的资源加载时，两者均存储在http cache。当资源加载完成后，如果资源是可以被缓存的，那么其被存储在http cache中等待后续使用；如果资源不可被缓存，那么其在被使用前均存储在 memory cache。

* preload和prefetch都没有同域名的限制；
* preload主要用于预加载当前页面需要的资源；而prefetch主要用于加载将来页面肯能需 要的资源；
* 不论资源是否可以缓存，prefetch会存储在net-stack cache至少5分钟；
* preload需要使用as属性指定特定的资源类型以便浏览器为其分配一定的优先级，并能够正确加载资源。

**参考资源**

[prefetch和preload的区别](https://zhuanlan.zhihu.com/p/366216268)
[使用 Preload/Prefetch 优化你的应用](https://zhuanlan.zhihu.com/p/48521680)

#### 页面导入样式时，使用 link 和 @import 有什么区别？

* 从属关系区别

  + @import 是 CSS 提供的语法规则，只有导入样式表的作用；
  + link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网站图标等。
* 加载顺序区别。

  + 加载页面时，link 标签引入的 CSS 被同时加载；
  + @import 引入的 CSS 将在页面加载完毕后被加载。
* 兼容性区别。

  + @import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；
  + link 标签作为 HTML 元素，不存在兼容性问题。
* DOM 可控性区别。

  + 可以通过 JS 操作 DOM ，插入 link 标签来改变样式；
  + 由于 DOM 方法是基于文档的，无法使用 @import 的方式插入样式。

#### head 标签中必不少的是？

* 下面这些标签可用在 head 部分：`<base>`, `<link>`, `<meta>`, `<script>`, `<style>`, 以及 `<title>`。
* `title`定义文档的标题，它是 head 部分中唯一必需的元素。

#### 用于预格式化文本的标签是？

* 预格式化就是保留文字在源码中的格式 最后显示出来样式与源码中的样式一致 所见即所得。
* pre定义预格式文本，保持文本原有的格式

#### 常用的 meta 标签

**回答**

* `<meta>` 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词，标签位于文档的头部
* 常用的比如：title，keywords，description，author，viewport

**扩展**

* `<meta charset="utf-8">`    声明文档使用的字符编码
* `<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>`   优先使用IE最新版本和Chrome
* `<meta name="description" content="不超过150个字符"/>`       页面描述
* `<meta name="keywords" content=""/>`      页面关键词
* `<meta name="author" content="name, email@gmail.com"/>`    网页作者
* `<meta name="robots" content="index,follow"/>`      搜索引擎抓取
* `<meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">` 为移动设备添加viewport
* `<meta name="apple-mobile-web-app-title" content="标题">` iOS设备标题
* `<meta name="apple-mobile-web-app-capable" content="yes"/>`  添加到主屏后的标题（iOS 6 新增）
* 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏

  + `<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">`添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
  + `<meta name="apple-mobile-web-app-status-bar-style" content="black"/>`
* `<meta name="format-detection" content="telphone=no, email=no"/>`  设置苹果工具栏颜色
* `<meta name="renderer" content="webkit">`  启用360浏览器的极速模式(webkit)
* `<meta http-equiv="X-UA-Compatible" content="IE=edge">`     避免IE使用兼容模式
* `<meta http-equiv="Cache-Control" content="no-siteapp" />`    不让百度转码
* `<meta name="HandheldFriendly" content="true">`     针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
* `<meta name="MobileOptimized" content="320">`   微软的老式浏览器
* `<meta name="screen-orientation" content="portrait">`   uc强制竖屏
* `<meta name="x5-orientation" content="portrait">`    QQ强制竖屏
* `<meta name="full-screen" content="yes">`              UC强制全屏
* `<meta name="x5-fullscreen" content="true">`       QQ强制全屏
* `<meta name="browsermode" content="application">`   UC应用模式
* `<meta name="x5-page-mode" content="app">`    QQ应用模式
* `<meta name="msapplication-tap-highlight" content="no">`    windows phone 点击无高光
* 设置页面不缓存

  + `<meta http-equiv="pragma" content="no-cache">`
  + `<meta http-equiv="cache-control" content="no-cache">`
  + `<meta http-equiv="expires" content="0">`

  **参考资源**
  [《Meta 标签用法大全》](http://www.cnblogs.com/qiumohanyu/p/5431859.html)

#### HTML5 的 form 的自动完成功能是什么？

* autocomplete 属性规定输入字段是否应该启用自动完成功能。默认为启用，设置为 autocomplete=off 可以关闭该功能。
* 自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。
* autocomplete 属性适用于 `<form>`，以及下面的 `<input>` 类型：text, search, url, telephone, email, password, datepickers, range 以及 color。

#### Input的disabled 和 readonly 的区别？

* disabled 指当 input 元素加载时禁用此元素。input 内容不会随着表单提交。
* readonly 规定输入字段为只读。input 内容会随着表单提交。
* 无论设置 readonly 还是 disabled，通过 js 脚本都能更改 input 的 value

#### Label 的作用是什么？是怎么用的？

* label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```html
    <label for="Name">Number:</label>
    <input type=“text“ name="Name" id="Name" />
```

#### HTML5 的离线储存（Application Cache）怎么使用，工作原理能不能解释一下？

**回答：**

* 首先在文档的html标签中设置manifest 属性，引用manifest文件 。
* 然后配置manifest文件，在manifest 文件中编写离线存储的资源。
* 最后操作window.applicationCache进行需求实现。

**参考资源：**
[《HTML5 离线缓存-manifest 简介》](https://yanhaijing.com/html/2014/12/28/html5-manifest/)
[《有趣的 HTML5：离线存储》](https://segmentfault.com/a/1190000000732617)
#### HTML5 的离线储存（Application Cache）存在的问题

- 缓存问题：
  - 一旦你采用了manifest之后，你将不能清空这些缓存，只能更新缓存，或者得用户自己去清空这些缓存。
  - 一旦更新到错误的页面，将被缓存起来，而无法有机会访问到正确的页面
  - 电信之类的运营商很喜欢在一些流量大的网站进行劫持广告，这样的话，很可能在更新过程将这些广告给缓存起来了
- 更新机制：
  - 如果更新的资源中有一个资源更新失败了，将导致全部更新失败，将用回上一版本的缓存。
  - 在更新新版本过程中，用户需要第一次时访问的还是旧的资源，需要第二次进去才是新的资源。
**参考资源：**
 [为什么app cache没有得到大规模应用？](https://www.zhihu.com/question/29876535)
 [Application Cache 就是个坑](http://zoomzhao.github.io/2012/11/11/application-cache-is-a-douchebag/)
#### 常见的浏览器端的存储技术有哪些？

* 浏览器常见的存储技术有 cookie、localStorage 和 sessionStorage。
* 还有两种存储技术用于大规模数据存储，webSQL（已被废除）和 indexDB。
* IE 支持 userData 存储数据，但是基本很少使用到，除非有很强的浏览器兼容需求。

**参考资源**
   [《很全很全的前端本地存储讲解》](https://segmentfault.com/a/1190000012578794#articleHeader0)

#### 36. 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

**回答**

* 浏览器端常用的存储技术是 cookie 、localStorage 和 sessionStorage。
* cookie 其实最开始是服务器端用于记录用户状态的一种方式，由服务器设置，在客户端存储，然后每次发起同源请求时，发送给服务器端。cookie 最多能存储 4 k 数据，它的生存时间由 expires 属性指定，并且 cookie 只能被同源的页面访问共享。
* sessionStorage 是 html5 提供的一种浏览器本地存储的方法，它借鉴了服务器端 session 的概念，代表的是一次会话中所保存的数据。它一般能够存储 5M 或者更大的数据，它在当前窗口关闭后就失效了，并且 sessionStorage 只能被同一个窗口的同源页面所访问共享。
* localStorage 也是 html5 提供的一种浏览器本地存储的方法，它一般也能够存储 5M 或者更大的数据。它和 sessionStorage 不同的是，除非手动删除它，否则它不会失效，并且 localStorage 也只能被同源页面所访问共享。
* 上面几种方式都是存储少量数据的时候的存储方式，当我们需要在本地存储大量数据的时候，我们可以使用浏览器的 indexDB 这是浏览器提供的一种本地的数据库存储机制。它不是关系型数据库，它内部采用对象仓库的形式存储数据，它更接近 NoSQL 数据库。

**扩展**

* SessionStorage， LocalStorage， Cookie 这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。

  + 区别在于前两者属于 HTML5 WebStorage，创建它们的目的便于客户端存储数据。
  + 而 cookie 是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）。
  + cookie 数据始终在同源（协议、主机、端口相同）的 http 请求中携带（即使不需要），会在浏览器和服务器间来回传递。
* 存储大小：

  + cookie 数据大小不能超过4 k 。
  + sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。
* 有期时间：

  + localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。
  + sessionStorage  数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。
  + cookie          设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。
* 作用域：

  + sessionStorage  只在同源的同窗口（或标签页）中共享数据，也就是只在当前会话中共享。
  + localStorage    在所有同源窗口中都是共享的。
  + cookie          在所有同源窗口中都是共享的。

**参考资源**
   [《请描述一下 cookies，sessionStorage 和 localStorage 的区别？》](https://segmentfault.com/a/1190000017423117)
   [《浏览器数据库 IndexedDB 入门教程》](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)


### 浏览器的localStorage/sessionStorage的大小

* 大部分浏览器差不多是5M，个别浏览器可能有所差别
* 具体可以通过写测试工具测试一下。


**参考资料**
[浏览器的localStorage/sessionStorage的大小](https://juejin.cn/post/6933389518997291015)

### 获得浏览器localStorage的最大容量

localStorage 中存储的是字符串，根据这一条件，我们可以通过写入字符串，而其长度就是大小。

```javascript
 (function() {
     if (!window.localStorage) {
         console.log('当前浏览器不支持localStorage!')
     }
     var test = '0123456789';
     var add = function(num) {
         num += num;
         if (num.length == 10240) {
             test = num;
             return;
         }
         add(num);
     }
     add(test);
     var sum = test;
     var show = setInterval(function() {
         sum += test;
         try {
             window.localStorage.removeItem('test');
             window.localStorage.setItem('test', sum);
             console.log(sum.length / 1024 + 'KB');
         } catch (e) {
             console.log(sum.length / 1024 + 'KB超出最大限制');
             clearInterval(show);
         }
     }, 0.1)
 })()
```

### 获得浏览器localStorage的已用容量的大小

* 要注意已存储的字符串编码
* JavaScript中的字符串是 UTF-16，因此每个字符需要两个字节。

```javascript
(function() {
    if (!window.localStorage) {
        console.log('浏览器不支持localStorage');
    }
    var size = 0;

    function sizeof(str) {
        var total = 0;
        var i, len;
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.codePointAt(i);

            if (charCode <= 0xffff) {
                total += 2;
            } else {
                total += 4;
            }
        }
        return total;
    }
    for (item in window.localStorage) {
        if (window.localStorage.hasOwnProperty(item)) {
            size += sizeof(window.localStorage.getItem(item));
        }
    }
    console.log('当前localStorage已用容量为' + (size / 1024).toFixed(2) + 'KB');
})()
```

**参考资料**
[web storage大小测试工具](http://dev-test.nemikor.com/web-storage/support-test/)
[用JS计算字符所占字节数](https://gist.github.com/nuintun/9955353)



#### iframe 有那些缺点？

* iframe 会阻塞主页面的 onload 事件。window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 src 可以避免这种阻塞情况。
* 搜索引擎的检索程序无法解读这种页面，不利于网页的 SEO 。
* iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
* 浏览器的后退按钮失效。
* 小型的移动设备无法完全显示框架。

  **参考资源**
  [《使用 iframe 的优缺点》](https://blog.csdn.net/yintianqin/article/details/72625785)
  [《iframe 简单探索以及 iframe 跨域处理》](https://segmentfault.com/a/1190000009891683)

#### 页面可见性（Page Visibility API） 可以有哪些用途？

* 这个新的 API 的意义在于，通过监听网页的可见性，可以预判网页的卸载，还可以用来节省资源，减缓电能的消耗。
* 比如，一旦用户不看网页，下面这些网页行为都是可以暂停的。

  - 对服务器的轮询
  - 网页动画
  - 正在播放的音频或视频

  **参考资源**
  [《Page Visibility API 教程》](http://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html)

#### Html 规范中为什么要求引用资源不加协议头 `http` 或者 `https` ？

* 如果用户当前访问的页面是通过 HTTPS 协议来浏览的，那么网页中的资源也只能通过 HTTPS 协议来引用，否则浏览器会出现警告信息，不同浏览器警告信息展现形式不同。
* 为了解决这个问题，我们可以省略 URL 的协议声明，省略后浏览器照样可以正常引用相应的资源，这项解决方案称为protocol-relative URL，暂且可译作协议相对 URL。
* 如果使用协议相对 URL，无论是使用 HTTPS，还是 HTTP 访问页面，浏览器都会以相同的协议请求页面中的资源，避免弹出类似的警告信息，同时还可以节省5字节的数据量。

 **参考资源**
   [《协议相对 URL》](https://www.ludou.org/the-protocol-relative-url.html)
   [《Why you need protocol-relative URLs *now*》](https://www.tuicool.com/articles/nEjU7b)

#### 在 HTML5 中，哪个方法用于获得用户的当前位置？

```javascript
   //检测是否支持地理定位
   //如果支持，则运行 getCurrentPosition() 方法。如果不支持，则向用户显示一段消息。
   //如果getCurrentPosition()运行成功，则向参数showPosition中规定的函数返回一个coordinates对象
   function getLocation() {
       if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(showPosition);
       } else {
           console.log("Geolocation is not supported by this browser.");
       }
   }
   //showPosition() 函数获得并显示经度和纬度 */
   function showPosition(position) {
       x.innerHTML = "Latitude: " + position.coords.latitude +
           "<br />Longitude: " + position.coords.longitude;
   }
```

#### Canvas 和 SVG 有什么区别？

* Canvas 是一种通过 JavaScript 来绘制 2D 图形的方法。Canvas 是逐像素来进行渲染的，因此当我们对 Canvas 进行缩放时，会出现锯齿或者失真的情况。
* SVG 是一种使用 XML 描述 2D 图形的语言。SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。我们可以为某个元素附加 JavaScript 事件监听函数。并且 SVG 保存的是图形的绘制方法，因此当 SVG 图形缩放时并不会失真。

**参考资源**
[《SVG 与 HTML5 的 canvas 各有什么优点，哪个更有前途？》](https://www.zhihu.com/question/19690014)
