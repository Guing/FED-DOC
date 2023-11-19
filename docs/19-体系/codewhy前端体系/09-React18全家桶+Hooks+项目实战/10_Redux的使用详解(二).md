## 总结

### 二. ReduxToolKit使用(90%重要)

#### 2.1. RTK介绍

#### 2.2. RTK基本使用(重要)

* configureStore: reducer
* createSlice:
  * name
  * initialState
  * reducers: {}

#### 2.3. RTK异步操作(重要)

* const asyncAction =  createAsyncThunk("actionName", async () => {} )
* 三种状态:
  * pending
  * fulfilled
  * rejected
* extraReducers

#### 2.4. RTK其他两个用法(了解

* extraReducers: (builder) => {builder.addCase()}
* createAsyncThunk("name", aysnc (extraInfo, store) => {})

#### 2.5. RTK底层immer-js库(了解)



### 三. connect底层原理(了解)

#### 3.1. connect的实现

#### 3.2. store的解耦操作

* StoreContext



### Redux核心原理(了解)

#### 1.1. 中间件的实现原理

* log
* thunk

#### 1.2. applyMiddleware原理

#### 1.3. React状态管理选择

* this.state/useState: 组件管理状态
* Context
* Redux



## **认识Redux Toolkit**

- **Redux Toolkit 是官方推荐的编写 Redux 逻辑的方法。**
  - 在前面我们学习Redux的时候应该已经发现，redux的编写逻辑过于的繁琐和麻烦。
  - 并且代码通常分拆在多个文件中（虽然也可以放到一个文件管理，但是代码量过多，不利于管理）；
  - **Redux Toolkit包旨在成为编写Redux逻辑的标准方式**，从而解决上面提到的问题；
  - 在很多地方为了称呼方便，也将之称为“RTK”；

- **安装Redux Toolkit：**
  - `npm install @reduxjs/toolkit react-redux`


- Redux Toolkit的**核心API**主要是如下几个：
  - **configureStore**：包装createStore以提供简化的配置选项和良好的默认值。它可以**自动组合你的 slice reducer**，**添加你提供 的任何 Redux 中间件**，**redux-thunk默认包含**，并**启用 Redux DevTools Extension**。
  - **createSlice**：接受reducer函数的对象、切片名称和初始状态值，并**自动生成切片reducer，并带有相应的actions**。
  - **createAsyncThunk**: 接受一个动作类型字符串和一个返回承诺的函数，并**生成一个pending/fulfilled/rejected基于该承诺分 派动作类型的 thunk**


## ReduxToolkit重构

### **创建reducer**

- 我们先对counter的reducer进行重构： 通过createSlice创建一个slice。
- **createSlice**主要包含如下几个参数： 
  - **name**：用户标记slice的名词 
    - 在之后的redux-devtool中会显示对应的名词； 

  - **initialState**：初始化值 
    - 第一次初始化时的值； 

  - **reducers**：相当于之前的reducer函数 
    - 对象类型，并且可以添加很多的函数； 
    - 函数类似于redux原来reducer中的一个case语句； 
    - 函数的参数： 
      - 参数一：state 
      - 参数二：调用这个action时，传递的action参数； 

- **createSlice返回值是一个对象，包含所有的actions，reducers；** 

```js
//store/features/counter.js
import { createSlice } from "@reduxjs/toolkit"
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 888
  },
  reducers: {
    addNumber(state, { payload }) {
      state.counter = state.counter + payload
    },
    subNumber(state, { payload }) {
      state.counter = state.counter - payload
    }
  }
})

export const { addNumber, subNumber } = counterSlice.actions
export default counterSlice.reducer
```

### **store的创建**

- **configureStore用于创建store对象，常见参数如下：**
  - reducer，将slice中的reducer可以组成一个对象传入此处；
  - middleware：可以使用参数，传入其他的中间件（自行了解）；
  - devTools：是否配置devTools工具，默认为true；

```js
//store/index.js
import { configureStore } from "@reduxjs/toolkit"

import counterReducer from "./features/counter"


const store = configureStore({
  reducer: {
    counter: counterReducer,
  }
})

export default store
```

### 使用Store

- 在使用上和react-redux没啥区别

