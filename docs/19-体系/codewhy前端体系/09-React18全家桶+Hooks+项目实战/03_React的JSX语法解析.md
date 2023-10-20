## 总结

### 1.1. React基本介绍

* 官方React定义
* Vue/React/Angular市场占率
  * Google指数
  * npm下载指数
  * GitHub star
  * HackerRank

* React的重要性

### 1.2. 如何系统的学习React

* 官方文档
* 看书学习
* 开源项目
* 当前课程

### 2.1. React介绍以及特点

* 声明式编程
* 组件化开发
* 一次学习, 多平台适配

### 2.2. Hello React

#### 2.2.1. React有三个依赖

* React
* React-DOM
* Babel

#### 2.2.2. 通过普通的方式实现案例

* 没有封装组件, 直接默认逻辑实现案例

#### 2.2.3. 通过封装App组件实现案例

```jsx
class App extends React.Component {}
```

#### 2.2.4. 数组放到哪里: constructor

* this.state = {}

#### 2.2.5. 绑定方法: this绑定

### 2.3. 案例二: 电影列表渲染

### 2.4. 案例三: 计数器案例

### 3.1. 对JSX定义以及思想

* 为什么React选择JSX编写?

### 3.2. JSX的书写规范

* 必须有根元素
* 推荐使用()包裹
* 单标签/双标签

### 3.3. JSX的注释写法

### 3.4. JSX的插入子元素

* Number/String/Array
* undefined/null/Boolean
* Object不能插入

### 3.5. 可以插入表达式

### 3.6. JSX绑定属性

* 基本属性
* class属性
* style属性

### 4.1. 事件绑定

#### 4.1.1. this绑定

* bind
* es6 class field
  * 箭头函数
* 传值 箭头函数

#### 4.1.2. 传递参数

* event
* 额外的参数

### 4.2. jsx条件渲染

* if判断
* 三元运算符
* &&逻辑与
* v-show实现效果

### 4.3. jsx列表渲染

* map高阶函数(重要)
* filter
* slice





## **认识JSX**

![](./image/Aspose.Words.f76cf699-22b2-4ea9-a6a8-42a2878ac2c5.012.png)

- 这段element变量的声明右侧赋值的标签语法是什么呢？
  - 它不是一段字符串（因为没有使用引号包裹）；
  - 它看起来是一段HTML元素，但是我们能在`js`中直接给一个变量赋值html吗？

- 其实是不可以的，如果我们将 `type="text/babel" `去除掉，那么就会出现语法错误；
  - 它到底是什么呢？其实它是一段`jsx`的语法；

- **JSX是什么？**
  - **JSX是一种JavaScript的语法扩展（eXtension），也在很多地方称之为JavaScript XML**，因为  看起就是一段XML语法；
  - 它用于描述我们的UI界面，并且其完成可以和JavaScript融合在一起使用；
  - 它不同于Vue中的模块语法，你不需要专门学习模块语法中的一些指令（比如v-for、v-if、v-else、v-bind）；


### **为什么React选择了JSX**

- **React认为渲染逻辑本质上与其他UI逻辑存在内在耦合**
  - 比如UI需要绑定事件（button、a原生等等）；
  - 比如UI中需要展示数据状态；
  - 比如在某些状态发生改变时，又需要改变UI；

- **他们之间是密不可分，所以React没有将标记分离到不同的文件中，而是将它们组合到了一起，这个地方就是组件（Component）**；
  - 当然，后面我们还是会继续学习更多组件相关的东西；
  - 在这里，我们只需要知道，JSX其实是嵌入到JavaScript中的一种结构语法；
- **JSX的书写规范：**
  - **JSX的顶层只能有一个根元素，所以我们很多时候会在外层包裹一个div元素**（或者使用后面我们学习的Fragment）；
  - **为了方便阅读，我们通常在jsx的外层包裹一个小括号()，这样可以方便阅读**。
  - **jsx可以进行换行书写**；
  - **JSX中的标签可以是单标签，也可以是双标签**；
    - **注意：如果是单标签，必须以`/>`结尾**；

