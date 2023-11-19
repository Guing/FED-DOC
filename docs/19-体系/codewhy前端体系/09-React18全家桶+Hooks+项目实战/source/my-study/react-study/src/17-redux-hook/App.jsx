import React, { memo } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./Home";
export default memo(function App() {
  return (
    <div>
      <Provider store={store}>
        <Home></Home>
      </Provider>
    </div>
  );
});
