## 总结

### SCU的性能优化

#### 3.1. 默认Component组件

* 没有实现shouldComponentUpdate方法, 只要是调用setState, 那么render一定会被执行
* 自己实现shouldComponentUpdate优化操作:
  * 判断props/state是否有发生改变

#### 3.2. PureComponent/memo

* PureComponent: 类组件
* memo: 函数组件

#### 3.3. PureComponent原理/源码(了解)

* shallowEqual

### 3.4. state的不可变力量

* 修改state中的某一个数据(引用类型)
  * 先对数据进行拷贝操作
  * 修改拷贝之后对象, 设置新对象



### ref获取DOM和组件

#### 4.1. ref获取DOM

* 三种方式

#### 4.2. ref获取组件

* 类组件的实例
* 函数组件:
  * forwardRef => ref => 内部绑定ref



### 受控和非受控组件

#### 1.1. form提交的事件劫持

#### 1.2. 两个input的事件合并一个函数

#### 1.3. checkbox的单选和多选绑定

#### 1.4. select的单选和多选绑定

#### 1.5. 非受控组件的使用

* ref绑定input
* this.inputRef.current.value
* defaultValue默认值



### 高阶组件

#### 2.1. 高阶组件的定义

* 是一个函数
* 特点:
  * 接受一个组件作为参数
  * 并且返回一个新的组件
* 本质: 
  * 对传入的组件进行劫持

#### 2.2. 应用一 - 增强props

* userInfo
* ThemeContext
  * withTheme()

#### 2.3. 应用二 - 登录鉴权

#### 2.4. 应用三 - 生命周期

#### 2.5. 高阶组件的意义

* 代码复用:
  * mixins
  * HOC
  * hooks

* 之前的两个高阶组件
  * memo
  * forwardRef



### 额外知识补充

#### 2.1. Portals

#### 2.2. Fragment

#### 2.3. StrictMode





## React性能优化SCU(shouldComponentUpdate)

### **React更新机制**

- 我们在前面已经学习React的渲染流程：

![](./image/Aspose.Words.efcd3347-0758-4a5a-8dce-333212d81a56.014.png)

- 那么React的更新流程呢？

![](./image/Aspose.Words.efcd3347-0758-4a5a-8dce-333212d81a56.015.png)

### **React的更新流程**

- **React在props或state发生改变时，会调用React的render方法，会创建一颗不同的树。**
- **React需要基于这两颗不同的树之间的差别来判断如何有效的更新UI：**
  - **如果一棵树参考另外一棵树进行完全比较更新，那么即使是最先进的算法，该算法的复杂程度为 O(n³)**，其中 n 是树中元素的数量；
    - [https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf；](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)
    - 如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围；
    - 这个开销太过昂贵了，React的更新性能会变得非常低效；

- **于是，React对这个算法进行了优化，将其优化成了O(n)，如何优化的呢？**
  - 同层节点之间相互比较，不会跨节点比较；
  - 不同类型的节点，产生不同的树结构；
  - 开发中，可以通过key来指定哪些节点在不同的渲染下保持稳定；


### **keys的优化**

- 我们在前面遍历列表时，总是会提示一个警告，让我们加入一个key属性：

![](image/06_React%E7%BB%84%E4%BB%B6%E5%8C%96%E5%BC%80%E5%8F%91(%E4%BA%8C)/Aspose.Words.efcd3347-0758-4a5a-8dce-333212d81a56.016.png)

- 方式一：在最后位置插入数据
  - 这种情况，有无key意义并不大
- 方式二：在前面插入数据
  - 这种做法，在没有key的情况下，所有的li都需要进行修改；
- 当子元素(这里的li)拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素：
  - 在下面这种场景下，key为111和222的元素仅仅进行位移，不需要进行任何的修改；
  - 将key为333的元素插入到最前面的位置即可；
- **key的注意事项**：
  - key应该是唯一的；
  - key不要使用随机数（随机数在下一次render时，会重新生成一个数字）；
  - 使用index作为key，对性能是没有优化的；

### **render函数被调用**

- 我们使用之前的一个嵌套案例：
  - 在App中，我们增加了一个计数器的代码；
  - 当点击+1时，会重新调用App的render函数； ![](./image/Aspose.Words.efcd3347-0758-4a5a-8dce-333212d81a56.017.png)

- 而**当App的render函数被调用时，所有的子组件的render函 数都会被重新调用**； 
- 那么，我们可以思考一下，在以后的开发中，我们**只要是修改了 App中的数据，所有的组件都需要重新render，进行diff算法， 性能必然是很低的**： 
  - 事实上，**很多的组件没有必须要重新render**； 
  - 它们**调用render应该有一个前提，就是依赖的数据（state、 props）发生改变时，再调用自己的render方法**； 

- 但是在react中，调用setState之后，就一定会触发render函数的更新
  - **如果setState没有更新数据，新旧数据是一样的，render也会更新。**
  
  - **如果子组件没有依赖更新的数据，是不需要重新渲染，但是它依赖会重新渲染**
  
- **如何来控制render方法是否被调用呢？**
  - 通过**shouldComponentUpdate方法即可**；


