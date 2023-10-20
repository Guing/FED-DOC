##  React的过渡动画

### **react-transition-group介绍**

- 在开发中，我们想要给一个组件的显示和消失添加某种过渡动画，可以很好的增加用户体验。
- 当然，我们可以通过原生的CSS来实现这些过渡动画，但是**React社区为我们提供了react-transition-group用来完成过渡动画**。
  - React曾为开发者提供过动画插件 react-addons-css-transition-group，后由社区维护，形成了现在的 react-transition - group。
  - 这个库可以帮助我们方便的实现组件的 **入场 和 离场** 动画，使用时需要进行额外的安装：
    - `npm install react-transition-group `


- react-transition-group本身非常小，不会为我们应用程序增加过多的负担。
- react-transition-group主要包含四个组件：

  - **Transition**
  - 该组件是一个和平台无关的组件（不一定要结合CSS）；
    
  - 在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是CSSTransition；
  - **CSSTransition**
    - 在前端开发中，通常使用CSSTransition来完成过渡动画效果
    
  - **SwitchTransition**
    - 两个组件显示和隐藏切换时，使用该组件
    
  - **TransitionGroup**
    - 将多个动画组件包裹在其中，一般用于列表中元素的动画；
- **动画组件的本质 , 其中就是在适合的时间 , 帮我们添加动画类名 . 实际上 , 动画还是得要自己去写**

## **CSSTransition**

- **CSSTransition是基于Transition组件构建的：**
  - **元素一般有三个状态：**
    - **appear**: 元素的初始状态
    - **enter**:  元素进入状态
    - **exit；**: 元素离开状态
- **每一种状态,可以包含三种类名, 代表着每种状态,在不同执行阶段需要添加的类名**
  - 状态名称类名:一开始就会添加
  - active类名:动画开始执行过程会添加
  - done类名: 动画执行完成后会添加

- 比如以下, 其中classNames为用户自定义的类名称
  - appear
    -  `.[classNames]-appear`
    -  `.[classNames]-appear-active`
    -  `.[classNames]-appear-done`
  - enter
    -  `.[classNames]-enter`
    -  `.[classNames]-enter-active`
    -  `.[classNames]-enter-done`
  - exit
    -  `.[classNames]-exit`
    -  `.[classNames]-exit-active`
    -  `.[classNames]-exit-done`

```jsx
import React, { PureComponent, createRef } from "react";
import { CSSTransition } from "react-transition-group";
export class App extends PureComponent {
  state = {
    isShow: true,
    divRef: createRef(),
  };
  render() {
    const { isShow } = this.state;
    return (
      <div>
        <CSSTransition
          appear
          classNames="my"
          in={isShow}
          unmountOnExit={true}
          nodeRef={this.state.divRef}
          timeout={2000}
        >
          <div ref={this.state.divRef}>哈哈</div>
        </CSSTransition>

        <button onClick={() => this.setState({ isShow: !isShow })}>切换</button>
      </div>
    );
  }
}
```

```css
/*初始状态 */
.my-appear {
  opacity: 0;
}
.my-appear-active {
  opacity: 1;
  transition: all 2s ease;
}
.my-appear-done{
  
}
/*进入状态*/
.my-enter {
  opacity: 0;
}
.my-enter-active {
  opacity: 1;
  transition: all 2s ease;
}
.my-enter-done{
  
}
/*离开状态*/
.my-exit {
  opacity: 1;
}
.my-exit-active {
  opacity: 0;
  transition: all 2s ease;
}
.my-exit-done{
  
}
```

### CSSTransition常见属性

- **in：触发进入或者退出状态**
  - 如果添加了**unmountOnExit={true}**，那么该组件会在执行退出动画结束后被移除掉；

  - **当in为true时，触发进入状态，会添加-enter、-enter-acitve的class开始执行动画，当动画执行结束后，会移除两个class， 并且添加-enter-done的class**；

  - **当in为false时，触发退出状态，会添加-exit、-exit-active的class开始执行动画，当动画执行结束后，会移除两个class，并 且添加-enter-done的class**；


- **classNames：动画class的名称**
  - 决定了在编写css时，对应的class名称：比如card-enter、card-enter-active、card-enter-done；

