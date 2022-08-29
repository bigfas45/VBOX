import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo_new.png";

import "./styles/TopHeader.scss";

const TopHeader = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand-link">
        <img src={logoImg} alt="logo" />
        <span className="brand-txt">VBOX</span>
      </Link>
    </nav>
  );
};

export default TopHeader;
