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

export default App;