```jsx
  class App extends React.Component {
      render() {
        // 书写规范
        // 1.jsx结构中只能有一个根元素
        // 2.jsx结构通常会包裹一个(), 将整个jsx当做一个整体, 实现换行
        // 3.jsx可以是单标签, 也可以双标签, 但是单标签必须以/>结尾
        return (
          <div>
            <div>
              <h2>{this.state.message}</h2>
              <br/>
            </div>
            <div>哈哈哈</div>
          </div>
        )
      }
    }
```




## **JSX的使用**

- **jsx中的注释**
  - 使用`{/*这是一个注释*/}`


```jsx
 <div>
    { /* JSX的注释写法 */ }
    <h2>{message}</h2>
  </div>
```

- **JSX嵌入变量作为子元素**
  - 情况一：**当变量是Number、String、Array类型时，可以直接显示**
  - 情况二：**当变量是null、undefined、Boolean类型时，内容为空**；
    - **如果希望可以显示null、undefined、Boolean，那么需要转成字符串**；
    - 转换的方式有很多，比如toString方法、和空字符串拼接，String(变量)等方式；

  - 情况三：**Object对象类型不能作为元素直接输出，会报错**（not valid as a React child）

```jsx
 class App extends React.Component {
      constructor() {
        super()
        this.state = {
          counter: 100,
          message: "Hello World",
          names: ["abc", "cba", "nba"],

          aaa: undefined,
          bbb: null,
          ccc: true,

          friend: { name: "kobe" },
        }
      }

      render() {
        // 1.插入标识符
        const { message, names, counter } = this.state
        const { aaa, bbb, ccc } = this.state
        const { friend } = this.state

        // 3.返回jsx的内容
        return (
          <div>
            {/* 1.Number/String/Array直接显示出来 */}
            <h2>{counter}</h2>
            <h2>{message}</h2>
            <h2>{names}</h2>

            {/* 2.undefined/null/Boolean */}
            <h2>{String(aaa)}</h2>
            <h2>{bbb + ""}</h2>
            <h2>{ccc.toString()}</h2>

            {/* 3.Object类型不能作为子元素进行显示*/}
            <h2>{friend.name}</h2>
            <h2>{Object.keys(friend)[0]}</h2>

          </div>
        )
      }
    }

```

- **JSX嵌入表达式**
  - **运算表达式**
  - **三元运算符**
  - **执行一个函数**

```jsx
  class App extends React.Component {
      constructor() {
        super()
        this.state = {

          firstName: "kobe",
          lastName: "bryant",

          age: 20,

          movies: ["流浪地球", "星际穿越", "独行月球"]
        }
      }

      render() {
        // 2.对内容进行运算后显示(插入表示)
        const { firstName, lastName } = this.state
        const fullName = firstName + " " + lastName
        const { age } = this.state
        const ageText = age >= 18 ? "成年人": "未成年人"
        const liEls = this.state.movies.map(movie => <li>{movie}</li>)

        // 3.返回jsx的内容
        return (
          <div>
            {/* 4.可以插入对应的表达式*/}
            <h2>{10 + 20}</h2>
            <h2>{firstName + " " + lastName}</h2>
            <h2>{fullName}</h2>

            {/* 5.可以插入三元运算符*/}
            <h2>{ageText}</h2>
            <h2>{age >= 18 ? "成年人": "未成年人"}</h2>

            {/* 6.可以调用方法获取结果*/}
            <ul>{liEls}</ul>
            <ul>{this.state.movies.map(movie => <li>{movie}</li>)}</ul>
            <ul>{this.getMovieEls()}</ul>
          </div>
        )
      }

      getMovieEls() {
        const liEls = this.state.movies.map(movie => <li>{movie}</li>)
        return liEls
      }
    }
```

## JSX的属性绑定

### **绑定基础属性**

- 比如元素都会有title属性
- 比如img元素会有src属性
- 比如a元素会有href属性

