import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNumAction, cutNumAction } from "./store/modules/counter";

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
    </div>
  );
});

export default Home;
