import React, { PureComponent } from "react";
import store from "./store/index";
import { changeCounterAction } from "./store/counter/actionCreateor";
export class Profile extends PureComponent {
  state = {
    counter: store.getState().counter.counter,
  };
  addNumber(num) {
    store.dispatch(changeCounterAction(num));
  }
  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      const state = store.getState();
      this.setState({
        counter: state.counter.counter,
      });
    });
  }
  componentWillUnmount() {
    this.unSubscribe && this.unSubscribe();
  }
  render() {
    return (
      <div>
        <div>Profile</div>
        {this.state.counter}
        <div>
          <button onClick={() => this.addNumber(1)}>增加1</button>
        </div>
      </div>
    );
  }
}

export default Profile;
