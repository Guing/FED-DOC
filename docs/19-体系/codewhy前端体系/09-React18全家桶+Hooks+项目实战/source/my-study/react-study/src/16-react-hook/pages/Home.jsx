import { memo, useCallback, useEffect, useRef, useState } from "react";
let obj = null;
let obj1 = null;
export default memo(() => {
  const [counter, setCounter] = useState(0);
  const btnRef = useRef();
  const testRef = useRef();
  console.log("obj,btnRef", obj === btnRef);
  console.log("obj1,testRef", obj1 === testRef);
  console.log("obj1,obj", obj1 === obj);
  obj = btnRef;
  obj1 = testRef;
  useEffect(() => {
    console.log(btnRef.current);
  }, []);
  return (
    <div>
      <div>{counter}</div>
      <div>
        <button ref={btnRef} onClick={() => setCounter(counter + 1)}>
          增加
        </button>
      </div>
    </div>
  );
});