```jsx
 <div>
    { /* 1.基本属性绑定 */ }
    <h2 title={title}>我是h2元素</h2>
    <img src={imgURL} alt=""/>
    <a href={href}>百度一下</a>
  </div>
```

### 绑定class属性

- 静态绑定：

  - 静态绑定的时候，如何使用class，会报提示错误。
  - **推荐使用className**

- 动态绑定：

  - 写法一: 字符串的拼接

  - 写法二: 将所有的class放到数组中，然后使用join方法拼接

  - 写法三: 使用第三方库classnames 

```jsx
 render() {
        const {  isActive } = this.state

        // 需求: isActive: true -> active
        // 1.class绑定的写法一: 字符串的拼接
        const className = `abc cba ${isActive ? 'active': ''}`
        // 2.class绑定的写法二: 将所有的class放到数组中
        const classList = ["abc", "cba"]
        if (isActive) classList.push("active")
        // 3.class绑定的写法三: 第三方库classnames -> npm install classnames
        const myclass = classNames('foo', { bar: true });
        return (
          <div>
            { /* 绑定class属性: 最好使用className */ }
            <h2 className={className}>哈哈哈哈</h2>
            { /* 写法一： */ }
            <h2 className={classList}>哈哈哈哈</h2>
            { /* 写法二： */ }
            <h2 className={classList.join(" ")}>哈哈哈哈</h2>
 						 { /* 写法三： */ }
            <h2 className={myclass}>哈哈哈哈</h2>
   
          </div>
        )
      }
```

### 绑定style属性

- 绑定静态属性：
  - **JSX不属性直接绑定静态绑定style，会报错**。
    - `Uncaught Error: The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.`
  - 动态绑定：
    - **绑定为对象类型，如果有`-`，则需要转化为驼峰命名**，如：`font-size`转为`fontSize`

```jsx
 return (
          <div>
            { /* 3.绑定style属性: 绑定对象类型 */ }
            <h2 style={{color: "red", fontSize: "30px"}}>呵呵呵呵</h2>
      
          </div>
       )

```




## JSX的事件绑定

- 如果原生DOM原生有一个监听事件，我们可以如何操作呢？
  - 方式一：获取DOM原生，添加监听事件；
  - 方式二：在HTML原生中，直接绑定onclick；

- 在React中是如何操作呢？我们来实现一下React中的事件监听，这里主要有两点不同
  - **React 事件的命名采用小驼峰式（camelCase）**，而不是纯小写；
  - 我们需要**通过{}传入一个事件处理函数**，这个函数会在事件发生时被执行；


### **this的绑定问题**

- 在事件执行后，我们可能需要获取当前类的对象中相关的属性，这个时候需要用到this
  - 如果我们这里**直接打印this，也会发现它是一个undefined**

- 为什么是undefined呢？
  - 原因是btnClick函数并不是我们主动调用的，而且当button发生改变时，React内部调用了btnClick函数；
  - 而它内部调用时，并不知道要如何绑定正确的this；

- **如何解决this的问题呢？**
  - 方案一：**bind给btnClick显示绑定this**
  - 方案二：**使用 ES6 class fields 语法**
  - 方案三：**事件监听时传入箭头函数**（个人推荐）

```jsx
 class App extends React.Component {
      constructor() {
        super()
        //bind绑定
        this.btn1Click = this.btn1Click.bind(this)
      }

      btn1Click() {
        console.log("btn1Click", this);
        this.setState({ counter: this.state.counter + 1 })
      }
			 // class fields
      btn2Click = () => {
        console.log("btn2Click", this)
        this.setState({ counter: 1000 })
      }

      btn3Click() {
        console.log("btn3Click", this);
        this.setState({ counter: 9999 })
      }

      render() {
   
        return (
          <div>
            {/* 1.this绑定方式一: bind绑定 */}
            <button onClick={this.btn1Click}>按钮1</button>

            
            {/* 2.this绑定方式二: ES6 class fields */}
            <button onClick={this.btn2Click}>按钮2</button>


            {/* 3.this绑定方式三: 直接传入一个箭头函数(重要) */}
            <button onClick={() => this.btn3Click()}>按钮3</button>

          </div>
        )
      }
    }
```




