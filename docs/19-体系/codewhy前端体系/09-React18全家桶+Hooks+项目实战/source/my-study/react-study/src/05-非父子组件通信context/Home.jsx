import React, { Component } from "react";
import HomeBanner from "./HomeBanner";
import HomeInfo from "./HomeInfo";

export class Home extends Component {
  render() {
    return (
      <div>
        <div>Home</div>
        <HomeBanner></HomeBanner>
        {/* <HomeInfo></HomeInfo> */}
      </div>
    );
  }
}

export default Home;
