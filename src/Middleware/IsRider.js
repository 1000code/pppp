import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Redirect from "./Redirect";

const IsRider = () => {
  const { user } = useSelector((state) => ({ ...state }));
  if (
    (user && user.role_sub_branch === "branch") ||
    (user && user.role_sub_branch === "counter") ||
    (user && user.role_sub_branch === "rider")
  ) {
    return <Outlet />;
  } else {
    return <Redirect />;
  }
};

export default IsRider;
