## JavaScript的DOM操作

### 认识DOM和BOM

* DOM:文档对象模型(Document Object Model)
  * 简称 DOM，将页面所有的内容表示为可以修改的对象;
* BOM:浏览器对象模型(Browser Object Model)
  * 简称 BOM，由浏览器提供的用于处理文档(document)之外的所有内容的其他对象;  
  * 比如navigator、location、history等对象;

![截屏2023-06-30 15.00.11](image/05-JavaScript%E7%9A%84DOM%E5%AF%B9%E8%B1%A1/%E6%88%AA%E5%B1%8F2023-06-30%2015.00.11.png)

#### 深入理解DOM

* 浏览器将我们编写在HTML中的每一个元素(Element)都抽象成了一个个对象;
* 有这些对象都可以通过JavaScript来对其进行访问，那么我们就可以通过JavaScript来操作页面;
* 所以，我们将这个抽象过程称之为 文档对象模型(Document Object Model);
* 整个文档被抽象到 document 对象中:
  * 比如document.documentElement对应的是html元素;
  * 比如document.body对应的是body元素;
  * 比如document.head对应的是head元素;

#### DOM Tree的理解

* 在html结构中，最终会形成一个树结构;
* 在抽象成DOM对象的时候，它们也会形成一个树结构，我们称之为DOM Tree;

![截屏2023-06-30 15.02.39](image/05-JavaScript%E7%9A%84DOM%E5%AF%B9%E8%B1%A1/%E6%88%AA%E5%B1%8F2023-06-30%2015.02.39.png)

![截屏2023-06-30 15.02.50](image/05-JavaScript%E7%9A%84DOM%E5%AF%B9%E8%B1%A1/%E6%88%AA%E5%B1%8F2023-06-30%2015.02.50.png)

### DOM的学习顺序

 DOM相关的API非常多，我们会通过如下顺序来学习:

1.DOM元素之间的关系
2.获取DOM元素
3.DOM节点的type、tag、content
4.DOM节点的attributes、properies
5.DOM节点的创建、插入、克隆、删除
6.DOM节点的样式、类
7.DOM元素/window的大小、滚动、坐标

### DOM的继承关系图

* Node与Element不一样，Node包含Element，Node下有Element,CharacterData等
* 所以Node节点下面分为
  * Element(元素)->HTMLElement,
  * CharacterData(字符数据)->Text,Comment.

![截屏2023-06-30 15.04.40](image/05-JavaScript%E7%9A%84DOM%E5%AF%B9%E8%B1%A1/%E6%88%AA%E5%B1%8F2023-06-30%2015.04.40.png)

### document对象

* Document节点表示的整个载入的网页，它的实例是全局的document对象:
* 对DOM的所有操作都是从 document 对象开始的;
* 它是DOM的 入口点，可以从document开始去访问任何节点元素;
* 对于最顶层的html、head、body元素，我们可以直接在document对象中获取到:
  * html元素:`<html>` = document.documentElement
  * body元素:`<body>` = document.body
  * head元素:`<head>` = document.head
  * 文档声明:`<!DOCTYPE html>` = document.doctype

```js
 var htmlEl = document.documentElement
    var bodyEl = document.body
    var headEl = document.head
    var doctype = document.doctype
    console.log(htmlEl, bodyEl, headEl, doctype)
```

### Node节点导航

* 如果我们获取到一个节点(Node)后，可以根据这个节点去获取其他的节点，我们称之为节点之间的导航。
* 因为是节点方法，所以包含所有的元素，文本，注释，换行等等。

* 节点之间存在如下的关系:
  * 父节点:parentNode
  * 前兄弟节点:previousSibling
  * 后兄弟节点:nextSibling
  * 所有子节点:childNodes
  * 第一个子节点:firstChild
  * 第二个子节点:lastChild

```html
<body>
  
  <!-- 我是注释, 哈哈哈 -->
  我是文本, 呵呵呵

  <div class="box">哈哈哈哈哈</div>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
  <script>

    // 1.获取节点的导航
    var bodyEl = document.body
    // 1.1.获取body所有的子节点
    console.log(bodyEl.childNodes) //[text, comment, text, div.box, text, ul, text, script]，注释前面有一个换行符，也是一个文本节点



    // 1.2.获取body的第一个子节点
    var bodyElFirstChild = bodyEl.firstChild
   console.log(bodyElFirstChild); //#text


    // 1.3.获取body中的注释
    var bodyElCommentChild = bodyElFirstChild.nextSibling
    console.log(bodyElCommentChild) // <!-- 我是注释, 哈哈哈 -->

    // 1.4.获取body的父节点
    var bodyParent = bodyEl.parentNode
    console.log(bodyParent) //html节点

  </script>

</body>
```