### **shouldComponentUpdate**

- **React给我们提供了一个生命周期方法 shouldComponentUpdate（很多时候，我们简称为SCU），这个方法接受参数，并且需要有 返回值：**
- **该方法有两个参数：**
  - 参数一：nextProps 修改之后，最新的props属性
  - 参数二：nextState 修改之后，最新的state属性
- **该方法返回值是一个boolean类型：**
  - **返回值为true，那么就需要调用render方法；**
  - **返回值为false，那么久不需要调用render方法；**
  - 默认返回的是true，也就是只要state发生改变，就会调用render方法；
- 比如我们在Home中增加一个message属性：
  - 只有当props.message发生改变，render函数才会重新执行。

```jsx
export class Home extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.message !== nextProps.message) {
      return true;
    }
    return false;
  }
  render() {
    console.log("Home render");
    return <div>Home-{this.props.message}</div>;
  }
}
```


### **PureComponent**

- **如果所有的类，我们都需要手动来实现 shouldComponentUpdate，那么会给我们开发者增加非常多的工作量。**
  - 我们来设想一下shouldComponentUpdate中的各种判断的目的是什么？
  - props或者state中的数据是否发生了改变，来决定shouldComponentUpdate返回true或者false；

- **事实上React已经考虑到了这一点，所以React已经默认帮我们实现好了，如何实现呢？**
  - 将class继承自PureComponent，**PureComponent内部实现了一个shouldComponent的浅层比较，会判断oldProps和newProps，oldState和newState是否一样。如果不一样，则重新render**

```jsx
import React, { PureComponent } from "react";

export class Home extends PureComponent {
  render() {
    console.log("Home render");
    return <div>Home-{this.props.message}</div>;
  }
}

export default Home;
```

### **高阶组件memo**

- **目前我们是针对类组件可以使用PureComponent，那么函数式组件呢？**
  - 事实上函数式组件我们在props没有改变时，也是不希望其重新渲染其DOM树结构的
- **我们需要使用一个高阶组件memo：**
  - 使用memo函数包裹函数组件；

```jsx
import React, { memo } from "react";

const Footer = memo(function (props) {
  console.log("Footer render");
  return <div>Footer-{props.message}</div>;
});
export default Footer;
```

### 数据的浅层比较

- 在PureComponent中，会有一个`checkShouldComponentUpdate`方法
  - 这个方法中，调用` !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)`，这个`shallowEqual`就是 进行浅层比较


```js

function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext,
) {
  //.....其他代码

  if (ctor.prototype && ctor.prototype.isPureReactComponent) {
    return (
      //对新旧数据进行比较，如果相等，就取反，返回false，则不会更新。
      !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    );
  }

  return true;
}
```

- 以下用state总结，props也是一样的情况
  - 如果**新state或旧state不是对象类型**，则进行**更新**
  - 如果**新旧state是对象类型**
    - 如果**新旧state是同一个对象**，则**不进行更新**
    - 如果**新旧state对象的长度不一样**，则**进行更新**
    - 如果**新旧state对象的属性不一样**，则**进行更新**

```js
function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}
function shallowEqual(objA: mixed, objB: mixed): boolean {
  //判断新旧state，是否同一个对象，如果相同，则返回true
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    if (
      !hasOwnProperty.call(objB, currentKey) ||
      !is(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
}
```


### **如何在react中更新数据**

- 由上可知，数据是进行浅层比较的，所以在react中更新数据，得注意以下：
  - **必须使用新的state替换旧的state**。
  - **修改嵌套对象的属性，需要先解构对象，赋值给新的对象，再修改新对象的属性**。
  - **修改数组元素时，不能使用push方法，因为新旧都是同一个数组对象，无法重新更新。要使用`[...arr]`的方法，赋值新的数组，再修改新数组的元素**

```jsx
export class App extends PureComponent {
  state = {
    message: [1, 2, 3, 4],
  };
  changeText() {
    //1.错误，新旧state是同一个对象，无法更新
    // this.state.message.push(5);
    // this.setState(this.state);

    //2.错误，新旧state的message是同一个数组，无法更新
    //this.state.message.push(5);
    //this.setState({ message: this.state.message });

    //3.正确，修改数组
    let message = [...this.state.message];
    message.push(5);
    this.setState({
      message: message,
    });

    //4.正确，修改嵌套对象
    let foo = { ...this.state.foo };
    foo.bar.name = "xiaobai";
    this.setState({
      foo: foo,
    });
  }
  render() {
    console.log("App render");
    return (
      <div>
        {this.state.message}
        <button onClick={() => this.changeText()}>修改</button>
      </div>
    );
  }
}
```



## ref的使用

### **ref获取DOM**

- 在React的开发模式中，通常情况下不需要、也不建议直接操作DOM原生，但是某些特殊的情况，确实需要获取到DOM进行某些操作：
  - 管理焦点，文本选择或媒体播放；
  - 触发强制动画；
  - 集成第三方 DOM 库；
  - 我们可以通过refs获取DOM；

- 如何创建refs来获取对应的DOM呢？目前有三种方式：
- **方式一：传入字符串(已废弃)**
  - 使用时通过 **this.refs.传入的字符串格式获取对应的元素**；


