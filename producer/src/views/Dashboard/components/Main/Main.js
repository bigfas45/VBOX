import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../../views/Dashboard/Dashboard";
import Account from "../../views/Account/Account";
import Movies from "../../views/Movies/Movies";
import Transaction from "../../views/Transaction/Transaction";
import Settingsc from "../../views/Settings/Settings";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/account">
        <Account />
      </Route>
      <Route exact path="/movies">
        <Movies />
      </Route>
      <Route exact path="/transactions">
        <Transaction />
      </Route>
      <Route exact path="/settings">
        <Settingsc />
      </Route>
    </Switch>
  );
};

export default Main;
