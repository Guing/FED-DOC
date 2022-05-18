import React from "react";
import logo from "./logo.svg";
import "./App.css";
import robots from "./mockdata/robots.json";
import Robot from "./components/Robot";

function App() {
  return (
    <ul>
      {robots.map((r) => (
        <Robot id={r.id} email={r.email} name={r.name} />
      ))}
    </ul>
  );
}

export default App;
