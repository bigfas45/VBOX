import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Form, Button, notification } from "antd";
import TextField from "@mui/material/TextField";

import { signupHandler, verifyRequest } from "../../../services/authService";

import "../styles/Signup.scss";

const AccountStep = ({ next, setOtpCode }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");

  console.log(fullname, email, telephone, password, rpassword);

  const onSubmit = async () => {
    const data = {
      fullname,
      email,
      telephone,
      password,
      rpassword,
    };
    // setLoading(true);
    await signupHandler(data)
      .then((res) => {
        setOtpCode(res.data.code);
        notification.success({
          message: "Account created",
          description: res.data.message,
        });
        next();
      })

      .catch((err) => {
        console.log("erros", err.response);
        console.log(err.response.data.errors[0]?.message);
        notification.error({
          message: "Error",
          description: err.response
            ? err.response.data.errors[0]?.message
            : "Error occured",
        });
      });
    // setLoading(false);
  };

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <div className="header-txt">
          <p>Hi,</p>
          <h3>Create login details</h3>
        </div>
        <div className="header-steps">
          <p></p>
        </div>
      </div>
      <Form
        onFinish={onSubmit}
        className="form-group"
        name="register"
        initialValues={{
          remember: true,
        }}
        autoComplete="on"
      >
        <Form.Item
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your full name",
            },
          ]}
        >
          <TextField
            id="fullname"
            label="Full name"
            variant="outlined"
            className="auth-input"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <TextField
            id="email_address"
            label="Email Address"
            variant="outlined"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="telephone"
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
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <TextField
            id="password"
            label="Comfirm Password"
            variant="outlined"
            className="auth-input"
            type="password"
            value={rpassword}
            onChange={(e) => setRpassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 12,
          }}
        >
          <Button
            // onClick={props.next}
            type="primary"
            htmlType="submit"
            className="auth-btn"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountStep;
