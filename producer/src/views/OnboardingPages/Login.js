import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, notification } from "antd";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { loginHandler } from "../../services/authService";
import { setUsers } from "../../store/slice/userSlice";

import "./styles/Login.scss";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const request = loginHandler(email, password);

    try {
      const response = await request;
      console.log(response);
      localStorage.setItem("token", response.data.token);
      dispatch(setUsers(response.data));
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        discription: error.response
          ? error.response.data.errors[0]?.message
          : "An error occured",
      });
    }
  };

  return (
    <div className="login">
      <div className="container d-flex">
        <div className="form-wrapper">
          <div className="form-header">
            <p>Hi,</p>
            <h3>Please sign in...</h3>
          </div>

          <Form
            onFinish={onSubmit}
            className="form-group"
            name="login"
            initialValues={{
              remember: true,
            }}
            autoComplete="on"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <TextField
                id="username"
                label="Email Address"
                variant="outlined"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="remember">
              <FormControlLabel control={<Checkbox />} label="Remember Me" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 12,
              }}
            >
              <Button
                onClick={onSubmit}
                type="primary"
                htmlType="submit"
                className="auth-btn"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link className="link-txt" to="/forget-password">
            Forget password?
          </Link>
        </div>
        <p className="link-txt">
          New to V-BOX? <Link to="/signup"> Sign up </Link> to upload your
          movies
        </p>
      </div>
    </div>
  );
};

export default Login;