### **事件参数传递**

- 在执行事件函数时，有可能我们需要获取一些参数信息：比如event对象、其他参数
- **情况一：获取event对象**
  - 很多时候我们需要拿到event对象来做一些事情（比如阻止默认行为）
  - 那么默认情况下，event对象有被直接传入，函数就可以获取到event对象；

- **情况二：获取更多参数**
  - 有更多参数时，我们最好的方式就是传入一个箭头函数，主动执行的事件函数，并且传入相关的其他参数；

```jsx
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message: "Hello World"
      }
    }
   //通过bind绑定的，event会移动到最后一个参数（bind的特性决定）
    btnClick(name, age,event) {
      console.log("btnClick:", event, this)
      console.log("name, age:", name, age)
    }
    //箭头函数会正常
    btnClick2(event, name, age) {
      console.log("btnClick:", event, this)
      console.log("name, age:", name, age)
    }

    render() {
      const { message } = this.state

      return (
        <div>
        


          {/* 1.通过bind绑定的，event会移动到最后一个参数（bind的特性决定） */}
          <button onClick={this.btnClick.bind(this, "kobe", 30)}>按钮3(不推荐)</button>
					 {/* 2.通过箭头绑定的，event会在正常的位置，推荐使用这个 */}
          <button onClick={(event) => this.btnClick2(event, "why", 18)}>按钮4</button>
        </div>
      )
    }
  }
```



## **JSX的条件渲染**

- 某些情况下，界面的内容会根据不同的情况显示不同的内容，或者决定是否渲染某部分内容：
  - 在vue中，我们会通过指令来控制：比如v-if、v-show；
  - **在React中，所有的条件判断都和普通的JavaScript代码一致；**

- 常见的条件渲染的方式有哪些呢？
- **方式一：条件判断语句**
  - 适合逻辑较多的情况

- **方式二：三元运算符**
  - 适合逻辑比较简单

- **方式三：与运算符&&**
  - 适合如果条件成立，渲染某一个组件；如果条件不成立，什么内容也不渲染；

- **v-show的效果**
  - 主要是控制display属性是否为none

```jsx
 class App extends React.Component {
      constructor() {
        super()
        this.state = {
          isReady: false,
          isShow:true,
          friend: {
            name:'xiaohei',
            desc:'the man'
          }
        }
      }

      render() {
        const { isReady, friend } = this.state

        // 1.条件判断方式一: 使用if进行条件判断
        let showElement = null
        if (isReady) {
          showElement = <h2>准备开始比赛吧</h2>
        } else {
          showElement = <h1>请提前做好准备!</h1>
        }

        return (
          <div>
            {/* 1.方式一: 根据条件给变量赋值不同的内容 */}
            <div>{showElement}</div>

            {/* 2.方式二: 三元运算符 */}
            <div>{ isReady ? <button>开始战斗!</button>: <h3>赶紧准备</h3> }</div>

            {/* 3.方式三: &&逻辑与运算 */}
            {/* 场景: 当某一个值, 有可能为undefined时, 使用&&进行条件判断 */}
            <div>{ friend && <div>{friend.name + " " + friend.desc}</div> }</div>
            
             {/* v-show的效果 */}
            <h2 style={{display: isShow ? 'block': 'none'}}>哈哈哈哈</h2>
          </div>
        )
      }
    }
```


## **JSX的列表渲染**

- 真实开发中我们会从服务器请求到大量的数据，数据会以列表的形式存储：
  - 比如歌曲、歌手、排行榜列表的数据；
  - 比如商品、购物车、评论列表的数据；
  - 比如好友消息、动态、联系人列表的数据；