### Element元素导航

* 如果我们获取到一个元素(Element)后，可以根据这个元素去获取其他的元素，我们称之为元素之间的导航。
* 因为是元素方法，所有只操作元素。文本，注释等则会忽略。

* 元素之间存在如下的关系:
  * 父元素:parentElement
  * 前兄弟元素:previousElementSibling
  * 后兄弟元素:nextElementSibling
  * 所有子元素:children
  * 第一个子元素:firstElementChild
  * 第二个子元素:lastElementChild

```html
<body>
  
  <!-- 我是注释, 哈哈哈 -->
  我是文本, 呵呵呵

  <div class="box">哈哈哈哈哈</div>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
  
  <script>
    var bodyEl = document.body
    // 根据body元素去获取子元素(element)
    var childElements = bodyEl.children
    console.log(childElements)

    // 获取box元素
    var boxEl1 = bodyEl.firstElementChild
    var boxEl2 = bodyEl.children[0]
    console.log(boxEl1, boxEl2, boxEl1 === boxEl2)

    // 获取ul元素
    var ulEl = boxEl1.nextElementSibling
    console.log(ulEl)

    // 获取li元素
    var liEls = ulEl.children
    console.log(liEls)

  </script>

</body>
```

### 1.4. table、form导航

* `<table>` 元素支持 (除了上面给出的，之外) 以下这些属性:
  * table.rows — `<tr>` 元素的集合;
  * table.caption/tHead/tFoot — 引用元素 `<caption>`，`<thead>`，`<tfoot>`;
  * table.tBodies — `<tbody>` 元素的集合;

* `<thead>`，`<tfoot>`，`<tbody>` 元素提供了 rows 属性:
  * tbody.rows — 表格内部 `<tr>` 元素的集合;

* `<tr>`:
  * tr.cells — 在给定 `<tr>` 中的 `<td>` 和 `<th>` 单元格的集合;
  * tr.sectionRowIndex — 给定的 `<tr>` 在封闭的 `<thead>`/`<tbody>`/`<tfoot>` 中的位置(索引);
  * tr.rowIndex — 在整个表格中 `<tr>` 的编号(包括表格的所有行);

* `<td>` 和 `<th>`:
  * td.cellIndex — 在封闭的 `<tr>` 中单元格的编号。

```html
<body>
  
  <!-- 高级元素: table/form -->
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>身高</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>why</td>
        <td>18</td>
        <td>1.88</td>
      </tr>
      <tr>
        <td>kobe</td>
        <td>30</td>
        <td>1.98</td>
      </tr>
    </tbody>
  </table>

  <script>

    var tableEl = document.body.firstElementChild

    // 通过table元素获取内部的后代元素
    console.log(tableEl.tHead, tableEl.tBodies, tableEl.tFoot)
    console.log(tableEl.rows)

    // 拿到一行元素
    var rowEl = tableEl.rows[2]
    console.log(rowEl.cells[0])
    console.log(rowEl.sectionRowIndex)
    console.log(rowEl.rowIndex)

  </script>

</body>
```

* `<form>` 元素可以直接通过document来获取:document.forms
* `<form>` 元素中的内容可以通过elements来获取:form.elements  
* 我们可以设置表单子元素的name来获取它们

```html
<body>

  <form action="">
    <input name="account" type="text">
    <input name="password" type="password">
    <input name="hobbies" type="checkbox" checked>
    <select name="fruits">
      <option value="apple">苹果</option>
      <option value="orange">橘子</option>
    </select>
  </form>
  
  <script>

    // 1.获取form
    // var formEl = document.body.firstElementChild
    var formEl = document.forms[0]

    // 2.获取form中的子元素
    var inputEl = formEl.elements.account
    setTimeout(function() {
      console.log(inputEl.value)
    }, 5000)

  </script>

</body>
```

### 1.5. 获取任意元素方法

* document.getElementsByClassName
* document.getElementById
* document.querySelector()
* document.querySelectorAll()

