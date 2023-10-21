import React, { PureComponent } from "react";
import { ThemeProvider } from "styled-components";
import Home from "./Home";

export class App extends PureComponent {
  state = {
    color: "red",
    fontSize: "18px",
  };
  render() {
    return (
      <ThemeProvider
        theme={{ color: this.state.color, fontSize: this.state.fontSize }}
      >
        <Home></Home>
      </ThemeProvider>
    );
  }
}

export default App;