- 在React中并没有像Vue模块语法中的v-for指令，而且需要我们通过JavaScript代码的方式组织数据，转成JSX：
  - 很多从Vue转型到React的同学非常不习惯，认为Vue的方式更加的简洁明了；
  - 但是React中的JSX正是因为和JavaScript无缝的衔接，让它可以更加的灵活；
  - 另外我经常会提到React是真正可以提高我们编写代码能力的一种方式；

- 如何展示列表呢？
  - **在React中，展示列表最多的方式就是使用数组的map高阶函数**；

- 很多时候我们在展示一个数组中的数据之前，需要先对它进行一些处理：
  - 比如过滤掉一些内容：filter函数
  - 比如截取数组中的一部分内容：slice函数

```jsx
<div>
    <h2>学生列表数据</h2>
    <div className="list">
      {
        students.filter(item => item.score > 100).slice(0, 2).map(item => {
          return (
            <div className="item" key={item.id}>
              <h2>学号: {item.id}</h2>
              <h3>姓名: {item.name}</h3>
              <h1>分数: {item.score}</h1>
            </div>
          )
        })
      }
    </div>
  </div>
```




### **列表中的key**

- 我们会发现在前面的代码中只要展示列表都会报一个警告：

![](./image/Aspose.Words.f76cf699-22b2-4ea9-a6a8-42a2878ac2c5.014.png)

- **这个警告是告诉我们需要在列表展示的jsx中添加一个key。**
  - key主要的作用是为了提高diff算法时的效率；


## **JSX的原理和本质**

- **实际上，jsx 仅仅只是 `React.createElement(component, props, ...children) `函数的语法糖。**
  - **所有的jsx最终都会被转换成`React.createElement`的函数调用**。

- **createElement需要传递三个参数：**
  - 参数一：**type**
    - 当前ReactElement的类型；
    - 如果是标签元素，那么就使用字符串表示 “div”；
    - 如果是组件元素，那么就直接使用组件的名称；
  - 参数二：**config**
    - 所有jsx中的属性都在config中以对象的属性和值的形式存储；
    - 比如传入className作为元素的class；
  - 参数三：**children**
    - 存放在标签中的内容，以children数组的方式进行存储；
    - 当然，如果是多个元素呢？React内部有对它们进行处理，处理的源码在下方
  


### **createElement源码**

![image-20231002161207239](image/03_React%E7%9A%84JSX%E8%AF%AD%E6%B3%95%E8%A7%A3%E6%9E%90/image-20231002161207239.png)

### **Babel官网查看**

