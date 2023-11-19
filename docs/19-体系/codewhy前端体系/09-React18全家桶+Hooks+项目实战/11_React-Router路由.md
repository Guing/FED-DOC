## 总结

### 2.1. Router的基本使用

* 安装 `npm install react-router-dom`
* 配置`BrowserRouter/HashRouter => App`
* 配置映射关系: `Routes => Route => path/element`
* Link: to属性

### 2.2. NavLink使用

### 2.3. Navigate组件和NotFound页面配置

### 2.4. 代码进行跳转

* useNavigate 函数式组件
* withRouter

### 2.5. 路由嵌套的使用

* `Route => 子Route`
* Outlet占位

### 2.6. 路由传递参数

* `detail/:id`
  * `useParams`
* `queryString`
  * `/user?xxxx`
  * `useSearchParams`

### 2.7. 路由的配置方式

* `useRoutes(routes)`
* `routes = [{}, {}]`

### 2.8. 路由的懒加载

* `React.lazy(() => import())`
* `Suspense fallback`





## **认识前端路由**

- **路由其实是网络工程中的一个术语：**
  - 在架构一个网络时，非常重要的两个设备就是路由器和交换机。
  - 当然，目前在我们生活中路由器也是越来越被大家所熟知，因为我们生活中都会用到路由器：
  - 事实上，路由器主要维护的是一个映射表；
  - 映射表会决定数据的流向；

- **路由的概念在软件工程中出现，最早是在后端路由中实现的，原因是web的发展主要经历了这样一些阶段：**
  - 后端路由阶段；
  - 前后端分离阶段；
  - 单页面富应用（SPA）；


### **后端路由阶段**

- 早期的网站开发整个HTML页面是由**服务器来渲染**的.
  - 服务器直接生产渲染好对应的HTML页面, 返回给客户端进行展示.
- 但是, 一个网站, **这么多页面服务器如何处理呢?**
  - 一个页面有自己对应的网址, 也就是URL；
  - URL会发送到服务器, 服务器会通过正则对该URL进行匹配, 并且最后交给一个Controller进行处理；
  - Controller进行各种处理, 最终生成HTML或者数据, 返回给前端.

- 上面的这种操作, 就是**后端路由**：
  - 当我们页面中需要请求不同的**路径**内容时, 交给服务器来进行处理, 服务器渲染好整个页面, 并且将页面返回给客户端.
  - 这种情况下渲染好的页面, 不需要单独加载任何的js和css, 可以直接交给浏览器展示, 这样也有利于SEO的优化.
- **后端路由的缺点:**
  - 一种情况是整个页面的模块由后端人员来编写和维护的；
  - 另一种情况是前端开发人员如果要开发页面, 需要通过PHP和Java等语言来编写页面代码；
  - 而且通常情况下HTML代码和数据以及对应的逻辑会混在一起, 编写和维护都是非常糟糕的事情；


### **前后端分离阶段**

- **前端渲染的理解：**
  - 每次请求涉及到的静态资源都会从**静态资源服务器获取**，这些资源**包括HTML+CSS+JS**，然后在前端对这些请求回来的资源进行渲染；
  - 需要注意的是，客户端的每一次请求，都会从静态资源服务器请求文件；
  - 同时可以看到，和之前的后端路由不同，这时后端只是负责提供API了；

- **前后端分离阶段：**
  - 随着Ajax的出现, 有了前后端分离的开发模式；
  - 后端只提供API来返回数据，前端通过Ajax获取数据，并且可以通过JavaScript将数据渲染到页面中；
  - 这样做最大的优点就是前后端责任的清晰，后端专注于数据上，前端专注于交互和可视化上；
  - 并且当移动端(iOS/Android)出现后，后端不需要进行任何处理，依然使用之前的一套API即可；
  - 目前比较少的网站采用这种模式开发；

- **单页面富应用阶段:**
  - 其实SPA最主要的特点就是在前后端分离的基础上加了一层前端路由.
  - 也就是前端来维护一套路由规则.
  - **前端路由的核心是什么呢？改变URL，但是页面不进行整体的刷新。**


### **URL的hash**

