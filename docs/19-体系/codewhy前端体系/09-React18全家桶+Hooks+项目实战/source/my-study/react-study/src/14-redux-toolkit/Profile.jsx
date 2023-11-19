import React, { PureComponent } from "react";
import {
  changeAge,
  changeUsername,
  fetchTokenAction,
} from "./store/modules/user";
import { connect } from "./utils";
export class Profile extends PureComponent {
  render() {
    return (
      <div>
        <div>{this.props.username}</div>
        <div>{this.props.age}</div>

        <div>
          <button onClick={(e) => this.props.changeAge(this.props.age + 1)}>
            增加年龄
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  age: state.user.age,
});
const mapDispatchToProps = (dispatch) => ({
  changeUsername: (username) => dispatch(changeUsername(username)),
  changeAge: (age) => dispatch(changeAge(age)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