- **timeout：**
  - 过渡动画的时间

- **appear：**
  - 是否在初次进入添加动画（需要和in同时为true）

- **unmountOnExit：**
  - 退出后卸载组件

- **其他属性可以参考官网来学习：**
  - [https://reactcommunity.org/react-transition-group/transition](https://reactcommunity.org/react-transition-group/transition)

- **CSSTransition对应的钩子函数：主要为了检测动画的执行过程，来完成一些JavaScript的操作**
  - onEnter：在进入动画之前被触发；
  - onEntering：在应用进入动画时被触发；
  - onEntered：在应用进入动画结束后被触发；


## **SwitchTransition**

- **SwitchTransition可以完成两个组件之间切换的炫酷动画：**
  - 比如我们有一个按钮需要在on和off之间切换，我们希望看到on先从左侧退出，off再从右侧进入；
  - 这个动画在vue中被称之为 vue transition modes；
  - react-transition-group中使用SwitchTransition来实现该动画；

- **SwitchTransition中主要有一个属性：mode，有两个值**
  - in-out：表示新组件先进入，旧组件再移除 ；
  - out-in：表示旧组件先移除，新组建再进入；

- **如何使用SwitchTransition呢？**
  - SwitchTransition组件里面要有CSSTransition或者Transition组件，不能直接包裹你想要切换的组件；
  - SwitchTransition里面的CSSTransition或Transition组件不再像以前那样接受in属性来判断元素是何种状态，取而代之的是 key属性；

```jsx
import React, { PureComponent, createRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      isLogin: true,
    };
  }

  render() {
    const { isLogin } = this.state;

    return (
      <div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={isLogin ? "exit" : "login"}
            classNames="my"
            timeout={1000}
          >
            <button onClick={(e) => this.setState({ isLogin: !isLogin })}>
              {isLogin ? "退出" : "登录"}
            </button>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }
}
```

```css

.my-enter {
  opacity: 0;
}
.my-enter-active {
  opacity: 1;
  transition: all 2s ease;
}

.my-exit {
  opacity: 1;
}
.my-exit-active {
  opacity: 0;
  transition: all 2s ease;
}
```




## **TransitionGroup**

- **当我们有一组动画时，需要将这些CSSTransition放入到一个TransitionGroup中来完成动画：**

```jsx
import React, { PureComponent, createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      books: [
        { id: 111, name: "你不知道JS", price: 99 },
        { id: 222, name: "JS高级程序设计", price: 88 },
        { id: 333, name: "Vuejs高级设计", price: 77 },
      ],
    };
  }

  addNewBook() {
    const books = [...this.state.books];
    books.push({
      id: new Date().getTime(),
      name: "React高级程序设计",
      price: 99,
    });
    this.setState({ books });
  }

  removeBook(index) {
    const books = [...this.state.books];
    books.splice(index, 1);
    this.setState({ books });
  }

  render() {
    const { books } = this.state;

    return (
      <div>
        <h2>书籍列表:</h2>
        <TransitionGroup component="ul">
          {books.map((item, index) => {
            return (
              <CSSTransition key={item.id} classNames="my" timeout={1000}>
                <li>
                  <span>
                    {item.name}-{item.price}
                  </span>
                  <button onClick={(e) => this.removeBook(index)}>删除</button>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <button onClick={(e) => this.addNewBook()}>添加新书籍</button>
      </div>
    );
  }
}
```

```css
.my-enter {
  opacity: 0;
}
.my-enter-active {
  opacity: 1;
  transition: all 2s ease;
}

.my-exit {
  opacity: 1;
}
.my-exit-active {
  opacity: 0;
  transition: all 2s ease;
}

```

## 作业

### React中如何实现过渡动画？常见的过渡动画组件有哪些？

- React社区为我们提供了react-transition-group用来完成过渡动画

常见的过渡动画组件

- Transition   在前端开发中，一般是结合CSS来完成样式，所以比较常用的是CSSTransition；
- CSSTransition   在前端开发中，通常使用CSSTransition来完成过渡动画效果
- SwitchTransition   两个组件显示和隐藏切换时，使用该组件
- TransitionGroup   将多个动画组件包裹在其中，一般用于列表中元素的动画；