- 我们知道默认jsx是通过babel帮我们进行语法转换的，所以我们之前写的jsx代码都需要依赖babel。
- 可以在babel的官网中快速查看转换的过程：[https://babeljs.io/repl/#?presets=react](https://babeljs.io/repl/#?presets=react)

```jsx
<div>
    <div className="header">Header</div>
    <div className="Content">
      <div>{message}</div>
      <ul>
        <li>列表数据1</li>
        <li>列表数据2</li>
        <li>列表数据3</li>
        <li>列表数据4</li>
        <li>列表数据5</li>
      </ul>
    </div>
    <div className="footer">Footer</div>
  </div>
```

```js
//转化后：
React.createElement(
  "div",
  null,
  React.createElement(
    "div",
    {
      className: "header"
    },
    "Header"
  ),
  React.createElement(
    "div",
    {
      className: "Content"
    },
    React.createElement("div", null, message),
    React.createElement(
      "ul",
      null,
      React.createElement("li", null, "\u5217\u8868\u6570\u636E1"),
      React.createElement("li", null, "\u5217\u8868\u6570\u636E2"),
      React.createElement("li", null, "\u5217\u8868\u6570\u636E3"),
      React.createElement("li", null, "\u5217\u8868\u6570\u636E4"),
      React.createElement("li", null, "\u5217\u8868\u6570\u636E5")
    )
  ),
  React.createElement(
    "div",
    {
      className: "footer"
    },
    "Footer"
  )
);
```



### **直接编写jsx代码**

- 我们自己来编写React.createElement代码：
  - 我们就没有通过jsx来书写了，界面依然是可以正常的渲染。
  - 另外，在这样的情况下，你还需要babel相关的内容吗？不需要了
  - 所以，type="text/babel"可以被我们删除掉了；
  - 所以，`<script src="../react/babel.min.js"></script>`可以被我们删除掉了；


### **虚拟DOM的创建过程**

![](image/03_React%E7%9A%84JSX%E8%AF%AD%E6%B3%95%E8%A7%A3%E6%9E%90/Aspose.Words.f76cf699-22b2-4ea9-a6a8-42a2878ac2c5.019.png)

- **我们通过 React.createElement 最终创建出来一个 ReactElement对象： **
- **这个ReactElement对象是什么作用呢？React为什么要创建它呢？** 
  - 原因是React利用ReactElement对象组成了一个JavaScript的对象树； 
  - JavaScript的对象树就是虚拟DOM（Virtual DOM）； 

- **如何查看ReactElement的树结构呢？ **
  - 我们可以将之前的jsx返回结果进行打印； 
  - 注意下面代码中我打jsx的打印； 

- **而ReactElement最终形成的树结构就是Virtual DOM；** 

![image-20231002161527440](image/03_React%E7%9A%84JSX%E8%AF%AD%E6%B3%95%E8%A7%A3%E6%9E%90/image-20231002161527440.png)

### **jsx – 虚拟DOM – 真实DOM**

![image-20231002161549576](image/03_React%E7%9A%84JSX%E8%AF%AD%E6%B3%95%E8%A7%A3%E6%9E%90/image-20231002161549576.png)

### **声明式编程**

- **虚拟DOM帮助我们从命令式编程转到了声明式编程的模式**
- React官方的说法：Virtual DOM 是一种编程理念。
  - 在这个理念中，UI以一种理想化或者说虚拟化的方式保存在内存中，并且它是一个相对简单的JavaScript对象
  - 我们可**以通过ReactDOM.render让 虚拟DOM 和 真实DOM同步起来，这个过程中叫做协调（Reconciliation）**；

- 这**种编程的方式赋予了React声明式的API**：
  - 你只需要告诉React希望让UI是什么状态；
  - React来确保DOM和这些状态是匹配的；
  - 你不需要直接进行DOM操作，就可以从手动更改DOM、属性操作、事件处理中解放出来；

## **阶段案例练习**

- 1.在界面上以表格的形式，显示一些书籍的数据；
- 2.在底部显示书籍的总价格；
- 3.点击+或者-可以增加或减少书籍数量（如果为1，那么不能继续-）；
- 4.点击移除按钮，可以将书籍移除（当所有的书籍移除完毕时，显示：购物车为空~）；

![](./image/Aspose.Words.f76cf699-22b2-4ea9-a6a8-42a2878ac2c5.022.png)

```jsx
 // 1.定义App根组件
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          books: [
            {
              id: 1,
              name: '《算法导论》',
              date: '2006-9',
              price: 85.00,
              count: 1
            },
            {
              id: 2,
              name: '《UNIX编程艺术》',
              date: '2006-2',
              price: 59.00,
              count: 1
            },
          ]
        }
      }

      getTotalPrice() {
        const totalPrice = this.state.books.reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0)
        return totalPrice
      }

      changeCount(index, count) {
        const newBooks = [...this.state.books]
        newBooks[index].count += count
        this.setState({ books: newBooks })
      }

      removeItem(index) {
        const newBooks = [...this.state.books]
        newBooks.splice(index, 1)
        this.setState({ books: newBooks })
      }

      renderBookList() {
        const { books } = this.state

        return <div>
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>书籍名称</th>
                <th>出版日期</th>
                <th>价格</th>
                <th>购买数量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {
                books.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{formatPrice(item.price)}</td>
                      <td>
                        <button 
                          disabled={item.count <= 1}
                          onClick={() => this.changeCount(index, -1)}
                        >
                          -
                        </button>
                        {item.count}
                        <button onClick={() => this.changeCount(index, 1)}>+</button>
                      </td>
                      <td><button onClick={() => this.removeItem(index)}>删除</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <h2>总价格: {this.getTotalPrice()}</h2>
        </div>
      }

      renderBookEmpty() {
        return <div><h2>购物车为空, 请添加书籍~</h2></div>
      }

      render() {
        const { books } = this.state
        return books.length ? this.renderBookList(): this.renderBookEmpty()
      }
    }
```



## 作业

### 二. React开发的三个依赖包是什么？分别有什么作用？

* react:包含react所有必须的核心代码
* react-dom：react 渲染在不同平台所需要的核心代码
* babel:将jsx转换为 React 代码的工具

### 三. React如何封装组件，组件里面包含哪些内容？

* 类的方式封装组件

* 定义一个类（类名大写，组件的名称是必须大写的，小写会被认为是HTML元素），继承自React.Component

* .实现当前组件的render函数

  ~~~js
  class App extends React.Component{
      render(){
          return <h2> Hello React<h2/>
      }
  }
  #渲染根组件
  const root =ReactDOM.createRoot(document.querySelector("#r oot"))
  #使用组件
  root.render(<App/>)
  ~~~


### 四. 在进行函数绑定时，如何进行this关键字的绑定？

* 在传入函数时直接绑定this

  ~~~js
     render() {
          return (
            <div>
              <h2>{this.state.message}</h2>
              <button onClick={this.btnClick.bind(this)}>点击</button>
            </div>
          )
        }
  ~~~

  

* 在类中提前绑定需要使用的函数的this

  ~~~js
     class App extends React.Component {
        // 组件数据
        constructor() {
          super()
          this.state = {
            message: "Hello World",
           
          }
  
          // 对需要绑定的方法, 提前绑定好this
          this.btnClick = this.btnClick.bind(this)
        }
     
     render() {
          return (
            <div>
              <h2>{this.state.message}</h2>
              <button onClick={this.btnClick}>点击</button>
            </div>
          )
        }
  }
  ~~~


### 五. React如何进行列表数据的展示？回顾数组的常见高阶函数。

* 方式一：直接使用for循环 

  ~~~js
      render() {
          // 1.对movies进行for循环
          const liEls = []
          for (let i = 0; i < this.state.movies.length; i++) {
          const movie = this.state.movies[i]
          const liEl = <li>{movie}</li>
          liEls.push(liEl)
          }
            <div>
              <h2>电影列表</h2>
              <ul>
               <li> {liEls}</li>
              </ul>
            </div>
          )
        }
  ~~~

