import { memo, useEffect, useReducer, useState } from "react";

export default memo(() => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("增加监听");
    return () => {
      console.log("取消监听");
    };
  });

  useEffect(() => {
    console.log("第一次加载 ");
    return () => {
      console.log("unload");
    };
  }, [counter]);

  return (
    <div>
      <div>Home</div>
      <div>{counter}</div>
      <div>
        <button onClick={() => setCounter(counter + 1)}>增加</button>
      </div>
    </div>
  );
});