```html
<body>
  <div class="box">
    <h2>我是标题</h2>
    <div class="container">
      <p>
        我是段落, <span class="keyword">coderwhy</span> 哈哈哈哈
      </p>
      <p>
        我也是段落, <span class="keyword">kobe</span> 呵呵呵呵额
      </p>

      <div class="article">
        <h3 id="title">我是小标题</h3>
        <p>
          我是文章的内容, 嘿嘿嘿嘿嘿
        </p>
      </div>
    </div>
  </div>
  
  <script>

    // 一. 通过导航获取
    // // 1.拿到body
    var bodyEl = document.body

    // // 2.拿到box
    var boxEl = bodyEl.firstElementChild

    // // 3.拿container
    var containerEl = boxEl.children[1]

    // // 4.拿p
    var pEl = containerEl.children[0]

    // // 5.拿到keyword
    var spanEl = pEl.children[0]
    spanEl.style.color = "red"

    // 二. getElementBy*
    // 1.通过className获取元素
    var keywordEls = document.getElementsByClassName("keyword")
    // 修改第一个
    // keywordEls[0].style.color = "red"
    // 修改所有的
    for (var i = 0; i < keywordEls.length; i++) {
      keywordEls[i].style.color = "red"
    }

    // 2. 通过id获取元素
    var titleEl = document.getElementById("title")
    titleEl.style.color = "orange"


    // 三.querySelector: 通过选择器查询
    var keywordEl = document.querySelector(".keyword")
    // keywordEls是对象, 可迭代的
    // 可迭代对象: String/数组/节点的列表
    var keywordEls = document.querySelectorAll(".keyword")
    for (var el of keywordEls) {
      el.style.color = "red"
    }
    console.log(keywordEls)

    var titleEl = document.querySelector("#title")
    titleEl.style.color = "orange"

  </script>

</body>
```

![截屏2023-06-30 15.10.48](image/05-JavaScript%E7%9A%84DOM%E5%AF%B9%E8%B1%A1/%E6%88%AA%E5%B1%8F2023-06-30%2015.10.48.png)

* 开发中如何选择呢?
  * 目前最常用的是querySelector和querySelectAll;
  * getElementById偶尔也会使用或者在适配一些低版本浏览器时;

### 1.6. Node节点常见的属性

* nodeType属性提供了一种获取节点类型的方法;
* 它有一个数值型值(numeric value);

![截屏2023-06-30 15.12.21](image/05-JavaScript%E7%9A%84DOM%E5%AF%B9%E8%B1%A1/%E6%88%AA%E5%B1%8F2023-06-30%2015.12.21.png)

 其他类型可以查看MDN文档: <https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType>

* nodeName/tagName
  * nodeName:获取node节点的名字;
  * tagName:获取元素的标签名词;

* tagName 和 nodeName 之间有什么不同呢?
  * tagName 属性仅适用于 Element 节点;
  * nodeName 是为任意 Node 定义的:
    * 对于元素，它的意义与 tagName 相同，所以使用哪一个都是可以的;
    * 对于其他节点类型(text，comment 等)，它拥有一个对应节点类型的字符串;

* innerHTML/outerHTML/textContent
* innerHTML 属性
  * 将元素中的 HTML 获取为字符串形式;  
  * 设置元素中的内容;

* outerHTML 属性 包含了元素的完整 HTML
  * innerHTML 加上元素本身一样;

* textContent 属性
  * 仅仅获取元素中的文本内容;

* innerHTML和textContent的区别:
  * 使用 innerHTML，我们将其“作为 HTML”插入，带有所有 HTML 标签。
  * 使用 textContent，我们将其“作为文本”插入，所有符号(symbol)均按字面意义处理。

* nodeValue/data
  * 用于获取非元素节点的文本内容

