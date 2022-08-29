import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import "../styles/Signup.scss";

const FinalStep = () => {
  return (
    <div className=" form-wrapper">
      <div className="form-header">
        <div className="header-txt">
          <h3>Sign Up</h3>
          <p>Completed</p>
        </div>
        <div className="header-steps">
          <Link to="/dashboard">
            <p>Skip</p>
          </Link>
        </div>
      </div>
      <div className="final-step">
        <h2 className="final-title">We are glad to have you here!!!</h2>
        <p className="sub-txt">
          Please check your inbox and click on the verification link sent to
          your email
        </p>
        <div className="form-group">
          <Link to="/account">
            <Button className="auth-btn">Set Up My Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
