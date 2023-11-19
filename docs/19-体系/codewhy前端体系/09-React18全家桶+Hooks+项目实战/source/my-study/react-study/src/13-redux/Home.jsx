import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { fetchChangeInfoAction } from "./store/info";
import { changeCounterAction } from "./store/counter";
export class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchData(18);
  }
  render() {
    return (
      <div>
        <div>Home</div>
        <div>
          {this.props.info.name}-{this.props.info.age}
        </div>
        {this.props.counter}
        <div>
          <button onClick={() => this.props.changeCounter(1)}>增加1</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  counter: state.counter.counter,
  info: state.info.info,
});
const mapDispatchToProps = (dispatch) => ({
  changeCounter: (num) => dispatch(changeCounterAction(num)),
  fetchData: (params) => dispatch(fetchChangeInfoAction(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