```html
<body>
  <!-- 我是注释 -->
  我是文本
  <div class="box">
    <h2>我是标题</h2>
    <p>我是内容, 哈哈哈哈</p>
  </div>
  
  <script>
    // 1.获取三个节点
    var bodyChildNodes = document.body.childNodes
    var commentNode = bodyChildNodes[1]
    var textNode = bodyChildNodes[2]
    var divNode = bodyChildNodes[3]

    // 2.节点属性
    // 2.1.nodeType 节点的类型
    for (var node of bodyChildNodes) {
      if (node.nodeType === 8) {
      } else if (node.nodeType === 3) {
      } else if (node.nodeType === 1) {
      }
    }
    console.log(commentNode.nodeType, textNode.nodeType, divNode.nodeType) // 8 3 1
    console.log(Node.COMMENT_NODE)

    // 2.2.nodeName 节点的名称
    // tagName: 针对元素(element)
    console.log(commentNode.nodeName, textNode.nodeName, divNode.nodeName)
    console.log(commentNode.tagName, divNode.tagName)

    // 2.3. data(nodeValue)/innerHTML/textContent
    // data针对非元素的节点获取数据
    // innerHTML: 对应的html元素也会获取
    // textContent: 只会获取文本内容
    console.log(commentNode.data, textNode.data, divNode.data)
    console.log(divNode.innerHTML)
    console.log(divNode.textContent)

    // 设置文本, 作用是一样
    // 设置文本中包含元素内容, 那么innerHTML浏览器会解析, textContent会当成文本的一部分
    // divNode.innerHTML = "<h2>呵呵呵呵</h2>"
    // divNode.textContent = "<h2>嘿嘿嘿嘿</h2>"

    // 2.4.outerHTML
    console.log(divNode.outerHTML)

  </script>

</body>
```

### 1.7. 全局属性-hidden

hidden属性:也是一个全局属性，可以用于设置元素隐藏。

## 二. JavaScript的DOM操作（二）

### 2.1. attribute分类

* 什么是attribute？
  * 一个元素除了有开始标签、结束标签、内容之外，还有很多的属性(attribute)

* 分类：
  * 标准的attribute
    * 某些attribute属性是标准的，比如id、class、href、type、value等;
  * 非标准的attribute
    * 某些attribute属性是自定义的，比如abc、age、height等;

```html
<body>
  <!-- 属性: attribute(特性) -->
  <!-- 
    attribute的分类:
      1.如果是HTML标准制定的attribute, 称之为标准Attribute
      2.而自定义的Attribute, 称之为非标准Attribute
   -->
  <div id="abc" class="box" title="box"
       age="18" height="1.88">
    我是box
  </div>
</body>
```

### 2.3. 所有attribute操作

* elem.hasAttribute(name) — 检查特性是否存在。
* elem.getAttribute(name) — 获取这个特性值。
* elem.setAttribute(name, value) — 设置这个特性值。
* elem.removeAttribute(name) — 移除这个特性。
* attributes:attr对象的集合，具有name、value属性;

* attribute具备以下特征:
  * 它们的名字是大小写不敏感的(id 与 ID 相同)。
  * 它们的值总是字符串类型的。

```html
<body>
  
  <div id="abc" class="box" title="box"
       age="18" height="1.88">
    我是box
  </div>

  <input class="checkbox1"  type="checkbox" checked="checked">

  <input class="checkbox2"  type="checkbox" checked>
  <script>

    var boxEl = document.querySelector(".box")

    // 1.所有的attribute都支持的操作
    console.log(boxEl.hasAttribute("AGE"), boxEl.hasAttribute("abc"), boxEl.hasAttribute("id"))
    console.log(boxEl.getAttribute("AGE"), boxEl.getAttribute("abc"), boxEl.getAttribute("id"))

    boxEl.setAttribute("id", "cba")
    boxEl.removeAttribute("id")

    var boxAttributes = boxEl.attributes
    for (var attr of boxAttributes) {
      console.log(attr.name, attr.value)
    }

    // 2.通过getAttribute()一定是字符串类型
    var inputEl = document.querySelector(".checkbox1")
    console.log(inputEl.getAttribute("checked")) //checked

    //3.如果是单个checked这种写法，则获取的是“”字符串，与实际想获取的不符合。
     var inputEl = document.querySelector(".checkbox2")
    console.log(inputEl.getAttribute("checked"))
    
  </script>

</body>
```

### 2.4. property操作

* 什么叫property
  * 对象中的属性称之为property
  
* 标准的attribute会转成对象模型中的property

* 在大多数情况下，它们是相互作用的
  * 改变property，通过attribute获取的值，会随着改变;
  * 通过attribute操作修改，property的值会随着改变;

* 但是在特殊情况下，可能会有所区别。
  * 同时使用 input.value = "abc" 和 input.setAttribute('value', 'def')，则 input.value 的赋值会覆盖 setAttribute() 方法中设置的值。

* 除非特别情况，大多数情况下，设置、获取attribute，推荐使用property的方式:  
  * 这是因为它默认情况下是有类型的;

