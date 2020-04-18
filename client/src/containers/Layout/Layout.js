import React from "react";
import "./Layout.scss";
import Header from "../../container/Header/Header";
function Layout(props) {
  return (
    <div className="layout">
      <div className="header">
        <Header />
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default Layout;
