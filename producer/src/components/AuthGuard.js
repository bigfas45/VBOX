import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token")
  );
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      history.push("/login");
    }
  });
  return <>{token ? children : null}</>;
};

export default AuthGuard;