```html
<body>
  
  <div id="abc" class="box" title="标题"
       age="18" height="1.88">
    我是box
  </div>

  <input type="checkbox" checked>

  账号: <input class="account" type="text">
  <button class="btn">设置input的值</button>

  <script>

    // 1.通过property获取attribute的值
    // 获取box元素,标准的attribute在对应的对象模型中都有对应的property,非标准的没有
    var boxEl = document.querySelector(".box")
    console.log(boxEl.id, boxEl.title, boxEl.age, boxEl.height)

    // 2.通过property获取，会有类型，不像attribute全是字符串。
    var inputEl = document.querySelector("input")
    if (inputEl.checked) {
      console.log("checkbox处于选中状态")
    }
    console.log(typeof inputEl.checked)
    
    // 3.attribute和property是相互影响的
    boxEl.id = "aaaaa"
    console.log(boxEl.getAttribute("id"))

    boxEl.setAttribute("title", "哈哈哈")
    console.log(boxEl.title)

    // 3.比较特殊的情况, input设置值(了解)
    var accountInputEl = document.querySelector(".account")
    var btnEl = document.querySelector(".btn")
    btnEl.onclick = function() {
       
      accountInputEl.value = "coderwhy"// 优先级更高
      accountInputEl.setAttribute("value", "kobe")

    }

  </script>

</body>
```

### 2.5. JavaScript动态修改样式

#### 2.5.1. class和style用法区别

 有时候我们会通过JavaScript来动态修改样式，这个时候我们有两个选择:  

选择一:在CSS中编写好对应的样式，动态的添加class;
  选择二:动态的修改style属性;

#### 2.5.2. className、classList

* 元素的class attribute，对应的property并非叫class，而是className:
  * 这是因为JavaScript早期是不允许使用class这种关键字来作为对象的属性，所以DOM规范使用了className;  
  * 虽然现在JavaScript已经没有这样的限制，但是并不推荐，并且依然在使用className这个名称;

* 我们可以对className进行赋值，它会替换整个类中的字符串。
* 如果我们需要添加或者移除单个的class，那么可以使用classList属性。

* elem.classList 是一个特殊的对象:
  * elem.classList.add (class) :添加一个类
  * elem.classList.remove(class):添加/移除类。
  * elem.classList.toggle(class) :如果类不存在就添加类，存在就移除它。
  * elem.classList.contains(class):检查给定类，返回 true/false。

* classList是可迭代对象，可以通过for of进行遍历。

```html
<body>
  
  <div class="box">
    我是box
  </div>
  <button class="btn">切换</button>

  <script>

    var boxEl = document.querySelector(".box")

    // 1.方法一: className
    boxEl.className = "abc"

    // 2.方法二: classList操作class
    boxEl.classList.add("abc")
    boxEl.classList.add("active")
    boxEl.classList.remove("abc")

    // 需求: box在active之间切换
    var btnEl = document.querySelector(".btn")
    btnEl.onclick = function() {
      // if (boxEl.classList.contains("active")) {
      //   boxEl.classList.remove("active")
      // } else {
      //   boxEl.classList.add("active")
      // }
      boxEl.classList.toggle("active")
    }

  </script>

</body>
```

#### 2.5.3. style的用法

* 如果需要单独修改某一个CSS属性，那么可以通过style来操作:
* 对于多词(multi-word)属性，使用驼峰式 camelCase
* 如果我们将值设置为空字符串，那么会使用CSS的默认样式:
* 多个样式的写法，我们需要使用cssText属性:  
  * 不推荐这种用法，因为它会替换整个字符串;

```html
<body>
  
  <div class="box" style="background-color: aqua; color: white;">
    我是box
  </div>

  <script>
    var boxEl = document.querySelector(".box")

    // 1.在property中使用的驼峰格式
    console.log(boxEl.style.backgroundColor)

    // 2.如果将一个属性的值, 设置为空的字符串, 那么是使用默认值
    boxEl.style.display = ""
    boxEl.style.fontSize = ""

    // 3.设置多个样式
    // boxEl.style.fontSize = "30px"
    // boxEl.style.color = "red"
    boxEl.style.cssText = "font-size: 30px; color: red;"

  </script>

</body>
```

#### 2.5.4. getComputedStyle方法