* 方式二：map 高阶函数

  ~~~js
  
  
        render() 
  #返回一个新的数组
          const liEls = this.state.movies.map(movie => <li>{movie}</li>)
  
          return (
            <div>
              <h2>电影列表</h2>
              <ul>
                 <li> {liEls}</li>
              </ul>
            </div>
          )
        }
        
        
  ~~~

  

* 方式三： map 高阶函数 表达式

  ~~~js
  <ul>
  {this.state.movies.map(movie => <li>{movie}</li>)}
  </ul>
  ~~~


### 六. JSX如何绑定数据？如何绑定内容、属性，有哪些规则？

* 绑定数据

  ~~~js
      class Home extends React.Component {
          constructor() {
              super();
              this.state = {
                  message: 'BNTang'
              }
          }
  
          render() {
              return (
                  <div>
                      <p id="box">{this.state.message}</p>
                      <p title={this.state.message}>{this.state.message}</p>
                  </div>
              )
          }
      }
  
  ~~~

  

* 绑定class

  ~~~js
    class Home extends React.Component {
          constructor() {
              super();
              this.state = {
                  isActive: true,
                   objStyle: {color: "red", fontSize: "30px"}
              }
          }
  
          render() {
           const { title, imgURL, href, isActive, objStyle } = this.state
          #1.class绑定的写法一: 字符串的拼接
          const className = `abc cba ${isActive ? 'active': ''}`
          
         # 2.class绑定的写法二: 将所有的class放到数组中
          const classList = ["abc", "cba"]
          if (isActive) classList.push("active")
              
         # 3.class绑定的写法三: 第三方库classnames -> npm install classnames
            
              return (
                  <div>
                     <h2 className={className}>哈哈哈哈</h2>
                     <h2 className={classList.join(" ")}>哈哈哈哈</h2>
                  </div>
              )
          }
      }
  
   
  ~~~
  

