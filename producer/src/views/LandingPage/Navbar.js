import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "antd";

import logoIcon from "../../assets/logo_new.png";

import "./styles/Navbar.scss";

const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="container">
        <div className="flex-container">
          <div className="logo-container">
            <Link to="/">
              <img src={logoIcon} alt="logo" className="logo-img" />
            </Link>
          </div>
          <Button className="nav-btn">
            <Link to="/login">SIGN IN</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