- **方式二：传入一个对象（推荐）**
  - 对象是通过 **React.createRef() 方式**创建出来的；
  - 使用时获取到创建的**对象其中有一个current属性**就是对应的元素；
- **方式三：传入一个函数**
  - 该**函数会在DOM被挂载时进行回调，这个函数会传入一个 元素对象**，我们可以自己保存；
  - 使用时，直接拿到之前保存的元素对象即可；

```jsx
export class App extends PureComponent {
  constructor() {
    super();
    this.state = {};

    this.titleRef = createRef();
    this.titleEl = null;
  }

  getNativeDOM() {
    // 1.方式一: 在React元素上绑定一个ref字符串
    // console.log(this.refs.why)

    // 2.方式二: 提前创建好ref对象, createRef(), 将创建出来的对象绑定到元素
    // console.log(this.titleRef.current)

    // 3.方式三: 传入一个回调函数, 在对应的元素被渲染之后, 回调函数被执行, 并且将元素传入
    console.log(this.titleEl);
  }

  render() {
    return (
      <div>
        {/* 方式一：字符串 */}
        <h2 ref="why">Hello World</h2>
        {/* 方式二：createRef */}
        <h2 ref={this.titleRef}>你好啊,李银河</h2>
        {/* 方式三：回调函数 */}
        <h2 ref={(el) => (this.titleEl = el)}>你好啊, 师姐</h2>
        
        <button onClick={(e) => this.getNativeDOM()}>获取DOM</button>
      </div>
    );
  }
}
```

### ref获取类组件实例

- 获取类组件实例和获取Dom的对象方法一样，通过**React.createRef() 方式**创建；

```jsx
class HelloWorld extends PureComponent {
  test() {
    console.log("test------")
  }
  render() {
    return <h1>Hello World</h1>
  }
}

export class App extends PureComponent {
  constructor() {
    super()

    this.hwRef = createRef() //使用createRef
  }

  getComponent() {
    console.log(this.hwRef.current) //获取类组件实例
    this.hwRef.current.test() //调用类组件方法
  }

  render() {
    return (
      <div>
        <HelloWorld ref={this.hwRef}/>
        <button onClick={e => this.getComponent()}>获取组件实例</button>
      </div>
    )
  }
}
```

### ref获取函数组件

- **函数式组件是没有实例的，所以无法通过ref获取他们的实例：**
  - 但是某些时候，我们可能想要获取函数式组件中的某个DOM元素；
  - 这个时候我们可以通过 **React.forwardRef**；

```jsx
import React, { PureComponent, createRef, forwardRef } from 'react'
//使用forwardRef方法
const HelloWorld = forwardRef(function(props, ref) {
  return (
    <div>
      <!--通过赋值ref,获取函数式组件中的某个DOM元素-->
      <h1 ref={ref}>Hello World</h1>
      <p>哈哈哈</p>
    </div>
  )
})

export class App extends PureComponent {
  constructor() {
    super()

    this.hwRef = createRef()
  }

  getComponent() {
    console.log(this.hwRef.current)
  }

  render() {
    return (
      <div>
        <HelloWorld ref={this.hwRef}/>
        <button onClick={e => this.getComponent()}>获取组件实例</button>
      </div>
    )
  }
}
```




## 受控和非受控组件

### **认识受控组件**

- **非受控组件**：
  - 对于表单元素，input，checkbox等，这些元素当**没有绑定value**时，这些元素**没有受到react的控制**，就是非控制组件。


```jsx
export class App extends PureComponent {
  changeHandle(e) {
    console.log(e.target.value);
  }
  render() {
    return (
      <div>
        <!--没有绑定value，非受控组件，用户可以输入更新-->
        <input type="text" onChange={(e) => this.changeHandle(e)}></input>
      </div>
    );
  }
}
```

![截屏2023-10-19 11.36.36](image/06_React%E7%BB%84%E4%BB%B6%E5%8C%96%E5%BC%80%E5%8F%91(%E4%BA%8C)/%E6%88%AA%E5%B1%8F2023-10-19%2011.36.36-7686602.png)

- **受控组件**：
  - 对于表单元素，input，checkbox等，这些元素**有绑定value时**，受到react的控制。**如果没有绑定相应的onInput，onChange和在事件里使用setState方法时，用户在界面输入时，并不会更新**。并且react会提示，一定要绑定事件
  - 总之，**一旦表单元素绑定了value，就是受控组件** 


```jsx
export class App extends PureComponent {
  state = {
    value: "defalut",
  };
  changeHandle(e) {
    console.log(e.target.value);
  }
  render() {
    return (
      <div>
        <!--绑定了value，变成受控组件，这时一定要绑定更新事件和在事件里使用setState，不然用户无法输入更新，也会有提示-->
        <input type="text" value={this.state.value}></input>
      </div>
    );
  }
}
```

![截屏2023-10-19 11.39.59](image/06_React%E7%BB%84%E4%BB%B6%E5%8C%96%E5%BC%80%E5%8F%91(%E4%BA%8C)/%E6%88%AA%E5%B1%8F2023-10-19%2011.39.59-7686804-7686805.png)

