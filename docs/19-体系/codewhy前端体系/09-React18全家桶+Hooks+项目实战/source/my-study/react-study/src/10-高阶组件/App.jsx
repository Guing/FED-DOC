import React, { PureComponent } from "react";
import ThemeContext from "./ThemeContext";
import Home from "./Home";

export class App extends PureComponent {
  render() {
    return (
      <div>
        <ThemeContext.Provider value={{ color: "red", fontSize: 18 }}>
          <Home></Home>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
