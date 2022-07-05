import React from "react";

const Getmoney = React.lazy(() => import("../Pages/Report/Getmoney"));

const RouteBranch = [
  {
    path: "/dashboard/get-money-counter",
    name: "Getmoney",
    element: Getmoney,
  },
];
export default RouteBranch;