### **受控组件基本使用**

- 在 HTML 中，表单元素（如`<input>`、 `<textarea> `和 `<select>`）之类的表单元素通常自己维护 state，并根据用户输入进 行更新。
- **而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。**
  - 我们将两者结合起来，使**React的state成为“唯一数据源”**；
  - 渲染表单的 **React 组件还控制着用户输入过程中表单发生的操作**；
  - 被 **React 以这种方式控制取值的表单输入元素就叫做“受控组件”**；

- 由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。
- 由于 handleUsernameChange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

![](./image/Aspose.Words.efcd3347-0758-4a5a-8dce-333212d81a56.024.png)

```jsx
export class App extends PureComponent {
  state = {
    username: "",
    password: "",
    sex: [
      { name: "男", value: 1, isChecked: false },
      { name: "女", value: 0, isChecked: false },
    ],
    isArgee: false,
    tag: [
      { name: "斜杆", value: 1, isChecked: false },
      { name: "跳唱", value: 2, isChecked: false },
    ],
    area: "",
    areaOption: [
      { name: "全部", value: "" },
      { name: "广州", value: 1 },
      { name: "深圳", value: 2 },
    ],
    hope: [],
    hopeOption: [
      { name: "年年18", value: 1 },
      { name: "得到100万", value: 2 },
    ],
  };
  changeInputHandle(event) {
    this.setState(
      {
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  }
  changeRadioHandle(e, value) {
    this.setState(
      {
        [e.target.name]: this.state[e.target.name].map((item) => {
          item.isChecked = item.value === value;
          return item;
        }),
      },
      () => {
        console.log(this.state);
      }
    );
  }
  changeCheckboxMultiHandle(e, name, index) {
    const arr = [...this.state[name]];
    arr[index].isChecked = e.target.checked;
    this.setState(
      {
        [name]: arr,
      },
      () => {
        console.log(this.state);
      }
    );
  }
  changeSelectMultiHandle(e, index) {
    const arr = Array.from(e.target.selectedOptions, (item) => item.value);

    this.setState(
      {
        [e.target.name]: arr,
      },
      () => {
        console.log(this.state);
      }
    );
  }
  render() {
    const {
      username,
      password,
      sex,
      isArgee,
      tag,
      area,
      areaOption,
      hope,
      hopeOption,
    } = this.state;
    return (
      <div>
        <form>
          {/* 单个Input */}
          <div>
            <label htmlFor="username">用户名：</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => this.changeInputHandle(e)}
            ></input>
          </div>
          <div>
            <label htmlFor="username">密码：</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => this.changeInputHandle(e)}
            ></input>
          </div>
          <div>
            {/* 单个radio */}
            <label htmlFor="username">性别：</label>
            {sex.map((item) => (
              <div key={item.value}>
                <input
                  type="radio"
                  name="sex"
                  checked={item.isChecked}
                  onChange={(e) => this.changeRadioHandle(e, item.value)}
                />
                {item.name}
              </div>
            ))}
          </div>
          <div>
            {/* 单个checkbox */}
            <div>
              <input
                type="checkbox"
                name="isArgee"
                checked={isArgee}
                onChange={(e) => this.changeInputHandle(e)}
              />
              <label htmlFor="isArgee">是否同意协议</label>
            </div>
          </div>
          <div>
            {/* 多个checkbox */}
            <label htmlFor="username">标签：</label>
            {tag.map((item, index) => (
              <div key={item.value}>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={(e) =>
                    this.changeCheckboxMultiHandle(e, "tag", index)
                  }
                />
                {item.name}
              </div>
            ))}
          </div>

          <div>
            {/* 单个select */}
            <label htmlFor="username">地区：</label>
            <select
              name="area"
              value={area}
              onChange={(e) => this.changeInputHandle(e)}
            >
              {areaOption.map((item, index) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            {/* 多个select */}
            <label htmlFor="username">愿望：</label>
            <select
              name="hope"
              value={hope}
              multiple
              onChange={(e) => this.changeSelectMultiHandle(e)}
            >
              {hopeOption.map((item, index) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    );
  }
}
```


### **非受控组件基本使用**

- React推荐大多数情况下使用 受控组件 来处理表单数据：
  - 一个**受控组件中，表单数据是由 React 组件来管理**的；
  - 另一种替代方案是使用**非受控组件，这时表单数据将交由 DOM 节点来处理**；

- **如果要使用非受控组件中的数据，那么我们需要使用 ref 来从DOM节点中获取表单数据。**
- 我们来进行一个简单的演练：
  - 使用ref来获取input元素；

- **在非受控组件中通常使用defaultValue来设置默认值；**
  - 同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 **defaultChecked**，`<select>` 和 `<textarea> `支 持 **defaultValue**。

```jsx
export class App extends PureComponent {

  constructor() {
    super()

    this.state = {
      intro: "哈哈哈"
    }

    this.introRef = createRef()
  }

  componentDidMount() {
    this.introRef.current.addEventListener('change',()=>{
      //....
    })
  }
  handleSubmitClick(event) {
    console.log("获取结果:", this.introRef.current.value)
  }
  render() {
    const {  intro } = this.state

    return (
      <div>
        <form onSubmit={e => this.handleSubmitClick(e)}>
          {/* 5.非受控组件 */}
          <input type="text" defaultValue={intro} ref={this.introRef} />
        </form>
      </div>
    )
  }
}
```




