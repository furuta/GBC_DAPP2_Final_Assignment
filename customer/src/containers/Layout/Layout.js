import React from "react";
import "./Layout.scss";
import Header from "../Header/Header";
import { BrowserRouter } from "react-router-dom";

function Layout(props) {
  // console.log(props);
  return (
    <BrowserRouter>
    <div className="layout">
      <div className="header">
        <Header username={props.username} />
      </div>
      <div className="content">{props.children}</div>
    </div>
    </BrowserRouter>
  );
}

export default Layout;