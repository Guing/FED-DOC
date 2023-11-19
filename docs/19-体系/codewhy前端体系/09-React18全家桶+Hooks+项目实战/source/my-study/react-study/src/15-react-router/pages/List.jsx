import React, { PureComponent } from "react";
import { withRouter } from "../hoc/with_router";

export class List extends PureComponent {
  render() {
    return (
      <div>
        list
        {this.props.router.params.id}
        {this.props.router.query.name}
      </div>
    );
  }
}

export default withRouter(List);
