import React from "react";
import { Button, Badge } from "antd";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import LogoImg from "../../../../assets/logo-icon.png";
import ProduceAvatar from "../../../../assets/producer-avatar.png";

import "./Header.scss";

const Header = () => {
  return (
    <div className="dashboard-header">
      <div className="brand">
        <img src={LogoImg} alt="logo" />
        <p>V-BOX</p>
      </div>
      <div className="content">
        <div className="greetings">
          <p>
            Welcome, <span>Olayinka</span>
          </p>
        </div>
        <div className="cta-wrapper">
          <Button className="cta-btn">
            <Link>UPLOAD</Link>
          </Button>
          <div className="notify">
            <Badge count={5} className="notify-badge">
              <IoNotificationsOutline className="notify-icon" />
            </Badge>
          </div>
          <div className="avatar">
            <img src={ProduceAvatar} alt="producer-avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
