import React from "react";
import { Form, Input, Row, Col } from "antd";
import TextField from "@mui/material/TextField";

import ProfileImg from "../../../../assets/producer-avatar.png";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-header">
        <img src={ProfileImg} alt="profile" />
        <button>Change Picture</button>
      </div>

      <Form className="profile-info" layout="vertical">
        <Row>
          <Col span={12}>
            <div className="">
              <TextField
                id="first_name"
                label="First Name"
                variant="outlined"
                className="input"
              />
            </div>
            <div className="">
              <TextField
                id="Address"
                label="Address"
                variant="outlined"
                className="input"
              />
            </div>
            <div className="">
              <TextField
                id="state"
                label="State"
                variant="outlined"
                className="input"
              />
            </div>
            <div className="">
              <TextField
                id="email_address"
                label="Email Address"
                variant="outlined"
                className="input"
              />
            </div>
            <button className="profile-btn">Save</button>
          </Col>
          <Col span={12}>
            <div className="">
              <TextField
                id="last_name"
                label="Last Name"
                variant="outlined"
                className="input"
              />
            </div>
            <div className="">
              <TextField
                id="city"
                label="City"
                variant="outlined"
                className="input"
              />
            </div>
            <div className="">
              <TextField
                id="phone_number"
                label="Phone Number"
                variant="outlined"
                className="input"
              />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Profile;
