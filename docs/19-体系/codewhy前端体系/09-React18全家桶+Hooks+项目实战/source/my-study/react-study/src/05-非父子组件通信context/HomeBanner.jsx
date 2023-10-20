import React, { Component } from "react";
import UserContext from "./userContext";
import ConfigContext from "./configContext";

export class HomeBanner extends Component {
  render() {
    return (
      <div>
        {this.context?.name}
        {this.context?.age}
        <div>HomeBanner</div>
        <ConfigContext.Consumer>
          {(value) => {
            return (
              <div>
                {value.app}
                {value.version}
              </div>
            );
          }}
        </ConfigContext.Consumer>
      </div>
    );
  }
}
HomeBanner.contextType = UserContext;

export default HomeBanner;
