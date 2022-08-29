import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

import appStore from "../../assets/appstore.png";
import playStore from "../../assets/playstore.png";
import appPreview from "../../assets/MobileView.png";

import "./styles/MobileAppBanner.scss";

const MobileAppBanner = () => {
  return (
    <section className="app-banner">
      <div className="container">
        <Row>
          <Col sm={24} md={24} lg={12}>
            <div className="app-banner-content">
              <h3 className="title">Get your viewers on V-Box, Download now</h3>
              <p className="txt">Get your viewers on V-Box, Download now</p>
              <div className="btn-wrapper">
                <a href="/">
                  <img src={appStore} alt="Button" />
                </a>
                <a href="/">
                  <img src={playStore} alt="Button" />
                </a>
              </div>
            </div>
            <div className="cta-wrapper">
              <h3 className="cta-title">
                Start generating returns on your movie investment!!!
              </h3>
              <p className="cta-txt">Get your movies online immediately...</p>
              <Button className="cta-button">
                <Link to="/">UPLOAD MOVIES</Link>
              </Button>
            </div>
          </Col>
          <Col sm={24} md={24} lg={12} className="preview-wrapper">
            {/* <img src={appPreview} className="preview-img" /> */}
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default MobileAppBanner;
