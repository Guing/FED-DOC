import { memo, useState } from "react";

export default memo(() => {
  const [counter, setCounter] = useState(0);

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
