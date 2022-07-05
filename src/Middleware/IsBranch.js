import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Redirect from "./Redirect";

const IsBranch = () => {
  const { user } = useSelector((state) => ({ ...state }));
  if (user && user.role_sub_branch === "branch") {
    return <Outlet />;
  } else {
    return <Redirect />;
  }
};

export default IsBranch;
