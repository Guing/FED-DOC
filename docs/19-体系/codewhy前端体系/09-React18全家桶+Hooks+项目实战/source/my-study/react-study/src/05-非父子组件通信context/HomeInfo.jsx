import React, { Component } from "react";
import UserContext from "./userContext";

export default function HomeInfo() {
  return (
    <div>
      homeInfo
      <UserContext.Consumer>
        {(value) => {
          return (
            <div>
              <div>{value?.name}</div>
              <div>{value?.age}</div>
            </div>
          );
        }}
      </UserContext.Consumer>
    </div>
  );
}
