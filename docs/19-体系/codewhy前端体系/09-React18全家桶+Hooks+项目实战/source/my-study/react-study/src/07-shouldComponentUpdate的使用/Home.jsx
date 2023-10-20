import React, { PureComponent } from "react";

export class Home extends PureComponent {
  render() {
    console.log("Home render");
    return <div>Home-{this.props.message}</div>;
  }
}

export default Home;