- **前端路由是如何做到URL和内容进行映射呢？监听URL的改变。**
- **URL的hash**
  - URL的hash也就是锚点(#),  本质上是改变window.location的href属性；
  - 我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新；


![image-20231003153035114](image/11_React-Router%E8%B7%AF%E7%94%B1/image-20231003153035114.png)

` `![](./image/Aspose.Words.ee7556d2-dbdc-49d3-bf35-cdd618836dac.015.png)

- **hash的优势就是兼容性更好，在老版IE中都可以运行，但是缺陷是有一个#，显得不像一个真实的路径。**

### **HTML5的History**

- **history接口是HTML5新增的, 它有六种模式改变URL而不刷新页面：**
  - replaceState：替换原来的路径；
  - pushState：使用新的路径；
  - popState：路径的回退；
  - go：向前或向后改变路径；
  - forward：向前改变路径；
  - back：向后改变路径；


![image-20231003153109540](image/11_React-Router%E8%B7%AF%E7%94%B1/image-20231003153109540.png)

![image-20231003153117209](image/11_React-Router%E8%B7%AF%E7%94%B1/image-20231003153117209.png)

## **认识react-router**

- **目前前端流行的三大框架, 都有自己的路由实现:**
  - Angular的ngRouter
  - React的ReactRouter
  - Vue的vue-router


- **React Router在最近两年版本更新的较快，并且在最新的React Router6.x版本中发生了较大的变化。**
  - 目前React Router6.x已经非常稳定，我们可以放心的使用；


- **安装React Router：**
  - 安装时，我们选择react-router-dom；
    - `npm install react-router-dom`

  - react-router会包含一些react-native的内容，web开发并不需要；


### **Router的基本使用**

- **react-router最主要的API是给我们提供的一些组件：**
  - **BrowserRouter或HashRouter**
    - Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件；
    - BrowserRouter使用history模式；
    - HashRouter使用hash模式；

```js
//index.js
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter } from "react-router-dom"


const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(
    <HashRouter>
        <App/>
    </HashRouter>

)

```



### **路由映射配置**

- **Routes：包裹所有的Route，在其中匹配一个路由**
  - Router5.x使用的是Switch组件

- **Route：Route用于路径的匹配；**
  - path属性：用于设置匹配到的路径；
  - element属性：设置匹配到路径后，渲染的组件；
    - Router5.x使用的是component属性

  - exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件；
    - Router6.x不再支持该属性

```js
//src/App.jsx
import React, { PureComponent } from "react";
import { Routes, Route, } from "react-router-dom";
import Detail from "./pages/Detail";
import List from "./pages/List";
export class Home extends PureComponent {
  render() {
    return (
      <div>
        <div className="header">
          header
        </div>
        <div className="content">
          <Routes>
            <Route path="/list" element={<List></List>}></Route>
            <Route path="/detail" element={<Detail></Detail>}></Route>
          </Routes>
        </div>
        <div className="footer">footer</div>
      </div>
    );
  }
}

export default Home;
```



### **路由配置和跳转**

- **Link和NavLink：**
  - 通常路径的跳转是使用Link组件，最终会被渲染成a元素；
  - NavLink是在Link基础之上增加了一些样式属性（后续学习）；
  - to属性：Link中最重要的属性，用于设置跳转到的路径；

` `![](./image/Aspose.Words.ee7556d2-dbdc-49d3-bf35-cdd618836dac.021.png)

```jsx
import { Link } from 'react-router-dom'

<Link to="/home">首页</Link>
<Link to="/about">关于</Link>
<Link to="/login">登录</Link>
<Link to="/user?name=why&age=18">用户</Link>
```



### **NavLink的使用**

- 需求：路径选中时，对应的a元素变为红色
- **这个时候，我们要使用NavLink组件来替代Link组件：**
- **NavLink组会添加默认的activeClassName：**
  - **事实上在路由默认匹配成功时，NavLink就会添加上一个动态的active class**；
  - 所以我们也可以直接编写样式

```jsx
 <NavLink to="/home" >首页</NavLink>
//首页被选中时，会转化成a标签，并添加active类
<a class="active" >首页</a>
```

- NavLink也可以自定义样式。
  - style：传入函数，函数接受一个对象，包含isActive属性
  - className：传入函数，函数接受一个对象，包含isActive属性


```jsx
 <NavLink to="/home" style={({isActive}) => ({color: isActive ? "red": ""})}>首页</NavLink>
 <NavLink to="/home" className={({isActive}) => isActive?"link-active":""}>首页</NavLink>
          
```

- **当然，如果你担心这个class在其他地方被使用了，出现样式的层叠，也可以自定义class**

### **Navigate导航**

- **Navigate用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中：**

- **我们这里使用这个的一个案例：**

  - 在没有登录时，显示登录按钮

  - 在登录成功时，直接跳转到首页


  ```jsx
  import React, { PureComponent } from 'react'
  import { Navigate } from 'react-router-dom'
  
  export class Login extends PureComponent {
    constructor(props) {
      super(props)
  
      this.state = {
        isLogin: false
      }
    }
    
    login() {
      this.setState({ isLogin: true })
    }
  
    render() {
      const { isLogin } = this.state
  
      return (
        <div>
          <h1>Login Page</h1>
          {!isLogin ? 
            <button onClick={e => this.login()}>登录</button>
            :<Navigate to="/home"/>} {/*出现<Navigate to='/home'/>组件时，直接跳转到/home页面*/}
        </div>
      )
    }
  }
  
  export default Login
  ```

- 我们也可以在匹配到/的时候，直接跳转到/home页面

```jsx
<Routes>
  <Route path='/' element={<Navigate to="/home"/>}/>
  <Route path='/home' element={<Home/>}> </Route>

</Routes>
```



### **Not Found页面配置**

- 如果用户随意输入一个地址，该地址无法匹配，那么在路由匹配的位置将什么内容都不显示。
- 很多时候，我们希望在这种情况下，让用户看到一个**Not Found的页面**。
- 这个过程非常简单：
  - 开发一个Not Found页面；
  - 配置对应的Route，并且设置path为\*即可；

```jsx
<Routes>
  <Route path='/' element={<Navigate to="/home"/>}/>
  <Route path='/home' element={<Home/>}> </Route>
  <Route path='*' element={<NotFound/>}/>
</Routes>
```



## Router的路由嵌套

- **在开发中，路由之间是存在嵌套关系的。**

  ```jsx
  <Routes>
    <Route path='/home' element={<Home/>}>
      <Route path='/home' element={<Navigate to="/home/recommend"/>}/>{/*进入/home页面时，自动跳转到/home/recommend页面*/}
      <Route path='/home/recommend' element={<HomeRecommend/>}/>
      <Route path='/home/ranking' element={<HomeRanking/>}/>
    </Route>
  </Routes>
  ```

- `<Outlet>`组件用于在父路由元素中作为子路由的占位元素。 

```jsx
      <div>
        <h1>Home Page</h1>
        <div className='home-nav'>
          <Link to="/home/recommend">推荐</Link>
          <Link to="/home/ranking">排行榜</Link>
        </div>

        {/* 占位的组件 */}
        <Outlet/>
      </div>
```

## **Router的代码跳转**

- **目前我们实现的跳转主要是通过Link或者NavLink进行跳转的，实际上我们也可以通过JavaScript代码进行跳转。**
  - 我们知道Navigate组件是可以进行路由的跳转的，但是依然是组件的方式。
  - 如果我们希望通过JavaScript代码逻辑进行跳转（比如点击了一个button），那么就需要获取到navigate对象。


- **在Router6.x版本之后，代码类的API都迁移到了hooks的写法：**
  - 如果我们希望进行代码跳转，需要通过useNavigate的Hook获取到navigate对象进行操作；
- 如果是类组件，不支持使用hook方式，需要自己封装高阶组件。

```jsx

import {  useNavigate } from "react-router-dom"

// 高阶组件: 函数
function withRouter(WrapperComponent) {
  return function(props) {
    // 1.useNavigate的Hook
    const navigate = useNavigate()
    const router = { navigate }

    return <WrapperComponent {...props} router={router}/>
  }
}

export default withRouter
```

```jsx
import React, { PureComponent } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { withRouter } from "../hoc"

export class Home extends PureComponent {

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <div className='home-nav'>
          <Link to="/home/recommend">推荐</Link>
          <Link to="/home/ranking">排行榜</Link>
          <button onClick={e => this.props.router.navigateTo("/home/ranking")}>歌单</button>
        </div>
        {/* 占位的组件 */}
        <Outlet/>
      </div>
    )
  }
}

export default withRouter(Home)
```

 

## **Router的参数传递**

- **传递参数有二种方式：**
  - 动态路由传参；
  - search传参；

- **动态路由传参：**
  
  - 动态路由的概念指的是路由中的路径并不会固定
  
  - 比如`/detail`的path对应一个组件Detail；
  
  - 如果我们将path在Route匹配时写成`/detail/:id`，那么 `/detail/abc`、`/detail/123`都可以匹配到该Route，并且进行显示；
  
  - ```jsx
    <Routes>
     <Route path="/detail/:id" element={<Detail></Detail>}></Route>         
    </Routes>
    ```
  
  - 获取参数：
  
  - ` const params = useParams();`
  

- **search传参**

  - 通过这种方式`/detail?id=1&name=xiaohei`
  
  - 获取参数
  
  - ```js
    const [searchParams] = useSearchParams();
     const query = Object.fromEntries(searchParams)
    ```
  

```jsx
import { useState } from "react"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"

// 高阶组件: 函数
function withRouter(WrapperComponent) {
  return function(props) {
    // 1.导航
    const navigate = useNavigate()

    // 2.动态路由的参数: /detail/:id
    const params = useParams()

    // 3.查询字符串的参数: /user?name=why&age=18
   
    const [searchParams] = useSearchParams()
    const query = Object.fromEntries(searchParams)

    //4.获取全部的路由信息
    const location = useLocation()
     
    const router = { navigate, params, location, query }

    return <WrapperComponent {...props} router={router}/>
  }
}

export default withRouter
```

## Router的配置方式

- 目前我们所有的路由定义都是直接使用Route组件，并且添加属性来完成的。
- 但是这样的方式会让路由变得非常混乱，我们希望**将所有的路由配置放到一个地方进行集中管理**： 
  - 在**早期的时候，Router并且没有提供相关的API，需要安装`react-router-config`这个Npm包**； 
- 在Router6.x中，为我们提供了`useRoutes `API可以完成相关的配置
  - **`useRoutes `就是遍历路由数组，再生成上面组件式的路由配置**
  - `useRoutes `只能在函数组件中使用

```jsx
const routes = [
  {
    path: '/list/:id',
    element: <List></List>
  },
  {
    path: '/detail',
    element: <Detail></Detail>,
    children: [
      {
        path: '/detail/context',
        element: <DetailContext></DetailContext>
      },
      {
        path: '/detail/side',
        element: <DetailSide></DetailSide>
      }
    ]
  },

];
export default routes
```

```jsx
import {  useRoutes,Link } from 'react-router-dom'
import routes from './router';
return (props)=>{
  	<div>
        <div className="header">
          header
          <ul className="nav">
            <li>
              <Link to="/list">列表 </Link>
            </li>
            <li>
              <Link to="/detail">详情 </Link>
            </li>
          </ul>
        </div>
        <div className="content">
          {useRoutes(routes)}
        </div>
        <div className="footer">footer</div>
      </div>
}
```

## 路由懒加载

- **如果我们对某些组件进行了异步加载（懒加载），那么需要使用Suspense进行包裹：** 

```jsx
import React from "react";
// import List from "../pages/List";
const List = React.lazy(() => import('../pages/List')) //定义懒加载组件
const routes = [
  {
    path: '/list/',
    element: <List></List>
  },

];
export default routes
```

- 使用Suspense进行包裹根组件

```jsx
import React, { PureComponent, Suspense } from "react";
import { HashRouter } from "react-router-dom";
import Home from "./Home";
export class App extends PureComponent {
  render() {
    return (
      <Suspense fallback={<div>loading</div>}>
        <HashRouter>
          <Home></Home>
        </HashRouter>
      </Suspense>
    );
  }
}

export default App;
```

## 作业

### 二. React Router6的基本创建过程是什么？进行步骤总结。

* 安装react-router-dom --  **npm install react-router-dom**

* 选择路由模式 BrowserRouter使用**history模式** / HashRouter使用**hash模式**

  ```jsx
  <HashRouter>
      <App />
  </HashRouter>
  ```

* 通过Routes包裹所有的Route, 在其中匹配路由

* Route用于路径的匹配

  * path属性：用于设置匹配到的路径
  * element属性：设置匹配到路径后，渲染的组件  --  Router5.x使用的是component属性
  
* 路由跳转 -- Link组件 / NavLink组件
  
  * to属性 -- 用于设置跳转到的路径
  
* 路由重定向 -- Navigate

* Not Found页面配置 -- path="*"

  ```jsx
  <Link to="/home">首页</Link>
  <Link to="/about">关于</Link>
  <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      {/**Home页面*/}
      <Route path="/home" element={<Home />}>
        <Route path="/home" element={<Navigate to="/home/homebanner" />} />
        <Route path="/home/homebanner" element={<HomeBanner />} />
        <Route path="/home/homerecommend" element={<HomeRecommend />} />
      </Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="*" element={<NotFount />}></Route>
  </Routes>
  ```





### 三. React Router6的路由嵌套如何配置？Outlet的作用是什么？

```jsx
// Home 页面
<Link to="/home/homebanner">轮播</Link>
<Link to="/home/homerecommend">推荐</Link>

<Outlet/>
```

* Outlet -- Outlet组件用于在父路由元素中作为子路由的占位元素, 类似于Vue中的 router-view





### 四. React Router6如何传递参数？如何在组件中获取参数？

* 路由参数传递有两种方式: 1. 动态路由的方式 2. search传递参数

* 动态路由

  ```jsx
  <Link to="/user/9978">用户</Link>
  <Route path="/user/:id" element={<User />}></Route>
  ```

  ```jsx
  // 获取动态路由参数 -- 需要通过 useParams 只能在函数式组件中使用
  import { useParams } from "react-router-dom";
  export function User() {
    const params = useParams()
    return (
      <div>
        <h4>User Page</h4>
        <h4>id: {params.id}</h4>
      </div>
    )
  }
  ```

* search传递参数

  ```jsx
  <Link to="/user?name=大大怪将军&age=19"">用户</Link>
  ```

  



### 五. 类组件无法直接使用navigate、location等参数，应该如何进行操作？

```jsx
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

function withRouter(WrapperComponent) {
  return function(props){
    // 1.导航
    const navigate = useNavigate()

    // 2.动态路由的参数: /detail/:id
    const params = useParams()

    // 3.查询字符串的参数: /user?name=why&age=18
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams);

    const router = {navigate, params, location, query}

    return <WrapperComponent {...props} router={router} />
  }
}
export default withRouter
```

```jsx
import React, { PureComponent } from 'react'
import withRouter from "../hoc/with_router"

export class About extends PureComponent {
  navigateTo(path) {
    const { navigate } = this.props.router
    navigate(path)
  }
  render() {
    const { query } = this.props.router
    return (
      <div>
        <h3>About Page</h3>
        <h4>name: {query.name}-age: {query.age}</h4>
      </div>
    )
  }
}
export default withRouter(About)
```



### 六. React Router6如何进行路由配置？如何配置路由的懒加载？

```js
// 在单独的router/index.js文件中

// 路由懒加载/按需加载/异步加载 ? 
// 这样暂时不会显示,因为是异步的要单独下载,需要加载一个loading动画React提供的Suspense组件
const Order = React.lazy(() => import("../page/Order"));
const User = React.lazy(() => import("../page/User"));

const router = [
    {
        path: '/',
        element: <Navigate to="/home" />,
    },
    {
        path: "/home",
        element: <Home />,
        children: []
    }
]
export default router
```

```jsx
<HashRouter>
  <Suspense fallback={<h4>Loading~~~~</h4>}>
    <App />
  </Suspense>
</HashRouter>
```
