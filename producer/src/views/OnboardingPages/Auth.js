import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopHeader from "./TopHeader";
import Login from "./Login";
import Signup from "./Signup";
import ForgetPassword from "./ForgetPassword";

const Auth = () => {
  return (
    <>
      <TopHeader />
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/forget-password" component={ForgetPassword} />
        </Switch>
      </Router>
    </>
  );
};

export default Auth;
