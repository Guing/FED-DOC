import { memo, useEffect, useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "change_counter":
      return { ...state, counter: action.num + state.counter };

    default:
      return state;
  }
}

export default memo(() => {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  return (
    <div>
      <div>Home</div>
      <div>{state.counter}</div>
      <div>
        <button onClick={() => dispatch({ type: "change_counter", num: 1 })}>
          增加
        </button>
      </div>
    </div>
  );
});
