import React, { PureComponent } from "react";
import Home from "./Home";
import Footer from "./Footer";

export class App extends PureComponent {
  state = {
    message: [1, 2, 3, 4],
    foo: {
      bar: {
        name: "xiaohei",
      },
    },
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
        {this.state.foo.bar.name}
        <Home message={this.state.message}></Home>
        <Footer message={this.state.message}></Footer>
      </div>
    );
  }
}

export default App;