## React的高阶组件

### **认识高阶函数**

- 什么是高阶组件呢？
  - 相信很多同学都知道（听说过？），也用过 **高阶函数**
  - 它们非常相似，所以我们可以先来回顾一下什么是 高阶函数。

- 高阶函数的维基百科定义：至少满足以下条件之一：
  - **接受一个或多个函数作为输入**；
  - **输出一个函数**；

- **JavaScript中比较常见的filter、map、reduce都是高阶函数。**
- 那么说明是高阶组件呢？
  - **高阶组件**的英文是 **Higher-Order Components**，简称为 HOC；
  - 官方的定义：**高阶组件是参数为组件，返回值为新组件的函数**；

- 我们可以进行如下的解析：
  - 首先， **高阶组件 本身不是一个组件，而是一个函数**；
  - 其次，**这个函数的参数是一个组件，返回值也是一个组件**；

### **高阶组件的定义**

- **高阶组件实际是对原有组件，建立一层拦截**。
  - **通过参数传入一个组件，在函数里新建一个新的组件，在新组件的render渲染参数传入的组件，这样就可以对参数组件进行拦截修改。**

```jsx
// 定义一个高阶组件
function hoc(Cpn) {
  // 1.定义新的组件
  class NewCpn extends PureComponent {
    render() {
      //在新的组件里渲染组件参数
      return <Cpn name="why"/>
    }
  }
  //修改新组件的名称，用于在devtools中显示。
  newCpn.displayName = 'newHelloWorld'
  return NewCpn

}

class HelloWorld extends PureComponent {
  render() {
    return <h1>Hello World</h1>
  }
}

//使用高阶组件，返回一个新的组件
const HelloWorldHOC = hoc(HelloWorld)

export class App extends PureComponent {
  render() {
    return (
      <div>
        <HelloWorldHOC/>
      </div>
    )
  }
}
```

- 高阶组件**并不是React API的一部分**，它是基于React的 组合特性而形成的**设计模式**；

- 高阶组件在一些React第三方库中非常常见：

  - 比如**redux中的connect**； 
  -  比如**react-router中的withRouter**；

- 组件的名称问题：

  - 在ES6中，类表达式中类名是可以省略的；
  - 组件的名称都可以通过**displayName**来修改 ；

### 高阶组件的应用

#### **props的增强**

- 多个组件共同注入props

```jsx
import React, { PureComponent } from "react";
// 高阶组件函数
function hoc(Cpn) {
  class NewCpn extends PureComponent {
    state = {
      name: "xiaohei",
      age: 18,
    };
    render() {
      // 扩展props
      return <Cpn {...this.props} {...this.state} />;
    }
  }
  NewCpn.displayName = "NewCpn";
  return NewCpn;
}

class Home extends PureComponent {
  render() {
    return (
      <div>
        Home-{this.props.name}-{this.props.age}-{this.props.sex}
      </div>
    );
  }
}
// 高阶组件-类组件
const HomeHOC = hoc(Home);
// 高阶组件-函数组件
const OtherHoc = hoc((props) => {
  return <div>哈哈-{props.name}</div>;
});

export class App extends PureComponent {
  render() {
    return (
      <div>
        <OtherHoc name="xiaohei"></OtherHoc>
        <HomeHOC sex="男"></HomeHOC>
      </div>
    );
  }
}

```

- 还有一个针对context注入的应用。
  - 在类组件中，如果有多个context，则需要每个页面都使用context.Consumer，使用起来非常麻烦。
  - 这时候可以通过高阶组件注入props。

```jsx
const ThemeContext = createContext()

function withTheme(OriginComponment) {
  return (props) => {
    return (
      <ThemeContext.Consumer>
        {
          value => {
            return <OriginComponment {...value} {...props}/>
          }
        }
      </ThemeContext.Consumer>
    )
  }
}


//product.jsx
export class Product extends PureComponent {
  render() {
    const { color, size } = this.props

    return (
      <div>
        <h2>Product: {color}-{size}</h2>
      </div>
    )
  }
}
export default withTheme(Product)  //使用高阶组件注入


//app.jsx
export class App extends PureComponent {
  render() {
    return (
      <div>
        <ThemeContext.Provider value={{color: "red", size: 30}}>
          <Product/>
        </ThemeContext.Provider>
      </div>
    )
  }
}
```

#### 渲染判断鉴权

- 在开发中，我们可能遇到这样的场景：
  - 某些页面是必须用户登录成功才能进行进入；
  - 如果用户没有登录成功，那么直接跳转到登录页面；

- 这个时候，我们就可以使用高阶组件来完成鉴权操作：

```jsx
function loginAuth(OriginComponent) {
  return props => {
    // 从localStorage中获取token
    const token = localStorage.getItem("token")

    if (token) {
      return <OriginComponent {...props}/>
    } else {
      return <h2>请先登录, 再进行跳转到对应的页面中</h2>
    }
  }
}


export class Cart extends PureComponent {
  render() {
    return (
      <h2>Cart Page</h2>
    )
  }
}

export default loginAuth(Cart) //使用登录拦截
```

