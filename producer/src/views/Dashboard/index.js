import React from "react";
import Header from "./components/Header/Header";
import SideNav from "./components/SideNav/SideNav";
import Main from "./components/Main/Main";

import "./index.scss";

const index = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="main">
        <SideNav />
        <Main />
      </div>
    </div>
  );
};

export default index;
