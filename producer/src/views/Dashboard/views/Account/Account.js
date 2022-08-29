import React from "react";
import { Tabs } from "antd";

import Profile from "../../components/Profile/Profile";

import "./Account.scss";

const { TabPane } = Tabs;

const Account = () => {
  return (
    <div className="account">
      <div className="tabs-wrapper">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key="1">
            <Profile />
          </TabPane>
          <TabPane tab="Withdrawal Details" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