* 如果我们需要读取样式:
  * 对于内联样式，是可以通过style.*的方式读取到的;  
  * 对于style、css文件中的样式，是读取不到的;
  * 这个时候，我们可以通过getComputedStyle的全局函数来实现:

```html
  <style>
    .box {
      font-size: 20px;
    }
  </style>

<body>

  <div class="box" style="background-color: red;">
    我是box
  </div>
  
  <script>

    var boxEl = document.querySelector(".box")
    console.log(boxEl.style.backgroundColor)
    console.log(boxEl.style.fontSize) //获取不到

    console.log(getComputedStyle(boxEl).fontSize)

  </script>

</body>
```

#### 2.5.5 dataset获取自定义属性

```html
<body>
  
  <div id="abc" class="box" 
       data-age="18" data-height="1.88"></div>

  <script>
    var boxEl = document.querySelector(".box")
    // 小程序开发中使用
    console.log(boxEl.dataset.age)
    console.log(boxEl.dataset.height)
  </script>

</body>
```

### 元素操作

#### 创建元素

* 想要插入一个元素，通常会按照如下步骤:  
  * 步骤一:创建一个元素;
  * 步骤二:插入元素到DOM的某一个位置;
* document.createElement()

### 插入元素

* node.append(...nodes or strings) —— 在 node 末尾 插入节点或字符串，
* node.prepend(...nodes or strings) —— 在 node 开头 插入节点或字符串，
* node.before(...nodes or strings) —— 在 node 前面 插入节点或字符串，
* node.after(...nodes or strings) —— 在 node 后面 插入节点或字符串，
* node.replaceWith(...nodes or strings) —— 将 node 替换为给定的节点或字符串。

```html
<body>

  <span>111111</span>

  <div class="box">
    <span class="box-first">呵呵呵呵</span>
    <p>哈哈哈哈哈</p>
  </div>
  
  <script>
    var boxEl = document.querySelector(".box")

    // 2.真实创建一个DOM对象
    var h2El = document.createElement("h2")

    // 将元素插入boxEl
    boxEl.append(h2El)
    boxEl.prepend(h2El)
    boxEl.after(h2El)
    boxEl.before(h2El)
    boxEl.replaceWith(h2El, "abc")

    // 插入到span和p元素之间
    var spanEl = document.querySelector("span")
    var spanEl = boxEl.children[0]
    var spanEl = boxEl.querySelector("span")

    spanEl.after(h2El)

  </script>

</body>
```

![截屏2023-06-30 15.45.46](image/05-JavaScript%E7%9A%84DOM%E5%AF%B9%E8%B1%A1/%E6%88%AA%E5%B1%8F2023-06-30%2015.45.46.png)

#### 移除和克隆元素

* remove:移除元素:
* cloneNode:复制一个现有的元素:
  * 可以传入一个Boolean类型的值，来决定是否是深度克隆;
  * 深度克隆会克隆对应元素的子元素，否则不会;

```html
<body>
  
  <button class="remove-btn">移除box</button>
  <button class="clone-btn">复制box</button>

  <div class="box">
    <h2>我是标题</h2>
    <p>我是文本, 哈哈哈哈哈</p>
  </div>

  <script>

    // 1.获取元素
    var boxEl = document.querySelector(".box")
    var removeBtnEl = document.querySelector(".remove-btn")
    var cloneBtnEl = document.querySelector(".clone-btn")

    // 2.监听removeBtn的点击
    removeBtnEl.onclick = function() {
      boxEl.remove()
    }

    // 3.复制box
    var counter = 0
    cloneBtnEl.onclick = function() {
      var newNode = boxEl.cloneNode(true)
      newNode.children[0].textContent = "我是标题" + counter
      // boxEl.after(newNode)
      document.body.append(newNode)

      counter++
    }

  </script>

</body>
```

#### 旧的元素操作方法

* 在很多地方我们也会看到一些旧的操作方法:
* parentElem.appendChild(node):
  * 在parentElem的父元素最后位置添加一个子元素
* parentElem.insertBefore(node, nextSibling):
  * 在parentElem的nextSibling前面插入一个子元素;
* parentElem.replaceChild(node, oldChild):
  * 在parentElem中，新元素替换之前的oldChild元素;
* parentElem.removeChild(node):
  * 在parentElem中，移除某一个元素;

#### 元素的大小、滚动

* clientWidth
  * contentWith+padding(不包含滚动条)
* clientHeight
  * contentHeight+padding
* clientTop
  * border-top，上边框的宽度