```js
import React, { PureComponent } from 'react'
import { connect } from "../hoc"
import { addNumber } from "../store/features/counter"

export class About extends PureComponent {
  addNumber(num) {
    this.props.addNumber(num)
  }
  render() {
    const { counter } = this.props

    return (
      <div>
        <h2>Home Counter: {counter}</h2>
        <button onClick={e => this.addNumber(5)}>+5</button>
        <button onClick={e => this.addNumber(8)}>+8</button>
        <button onClick={e => this.addNumber(18)}>+18</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter
})

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumber(num)) //调用createSlice返回的action，传的num会作为action.payload参数
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
```

## **Redux Toolkit的异步操作**

- 在之前的开发中，我们通过redux-thunk中间件让dispatch中可以进行异步操作。
- Redux Toolkit默认已经给我们继承了Thunk相关的功能：**createAsyncThunk**

```js
export const fetchHomeMultidataAction = createAsyncThunk(
  "fetch/homemultidata", 
  async (extraInfo, { dispatch, getState }) => {

    // 1.发送网络请求, 获取数据
    const res = await axios.get("http://xxx:8000/home/multidata")

    // 3.返回结果, 那么action状态会变成fulfilled状态
    return res.data
})
```

- **当createAsyncThunk创建出来的action被dispatch时，会存在三种状态： **

  - **pending**：action被发出，但是还没有最终的结果； 
  - **fulfilled**：获取到最终的结果（有返回值的结果）； 
  - **rejected**：执行过程中有错误或者抛出了异常； 

- **我们可以在createSlice的entraReducer中监听这些结果：** 

  ```js
  const homeSlice = createSlice({
   //...other
  extraReducers: {
      [fetchHomeMultidataAction.pending](state, action) {
        console.log("fetchHomeMultidataAction pending")
      },
      [fetchHomeMultidataAction.fulfilled](state, { payload }) {
        state.banners = payload.data.banner.list
        state.recommends = payload.data.recommend.list
      },
      [fetchHomeMultidataAction.rejected](state, action) {
        console.log("fetchHomeMultidataAction rejected")
      }
    }
  }
  ```

- **extraReducer的另外一种写法**

  - **extraReducer还可以传入一个函数，函数接受一个builder参数。**

  - 我们可以向builder中添加case来监听异步操作的结果：

```js
const homeSlice = createSlice({
 //...other
extraReducers: {
    builder.addCase(fetchHomeMultidataAction.pending, (state, action) => {
      console.log("fetchHomeMultidataAction pending")
    }).addCase(fetchHomeMultidataAction.fulfilled, (state, { payload }) => {
      state.banners = payload.data.banner.list
      state.recommends = payload.data.recommend.list
    })
  }
}
```

- 如何不想使用extraReducers监听结果，觉得比较繁琐，则**可以直接在createAsyncThunk的回调函数中，dispatch action**。
  - createAsyncThunk的第二个参数，回调函数有传入两个参数
    - 第一个是调用fetchHomeMultidataAction传入的额外的参数
    - 第二个是包含dispatch，getState的对象。

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchHomeMultidataAction = createAsyncThunk(
  "fetch/homemultidata", 
  async (extraInfo, { dispatch, getState }) => {
    const res = await axios.get("http://xxx:8000/home/multidata")

    // 2.取出数据, 并且在此处直接dispatch操作
    dispatch(changeBanners(res.data.data.banner.list))

    // 3.返回结果, 那么action状态会变成fulfilled状态
    return res.data
})

const homeSlice = createSlice({
  name: "home",
  initialState: {
    banners: [],

  },
  reducers: {
    changeBanners(state, { payload }) {
      state.banners = payload
    },
  },
  
  //在createAsyncThunk的回调函数中，直接dispatch action，这里可以忽略。
  
  // extraReducers: {
  //   [fetchHomeMultidataAction.pending](state, action) {
  //     console.log("fetchHomeMultidataAction pending")
  //   },
  //   [fetchHomeMultidataAction.fulfilled](state, { payload }) {
  //     state.banners = payload.data.banner.list
  //   },
  //   [fetchHomeMultidataAction.rejected](state, action) {
  //     console.log("fetchHomeMultidataAction rejected")
  //   }
  // }
})

export const { changeBanners } = homeSlice.actions
export default homeSlice.reducer
```

```jsx
//home.jsx
import { fetchHomeMultidataAction } from '../store/features/home'

