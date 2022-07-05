import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Redirect from "./Redirect";

const IsTruck = () => {
  const { user } = useSelector((state) => ({ ...state }));

  if (
    (user && user.role_sub_branch === "branch") ||
    (user && user.role_sub_branch === "warehouse") ||
    (user && user.role_sub_branch === "truck")
  ) {
    return <Outlet />;
  } else {
    return <Redirect />;
  }
};

export default IsTruck;
