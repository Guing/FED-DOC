import { memo, useCallback, useRef, useState } from "react";

const Child = memo((props) => {
  console.log("子组件被重新渲染");
  return (
    <div>
      <p>我是子组件</p>
      <p>
        <button onClick={props.incrment}>子组件增加1</button>
      </p>
    </div>
  );
});

export default memo(() => {
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState("hello");
  const counterRef = useRef();
  counterRef.current = counter;
  const incrment = useCallback(() => {
    setCounter(counterRef.current + 1);
  }, []);
  const changeMessage = () => {
    setMessage("hello world" + new Date());
  };
  return (
    <div>
      <div>
        <h1>数字改变</h1>
        <div>{counter}</div>
        <div>
          <button onClick={incrment}>增加</button>
        </div>
        <Child incrment={incrment}></Child>
      </div>

      <div>
        <h1>消息改变</h1>
        {message}
        <button onClick={changeMessage}>改变消息</button>
      </div>
    </div>
  );
});