const mapStateToProps = (state) => ({
  banners: state.home.banners
})

const mapDispatchToProps = (dispatch) => ({

  fetchHomeMultidata() {
    dispatch(fetchHomeMultidataAction({name: "why", age: 18}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
```

## **Redux Toolkit的数据不可变性**

- **在React开发中，我们总是会强调数据的不可变性：**
  - 无论是类组件中的state，还是redux中管理的state；
  - 事实上在整个JavaScript编码过程中，数据的不可变性都是非常重要的；

- **所以在前面我们经常会进行浅拷贝来完成某些操作，但是浅拷贝事实上也是存在问题的：**
  - 比如过大的对象，进行浅拷贝也会造成性能的浪费；
  - 比如浅拷贝后的对象，在深层改变时，依然会对之前的对象产生影响；

- **事实上Redux Toolkit底层使用了immerjs的一个库来保证数据的不可变性。** 
  - 另外一个比较有名的库是immutable-js库，和immerjs库差不多，是早期使用比较多的库
  - 在我们公众号的一片文章中也有专门讲解immutable-js库的底层原理和使用方法： 
  - [https://mp.weixin.qq.com/s/hfeCDCcodBCGS5GpedxCGg ](https://mp.weixin.qq.com/s/hfeCDCcodBCGS5GpedxCGg)
  
- **为了节约内存，又出现了一个新的算法：Persistent Data Structure（持久化数据结构或一致性 数据结构）；** 
  - 用一种数据结构来保存数据； 
  - 当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会 对内存造成浪费； 


## connect高阶组件

### **自定义connect函数**

- **connect其实就是接受两个映射函数，返回一个高阶组件。**

```jsx
// connect的参数:
// 参数一: 函数
// 参数二: 函数
// 返回值: 函数 => 高阶组件

import { PureComponent } from "react";
import { StoreContext } from "./StoreContext";
import store from "../store"

export function connect(mapStateToProps, mapDispatchToProps, store) {
  // 高阶组件: 函数
  return function(WrapperComponent) {
    class NewComponent extends PureComponent {
      constructor(props, context) {
        super(props)
        
        this.state = mapStateToProps(store.getState())
      }

      componentDidMount() {
        //当store改变时，触发界面更新。
        this.unsubscribe = store.subscribe(() => {
          // this.forceUpdate()
          this.setState(mapStateToProps(store.getState()))
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        const stateObj = mapStateToProps(store.getState())
        const dispatchObj = mapDispatchToProps(store.dispatch)
        return <WrapperComponent {...this.props} {...stateObj} {...dispatchObj}/>
      }
    }

    return NewComponent
  }
}

```

### **context处理store**

- **但是上面的connect函数有一个很大的缺陷：依赖导入的store **
  - 如果我们将其封装成一个独立的库，需要依赖用于创建的 store，我们应该如何去获取呢？ 
  - 难道让用户来修改我们的源码吗？不太现实； 

- **正确的做法是我们提供一个Provider，Provider来自于我们创 建的Context，让用户将store传入到value中即可；** 

```jsx
//connect.js
import { PureComponent } from "react";
import { StoreContext } from "./StoreContext";


export function connect(mapStateToProps, mapDispatchToProps, store) {
  // 高阶组件: 函数
  return function(WrapperComponent) {
    class NewComponent extends PureComponent {
      constructor(props, context) {
        
        super(props)
        
        this.state = mapStateToProps(context.getState())
      }

      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          // this.forceUpdate()
          this.setState(mapStateToProps(this.context.getState()))
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        const stateObj = mapStateToProps(this.context.getState())
        const dispatchObj = mapDispatchToProps(this.context.dispatch)
        return <WrapperComponent {...this.props} {...stateObj} {...dispatchObj}/>
      }
    }
    //使用StoreContext提供的注入
    NewComponent.contextType = StoreContext

    return NewComponent
  }
}

```

```js
//StoreContext.js
import { createContext } from "react";

export const StoreContext = createContext()

```

```js
//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import { StoreContext } from "./StoreContext"
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		
    <Provider store={store}>
        {/*使用自己的创建的StoreContext*/}
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Provider>
  
);

```



## 中间件的实现原理

### 中间件的作用

- **中间件的作用：** 就是在 `源数据` 到 `目标数据` 中间做各种处理，有利于程序的可拓展性，通常情况下，一个中间件就是一个函数，且一个中间件最好只做一件事情。

![img](image/10_Redux%E7%9A%84%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A3(%E4%BA%8C)/c3fb6e41363b4bd891c3ed6bacc3dabd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0-8131649.awebp)

- 而在redux中，中间件**提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。**

  ![img](image/10_Redux%E7%9A%84%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A3(%E4%BA%8C)/be897ff5f0f44e1380c353b2ba8b47c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0-8131861.awebp)

- 利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。

### 自定义中间件logger和thunk


- **中间件的简单实现，我们可以重写dispatch方法，利用它可以修改原有的程序逻辑；**


  - 这种重写的方法，又叫做Monkey Patching，猴补丁

- **先把原生的dispatch方法缓存起来，然后重写dispatch方法，最后调用缓存起来的dispatch方法。这个思路和vue实现数组方法触发响应式一样。**

- 接下我们实现两个中间件


  - 实现一个打印的中间件

  ```js
  function log(store) {
    const next = store.dispatch //保存原有的dispatch
  	// monkey patch: 猴补丁 => 篡改现有的代码, 对整体的执行逻辑进行修改
    store.dispatch =  logAndDispatch(action) =>{
      console.log("当前派发的action:", action)
      next(action) // 真正派发的代码: 使用原有的dispatch进行派发
      console.log("派发之后的结果:", store.getState())
    }
  }
  
  log(store)//执行，传入store
  ```

  - 实现redux-thunk，可以让我们的dispatch不再只是处理对象，并且可以处理函数；

  ```js
  function thunk(store) {
    const next = store.dispatch
    store.dispatch =  dispatchThunk(action)=> {
      if (typeof action === "function") {
        action(store.dispatch, store.getState)
      } else {
        next(action)
      }
    }
  }
  
  thunk(store)//执行，传入store
  ```

### applyMiddleware的原理

- 以上是我们简单的实现的中间件，实际上，在react-redux中的定义中间件格式如下：

  ```js
  //logger中间件
  function logger(store) {
      return function(next) { // next 代表下一个中间件
          return function(action) { // action动作
              console.log('prev state', store.getState())
              console.log('action', action)
              next(action)
              console.log('next state', store.getState())
          }
      }
  }
  
  //thunk中间件
  function thunk({ getState, dispatch }) {
      return function(next) {
          return function(action) {
              if (typeof action === 'function') { //如果是一个函数 函数执行 将 dispatch, getState作为参数传入
                  return action(dispatch, getState)
              }
              next(action)
          }
      }
  }
  let store = createStore(reducer, applyMiddleware(thunk, logger));
  ```

- 为什么中件间要写成这种三层函数嵌套的格式？

  - 主要是因为applyMiddleware函数

```js
export default function applyMiddleware(...middlewares) {
  return function(createStore){
    return function(reducer) => {
    const store = createStore(reducer)
    let dispatch;

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    }
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
     }
   }
 }
}
//执行
applyMiddleware(logger, thunk)(createStore)(reducer)
```

- `applyMiddleware`的执行过程：

  - ![截屏2023-10-24 16.24.47](image/10_Redux%E7%9A%84%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A3(%E4%BA%8C)/%E6%88%AA%E5%B1%8F2023-10-24%2016.24.47-8135900.png)

  - 执行完`chain`变量放的全部中间件第一次执行的返回值，也就是这两个函数

  - ![截屏2023-10-24 16.26.22](image/10_Redux%E7%9A%84%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A3(%E4%BA%8C)/%E6%88%AA%E5%B1%8F2023-10-24%2016.26.22.png)

  - 然后通过comose函数将这些函数组合起来

    - compose函数其实就是将`compose([logger,thunk])(store.dispatch)`，转变成`logger(thunk(store.dispatch)`

    - ```js
      function compose(...fns) {
          return fns.reduce((a, b) => (...args) => a(b(...args)))
      }
      
      //案列
      function add1(str) {
          return str + 1
      }
      
      function add2(str) {
          return str + 2
      }
      
      function add3(str) {
          return str + 3
      }
      
      let result = compose(add3, add2, add1)(1) 
      //等于
      let result1 = add3(add2(add1(1)))
      
      result === result1 //true
      ```

- 其他比较好的介绍中间件的文档：[https://yingchenit.github.io/react/redux-middleware/#%E5%AE%9E%E7%8E%B0%E8%81%94%E7%BA%A7](https://yingchenit.github.io/react/redux-middleware/#%E5%AE%9E%E7%8E%B0%E8%81%94%E7%BA%A7)

### 函数的“洋葱模型”

- 其实，**redux的中间件就是一种函数洋葱模型**，函数一层层包裹在一起，类似于洋葱一样。
- 但是执行的话，就**从最里层开始执行，一层层执行到最外层**



## **React状态管理选择**

- 我们学习了Redux用来管理我们的应用状态，并且非常好用。
- **目前我们已经主要学习了三种状态管理方式：**
  - 方式一：组件中自己的state管理；
  - 方式二：Context数据的共享状态；
  - 方式三：Redux管理应用状态；

- **在开发中如何选择呢？**
  - 首先，这个没有一个标准的答案；
  - 某些用户，选择将所有的状态放到redux中进行管理，因为这样方便追踪和共享；
  - 有些用户，选择将某些组件自己的状态放到组件内部进行管理；
  - 有些用户，将类似于主题、用户信息等数据放到Context中进行共享和管理；
  - 做一个开发者，到底选择怎样的状态管理方式，是你的工作之一，可以一个最好的平衡方式（Find a balance that works for you, and go with it.）；

- **Redux的作者有给出自己的建议：**

![](./image/Aspose.Words.f015bf02-3cbb-48ab-9e92-193846816cf1.030.png)

- **目前项目中我采用的state管理方案：**
  - UI相关的组件内部可以维护的状态，在组件内部自己来维护；
  - 大部分需要共享的状态，都交给redux来管理和维护；
  - 从服务器请求的数据（包括请求的操作），交给redux来维护；

- **当然，根据不同的情况会进行适当的调整，在后续学习项目实战时，我也会再次讲解以实战的角度来设计数据的管理方案**。

## 作业

### 四. 什么是Redux Toolkit？核心API有哪些？并且说出他们的作用。

- configureStore
  - 包装createStore,同时提供简化的配置选项和良好的默认值
  - 自动组合单独的slice reducer
  - 可以添加任何中间件
    - 默认包含redux-thunk,并启用Redux-DevTools调试工具
- createSlice 
  - 接受一个具有render函数的对象
  - 可以配置切片名称
  - 初始状态值
  - 自动 生成切片,并带有相应的actions
- createAsyncThunk
  - 接受一个动作类型字符和一个返回承诺的函数
  - 生成一个pending/fulfilled/rejected基于该承诺分配动作类型的Thunk

### 五. 总结Redux的使用步骤，包括原始Redux用法和RTK用法。（重要）

- 原始的Redux的使用步骤
  - 先从react-redux中导入Providre包裹根组件
  - 将导出的store绑定到Provider组件的store属性中
  - 创建store,目录结构
    - actionCreator ---> 创建action对象
    - constant  ---> 定义常量数据
    - reducer ---> 处理action对象,返回最新的state
    - index ---> 人口文件,创建store,使用中间件
  - 组件中的使用方式
    - 定义函数 ---> mapStateToProps ---> 将store中的数据映射要组件的props中
    - 定义函数 --->  mapDispatchToProps ---> 将dispatch的操作映射到props中
    - 从react-redux中导入高阶组件对要导出的组件进行包裹,并把定义的函数传入connect函数
    - 组件触发相应的事件,dispatch相应的对象,store中的数据改变,组件重新渲染
- RTK用法
  - 先从react-redux中导入Providre包裹根组件
  - 将导出的store绑定到Provider组件的store属性中
  - 创建store,目录结构:
    - index.js ---> 入口文件  ---> 创建和配置store ---> 主要是合并render
    - features ---> 要管理的数据模块
      - 使用createSliceAPI创建一个slice对象
      - name ---> 配置slice对象的名称
      - initialState ---> 定义初始值
      - reducer ---> 定义reduce函数的对象
      - 导出slice对象的actions---> 组件中使用或者自己内部使用,
      - 导出slice对象的reducer---> index文件合并reducer
