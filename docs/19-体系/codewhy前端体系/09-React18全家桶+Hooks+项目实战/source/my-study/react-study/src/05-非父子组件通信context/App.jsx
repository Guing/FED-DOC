import React, { Component } from "react";
import Home from "./Home";
import UserContext from "./userContext";
import ConfigContext from "./configContext";
import HomeInfo from "./HomeInfo";
export class App extends Component {
  state = {
    name: "xiaohei",
    age: 18,
  };
  render() {
    return (
      <div>
        <div>App</div>
        <ConfigContext.Provider value={{ app: "shop", version: "1.0" }}>
          <UserContext.Provider value={this.state}>
            <Home></Home>
          </UserContext.Provider>
        </ConfigContext.Provider>
        <HomeInfo></HomeInfo>
      </div>
    );
  }
}

export default App;
