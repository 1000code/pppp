import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Redirect from "./Redirect";

const IsCounter = () => {
  const { user } = useSelector((state) => ({ ...state }));

  if (
    (user && user.token && user.role_sub_branch === "counter") ||
    (user && user.role_sub_branch === "branch")
  ) {
    return <Outlet />;
  } else {
    return <Redirect />;
  }
};

export default IsCounter;
