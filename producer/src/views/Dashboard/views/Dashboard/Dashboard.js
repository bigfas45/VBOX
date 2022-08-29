import React from "react";
import { Row, Col } from "antd";

import MovieDefaultImg from "../../../../assets/dasboard-icons/movie-list-default.png";
import WalletDefaultImg from "../../../../assets/dasboard-icons/wallet-default.png";
import CommentDefaultImg from "../../../../assets/dasboard-icons/comments-default.png";
import ActivityDefaultImg from "../../../../assets/dasboard-icons/activities-default.png";

import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-home">
      <Row gutter={16} className="dashboard-content">
        <Col span={10}>
          <div className="movie-list">
            <div className="title">
              <p>My Movies</p>
              <span>See all</span>
            </div>
            <div className="content">
              <div className="item-wrapper">
                <img src={MovieDefaultImg} />
                <div className="item">
                  <h2>No Movies!</h2>
                  <p>
                    You have no movies <a>uploaded</a> yet, kindly click Upload
                    to get started
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={14}>
          <Row gutter={16}>
            <Col span={12}>
              <div className="wallet">
                <div className="title">
                  <p>Wallet</p>
                  <span>Wallet ID: 08037480090</span>
                </div>
                <div className="content">
                  <div className="item-wrapper">
                    <div className="item">
                      <p>Balance</p>
                      <h2 style={{ fontWeight: "600" }}>NO:00</h2>
                      <button>Withdraw</button>
                    </div>
                    <img src={WalletDefaultImg} />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="wallet">
                <div className="title">
                  <p>Comments</p>
                </div>
                <div className="content">
                  <div className="item-wrapper">
                    <img src={CommentDefaultImg} />
                    <div className="item">
                      <h2>Not Available</h2>
                      <p>No comment to show at the moment</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="activities">
            <div className="title">
              <p>Activities</p>
            </div>
            <div className="content">
              <div className="item-wrapper">
                <img src={ActivityDefaultImg} />
                <div className="item">
                  <h2>Not Available</h2>
                  <p>No data to show at the moment</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

//write a multi step fomr react typescript
