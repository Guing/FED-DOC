import React, { PureComponent, Suspense } from "react";
import { HashRouter } from "react-router-dom";
import Home from "./Home";
export class App extends PureComponent {
  render() {
    return (
      <Suspense fallback={<div>loading</div>}>
        <HashRouter>
          <Home></Home>
        </HashRouter>
      </Suspense>
    );
  }
}

export default App;