* clientLeft
  * border-left，左边框的宽度

* offsetWidth
  * 元素完整的宽度,内容+内边距+滚动条+边框
* offsetHeight
  * 元素完整的高度,内容+内边距+滚动条+边框

* offsetLeft
  * 距离父元素的x，包括父元素的margin
* offsetHeight
  * 距离父元素的y，包括父元素的margin

* scrollHeight
  * 整个可滚动的区域高度
* scrollTop
  * 滚动部分的高度

![截屏2023-06-30 15.48.34](image/05-JavaScript%E7%9A%84DOM%E5%AF%B9%E8%B1%A1/%E6%88%AA%E5%B1%8F2023-06-30%2015.48.34.png)

```html
<body>
    <style>
    body {
      padding: 100px;
    }

    .box {
      width: 100px;
      height: 100px;
      padding: 20px;
      border: 10px solid red;
      /* box-sizing: border-box; */
      background-color: orange;

      overflow: auto;
    }
  </style>
  <div class="box">
    你去过国内最美的地方是哪# 我去过国内最美的地方是新疆喀纳斯。喀纳斯是一个美丽而神秘的地方，这里群山环抱，森林密布，湖水清澈，风景奇特。为国家级5A级景区，国家地质公园，国家森林公园。
  </div>

  <script>

    var boxEl = document.querySelector(".box")

    // 1.获取样式(局限性很强)
    // var boxStyle = getComputedStyle(boxEl)
    // console.log(boxStyle.width, boxStyle.height)

    // 2.获取更多信息
    console.log(boxEl.clientWidth)
    console.log(boxEl.clientHeight)

    console.log(boxEl.clientLeft)
    console.log(boxEl.clientTop)

    console.log(boxEl.offsetWidth)
    console.log(boxEl.offsetHeight)

    console.log(boxEl.offsetLeft)
    console.log(boxEl.offsetTop)

    console.log(boxEl.scrollHeight)
    console.log(boxEl.scrollTop)

    // window对象
    window.onclick = function() {
      console.log(boxEl.scrollTop)
    }

  </script>

</body>
```

#### window的大小、滚动

* window的width和height
  * innerWidth、innerHeight:获取window窗口的宽度和高度(包含滚动条)
  * outerWidth、outerHeight:获取window窗口的整个宽度和高度(包括调试工具、工具栏)
  * documentElement.clientHeight、documentElement.clientWidth:获取html的宽度和高度(不包含滚动条)

* window的滚动位置:
  * scrollX:X轴滚动的位置(别名pageXOffset)  
  * scrollY:Y轴滚动的位置(别名pageYOffset)

* 也有提供对应的滚动方法:
  * 方法 scrollBy(x,y) :将页面滚动至 相对于当前位置的 (x, y) 位置;
    * 在原有的位置再累加滚动x或y，再次点击就再次累加
  * 方法 scrollTo(pageX,pageY) 将页面滚动至 绝对坐标;
    * 滚动到x或y的位置，已经到达位置，所以再次点击也不会变。

```html
 <style>
    .box {
      /* width: 2000px; */
      height: 100px;
      background-color: orange;
    }

    .scroll-btn {
      position: fixed;
      right: 20px;
      bottom: 20px;
      /* display: none; */
    }
  </style>
<body>

  <div class="box"></div>
  <button class="scroll-btn">回到顶部</button>

  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  <script>
    // window大小
    console.log(window.outerWidth)
    console.log(window.outerHeight)

    console.log(window.innerWidth)
    console.log(window.innerHeight)

    console.log(document.documentElement.offsetWidth)
    console.log(document.documentElement.offsetHeight)

    // 获取window的滚动区域
    window.onclick = function() {
      console.log(window.scrollX)
      console.log(window.scrollY)
    }

    var scrollBtnEl = document.querySelector(".scroll-btn")
    scrollBtnEl.hidden = true
    window.onscroll = function() {
      var scrollY = window.scrollY
      if (scrollY > 600) {
        // scrollBtnEl.style.display = "block"
        scrollBtnEl.hidden = false
      } else {
        // scrollBtnEl.style.display = "none"
        scrollBtnEl.hidden = true
      }
    }

    // 点击按钮后滚动到某个位置
    scrollBtnEl.onclick = function() {
      // window.scrollBy(0, 100)
      window.scrollTo(0, 0)
    }

  </script>

</body>
```
