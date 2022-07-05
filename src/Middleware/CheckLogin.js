import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Redirect from "./Redirect";

const CheckLogin = () => {
  const { user } = useSelector((state) => ({ ...state }));

  if (user && user.token) {
    return <Outlet />;
  } else {
    return <Redirect />;
  }
};

export default CheckLogin;
