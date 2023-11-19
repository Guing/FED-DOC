import React, { PureComponent } from "react";
import {
  changeAge,
  changeUsername,
  fetchTokenAction,
} from "./store/modules/user";
import { connect } from "react-redux";
export class Home extends PureComponent {
  render() {
    return (
      <div>
        <div>{this.props.username}</div>
        <div>{this.props.age}</div>
        <div>{this.props.token}</div>
        <div>
          <button onClick={(e) => this.props.changeAge(this.props.age + 1)}>
            增加年龄
          </button>
          <button onClick={(e) => this.props.fetchTokenAction(123)}>
            拉取token
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  age: state.user.age,
  token: state.user.token,
});
const mapDispatchToProps = (dispatch) => ({
  changeUsername: (username) => dispatch(changeUsername(username)),
  changeAge: (age) => dispatch(changeAge(age)),
  fetchTokenAction: (params) => dispatch(fetchTokenAction(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
