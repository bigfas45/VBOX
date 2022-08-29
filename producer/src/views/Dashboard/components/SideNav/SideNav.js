import React from "react";
import { Link } from "react-router-dom";

import dashboard_icon from "../../../../assets/dasboard-icons/dashboard-icon1.png";
import account_icon from "../../../../assets/dasboard-icons/account-icon1.png";
import movies_icon from "../../../../assets/dasboard-icons/movies-icon1.png";
import transaction_icon from "../../../../assets/dasboard-icons/transaction-icon1.png";
import settings_icon from "../../../../assets/dasboard-icons/settings-icon1.png";
import logout_icon from "../../../../assets/dasboard-icons/logout-icon1.png";

import "./SideNav.scss";

const SideNav = () => {
  return (
    <nav className="sidenav">
      <Link className="links" to="/dashboard">
        <img src={dashboard_icon} alt="link icon" />
        <p>Dashboard</p>
      </Link>
      <Link className="links" to="/account">
        <img src={account_icon} alt="link icon" />
        <p>Account</p>
      </Link>
      <Link className="links" to="/movies">
        <img src={movies_icon} alt="link icon" />
        <p>My Movies</p>
      </Link>
      <Link className="links" to="/transactions">
        <img src={transaction_icon} alt="link icon" />
        <p>Transactions</p>
      </Link>
      <Link className="links" to="/settings">
        <img src={settings_icon} alt="link icon" />
        <p>Settings</p>
      </Link>
      <Link className="links">
        <img src={logout_icon} alt="link icon" />
        <p>Logout</p>
      </Link>
    </nav>
  );
};

export default SideNav;