#### **生命周期劫持**

- 我们也可以利用高阶函数来劫持生命周期，在生命周期中完成自己的逻辑：

```jsx
//通过拦截生命周期，计算组件渲染需要的时间
function logRenderTime(OriginComponent) {
  return class extends PureComponent {
    UNSAFE_componentWillMount() {
      this.beginTime = new Date().getTime()
    }
  
    componentDidMount() {
      this.endTime = new Date().getTime()
      const interval = this.endTime - this.beginTime
      console.log(`当前${OriginComponent.name}页面花费了${interval}ms渲染完成!`)
    }

    render() {
      return <OriginComponent {...this.props}/>
    }
  }
}


export class Detail extends PureComponent {
  render() {
    return (
      <div>
        <h2>Detail Page</h2>
        <ul>
          <li>数据列表1</li>
          <li>数据列表2</li>
          <li>数据列表3</li>
          <li>数据列表4</li>
          <li>数据列表5</li>
          <li>数据列表6</li>
          <li>数据列表7</li>
          <li>数据列表8</li>
          <li>数据列表9</li>
          <li>数据列表10</li>
        </ul>
      </div>
    )
  }
}

export default logRenderTime(Detail) //拦截生命周期
```



### **高阶函数的意义**

- 我们会发现利用高阶组件可以针对某些React代码进行更加优雅的处理。
- 其实早期的React有提供组件之间的一种复用方式是mixin，目前已经不再建议使用：
  - Mixin 可能会相互依赖，相互耦合，不利于代码维护；
  - 不同的Mixin中的方法可能会相互冲突；
  - Mixin非常多时，组件处理起来会比较麻烦，甚至还要为其做相关处理，这样会给代码造成滚雪球式的复杂性；
- 当然，HOC也有自己的一些缺陷：
  - **HOC需要在原组件上进行包裹或者嵌套，如果大量使用HOC，将会产生非常多的嵌套，这让调试变得非常困难；**
  - **HOC可以劫持props，在不遵守约定的情况下也可能造成冲突；**
- **Hooks的出现，是开创性的，它解决了很多React之前的存在的问题**
  - **比如this指向问题、比如hoc的嵌套复杂度问题等等；**

## portals和 fragment

### **Portals的使用**

- 通常来讲，当你从组件的 render 方法返回一个元素时，该元素将被挂载到 DOM 节点中离其最近的父节点：

- 某些情况下，我们希望**渲染的内容独立于父组件，甚至是独立于当前挂载到的DOM元素**中（默认都是挂载到id为root的DOM 元素上的）。
- **Portal** 提供了一种**将子节点渲染到存在于父组件以外的 DOM 节点**的优秀的方案：
  - **第一个参数**（child）是任何可渲染的 React 子元素，字符串或 fragment；
  - **第二个参数**（container）是一个 DOM 元素，具体要挂载到哪个元素上。


![](./image/Aspose.Words.efcd3347-0758-4a5a-8dce-333212d81a56.032.png)

- 比如说，我们准备开发一个Modal组件，它可以将它的子组件渲染到屏幕的中间位置：
  - 步骤一：修改index.html添加新的节点
  
  ```jsx
    <body>
      <div id="root"></div>
      <!--添加新的节点-->
      <div id="modal"></div>
    </body>
  ```
  
  - 步骤二：将组件渲染到这个节点上。
  
  ```jsx
  import React, { PureComponent } from 'react'
  import { createPortal } from "react-dom"
  
  export class Modal extends PureComponent {
    render() {
      return createPortal(this.props.children, document.querySelector("#modal"))
    }
  }
  
  export default Modal
  ```


### **fragment**

- 在之前的开发中，我们总是在一个组件中返回内容时包裹一个div元素：

![image-20231002211806266](image/06_React%E7%BB%84%E4%BB%B6%E5%8C%96%E5%BC%80%E5%8F%91(%E4%BA%8C)/image-20231002211806266.png)

- 我们又希望可以不渲染这样一个div应该如何操作呢？
  - 使用Fragment
  - **Fragment 允许你将子列表分组，而无需向 DOM 添加额外节点**；

- React还提供了**Fragment的短语法**：
  - **语法： `<> </>`**；
  - 但是，**如果我们需要在Fragment中添加key，那么就不能使用短语法**

```jsx
import React, { PureComponent, Fragment } from 'react'

export class App extends PureComponent {
  constructor() {
    super() 
    this.state = {
      sections: [
        { title: "哈哈哈", content: "我是内容, 哈哈哈" },
        { title: "呵呵呵", content: "我是内容, 呵呵呵" },
      ]
    }
  }

  render() {
    const { sections } = this.state

    return (
      <>
        {
          sections.map(item => {
            return (
              <Fragment key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </Fragment>
            )
          })
        }
      </>
    )
  }
}
```




## StrictMode严格模式

### **StrictMode**

