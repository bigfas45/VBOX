import React, { useState } from "react";
// import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Form, Button } from "antd";
import { verifyHandler } from "../../../services/authService";
import { notification } from "antd";

import "../styles/Verify.scss";

const VerifyStep = ({ next, otpCode }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    await verifyHandler(otp)
      .then((res) => {
        console.log(res);
        notification.success({
          message: "Success",
          description: "Account verified",
        });
        next();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Error",
          description: "An error occured",
        });
      });
    setLoading(false);
  };
  return (
    <div className="verify">
      <div className="form-header">
        <div className="header-txt">
          <h3>Sign Up</h3>
          <p>Enter the OTP sent to your phone number</p>
        </div>
        <div className="header-steps">
          <p>2/3</p>
        </div>
      </div>
      <div className="form-group">
        <Form>
          <Form.Item
            name="number"
            rules={[
              {
                required: true,
                message: "Please enter a valid opt number!",
              },
            ]}
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              containerStyle={"auth-input"}
              inputStyle={"otp-input"}
              numInputs={6}
              separator={<span> </span>}
              isInputNum="true"
            />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={onSubmit}
              type="primary"
              htmlType="submit"
              className="auth-btn"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyStep;
