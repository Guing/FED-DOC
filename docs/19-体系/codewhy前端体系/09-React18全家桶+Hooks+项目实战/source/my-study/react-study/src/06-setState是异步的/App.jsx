import React, { Component } from "react";

export class App extends Component {
  state = {
    counter: 0,
  };
  increment() {
    this.setState((state, props) => {
      console.log("this.state.counter:", this.state.counter); //0
      console.log("state.counter:", state.counter); //0
      return {
        counter: state.counter + 1,
      };
    });
    this.setState((state, props) => {
      console.log("this.state.counter:", this.state.counter); //0，this.state.counter还没更新
      console.log("state.counter:", state.counter); //1, state.counter是上一个setState的结果。
      return {
        counter: state.counter + 1,
      };
    });
  }
  render() {
    return (
      <div>
        {this.state.counter}
        <button onClick={() => this.increment()}>增加</button>
      </div>
    );
  }
}

export default App;