- **StrictMode 是一个用来突出显示应用程序中潜在问题的工具：**
  - 与 Fragment 一样，StrictMode 不会渲染任何可见的 UI；
  - 它为其后代元素触发额外的检查和警告；
  - 严格模式检查仅在开发模式下运行；它们不会影响生产构建；

- **可以为应用程序的任何部分启用严格模式：**
  - 不会对 Header 和 Footer 组件运行严格模式检查；
  - 但是，ComponentOne 和 ComponentTwo 以及它们的所有后代元素都将进行检查；


![](./image/Aspose.Words.efcd3347-0758-4a5a-8dce-333212d81a56.039.png)

### **严格模式检查的是什么？**

- **但是检测，到底检测什么呢？**
  - 识别不安全的生命周期：
  - 使用过时的ref API
  - 使用废弃的findDOMNode方法
    - 在之前的React API中，可以通过findDOMNode来获取DOM，不过已经不推荐使用了
  - 检测过时的context API
    - 早期的Context是通过static属性声明Context对象属性，通过getChildContext返回Context对象等方式来使用Context的；
    - 目前这种方式已经不推荐使用，大家可以自行学习了解一下它的用法；
  
  - 检查意外的副作用

    - **开启严格模式下, 组件的constructor,componentDidMount,render等生命周期会被调用两次；**
  
    - **这是严格模式下故意进行的操作，让你来查看在这里写的一些逻辑代码被调用多次时，是否会产生一些副作用**；
      - 比如在生命周期添加一些事件监听, 可能没有取消监听.  执行两次, 可以查看是否有这些问题
  
    - **在生产环境中，是不会被调用两次的；**

## 作业

### 性能优化:什么是SCU优化？类组件和函数组件分别如何进行SCU的优化？

* **shouldComponentUpdate -- SCU** -- React提供给我们的声明周期方法

* SCU优化就是 一种巧妙的技术,用来减少DOM操作次数,具体为当React元素没有更新时,不会去调用render()方法

* 可以通过`shouldComponentUpdate`来判断`this.state`中的值是否改变

  ```js
  shouldComponentUpdate(nextProps, nextState) {
     const {message, counter} = this.state
     if(message !== nextState.message || counter !== nextState.counter) {
       return true
     }
     return false 
   }
  ```

* React已经帮我们提供好SCU优化的操作

  * 类组件: 将class继承自`PureComponent`
  * 函数组件: 使用一个高阶组件`memo`

  ```js
  import {mome} from 'react'
  
  const HomeFunc = mome(function(props) {
    console.log("函数式组件")
    return (
      <h4>函数式组件: {props.message}</h4>
    )
  })
  
  export default HomeFunc
  ```



### React为什么要强调不可变的力量？如何实现不可变的力量？

* 不可变的力量: 不要直接去修改this.state中的值(主要指对象),若是想修改的话,应该是将这整个值全部修改掉
  * 注意: 值类型,在修改的时候,本身就全部替换掉了,所以不需要其他操作,直接改就可以
* 实现: 将对象浅拷贝赋值给一个新的变量,在将这个新的变量赋值给this.state中的值





### 六. React中获取DOM的方式有哪些？

* ref获取DOM

  ```jsx
  getDOM() {
  // 方式一: 在react元素上绑定ref字符串 - 这种方式react已经不推荐了
  // console.log(this.refs.http)
  
  // 方式二: 提前创建好ref对象, createRef(), 将创建出来的对象绑定到元素(推荐)
  // console.log(this.titleRef.current)
  
  // 方式三: 传入一个回调函数, 在对应的元素被渲染之后, 回调函数被执行, 并且将元素传入(16.3之前的版本)
  // console.log(this.titleEl)
  }
  <h3 ref="http">大大怪将军</h3>
  <h3 ref={this.titleRef}>小小怪下士</h3>
  <h3 ref={el => this.titleEl = el}>瑞克</h3>
  <button onClick={() => this.getDOM()}>获取DOM</button>
  ```

* ref获取组件实例 -- `createRef`

  ```jsx
  import React, { PureComponent, createRef } from 'react'
  
  constructor() {
      super()
      this.state = {}
      this.HWRef = createRef()
  }
  
  getComponent() {
      console.log(this.HWRef.current)
      this.HWRef.current.test()
  }
  
  <HelloWorld ref={this.HWRef} />
  <button onClick={() => this.getComponent()}>获取组件实例</button>
  ```

* ref获取函数组件 -- 函数式组件是没有实例的，所以无法通过ref获取他们的实例 -- `React.forwardRef`

  ```jsx
  import React, { PureComponent, createRef, forwardRef } from 'react'
  
  const HelloWorld = forwardRef(function(props, ref) {
    return (
      <div>
        <h2 ref={ref}>函数组件</h2>
        <h4>大大怪将军</h4>
      </div>
    )
  })
  constructor() {
      super()
      this.state = {}
      this.HWRef = createRef()
  }
  
  getComponent() {
      console.log(this.HWRef.current)
  }
  
  render() {
      return (
        <div>
          <HelloWorld ref={this.HWRef} />
          <button onClick={() => this.getComponent()}>获取DOM</button>
        </div>
      )
  }
  ```

  



### 性能优化:React的diff算法和key的作用

