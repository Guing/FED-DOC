import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Robot from "./components/Robot";
import RobotDiscount from "./components/RobotDiscount";
import styles from "./App.module.css";
import robots from "./mockdata/robots.json";
import ShoppingCart from "./components/ShoppingCart";

interface Props {}

interface State {
  robotGallery: any[];
}

const App: React.FC<Props> = () => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<Array<any>>([]);
  //第二个参数，传入[]，则和componentDidMount生命周期一样
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setRobotGallery(data);
      });
  }, []);
  //第二个参数，不传，则和componentDidUpdate生命周期一样。
  // useEffect(() => {
  //   console.log("I am Update");
  // });
  //第二个参数，传入[state]，则当state发生变化时，函数执行
  // useEffect(() => {
  //   document.title = document.title + count;
  // }, [count]);
  //第一个参数不能是async函数，可以使用以下方法使用async
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setRobotGallery(data);
    };
    fetchData();
  });
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
      </div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click
      </button>
      <span>count: {count}</span>
      <ShoppingCart />
      <div className={styles.robotList}>
        {robotGallery.map((r, index) => (
          index % 2 == 0 ? (
            <RobotDiscount id={r.id} email={r.email} name={r.name} />
          ) : (
            <Robot id={r.id} email={r.email} name={r.name} />
          )
        ))}
      </div>
    </div>
  );
};

export default App;
