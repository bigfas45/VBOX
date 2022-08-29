import React from "react";
import { Form, Button } from "antd";
import TextField from "@mui/material/TextField";

import "../styles/Signup.scss";

const SignupStep = (props) => {
  return (
    <div className="form-wrapper">
      <div className="form-header">
        <div className="header-txt">
          <h3>Sign Up</h3>
          <p>First step on getting your movies on V-Box</p>
        </div>
        <div className="header-steps">
          <p>1/3</p>
        </div>
      </div>
      <Form
        className="form-group"
        name="register"
        initialValues={{
          remember: true,
        }}
        autoComplete="on"
      >
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <TextField
            id="phone_number"
            label="Phone Number"
            variant="outlined"
            className="auth-input"
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 12,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="auth-btn"
            onClick={props.next}
          >
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupStep;