* 绑定style

  ~~~js
   class Home extends React.Component {
          constructor() {
              super();
              this.state = {
                  message: 'BNTang'
              }
          }
  
          render() {
              return (
                  <div>
                      <p style={{color: 'red', fontSize: '100px'}}>{this.state.message}</p>
                  </div>
              )
          }
      }
  ~~~

* 绑定属性

  ~~~js
  <p title="我是标题">我是段落</p>
  
  <p title={message}>我是段落</p>
  ~~~

* 书写规范
  * 顶层只有一个根元素
  * jsx 的外层需要包裹一个 `（）` 方便阅读，可以进行换行书写
  * jsx的标签可以是单标签，也可以是双标签
  * 单标签必须以`/>`结尾
  * jsx中的注释 `{ /* */}`
  * JSX嵌入变量作为子元素
    * 情况一：当变量是Number、String、Array类型时，可以直接显示
    * 情况二：当变量是null、undefined、Boolean类型时，内容为空；
      如果希望可以显示null、undefined、Boolean，那么需要转成字符串；
      转换的方式有很多，比如toString方法、和空字符串拼接，String(变量)等方式；
    * 情况三：Object对象类型不能作为子元素（not valid as a React child）

### JSX绑定事件，this绑定有哪些规则？如何给函数传递参数？

* this绑定规则

  * 普通绑定 - `onClick={this.btnClick}` - 在内部是独立函数调用,所以this为undefined
  * this绑定方式一: bind绑定 - `onClick={this.btnClick.bind(this)}`
  * this绑定方式二: ES6 class fields - `onClick={this.btnClick}` - `btnClick = () => {}`
  * this绑定方式三: 直接传入一个箭头函数 - `onClick={() => this.btnClick()}`

* 给函数传递参

  * event参数的传递 - `onClick={(event) => this.btn1Click(event)}`
  * 额外参数的传递 - `onClick={(event) => this.btn2Click(event, "http", 18)}`

  ```js
  btn1Click(event) {
    console.log(event);
  }
  btn2Click(event, name, age) {
    console.log(event, name, age);
  }
  ```

### JSX的代码是如何被编译为React代码的？它的本质是进行什么操作？

* jsx是通过babel工具转换编译成React代码的
* 本质
  * jsx 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖
  * 所有的jsx最终都会被转换成React.createElement的函数调用

###  什么是虚拟DOM？虚拟DOM在React中起到什么作用？

* 什么是虚拟DOM？
  * Virtual DOM 是一种编程概念，UI以一种理想化或者说虚拟化的方式保存在内存中
  * Virtual DOM 本质上是 JavaScript 对象，是真实 DOM 的描述，⽤⼀个 JS 对象来描述⼀个 DOM 节点
  * 我们知道jsx转成React代码的本质是 - 转换成React.createElement的函数调用
  * 通过React.createElement的函数创建出来的`ReactElement`对象
  * React利用`ReactElement`对象组成了一个JavaScript的对象树 - JavaScript的对象树就是**虚拟DOM**
* 虚拟DOM在React中的作用
  * 虚拟DOM 通过diff算法 - 以最⼩的代价更新变化的视图
  * 跨平台渲染
  * 声明式编程 - 虚拟DOM帮助我们从命令式编程转到了声明式编程的模式
    * 你只需要告诉React希望让UI是什么状态
    * React来确保DOM和这些状态是匹配的
    * 不需要直接进行DOM操作，就可以从手动更改DOM、属性操作、事件处理中解放出来
