import React, { Component, memo } from "react";

const Footer = memo(function (props) {
  console.log("Footer render");
  return <div>Footer-{props.message}</div>;
});
export default Footer;
