import React, { PureComponent } from "react";
import withTheme from "./withTheme";

export class Home extends PureComponent {
  render() {
    return (
      <div>
        Home-{this.props.color}-{this.props.fontSize}
      </div>
    );
  }
}

export default withTheme(Home);
