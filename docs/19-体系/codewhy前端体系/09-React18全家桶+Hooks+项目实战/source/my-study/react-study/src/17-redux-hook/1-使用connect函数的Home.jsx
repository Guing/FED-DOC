import React, { memo } from "react";
import { connect } from "react-redux";
import { addNumAction, cutNumAction } from "./store/modules/counter";

const Home = memo(function Home(props) {
  
  return (
    <div>
      <div>Home</div>
      <div>{props.counter}</div>
      <div>
        <button onClick={() => props.addNum(1)}>+1</button>
      </div>
      <div>
        <button onClick={() => props.cutNum(1)}>-1</button>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    counter: state?.info?.counter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNum: (num) => dispatch(addNumAction(num)),
    cutNum: (num) => dispatch(cutNumAction(num)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
