import React from "react";
import { Typography, Button, Row, Col, Avatar } from "antd";
import {
  UserAddOutlined,
  CloudUploadOutlined,
  EyeOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./styles/Hero.scss";

const { Title, Text } = Typography;
const Hero = () => {
  return (
    <section className="hero-container">
      <div className="container">
        <div className="hero-content">
          <h3 className="hero-sub-title" level={3}>
            A place for all movie producers
          </h3>
          <h1 className="hero-title" level={1}>
            Upload your movies for FREE, get PAID for every VIEW on the platform
          </h1>
          <p className="hero-txt">
            No marketers needed for your movie sales. Your viewers requires no
            mobile data to stream on our platform
          </p>
          <Button className="hero-btn">
            <Link to="/login">UPLOAD MOVIES</Link>
          </Button>
        </div>
      </div>
      <div className="step-container">
        <div className="container">
          <Row className="step-row">
            <Col className="step-col" xs={12} sm={12} md={6} lg={6} xl={6}>
              <Avatar className="step-icon">
                <UserAddOutlined />
              </Avatar>
              <h2>Sign Up</h2>
              <p>Create an account with us to get started</p>
            </Col>
            <Col className="step-col" xs={12} sm={12} md={6} lg={6} xl={6}>
              <Avatar className="step-icon">
                <CloudUploadOutlined />
              </Avatar>
              <h2>Upload Movies</h2>
              <p>Upload your movies instantly and start seeing result</p>
            </Col>
            <Col className="step-col" xs={12} sm={12} md={6} lg={6} xl={6}>
              <Avatar className="step-icon">
                <EyeOutlined />
              </Avatar>
              <h2>More Views, More Income</h2>
              <p>
                You can see all the views on every movie uploaded. You get paid
                for every view
              </p>
            </Col>
            <Col
              className="step-col"
              style={{ border: "none" }}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
            >
              <Avatar className="step-icon">
                <WalletOutlined />
              </Avatar>
              <h2>Free Wallet</h2>
              <p>
                You get a wallet where all revenues from movie views are paid
                and you can transfer to your bank accounts
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default Hero;
