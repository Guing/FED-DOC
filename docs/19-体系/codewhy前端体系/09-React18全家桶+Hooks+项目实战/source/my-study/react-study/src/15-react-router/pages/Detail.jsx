import React, { PureComponent } from "react";
import { Outlet, Link } from "react-router-dom";
import { withRouter } from "../hoc/with_router";
export class Detail extends PureComponent {
  render() {
    return (
      <div>
        Detail
        <div>
          <Link to="/detail/side">侧边</Link>
          <button onClick={() => this.props.router.navigate("/detail/context")}>
            内容
          </button>
        </div>
        <Outlet></Outlet>
      </div>
    );
  }
}

export default withRouter(Detail);