* React的渲染流程

  * 在render函数中返回jsx, jsx会创建出`ReactElement`对象(通过React.createElement的函数创建出来的)
  * `ReactElement`最终会形成一颗树结构, 这颗树结构就是vDOM
  * React会根据这样的vDOM渲染出真实DOM

* React更新流程

  * props/state发生改变
  * render函数重新执行
  * 产生新的DOM树结构
  * 新旧DOM树 进行diff算法
  * 计算出差异进行更新
  * 最后更新到真实DOM

  ```js
  什么是diff算法?
      diff算法并非React独家首创,但是React针对diff算法做了自己的优化,使得时间复杂度优化成了O(n)
  对比两颗树结构,然后帮助我们计算出vDOM中真正变化的部分,并只针对该部分进行实际的DOM操作,而非渲染整个页面,从而保证了每次操作后页面的高效渲染。
  ```

* React在props或state发生改变时，会调用React的render方法，会创建一颗不同的树

* React需要基于这两颗不同的树之间的差别来判断如何有效的更新UI

* 如果一棵树参考另外一棵树进行完全比较更新，那么即使是最先进的算法，该算法的**复杂程度为 O(n³)**，其中 n 是树中元素的数量

* 如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围

* 这个开销太过昂贵了，于是，React对这个算法进行了优化，**将其优化成了O(n)**

  * 同层节点之间相互比较，不会垮节点比较(一旦某个节点不同,那么包括其后代节点都会被替换)

  * 不同类型的节点，产生不同的树结构(当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树)

  * 开发中，可以通过key属性标识哪些子元素在不同的渲染中可能是不变的

* 在遍历列表时，总是会提示一个警告，让我们加入一个key属性，当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。

  * 在最后位置插入数据 -- 这种情况，有无key意义并不大
  * 在前面插入数据 -- 这种做法，在没有key的情况下，所有的li都需要进行修改
  * 在中间插入元素 -- 新增2014, key为2016元素仅仅进行位移，不需要进行任何的修改

  ```jsx
  <ul>
    <li key="2015">Duke</li>
    <li key="2016">Villanova</li>
  </ul>
  
  <ul>
    <li key="2015">Duke</li>
    <li key="2014">Connecticut</li>
    <li key="2016">Villanova</li>
  </ul>
  ```

###  什么是受控组件和非受控组件，如何使用？

* 受控组件

  * 在 React 中，可变状态通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新
  * 我们将两者结合起来，使React的state成为“唯一数据源”
  * 渲染表单的 React 组件还控制着用户输入过程中表单发生的操作
  * 被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”

  ```jsx
  this.state = {
    message: ""
  }
  changeInput(event) {
    console.log(event.target.value)
    this.setState({ message: event.target.value })
  }
  
  render(){
     <input type="text" value={message} onChange={(event) => this.changeInput(event)} />
  }
  ```

* 非受控组件

  * 在受控组件中，表单数据是由 React 组件来管理的
  * 非受控组件中，表单数据将交由 DOM 节点来处理

  ```jsx
  this.messageRef.current.value
  
  // 在非受控组件中通常使用defaultValue来设置默认值
  render(){
      <input type="text" defaultValue={message} ref={this.messageRef} />
  }
  ```

### 什么是高阶组件？高阶组件在React开发中起到什么作用？

* 高阶函数: (满足一下调教之一) -- filter、map、reduce都是高阶函数
  * 接受一个或多个函数作为输入
  * 输出一个函数
* 高阶组件: Higher-Order Components，简称为 HOC
  * 高阶组件是参数为组件，返回值为新组件的函数 -- 就是传入一个组件,对这个组件进行一些功能的增强,在返回出来新的组件
  * 注意: 首先 高阶组件 本身不是一个组件，而是一个函数 其次，这个函数的参数是一个组件，返回值也是一个组件
  * HOC 是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式

- 高级组件应用的场景
  - props的增强
  - 利用高阶组件来共享Context
  - 渲染判断鉴权
  - 生命周期劫持
  - ....

### 什么是Fragment，有什么作用？

- Fragment 允许将子列表分组，而无需向 DOM 添加额外节点；
- 它的简写看起来像空标签  <> </>
- 如果我们需要在Fragment中添加key，那么就不能使用短语法



### 什么是React的严格模式，在开发中有什么作用？

严格模式

- StrictMode 是一个用来突出显示应用程序中潜在问题的工具：
- 与 Fragment 一样，StrictMode 不会渲染任何可见的 UI；
- 它为其后代元素触发额外的检查和警告；

严格模式作用

- 识别不安全的生命周期：
- 使用过时的ref API
- 检查意外的副作用 这个组件的constructor会被调用两次； 这是严格模式下故意进行的操作，让你来查看在这里写的一些逻辑代码被调用多次时，是否会产生一些副作用； 在生产环境中，是不会被调用两次的；
- 使用废弃的findDOMNode方法 在之前的React API中，可以通过findDOMNode来获取DOM，不过已经不推荐使用了，可以自行学习演练一下
- 检测过时的context API 早期的Context是通过static属性声明Context对象属性，通过getChildContext返回Context对象等方式来使用Context的
