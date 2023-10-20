import React, { PureComponent, createRef, forwardRef } from "react";

class HelloWorld extends PureComponent {
  render() {
    return (
      <div>
        <p>hello world</p>
      </div>
    );
  }
}

const Person = forwardRef(function (props, ref) {
  return (
    <div ref={ref}>
      <p>Person</p>
    </div>
  );
});

export class App extends PureComponent {
  state = {
    titleRef: createRef(),
    myRef: null,
    hwRef: createRef(),
    personRef: createRef(),
  };
  getRef() {
    // console.log(this.refs.div);
    // console.log(this.state.titleRef.current);
    // console.log(this.state.myRef);
    // console.log(this.state.hwRef.current);
    console.log(this.state.personRef);
  }
  render() {
    return (
      <div>
        {/* <div ref="div">元素</div>
        <div ref={this.state.titleRef}>元素2</div>
        <div
          ref={(el) => {
            this.state.myRef = el;
          }}
        ></div>
        <HelloWorld ref={this.state.hwRef}></HelloWorld> */}
        <Person ref={this.state.personRef}></Person>
        <button onClick={() => this.getRef()}>获取</button>
      </div>
    );
  }
}

export default App;
