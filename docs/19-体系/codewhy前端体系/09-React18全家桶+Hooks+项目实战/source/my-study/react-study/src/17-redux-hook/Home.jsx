import React, { memo } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addNumAction, cutNumAction } from "./store/modules/counter";

const Child = memo((props) => {
  console.log("child被重新渲染");
  const { message } = useSelector((state) => ({
    message: state.info.message,
  }));
  return (
    <div>
      Child
      {message}
    </div>
  );
});

const Home = memo(function Home(props) {
  const { counter } = useSelector((state) => ({
    counter: state.info.counter,
  }));
  const dispatch = useDispatch();
  return (
    <div>
      <div>Home</div>
      <div>{counter}</div>
      <div>
        <button onClick={() => dispatch(addNumAction(1))}>+1</button>
      </div>
      <div>
        <button onClick={() => dispatch(cutNumAction(1))}>-1</button>
      </div>
      <Child></Child>
    </div>
  );
});

export default Home;
